# CloudBees Feature Management tutorial demo app

This is an interactive CloudBees Feature Management demo, using React and the [Feature Management JavaScript SDK for web browsers](https://www.npmjs.com/package/rox-browser).

When the demo code is run, the SDK automatically creates two flags in the CloudBees Feature Management dashboard. 

* [Javascript SDK](https://docs.cloudbees.com/docs/cloudbees-feature-management/latest/getting-started/javascript-sdk)
* [JavaScript (Browser) API](https://docs.cloudbees.com/docs/cloudbees-feature-management-api/latest/api-reference/javascript-browser-api)

## URL

The url is `https://rollout.github.io/tutorial-demo-app`, with the query parameters `application_id` and `environment_id`

Other query parameters:

- `debug_sdk=true` - enables the verbose log level of the SDK

## How this application works internally


### Code structure

- `src/components` - UI components
- `src/configuration` - Internal application configuration (not related).
- `src/lib/featureManagement`
  - `src/lib/FeatureFlags.ts` - Creates and registers the Feature Flags objects.
  - `src/lib/FeatureFlagsContext.tsx` - React context that holds the feature flag objects used by the components. When feature flags are modified in the dashboard, the components automatically pick the updated values. It also initializes the SDK when mounted. 

### How the Feature Management SDK is used

The following is an explanation of what happens at startup:

1. The feature flags are registered, using the Feature Management SDK.  &nbsp; [:memo: code](https://github.com/rollout/tutorial-demo-app/blob/v0.0.1/src/configuration/FeatureFlags.ts#L3-L10)
2. The UI (which uses the feature flags registered in `1`) is rendered.
   * There is no need to wait to setup the SDK. The feature flags return their [default values](https://docs.cloudbees.com/docs/cloudbees-feature-management/latest/feature-flags/about-feature-flags#_default_values_of_flags).
   * We keep the the feature flags in a React context called FeatureFlagsContext. &nbsp; [:memo: code](https://github.com/rollout/tutorial-demo-app/blob/v0.0.1/src/context/FeatureFlagsContext.tsx#L55).
   * The components take the feature flags from the FeatureFlagsContext. &nbsp;[:memo: code](https://github.com/rollout/tutorial-demo-app/blob/v0.0.1/src/App.tsx#L25)
3. The Feature Management SDK is setup with your [appKey](https://docs.cloudbees.com/docs/cloudbees-feature-management/latest/getting-started/javascript-sdk). &nbsp; [:memo: code](https://github.com/rollout/tutorial-demo-app/blob/c9666184dc99330369a3130d77326025c2f3d021/src/context/FeatureFlagsContext.tsx#L67)
   * If the feature flags do not already exist in the CloudBees Feature Management platform, the SDK will [automatically create](https://docs.cloudbees.com/docs/cloudbees-feature-management/latest/feature-flags/creating-feature-flags) them. They will be immediately visible in [app.rollout.io](https://app.rollout.io).
4. Asynchronously, the SDK fetches the feature flags configuration from the [CloudBees Feature Management backend](https://app.rollout.io).
   * Any remote change in the feature flags will also be automatically fetched.
5. After the initial or subsequent configuration fetches:
   1. The [`configurationFetchedHandler` listener](https://docs.cloudbees.com/docs/cloudbees-feature-management-api/latest/api-reference/javascript-browser-api#_configurationfetchedhandler) is notified. &nbsp; [:memo: code](https://github.com/rollout/tutorial-demo-app/blob/c9666184dc99330369a3130d77326025c2f3d021/src/context/FeatureFlagsContext.tsx#L69)
   2. The FeatureFlagsContext is updated. &nbsp; [:memo: code](https://github.com/rollout/tutorial-demo-app/blob/v0.0.1/src/context/FeatureFlagsContext.tsx#L44-L50)
   3. The UI components using the feature flags from the FeatureFlagsContext are updated with the new values.

> :information_source: This application has some extra complexity to be able to instantly update the UI when the feature flags change. 
> 
> If you don't need that in your application, have a look at a simpler example in [Getting started with Javascript SDK](https://docs.cloudbees.com/docs/cloudbees-feature-management/latest/getting-started/javascript-sdk)

## Development

### Available Scripts

In the project directory, you can run:

* `npm start`
  * Runs the app in the development mode in [http://localhost:3000](http://localhost:3000). The running application is automatically updated when you change the code.
* `npm run build`
  * Bundles and optimizes the app for production to the `build` folder.

### Deployment

Any change in the master branch is automatically deployed by a GH action to https://rollout.github.io/tutorial-demo-app.



 
