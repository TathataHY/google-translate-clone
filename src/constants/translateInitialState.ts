import { StateType } from "../types";

export const translateInitialState: StateType = {
  fromLanguage: "auto",
  toLanguage: "en",
  fromText: "",
  result: "",
  error: "",
  loading: false,
};
