import React, { useState } from "react";
import {
  Box, Button, Container, makeStyles, Paper, TextField, Typography,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuthContext } from "../../context/AuthContext";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "calc(100vh - 68px)",
  },
  link: {
    fontWeight: "bold",
    "& a": {
      color: theme.palette.primary.main,
    },
  },
}));

const Login = () => {
  const classes = useStyles();
  const { logIn } = useAuthContext();
  const location = useLocation();
  const history = useHistory();
  const [error, setError] = useState("");
  const { register, handleSubmit, errors } = useForm();

  let { from } = location.state || { from: { pathname: "/" } };

  const onSubmit = async (data) => {
    try {
      setError("");
      await logIn(data.email, data.password);
      history.replace(from);
    } catch (error) {
      setError("No user Found.");
    }
  };

  return (
    <Box className={classes.root}>
      <Container maxWidth="sm">
        <Paper component={Box} p={3}>
          <Typography variant="h4">Login</Typography>
          {error && (
            <Alert variant="filled" severity="error">
              {error}
            </Alert>
          )}
          {/* login form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField name="email" margin="normal" label='Email' fullWidth inputRef={register({
              required: "Email is required.",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Enter a valid email",
              },
            })}
              helperText={errors.email?.message}
              error={Boolean(errors.email)}
            />
            <TextField name="password" margin="normal" label="Password" fullWidth type="password"
              inputRef={register({
                required: "Password is required.",
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                  message:
                    "Password must contains letter number and mninum 6 caracters",
                },
              })}
              helperText={errors.password?.message}
              error={Boolean(errors.password)}
            />
            <Box my={3}>
              <Button type="submit" color="primary" variant="contained" fullWidth>Login</Button>
            </Box>
            {/* Create account link */}
            <Typography gutterBottom className={classes.link} align="center">
              Don't have an account ?{" "}
              <NavLink to="/signup"> Create a job seeker account</NavLink>
            </Typography>
            <Typography className={classes.link} align="center">
              Don't have an account ?{" "}
              <NavLink to="/employerSignup"> Create an employer account</NavLink>
            </Typography>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
