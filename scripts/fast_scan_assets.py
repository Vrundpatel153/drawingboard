import os
import re
import json
import sys
import threading
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed
from rapidocr_onnxruntime import RapidOCR
from PIL import Image

thread_local = threading.local()

def get_engine():
    if not hasattr(thread_local, 'engine'):
        thread_local.engine = RapidOCR()
    return thread_local.engine

IMAGE_ROOT = Path("react-app/public/images")

# Suspicious patterns
URL_PATTERN = re.compile(r'(https?://[^\s]+|www\.[^\s]+|[a-zA-Z0-9-]+\.(?:com|org|net|io|co|agency|design|me|app)(?:/[^\s]*)?)', re.IGNORECASE)
EMAIL_PATTERN = re.compile(r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}', re.IGNORECASE)
CREDIT_PATTERN = re.compile(r'\b(obrazur|behance|dribbble|designed by|art direction|brand designer|credits?|author)\b', re.IGNORECASE)

SKIP_FOLDERS = {'testimonials', 'live-stores', 'development', 'studio'}

folders = sorted([f for f in os.listdir(IMAGE_ROOT) if (IMAGE_ROOT / f).is_dir() and f not in SKIP_FOLDERS])

all_tasks = []
for folder in folders:
    folder_path = IMAGE_ROOT / folder
    img_files = sorted([f for f in os.listdir(folder_path) if f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp'))])
    for img_name in img_files:
        all_tasks.append((folder, img_name, str(folder_path / img_name)))

print(f"Total images to scan: {len(all_tasks)} across {len(folders)} folders.", flush=True)

findings = []
scanned_count = 0
lock = threading.Lock()

def process_image(item):
    folder, img_name, img_path = item
    engine = get_engine()
    try:
        result, _ = engine(img_path)
        if not result:
            return None
            
        with Image.open(img_path) as im:
            width, height = im.size
            
        hits = []
        for line in result:
            box = line[0]
            text = str(line[1]).strip()
            score = float(line[2])
            
            # Check URLs
            urls = URL_PATTERN.findall(text)
            clean_urls = [u for u in urls if 'drawingsboard.com' not in u.lower()]
            
            # Check Emails
            emails = EMAIL_PATTERN.findall(text)
            clean_emails = [e for e in emails if 'dandelionpa7@gmail.com' not in e.lower()]
            
            # Check Credits
            credits = CREDIT_PATTERN.findall(text)
            
            if clean_urls or clean_emails or credits:
                hits.append({
                    "text": text,
                    "score": score,
                    "box": box,
                    "clean_urls": clean_urls,
                    "clean_emails": clean_emails,
                    "credits": credits
                })
                
        if hits:
            return {
                "folder": folder,
                "image": img_name,
                "rel_path": img_path.replace("\\", "/"),
                "dimensions": [width, height],
                "hits": hits
            }
    except Exception as e:
        print(f"Error on {img_path}: {e}", flush=True)
    return None

workers = min(12, os.cpu_count() or 4)
print(f"Running with {workers} parallel threads...", flush=True)

with ThreadPoolExecutor(max_workers=workers) as executor:
    futures = {executor.submit(process_image, task): task for task in all_tasks}
    for fut in as_completed(futures):
        with lock:
            scanned_count += 1
            if scanned_count % 30 == 0 or scanned_count == len(all_tasks):
                print(f"Progress: {scanned_count}/{len(all_tasks)} scanned... ({len(findings)} hits so far)", flush=True)
        res = fut.result()
        if res:
            with lock:
                findings.append(res)
                hit_texts = [h['text'] for h in res['hits']]
                print(f"   [!] HIT in {res['folder']}/{res['image']}: {hit_texts}", flush=True)

print(f"\nScan complete! Found {len(findings)} images containing external URLs, emails, or agency credits.", flush=True)

with open("ocr_findings.json", "w", encoding="utf-8") as f:
    json.dump(findings, f, indent=2)

print("Saved report to ocr_findings.json", flush=True)
