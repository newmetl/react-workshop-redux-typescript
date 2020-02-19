import React, { useEffect, ChangeEvent } from 'react';
import { match } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { fetchBook, updateBook } from '../redux/actions';
import { BooksReducerState } from '../types';

const mapStateToProps = (state: BooksReducerState) => ({
	book: state.bookEdit,
	bookDetails: state.bookDetails
});

const connector = connect(mapStateToProps, { fetchBook, updateBook });
type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
	match: match<{
		isbn: string
	}>
}

const BookEdit: React.FC<Props> = ({ updateBook, fetchBook, book, bookDetails, match: { params: { isbn } } }) => {

	useEffect(() => {
		fetchBook(isbn, 'bookDetails');
		fetchBook(isbn, 'bookEdit');
	}, [fetchBook, isbn]);

	function handleInputChanged(event: ChangeEvent<HTMLInputElement>) {
		updateBook(event.target.name, event.target.value);
	}

	return (
		<div>
			<h2>Edit {bookDetails.title}</h2>
			{
				book ? (
					<form>
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
					</form>
				) : <div>Loading...</div>
			}
		</div>
	);
}

export default connector(BookEdit);
