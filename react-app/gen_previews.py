import os
from PIL import Image

scratch_dir = r'C:\Users\vrund\.gemini\antigravity-ide\brain\d705996e-c15b-4193-8f04-aa1e8f5987d2\scratch'
os.makedirs(scratch_dir, exist_ok=True)

# 1. murami_14
im1 = Image.open('react-app/public/images/murami/murami_14.png')
print('murami_14:', im1.size, im1.mode)
im1_small = im1.resize((1200, int(1200 * im1.height / im1.width)), Image.Resampling.LANCZOS)
im1_small.save(os.path.join(scratch_dir, 'murami_14_preview.png'))

# 2. matcha-club_16
im2 = Image.open('react-app/public/images/matcha-club/matcha-club_16.png')
print('matcha-club_16:', im2.size, im2.mode)
im2_small = im2.resize((1200, int(1200 * im2.height / im2.width)), Image.Resampling.LANCZOS)
im2_small.save(os.path.join(scratch_dir, 'matcha_16_preview.png'))

print('Saved previews successfully')
