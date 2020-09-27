import { ACTIONS } from "./types";

export const createMessage = msg => {
  return {
    type: ACTIONS.CREATE_MESSAGE,
    payload: msg
  }
}

export const returnErrors = (msg, status) => {
  return {
    type: ACTIONS.GET_ERRORS,
    payload: {
      msg, status
    }
  }
}