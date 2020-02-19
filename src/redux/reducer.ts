import * as types from './constants';
import { Book, BooksReducerState, BooksReducerAction } from '../types';

const dummyBook: Book = {
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

const emptyBook: Book = {
	title: "",
	subtitle: "",
	isbn: "",
	abstract: "",
	numPages: undefined,
	author: "",
	publisher: {
		name: "",
		url: ""
	}
}

const INITIAL_STATE: BooksReducerState = {
  books: [],
  bookDetails: emptyBook,
  bookEdit: emptyBook,
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
    case types.FETCH_BOOK_PENDING:
      return {
        ...state,
        loading: true
      }
    case types.FETCH_BOOK_SUCCESS:
      return {
        ...state,
        loading: false,
        [action.stateName]: action.book
      }
    case types.UPDATE_BOOK:
      return {
        ...state,
        bookEdit: {
          ...state.bookEdit,
          [action.attrName]: action.value
        }
      }
    default:
      return state;
  }
}
