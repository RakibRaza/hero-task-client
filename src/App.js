import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { theme } from "./theme";
import NavBar from './components/NavBar/NavBar'
import Login from "./components/Account/Login";
import Signup from "./components/Account/Signup";
import EmployerSignup from './components/EmployerSignup/EmployerSignup';
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import EmployerDashboard from "./components/Dashboard/EmployerDashboard";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import JobSeekerDashboard from "./components/Dashboard/JobSeekerDashboard";
import Jobs from './components/Jobs/Jobs';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <NavBar />
        <Switch>
          <PrivateRoute exact path="/">
            <Jobs />
          </PrivateRoute>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/employerSignup">
            <EmployerSignup />
          </Route>
          <PrivateRoute path="/employarDashboard">
            <EmployerDashboard />
          </PrivateRoute>
          <PrivateRoute path="/adminDashboard">
            <AdminDashboard />
          </PrivateRoute>
          <PrivateRoute path="/jobSeekerDashboard">
            <JobSeekerDashboard />
          </PrivateRoute>
        </Switch>
        <CssBaseline />
      </Router>
    </ThemeProvider>
  );
}

export default App;
