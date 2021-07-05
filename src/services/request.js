import axios from "axios";

const gqlURL = process.env.REACT_APP_GQL_URL || 'http://127.0.0.1:3005/graphql/';
//const gqlURL = process.env.REACT_APP_GQL_URL || 'http://127.0.0.1:8001/graphql/';
const origin = process.env.REACT_APP_ORIGIN || 'http://127.0.0.1:3000/';
const getHeaderConfig = () => ({
  headers: {
    "Content-Type": "application/json",
    "Origin": origin
  }
})

const getURL = () => {
  return gqlURL;
}

const Request = {

  get: async (query) => {

    try {
      query = query.replace(/^\s+/gm, '');
      let body = { query }
      body = JSON.stringify(body);
      let result = await axios.post(
        getURL(),
        body,
        getHeaderConfig()
      );
      return Promise.resolve(result.data);
    } catch (error) {
      console.log("error list", error);
      return Promise.reject("get error");
    }

  },

  create: async (query, variables) => {

    try {
      query = query.replace(/^\s+/gm, '');
      let body = {
        query,
        variables
      }
      body = JSON.stringify(body);
      let result = await axios.post(getURL(), body, getHeaderConfig());
      if (result.status === 200) {
        return Promise.resolve(result.data);
      } else {
        return Promise.reject(result.data);
      }
    } catch (error) {
      console.log(error);
      return Promise.reject("save error");
    }

  },

  update: async (query, variables) => {

    try {
      query = query.replace(/^\s+/gm, '');
      let body = {
        query,
        variables
      }
      body = JSON.stringify(body);
      let result = await axios.post(getURL(), body, getHeaderConfig());
      if (result.status === 200) {
        return Promise.resolve(result.data);
      } else {
        return Promise.reject(result.data);
      }
    } catch (error) {
      console.log(error);
      return Promise.reject("Save Error");
    }

  },

  delete: async (query, variables) => {

    try {
      query = query.replace(/^\s+/gm, '');
      let body = {
        query,
        variables
      }
      body = JSON.stringify(body);
      let result = await axios.post(getURL(), body, getHeaderConfig());
      if (result.status === 200) {
        return Promise.resolve(result.data);
      } else {
        return Promise.reject(result.data);
      }
    } catch (error) {
      console.log(error);
      return Promise.reject("Delete Error");
    }

  }
}

export default Request;