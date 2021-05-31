import React from 'react';

import { Paper, Typography } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  description: {
    height: '100%',
    padding: theme.spacing(3),
    margin: theme.spacing(),
  },
}));

const Description = ({ algorithm }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.description}>
      <Typography>{algorithm.description}</Typography>
    </Paper>
  );
};

export default Description;
