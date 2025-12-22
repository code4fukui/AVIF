import { AVIF } from "./AVIF.js";
import { WebP } from "https://code4fukui.github.io/WebP/WebP.js";

/*
const bin = await Deno.readFile('./example.avif');
const image = AVIF.decode(bin);
console.log(image);

const bin2 = AVIF.encode(image);
console.log(bin2.length);
*/

const bin = await Deno.readFile("./example.webp");
const image = WebP.decode(bin);
console.log(image);

const bin2 = AVIF.encode(image);
console.log(bin2);
await Deno.writeFile("./example.avif", bin2);

const image2 = AVIF.decode(bin2);
console.log(image2);
