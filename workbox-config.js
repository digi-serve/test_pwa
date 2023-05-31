module.exports = {
  globDirectory: "pwa/",
  globPatterns: ["**/*.{woff,woff2,js,css,png,jpg,svg,html}"],
  /* pass array of globs to exclude from caching */
  globIgnores: [],
  ignoreURLParametersMatching: [/^utm_/, /^fbclid$/],
  swDest: "pwa/service-worker.js",
};
