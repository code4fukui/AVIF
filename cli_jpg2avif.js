import { jpg2avif } from "./jpg2avif.js";
import { EXT } from "https://code4fukui.github.io/EXT/EXT.js";

const fn = Deno.args[0];
if (!fn) {
  console.log("jpg2avif [jpeg fn]");
  Deno.exit(1);
}
const fn2 = EXT.set(fn, "avif");

const bin = await Deno.readFile(fn);
const bin2 = jpg2avif(bin);
await Deno.writeFile(fn2, bin2);
