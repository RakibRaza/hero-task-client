import {
  Avatar,
  Box,
  Grid,
  makeStyles,
  Paper,
  Typography, Container, TextField, FormControl, FormHelperText, MenuItem, Select, InputLabel, Button,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
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
  const [jobs, setJobs] = useState([])
  const { currentUserInfo, user, setUser } = useAuthContext();
  const { register, handleSubmit, errors, control, reset } = useForm();

  const fetchJobs = async () => {
    const res = await fetch(
      `http://localhost:8000/employerJobs?email=${currentUserInfo.email}`
    )
    const data = await res.json();
    if (data) setJobs(data);
  }
  const onSubmit = async (data) => {
    if (user.jobPostLeft > 0) {
      data.status = 'pending'
      data.email = currentUserInfo.email
      const res = await fetch('http://localhost:8000/addJob', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      const job = res.json()
      if (job) {
        await fetch(`http://localhost:8000/updateUser/${user.email}`, {
          method: "PATCH",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify({
            jobPostLeft: user.jobPostLeft - 1,
          }),
        })
        fetchJobs()
        setUser({ ...user, jobPostLeft: user.jobPostLeft - 1 })
        reset()
      }
    }
  }
  useEffect(() => {
    fetchJobs()
  }, [])

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
              {user?.accountType}  {user?.role}
            </Typography>
            <Typography variant="h6">
              Job post left this month - {user.jobPostLeft}
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
              placeholder="Author name"
              fullWidth
              name="author"
              size='small'
              inputRef={register({
                required: "Author name is required.",
                minLength: {
                  value: 3,
                  message: "Author name at least 3 caracters",
                },
              })}
              helperText={errors.author?.message}
              error={Boolean(errors.author)}
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
              variant='outlined'
              size='small'
            >
              <InputLabel style={{ zIndex: '10', }} >
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

      <Grid container spacing={4}>
        {jobs.map((job) => (
          <Grid key={job._id} item xs={12} sm={6} md={4}>
            <Box p={3} style={{ background: "#fff" }}>
              <Typography variant="h5" align="center">
                {job.title}
              </Typography>
              <Typography align="center" variant="h6">
                {job.author}
              </Typography>
              <Typography>{job.desc}</Typography>
              <Box align='center' mt={2}>
                <TextField
                  select
                  fullWidth
                  value={job.status}
                >
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="done">Done</MenuItem>
                </TextField>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Dashboard;
