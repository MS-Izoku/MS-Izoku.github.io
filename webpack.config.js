const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');
console.log("PATH" , path , __dirname)

module.exports = {
entry: "./src/index.js",
output: {
  path: path.resolve(__dirname, 'dist'),
  filename: 'bundle.js',
},
plugins: [new HtmlWebPackPlugin({ template: "./dist/index.html" })]
};