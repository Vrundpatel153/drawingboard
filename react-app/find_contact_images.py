import os
import glob
from PIL import Image

# Let's check murami_14.png and matcha-club_16.png
for path in ['react-app/public/images/murami/murami_14.png', 'react-app/public/images/matcha-club/matcha-club_16.png']:
    if os.path.exists(path):
        im = Image.open(path)
        print(path, im.size, im.mode)
