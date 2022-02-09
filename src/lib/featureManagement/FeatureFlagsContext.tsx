import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { RoxFetcherResult } from "rox-browser";
import { FeatureFlags } from "./FeatureFlags";
import { missingRequiredQueryParameters, QueryParams } from "../../configuration/QueryParams";
import Rox from 'rox-browser'
import { SDK_MS_TO_FIRST_FETCH } from "../configuration/Envs";

type ContextState = {
  initialized: boolean;
  initializationFailed: boolean;
  featureFlags: typeof FeatureFlags;
  historyFetchEvents: RoxFetcherResult[];
};

type Action =
  | { type: "initialized" }
  | { type: "initializationFailed" }
  | { type: "fetchedResult"; payload: RoxFetcherResult };

const initialState = {
  initialized: false,
  initializationFailed: false,
  featureFlags: {
    ...FeatureFlags,
  },
  historyFetchEvents: [],
};

function reducer(state: ContextState, action: Action): ContextState {
  switch (action.type) {
    case "initialized":
      return { ...state, initialized: true, initializationFailed: false };
    case "initializationFailed":
      return { ...state, initializationFailed: true };
    case "fetchedResult":
      return {
        ...state,
        featureFlags: action.payload.hasChanges
          ? { ...FeatureFlags }
          : state.featureFlags,
        historyFetchEvents: [action.payload, ...state.historyFetchEvents],
      };
  }
}

const FeatureFlagsContext = createContext<ContextState | undefined>(undefined);

export const FeatureFlagsContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const roxSetup = useCallback(async () => {
    try {
      console.log("Initializing SDK")
      await Rox.setup(QueryParams.environment_id, {
        debugLevel: QueryParams.debug_sdk ? 'verbose' : undefined,
        configurationFetchedHandler: (fetcherResult: RoxFetcherResult) => {
          console.log("fetchedResult", fetcherResult.fetcherStatus, fetcherResult.hasChanges ? "has changes" : "", fetcherResult.errorDetails || '')
          dispatch({type: "fetchedResult", payload: fetcherResult})
        },
      });
      console.log("SDK was initialized")
      dispatch({type: "initialized"})

      setTimeout(async ()=> {
        //When the environment has never been initialized before, because some edge conditions, SSE may not be started properly
        //Forcing the fetch makes sure it will be
        Rox.fetch()
      }, SDK_MS_TO_FIRST_FETCH)
    } catch (err) {
      console.error("SDK initialization failed", err)
      dispatch({type: "initializationFailed"})
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
