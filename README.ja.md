# AVIF

ブラウザおよびDeno向けに設計された、AVIF画像のエンコードおよびデコードを行うためのJavaScript / WebAssemblyユーティリティです。

## デモ

[AVIF playground](https://code4fukui.github.io/AVIF/)でライブデモをお試しください。

## 特徴

-   **高性能:** WebAssemblyを活用した高速なAVIFエンコードおよびデコード。
-   **シンプルなAPI:** 使いやすい `encode` および `decode` メソッド。
-   **クロスプラットフォーム:** モダンブラウザおよびDenoランタイムで動作。
-   **エンコードのカスタマイズ:** 品質、速度、クロマサブサンプリングなどを調整可能。
-   **コマンドラインツール:** JPEGファイルをAVIFに変換するユーティリティを同梱。

## 使い方

このライブラリは、ESモジュールを介してDenoやモダンブラウザで直接使用できます。

```javascript
import { AVIF } from "https://code4fukui.github.io/AVIF/AVIF.js";

// --- デコード ---
// AVIFファイルをUint8Arrayとして読み込む
const avifBin = await Deno.readFile('./example.avif');

// バイナリデータを生の画像データにデコードする
const imageData = AVIF.decode(avifBin);
// 結果は以下のオブジェクト: { data: Uint8ClampedArray, width: number, height: number }
console.log(`デコードされた画像: ${imageData.width}x${imageData.height}`);


// --- エンコード ---
// 生の画像データをAVIFファイルに再エンコードする
const avifBin2 = AVIF.encode(imageData);
console.log(`再エンコードされたAVIFファイルサイズ: ${avifBin2.length}バイト`);
await Deno.writeFile('./output.avif', avifBin2);
```

## コマンドラインユーティリティ: jpg2avif

Denoを使用してJPEGファイルをAVIFに変換する、シンプルなコマンドラインツールを提供しています。

**使い方:**
```sh
deno run -A cli_jpg2avif.js [jpeg_filename]
```
これを実行すると、同じディレクトリに新しい `.avif` ファイルが作成されます（例: `image.jpg` -> `image.avif`）。

## エンコードオプション

`AVIF.encode(imageData, options)` メソッドは、エンコード処理を制御するためのオプションの `options` オブジェクトを受け取ります。

| オプション | タイプ | デフォルト | 説明 |
| :--- | :--- | :--- | :--- |
| `quality` | `number` | `75` | 画像品質（0〜100）。0が最低品質、100がロスレス（可逆圧縮）。 |
| `qualityAlpha` | `number` | `-1` | アルファチャンネルの品質（0〜100）。`-1` を指定すると `quality` の値を使用します。 |
| `speed` | `number` | `10` | エンコード速度（0〜10）。0が最も遅く最高品質、10が最も速い。 |
| `subsample` | `number` | `3` | クロマサブサンプリング。0: 4:0:0, 1: 4:2:0, 2: 4:2:2, 3: 4:4:4。 |
| `tileRowsLog2` | `number` | `6` | タイル行のLog2値（0〜6）。2^n 個のタイルを作成します。 |
| `tileColsLog2` | `number` | `6` | タイル列のLog2値（0〜6）。2^n 個のタイルを作成します。 |
| `chromaDeltaQ` | `boolean` | `false` | 追加のクロマ圧縮を有効にします。 |
| `sharpness` | `number` | `0` | シャープネス（0〜7）。 |
| `tune` | `number` | `0` | チューニングメトリクス。0: auto, 1: PSNR, 2: SSIM。 |
| `denoiseLevel` | `number` | `0` | デノイズ（ノイズ除去）レベル（0〜50）。 |
| `enableSharpYUV` | `boolean` | `false` | Sharp YUVクロマダウンサンプリングの有効/無効を切り替えます。 |

## ビルド方法

WebAssemblyモジュールは、[bin2js](https://github.com/code4fukui/bin2js)を使用してJavaScriptファイルに変換されています。`dec/` および `enc/` ディレクトリ内の `.wasm` ファイルからこれらを再ビルドするには、以下のコマンドを実行します。

```sh
# デコーダーWASMをJSに変換
deno run -A https://code4fukui.github.io/bin2js/bin2js.js dec/avif_dec.wasm

# エンコーダーWASMをJSに変換
deno run -A https://code4fukui.github.io/bin2js/bin2js.js enc/avif_enc.wasm
```

## クレジット

本プロジェクトは、[GoogleChromeLabs/squoosh](https://github.com/GoogleChromeLabs/squoosh/tree/dev/codecs/avif) のAVIFコーデック実装をフォークしたものです。

ベースとなるAVIFコーデックには [libavif](https://github.com/AOMediaCodec/libavif) を使用しています。

## ライセンス

MIT
