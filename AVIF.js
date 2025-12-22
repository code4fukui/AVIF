import avif_dec from "./dec/avif_dec.js";
import avif_enc from "./enc/avif_enc.js";

const decoder = await avif_dec();
const encoder = await avif_enc();

export const default_options = {
  // [0 - 100]
  // 0 = worst quality
  // 100 = lossless
  quality: 75,
  // As above, but -1 means 'use quality'
  qualityAlpha: -1,
  // [0 - 6]
  // Creates 2^n tiles in that dimension
  tileRowsLog2: 6,
  tileColsLog2: 6,
  // [0 - 10]
  // 0 = slowest
  // 10 = fastest
  speed: 10,
  // 0 = 4:0:0 // gray scale
  // 1 = 4:2:0 // reds and blues look washed out
  // 2 = 4:2:2
  // 3 = 4:4:4
  subsample: 3,
  // Extra chroma compression
  chromaDeltaQ: false,
  // 0-7
  sharpness: 0,
  // 0 = auto
  // 1 = PSNR
  // 2 = SSIM
  tune: 0,
  // 0-50
  denoiseLevel: 0,
  // toggles AVIF_CHROMA_DOWNSAMPLING_SHARP_YUV
  enableSharpYUV: false,
};

export class AVIF {
  static encode(imagedata, opt = default_options) {
    const result = encoder.encode(imagedata.data, imagedata.width, imagedata.height, opt);
    return result;
  }
  static decode(avifbin) {
    const imageData = decoder.decode(avifbin);
    return imageData;
  }
};
