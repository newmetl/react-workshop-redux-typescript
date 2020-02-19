import React, { useCallback, FormEvent, ChangeEvent } from 'react';
import { Book } from '../types';

interface BookListItemProps {
	book: Book;
	onChange(attrName: string, value: string): void;
	onSubmit(): void;
}

const BookForm: React.FC<BookListItemProps> = ({ onChange, onSubmit, book: { title, subtitle } }) => {

	const handleOnChange = useCallback((event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		onChange(event.target.name, event.target.value);
	}, [onChange]);

	const handleOnSubmit = useCallback((event: FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		onSubmit();
	}, [onSubmit]);

	return (
		<form onSubmit={handleOnSubmit}>
			<div>
				<label>Title:
					<input type="text" name="title" value={title} onChange={handleOnChange} />
				</label>
			</div>
			<div>
				<label>Subtitle:
					<textarea name="subtitle" value={subtitle} onChange={handleOnChange} />
				</label>
			</div>
			<input type="submit" value="save" />
		</form>
	);
}

export default BookForm;
