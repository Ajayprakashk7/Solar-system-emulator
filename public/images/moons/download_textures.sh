#!/bin/bash

# Download moon textures from NASA/JPL sources
# These are public domain textures

echo "Downloading moon textures..."

# Io - volcanic moon
curl -L "https://astrogeology.usgs.gov/cache/images/b/bc9/Io_Voyager_GalileoSSI_global_ClrMosaic_1km.tif" -o io_temp.tif 2>/dev/null && echo "✓ Downloaded Io" || echo "✗ Io failed"

# Europa - icy moon  
curl -L "https://astrogeology.usgs.gov/cache/images/1/18/Europa_Voyager_GalileoSSI_global_mosaic_500m.tif" -o europa_temp.tif 2>/dev/null && echo "✓ Downloaded Europa" || echo "✗ Europa failed"

# Ganymede
curl -L "https://astrogeology.usgs.gov/cache/images/f/f8/Ganymede_Voyager_GalileoSSI_global_ClrMosaic_1435m.tif" -o ganymede_temp.tif 2>/dev/null && echo "✓ Downloaded Ganymede" || echo "✗ Ganymede failed"

# Callisto
curl -L "https://astrogeology.usgs.gov/cache/images/c/c9/Callisto_Voyager_Galileo_global_mosaic_1km.tif" -o p.tif 2>/dev/null && echo "✓ Downloaded Callisto" || echo "✗ Callisto failed"

echo "Phase 1 complete. Check for downloaded files..."
ls -lh *_temp.tif 2>/dev/null || echo "No files downloaded yet"
