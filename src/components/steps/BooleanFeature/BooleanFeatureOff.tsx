import { FeatureFlags } from "../../../configuration/FeatureFlags";
import { FlagLink } from "../../FlagLink";
import { SectionTitle } from "../../SectionTitle";

export function BooleanFeatureOff() {
  return (
    <section>
      <SectionTitle>2. Enable a new feature</SectionTitle>
      <p>
        You engineering team has just released a new feature!
      </p>
      <p>
        Toggle on the feature flag {" "}
        <FlagLink flag={FeatureFlags.features.displayConfigFetchHistory} /> and
        changing its value to <code>true</code>.
      </p>
    </section>
  );
}
