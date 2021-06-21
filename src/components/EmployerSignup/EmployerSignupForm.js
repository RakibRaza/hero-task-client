import React, { useEffect, useState } from "react";
import {
  Box, Button, Container, makeStyles, Paper, TextField, Typography, MenuItem, InputLabel, FormHelperText, FormControl, Select
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { NavLink, useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useAuthContext } from "../../context/AuthContext";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "calc(100vh - 68px)",
    margin: theme.spacing(3, 0)
  },
  link: {
    fontWeight: "bold",
    "& a": {
      color: theme.palette.primary.main,
    },
  },
  payInput: {
    display: "block",
    margin: "10px 0 20px 0",
    maxWidth: "500px",
    padding: "20px 24px",
    fontSize: "1em",
    boxShadow:
      "rgba(50, 50, 93, 0.14902) 0px 1px 3px,rgba(0, 0, 0, 0.0196078) 0px 1px 0px",
    border: "0",
    outline: "0",
    borderRadius: "4px",
    background: "#ddd",
  },
}));

const EmployerSignupForm = () => {
  const classes = useStyles();
  const history = useHistory();
  const { signUp, updateName, setUser } = useAuthContext();
  const { register, handleSubmit, errors, control } = useForm();
  const [error, setError] = useState("");
  const [paymentError, setPaymentError] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  const onSubmit = async (data) => {
    if (data.accountType === 'basic') {
      data.jobPostLeft = 10
    } else if (data.accountType === 'standard') {
      data.jobPostLeft = 20
    } else {
      data.jobPostLeft = 30
    }
    data.role = 'employer'


    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      setPaymentError(error.message);
    } else {
      data.paymentId = paymentMethod.id
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
        setUser(data)
        history.replace("/");

      } catch (error) {
        console.error(error.message);
        setError("User alredy exist.");
      }
    }
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setPaymentError("");
    }, 3000);
    return () => clearTimeout(timeOut);
  }, [paymentError]);

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
          {paymentError && (
            <Alert variant="filled" severity="error">
              {paymentError}
            </Alert>
          )}
          {/* Create account form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField name="name" margin="normal" label="Name" fullWidth inputRef={register({
              required: "Name is required.",
              minLength: {
                value: 3,
                message: "Name at least 3 caracters",
              },
            })}
              helperText={errors.name?.message}
              error={Boolean(errors.name)}
            />
            <TextField name="email" margin="normal" label="Email" fullWidth inputRef={register({
              required: "Email is required.",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Enter a valid email",
              },
            })}
              helperText={errors.email?.message}
              error={Boolean(errors.email)}
            />
            <TextField name="password" type="password" margin="normal" label="Password" fullWidth inputRef={register({
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
            {/* Select */}
            <FormControl fullWidth error={Boolean(errors.accountType)}>
              <InputLabel>
                Select Your account type
              </InputLabel>
              <Controller name="accountType" control={control} defaultValue="" render={(props) => (
                <Select value={props.value} onChange={props.onChange}>
                  <MenuItem value="basic">Basic 10 job post/month</MenuItem>
                  <MenuItem value="standard">Standard 20 job post/month</MenuItem>
                  <MenuItem value="premium">Premium 30 job post/month</MenuItem>
                </Select>
              )}
                rules={{
                  required: "please choose your account type.",
                }}
              />
              <FormHelperText>{errors.accountType?.message}</FormHelperText>
            </FormControl>
            {/* payment Cart */}
            <CardElement className={classes.payInput} />
            <Box my={3}>
              <Button type="submit" color="primary" variant="contained" fullWidth>Create an account</Button>
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

export default EmployerSignupForm;
