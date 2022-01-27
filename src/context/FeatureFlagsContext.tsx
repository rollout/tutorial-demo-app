import React, {
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
import { roxSetup } from "../configuration/FeatureManagementSetup";
import { QueryParams } from "../configuration/QueryParams";

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
      await roxSetup(QueryParams.environment_id, (fetcherResult: RoxFetcherResult) => {
        dispatch({type: "fetchedResult", payload: fetcherResult})
      });
      dispatch({type: "initialized"})
    } catch (err) {
      dispatch({type: "initializedFailed"})
    }
  }, []);

  useEffect(() => {
    attemptRoxSetup();
  }, []);

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
    if(!state) throw "useFeatureFlags can only be used inside a FeatureFlagsContextProvider"

    return state
}