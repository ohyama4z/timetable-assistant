import express, { Request, Response } from 'express'
import { APIGatewayEvent, Context, Handler, Callback } from 'aws-lambda'
import awsServerlessExpress from 'aws-serverless-express'
import cors from 'cors'
import { DialogflowApp } from 'actions-on-google'
import actionsOnLambda from 'actions-on-lambda'

const app = express()
app.use(cors())

app.get('/timetable', (req: Request, res: Response) => {
  const message: string = 'aho'
  res.json({ message })
})

const server = awsServerlessExpress.createServer(app)
export const lambdaHandler: Handler = (
  event: APIGatewayEvent,
  context: Context
) => {
  awsServerlessExpress.proxy(server, event, context)
}
