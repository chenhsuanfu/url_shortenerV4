// 載入 express 並建構應用程式伺服器
const express = require('express')
// 載入 mongoose
const mongoose = require('mongoose')
// 載入 express-handlebars
const exphbs = require('express-handlebars')
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

// 設定網頁路由
app.get('/', (req, res)=>{
    res.render('index')
})

// 啟動伺服器監聽
app.listen(port, ()=>{
    console.log(`App is running on http://localhost:${port}`)
})