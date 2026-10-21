import os
import glob
import re
import easyocr

reader = easyocr.Reader(['en'], gpu=False, model_storage_directory=r'C:\Users\vrund\.EasyOCR\model')

scratch_dir = r'C:\Users\vrund\.gemini\antigravity-ide\brain\d705996e-c15b-4193-8f04-aa1e8f5987d2\scratch\outros'
thumbnails = sorted(glob.glob(os.path.join(scratch_dir, '*.png')) + glob.glob(os.path.join(scratch_dir, '*.jpg')))

keywords = ['@', 'gmail', 'mail', 'thank', 'watching', 'collaborat', 'inquir', 'credit', 'behance', 'licens', 'designed']

print(f"Scanning {len(thumbnails)} thumbnails...")

matches = []

for idx, thumb in enumerate(thumbnails):
    bname = os.path.basename(thumb)
    try:
        # read text
        results = reader.readtext(thumb, detail=0)
        full_text = " ".join(results)
        lower_text = full_text.lower()
        found = [kw for kw in keywords if kw in lower_text]
        if found:
            print(f"[{idx+1}/{len(thumbnails)}] MATCH: {bname} -> Keywords: {found}")
            print(f"   Text: {full_text}")
            matches.append((bname, found, full_text))
        else:
            if idx % 10 == 0:
                print(f"[{idx+1}/{len(thumbnails)}] Checked {bname} (no match)")
    except Exception as e:
        print(f"Error on {bname}: {e}")

print("\n=== SUMMARY OF MATCHES ===")
for bname, found, txt in matches:
    print(f"File: {bname}")
    print(f"Found: {found}")
    print(f"Text: {txt}\n")
