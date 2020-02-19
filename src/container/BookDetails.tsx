import React, { useEffect } from 'react';
import { match, Link } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { fetchBook } from '../redux/actions';
import { BooksReducerState } from '../types';

const mapStateToProps = (state: BooksReducerState) => ({
	book: state.bookDetails
});

const connector = connect(mapStateToProps, { fetchBook });
type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
	match: match<{
		isbn: string
	}>
}

const BookDetails: React.FC<Props> = ({ fetchBook, book,  match: { params: { isbn } } }) => {

	useEffect(() => {
		fetchBook(isbn, 'bookDetails');
	}, [fetchBook, isbn]);

	return (
		<div>
			<h2>Book Details</h2>
			{
				book ? (
					<div>
						<h3>{book.title}</h3>
						<h5>{book.subtitle}</h5>
						<Link to={`/books/${book.isbn}/edit`}>Edit</Link>
					</div>
				) : <div>Loading...</div>
			}
		</div>
	);
}

export default connector(BookDetails);
