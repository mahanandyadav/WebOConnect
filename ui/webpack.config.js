const HtmlWebpackPlugin=require('html-webpack-plugin')
const resolve=require('path').resolve

module.exports={
    devtool:'eval-source-map',
    output:{
        path:resolve(__dirname,'dist'),
        filename:'main.js'
    },
    module:{
        rules:[
            {
                test:/\.(js|jsx)$/,
                exclude:/node_modules/,
                use:{
                    loader:'babel-loader'
                }
            },
            {
                test:/\.(css|scss)$/,
                use:['style-loader','css-loader','sass-loader'],
            },
            {
                test:/\.(.html)$/,
                use:{
                    loader:'html-loader'
                }
            },
            {
                test:/\.(png|jpe?g|gif)$/i,
                use:{
                    loader:'file-loader'
                }
            },
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./public/index.html'
        })
    ],
    resolve:{
        extensions:['.js','.jsx']
    }
}
