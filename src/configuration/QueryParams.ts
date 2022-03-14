import queryString from "query-string";

export const QueryParams = {
    environment_id: queryString.parse(window.location.search).environment_id as string,
    application_id: queryString.parse(window.location.search).application_id as string,
    debug_sdk: !!queryString.parse(window.location.search).debug_sdk
}

export function missingRequiredQueryParameters() {
    return !QueryParams.environment_id?.trim() || !QueryParams.application_id?.trim()
}