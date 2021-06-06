import React from 'react';

import { Typography } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import Card from './Layout/Card';

const useStyles = makeStyles((theme) => ({
  headline: {
    borderBottom: `1px solid ${theme.palette.text.secondary}`,
    paddingBottom: theme.spacing(0.5),
  },
}));

const Description = ({ algorithm }) => {
  const classes = useStyles();

  return (
    <Card>
      <Typography variant="h5" className={classes.headline} gutterBottom>
        {algorithm.name}
      </Typography>
      {/* <Typography>{algorithm.description}</Typography> */}
    </Card>
  );
};

export default Description;
