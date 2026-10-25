import os
import math
from PIL import Image, ImageDraw, ImageFont

FONT_PATH = "C:/Windows/Fonts/segoeui.ttf"
FONT_BOLD_PATH = "C:/Windows/Fonts/segoeuib.ttf"
FONT_MONO_PATH = "C:/Windows/Fonts/consola.ttf"

def get_font(size, bold=False, mono=False):
    path = FONT_BOLD_PATH if bold else (FONT_MONO_PATH if mono else FONT_PATH)
    try:
        return ImageFont.truetype(path, size)
    except:
        return ImageFont.load_default()

def erase_area(im, bbox, bg_color=None):
    draw = ImageDraw.Draw(im)
    x1, y1, x2, y2 = bbox
    if bg_color is None:
        # sample border pixels
        w, h = im.size
        sample_x = max(0, min(w - 1, int(x1) - 3))
        sample_y = max(0, min(h - 1, int(y1) - 3))
        bg_color = im.getpixel((sample_x, sample_y))
    draw.rectangle([x1, y1, x2, y2], fill=bg_color)
    return bg_color

def replace_text_in_rect(im, bbox, new_text, text_color=(255, 255, 255), bg_color=None, font_size=None, bold=False, mono=False, align='left'):
    x1, y1, x2, y2 = bbox
    bg_color = erase_area(im, bbox, bg_color)
    
    rect_h = y2 - y1
    if font_size is None:
        font_size = max(10, int(rect_h * 0.85))
        
    font = get_font(font_size, bold=bold, mono=mono)
    draw = ImageDraw.Draw(im)
    
    text_bbox = draw.textbbox((0, 0), new_text, font=font)
    tw = text_bbox[2] - text_bbox[0]
    th = text_bbox[3] - text_bbox[1]
    
    if align == 'center':
        tx = x1 + (x2 - x1 - tw) / 2
    elif align == 'right':
        tx = x2 - tw
    else:
        tx = x1
        
    ty = y1 + (rect_h - th) / 2 - text_bbox[1]
    draw.text((tx, ty), new_text, fill=text_color, font=font)

print("Patching images...")

# 1. Covalent 02 & 03 (Remove BY OBRAZUR BRANDS)
p_cov2 = "react-app/public/images/covalent/covalent_02.png"
if os.path.exists(p_cov2):
    im = Image.open(p_cov2)
    erase_area(im, [868, 276, 980, 302], bg_color=(255, 255, 255))
    im.save(p_cov2)
    print("Patched covalent_02.png (erased agency credit)")

p_cov3 = "react-app/public/images/covalent/covalent_03.png"
if os.path.exists(p_cov3):
    im = Image.open(p_cov3)
    erase_area(im, [15, 440, 125, 465], bg_color=(241, 241, 241))
    im.save(p_cov3)
    print("Patched covalent_03.png (erased agency credit)")

# 2. Radiance 04 (Remove OBRAZUR BRANDS)
p_rad4 = "react-app/public/images/radiance/radiance_04.png"
if os.path.exists(p_rad4):
    im = Image.open(p_rad4)
    erase_area(im, [1285, 428, 1390, 450], bg_color=(229, 251, 232))
    im.save(p_rad4)
    print("Patched radiance_04.png (erased agency credit)")

# 3. Melden 11 (Remove Design Created by - Obrazur Brands)
p_mel11 = "react-app/public/images/melden/melden_11.png"
if os.path.exists(p_mel11):
    im = Image.open(p_mel11)
    erase_area(im, [1170, 715, 1355, 745], bg_color=(0, 0, 0))
    im.save(p_mel11)
    print("Patched melden_11.png (erased agency credit)")

