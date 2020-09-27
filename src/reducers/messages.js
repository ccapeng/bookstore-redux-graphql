import { ACTIONS } from "../actions/types";

const initialState = "";

export const messages = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.CREATE_MESSAGE:
      return (state = action.payload);
    default:
      return state;
  }
}