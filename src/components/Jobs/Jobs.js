import React, { useEffect, useState } from "react";
import { Box, Container, Grid, Typography, Button, TextField, MenuItem, makeStyles } from "@material-ui/core";
import Job from '../Job/Job'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles(theme => ({
  filter: {
    '& .MuiSelect-root': {
      padding: '10px'
    }
  }
}))
const Jobs = () => {
  const classes = useStyles()
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
        <Container maxWidth='xs' component={Box} my={2} >
          <TextField className={classes.filter}
            select
            fullWidth
            value={filterJobs}
            onChange={handleChange}
          >
            <MenuItem disabled value={filterJobs}>Filter jobs</MenuItem>
            <MenuItem value="react">React</MenuItem>
            <MenuItem value="vue">Vue</MenuItem>
            <MenuItem value="angular">Angular</MenuItem>
          </TextField>
        </Container>
        <Grid container spacing={4}>
          {currentJobs.map((job) => (
            <Job key={job._id} {...job} />
          ))}
        </Grid>
        <Box mt={4} align='center'>
          <Button variant='outlined' startIcon={<ArrowBackIcon />} onClick={handlePrevBtn}>prev</Button>
          <Button variant='outlined' endIcon={<ArrowForwardIcon />} onClick={handleNextBtn}>Next</Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Jobs;