# 4. Helione 02 (Replace Obrazur credit with The Drawing Board & dandelionpa7@gmail.com)
p_hel2 = "react-app/public/images/helione/helione_02.png"
if os.path.exists(p_hel2):
    im = Image.open(p_hel2)
    # Erase the bottom block
    erase_area(im, [600, 760, 800, 815], bg_color=(207, 204, 203))
    # Render crisp studio credit
    draw = ImageDraw.Draw(im)
    f1 = get_font(11, bold=True)
    f2 = get_font(10)
    draw.text((625, 768), "DESIGNED BY THE DRAWING BOARD", fill=(40, 40, 40), font=f1)
    draw.text((638, 783), "dandelionpa7@gmail.com", fill=(60, 60, 60), font=f2)
    draw.text((658, 796), "drawingsboard.com", fill=(80, 80, 80), font=f2)
    im.save(p_hel2)
    print("Patched helione_02.png (updated contact to The Drawing Board / dandelionpa7@gmail.com)")

# 5. Aerotech 06 & 16 (Replace hello@aerotech.no with dandelionpa7@gmail.com)
p_aero6 = "react-app/public/images/aerotech/aerotech_06.png"
if os.path.exists(p_aero6):
    im = Image.open(p_aero6)
    replace_text_in_rect(im, [508, 186, 642, 210], "dandelionpa7@gmail.com", text_color=(40, 40, 40), bg_color=(248, 248, 248), font_size=12)
    im.save(p_aero6)
    print("Patched aerotech_06.png (email -> dandelionpa7@gmail.com)")

p_aero16 = "react-app/public/images/aerotech/aerotech_16.png"
if os.path.exists(p_aero16):
    im = Image.open(p_aero16)
    replace_text_in_rect(im, [720, 302, 840, 324], "dandelionpa7@gmail.com", text_color=(40, 40, 40), bg_color=(248, 254, 255), font_size=12)
    im.save(p_aero16)
    print("Patched aerotech_16.png (email -> dandelionpa7@gmail.com)")

# 6. Daisy 06 (Replace info@hidaisy.ai with dandelionpa7@gmail.com)
p_daisy6 = "react-app/public/images/daisy/daisy_06_tokens_and_type.webp"
if os.path.exists(p_daisy6):
    im = Image.open(p_daisy6)
    replace_text_in_rect(im, [1160, 1618, 1342, 1650], "dandelionpa7@gmail.com", text_color=(255, 255, 255), bg_color=(0, 0, 0), font_size=18, mono=True)
    im.save(p_daisy6)
    print("Patched daisy_06_tokens_and_type.webp (email -> dandelionpa7@gmail.com)")

# 7. Henro 09, 13, 14, 15, 16 (Replace HENRO.NET with drawingsboard.com and INFO@HENRO.COM with dandelionpa7@gmail.com)
p_h09 = "react-app/public/images/henro/henro_09.png"
if os.path.exists(p_h09):
    im = Image.open(p_h09)
    # top card
    replace_text_in_rect(im, [290, 506, 500, 545], "drawingsboard.com", text_color=(240, 240, 240), bg_color=(27, 27, 27), font_size=24)
    replace_text_in_rect(im, [292, 630, 620, 668], "dandelionpa7@gmail.com", text_color=(240, 240, 240), bg_color=(25, 25, 25), font_size=23)
    # bottom card
    replace_text_in_rect(im, [1362, 1242, 1580, 1280], "drawingsboard.com", text_color=(240, 240, 240), bg_color=(27, 27, 27), font_size=24)
    replace_text_in_rect(im, [1365, 1368, 1700, 1405], "dandelionpa7@gmail.com", text_color=(240, 240, 240), bg_color=(25, 25, 25), font_size=23)
    im.save(p_h09)
    print("Patched henro_09.png")

p_h13 = "react-app/public/images/henro/henro_13.png"
if os.path.exists(p_h13):
    im = Image.open(p_h13)
    replace_text_in_rect(im, [2640, 740, 2900, 783], "drawingsboard.com", text_color=(240, 240, 240), bg_color=(25, 25, 25), font_size=26)
    replace_text_in_rect(im, [2640, 850, 3030, 892], "dandelionpa7@gmail.com", text_color=(240, 240, 240), bg_color=(25, 25, 25), font_size=25)
    im.save(p_h13)
    print("Patched henro_13.png")

