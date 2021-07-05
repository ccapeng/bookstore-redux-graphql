import Request from "./request";

const PublisherService = {
  list: async () => {
    let query = `query {
      publisherList {
        id
        name
      }
    }
    `
    let data = await Request.get(query);
    return data.data.publisherList;
  },
  get: async (publisherId) => {
    let query = `query {
      publisher(id:${publisherId}) {
        id
        name
      }
    }
    `
    let data = await Request.get(query);
    return data.data.publisher;
  },
  save: async (publisher) => {
    if (publisher.id === 0) {
      let query = `mutation {
        createPublisher(input: {name: "${publisher.name}"}) {
            id
            name
        }
      }`
      let variables = null;
      let data = await Request.create(query, variables);
      return data.data.createPublisher;
    } else {
      let query = `mutation {
        updatePublisher(id: ${publisher.id}, input: {name: "${publisher.name}"}) {
            id
            name
        }
      }`
      let variables = null;
      let data = await Request.update(query, variables);
      return data.data.updatePublisher;
    }
  },
  delete: async (publisherId) => {
    let query = `mutation {
      deletePublisher(id: ${publisherId}){
        id
      }
    }`
    let variables = null;
    let data = await Request.delete(query, variables);
    if (data.data.deletePublisher) {
      return "deleted";
    } else {
      return "failed";
    }
  }
}

export default PublisherService;