const fs = require('fs')
const csv = require('csv')
const path = require('path')
const file = path.join(__dirname, 'timetable.csv')

const columnName = ['class1', 'class2', 'class3', 'class4', 'class5', 'class6', 'class7', 'class8']

const parser = csv.parse({columns: columnName, trim: true}, (err, data) => {
    module.exports = {
        csvData: data
    }
    if (err) {
        console.log(err)
    }
})

fs.createReadStream(file).pipe(parser)

