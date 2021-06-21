import React, { useEffect, useState } from "react";
import { Box, Container, Grid, Typography, Button } from "@material-ui/core";
import Job from "../Job/Job";
const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(20);

  const handlePrevBtn = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }
  const handleNextBtn = () => {
    const totalPages = [];
    for (let i = 1; i <= Math.ceil(jobs.length / jobsPerPage); i++) {
      totalPages.push(i);
    }
    if (totalPages.length > currentPage) {
      setCurrentPage(currentPage + 1)
    }
  }
  useEffect(() => {
    fetch("http://localhost:8000/approvedJobs")
      .then((res) => res.json())
      .then((data) => setJobs(data));
  }, []);

  // Get current Jobs
  const indexOfLastJobs = currentPage * jobsPerPage;
  const indexOfFirstJobs = indexOfLastJobs - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJobs, indexOfLastJobs);
  return (
    <Box pt={1} pb={5} style={{ background: "#f8f8f8" }}>
      <Container>
        <Typography gutterBottom align="center" variant="h4">
          Find Your Dream Jobs
        </Typography>
        <Grid container spacing={4}>
          {currentJobs.map((job) => (
            <Job key={job._id} {...job} />
          ))}
        </Grid>
        <Box mt={4} align='center'>
          <Button onClick={handlePrevBtn}>prev</Button>
          <Button onClick={handleNextBtn}>Next</Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Jobs;
