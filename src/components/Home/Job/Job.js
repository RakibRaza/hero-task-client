import {
  Box,
  Grid,
  Button,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
const useStyles = makeStyles((theme) => ({

}));
const Job = ({ title, author, company, desc }) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Box p={3} style={{ background: "#fff" }}>
        <Typography variant="h5" align="center">
          {title}
        </Typography>
        <Typography align="center" variant="h6">
          {author}
        </Typography>
        <Typography>{desc}</Typography>
        <Box align='center' mt={2}>
          <Button size='large' color='primary' variant='contained'>Apply</Button>
        </Box>
      </Box>
    </Grid>
  );
};

export default Job;
