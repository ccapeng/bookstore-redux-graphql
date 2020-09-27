import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CategoryService from '../../services/category';
import { setCategoryList, setCategoryDeleted } from '../../actions/category';
import { returnErrors } from '../../actions/messages';
import { setTab } from '../../actions/tab';

const CategoryList = () => {

  const categoryList = useSelector(state => {
    return state.categoryList.categoryList
  });
  const dispatch = useDispatch();

  useEffect(() => {
    const _fetch = async () => {
      try {
        let data = await CategoryService.list();
        dispatch(setCategoryList(data));
      } catch (error) {
        dispatch(returnErrors(error, "error"));
      }
    };
    dispatch(setTab("category"));
    _fetch();
    // eslint-disable-next-line
  }, []);

  const onDeleteCategory = (id) => {
    const _del = async () => {
      let result = await CategoryService.delete(id);
      if (result === "deleted") {
        dispatch(setCategoryDeleted(id));
      }
    }
    _del();
  }

  return (
    <div>
      <section className="d-flex align-items-center">
        <h1>Categories</h1>
        <Link to="/category/add/" className="ml-auto">Add Category</Link>
      </section>
      <section>
        <ul className="list-group mt-3">
          {categoryList && categoryList.map(category =>
            <li key={category.id} className="list-group-item d-flex">
              <div>
                <Link to={`/category/${category.id}/`}>{category.name}</Link>
              </div>
              <div className="ml-auto">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => { onDeleteCategory(category.id) }}
                >
                  Delete
                  </button>
              </div>
            </li>
          )}
        </ul>
      </section>
    </div >
  )
};

export default CategoryList;