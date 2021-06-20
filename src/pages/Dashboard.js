import {
  Avatar,
  Box,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import React from "react";
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
  return (

    <Grid container>
      <Grid item xs={12} md={5}>
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
    </Grid>
  );
};

export default Dashboard;
