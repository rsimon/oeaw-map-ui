# ÖAW Map UI

Starting point: https://www.azavea.com/blog/2016/12/05/getting-started-with-react-and-leaflet/

## Setup

- run `npm install` to fetch dependencies
- run `npm start` to start the dev server
- point your browser to [localhost:7171](http://localhost:7171)

## Build

Run `npm run bundle` to build the distributable .js file. The file will be in the `dist` folder.

To enable a minified build, add the following to `webpack.config.js`:

```json
plugins: [
  new webpack.optimize.UglifyJsPlugin({
    include: /\.min\.js$/,
    minimize: true
  })
]
```
