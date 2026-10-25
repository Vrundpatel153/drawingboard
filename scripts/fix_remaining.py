from PIL import Image, ImageDraw, ImageFont

FONT_PATH = "C:/Windows/Fonts/segoeui.ttf"

def get_font(size):
    return ImageFont.truetype(FONT_PATH, size)

# 1. Fix Henro 09 (erase @HENRO.CO lines on both top and bottom cards)
p_h09 = "react-app/public/images/henro/henro_09.png"
im_h09 = Image.open(p_h09)
draw_h09 = ImageDraw.Draw(im_h09)
# top card: erase from y=540 to y=675 completely and re-render cleanly
draw_h09.rectangle([285, 500, 650, 675], fill=(26, 26, 26))
font_h09 = get_font(24)
draw_h09.text((292, 515), "drawingsboard.com", fill=(240, 240, 240), font=font_h09)
draw_h09.text((292, 570), "dandelionpa7@gmail.com", fill=(240, 240, 240), font=font_h09)

# bottom card: erase from y=1240 to y=1410 completely and re-render cleanly
draw_h09.rectangle([1355, 1235, 1720, 1410], fill=(26, 26, 26))
draw_h09.text((1365, 1250), "drawingsboard.com", fill=(240, 240, 240), font=font_h09)
draw_h09.text((1365, 1305), "dandelionpa7@gmail.com", fill=(240, 240, 240), font=font_h09)
im_h09.save(p_h09)
print("Updated henro_09.png cleanly")

# 2. Fix Seroq 07 (render dandelionpa7@gmail.com with clean font)
p_s07 = "react-app/public/images/seroq/seroq_07.png"
im_s07 = Image.open(p_s07)
draw_s07 = ImageDraw.Draw(im_s07)
draw_s07.rectangle([2270, 1545, 2920, 1600], fill=(0, 0, 0))
font_s07 = get_font(22)
draw_s07.text((2280, 1555), "drawingsboard.com", fill=(240, 240, 240), font=font_s07)
draw_s07.text((2580, 1555), "dandelionpa7@gmail.com", fill=(240, 240, 240), font=font_s07)
im_s07.save(p_s07)
print("Updated seroq_07.png cleanly")

# 3. Fix Westerico 16 (clean white background and crisp drawingsboard.com)
p_w16 = "react-app/public/images/westerico/westerico_16.png"
im_w16 = Image.open(p_w16)
draw_w16 = ImageDraw.Draw(im_w16)
draw_w16.rectangle([960, 310, 1070, 345], fill=(243, 243, 243))
font_w16 = get_font(9)
draw_w16.text((970, 316), "drawingsboard.com", fill=(40, 40, 40), font=font_w16)
draw_w16.text((970, 328), "dandelionpa7@gmail.com", fill=(40, 40, 40), font=font_w16)
im_w16.save(p_w16)
print("Updated westerico_16.png cleanly")
