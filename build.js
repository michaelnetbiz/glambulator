/* eslint-disable no-console */
import webpack from "webpack";
import developmentConfig from "./webpack.config";

developmentConfig.plugins.push(
  new webpack.DefinePlugin({
    "process.env": {
      "NODE_ENV": JSON.stringify("production")
    }
  }),
  new webpack.optimize.UglifyJsPlugin()
);

webpack(developmentConfig).run((err, stats) => {
  if (err) {
    console.log(err);
    return 1;
  }
  const jsonStats = stats.toJson();
  if (jsonStats.hasErrors) {
    return jsonStats.errors.map(error => {
      console.log(error);
    });
  }
  if (jsonStats.hasWarnings) {
    console.log("Webpack generated the following warnings: ");
    jsonStats.warnings.map(warning => {
      console.log(warning);
    });
  }
  console.log(`Webpack stats: ${stats}`);
  console.log("App compiled in production mode and written to /dist.");
  return 0;
});
