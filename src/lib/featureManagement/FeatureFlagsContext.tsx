import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { RoxFetcherResult } from "rox-browser";
import { FeatureFlags } from "./FeatureFlags";
import { missingRequiredQueryParameters, QueryParams } from "../../configuration/QueryParams";
import Rox from 'rox-browser'
import { SDK_MS_TO_FIRST_FETCH } from "../../configuration/Envs";

type ContextState = {
  featureFlags: typeof FeatureFlags;
};

const initialState = {
  featureFlags: {
    ...FeatureFlags,
  },
};

const FeatureFlagsContext = createContext<ContextState | undefined>(undefined);

export const FeatureFlagsContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, setState] = useState(initialState);

  const roxSetup = useCallback(async () => {
    try {
      console.log("Initializing SDK")
      await Rox.setup(QueryParams.environment_id, {
        debugLevel: QueryParams.debug_sdk ? 'verbose' : undefined,
        configurationFetchedHandler: (fetcherResult: RoxFetcherResult) => {
          if(fetcherResult.hasChanges) {
            setState({featureFlags: { ...FeatureFlags }})
          }
          console.log("fetcherResult", JSON.stringify(fetcherResult))
        },
      });
      console.log("Rox was initialized")

      setTimeout(async ()=> {
        //When the environment has never been initialized before, because some edge conditions, SSE may not be started properly
        //Forcing the fetch makes sure it will be
        Rox.fetch()
      }, SDK_MS_TO_FIRST_FETCH)
    } catch (err) {
      console.error("Rox initialization failed", err)
    }
  }, []);

  useEffect(() => {
    if(!missingRequiredQueryParameters()) {
      roxSetup();
    }
  }, [roxSetup]);

  return (
    <FeatureFlagsContext.Provider value={state}>
      {children}
    </FeatureFlagsContext.Provider>
  );
};

export function useFeatureFlags() {
    const state = useContext(FeatureFlagsContext)
    if(!state) throw new Error("useFeatureFlags can only be used inside a FeatureFlagsContextProvider")

    return state
}
