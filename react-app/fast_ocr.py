import cv2
import easyocr
from PIL import Image

reader = easyocr.Reader(['en'], gpu=False)

def scan_img(path):
    print(f"\n--- Scanning {path} ---")
    im = Image.open(path)
    w, h = im.size
    scale = 1200 / w if w > 1200 else 1.0
    new_w, new_h = int(w * scale), int(h * scale)
    im_resized = im.resize((new_w, new_h), Image.Resampling.LANCZOS)
    temp_path = 'react-app/temp_ocr.jpg'
    im_resized.convert('RGB').save(temp_path, quality=85)
    
    results = reader.readtext(temp_path)
    for bbox, text, prob in results:
        # scale back bbox
        real_bbox = [[int(pt[0]/scale), int(pt[1]/scale)] for pt in bbox]
        print(f"[{prob:.2f}] '{text}' at {real_bbox}")

scan_img('react-app/public/images/murami/murami_14.png')
scan_img('react-app/public/images/matcha-club/matcha-club_16.png')
