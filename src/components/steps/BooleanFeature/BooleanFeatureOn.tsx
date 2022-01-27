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
        It is a log of the configuration data fetched by the Feature Management SDK. 
        </p><p>
        You can disable it back in
        <FlagLink flag={FeatureFlags.features.displayConfigFetchHistory} />.
      </p>
      <EventList events={events}/>
    </section>
  );
}