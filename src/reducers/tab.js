import { ACTIONS } from "../actions/types";

const initialState = {
  tab: ""
}

export const tab = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SET_TAB:
      return {
        tab: action.payload
      }
    default:
      return state;
  }
}