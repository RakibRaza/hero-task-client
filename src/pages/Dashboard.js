import {
  Avatar,
  Box,
  Grid,
  makeStyles,
  Paper,
  Typography, Container, TextField, FormControl, FormHelperText, MenuItem, Select, InputLabel, Button
} from "@material-ui/core";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useAuthContext } from "../context/AuthContext";
const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    marginBottom: theme.spacing(4),
  },
}));
const Dashboard = () => {
  const classes = useStyles();
  const { currentUserInfo } = useAuthContext();
  const { register, handleSubmit, errors, control } = useForm();


  const onSubmit = async (data) => {
    data.status = 'pending'
    await fetch('http://localhost:8000/addJob', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    console.log(data)
  }
  return (
    <Container>
      <Grid container spacing={4} alignItems='center'>
        <Grid item xs={12} sm={6} md={5}>
          <Box component={Paper} p={5} align="center">
            <Avatar
              alt="Remy Sharp"
              src={currentUserInfo?.photoURL}
              className={classes.large}
            />
            <Typography style={{ marginBottom: "16px" }} variant="h4">
              {currentUserInfo?.displayName}
            </Typography>
            <Typography variant="h6">
              {currentUserInfo?.isAdmin ? "Admin" : "Client"}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={7}>
          <Typography variant='h4'>Post a job</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              margin="normal"
              variant="outlined"
              placeholder="Job Title"
              fullWidth
              name="title"
              inputRef={register({
                required: "Title is required.",
                minLength: {
                  value: 3,
                  message: "Title at least 5 caracters",
                },
              })}
              size='small'
              helperText={errors.title?.message}
              error={Boolean(errors.title)}
            />
            <TextField
              margin="normal"
              variant="outlined"
              placeholder="Name"
              fullWidth
              name="name"
              size='small'
              inputRef={register({
                required: "Name is required.",
                minLength: {
                  value: 3,
                  message: "Name at least 3 caracters",
                },
              })}
              helperText={errors.name?.message}
              error={Boolean(errors.name)}
            />
            <TextField
              margin="normal"
              variant="outlined"
              placeholder="Company Name"
              fullWidth
              name="company"
              size='small'
              inputRef={register({
                required: "Company name is required.",
                minLength: {
                  value: 3,
                  message: "Company name at least 3 caracters",
                },
              })}
              helperText={errors.company?.message}
              error={Boolean(errors.company)}
            />
            {/* Select */}
            <FormControl
              fullWidth
              error={Boolean(errors.tag)}
              margin='normal'
            >
              <InputLabel style={{ zIndex: '10' }} >
                Select Tag
              </InputLabel>
              <Controller
                render={(props) => (
                  <Select value={props.value} onChange={props.onChange}>
                    <MenuItem value="react">React</MenuItem>
                    <MenuItem value="vue">vue</MenuItem>
                    <MenuItem value="angular">angular</MenuItem>
                    <MenuItem value="PHP">PHP</MenuItem>
                    <MenuItem value="nodejs">NodeJS</MenuItem>
                    <MenuItem value="python">python</MenuItem>
                    <MenuItem value="java">java</MenuItem>
                  </Select>
                )}
                name="tag"
                control={control}
                defaultValue=""
                rules={{
                  required: "please choose a tag.",
                }}
              />
              <FormHelperText>{errors.tag?.message}</FormHelperText>
            </FormControl>
            <TextField
              margin="normal"
              variant="outlined"
              placeholder="Description"
              fullWidth
              multiline
              rows={5}
              name="desc"
              inputRef={register({
                required: "Description is required.",
                minLength: {
                  value: 25,
                  message: "Description at least 25 caracters",
                },
              })}
              helperText={errors.desc?.message}
              error={Boolean(errors.desc)}
            />
            <Box my={3}>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                fullWidth
              >
                Submit
              </Button>
            </Box>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
