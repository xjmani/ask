// Web Worker that hosts the WebLLM engine. The main thread talks to it
// through `WebWorkerMLCEngine`, which marshals API calls into messages.
// Running inference in a worker isolates the WebGPU context from the main
// thread's lifecycle. When the engine dies (iOS reclaim, "Module has been
// disposed", etc.), the main thread terminates this worker and respawns
// it, getting a fresh WebGPU context without a full page reload.
import { WebWorkerMLCEngineHandler } from './vendor/web-llm.mjs';
const handler = new WebWorkerMLCEngineHandler();
self.onmessage = (msg) => { handler.onmessage(msg); };
