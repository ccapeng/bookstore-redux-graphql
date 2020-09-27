import Request from "./request";

const AuthorService = {
  list: async () => {
    let query = `query {
      authorList {
        id
        lastName
        firstName
      }
    }
    `
    let data = await Request.get(query);
    return data.data.authorList;
  },
  get: async (authorId) => {
    let query = `query {
      author(id:${authorId}) {
        id
        lastName
        firstName
      }
    }
    `
    let data = await Request.get(query);
    return data.data.author;
  },
  save: async (author) => {
    if (author.id === 0) {
      let query = `mutation {
        createAuthor(input: {lastName: "${author.lastName}", firstName: "${author.firstName}"}) {
          ok
          author {
            id
            lastName
            firstName
          }
        }
      }`
      let variables = null;
      let data = await Request.create(query, variables);
      return data.data.createAuthor.author;
    } else {
      let query = `mutation {
        updateAuthor(id: ${author.id}, input: {lastName: "${author.lastName}", firstName: "${author.firstName}"}) {
          ok
          author {
            id
            lastName
            firstName
          }
        }
      }`
      let variables = null;
      let data = await Request.update(query, variables);
      return data.data.updateAuthor.author;
    }
  },
  delete: async (authorId) => {
    let query = `mutation {
      deleteAuthor(id: ${authorId}) {
        ok
      }
    }`
    let variables = null;
    let data = await Request.delete(query, variables);
    if (data.data.deleteAuthor.ok) {
      return "deleted";
    } else {
      return "failed";
    }
  }
}

export default AuthorService;