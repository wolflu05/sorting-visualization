import React, { useEffect, useRef, useState } from 'react';

import { Paper, IconButton, LinearProgress, Button } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import { generateRandomArray, normalize } from '../util/utils';

const useStyles = makeStyles((theme) => ({
  controls: {
    height: '100%',
    padding: theme.spacing(3),
    margin: theme.spacing(),
  },
  controlsWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
  },
}));

const Controls = ({
  step,
  setStep,
  algorithm,
  setAlgorithm,
  numbers,
  setNumbers,
  trace,
}) => {
  const classes = useStyles();

  const intervalId = useRef(null);
  const [isSorting, setIsSorting] = useState(false);

  const skip = (number) => {
    const _step = step + number;

    if (0 <= _step && _step < trace.length) {
      setStep(_step);
    }
  };

  const generateArray = () => {
    const array = generateRandomArray(100, 5, 100);
    setNumbers(array);
    setStep(0);
  };

  const toggleSorting = () => {
    setIsSorting(!isSorting);

    if (!isSorting) {
      if (step === trace.length - 1) {
        setStep(0);
      }

      intervalId.current = setInterval(() => autoIncrement(), 5);
    } else {
      clearInterval(intervalId.current);
    }
  };

  const autoIncrement = () => {
    setStep((s) => {
      const _step = s + 1;

      if (0 <= _step && _step < trace.length) {
        return _step;
      } else {
        setIsSorting(false);
        clearInterval(intervalId.current);

        return s;
      }
    });
  };

  // cleanup interval on unmount
  useEffect(() => () => clearInterval(intervalId.current), []);

  return (
    <Paper className={classes.controls}>
      <LinearProgress
        variant="determinate"
        value={normalize(step, 0, trace.length - 1)}
      />
      {step}/{trace.length - 1}
      <div className={classes.controlsWrapper}>
        <IconButton onClick={() => skip(-1)}>
          <SkipPreviousIcon />
        </IconButton>
        <IconButton onClick={toggleSorting}>
          {isSorting ? <PauseIcon /> : <PlayArrowIcon />}
        </IconButton>
        <IconButton onClick={() => skip(+1)}>
          <SkipNextIcon />
        </IconButton>

        <Button variant="outlined" onClick={generateArray} disabled>
          Generate Array
        </Button>
      </div>
    </Paper>
  );
};

export default Controls;
