interface Timetable {
  [key: string]: {
    [key: string]: string
  }
}

// 2021前期
const timetable: Timetable = {
  月曜日: {
    '1限目': '応用物理',
    '2限目': '応用物理',
    '3限目': 'ソフトウェア工学',
    '4限目': 'ソフトウェア工学',
    '5限目': 'ソフトウェアデザイン演習',
    '6限目': 'ソフトウェアデザイン演習'
  },
  火曜日: {
    '1限目': '応用数学3',
    '2限目': '応用数学3',
    '3限目': 'なし',
    '4限目': 'なし',
    '5限目': 'なし',
    '6限目': 'なし'
  },
  水曜日: {
    '1限目': '英語C',
    '2限目': '英語C',
    '3限目': 'ハードウェア総論',
    '4限目': 'ハードウェア総論',
    '5限目': '応用数学1',
    '6限目': '応用数学1'
  },
  木曜日: {
    '1限目': '回路理論',
    '2限目': '回路理論',
    '3限目': 'なし',
    '4限目': 'なし',
    '5限目': '実験',
    '6限目': '実験'
  },
  金曜日: {
    '1限目': 'データベース',
    '2限目': 'データベース',
    '3限目': '情報数学',
    '4限目': '情報数学',
    '5限目': 'なし',
    '6限目': 'なし'
  }
}

export default timetable
