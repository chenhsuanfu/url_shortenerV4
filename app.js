// 載入 express 並建構應用程式伺服器
const express = require('express')
// 載入 mongoose
const mongoose = require('mongoose')
// 載入 express-handlebars
const exphbs = require('express-handlebars')
// 引用 body-parser
const bodyParser = require('body-parser')
// 載入 URL.js
const URL = require('./models/URL')
// 載入 newIndex.js
const generate_newIndex = require('./newIndex')
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

// 設定網頁路由
app.get('/', (req, res)=>{
    res.render('index')
})
// 設定 POST 路由，設定一條新路由，來接住表單資料，並將資料送往資料庫
app.post('/', (req, res) => {
    if(!req.body.url) return res.redirect('/')
    const originalURL = req.body.url
    const shortenerURL = generate_newIndex(req.body)
    const host = req.headers.origin
    URL.findOne({ originalURL: req.body.url })
        .lean()
        .then( data => {
            if(data) return res.render('index', { host, shortenerURL: data.shortenerURL})
            res.render('index', { host, shortenerURL })
            URL.create({ originalURL, shortenerURL})
        } )
        .catch(error => console.error(error))
    //console.log("", shortenerURL)
    //console.log("", originalURL)
})

app.get('/:shortenerURL', (req, res) => {
     const shortenerURL = req.params.shortenerURL
     URL.findOne({ shortenerURL })
        .lean()
        .then(data => {
            if(!data) {
                return res.render('error', {
                    errorMsg: "Can't found the URL"
                    //errorURL: req.headers.host + "/" + shortenerURL,
                })
            }
            res.redirect(data.originalURL)
        })
        .catch(error => console.error(error))
})


// 啟動伺服器監聽
app.listen(port, ()=>{
    console.log(`App is running on http://localhost:${port}`)
})