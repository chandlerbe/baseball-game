require.config({
  baseUrl: "../",
  shim: {
    jquery: {
      exports: "$"
    },
    knockout: {
      exports: "ko"
    }
  },
  paths: {
    jquery: "../node_modules/jquery/dist/jquery.min",
    knockout: "../node_modules/knockout/build/output/knockout-latest"
  }
});
