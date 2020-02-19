import * as types from './constants';
import { BooksReducerState, BooksReducerAction } from '../types';

const dummyBook = {
	title: "string",
	subtitle: "string",
	isbn: "string",
	abstract: "string",
	numPages: 123,
	author: "string",
	publisher: {
		name: "string",
		url: "string"
	}
}

const INITIAL_STATE: BooksReducerState = {
  books: [],
  loading: false
};

export default function booksReducer(state: BooksReducerState = INITIAL_STATE, action: BooksReducerAction): BooksReducerState {
  console.log(action);
  switch (action.type) {
    case types.ADD_DUMMY:
      return {
        ...state,
        books: [...state.books, dummyBook]
      };
    case types.FETCH_BOOK_LIST_PENDING:
      return {
        ...state,
        loading: true
      }
    case types.FETCH_BOOK_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        books: action.books
      }
    default:
      return state;
  }
}
