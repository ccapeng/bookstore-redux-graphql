import Request from "./request";

const getBookObj = (data) => {
  let categoryId = data.category === null ? 0 : data.category.id;
  let publisherId = data.publisher === null ? 0 : data.publisher.id;
  let authorId = data.author === null ? 0 : data.author.id;
  let book = {
    id: data.id,
    title: data.title,
    category: categoryId,
    publisher: publisherId,
    author: authorId
  }
  return book;
}

const BookService = {
  list: async () => {
    let query = `{
      bookList {
        id
        title
        category {
          name
        }
        publisher {
          name
        }
        author {
          lastName
          firstName
        }
      }
    }
    `
    let data = await Request.get(query);
    let bookList = [];
    data.data.bookList.map((book) => {
      let categoryName = book.category === null ? "" : book.category.name;
      let publisherName = book.publisher === null ? "" : book.publisher.name;
      let authorName = book.author === null ? "" : book.author.lastName + ", " + book.author.firstName;
      bookList.push({
        id: book.id,
        title: book.title,
        category: categoryName,
        publisher: publisherName,
        author: authorName
      });
    });
    return bookList;
  },
  get: async (bookId) => {
    let query = `query {
      book(id:${bookId}) {
        id
        title
        category {
          id
        }
        publisher {
          id
        }
        author {
          id
        }
      }
    }
    `
    let data = await Request.get(query);
    let book = getBookObj(data.data.book);
    return book;
  },
  save: async (book) => {
    if (book.id === 0) {
      let query = `mutation {
        createBook(input: {
          title: "${book.title}", 
          category: ${book.category},
          publisher: ${book.publisher},
          author: ${book.author}
        }) {
          ok
          book {
            id
            title
            category {
              id
            }
            publisher {
              id
            }
            author {
              id
            }
          }
        }
      }`
      let variables = null;
      let data = await Request.create(query, variables);
      book = getBookObj(data.data.createBook.book);
      return book;
    } else {
      console.log("service save", book);
      let query = `mutation {
        updateBook(
          id: ${book.id}, 
          input: {
            title: "${book.title}", 
            category: ${book.category},
            publisher: ${book.publisher},
            author: ${book.author}
          }
        ){
          ok
          book {
            id
            title
            category {
              id
            }
            publisher {
              id
            }
            author {
              id
            }
          }
        }
      }`
      let variables = null;
      let data = await Request.update(query, variables);
      book = getBookObj(data.data.updateBook.book);
      return book;
    }
  },
  delete: async (bookId) => {
    let query = `mutation {
      deleteBook(id: ${bookId}) {
        ok
      }
    }`
    let variables = null;
    let data = await Request.delete(query, variables);
    if (data.data.deleteBook.ok) {
      return "deleted";
    } else {
      return "failed";
    }
  }
}

export default BookService;