# timetable-assistant

googleアシスタントに時間割を教えてもらう  
「(今日・明日・〇曜日)の時間割を教えて」でいい感じに返せるようにしたい

## usage
最初にログインをする
`firebase login`

※ログアウト
`firebase logout`

### lint
`eslint .`

### serve
`firebase emulators:start --only functions`

### shell
`firebase functions:shell`

### start
`npm run shell`

### deploy
`firebase deploy --only functions`

### log
`firebase functions:log --only functions`
