import * as lambda from 'aws-lambda'
import { timetable, WeekDay } from './timetable'

export const tametableAssistantHandler = async (
  event: lambda.APIGatewayProxyEvent
): Promise<lambda.APIGatewayProxyResult> => {
  const date = new Date()
  const dayIndex = date.getHours() >= 16 ? date.getDay() + 1 : date.getDay()
  const day = `${['日', '月', '火', '水', '木', '金', '土'][dayIndex]}曜日` as
    | WeekDay
    | '土曜日'
    | '日曜日'
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
