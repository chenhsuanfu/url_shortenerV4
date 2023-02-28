// 載入 express 並建構應用程式伺服器
const express = require('express')

// 載入 express-handlebars
const exphbs = require('express-handlebars')
// 引用 body-parser
const bodyParser = require('body-parser')
// 載入 method-override
const methodOverride = require('method-override')
// 引用路由器
const routes = require('./routes')
// 引用mongoose
require('./config/mongoose')
// 定義連接 port number
const port = 3000
const app = express()
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')
// 設定express靜態檔案位置
app.use(express.static('public'))

// 設定 body-parser
app.use(bodyParser.urlencoded({ extended: true }))
// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))
// 將request 導入路由器
app.use(routes)


// 啟動伺服器監聽
app.listen(port, ()=>{
    console.log(`App is running on http://localhost:${port}`)
})