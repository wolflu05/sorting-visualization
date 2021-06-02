import React from 'react';

import { Typography } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import Card from './Layout/Card';

const useStyles = makeStyles((theme) => ({
  headline: {
    paddingBottom: theme.spacing(0.5),
  },
}));

const Headline = () => {
  const classes = useStyles();

  return (
    <Card bottomPadding={0}>
      <Typography variant="h4" className={classes.headline} gutterBottom>
        Sorting Visualizer
      </Typography>
    </Card>
  );
};

export default Headline;
