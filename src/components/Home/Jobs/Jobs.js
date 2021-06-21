import React, { useEffect, useState } from "react";
import { Box, Container, Grid, Typography } from "@material-ui/core";
import Job from "../Job/Job";
const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/approvedJobs")
      .then((res) => res.json())
      .then((data) => setJobs(data));
  }, []);
  return (
    <Box pt={1} pb={5} style={{ background: "#f8f8f8" }}>
      <Container>
        <Typography gutterBottom align="center" variant="h4">
          Find Your Dream Jobs
        </Typography>
        <Grid container spacing={4}>
          {jobs.map((job) => (
            <Job key={job._id} {...job} />
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Jobs;
