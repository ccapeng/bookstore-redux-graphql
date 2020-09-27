import { ACTIONS } from "../actions/types";

const initialState = {
  msg: "",
  status: null
}

export const errors = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.GET_ERRORS:
      return {
        msg: action.payload.msg,
        status: action.payload.status
      }
    default:
      return state;
  }
}