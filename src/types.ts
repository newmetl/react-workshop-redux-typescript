import * as types from './redux/constants';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

export interface Book {
	title: string,
	subtitle: string,
	isbn: string,
	abstract: string,
	numPages: number,
	author: string,
	publisher: {
		name: string,
		url: string
	}
}

// If you are using combineReducers
export interface RootState {
	booksReducer: BooksReducerState,
	// usersReducer: UsersReducerState,
}

export interface BooksReducerState {
	books: Book[],
	loading: boolean
}

export interface AddDummyAction extends Action<typeof types.ADD_DUMMY> {}
export interface FetchBookListPendingAction extends Action<typeof types.FETCH_BOOK_LIST_PENDING> {}
export interface FetchBookListSuccessAction extends Action<typeof types.FETCH_BOOK_LIST_SUCCESS> {
	books: Book[]
}

export type BooksReducerAction = AddDummyAction | FetchBookListPendingAction | FetchBookListSuccessAction;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, BooksReducerState, unknown, Action<string>>;