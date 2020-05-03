'use strict'

const functions = require('firebase-functions')
const {dialogflow} = require('actions-on-google')
const csv = require('csv')
require('date-utils')

const app = dialogflow()



//各intentへの入力はconv.body.queryResult.queryTextで取得できる

app.intent('Default Welcome Intent', conv => {
    let date = new Date()
    const dayOfToday = ['日', '月', '火', '水', '木', '金', '土'][date.getDay()] + '曜日'
    const today = date.toFormat('YYYY年M月D日')

    date.setDate(date.getDate() + 1)
    const dayOfTomorrow = ['日', '月', '火', '水', '木', '金', '土'][date.getDay()] + '曜日'
    const tomorrow = date.toFormat('YYYY年M月D日')

    const tell = `明日、${tomorrow}${dayOfWeek}の時間割は、じふぉえあｊひおｆです`
    conv.ask(tell)
})

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app)
