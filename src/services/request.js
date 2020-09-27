import axios from "axios";

const getHeaderConfig = () => {
  return {
    headers: {
      "Content-Type": "application/json"
    }
  };
}

const getURL = () => {
  return "http://127.0.0.1:8000/graphql/";
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

// const getHeaderConfig = () => {
//   return {
//     headers: {
//       "Content-Type": "application/json"
//     }
//   };
// }

// const getURL = (url) => {
//   return `http://127.0.0.1:8000/${url}`;
// }

// const Request = {

//   get: async (url) => {

//     try {
//       let result = await axios.get(
//         getURL(url),
//         getHeaderConfig()
//       );
//       return Promise.resolve(result.data);
//     } catch (error) {
//       console.log(error);
//       return Promise.reject("get error");
//     }

//   },

//   create: async (url, body) => {

//     try {
//       let result = await axios.post(getURL(url), body, getHeaderConfig());
//       if (result.status === 201) {
//         return Promise.resolve(result.data);
//       } else {
//         return Promise.reject(result.data);
//       }
//     } catch (error) {
//       console.log(error);
//       return Promise.reject("save error");
//     }

//   },

//   update: async (url, body) => {

//     try {
//       let result = await axios.patch(getURL(url), body, getHeaderConfig());
//       if (result.status === 200) {
//         return Promise.resolve(result.data);
//       } else {
//         return Promise.reject(result.data);
//       }
//     } catch (error) {
//       console.log(error);
//       return Promise.reject("Save Error");
//     }

//   },

//   delete: async (url) => {

//     try {
//       let result = await axios.delete(getURL(url), getHeaderConfig());
//       if (result.status === 204) {
//         return Promise.resolve("deleted");
//       } else {
//         return Promise.reject("failed");
//       }
//     } catch (error) {
//       console.log(error);
//       return Promise.reject("Delete Error");
//     }

//   }
// }

// export default Request;
