import React from "react";
import {
  Box, Grid, Button, Typography, TextField, Dialog, DialogContent, DialogContentText
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import { useAuthContext } from "../../context/AuthContext";

const Job = ({ title, author, company, desc, tag }) => {
  const { user } = useAuthContext()
  const { register, handleSubmit, errors } = useForm();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    if (user.role === 'jobSeeker') {
      setOpen(true);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (data) => {
    data.email = user.email
    data.title = title
    data.tag = tag
    data.company = company
    data.author = author
    data.desc = desc
    const res = await fetch('https://pwr-hero-task-server.herokuapp.com/addApplication', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    const job = res.json();
    if (job) handleClose();
  };
  return (
    <>
      <Grid item xs={12} sm={6} md={3}>
        <Box p={3} style={{ background: "#fff", height: '100%' }}>
          <Typography variant="h4" align="center">{title}</Typography>
          <Typography align="center">Tag:- {tag}</Typography>
          <Typography align="center">Author:- {author}</Typography>
          <Typography gutterBottom align="center">Company:- {company}</Typography>
          <Typography color='textSecondary' align="center">{`${desc.slice(0, 100)}...`}</Typography>
          <Box align='center' mt={2}>
            <Button onClick={handleClickOpen} size='large' color='primary' variant='contained'>Apply</Button>
          </Box>
        </Box>
      </Grid>
      {/* Job Apply Modal */}
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <DialogContentText>
              Apply this job, please enter your name and skills here. We will send updates
              occasionally.
            </DialogContentText>
            <TextField autoFocus margin="normal" name='name' label='Name' type="text" fullWidth inputRef={register({
              required: "Name is required.",
            })} helperText={errors.name?.message} error={Boolean(errors.name)}
            />
            <TextField autoFocus name='skills' label='Enter your skills' margin="normal" type="text" fullWidth inputRef={register({ required: "Skills is required." })} helperText={errors.skills?.message} error={Boolean(errors.skills)}
            />
          </DialogContent>
          <Box my={2} align='center'>
            <Button type='submit' variant='contained' color="primary">
              Confirm
            </Button>
          </Box>
        </form>
      </Dialog>
    </>
  );
};

export default Job;
