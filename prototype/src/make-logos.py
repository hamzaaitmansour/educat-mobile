import base64, io, sys
from PIL import Image
brand, out = sys.argv[1], sys.argv[2]
def shrink(name, width):
    im = Image.open(f"{brand}/{name}").convert("RGBA")
    h = round(im.height * width / im.width)
    im = im.resize((width, h), Image.LANCZOS)
    buf = io.BytesIO()
    im.save(buf, "WEBP", quality=90, method=6)
    return "data:image/webp;base64," + base64.b64encode(buf.getvalue()).decode(), len(buf.getvalue()), (width, h)
full, nf, sf = shrink("logo-educazenkids.png", 520)
mark, nm, sm = shrink("logo-mark.png", 120)
with open(out, "w", encoding="utf-8") as f:
    f.write("const LOGO_FULL = '" + full + "';\n")
    f.write("const LOGO_MARK = '" + mark + "';\n")
print("full", sf, nf, "bytes; mark", sm, nm, "bytes")
