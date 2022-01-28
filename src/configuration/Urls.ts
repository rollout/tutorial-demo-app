import { DASHBOARD_BASE_URL } from "./Envs";
import { QueryParams } from "./QueryParams";

export const Urls = {
    featureFlagsListUrl() {
        return `${DASHBOARD_BASE_URL}/app/${encodeURIComponent(QueryParams.application_id)}/environment/${QueryParams.environment_id}/flags`
    },
    featureFlagUrl(flagName: string) {
        return `${this.featureFlagsListUrl()}/${encodeURIComponent(flagName)}/default`
    }
}