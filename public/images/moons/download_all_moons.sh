#!/bin/bash

echo "Downloading moon textures from Wikimedia Commons (NASA public domain)..."

# Jupiter's moons
curl -sL "https://upload.wikimedia.org/wikipedia/commons/7/7b/Io_highest_resolution_true_color.jpg" -o io_src.jpg && echo "✓ Io"
curl -sL "https://upload.wikimedia.org/wikipedia/commons/5/54/Europa-moon.jpg" -o europa_src.jpg && echo "✓ Europa"
curl -sL "https://upload.wikimedia.org/wikipedia/commons/f/f2/Ganymede_g1_true-edit1.jpg" -o ganymede_src.jpg && echo "✓ Ganymede"
curl -sL "https://upload.wikimedia.org/wikipedia/commons/e/e9/Callisto.jpg" -o callisto_src.jpg && echo "✓ Callisto"

# Saturn's moons
curl -sL "https://upload.wikimedia.org/wikipedia/commons/2/29/Titan_in_true_color.jpg" -o titan_src.jpg && echo "✓ Titan"
curl -sL "https://upload.wikimedia.org/wikipedia/commons/8/83/Enceladus_from_Voyager.jpg" -o enceladus_src.jpg && echo "✓ Enceladus"
curl -sL "hd.wikimedia.org/wikipedia/commons/6/64/Mimas_Cassini.jpg" -o mimas_src.jpg && echo "✓ Mimas"
curl -sL "https://upload.wikimedia.org/wikipedia/commons/9/9c/Rhea_true_color.jpg" -o rhea_src.jpg && echo "✓ Rhea"

# Neptune's moon
curl -sL "https://upload.wikimedia.org/wikipedia/commons/a/a8/Triton_Voyager_2.jpg" -o triton_src.jpg && echo "✓ Triton"

echo ""
echo "Download complete! Converting to 2K WebP format..."
