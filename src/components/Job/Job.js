import {
  Box,
  Grid,
  Button,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
const useStyles = makeStyles((theme) => ({

}));
const Job = ({ title, author, company, desc }) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Grid item xs={12} sm={6} md={3}>
        <Box p={3} style={{ background: "#fff", height: '100%' }}>
          <Typography variant="h5" align="center">
            {title}
          </Typography>
          <Typography align="center" variant="h6">
            {author}
          </Typography>
          <Typography align="center">{`${desc.slice(0, 100)}...`}</Typography>
          <Box align='center' mt={2}>
            <Button onClick={handleClickOpen} size='large' color='primary' variant='contained'>Apply</Button>
          </Box>
        </Box>
      </Grid>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogContent>
          <DialogContentText>
            Apply this job, please enter your name and skills here. We will send updates
            occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="normal"
            name='name'
            placeholder='name'
            type="email"
            fullWidth
          />
          <TextField
            autoFocus
            name='skills'
            placeholder='Enter your skills'
            margin="normal"
            type="email"
            fullWidth
          />
        </DialogContent>
        <Box my={2} align='center'>
          <Button variant='contained' onClick={handleClose} color="primary">
            Confirm
          </Button>
        </Box>
      </Dialog>
    </>
  );
};

export default Job;
