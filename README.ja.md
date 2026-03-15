# AVIF

AVIFをJavaScript / WebAssemblyで扱うためのユーティリティ。

## デモ

[AVIF playground](https://code4fukui.github.io/AVIF/)

## 機能

- AVIF形式の画像の読み込み/書き出し
- JPEG→AVIFの変換

## 必要環境

特になし。ブラウザ上で動作します。

## 使い方

```js
import { AVIF } from "https://code4fukui.github.io/AVIF/AVIF.js";

const bin = await Deno.readFile('./example.avif');
const image = AVIF.decode(bin);
console.log(image);

const bin2 = AVIF.encode(image);
console.log(bin2.length);
```

## JPEG→AVIF変換

```sh
deno -A cli_jpg2avif.js [jpeg ファイル名]
```

## ビルド方法

[bin2js](https://github.com/code4fukui/bin2js)を使ってビルドします。
```sh
deno run -A https://code4fukui.github.io/bin2js/bin2js.js dec/avif_dec.wasm
deno run -A https://code4fukui.github.io/bin2js/bin2js.js enc/avif_enc.wasm
```

## 元リポジトリ

- [squoosh/codecs/avif at dev · GoogleChromeLabs/squoosh](https://github.com/GoogleChromeLabs/squoosh/tree/dev/codecs/avif)