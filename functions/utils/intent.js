'use strict'

const functions = require('firebase-functions')
const {dialogflow} = require('actions-on-google')
const timetable = require('./csv.js')
require('date-utils')

const app = dialogflow()

// 指定日(今日・明日・〇曜日)の日付を取得
const getTheDate = (when) => {
    // 今日を0として引数に代入
    let date = new Date()
    date.setDate(date.getDate() + when)
    return date
}

module.exports = {
    defaultWelcomeIntent: () => {
        const date = getTheDate(1)
        const dayOfTomorrow = ['日', '月', '火', '水', '木', '金', '土'][date.getDay()] + '曜日'
        const tomorrow = date.toFormat('YYYY年M月D日')
        let tell = `明日、${tomorrow}${dayOfTomorrow}の授業は、`

        // csvから明日の時間割を取得
        if (date.getDate() === 0 || date.getDate() === 6) {
            tell += 'ありません'
        } else {
            const classes = timetable.csvData[date.getDate()-1]
            Object.keys(classes).forEach(key => {
                tell += classes[key]
                tell += key < 8 ? '、' : 'です'
            })
        }

        return tell
    }


}