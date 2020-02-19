import React from 'react';

interface Props {
	match: any
}

const BookDetails: React.FC<Props> = ({ match }) => {
	return (
		<div>
			<h2>Book Details</h2>
			<div>{match.params.isbn}</div>
		</div>
	);
}

export default BookDetails;
