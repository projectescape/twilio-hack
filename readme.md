# Git Talking

Git talking is an application that helps you to manage your github projects with other contributors by having features like Chat for discussion, Code Snippet share for fast exchange of logic and CheckList to manage completed and pending tasks.
Subchannels for indidual files of the repository can also be made to get new instances of Chat, Snippet Share and CheckList that can be used to have those file specific exchanges.

## Note

1. This App uses Twilio services to function, so twilio specific keys are needed.
1. This App is setup using node.js v14 . If you are using an older version of node, see legacy setup towards the end.

## Local Setup

1. Rename `dev.example.js`(`./config/keys/dev.example.js`) to `dev.js` `(./config/keys/dev.js)` and fill values for the keys with values xxx.
1. Open a terminal in the root directory of the project and install project dependencies by
   ```bash
   npm install
   cd client
   npm install
   cd ..
   ```
1. Run the project by
   ```bash
   npm start dev
   ```

## Legacy Setup

To run the project using node.js < 14.0

1. Delete `package.json` in the root folder and rename `package.legacy.json` to `package.json`
1. Follow the same Local Setup steps above and you should get a working app.
