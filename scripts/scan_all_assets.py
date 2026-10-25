import os
import re
import json
from pathlib import Path
from rapidocr_onnxruntime import RapidOCR
from PIL import Image

engine = RapidOCR()

IMAGE_ROOT = Path("react-app/public/images")

# Suspicious keywords
URL_PATTERN = re.compile(r'(https?://[^\s]+|www\.[^\s]+|[a-zA-Z0-9-]+\.(?:com|org|net|io|co|agency|design|me|app)(?:/[^\s]*)?)', re.IGNORECASE)
EMAIL_PATTERN = re.compile(r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}', re.IGNORECASE)
CREDIT_PATTERN = re.compile(r'\b(obrazur|behance|dribbble|designed by|art direction|brand designer|credits?|author)\b', re.IGNORECASE)

findings = []
total_scanned = 0

# Exclude non-work folders if any
SKIP_FOLDERS = {'testimonials', 'live-stores', 'development', 'studio'}

# Priority: saas projects + all other work folders
folders = sorted([f for f in os.listdir(IMAGE_ROOT) if (IMAGE_ROOT / f).is_dir() and f not in SKIP_FOLDERS])

print(f"Scanning {len(folders)} project folders...")

for folder in folders:
    folder_path = IMAGE_ROOT / folder
    img_files = sorted([f for f in os.listdir(folder_path) if f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp'))])
    print(f"--> [{folder}] scanning {len(img_files)} images...")
    
    for img_name in img_files:
        img_path = folder_path / img_name
        total_scanned += 1
        try:
            result, _ = engine(str(img_path))
            if not result:
                continue
                
            with Image.open(img_path) as im:
                width, height = im.size
                
            img_findings = []
            for item in result:
                box = item[0] # [[x1,y1], [x2,y2], [x3,y3], [x4,y4]]
                text = str(item[1]).strip()
                score = float(item[2])
                
                # Check for URLs
                urls = URL_PATTERN.findall(text)
                clean_urls = [u for u in urls if 'drawingsboard.com' not in u.lower()]
                
                # Check for Emails
                emails = EMAIL_PATTERN.findall(text)
                clean_emails = [e for e in emails if 'dandelionpa7@gmail.com' not in e.lower()]
                
                # Check for Credits / Agency / Obrazur / Behance
                credits = CREDIT_PATTERN.findall(text)
                
                if clean_urls or clean_emails or credits:
                    img_findings.append({
                        "text": text,
                        "score": score,
                        "box": box,
                        "clean_urls": clean_urls,
                        "clean_emails": clean_emails,
                        "credits": credits
                    })
                    
            if img_findings:
                findings.append({
                    "folder": folder,
                    "image": img_name,
                    "rel_path": str(img_path).replace("\\", "/"),
                    "dimensions": [width, height],
                    "hits": img_findings
                })
                print(f"   [!] Hit in {folder}/{img_name}: {[h['text'] for h in img_findings]}")
        except Exception as e:
            print(f"Error reading {img_path}: {e}")

print(f"\nScan completed! Scanned {total_scanned} images. Total images with hits: {len(findings)}")

with open("ocr_findings.json", "w", encoding="utf-8") as f:
    json.dump(findings, f, indent=2)

print("Saved report to ocr_findings.json")
