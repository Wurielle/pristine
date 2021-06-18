module.exports = {
  plugins: [
    require("tailwindcss")("./tailwind.config.js"),
    require("autoprefixer"),
    require("postcss-pxtorem")({
      replace: true,
      propList: ["*"]
    })
  ]
};
