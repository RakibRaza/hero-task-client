import {
  Box,
  Button,
  Container,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuthContext } from "../context/AuthContext";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "calc(100vh - 68px)",
  },
  checkbox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: theme.spacing(2, 0),
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
    try {
      setError("");
      await signUp(data.email, data.password);
      await updateName(data.name);
      history.replace("/");
    } catch (error) {
      setError("User alredy exist.");
    }
  };
  return (
    <Box className={classes.root}>
      <Container maxWidth="sm">
        <Paper component={Box} p={3}>
          <Typography
            gutterBottom
            style={{ fontWeight: "bold" }}
            variant="h5"
          >
            Create an account
          </Typography>
          {error && (
            <Alert variant="filled" severity="error">
              {error}
            </Alert>
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              inputRef={register({
                required: "Name is required.",
                minLength: {
                  value: 3,
                  message: "Name at least 3 caracters",
                },
              })}
              name="name"
              margin="normal"
              placeholder="Name"
              fullWidth
              helperText={errors.name?.message}
              error={Boolean(errors.name)}
            />
            <TextField
              autoComplete="off"
              name="email"
              inputRef={register({
                required: "Email is required.",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Enter a valid email",
                },
              })}
              margin="normal"
              placeholder="Email"
              fullWidth
              helperText={errors.email?.message}
              error={Boolean(errors.email)}
            />
            <TextField
              name="password"
              inputRef={register({
                required: "Password is required.",
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                  message:
                    "Password must contains letter number and mninum 6 caracters",
                },
              })}
              type="password"
              margin="normal"
              placeholder="Password"
              fullWidth
              helperText={errors.password?.message}
              error={Boolean(errors.password)}
            />
            <Box my={3}>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                fullWidth
              >
                Create an account
              </Button>
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
