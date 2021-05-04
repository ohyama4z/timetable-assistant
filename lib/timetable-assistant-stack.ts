import * as cdk from '@aws-cdk/core'
import * as apiGateway from '@aws-cdk/aws-apigateway'
import * as lambda from '@aws-cdk/aws-lambda'
import * as lambdaNodejs from '@aws-cdk/aws-lambda-nodejs'

export class TimetableAssistantStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    // The code that defines your stack goes here
    const timetableAssistantLambda = new lambdaNodejs.NodejsFunction(
      this,
      'timetableAssistantLambda',
      {
        entry: 'src/lambda/lambdaHandler.ts',
        handler: 'tametableAssistantHandler',
        runtime: lambda.Runtime.NODEJS_14_X
      }
    )

    new apiGateway.LambdaRestApi(this, 'timetableAssistantApi', {
      handler: timetableAssistantLambda
    })
  }
}
