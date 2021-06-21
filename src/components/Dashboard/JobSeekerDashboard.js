import React, { useEffect, useState } from 'react'
import { Box, Container, Avatar, Paper, Grid, Typography, Button, makeStyles } from "@material-ui/core";
import { useAuthContext } from '../../context/AuthContext';

const useStyles = makeStyles(theme => ({
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    marginBottom: theme.spacing(4),
  },
}))

const JobSeekerDashboard = () => {
  const classes = useStyles()
  const [applications, setApplications] = useState([])
  const { user, currentUserInfo } = useAuthContext()

  useEffect(() => {
    fetch(`https://pwr-hero-task-server.herokuapp.com/applications?email=${currentUserInfo.email}`)
      .then((res) => res.json())
      .then((data) => setApplications(data));
  }, []);

  return (
    <Box pt={1} pb={5} style={{ background: "#f8f8f8" }}>
      <Container>
        <Grid container spacing={4}>
          {/* Profile Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Box component={Paper} p={5} align="center">
              <Avatar
                alt={user?.name}
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
          {/* Jobs Card */}
          {applications.map((job) => (
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
                  <Button size='large' color='primary' variant='contained'>Already applied</Button>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default JobSeekerDashboard
