const fs = require("fs");
const path = require("path");

const isProduction = process.env.NODE_ENV === "production";
const pages = [];

if (isProduction) {
  fs.writeFileSync("search.json", JSON.stringify([]));
}

const withMdxEnhanced = require("next-mdx-enhanced")({
  layoutPath: "src/layouts",
  onContent: page => {
    if (isProduction) {
      pages.push(page);
      fs.writeFileSync("search.json", JSON.stringify(pages));
    }
  },
  extendFrontMatter: {
    process: (_, frontMatter) => {
      const { __resourcePath, layout } = frontMatter;

      if (!layout) {
        const defaultLayout = __resourcePath.split("/")[0];

        if (defaultLayout === "blog") {
          return {
            layout: "nav-bar"
          };
        } else if (
          fs.existsSync(
            path.join(process.cwd(), `layouts/${defaultLayout}.tsx`)
          )
        ) {
          return {
            layout: defaultLayout
          };
        } else {
          return {
            layout: "docs"
          };
        }
      }
    },
    phase: "both"
  }
});

module.exports = (nextConfig = {}) =>
  withMdxEnhanced({
    ...nextConfig,
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      config.plugins.push(
        new webpack.DefinePlugin({
          PAGES_DIR: JSON.stringify(path.resolve("./pages")),
          MDX_DATA_DIR: JSON.stringify(path.resolve("./.mdx-data"))
        })
      );

      // Don't clobber previous plugins' webpack functions
      if (typeof nextConfig.webpack === "function") {
        return nextConfig.webpack(config, options);
      }

      return config;
    }
  });
