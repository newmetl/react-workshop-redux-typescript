import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import BookList from './container/BookList';
import BookDetails from './container/BookDetails';
import BookEdit from './container/BookEdit';

function App() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/books">Books</Link>
      </nav>
      <main>
        <Switch>
          <Route path="/books/:isbn/edit" component={BookEdit} />
          <Route path="/books/:isbn" component={BookDetails} />
          <Route path="/books" render={() => <BookList color="red" />} />
          <Route path="/">
            <h2>Home</h2>
            <div>Welcome to my awesome website!</div>
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
