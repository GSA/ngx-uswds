import { angularCLIConfig } from "./templates/angular-cli-config";
import * as tsconfigJson from './templates/tsconfig.json';
import * as iconsJson from './icons.json';

declare var require;

let ejs = require('ejs');


const __assign = Object.assign || function(t) {
  for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
  }
  return t;
};

const mainTs = require('!!raw-loader!./templates/main.ts');
const polyfill = require('!!raw-loader!./templates/polyfill.ts');
const indexHtml = require('!!raw-loader!./templates/index.html');
const appModule = require('!!raw-loader!./templates/app.module.ejs');
const appComponent = require('!!raw-loader!./templates/app.component.ejs');

export const ANGULAR_CODESANDBOX = function (files, moduleName, selector) {
    if (files === void 0) { files = {}; }

    const newFiles = {};

    Object.keys(files).forEach(key => {
      const newKey = `src/app/${key}`;
      newFiles[newKey] = files[key];
    });

    let modulePath = Object.keys(files).find(key => key.indexOf('module.ts') > -1);
    modulePath = `./${modulePath.substring(0, modulePath.length - 3)}`;
    const appModuleCompiled = ejs.render(appModule.default, {moduleClassName: moduleName, modulePath});
    const appComponentCompiled = ejs.render(appComponent.default, {demoSelector: selector});
    return {
        dependencies: {
            "@angular/animations":  "^12.2.14",
            "@angular/common":  "^12.2.14",
            "@angular/compiler":  "^12.2.14",
            "@angular/core":  "^12.2.14",
            "@angular/forms":  "^12.2.14",
            "@angular/platform-browser":  "^12.2.14",
            "@angular/platform-browser-dynamic":  "^12.2.14",
            "@angular/router":  "^12.2.14",
            "@gsa-sam/ngx-uswds": "12.0.4",
            "@gsa-sam/uswds-formly": "^12.0.4",
            "@ngx-formly/core": "^5.10.23",
            "core-js": "^2.6.11",
            "rxjs": "~6.5.5",
            "uswds": "2.11.2",
            "zone.js": "~0.10.2"
        },
        files: __assign(
            { "src/main.ts": mainTs.default,
              "src/polyfills.ts": polyfill.default,
              "src/index.html": indexHtml.default,
              "src/environments/environment.ts": "\n    export const environment = {\n        production: false\n    };\n    ",
              "src/environments/environment.prod.ts": "\n    export const environment = {\n        production: true\n    };\n    ",
              "angular-cli.json": JSON.stringify(angularCLIConfig),
              "tsconfig.json": JSON.stringify((tsconfigJson as any).default),
              "src/app/app.component.ts": appComponentCompiled,
              "src/app/app.module.ts": appModuleCompiled,
            },
            newFiles,
            (iconsJson as any).default,
        ),
    };
};

