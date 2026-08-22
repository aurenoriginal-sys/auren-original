from pathlib import Path

from fontTools.ttLib import TTFont
from fontTools.subset import Subsetter, Options


FONTS_DIR = Path("fonts")


def convert_variable_font(
    source_name: str,
    output_name: str
):

    source = FONTS_DIR / source_name
    output = FONTS_DIR / output_name


    if not source.exists():

        raise FileNotFoundError(
            f"Font not found: {source}"
        )


    print(
        f"\nConverting {source.name}..."
    )


    font = TTFont(
        str(source)
    )


    # --------------------------------------------------
    # Keep only the characters normally needed
    # by the website.
    # --------------------------------------------------

    unicodes = set()

    for start, end in [

        (0x20, 0x7E),    # Basic Latin
        (0xA0, 0xFF),    # Latin-1 Supplement

    ]:

        unicodes.update(
            range(
                start,
                end + 1
            )
        )


    # --------------------------------------------------
    # Subset
    # --------------------------------------------------

    options = Options()

    options.flavor = "woff2"

    options.layout_features = "*"


    subsetter = Subsetter(
        options=options
    )


    subsetter.populate(
        unicodes=unicodes
    )


    subsetter.subset(
        font
    )


    # --------------------------------------------------
    # Save WOFF2
    # --------------------------------------------------

    font.flavor = "woff2"

    font.save(
        str(output)
    )


    print(
        f"Created: {output.name}"
    )


    print(
        f"Size: {output.stat().st_size:,} bytes"
    )


# ------------------------------------------------------
# INTER
# ------------------------------------------------------

convert_variable_font(
    "Inter-VariableFont_opsz,wght.ttf",
    "inter-variable.woff2"
)


# ------------------------------------------------------
# PLAYFAIR DISPLAY
# ------------------------------------------------------

convert_variable_font(
    "Playfair-VariableFont_opsz,wdth,wght.ttf",
    "playfair-variable.woff2"
)


print(
    "\nFont conversion completed successfully."
)