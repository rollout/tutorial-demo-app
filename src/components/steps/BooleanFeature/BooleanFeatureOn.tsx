import { FlagLink } from "../../FlagLink";
import {EventList} from '../../EventList'
import { RoxFetcherResult } from "rox-browser";
import { FeatureFlags } from "../../../configuration/FeatureFlags";
import { SectionTitle } from "../../SectionTitle";

export function BooleanFeatureOn({events}: {events: RoxFetcherResult[]}) {
  return (
    <section>
      <SectionTitle done doneMessage="Feature enabled!">2. Enable a new feature </SectionTitle>
      <p>
        Below is a log of the configuration changes from the CloudBees Feature Management SDK.
        </p><p>
        You can disable the color change using the
        {' '}<FlagLink flag={FeatureFlags.features.displayConfigFetchHistory} />{' '}
        flag.
      </p>
      <EventList events={events}/>
    </section>
  );
}
