const express = require('express')
const router = express.Router()
// 載入 URL.js
const URL = require('../../models/URL')
// 載入 newIndex.js
const generate_newIndex = require('../../generate_shortenerURL/newIndex')

// 設定網頁路由
router.get('/', (req, res) => {
    res.render('index')
})

// 設定 POST 路由，設定一條新路由，來接住表單資料，並將資料送往資料庫
router.post('/', (req, res) => {
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

router.get('/:shortenerURL', (req, res) => {
     const shortenerURL = req.params.shortenerURL
     URL.findOne({ shortenerURL })
        .then(data => {
            if (!data) {
                return res.render("error", {
                  errorMsg: "Can't found the URL",
                  errorURL: req.headers.host + "/" + shortenerURL,
                })
              }
              res.redirect(data.originalURL)
        })

        .catch(error => console.error(error))
})


module.exports = router