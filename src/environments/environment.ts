// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  region: 'us-east-2',

  identityPoolId: 'us-east-2:ecf3e5eb-46b6-478a-8e77-615e88eaea23',
  userPoolId: 'us-east-2_WRskRqbUk',
  clientId: '4kougipo3aqbguoflh2l6b598',
  ddb_CandidateLoginDetail_Tbl: 'CandiateLoginDetails',
  ddb_JavaQuesPool_Tbl: 'Java_Question_Pool',
  dynamodb_endpoint: ''

};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
