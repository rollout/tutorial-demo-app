import Rox from "rox-browser";

export const FeatureFlags = {
  styles: {
      theme: new Rox.RoxString("dark", ["light"]),
  },
  features: {
    displayConfigFetchHistory: new Rox.Flag(false),
  },
};

//Register the feature flags
(Object.keys(FeatureFlags) as (keyof typeof FeatureFlags)[]).forEach((namespace) => {
  Rox.register(namespace, FeatureFlags[namespace]);
});