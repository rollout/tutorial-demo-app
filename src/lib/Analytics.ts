import * as FullStory from "@fullstory/browser";
import {
  BUGSNAG_API_KEY,
  FULLSTORY_ORG_ID,
  PRODUCTION_MODE,
} from "../configuration/Envs";
import { QueryParams } from "../configuration/QueryParams";
import Bugsnag from "@bugsnag/js";
import BugsnagPluginReact from "@bugsnag/plugin-react";

let fullstoryInitialized = false;
let bugsnagInitialized = false;

function init() {
  if (FULLSTORY_ORG_ID) {
    FullStory.init({
      orgId: FULLSTORY_ORG_ID as string,
      devMode: !PRODUCTION_MODE,
    });
    FullStory.setVars("page", {
      tutorialDemoApp: true,
      ...QueryParams,
    });
    fullstoryInitialized = true;
  }

  if (BUGSNAG_API_KEY) {
    Bugsnag.start({
      metadata: { params: { ...QueryParams } },
      apiKey: BUGSNAG_API_KEY,
      plugins: [new BugsnagPluginReact()],
    });
    bugsnagInitialized = true; // eslint-disable-line @typescript-eslint/no-unused-vars

    setTimeout(() => {
      //The FS URL can not be obtained until FS has been completely initialized, and there is no callback for that
      Bugsnag.addMetadata("fullstory", {
        initialized: fullstoryInitialized,
        recording: fullstoryInitialized && FullStory.getCurrentSessionURL(),
      });
    }, 1000);
  }
}

export const Analytics = {
  init
};
