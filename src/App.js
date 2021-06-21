import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { theme } from "./theme";
import NavBar from './components/NavBar/NavBar'
import Login from "./components/Account/Login";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Dashboard from "./components/Dashboard/Dashboard";
import Signup from "./components/Account/Signup";
import Admin from "./components/Admin/Admin";
import Jobs from './components/Jobs/Jobs'
import EmployerSignup from './components/EmployerSignup/EmployerSignup'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <Jobs />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/employerSignup">
            <EmployerSignup />
          </Route>
          <PrivateRoute path="/dashboard">
            <Dashboard />
          </PrivateRoute>
          <PrivateRoute path="/admin">
            <Admin />
          </PrivateRoute>
        </Switch>
        <CssBaseline />
      </Router>
    </ThemeProvider>
  );
}

export default App;
