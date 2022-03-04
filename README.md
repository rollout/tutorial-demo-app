# CloudBees Feature Management tutorial demo app

This is an interactive demo of Feature Management, using React and the [Feature Management JavaScript SDK for web browsers](https://www.npmjs.com/package/rox-browser).

It uses two feature flags, which are are automatically created in the dashboard by the SDK when the code runs. 

* [Getting started with Feature Management Javascript SDK](https://docs.cloudbees.com/docs/cloudbees-feature-management/latest/getting-started/javascript-sdk)
* [API of the Javascript SDK for web browsers](https://docs.cloudbees.com/docs/cloudbees-feature-management-api/latest/api-reference/javascript-browser-api)

## URL

The url is `https://rollout.github.io/tutorial-demo-app`, with the query parameters `application_id` and `environment_id`

Other query parameters:

- `debug_sdk=true` - enables the verbose log level of the SDK

## How this application works internally


### Code structure

- `src/components` - UI components
- `src/configuration` - internal application configuration (not related)
- `src/lib/featureManagement`
  - `src/lib/FeatureFlags.ts` - creates and registers the Feature Flags objects
  - `src/lib/FeatureFlagsContext.tsx` - React context that holds the feature flags objects used by the components. When feature flags are modified in the dashboard, the components automatically pick the updated values. It also initializes the SDK when mounted. 

### What happens behind the scenes

The following is an explanation of what happens at startup

1. The feature flags are registered, using the Feature Management SDK (link)
2. The UI (which uses the feature flags registered in 1) is rendered
   * There is no need to wait to setup the SDK. The feature flags return their default values.
   * We keep the the feature flags in a react context (link) called FeatureFlagsContext (link). The components take the feature flags from that context (link).
3. The Feature Management SDK is setup with your appKey (link)
   * If the feature flags do not exist in the Feature Management platform, the SDK will automatically create them. They will be immediately visible in the [dashboard](https://app.rollout.io).
4. The Feature Management SDK is also configured to listen for any changes in the feature flags in the Feature Management platform (link). 
   * This feature is optional, see here for more details (link)
5. Asynchronously, the SDK fetches the feature flags configuration from the Feature Management platform.
6. After the SDK fetches a feature flag configuration or the configuration changes:
   1. The `configurationFetchedHandler` listener is notified (link).
   2. The value of the FeatureFlagsContext is updated
   3. And the UI components using the feature flags from the FeatureFlagsContext are updated with the new values



## Development

### Available Scripts

In the project directory, you can run:

* `npm start`
  * Runs the app in the development mode in [http://localhost:3000](http://localhost:3000). The running application is automatically updated when you change the code.
* `npm run build`
  * Bundles and optimizes the app for production to the `build` folder.

### Deployment

Any change in the master branch is automatically deployed by a GH action to https://rollout.github.io/tutorial-demo-app



 
