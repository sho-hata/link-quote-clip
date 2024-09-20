import { crx, defineManifest } from "@crxjs/vite-plugin";
import { defineConfig } from "vite";

const manifest = defineManifest({
	manifest_version: 3,
	description:
		"A Chrome extension that lets you copy selected text along with the URL in a citation-friendly format for easy quoting.",
	name: "link-quote-clip",
	version: "0.1.0",
	permissions: ["contextMenus", "scripting", "activeTab"],
	background: {
		service_worker: "src/background/index.ts",
	},
	action: {},
	icons: {
		16: "icons/icon16.png",
		48: "icons/icon48.png",
		128: "icons/icon128.png",
	},
});

export default defineConfig({
	plugins: [crx({ manifest })],
});
