from PIL import Image
import numpy as np

im = Image.open('react-app/public/images/murami/murami_14.png')
print("murami_14 size:", im.size) # (5760, 3273)
w, h = im.size

# Check the background color at various coordinates outside the cat
arr = np.array(im)
bg_samples = [
    arr[100, 100],
    arr[100, w - 100],
    arr[h - 100, 100],
    arr[h - 100, w - 100],
    arr[2500, 200],
    arr[3000, 200],
]
print("BG samples:", bg_samples)

# Find where the text starts vertically (from around y=2400 down to bottom)
# The text is centered. Let's inspect a horizontal slice around y=2700..3200
for y in range(2500, h, 50):
    row = arr[y, :]
    # compare with bg
    bg = arr[y, 100]
    diff = np.abs(row[:, :3] - bg[:3]).sum(axis=1)
    non_bg_count = (diff > 30).sum()
    if non_bg_count > 0:
        print(f"y={y}: non_bg_count={non_bg_count}")
