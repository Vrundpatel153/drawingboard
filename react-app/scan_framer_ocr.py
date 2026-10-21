import os, glob
import easyocr

reader = easyocr.Reader(['en'], gpu=False, model_storage_directory=r'C:\Users\vrund\.EasyOCR\model')
framer_lasts = sorted(glob.glob(r'C:\Users\vrund\.gemini\antigravity-ide\brain\d705996e-c15b-4193-8f04-aa1e8f5987d2\scratch\framer_lasts\*.jpg'))

keywords = ['@', 'gmail', 'mail', 'thank', 'watching', 'collaborat', 'inquir', 'credit', 'behance', 'licens', 'designed']

print(f"Scanning {len(framer_lasts)} framer last images...")

for f in framer_lasts:
    bname = os.path.basename(f)
    try:
        from PIL import Image
        im = Image.open(f)
        # downscale to max width 800
        w, h = im.size
        im_small = im.resize((800, int(800 * h / w)), Image.Resampling.LANCZOS)
        temp_p = r'C:\Users\vrund\.gemini\antigravity-ide\brain\d705996e-c15b-4193-8f04-aa1e8f5987d2\scratch\temp_framer.jpg'
        im_small.convert('RGB').save(temp_p)
        results = reader.readtext(temp_p, detail=0)
        txt = " ".join(results)
        ltxt = txt.lower()
        found = [kw for kw in keywords if kw in ltxt]
        if found:
            print(f"MATCH: {bname} -> {found} : {txt}")
        else:
            print(f"Clean: {bname}")
    except Exception as e:
        print(f"Error {bname}: {e}")
