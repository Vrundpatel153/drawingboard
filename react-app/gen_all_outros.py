import os
import glob
from PIL import Image

scratch_dir = r'C:\Users\vrund\.gemini\antigravity-ide\brain\d705996e-c15b-4193-8f04-aa1e8f5987d2\scratch\outros'
os.makedirs(scratch_dir, exist_ok=True)

# List of folders in react-app/public/images/
folders = sorted([f for f in glob.glob('react-app/public/images/*') if os.path.isdir(f)])

print(f"Total folders: {len(folders)}")

results = []
for folder in folders:
    fname = os.path.basename(folder)
    # get all image files
    files = sorted([f for f in glob.glob(os.path.join(folder, '*')) if f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp'))])
    if not files:
        continue
    # pick the last 2 files
    last_files = files[-2:]
    for lf in last_files:
        try:
            im = Image.open(lf)
            base = os.path.basename(lf)
            save_name = f"{fname}_{base}"
            im_thumb = im.resize((800, int(800 * im.height / im.width)), Image.Resampling.LANCZOS)
            im_thumb.convert('RGB').save(os.path.join(scratch_dir, save_name), quality=80)
            results.append((fname, base, im.size))
        except Exception as e:
            pass

print(f"Generated {len(results)} outro thumbnails in {scratch_dir}")
