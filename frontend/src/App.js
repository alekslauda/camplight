import Toolbar from './components/Toolbar/Toolbar'
import UsersList from './components/UsersList/UsersList';
import NewUser from './pages/NewUser';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import EditUser from './pages/EditUser';

function App() {
  return (
    <div className="center">
      <Router>
        <Toolbar></Toolbar>
        <main>
          <Switch>
            <Route path="/" exact>
              <div className="container">
                <h1>⭐ Test Task - User List Application</h1>
                <section>
                  <h2>Objective:</h2>
                  <p>Develop an application that allows a user to view, add, and delete users from a list.</p>
                  <p>The estimated time for this task is a maximum of 4 hours - when you reach it, let’s have a call.</p>
                  <p>The idea is to have a practical conversation about technological choices, engineering excellence, mindset, and approach. Consider it as a Pull request review.</p>
                </section>

                <section>
                  <h2>Requirements:</h2>
                  <h3>List Users:</h3>
                  <ul>
                    <li>Display a list of users with their Name, Email, and Phone number.</li>
                    <li>Implement pagination.</li>
                    <li>Each user should have a 'Delete' button next to their details.</li>
                  </ul>

                  <h3>Add User:</h3>
                  <ul>
                    <li>Provide a form to add a new user with fields for Name, Email, and Phone number.</li>
                    <li>Validate that all fields are filled before submitting.</li>
                    <li>Once a user is added, they should appear in the user list without needing to refresh the page.</li>
                  </ul>

                  <h3>Error Handling:</h3>
                  <ul>
                    <li>Display user-friendly error messages if the API calls fail.</li>
                  </ul>

                  <h3>Bonus Tasks:</h3>
                  <ul>
                    <li>Consider possible performance optimizations.</li>
                    <li>Add a search bar to filter through the user list based on their names.</li>
                  </ul>
                </section>

                <section>
                  <h2>Submission:</h2>
                  <p>Please submit a link to a GitHub repository.</p>
                </section>
              </div>
            </Route>
            <Route path="/users" exact>
              <UsersList></UsersList>
            </Route>
            <Route path="/users/new" exact>
              <NewUser></NewUser>
            </Route>
            <Route path="/users/:userId" exact>
              <EditUser></EditUser>
            </Route>
            <Redirect to="" />
          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;
