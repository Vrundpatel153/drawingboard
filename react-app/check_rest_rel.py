import os, glob
from PIL import Image

# Let's check rest-religion_19
p = 'react-app/public/images/rest-religion/rest-religion_19.png'
im = Image.open(p)
print('rest-religion_19 size:', im.size)
# The second story header is around x: 25% to 50%, y: 0 to 10%
w, h = im.size
crop_area = im.crop((int(w * 0.25), 0, int(w * 0.50), int(h * 0.10)))
crop_area.save(r'C:\Users\vrund\.gemini\antigravity-ide\brain\d705996e-c15b-4193-8f04-aa1e8f5987d2\scratch\rest_religion_header.png')
print('Saved header crop')
