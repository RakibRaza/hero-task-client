import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { theme } from "./theme";
import Home from "./pages/Home";
import NavBar from './components/NavBar/NavBar'
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import EmployerSignup from './pages/EmployerSignup/EmployerSignup'
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <Home />
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
        </Switch>
        <CssBaseline />
      </Router>
    </ThemeProvider>
  );
}

export default App;
