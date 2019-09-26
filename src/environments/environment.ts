// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { GRAPHQL_AUTH_MODE } from '@aws-amplify/api/lib/types';

export const environment = {
  UserPoolId: "xxx",
  ClientId: "xxx",
  AccessToken: "xxxx",
  "aws_project_region": "eu-xxxxxxx-1",
  "aws_appsync_graphqlEndpoint": "https://xxxx.xxxxxxxxx.com/graphql",
  "aws_appsync_region": "eu-xxxxxx-1",
  "aws_appsync_authenticationType": GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
  "aws_appsync_jwtToken": "xxxxxxxxxxxxxx",
  "Auth": {
    "region": "eu-xxxx-1",
    "userPoolId": "eu-xxxxxx-1_xxxxx",
    "userPoolWebClientId": "xxxxxxxxxxxx"
  },
  production: false,
  GDPR_COOKIE_KEY: 'GDPR-ALLOW_COOKIES'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
