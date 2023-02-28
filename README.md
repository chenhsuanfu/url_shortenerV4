# URL 短網址產生器

## 介紹
將網址轉換成較短的網址，方便文字排版

## 功能
+ 輸入網址轉換成短網址
+ 複製轉換完成的網址
+ 在伺服器啟動時，使用短網址可以連到原本的網址

## 使用步驟
1. 請先確認安裝 node.js 和 npm
2. 將專案 clone 到本地
3. 將本地開啟之後，透過終端機進入資料夾，輸入：
```
npm install
```
4. 安裝完成後，繼續輸入：
```
npm run start
```
5. 若看見下列訊息表示順利運行，打開瀏覽器進入下列網址
```
App is running on http://localhost:3000
```
6. 停止使用，在終端機輸入下列指令
```
ctrl + C
```

## 開發工具
+ node.js: 14.16.0
+ express: 4.17.1
+ body-parser: 1.20.2
+ express-handlebars: 4.0.2
+ method-override: 3.0.0
+ mongoose: 5.9.7
+ dotenv: 16.0.3