import React, { useEffect } from 'react';
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AuthorService from '../../services/author';
import { setAuthor, setAuthorValue, initAuthor, setAuthorStatus } from '../../actions/author';
import { setTab } from '../../actions/tab';

const Author = props => {

  const { author, status } = useSelector(state => {
    return state.author
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const _fetch = async () => {
      let authorId = props.match.params.id;
      if (typeof (authorId) !== "undefined") {
        let data = await AuthorService.get(authorId);
        dispatch(setAuthor(data));
      } else {
        dispatch(initAuthor());
      }
    };
    dispatch(setTab("author"));
    _fetch();
    // eslint-disable-next-line
  }, []);

  const onChangeAuthor = (key, value) => {
    dispatch(setAuthorValue(key, value));
  }

  const save = () => {
    const _save = async () => {
      try {
        let result = await AuthorService.save(author);
        dispatch(setAuthor(result));
        dispatch(setAuthorStatus("saved"));
        dispatch(setAuthorStatus("")); //reset
      } catch (error) {
        console.log("save error", error);
      }
    }
    if (status === "") {
      dispatch(setAuthorStatus("submitting"));
      _save();
    }
  }

  if (status === "saved") {
    return (<Redirect to="/authorList" />);
  }

  return (
    <>
      <section className="d-flex align-items-center">
        <h1>Author Editor</h1>
        <Link to="/authorList" className="ml-auto">Author List</Link>
      </section>
      <section className="mt-3">
        <form onSubmit={(event) => { event.preventDefault(); save() }}>
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              className="form-control"
              onChange={(event) => { onChangeAuthor(event.target.name, event.target.value) }}
              value={author.lastName}
              autoFocus
            />
          </div>
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              className="form-control"
              onChange={(event) => { onChangeAuthor(event.target.name, event.target.value) }}
              value={author.firstName}
            />
          </div>
          <div className="form-group">
            <input type="hidden" name="authorId" value={author.id} />
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  )
};

export default Author;