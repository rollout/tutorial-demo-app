import { DASHBOARD_BASE_URL } from "./Envs";
import { QueryParams } from "./QueryParams";

export const Urls = {
    featureFlagsListUrl() {
        return `${DASHBOARD_BASE_URL}/app/${encodeURIComponent(QueryParams.application_id)}/environment/${QueryParams.environment_id}/flags`
    },
    featureFlagUrl(flagName: string) {
        return `${this.featureFlagsListUrl()}/${encodeURIComponent(flagName)}/default`
    },
    thisWebUrl(params: typeof QueryParams){
        const {location} = window
        var url = new URL(`${location.protocol}//${location.host}${location.pathname}`);
        url.searchParams.set("environment_id", params.environment_id)
        url.searchParams.set("application_id", params.application_id)
        if(params.debug_sdk) {
            url.searchParams.set("debug_sdk", 'true')
        }
        return url
    }
}