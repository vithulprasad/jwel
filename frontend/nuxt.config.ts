// https://nuxt.com/docs/api/configuration/nuxt-config

import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

export default defineNuxtConfig({
  devtools: { enabled: true },
  build: {
    transpile: ["vuetify", "@vuepic/vue-datepicker"],
  },
  modules: [
    'nuxt-primevue',
    "@nuxt/ui",

    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
    "@pinia/nuxt",
  ],

  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },

  app: {
    head: {
      title: "Blue Whistle",
      link: [
        {
          rel: "stylesheet",
          href: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css",
          integrity:
            "sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN",
          crossorigin: "anonymous",
        },
        {
          rel: "stylesheet",
          href: "https://unpkg.com/vue3-form-wizard/dist/style.css",
        },
      ],
      script: [
        {
          src: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js",
          integrity:
            "sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL",
          crossorigin: "anonymous",
        },
        {
          src: "https://unpkg.com/@popperjs/core@2.11.6/dist/umd/popper.min.js",
          integrity:
            "sha384-Vkoo8q4ZlXI/OgJtL+8jFxQpDbprD+Ie/4eMTJ55szgG9/QmA/6I1sDBXddjP9EN",
          crossorigin: "anonymous",
        },
        {
          src: "https://unpkg.com/vue3-form-wizard",
        },
      ],
    },
  },
});
