import { ACTIONS } from "./types";

export const setTab = tab => {
  return {
    type: ACTIONS.SET_TAB,
    payload: tab
  }
}