p_h14 = "react-app/public/images/henro/henro_14.png"
if os.path.exists(p_h14):
    im = Image.open(p_h14)
    replace_text_in_rect(im, [1630, 412, 1900, 456], "drawingsboard.com", text_color=(240, 240, 240), bg_color=(7, 7, 7), font_size=27)
    replace_text_in_rect(im, [1630, 555, 2040, 600], "dandelionpa7@gmail.com", text_color=(240, 240, 240), bg_color=(7, 7, 7), font_size=26)
    im.save(p_h14)
    print("Patched henro_14.png")

p_h15 = "react-app/public/images/henro/henro_15.png"
if os.path.exists(p_h15):
    im = Image.open(p_h15)
    replace_text_in_rect(im, [2480, 1560, 2750, 1604], "drawingsboard.com", text_color=(240, 240, 240), bg_color=(21, 21, 21), font_size=26)
    replace_text_in_rect(im, [2480, 1704, 2900, 1748], "dandelionpa7@gmail.com", text_color=(240, 240, 240), bg_color=(21, 21, 21), font_size=25)
    im.save(p_h15)
    print("Patched henro_15.png")

p_h16 = "react-app/public/images/henro/henro_16.png"
if os.path.exists(p_h16):
    im = Image.open(p_h16)
    replace_text_in_rect(im, [3124, 1528, 3300, 1558], "drawingsboard.com", text_color=(240, 240, 240), bg_color=(18, 18, 18), font_size=18)
    replace_text_in_rect(im, [3124, 1612, 3385, 1645], "dandelionpa7@gmail.com", text_color=(240, 240, 240), bg_color=(18, 18, 18), font_size=18)
    im.save(p_h16)
    print("Patched henro_16.png")

# 8. Seroq 07, 11, 14, 15
p_s07 = "react-app/public/images/seroq/seroq_07.png"
if os.path.exists(p_s07):
    im = Image.open(p_s07)
    replace_text_in_rect(im, [2280, 1553, 2460, 1589], "drawingsboard.com", text_color=(240, 240, 240), bg_color=(0, 0, 0), font_size=21)
    replace_text_in_rect(im, [2595, 1550, 2875, 1590], "dandelionpa7@gmail.com", text_color=(240, 240, 240), bg_color=(0, 0, 0), font_size=21)
    im.save(p_s07)
    print("Patched seroq_07.png")

p_s14 = "react-app/public/images/seroq/seroq_14.png"
if os.path.exists(p_s14):
    im = Image.open(p_s14)
    replace_text_in_rect(im, [1495, 442, 1690, 478], "drawingsboard.com", text_color=(240, 240, 240), bg_color=(1, 1, 1), font_size=22)
    replace_text_in_rect(im, [1755, 442, 2040, 478], "dandelionpa7@gmail.com", text_color=(240, 240, 240), bg_color=(1, 1, 1), font_size=22)
    im.save(p_s14)
    print("Patched seroq_14.png")

p_s15 = "react-app/public/images/seroq/seroq_15.png"
if os.path.exists(p_s15):
    im = Image.open(p_s15)
    # Erase the angled email on purple background
    erase_area(im, [1240, 540, 1570, 640], bg_color=(106, 86, 235))
    im.save(p_s15)
    print("Patched seroq_15.png (erased email on card)")

p_s11 = "react-app/public/images/seroq/seroq_11.png"
if os.path.exists(p_s11):
    im = Image.open(p_s11)
    # Erase the cards contact text
    erase_area(im, [440, 510, 730, 650], bg_color=(242, 241, 239))
    erase_area(im, [2360, 1470, 2650, 1650], bg_color=(242, 241, 239))
    erase_area(im, [680, 1820, 940, 2000], bg_color=(242, 241, 239))
    im.save(p_s11)
    print("Patched seroq_11.png (erased contact text on stationery)")

