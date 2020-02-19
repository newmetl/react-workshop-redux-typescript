import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { fetchBook } from '../redux/actions';
import { BooksReducerState } from '../types';

const mapStateToProps = (state: BooksReducerState) => ({
	book: state.bookDetails
});

const connector = connect(mapStateToProps, { fetchBook });
type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
	match: any
}

const BookDetails: React.FC<Props> = ({ fetchBook, book,  match: { params: { isbn } } }) => {

	useEffect(() => {
		fetchBook(isbn);
	}, [fetchBook, isbn]);

	console.log('BookDetails: ', book);

	return (
		<div>
			<h2>Book Details</h2>
			{
				book ? (
					<div>
						<h3>{book.title}</h3>
						<h5>{book.subtitle}</h5>
					</div>
				) : <div>Loading...</div>
			}
		</div>
	);
}

export default connector(BookDetails);
