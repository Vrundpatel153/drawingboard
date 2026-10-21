import json
import urllib.request
import os
from PIL import Image

scratch_dir = r'C:\Users\vrund\.gemini\antigravity-ide\brain\d705996e-c15b-4193-8f04-aa1e8f5987d2\scratch\framer_lasts'
os.makedirs(scratch_dir, exist_ok=True)

with open('react-app/src/data/projectsData.json', 'r', encoding='utf-8') as f:
    projects = json.load(f)

for p in projects:
    title = p.get('title')
    imgs = p.get('images', [])
    if not imgs:
        continue
    last_img = imgs[-1]
    if 'framerusercontent.com' in last_img:
        # download and save preview
        fname = p.get('id') or title.replace(' ', '_').replace('/', '_')[:25]
        out_path = os.path.join(scratch_dir, f"{fname}.jpg")
        if not os.path.exists(out_path):
            try:
                urllib.request.urlretrieve(last_img, out_path)
                print(f"Downloaded {fname}")
            except Exception as e:
                print(f"Error {fname}: {e}")

print("Done downloading framer last images")
