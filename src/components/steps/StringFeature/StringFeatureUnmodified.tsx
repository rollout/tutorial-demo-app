import { FeatureFlags } from "../../../lib/featureManagement/FeatureFlags";
import { FlagLink } from "../../FlagLink";
import { SectionTitle } from "../../SectionTitle";

export function StringFeatureUnmodified() {
  return (
    <section>
      <SectionTitle>1. Change the color of this site</SectionTitle>
      <p>Let's change the color of this site.</p>
      <p>Turn targeting on for the feature flag <FlagLink flag={FeatureFlags.styles.theme}/>{" "} and change its value to <code>"light"</code>.</p>
    </section>
  );
}
