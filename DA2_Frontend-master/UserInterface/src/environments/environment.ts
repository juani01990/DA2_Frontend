// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiSessions: 'http://localhost:5000/api/sessions',
  apiUsers: 'http://localhost:5000/api/users',
  apiFolders: 'http://localhost:5000/api/folders',
  apiTextFiles:'http://localhost:5000/api/textfiles',
  apiHTMLFiles:'http://localhost:5000/api/htmlfiles',
  apiSharedWith:'http://localhost:5000/api/sharedwith',
  apiFriends:'http://localhost:5000/api/friends',
  apiReports:'http://localhost:5000/api/reports',
  apiImporter:'http://localhost:5000/api/importer',
  IDToken: "TokenUser_",
  IDRole: "IDROLE_",
  Admin: "ADMIN",
  Writter: "WRITTER",
  ExpectedFile: "File"
  
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
