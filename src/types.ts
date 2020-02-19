import * as types from './redux/constants';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

export interface Book {
	title: string,
	subtitle: string,
	isbn: string,
	abstract: string,
	numPages: number | undefined,
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
	bookDetails: Book,
	bookEdit: Book,
	bookNew: Book,
	loading: boolean,
}

export interface AddDummyAction extends Action<typeof types.ADD_DUMMY> {}

interface UpdateBookAction<T> extends Action<T> {
	attrName: string,
	value: string
}
export interface UpdateBookEditAction extends UpdateBookAction<typeof types.UPDATE_BOOK_EDIT> { }
export interface UpdateBookNewAction extends UpdateBookAction<typeof types.UPDATE_BOOK_NEW> { }

export interface FetchBookListPendingAction extends Action<typeof types.FETCH_BOOK_LIST_PENDING> {}
export interface FetchBookListSuccessAction extends Action<typeof types.FETCH_BOOK_LIST_SUCCESS> {
	books: Book[]
}

export interface FetchBookPendingAction extends Action<typeof types.FETCH_BOOK_PENDING> {}
export interface FetchBookSuccessAction extends Action<typeof types.FETCH_BOOK_SUCCESS> {
	book: Book,
	stateName: string,
}

export interface PersistBookPendingAction extends Action<typeof types.PERSIST_BOOK_PENDING> { }
export interface PersistBookSuccessAction extends Action<typeof types.PERSIST_BOOK_SUCCESS> { }

export interface CreateBookPendingAction extends Action<typeof types.CREATE_BOOK_PENDING> { }
export interface CreateBookSuccessAction extends Action<typeof types.CREATE_BOOK_SUCCESS> { }


export type BooksReducerAction = AddDummyAction | FetchBookListPendingAction | FetchBookListSuccessAction | FetchBookPendingAction | FetchBookSuccessAction | UpdateBookEditAction | UpdateBookNewAction | CreateBookPendingAction | CreateBookSuccessAction | PersistBookPendingAction | PersistBookSuccessAction

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, BooksReducerState, unknown, Action<string>>;
