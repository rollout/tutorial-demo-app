import { FeatureFlags } from "../../../configuration/FeatureFlags";
import { FlagLink } from "../../FlagLink";
import { SectionTitle } from "../../SectionTitle";

export function StringFeatureModified() {
  return (
    <section>
      <SectionTitle done doneMessage="Color changed!">1. Change the color of this site</SectionTitle>
      <p>You can change the color of the site again with the feature flag <FlagLink flag={FeatureFlags.styles.theme}/>.</p>
    </section>
  );
}
