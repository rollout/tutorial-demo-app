export const PRODUCTION_MODE = process.env.NODE_ENV === "production"
export const DASHBOARD_BASE_URL = process.env.REACT_APP_DASHBOARD_BASE_URL || 'http://app.rollout.io'
export const SDK_MS_TO_FIRST_FETCH = process.env.REACT_APP_SDK_MS_TO_FIRST_FETCH ? Number.parseInt(process.env.REACT_APP_SDK_MS_TO_FIRST_FETCH) : 20000
export const FULLSTORY_ORG_ID = process.env.REACT_APP_FULLSTORY_ORG_ID
export const BUGSNAG_API_KEY = process.env.REACT_APP_BUGSNAG_API_KEY