import React, { useState } from 'react';

import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Sidebar from './Components/Sidebar/Sidebar';
import Field from './Components/Field/Field';
import { generateRandomPipes } from './algorithms/generator';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: '100%',
    height: '100vh',
    display: 'flex',
  },
}));

function App() {
  const classes = useStyles();

  const [pipes, setPipes] = useState(
    generateRandomPipes({ count: 50, max: 100, min: 0 })
  );
  console.log(pipes);
  return (
    <Box className={classes.wrapper}>
      <Sidebar pipes={pipes} setPipes={setPipes} />
      <Field pipes={pipes} />
    </Box>
  );
}

export default App;
