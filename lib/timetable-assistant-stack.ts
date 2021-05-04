import * as cdk from '@aws-cdk/core'
import * as apiGateway from '@aws-cdk/aws-apigateway'
import * as lambda from '@aws-cdk/aws-lambda'

export class TimetableAssistantStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    // The code that defines your stack goes here
    const timetableAssistantLambda = new lambda.Function(
      this,
      'timetableAssistantLambda',
      {
        code: lambda.Code.fromAsset('lambda'),
        handler: 'lambdaHandler.timetableAssistantHandler',
        runtime: lambda.Runtime.NODEJS_12_X
      }
    )

    const timetableAssistantApi = new apiGateway.LambdaRestApi(
      this,
      'timetableAssistant',
      {
        handler: timetableAssistantLambda,
        proxy: false
      }
    )

    const timetableAssistantApiIntegration = new apiGateway.LambdaIntegration(
      timetableAssistantLambda,
      {
        proxy: false,
        passthroughBehavior: apiGateway.PassthroughBehavior.WHEN_NO_MATCH,
        integrationResponses: [
          {
            statusCode: '200',
            responseTemplates: {
              'application/json': '$input.json("$")'
            }
          }
        ]
      }
    )

    timetableAssistantApi.root
      .addResource('timetable')
      .addMethod('GET', timetableAssistantApiIntegration, {
        methodResponses: [{ statusCode: '200' }]
      })
  }
}
