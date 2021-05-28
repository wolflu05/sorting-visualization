import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  pipe: {
    width: '20px',
    margin: '0 1px',
    height: ({ value }) => `${value}%`,
    backgroundColor: ({ color }) => color || theme.palette.primary.main,
  },
}));

function Pipe({ color, pipe }) {
  const classes = useStyles({ ...pipe });

  return (
    <Box className={classes.pipe}>
      <Typography>{pipe.value}</Typography>
    </Box>
  );
}

export default Pipe;
