import React, { useEffect } from 'react';
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import PublisherService from '../../services/publisher';
import { setPublisher, initPublisher, setPublisherName, setPublisherStatus } from '../../actions/publisher';
import { setTab } from '../../actions/tab';
import { returnErrors } from '../../actions/messages';

const Publisher = props => {

  const { publisher, status } = useSelector(state => {
    return state.publisher
  });
  const dispatch = useDispatch();

  useEffect(() => {
    const _fetch = async () => {
      let data = await PublisherService.get(publisherId);
      dispatch(setPublisher(data));
    }
    dispatch(setTab("publisher"));
    let publisherId = props.match.params.id;
    if (typeof (publisherId) !== "undefined") {
      _fetch()
    } else {
      dispatch(initPublisher());
    }
    // eslint-disable-next-line
  }, []);

  const onChangeName = (value) => {
    dispatch(setPublisherName(value));
  }

  const save = () => {
    const _save = async () => {
      let result = await PublisherService.save(publisher);
      dispatch(setPublisher(result));
      dispatch(setPublisherStatus("saved"));
      dispatch(setPublisherStatus("")); //reset
    }
    if (status === "") {
      try {
        dispatch(setPublisherStatus("submitting"));
        _save();
      } catch (error) {
        dispatch(returnErrors(error, "error"));
      }
    }
  }

  if (status === "saved") {
    return (<Redirect to="/publisherList"></Redirect>);
  }

  return (
    <>
      <section className="d-flex adjust-items-center">
        <h1>Publisher Editor</h1>
        <Link to="/publisherList" className="ml-auto">Publishers</Link>
      </section>
      <section className="mt-3">
        <form onSubmit={(event) => { event.preventDefault(); save() }}>
          <div className="form-group">
            <label>Publisher Name</label>
            <input
              type="text"
              name="publisher"
              className="form-control"
              onChange={(event) => { onChangeName(event.target.value) }}
              value={publisher.name}
              autoFocus
            />
          </div>
          <div className="form-group">
            <input type="hidden" name="publisherId" value={publisher.id} />
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  )

};

export default Publisher;