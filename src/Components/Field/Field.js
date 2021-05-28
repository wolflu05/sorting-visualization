import React from 'react';

import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Pipe from './Pipe';

const useStyles = makeStyles((theme) => ({
  field: {
    width: 'auto',
  },
  pipesWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    height: '100vh',
  },
}));

function Field({ pipes }) {
  const classes = useStyles();

  return (
    <Box className={classes.field}>
      <Box className={classes.pipesWrapper}>
        {pipes.map((pipe, i) => (
          <Pipe pipe={pipe} key={i} />
        ))}
      </Box>
    </Box>
  );
}

export default Field;
