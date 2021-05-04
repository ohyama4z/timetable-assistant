import timetable from './timetable'

export function tametableAssistantHandler() {
  const date = new Date()
  const day = `${['日', '月', '火', '水', '木', '金', '土'][date.getDay()]}曜日`
  if (day === '日曜日' || day === '土曜日') {
    return timetable['月曜日']
  }

  return timetable[day]
}
