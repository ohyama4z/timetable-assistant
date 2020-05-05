'use strict'

const functions = require('firebase-functions')
const {dialogflow} = require('actions-on-google')
const fs = require('fs')
const csv = require('csv')
const path = require('path')
const file = path.join(__dirname, 'timetable.csv')
require('date-utils')

const app = dialogflow()
const columnName = ['class1', 'class2', 'class3', 'class4', 'class5', 'class6', 'class7', 'class8']



//各intentへの入力はconv.body.queryResult.queryTextで取得できる

app.intent('Default Welcome Intent', conv => {
    const date = getTheDate(1)
    const dayOfTomorrow = ['日', '月', '火', '水', '木', '金', '土'][date.getDay()] + '曜日'
    const tomorrow = date.toFormat('YYYY年M月D日')
    let tell = `明日、${tomorrow}${dayOfTomorrow}の授業は、`

    // csvから明日の時間割を取得
    const parser = csv.parse({columns: columnName, trim: true}, (err, data) => {
        if (date.getDate() === 0 || date.getDate() === 6) {
            tell += 'ありません'
        } else {
            const classes = data[date.getDate()-1]
            Object.keys(classes).forEach(key => {
                tell += (obj[key] + '、')
            })
        }

        if (err) {console.log(err)}
    })

    fs.createReadStream(file).pipe(parser)
    conv.ask(tell)
})

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app)

// 指定日(今日・明日・〇曜日)の日付を取得
const getTheDate = (when) => {
    // 今日を0として引数に代入
    let date = new Date()
    date.setDate(date.getDate() + when)
    return date
}
