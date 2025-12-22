import { AVIF } from "https://code4fukui.github.io/AVIF/AVIF.js";
import { JPEG } from "https://code4fukui.github.io/JPEG/JPEG.js";

export const jpg2avif = (bin) => {
  const image = JPEG.decode(bin);
  const bin2 = AVIF.encode(image);
  return bin2;
};
