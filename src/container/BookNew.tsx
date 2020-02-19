import React from 'react';
import { History } from 'history';
import { connect, ConnectedProps } from 'react-redux';
import { createBook, updateBookNew } from '../redux/actions';
import { Book, BooksReducerState } from '../types';
import BookForm from '../components/BookForm';

const mapStateToProps = (state: BooksReducerState) => ({
	book: state.bookNew
});

const connector = connect(mapStateToProps, { createBook, updateBookNew });
type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
	history: History
}

const BookEdit: React.FC<Props> = (props) => {
	const { history, createBook, updateBookNew, book } = props;

	function handleOnChange(attrName: string, value: string) {
		console.log('handleOnChange', attrName, value);
		updateBookNew(attrName, value);
	}

	function handleOnSubmit() {
		createBook(book)
			.then((newBook: void | Book) => {
				if (newBook)
					history.push(`/books/${newBook.isbn}`);
			});
	}

	return (
		<div>
			<h2>New Book</h2>
			<BookForm book={book} onChange={handleOnChange} onSubmit={handleOnSubmit} />
		</div>
	);
}

export default connector(BookEdit);
