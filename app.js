// 載入 express 並建構應用程式伺服器
const express = require('express')
// 載入 mongoose
const mongoose = require('mongoose')
// 載入 express-handlebars
const exphbs = require('express-handlebars')
// 引用 body-parser
const bodyParser = require('body-parser')
// 載入 method-override
const methodOverride = require('method-override')
// 引用路由器
const routes = require('./routes')

// 定義連接 port number
const port = 3000



// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const app = express()
// 設定連線到mongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
    console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
    console.log('mongodb connected!')
})

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