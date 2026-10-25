import os
from PIL import Image
import json

with open('ocr_findings.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

os.makedirs('scripts/crops', exist_ok=True)

targets = {
    'covalent_02.png': 'covalent',
    'covalent_03.png': 'covalent',
    'helione_02.png': 'helione',
    'melden_11.png': 'melden',
    'radiance_04.png': 'radiance',
    'aerotech_06.png': 'aerotech',
    'aerotech_16.png': 'aerotech',
    'daisy_06_tokens_and_type.webp': 'daisy',
    'henro_09.png': 'henro',
    'henro_13.png': 'henro',
    'henro_14.png': 'henro',
    'henro_15.png': 'henro',
    'henro_16.png': 'henro',
    'newdestin_02.png': 'newdestin',
    'newdestin_13.png': 'newdestin',
    'newdestin_15.png': 'newdestin',
    'seroq_07.png': 'seroq',
    'seroq_11.png': 'seroq',
    'seroq_14.png': 'seroq',
    'seroq_15.png': 'seroq',
    'westerico_16.png': 'westerico',
    'moverunion_04.png': 'moverunion',
    'flint_10.png': 'flint',
    'flint_18.png': 'flint',
    'flint_19.png': 'flint'
}

for item in data:
    img_name = item['image']
    folder = item['folder']
    if img_name in targets:
        img_path = f"react-app/public/images/{folder}/{img_name}"
        with Image.open(img_path) as im:
            w, h = im.size
            for idx, h_info in enumerate(item['hits']):
                box = h_info['box']
                xs = [pt[0] for pt in box]
                ys = [pt[1] for pt in box]
                min_x = max(0, int(min(xs)) - 20)
                max_x = min(w, int(max(xs)) + 20)
                min_y = max(0, int(min(ys)) - 20)
                max_y = min(h, int(max(ys)) + 20)
                
                crop = im.crop((min_x, min_y, max_x, max_y))
                out_name = f"scripts/crops/{folder}_{img_name}_{idx}.png"
                crop.save(out_name)
                print(f"Saved crop {out_name} for text: {h_info['text']}")
