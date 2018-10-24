import axios from "axios";

export function getBooks(limit = 10, start = 0, order = "asc", list = "") {
  const request = axios
    .get(`/api/books?limit=${limit}&skip=${start}&order=${order}`)
    .then(response => {
      if (list) {
        return [...list, ...response.data];
      } else {
        return response.data;
      }
    });

  return {
    type: "GET_BOOKS",
    payload: request
  };
}

// export function getBooks() {
//   const request = axios
//     .get(`/api/getBook?id=5bcc35b98039ef264c4ff847`)
//     .then(response => response.data);

//   return {
//     type: "GET_BOOKS",
//     payload: request
//   };
// }

export function getBookWithReviewer(id) {
  const request = axios.get(`/api/getBook?id=${id}`);

  return dispatch => {
    request.then(({ data }) => {
      let book = data;
      console.log("vao actions", book);
      axios.get(`/api/getReviewer?id=${book.ownerId}`).then(({ data }) => {
        let response = {
          book,
          reviewer: data
        };
        // console.log(response);
        dispatch({
          type: "GET_BOOk_W_REVIEWER",
          payload: response
        });
      });
    });
  };
}

export function clearBookWithReviewer(id) {
  return {
    type: "CLEAR_BOOk_W_REVIEWER",
    payload: {
      books: {},
      reviewer: {}
    }
  };
}

export function addBook(book) {
  const request = axios.post("/api/book", book).then(res => res.data);

  return {
    type: "ADD_BOOK",
    payload: request
  };
}

export function clearNewBook() {
  return {
    type: "CLEAR_NEWBOOK",
    payload: {}
  };
}

export function getUserPosts(userId) {
  const request = axios.get(`/api/user_posts?user=${userId}`).then(res=>res.data)
  return {
    type: "GET_USER_POSTS",
    payload: request
  };
}

/*==============USER==============*/
export function loginUser({ email, password }) {
  const request = axios
    .post("/api/login", { email, password })
    .then(response => response.data);

  console.log("vao action loginUser", request);

  return {
    type: "USER_LOGIN",
    payload: request
  };
}

export function auth() {
  const request = axios.get("/api/auth").then(response => response.data);
  console.log("vao action auth");
  console.log(request);

  return {
    type: "USER_AUTH",
    payload: request
  };
}
