import { FlagLink } from "../../FlagLink";
import { Nice } from "../../Nice";
import {EventList} from '../../EventList'
import { RoxFetcherResult } from "rox-browser";
import { FeatureFlags } from "../../../configuration/FeatureFlags";
import { SectionTitle } from "../../SectionTitle";

export function BooleanFeatureOn({events}: {events: RoxFetcherResult[]}) {
  return (
    <section>
      <SectionTitle done>2. Enable a new feature </SectionTitle>
      <p>
        <Nice>Feature enabled!</Nice> 
        </p><p>
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
