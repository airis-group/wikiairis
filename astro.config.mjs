import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import icon from "astro-icon";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  devToolbar: { enabled: false },
  integrations: [react({
    include: ["**/react/*"],
  }), tailwind(), icon()]
});