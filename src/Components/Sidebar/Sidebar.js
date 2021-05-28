import React from 'react';

import { Box, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { generateRandomPipes } from '../../algorithms/generator';
import { selectionSort } from '../../algorithms/sorting';

const useStyles = makeStyles((theme) => ({
  sidebar: {
    width: '250px',
    height: '100%',
    paddingTop: theme.spacing(1.5),
  },
}));

function Sidebar({ pipes, setPipes }) {
  const classes = useStyles();

  return (
    <Box className={classes.sidebar}>
      <Typography variant="body1" align="center">
        Sorting visualization
      </Typography>

      <Button
        variant="outlined"
        onClick={() => {
          setPipes(generateRandomPipes({ count: 50, max: 100, min: 0 }));
        }}
      >
        Regenerate
      </Button>

      <Button
        variant="outlined"
        onClick={() => {
          selectionSort.default({ pipes, setPipes });
        }}
      >
        Sort
      </Button>
    </Box>
  );
}

export default Sidebar;
