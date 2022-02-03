import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { RoxFetcherResult } from "rox-browser";
import { FeatureFlags } from "../configuration/FeatureFlags";
import { QueryParams } from "../configuration/QueryParams";
import Rox from 'rox-browser'

type ContextState = {
  initialized: boolean;
  initializationFailed: boolean;
  featureFlags: typeof FeatureFlags;
  historyFetchEvents: RoxFetcherResult[];
  attemptRoxSetup?: ()=> void
};

type Action =
  | { type: "initialized" }
  | { type: "initializedFailed" }
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
    case "initializedFailed":
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

  const attemptRoxSetup = useCallback(async () => {
    try {
      console.log("Initializing rox")
      await Rox.setup(QueryParams.environment_id, {
        configurationFetchedHandler: (fetcherResult: RoxFetcherResult) => {
          dispatch({type: "fetchedResult", payload: fetcherResult})
        },
      });
      console.log("Rox was initialized")
      dispatch({type: "initialized"})
    } catch (err) {
      console.error("Rox initialization failed", err)
      dispatch({type: "initializedFailed"})
    }
  }, []);

  useEffect(() => {
    attemptRoxSetup();
  }, [attemptRoxSetup]);

  const value = useMemo(()=> ({
    ...state,
    attemptRoxSetup
  }), [state, attemptRoxSetup])

  return (
    <FeatureFlagsContext.Provider value={value}>
      {children}
    </FeatureFlagsContext.Provider>
  );
};

export function useFeatureFlags() {
    const state = useContext(FeatureFlagsContext)
    if(!state) throw new Error("useFeatureFlags can only be used inside a FeatureFlagsContextProvider")

    return state
}
