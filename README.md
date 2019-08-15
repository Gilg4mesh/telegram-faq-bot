# 機器人建置說明文件

利用 [Heroku](https://dashboard.heroku.com) 做一個免費的 telegram faq chatbot

### Github 設置
1. 註冊一個帳號
2. 按這個專案右上角的 fork 複製專案到自己帳號下

### Telegram 設置
1. 加 [@BotFather](https://t.me/BotFather) 為好友
2. /start 開啟清單
3. /newbot 新增機器人並取 id, 必須為 Bot 或 bot 結尾, 例如 TestBot 或 test_bot, 並取得連結, 例如 t.me/TestBot
4. /setname 選擇剛剛的 id, 並取名, 例如 "客服機器人"
5. /token 選擇剛剛的 id, 取得 bot 的 api token

### Heroku 設置
1. 到 Heroku 註冊帳號並新增一個 App
2. 把 Heroku 跟 Github 帳號綁定
3. 到 Settings 新增 Config Vars, key 填上 "ACCESS_TOKEN", value 填上 bot 的 api token
4. 到 Deploy 在 Connect to GitHub 的部份選擇剛剛 fork 出來的專案
5. 點擊 Enable Automatic Deploys
6. 到最下方按 Deploy Branch 做第一次佈署

### 修改內容
在 Github 專案進入 FAQ.json 點擊右上角的小鉛筆編輯內容即可

### 起用機器人
打開瀏覽器, 輸入以下格式網址, 會看到 "description": "Webhook was set"

https://api.telegram.org/bot{bot的api_token}/setWebhook?url={https://你的heroku網址}
