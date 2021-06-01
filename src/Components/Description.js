import React from 'react';

import { Paper, Typography } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import { stateColors } from '../util/constants';

const useStyles = makeStyles((theme) => ({
  description: {
    height: '100%',
    padding: theme.spacing(3),
    margin: theme.spacing(),
  },
  colorPreviewWrapper: {
    display: 'flex',
    marginBottom: theme.spacing(),
  },
  colorPreview: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(),
  },
  colorPreviewBox: {
    width: '20px',
    height: '20px',
    marginRight: theme.spacing(),
  },
}));

const Description = ({ algorithm }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.description}>
      <div className={classes.colorPreviewWrapper}>
        {Object.entries(algorithm.colors).map(([color, description], i) => (
          <div key={i} className={classes.colorPreview}>
            <div
              className={classes.colorPreviewBox}
              style={{ backgroundColor: stateColors[color] }}
            ></div>
            {description}
          </div>
        ))}
      </div>
      <Typography>{algorithm.description}</Typography>
    </Paper>
  );
};

export default Description;