# 9. Newdestin 02, 13, 15
p_nd15 = "react-app/public/images/newdestin/newdestin_15.png"
if os.path.exists(p_nd15):
    im = Image.open(p_nd15)
    replace_text_in_rect(im, [310, 445, 470, 467], "drawingsboard.com", text_color=(220, 220, 220), bg_color=(23, 23, 23), font_size=12)
    replace_text_in_rect(im, [618, 444, 785, 467], "dandelionpa7@gmail.com", text_color=(220, 220, 220), bg_color=(38, 38, 38), font_size=12)
    im.save(p_nd15)
    print("Patched newdestin_15.png")

p_nd13 = "react-app/public/images/newdestin/newdestin_13.png"
if os.path.exists(p_nd13):
    im = Image.open(p_nd13)
    erase_area(im, [570, 765, 650, 792], bg_color=(249, 249, 249))
    erase_area(im, [1038, 765, 1120, 792], bg_color=(249, 249, 249))
    im.save(p_nd13)
    print("Patched newdestin_13.png")

p_nd02 = "react-app/public/images/newdestin/newdestin_02.png"
if os.path.exists(p_nd02):
    im = Image.open(p_nd02)
    erase_area(im, [200, 50, 340, 115], bg_color=(69, 71, 75))
    erase_area(im, [950, 170, 1100, 240], bg_color=(69, 71, 75))
    im.save(p_nd02)
    print("Patched newdestin_02.png")

# 10. Westerico 16
p_west16 = "react-app/public/images/westerico/westerico_16.png"
if os.path.exists(p_west16):
    im = Image.open(p_west16)
    erase_area(im, [455, 324, 546, 342], bg_color=(251, 56, 56))
    erase_area(im, [965, 324, 1058, 342], bg_color=(243, 243, 243))
    replace_text_in_rect(im, [980, 317, 1050, 330], "drawingsboard.com", text_color=(40, 40, 40), bg_color=(255, 255, 255), font_size=8)
    im.save(p_west16)
    print("Patched westerico_16.png")

# 11. Moverunion 04
p_mov04 = "react-app/public/images/moverunion/moverunion_04.png"
if os.path.exists(p_mov04):
    im = Image.open(p_mov04)
    replace_text_in_rect(im, [310, 428, 380, 443], "drawingsboard.com", text_color=(220, 220, 220), bg_color=(17, 17, 17), font_size=8)
    replace_text_in_rect(im, [1028, 717, 1130, 731], "dandelionpa7@gmail.com", text_color=(220, 220, 220), bg_color=(21, 17, 11), font_size=8)
    im.save(p_mov04)
    print("Patched moverunion_04.png")

# 12. Flint 10, 18, 19
p_fl18 = "react-app/public/images/flint/flint_18.png"
if os.path.exists(p_fl18):
    im = Image.open(p_fl18)
    replace_text_in_rect(im, [4020, 700, 4230, 746], "drawingsboard.com", text_color=(255, 255, 255), bg_color=(19, 17, 31), font_size=28)
    replace_text_in_rect(im, [4020, 748, 4360, 788], "dandelionpa7@gmail.com", text_color=(255, 255, 255), bg_color=(18, 16, 30), font_size=26)
    im.save(p_fl18)
    print("Patched flint_18.png")

p_fl10 = "react-app/public/images/flint/flint_10.png"
if os.path.exists(p_fl10):
    im = Image.open(p_fl10)
    erase_area(im, [2480, 1110, 2870, 1340], bg_color=(26, 24, 37))
    im.save(p_fl10)
    print("Patched flint_10.png")

p_fl19 = "react-app/public/images/flint/flint_19.png"
if os.path.exists(p_fl19):
    im = Image.open(p_fl19)
    erase_area(im, [2000, 580, 2190, 665], bg_color=(98, 45, 223))
    erase_area(im, [1500, 660, 1780, 755], bg_color=(90, 42, 202))
    im.save(p_fl19)
    print("Patched flint_19.png")

print("\nAll target images successfully patched!")
