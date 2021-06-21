import React, { useEffect, useState } from "react";
import { Box, Container, Grid, Typography, Button, TextField, MenuItem } from "@material-ui/core";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Job from '../Job/Job'


const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filterJobs, setFilterJobs] = useState('Filter Jobs')
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(20);

  const handleChange = (e) => {
    const value = e.target.value
    setFilterJobs(value)
    setCurrentPage(1)
    setJobs(jobs.sort((job) => job.tag === value ? -1 : 1))
  }

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
    fetch("https://pwr-hero-task-server.herokuapp.com/approvedJobs")
      .then((res) => res.json())
      .then((data) => setJobs(data));
  }, []);

  // Get current Jobs
  const indexOfLastJobs = currentPage * jobsPerPage;
  const indexOfFirstJobs = indexOfLastJobs - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJobs, indexOfLastJobs);

  const tags = ['react', 'vue', 'angular', 'php', 'nodejs', 'expressjs', 'python', 'java', 'laravel', 'javascript']
  return (
    <Box pt={1} pb={5} style={{ background: "#f8f8f8" }}>
      <Container>
        <Typography gutterBottom align="center" variant="h4">
          Find Your Dream Jobs
        </Typography>
        {/* Filter Jobs */}
        <Container maxWidth='xs' component={Box} my={2} >
          <TextField
            select
            fullWidth
            value={filterJobs}
            onChange={handleChange}
          >
            <MenuItem disabled value={filterJobs}>Filter jobs</MenuItem>
            {tags.map(item => <MenuItem value={item} key={item}>{item}</MenuItem>)}
          </TextField>
        </Container>
        {/* All Job */}
        <Grid container spacing={4}>
          {currentJobs.map((job) => (
            <Job key={job._id} {...job} />
          ))}
        </Grid>
        {/* Prev Next Btn */}
        <Box mt={4} align='center'>
          <Button variant='outlined' startIcon={<ArrowBackIcon />} onClick={handlePrevBtn}>prev</Button>
          <Button variant='outlined' endIcon={<ArrowForwardIcon />} onClick={handleNextBtn}>Next</Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Jobs;
