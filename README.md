# ask

Browser-native question answering over a PDF, using a local language model. Your document never leaves your device.

Live: https://ask.xjmani.com

Part of the [xjmani](https://xjmani.com) tools collection.

## What it does

Drop a PDF in the page, ask questions in the chat, get answers with citations that point back to the source paragraph in the document.

- PDF parsing runs in the browser via `pdfjs-dist`.
- Embeddings are computed locally with `all-MiniLM-L6-v2` through transformers.js.
- Inference runs in your GPU through `@mlc-ai/web-llm` using Llama 3.2 3B Instruct (q4f16_1).
- Indexed chunks are persisted in IndexedDB so reopening a previously loaded document is instant.

The first time you load the tool, your browser downloads about 2 GB of model weights from Hugging Face. After that, it runs offline.

## Requirements

WebGPU. Chrome 121+, Edge 121+, or Safari 18+ on macOS Sonoma or newer. Firefox does not yet ship WebGPU on by default.

## Self-host

The whole tool is one `index.html` and a `vendor/` directory. Serve it as static files behind a CSP that allows `connect-src 'self' https://huggingface.co https://cdn-lfs.huggingface.co` so the model can download. The included `nginx.conf` and `Dockerfile` run on any container host.

```
git clone https://github.com/xjmani/ask
cd ask
docker build -t ask .
docker run --rm -p 8080:8080 ask
```

Then open http://localhost:8080 in a WebGPU-capable browser.

## License

MIT. See LICENSE.
