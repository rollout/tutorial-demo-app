import { FeatureFlags } from "../../../configuration/FeatureFlags";
import { FlagLink } from "../../FlagLink";
import { Nice } from "../../Nice";
import { SectionTitle } from "../../SectionTitle";

export function StringFeatureModified() {
  return (
    <section>
      <SectionTitle done>1. Change the color of this site</SectionTitle>
      <p><Nice>Color changed!</Nice></p>
      <p>You can change the color of the site again with the feature flag <FlagLink flag={FeatureFlags.styles.theme}/>.</p>
    </section>
  );
}
