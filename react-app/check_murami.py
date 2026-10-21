import os
from PIL import Image

for f in sorted(os.listdir('react-app/public/images/murami')):
    p = os.path.join('react-app/public/images/murami', f)
    im = Image.open(p)
    print(f, im.size)
