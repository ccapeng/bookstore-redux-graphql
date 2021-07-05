import Request from "./request";

const CategoryService = {
  list: async () => {
    let query = `query {
      categoryList {
        id
        name
      }
    }
    `
    let data = await Request.get(query);
    return data.data.categoryList;
  },
  get: async (categoryId) => {
    let query = `query {
      category(id:${categoryId}) {
        id
        name
      }
    }
    `
    let data = await Request.get(query);
    return data.data.category;
  },
  save: async (category) => {
    if (category.id === 0) {
      let query = `mutation {
        createCategory(input: {name: "${category.name}"}) {
            id
            name
        }
      }`
      let variables = null;
      let data = await Request.create(query, variables);
      return data.data.createCategory;
    } else {
      let query = `mutation {
        updateCategory(
          id: ${category.id}, 
          input: {name: "${category.name}"}) {
            id
            name
        }
      }`
      let variables = null;
      let data = await Request.update(query, variables);
      return data.data.updateCategory;
    }
  },
  delete: async (categoryId) => {
    let query = `mutation {
      deleteCategory(id:${categoryId}){
        id
      }
    }`
    let variables = null;
    let data = await Request.delete(query, variables);
    if (data.data.deleteCategory) {
      return "deleted";
    } else {
      return "failed";
    }
  }
}

export default CategoryService;