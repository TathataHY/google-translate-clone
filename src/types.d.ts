export type StateType = {
  fromLanguage: string;
  toLanguage: string;
  fromText: string;
  result: string;
  error: string;
  loading: boolean;
};

export type ActionType =
  | { type: "SWITCH_LANGUAGES" }
  | { type: "SET_FROM_LANGUAGE"; payload: string }
  | { type: "SET_TO_LANGUAGE"; payload: string }
  | { type: "SET_FROM_TEXT"; payload: string }
  | { type: "SET_RESULT"; payload: string }
  | { type: "SET_ERROR"; payload: string }
  | { type: "SET_LOADING"; payload: boolean };
