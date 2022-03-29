import Rox from "rox-browser";

export const FeatureFlags = {
  snakeGame: {
    release: new Rox.Flag(false),
    speed: new Rox.RoxString("normal", ["slow", "normal", "fast", "insane"])
  }
};

//Register the feature flags
(Object.keys(FeatureFlags) as (keyof typeof FeatureFlags)[]).forEach((namespace) => {
  Rox.register(namespace, FeatureFlags[namespace]);
});