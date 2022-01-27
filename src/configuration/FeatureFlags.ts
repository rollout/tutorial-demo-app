import Rox from "rox-browser";

export const FeatureFlags = {
  styles: {
      theme: new Rox.RoxString("dark", ["light"]),
  },
  features: {
    displayConfigFetchHistory: new Rox.Flag(false),
  },
};
