'use strict'

const functions = require('firebase-functions')
const {dialogflow} = require('actions-on-google')
const intent = require('./utils/intent.js')
require('date-utils')

const app = dialogflow()

app.intent('Default Welcome Intent', conv => {
    const tell = intent.defaultWelcomeIntent()
    conv.ask(tell)
})

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app)
