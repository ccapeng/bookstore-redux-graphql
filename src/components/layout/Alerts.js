import React, { useEffect } from 'react'
import { useAlert } from "react-alert";
import { useSelector } from "react-redux";

export const Alerts = () => {

  const errors = useSelector(state => state.errors);
  const message = useSelector(state => state.messages);
  const alert = useAlert();

  useEffect(() => {
    if (errors.msg !== "") {
      alert.error(errors.msg)
    }
    // eslint-disable-next-line
  }, [errors]);

  useEffect(() => {
    if (message !== "") {
      alert.success(message)
    }
    // eslint-disable-next-line
  }, [message]);

  return (
    <></>
  )
}

export default Alerts;