import * as lambda from 'aws-lambda'
import moment from 'moment-timezone'
import 'moment/locale/ja'
import { timetable, WeekDay } from './timetable'
moment.locale('ja')

export const timetableAssistantHandler = async (
  event: lambda.APIGatewayProxyEvent
): Promise<lambda.APIGatewayProxyResult> => {
  const ja = moment().tz('Asia/Tokyo')
  const day = (ja.hours() >= 16
    ? ja.add(1, 'days').format('dddd')
    : ja.format('dddd')) as WeekDay | '土曜日' | '日曜日'

  const selectedDay = day === '日曜日' || day === '土曜日' ? '月曜日' : day

  console.log(`request: ${event}`)

  const subjects = Object.values(timetable[selectedDay]).reduce(
    (pre: string[], subject: string) => {
      if (pre.length > 0 && pre[pre.length - 1] === subject) {
        return pre
      }
      pre = [...pre, subject]
      return pre
    },
    []
  )

  const subjectsStr =
    subjects[subjects.length - 1] === 'なし'
      ? subjects.slice(0, subjects.length - 1).reduce((p, c) => {
          p = `${p}、${c}`
          return p
        }, '')
      : subjects.reduce((p, c) => {
          p = `${p}、${c}`
          return p
        }, '')

  const message = `${selectedDay}の授業は${subjectsStr}です`

  const body = {
    session: {
      id: 'timetableAssitant',
      params: {}
    },
    prompt: {
      override: false,
      firstSimple: {
        speech: message,
        text: message
      }
    },
    scene: {
      name: 'Start',
      slots: {},
      next: {
        name: 'actions.scene.END_CONVERSATION'
      }
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify(body)
  }
}
