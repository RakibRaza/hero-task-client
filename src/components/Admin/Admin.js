import React, { useEffect, useState } from 'react'
import { Box, Container, Grid, Typography, TextField, MenuItem } from "@material-ui/core";

const Admin = () => {
  const [jobs, setJobs] = useState([])

  const handleChange = (e, id) => {
    fetch(`http://localhost:8000/updateJob/${id}`, {
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
    fetch("http://localhost:8000/pendingJobs")
      .then((res) => res.json())
      .then((data) => setJobs(data));
  }, []);
  return (

    <Box pt={1} pb={5} style={{ background: "#f8f8f8" }}>
      <Container>
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

export default Admin
