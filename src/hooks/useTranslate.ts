import { useReducer, useEffect, useCallback } from "react";
import { ActionType, StateType } from "../types";
import useDebounce from "./useDebounce";
import { translateInitialState } from "../constants/translateInitialState";

function reducer(state: StateType, action: ActionType) {
  switch (action.type) {
    case "SWITCH_LANGUAGES":
      if (state.fromLanguage === "auto") return state;
      return {
        ...state,
        fromLanguage: state.toLanguage,
        toLanguage: state.fromLanguage,
      };
    case "SET_FROM_LANGUAGE":
      return { ...state, fromLanguage: action.payload };
    case "SET_TO_LANGUAGE":
      return { ...state, toLanguage: action.payload };
    case "SET_FROM_TEXT":
      return { ...state, fromText: action.payload };
    case "SET_RESULT":
      return { ...state, result: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}

function useTranslate() {
  const [state, dispatch] = useReducer(reducer, translateInitialState);

  const fetchData = useCallback(async () => {
    if (state.fromText === "") {
      dispatch({ type: "SET_RESULT", payload: "" });
      return;
    }

    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${state.fromLanguage}&tl=${state.toLanguage}&dt=t&q=${state.fromText}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }, [state.fromLanguage, state.toLanguage, state.fromText]);

  const translate = useCallback(async () => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const data = await fetchData();
      dispatch({ type: "SET_RESULT", payload: data[0][0][0] });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: String(error) });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, [fetchData]);

  const debouncedTranslate = useDebounce(translate, 300); // Adjust delay as needed

  useEffect(() => {
    debouncedTranslate();
  }, [debouncedTranslate]);

  const switchLanguage = () => {
    dispatch({ type: "SWITCH_LANGUAGES" });
  };

  const setFromLanguage = (payload: string) => {
    dispatch({ type: "SET_FROM_LANGUAGE", payload });
  };

  const setToLanguage = (payload: string) => {
    dispatch({ type: "SET_TO_LANGUAGE", payload });
  };

  const setFromText = (payload: string) => {
    dispatch({ type: "SET_FROM_TEXT", payload });
  };

  return { state, switchLanguage, setFromLanguage, setToLanguage, setFromText };
}

export default useTranslate;
