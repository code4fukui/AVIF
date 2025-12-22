# AVIF

util for AVIF in JavaScript / WebAssembly

## usage

```js
import { AVIF } from "https://code4fukui.github.io/AVIF/AVIF.js";

const bin = await Deno.readFile('./example.avif');
const image = AVIF.decode(bin);
console.log(image);

const bin2 = AVIF.encode(image);
console.log(bin2.length);
```

## jpg2avif

```sh
deno -A cli_jpg2avif.js [jpeg fn]
```

## how to build

with [bin2js](https://github.com/code4fukui/bin2js)
```sh
deno run -A https://code4fukui.github.io/bin2js/bin2js.js dec/avif_dec.wasm
deno run -A https://code4fukui.github.io/bin2js/bin2js.js enc/avif_enc.wasm
```

## forked from

- [squoosh/codecs/avif at dev · GoogleChromeLabs/squoosh](https://github.com/GoogleChromeLabs/squoosh/tree/dev/codecs/avif) in [GoogleChromeLabs/squoosh: Make images smaller using best-in-class codecs, right in the browser.](https://github.com/GoogleChromeLabs/squoosh)
