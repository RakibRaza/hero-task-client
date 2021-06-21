import React, { useEffect, useState } from 'react'
import { Box, Container, Avatar, Paper, Grid, Typography, TextField, MenuItem, makeStyles } from "@material-ui/core";
import { useAuthContext } from '../../context/AuthContext';

const useStyles = makeStyles(theme => ({
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    marginBottom: theme.spacing(4),
  },
}))

const AdminDashboard = () => {
  const classes = useStyles()
  const [jobs, setJobs] = useState([])
  const { user, currentUserInfo } = useAuthContext()

  const handleChange = (e, id) => {
    fetch(`https://pwr-hero-task-server.herokuapp.com/updateJob/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        status: e.target.value,
      }),
    })
      .then((res) => res.json())
      .then(data => {
        if (data) {
          const newJobs = jobs.filter(job => job._id !== id)
          setJobs(newJobs)
        }
      })
  }

  useEffect(() => {
    fetch("https://pwr-hero-task-server.herokuapp.com/pendingJobs")
      .then((res) => res.json())
      .then((data) => setJobs(data));
  }, []);

  return (
    <Box pt={1} pb={5} style={{ background: "#f8f8f8" }}>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Box style={{ height: '100%' }} component={Paper} p={5} align="center">
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
            </Box>
          </Grid>
          {jobs.map((job) => (
            <Grid key={job._id} item xs={12} sm={6} md={4}>
              <Box style={{ height: '100%' }} p={3} style={{ background: "#fff" }}>
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
                    onChange={(e) => handleChange(e, job._id)}
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
    </Box>
  )
}

export default AdminDashboard
