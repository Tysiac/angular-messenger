var webpack = require('webpack');
var path = require('path');

var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CompressionPlugin = require('compression-webpack-plugin');
var WebpackCleanPlugin= require('webpack-clean');
var ForkCheckerPlugin = require("awesome-typescript-loader").ForkCheckerPlugin;
var ngToolsWebpack = require("@ngtools/webpack");
var ProgressBarPlugin = require('progress-bar-webpack-plugin');
var purify = require("purifycss-webpack-plugin");

var isProduction = (process.env.NODE_ENV || 'development') === 'production';


// DIRECTIORIES
var src = 'app';
var dest = '../release';
var pubPath="http://localhost:3000/";
var absSrc=__dirname;//path.resolve(__dirname, "app");


//console.log("SOURCE DIR: "+absSrc);
console.log("BUILDING:  "+(isProduction?"PRODUCTION":"DEVELOPMENT"));

if(!isProduction)
{
    dest='/build';
	pubPath="/";
}

var absDest = path.join(__dirname, dest);

var config = 
    {
          // isProduction ? 'source-map' : 'evale',
          devtool:isProduction? '#cheap-source-map':'#eval-source-map',

          debug: !isProduction,
          cache: true,
          context: absSrc,
          publicPath: pubPath,
          resolve: 
          {
              modules:[path.resolve(__dirname, "node_modules")],
              extensions: ['', '.ts', '.js', '.json','.css'],
              descriptionFiles: ["package.json", "bower.json"],
              enforceExtension: false, 
          },
          resolveLoader: 
          {
              root: path.resolve(__dirname, 'node_modules')
          },
          entry: 
          {
            app: [ './app/main.ts' ],
            vendor: [ './app/vendor.ts' ],
          },

          output: 
          {
                path: absDest,
                filename: '[name].js',
                sourceMapFilename: '[name].js.map',
                chunkFilename: '[id].chunk.js',
                pubPath:'/app'
          },

           // our Development Server configs
          devServer: 
          {
                inline: true,
                colors: true,
                historyApiFallback: true,
                contentBase: src,
                publicPath: dest
          },
           stats: {colors: true, reasons: true},
          module: 
          {
                exprContextCritical: false,
                loaders: 
                [
                  // Support for *.json files.
                    {
                        test: /\.json$/,
                        loader: 'raw'
                    },
                  // support for .html as raw text
                    {
                        test: /\.html$/,
                        loader:'html-loader?-minimize',
                        include:[absSrc]
                        
                    },
                   // Font loader
                    {
                        test: /.(woff(2)?|eot|png|ttf|svg)(\?[a-z0-9=\.]+)?$/,
                        loader: 'url-loader?limit=524288' ,//~512 KB
                        include:[absSrc]
                    },
                   //IMAGE LOADER
                    {
                        test: /\.(jpe?g|gif|svg)$/i,
                        loader:'url-loader?limit=524288',//~512 KB
                        include:[absSrc]
                    },
                  // Extract css files
                    {
                        test: /\.css$/,
                        loader: isProduction?ExtractTextPlugin.extract({fallbackLoader: "style-loader",loader:["css-loader?sourceMap"]}):'style-loader!css-loader',//to-string-loader!css-loader',
                        include:[absSrc]
                    },
                  // Support for .ts files
                  {
                    test: /\.ts$/,
                    loaders: isProduction?['@ngtools/webpack','angular2-template']:'babel-loader!ts-loader!angular2-template', // isProduction?'awesome-typescript!angular2-template':'babel-loader!ts-loader!angular2-template'
                  //   loader: "awesome-typescript!angular2-template",
                    include:[absSrc]
                    
                  }
                ]
            },
            plugins: 
            [
                new ProgressBarPlugin(),
                new webpack.LoaderOptionsPlugin({  minimize: isProduction, debug: !isProduction}),
                new webpack.ContextReplacementPlugin(
                        // The (\\|\/) piece accounts for path separators in *nix and Windows
                        /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
                        path.join(process.cwd(), 'app')
                ),
                new webpack.optimize.CommonsChunkPlugin({
                  name: 'vendor',
                  minChunks: Infinity,
                  filename: 'vendor.bundle.js'
                })
            ],

           pushPlugins: function () 
           {
                //Push production plugins
                if (isProduction) 
                {
                      this.plugins.push.apply(this.plugins, 
                      [
                        new ExtractTextPlugin("[name].css"),
                        new purify({
                                basePath: absSrc,
                                paths: [
                                    "app/components/**/*.html",
                                    "app/*.html"
                                ]
                        }),
                        //new ForkCheckerPlugin(),
                      /* new ngToolsWebpack.AotPlugin({
                                tsConfigPath: "./tsconfig.aot.json",
                                basePath:path.join(__dirname, 'app'),
                                mainPath:path.join(__dirname, 'app','main'),
                                entryModule: path.join(__dirname, 'app','app.module')+'#AppModule',
                                typeChecking: true,
                            }),*/
                       new webpack.optimize.OccurrenceOrderPlugin(),
	  
                      new webpack.optimize.UglifyJsPlugin(
                      {
                        compress: 
                        {
                          warnings: false
                        },
                        sourceMap:true,
                        output: 
                        {
                          comments: false
                        },
                        beautify: false
                      }),
                  new CompressionPlugin({
                    asset: '[path]gz[query]',
                    algorithm: 'gzip',
                    regExp: /\.js$|\.html$|\.css$|.map$/,
                    threshold: 0,
                    minRatio: 0.9
                 }),
                new WebpackCleanPlugin([
                        'app.js',
                        'vendor.bundle.js',
                        'app.css',
                        'app.js.map',
                        'vendor.js.map',
                        'app.js.mapgz',
                        'vendor.js.mapgz'
                    ], absDest)
                ]);
           }
        }
};

config.htmlLoader = {
  minimize: false,
  removeAttributeQuotes: false,
  caseSensitive: true,
  customAttrSurround: [ [/#/, /(?:)/], [/\*/, /(?:)/], [/\[?\(?/, /(?:)/] ],
  customAttrAssign: [ /\)?\]?=/ ] 
};
config.pushPlugins();

module.exports = config;
