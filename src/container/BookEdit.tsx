import React, { useEffect, ChangeEvent, FormEvent } from 'react';
import { History } from 'history';
import { match } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { fetchBook, updateBook, persistBook } from '../redux/actions';
import { BooksReducerState } from '../types';

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

	function handleInputChanged(event: ChangeEvent<HTMLInputElement>) {
		updateBook(event.target.name, event.target.value);
	}

	function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		persistBook(book)
			.then(() => history.push(`/books/${book.isbn}`));
	}

	return (
		<div>
			<h2>Edit {bookDetails.title}</h2>
			{
				book ? (
					<form onSubmit={handleFormSubmit}>
						<div>
							<label>Title:
								<input type="text" name="title" value={book.title} onChange={handleInputChanged} />
							</label>
						</div>
						<div>
							<label>Abstract:
								<textarea name="abstract" value={book.abstract} />
							</label>
						</div>
						<input type="submit" value="save" />
					</form>
				) : <div>Loading...</div>
			}
		</div>
	);
}

export default connector(BookEdit);
