# Google Sheets x React

This is a demonstration of using a React application within a Google Sheet to display a more human-friendly interface to the Google Sheets data.

<img src="https://user-images.githubusercontent.com/35063432/205317990-cb6b3f4b-4b83-4a4e-a15a-c71e6f05a75a.png" data-canonical-src="https://user-images.githubusercontent.com/35063432/205317990-cb6b3f4b-4b83-4a4e-a15a-c71e6f05a75a.png" width="600" />

## How it works

Google Sheets can display custom modals, rendered from the contents of a single static html file. JS within that modal may call AppScripts functions, which can in turn read and write data in the spreadsheet (amongst many other things).

By compiling a React app into a script tag within a single html file, this modal can be turned into a full single page application, with powerful but controllable access to the underlying sheet. This allows a 2-tier application to be built very rapidly on top of existing Google Sheets, with a fully custom UI, without the need to switch completely to a bespoke full-stack application.

The underlying Google Sheet continues to work as a spreadsheet and can continued to be used as such. Anyone versed in spreadsheet formulae can self-serve to create new reports or perform tasks the UI does not yet do. If the UI stops working or is no longer supported by developers, the spreadsheet remains usable as-is.

Authorization is handled through having access to the sheet by the usual means (it is all or nothing authorization). The user must have edit access to the sheet to run the modal (though ranges may be protected). Changes made via the UI are tracked against users in Google's version history and can be rolled back as usual.

## Project structure

The `frontent` directory contains a self-contained React application. Vite is configured to build this into a single .html file with inline JS in script tags (`vite.config.js`). It is built using MUI, to create a look and feel consistent with the Google Docs ecosystem.

The `appscript` directory contains code which will be transpiled to JS (by Google's CLASP CLI) and will be hosted and run with Google Apps Script. Where there are multiple files in Apps Script, they all share a common scope (files can access the contents of other files without import/export). The `appscript/tsconfig.json` replicates this locally. 

The `openUI` function in `appscript/index.ts` will launch `frontend/ui.html` in a modal when a menu item is clicked within Google Sheets. `frontend/hooks/useScriptLink.tsx` manages the flow of data from the UI to the sheet and back with the globally available `google.script.run` function (see `callFunction()` in that file).

Files ready to be uploaded to google are prepared in a `dist` directory when the build command is run.

## Dev Setup

### Prerequisites

* Node JS
* [Clasp](https://github.com/google/clasp) (`npm i -g @google/clasp`)

### Setup

1. Clone this repository
1. `npm install`
1. `clasp login`
1. Add the ID of the Apps Script project to `.clasp.json` (see instructions in next section)

#### Finding the Apps Script ID

1. Open the spreadsheet
1. Extensions -> Apps Scripts
1. The script ID is in Project Settings (and also in the URL)

## Developing

### Running Locally

The front end can be run locally. It does not connect to a real spreadsheet. Instead is uses some mock code that may or may not reflect the actual behaviour of the real spreadsheet. (It really needs to be tested in a live environment before you can be sure it's correct).

```sh
npm run dev
```

This will start a local web server at [http://localhost:5173/frontend/ui.html](http://localhost:5173/frontend/ui.html). The UI is designed to run in a fixed-size modal pop-up. You can simulate this using the device simulator of your browser's dev tools, setting the device screen size to match those defined at the top of `appscript/index.ts`

There is no way to run the back-end locally at present

### Pushing the application to Google

The project must first be built and then pushed using clasp:

```sh
npm run build
npm run push
```

A Github Actions file is set up to build and deploy the script when code is pushed to main. Secrets must be configured as per [ericanastas/deploy-google-app-script-action](https://github.com/ericanastas/deploy-google-app-script-action#set-repository-secrets)
