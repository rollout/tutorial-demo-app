import { FeatureFlags } from "../../../configuration/FeatureFlags";
import { FlagLink } from "../../FlagLink";
import { SectionTitle } from "../../SectionTitle";

export function BooleanFeatureOff() {
  return (
    <section>
      <SectionTitle>2. Enable a new feature</SectionTitle>
      <p>
        Your engineering team has just released a new feature!
      </p>
      <p>
        Enable targeting for the feature flag {" "}
        <FlagLink flag={FeatureFlags.features.displayConfigFetchHistory} /> and
        set its value to <code>true</code>.
      </p>
    </section>
  );
}
