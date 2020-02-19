import React from 'react';
import { Link } from 'react-router-dom';
import { Book } from '../types';

interface BookListItemProps extends Book {
	onDelete(isbn: string): void;
}

const BookListItem: React.FC<BookListItemProps> = ({ onDelete, title, isbn }) => {
	function handleClickOnDeleteButton() {
		onDelete(isbn);
	}
	return (
		<li>
			<Link to={`/books/${isbn}`}>{title}</Link>
			<button onClick={handleClickOnDeleteButton}>Delete</button>
		</li>
	);
}

export default BookListItem;
