// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

/** the project mode */
export const environment = {
  production: false
};

/** the test mode of using json-server */
export const frontEndTestMode = {
  forntEndTestMode: false
}

/** the api urls for differnt test envrionment */
export const apiURL = {
  // baseURL: 'https://localhost:44307/api'    // Windows .net core url
  baseURL: 'http://localhost:5000/api'      // mac .net core url
  // baseURL: 'http://localhost:3000'      // Frontend json server fake api url
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
