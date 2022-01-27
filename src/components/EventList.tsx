import { RoxFetcherResult } from "rox-browser";
import { EventListItem } from "./EventListItem";
import './EventList.css'

export function EventList({events}: {events: RoxFetcherResult[]}) {
  return (
    <div id="configFetch-list">
      {events?.map((event, key) => (
        <EventListItem key={key} {...event} />
      ))}
    </div>
  );
}
