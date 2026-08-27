from PIL import Image, ImageDraw, ImageFont
import os

width, height = 1200, 627
bg_color = (26, 33, 43)  # #1A212B

image = Image.new('RGB', (width, height), bg_color)
draw = ImageDraw.Draw(image, 'RGBA')

# Draw some gradient-like circles for the background
draw.ellipse((-100, -100, 500, 500), fill=(238, 108, 77, 15))  # Burnt Coral
draw.ellipse((800, 300, 1400, 900), fill=(152, 193, 217, 20))  # Glacier Ice Cyan

# Glassmorphic card
card_x, card_y = 80, 80
card_w, card_h = 1040, 467
card_r = 32

# Function to draw rounded rectangle
def draw_rounded_rect(draw, xy, rad, fill, outline=None):
    x1, y1, x2, y2 = xy
    draw.rectangle((x1, y1 + rad, x2, y2 - rad), fill=fill)
    draw.rectangle((x1 + rad, y1, x2 - rad, y2), fill=fill)
    draw.pieslice((x1, y1, x1 + rad * 2, y1 + rad * 2), 180, 270, fill=fill)
    draw.pieslice((x2 - rad * 2, y1, x2, y1 + rad * 2), 270, 360, fill=fill)
    draw.pieslice((x1, y2 - rad * 2, x1 + rad * 2, y2), 90, 180, fill=fill)
    draw.pieslice((x2 - rad * 2, y2 - rad * 2, x2, y2), 0, 90, fill=fill)
    if outline:
        draw.rounded_rectangle(xy, rad, outline=outline, width=2)

draw_rounded_rect(draw, (card_x, card_y, card_x+card_w, card_y+card_h), card_r, fill=(41, 50, 65, 200), outline=(152, 193, 217, 50))

# Try to load a nicer font, fallback to standard if not found
try:
    font_greeting = ImageFont.truetype("consola.ttf", 28)
    font_name = ImageFont.truetype("segoeuib.ttf", 80)
    font_role = ImageFont.truetype("segoeui.ttf", 40)
    font_tag = ImageFont.truetype("segoeuib.ttf", 24)
except IOError:
    try:
        font_greeting = ImageFont.truetype("arial.ttf", 28)
        font_name = ImageFont.truetype("arialbd.ttf", 80)
        font_role = ImageFont.truetype("arial.ttf", 40)
        font_tag = ImageFont.truetype("arialbd.ttf", 24)
    except IOError:
        font_greeting = ImageFont.load_default()
        font_name = ImageFont.load_default()
        font_role = ImageFont.load_default()
        font_tag = ImageFont.load_default()

# Greeting
draw.text((140, 140), "<Hello World />", fill=(238, 108, 77), font=font_greeting)

# Name
draw.text((140, 200), "Alaa Hany ElGebaly", fill=(240, 244, 248), font=font_name)

# Role
draw.text((140, 310), "Mobile Application Developer", fill=(152, 193, 217), font=font_role)

# Badges (Added KMP)
tags = ["Android Native", "Flutter", "KMP"]
start_x = 140
for tag in tags:
    # Measure text roughly, or just use a fixed width
    text_bbox = draw.textbbox((0,0), tag, font=font_tag)
    tw = text_bbox[2] - text_bbox[0]
    th = text_bbox[3] - text_bbox[1]
    
    # badge bg
    draw_rounded_rect(draw, (start_x, 420, start_x + tw + 40, 420 + 50), 25, fill=(152, 193, 217, 25), outline=(152, 193, 217, 50))
    # text
    draw.text((start_x + 20, 427), tag, fill=(224, 251, 252), font=font_tag)
    
    start_x += tw + 60

# Domain
draw.text((800, 430), "alaa7hany.github.io", fill=(126, 151, 166), font=font_greeting)

# Save the image
os.makedirs('assets', exist_ok=True)
image.convert('RGB').save('assets/linkedin-preview.png', 'PNG')
print("Image saved successfully to assets/linkedin-preview.png")
