import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import BookListItem from '../components/BookListItem';
import * as actions from '../redux/actions';
import { BooksReducerState } from '../types';

const mapStateToProps = (state: BooksReducerState) => ({
  books: state.books
});

const connector = connect(mapStateToProps, actions);

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
  color: string;
}

const BookList: React.FC<Props> = ({ books, addDummyBook, fetchBookList }) => {

  useEffect(() => {
    fetchBookList();
  }, [fetchBookList]);

  const handleButtonClick = () => {
    addDummyBook();
  }

	return (
    <div>
      <h2>Books</h2>
      <button onClick={handleButtonClick}>Add Dummy</button>
      <ul>
        {
          books.map((book, index) => (
            <BookListItem key={index} {...book} />
          ))
        }
      </ul>
      <Link to="/books/new">New Book</Link>
    </div>
  );
}

export default connector(BookList);
