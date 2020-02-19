import React, { useEffect } from 'react';
import { History } from 'history';
import { match } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { fetchBook, updateBook, persistBook } from '../redux/actions';
import { BooksReducerState } from '../types';
import BookForm from '../components/BookForm';

const mapStateToProps = (state: BooksReducerState) => ({
	book: state.bookEdit,
	bookDetails: state.bookDetails
});

const connector = connect(mapStateToProps, { fetchBook, updateBook, persistBook });
type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
	match: match<{
		isbn: string
	}>,
	history: History
}

const BookEdit: React.FC<Props> = (props) => {
	const { history, updateBook, fetchBook, persistBook, book, bookDetails, match: { params: { isbn } } } = props;
	console.log(props);
	useEffect(() => {
		fetchBook(isbn, 'bookDetails');
		fetchBook(isbn, 'bookEdit');
	}, [fetchBook, isbn]);

	function handleOnChange(attrName: string, value: string) {
		updateBook(attrName, value);
	}

	function handleOnSubmit() {
		persistBook(book)
			.then(() => history.push(`/books/${book.isbn}`));
	}

	return (
		<div>
			<h2>Edit {bookDetails.title}</h2>
			{
				book ? (
					<BookForm book={book} onChange={handleOnChange} onSubmit={handleOnSubmit} />
				) : <div>Loading...</div>
			}
		</div>
	);
}

export default connector(BookEdit);
