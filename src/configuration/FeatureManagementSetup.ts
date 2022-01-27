import Rox, { RoxFetcherResult } from "rox-browser";
import { FeatureFlags } from "./FeatureFlags";

//Register the feature flags
(Object.keys(FeatureFlags) as (keyof typeof FeatureFlags)[]).forEach((namespace) => {
  Rox.register(namespace, FeatureFlags[namespace]);
});

export async function roxSetup(
  app_key: string,
  configurationFetchedHandler: (fetcherResult: RoxFetcherResult) => void
) {

  await Rox.setup(app_key, {
    configurationFetchedHandler,
  });
}
