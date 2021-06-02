import React from 'react';

import { Paper } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    padding: theme.spacing(3),
    paddingBottom: ({ bottomPadding = true }) =>
      bottomPadding ? theme.spacing(3) : 0,
    margin: theme.spacing(),
  },
}));

const Description = ({ children, bottomPadding }) => {
  const classes = useStyles({ bottomPadding });

  return (
    <Paper className={classes.card} variant="outlined">
      {children}
    </Paper>
  );
};

export default Description;
