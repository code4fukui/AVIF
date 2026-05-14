# AVIF

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

A JavaScript / WebAssembly utility for encoding and decoding AVIF images, designed for use in browsers and Deno.

## Demo

Try the live demo in the [AVIF playground](https://code4fukui.github.io/AVIF/).

## Features

-   **High-Performance:** Fast AVIF encoding and decoding powered by WebAssembly.
-   **Simple API:** Easy-to-use `encode` and `decode` methods.
-   **Cross-Platform:** Runs in modern browsers and the Deno runtime.
-   **Configurable Encoding:** Adjust quality, speed, chroma subsampling, and more.
-   **Command-Line Tool:** Includes a utility for converting JPEG files to AVIF.

## Usage

This library can be used directly in Deno or modern browsers via ES modules.

```javascript
import { AVIF } from "https://code4fukui.github.io/AVIF/AVIF.js";

// --- Decoding ---
// Load an AVIF file into a Uint8Array
const avifBin = await Deno.readFile('./example.avif');

// Decode the binary data into raw image data
const imageData = AVIF.decode(avifBin);
// The result is an object: { data: Uint8ClampedArray, width: number, height: number }
console.log(`Decoded image: ${imageData.width}x${imageData.height}`);


// --- Encoding ---
// Encode the raw image data back into an AVIF file
const avifBin2 = AVIF.encode(imageData);
console.log(`Re-encoded AVIF file size: ${avifBin2.length} bytes`);
await Deno.writeFile('./output.avif', avifBin2);
```

## Command-Line Utility: jpg2avif

A simple command-line tool is provided to convert JPEG files to AVIF using Deno.

**Usage:**
```sh
deno run -A cli_jpg2avif.js [jpeg_filename]
```
This will create a new `.avif` file in the same directory (e.g., `image.jpg` -> `image.avif`).

## Encoding Options

The `AVIF.encode(imageData, options)` method accepts an optional `options` object to control the encoding process.

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `quality` | `number` | `75` | Image quality (0-100). 0 is worst, 100 is lossless. |
| `qualityAlpha` | `number` | `-1` | Alpha channel quality (0-100). `-1` uses the `quality` value. |
| `speed` | `number` | `10` | Encoding speed (0-10). 0 is the slowest and highest quality, 10 is the fastest. |
| `subsample` | `number` | `3` | Chroma subsampling. 0: 4:0:0, 1: 4:2:0, 2: 4:2:2, 3: 4:4:4. |
| `tileRowsLog2` | `number` | `6` | Log2 of tile rows (0-6). Creates 2^n tiles. |
| `tileColsLog2` | `number` | `6` | Log2 of tile columns (0-6). Creates 2^n tiles. |
| `chromaDeltaQ` | `boolean` | `false` | Enable extra chroma compression. |
| `sharpness` | `number` | `0` | Sharpness (0-7). |
| `tune` | `number` | `0` | Tune metric. 0: auto, 1: PSNR, 2: SSIM. |
| `denoiseLevel` | `number` | `0` | Denoise level (0-50). |
| `enableSharpYUV` | `boolean` | `false` | Toggles sharp YUV chroma downsampling. |

## How to Build

The WebAssembly modules are converted to JavaScript files using [bin2js](https://github.com/code4fukui/bin2js). To rebuild them from the `.wasm` files in the `dec/` and `enc/` directories, run the following commands:

```sh
# Convert decoder WASM to JS
deno run -A https://code4fukui.github.io/bin2js/bin2js.js dec/avif_dec.wasm

# Convert encoder WASM to JS
deno run -A https://code4fukui.github.io/bin2js/bin2js.js enc/avif_enc.wasm
```

## Attribution

This project is forked from the AVIF codec implementation in [GoogleChromeLabs/squoosh](https://github.com/GoogleChromeLabs/squoosh/tree/dev/codecs/avif).

The underlying AVIF codec is [libavif](https://github.com/AOMediaCodec/libavif).
