import { Action, Dispatch } from 'redux';
import {
  Book,
  AppThunk,
  AddDummyAction,
  FetchBookListPendingAction,
  FetchBookListSuccessAction,
  FetchBookPendingAction,
  FetchBookSuccessAction } from '../types';
import * as types from './constants';

export function addDummyBook(): AddDummyAction {
  return {
    type: types.ADD_DUMMY
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
function fetchBookSuccess(book: Book): FetchBookSuccessAction { return { type: types.FETCH_BOOK_SUCCESS, book }}
export function fetchBook(isbn: string): AppThunk<Promise<FetchBookSuccessAction | void>> {
  return (dispatch: Dispatch<Action<string>>) => {
    dispatch(fetchBookPending());

    return fetch(`http://localhost:4730/books/${isbn}`)
      .then((response) => response.json())
      .then((book: Book) => dispatch(fetchBookSuccess(book)))
      .catch((error) => console.log(error));
  }
}
