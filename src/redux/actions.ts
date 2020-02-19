import { Action, Dispatch } from 'redux';
import {
  Book,
  AppThunk,
  AddDummyAction,
  UpdateBookEditAction,
  UpdateBookNewAction,
  FetchBookListPendingAction,
  FetchBookListSuccessAction,
  FetchBookPendingAction,
  FetchBookSuccessAction,
  PersistBookPendingAction,
  PersistBookSuccessAction,
  CreateBookPendingAction,
  CreateBookSuccessAction } from '../types';
import * as types from './constants';

export function addDummyBook(): AddDummyAction {
  return {
    type: types.ADD_DUMMY
  }
}

export function updateBookEdit(attrName: string, value: string): UpdateBookEditAction {
  return {
    type: types.UPDATE_BOOK_EDIT,
    attrName,
    value
  }
}

export function updateBookNew(attrName: string, value: string): UpdateBookNewAction {
  return {
    type: types.UPDATE_BOOK_NEW,
    attrName,
    value
  }
}

// fetchBookList
function fetchBookListPending(): FetchBookListPendingAction { return { type: types.FETCH_BOOK_LIST_PENDING }}
function fetchBookListSuccess(books: Book[]): FetchBookListSuccessAction { return { type: types.FETCH_BOOK_LIST_SUCCESS, books }}
export function fetchBookList(): AppThunk<Promise<FetchBookListSuccessAction | void>> {
  return (dispatch: Dispatch<Action<string>>) => {
    dispatch(fetchBookListPending());

    return fetch('http://localhost:4730/books')
      .then((response) => response.json())
      .then((books: Book[]) => dispatch(fetchBookListSuccess(books)))
      .catch((error) => console.log(error));
  }
}

// fetchBook
function fetchBookPending(): FetchBookPendingAction { return { type: types.FETCH_BOOK_PENDING }}
function fetchBookSuccess(book: Book, stateName: string): FetchBookSuccessAction { return { type: types.FETCH_BOOK_SUCCESS, book, stateName }}
export function fetchBook(isbn: string, stateName: string): AppThunk<Promise<FetchBookSuccessAction | void>> {
  return (dispatch: Dispatch<Action<string>>) => {
    dispatch(fetchBookPending());

    return fetch(`http://localhost:4730/books/${isbn}`)
      .then((response) => response.json())
      .then((book: Book) => dispatch(fetchBookSuccess(book, stateName)))
      .catch((error) => console.log(error));
  }
}

// persistBook
function persistBookPending(): PersistBookPendingAction { return { type: types.PERSIST_BOOK_PENDING } }
function persistBookSuccess(): PersistBookSuccessAction { return { type: types.PERSIST_BOOK_SUCCESS } }
export function persistBook(book: Book): AppThunk<Promise<PersistBookSuccessAction | void>> {
  return (dispatch: Dispatch<Action<string>>) => {
    dispatch(persistBookPending());

    const url = `http://localhost:4730/books/${book.isbn}`;

    const request = new Request(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify(book)
    });

    return fetch(request)
      .then((response) => response.json())
      .then(() => dispatch(persistBookSuccess()))
      .catch((error) => console.log(error));
  }
}

// createBook
function createBookPending(): CreateBookPendingAction { return { type: types.CREATE_BOOK_PENDING } }
function createBookSuccess(): CreateBookSuccessAction { return { type: types.CREATE_BOOK_SUCCESS } }
export function createBook(book: Book): AppThunk<Promise<Book | void>> {
  return (dispatch: Dispatch<Action<string>>) => {
    dispatch(createBookPending());

    const url = `http://localhost:4730/books`;

    const request = new Request(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(book)
    });

    return fetch(request)
      .then((response) => response.json())
      .then((book: Book) => {
        dispatch(createBookSuccess());
        return book;
      })
      .catch((error) => console.log(error));
  }
}
