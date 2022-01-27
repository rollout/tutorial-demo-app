import queryString from "query-string";

export const QueryParams = {
    environment_id: queryString.parse(window.location.search).environment_id as string,
    application_id: queryString.parse(window.location.search).application_id as string,
}