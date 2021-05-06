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
  if (day === '日曜日' || day === '土曜日') {
    return {
      statusCode: 200,
      body: JSON.stringify(timetable['月曜日'])
    }
  }

  console.log(`request: ${event}`)
  return {
    statusCode: 200,
    body: JSON.stringify(timetable[day])
  }
}
