import React, { useState } from "react";
import {
  Box, Button, Container, makeStyles, Paper, TextField, Typography,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { NavLink, useHistory } from "react-router-dom";
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

const Signup = () => {
  const classes = useStyles();
  const history = useHistory();
  const { signUp, updateName } = useAuthContext();
  const { register, handleSubmit, errors } = useForm();
  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    data.role = 'jobSeeker'
    try {
      setError("");
      await signUp(data.email, data.password);
      await updateName(data.name);
      await fetch('https://pwr-hero-task-server.herokuapp.com/addUser', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      history.replace("/");
    } catch (error) {
      setError("User alredy exist.");
    }
  };

  return (
    <Box className={classes.root}>
      <Container maxWidth="sm">
        <Paper component={Box} p={3}>
          <Typography variant="h4">Create an account</Typography>
          {error && (
            <Alert variant="filled" severity="error">
              {error}
            </Alert>
          )}
          {/* Create acount form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField name="name" margin="normal" placeholder="Name" fullWidth inputRef={register({
              required: "Name is required.",
              minLength: {
                value: 3,
                message: "Name at least 3 caracters",
              },
            })}
              helperText={errors.name?.message}
              error={Boolean(errors.name)}
            />
            <TextField margin="normal" placeholder="Email" fullWidth name="email" inputRef={register({
              required: "Email is required.",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Enter a valid email",
              },
            })}
              helperText={errors.email?.message}
              error={Boolean(errors.email)}
            />
            <TextField type="password" margin="normal" placeholder="Password" fullWidth name="password" inputRef={register({
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
              <Button type="submit" color="primary" variant="contained" fullWidth> Create an account</Button>
            </Box>
            <Typography className={classes.link} align="center">
              Already have an account ? <NavLink to="/login"> Login</NavLink>
            </Typography>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default Signup;
