var path = require('path');

module.exports = {
    mode: 'development',

    entry: './src/index.ts',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
node: {
  fs: "empty"
},
    module: {
        rules: [{
            test: /\.ts$/,
            use: "ts-loader"
        }]
    },
    resolve: {
       extensions: [".ts", ".js", ".json"]
    }
};