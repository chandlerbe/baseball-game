require.config({
  baseUrl: "../",
  shim: {
    knockout: {
      exports: "ko"
    },
    knockoutValidation: {
      exports: "kov"
    }
  },
  paths: {
    knockout: "../node_modules/knockout/build/output/knockout-latest",
    knockoutValidation:
      "../node_modules/knockout.validation/dist/knockout.validation.min.js"
  }
});
