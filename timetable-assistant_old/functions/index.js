'use strict'

const functions = require('firebase-functions')
const { dialogflow } = require('actions-on-google')
// const fs = require('fs')
// const csv = require('csv')
const moment = require('moment-timezone')
moment.locale('ja')
const app = dialogflow()

app.intent('Default Welcome Intent', conv => {
  const now = moment().tz('Asia/Tokyo')
  const isTomorrow = Number(now.format('HH')) > 16
  const date = isTomorrow ? now.add(1, 'day') : now
  const dayOfWeek = date.format('dddd')

  if (dayOfWeek === '土曜日' || dayOfWeek === '日曜日') {
    conv.close(
      `${isTomorrow ? '明日' : '今日'}、${dayOfWeek}の授業はありません`,
    )
    return
  }

  const timetable = getTimetable()
  let messageMetaSet = new Set()
  Object.values(timetable[dayOfWeek]).forEach(subj => {
    if (subj !== 'なし') {
      messageMetaSet.add(subj)
    }
  })

  const message = Array.from(messageMetaSet).reduce((pre, subj) => {
    pre += `${subj},`
    return pre
  }, '')

  conv.close(
    `${isTomorrow ? '明日' : '今日'}、${dayOfWeek}の授業は${message}です`,
  )
})

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app)

// async function getTimetable() {
//     const csvData = await new Promise(resolve => {
//         fs.createReadStream('timetable.csv').pipe(
//             csv.parse((err, data) => {
//                 resolve(data)
//             })
//         )
//     })
//     const weekday = ['月曜日','火曜日','水曜日','木曜日','金曜日']
//     return csvData.reduce((pre,cur,index) => {
//         pre[weekday[index]] = cur.reduce((p,c,i) => {
//            p[`${i+1}限目`] = c
//            return p
//         },{})
//         return pre
//     }, {})
// }

// firebaseのうんたらでcsvが読み込めなかったので
function getTimetable() {
  return {
    月曜日: {
      '1限目': '体育',
      '2限目': '体育',
      '3限目': '数学B',
      '4限目': '数学B',
      '5限目': '英語B',
      '6限目': '英語B',
      '7限目': '国語',
      '8限目': '国語',
    },
    火曜日: {
      '1限目': '電子工学',
      '2限目': '電子工学',
      '3限目': 'ソフトウェアデザイン演習',
      '4限目': 'ソフトウェアデザイン演習',
      '5限目': '数学A',
      '6限目': '数学A',
      '7限目': 'ホームルーム',
      '8限目': 'なし',
    },
    水曜日: {
      '1限目': '計算機システム',
      '2限目': '計算機システム',
      '3限目': '創造工学',
      '4限目': '創造工学',
      '5限目': '英語A',
      '6限目': '英語A',
      '7限目': 'なし',
      '8限目': 'なし',
    },
    木曜日: {
      '1限目': '回路理論',
      '2限目': '回路理論',
      '3限目': '物理',
      '4限目': '物理',
      '5限目': '実験',
      '6限目': '実験',
      '7限目': '実験',
      '8限目': 'なし',
    },
    金曜日: {
      '1限目': 'プログラミング',
      '2限目': 'プログラミング',
      '3限目': '政治経済',
      '4限目': '政治経済',
      '5限目': '数学B',
      '6限目': '数学B',
      '7限目': '英語A',
      '8限目': '英語A',
    },
  }
}
