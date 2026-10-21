import os, glob
from PIL import Image

scratch_dir = r'C:\Users\vrund\.gemini\antigravity-ide\brain\d705996e-c15b-4193-8f04-aa1e8f5987d2\scratch\orchidea_checks'
os.makedirs(scratch_dir, exist_ok=True)

for tgt in ['blank-body', 'crystal', 'brave-rx', 'rest-religion']:
    folder = os.path.join('react-app/public/images', tgt)
    files = sorted(glob.glob(os.path.join(folder, '*')))
    for f in files:
        im = Image.open(f)
        bname = os.path.basename(f)
        # check if aspect ratio is like social media / phone or has small text
        # let's save thumbnails
        im_thumb = im.resize((600, int(600 * im.height / im.width)), Image.Resampling.LANCZOS)
        im_thumb.convert('RGB').save(os.path.join(scratch_dir, f"{tgt}_{bname}.jpg"), quality=75)

print("Saved all thumbnails for orchidea projects")
