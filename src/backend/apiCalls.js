import httpService from "./httpService";

// Register
const registerApi = (values) => httpService.post(`/register`, values);

// Login
const loginApi = (values) => httpService.post(`/login`, values);

// Search API for getting books search results
const searchBooks = (name) => httpService.get(`/search?title=${name}`);

// borrow book
const borrowBook = (book) => httpService.post(`/borrowBook`, book);

// return book
const returnBook = (book_id) => httpService.get(`/returnBook?book_id=${book_id}`);

// user book logs
const userLogs = () => httpService.get(`/bookLogs`);

// sync firebase
const syncFirebaseLogin = (values) => httpService.post(`/api/syncFirebaseLogin`, values);

// get books
const myBooks = () => httpService.get(`/api/books`);

// add book
const create = (values) => httpService.post(`/api/books`, values);

// update book
const update = (id, values) => httpService.put(`/api/books/${id}`, values);

// delete book
const deleteBook = (id) => httpService.delete(`/api/books/${id}`);

export default {
    loginApi,
    registerApi,
    searchBooks,
    borrowBook,
    returnBook,
    userLogs,
    syncFirebaseLogin,
    myBooks,
    create,
    update,
    deleteBook
}