import React from 'react';

import { Paper } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    paddingTop: ({ topPadding = true }) =>
      topPadding ? theme.spacing(topPadding) : 0,
    paddingBottom: ({ bottomPadding = true }) =>
      bottomPadding ? theme.spacing(bottomPadding) : 0,
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    margin: theme.spacing(),
  },
}));

const Description = ({ children, bottomPadding = 3, topPadding = 3 }) => {
  const classes = useStyles({ bottomPadding, topPadding });

  return (
    <Paper className={classes.card} variant="outlined">
      {children}
    </Paper>
  );
};

export default Description;
