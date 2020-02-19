import { Action, Dispatch } from 'redux';
import {
  Book,
  AppThunk,
  AddDummyAction,
  UpdateBookAction,
  FetchBookListPendingAction,
  FetchBookListSuccessAction,
  FetchBookPendingAction,
  FetchBookSuccessAction,
  PersistBookPendingAction,
  PersistBookSuccessAction } from '../types';
import * as types from './constants';

export function addDummyBook(): AddDummyAction {
  return {
    type: types.ADD_DUMMY
  }
}

export function updateBook(attrName: string, value: string): UpdateBookAction {
  return {
    type: types.UPDATE_BOOK,
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

    const url = `http://localhost:4730/books/${book.isbn}`

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
