import os
import glob
from PIL import Image

scratch_dir = r'C:\Users\vrund\.gemini\antigravity-ide\brain\d705996e-c15b-4193-8f04-aa1e8f5987d2\scratch\check_behance'
os.makedirs(scratch_dir, exist_ok=True)

targets = ['pronto', 'toodaloo', 'yala', 'reel', 'morning-grain', 'soul-brew', 'banam', 'kame', 'blank-body', 'crystal', 'brave-rx', 'rest-religion']

for tgt in targets:
    folder = os.path.join('react-app/public/images', tgt)
    if not os.path.isdir(folder):
        continue
    files = sorted([f for f in glob.glob(os.path.join(folder, '*')) if f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp'))])
    # Take the last 2 images
    for lf in files[-2:]:
        im = Image.open(lf)
        bname = os.path.basename(lf)
        out_name = f"{tgt}_{bname}.jpg"
        im_thumb = im.resize((900, int(900 * im.height / im.width)), Image.Resampling.LANCZOS)
        im_thumb.convert('RGB').save(os.path.join(scratch_dir, out_name), quality=80)
        print(f"Saved {out_name}")
