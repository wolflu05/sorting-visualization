import React, { useCallback, useEffect, useRef, useState } from 'react';

import {
  IconButton,
  LinearProgress,
  Button,
  Slider,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Collapse,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import SkipNextIcon from '@material-ui/icons/SkipNext';
import FastForwardIcon from '@material-ui/icons/FastForward';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import FastRewindIcon from '@material-ui/icons/FastRewind';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ReplayIcon from '@material-ui/icons/Replay';

import Card from './Layout/Card';

import { generateRandomArray, normalize, scaleValue } from '../util/utils';
import { defaultSettings } from '../util/constants';
import * as algorithms from '../Algorithms';
import BootstrapInput from './Inputs/BootstrapInput';

const useStyles = makeStyles((theme) => ({
  controlsWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlButton: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  containedButton: {
    border: `2px solid ${theme.palette.secondary.main}`,
  },
  indicator: {
    display: 'flex',
    justifyContent: 'flex-end;',
    marginTop: theme.spacing(),
  },
  buttonWrapper: {
    marginBottom: theme.spacing(),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  collapseButton: {
    marginTop: -theme.spacing(10),
  },
  collapseIcon: {
    transition: 'all 125ms ease-in-out',
    transform: ({ isOpen }) => `rotate(${isOpen ? '0' : '-90'}deg)`,
  },
  button: {
    marginLeft: theme.spacing(),
  },
}));

const Controls = ({
  step,
  setStep,
  algorithm,
  setAlgorithm,
  setNumbers,
  trace,
}) => {
  const intervalId = useRef(null);
  const [isSorting, setIsSorting] = useState(false);
  const [speed, setSpeed] = useState(defaultSettings.speed);
  const [size, setSize] = useState(defaultSettings.size);
  const [minMax, setMinMax] = useState(defaultSettings.range);
  const [isOpen, setIsOpen] = useState(false);

  const classes = useStyles({ isOpen });

  // skip forward or backward
  const skip = useCallback(
    (number) => {
      if (!trace) {
        return;
      }

      let _step = step + number;

      if (_step < 0) {
        _step = 0;
      }

      if (_step > trace.length - 1) {
        _step = trace.length - 1;
      }

      setStep(_step);
    },
    [step, setStep, trace]
  );

  // generate new randomized array
  const generateArray = useCallback(() => {
    const array = generateRandomArray(size, ...minMax);
    setNumbers(array);
    setStep(0);
  }, [minMax, setNumbers, setStep, size]);

  // timer function for auto increment step
  const autoIncrement = useCallback(
    (_speed) => {
      const increase = () =>
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

      increase();

      // double fire increase to speed up the process
      if (_speed < 40) {
        increase();
      }
    },
    [setStep, trace?.length]
  );

  // start interval
  const startInterval = useCallback(() => {
    clearInterval(intervalId.current);

    const _speed = scaleValue(speed, [0.25, 4], [300, 0]);

    intervalId.current = setInterval(() => autoIncrement(_speed), _speed);
  }, [autoIncrement, speed]);

  // toggle auto sorting
  const toggleSorting = useCallback(() => {
    setIsSorting(!isSorting);

    if (!isSorting) {
      if (step === trace.length - 1) {
        setStep(0);
      }

      startInterval();
    } else {
      clearInterval(intervalId.current);
    }
  }, [isSorting, step, trace?.length, startInterval, setStep]);

  // restart sorting with new speed
  const restartSorting = useCallback(() => {
    if (isSorting) {
      startInterval();
    }
  }, [isSorting, startInterval]);

  // cleanup interval on unmount
  useEffect(() => () => clearInterval(intervalId.current), []);

  // add keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.keyCode) {
        // left arrow
        case 37: {
          skip(-1);
          break;
        }
        // right arrow
        case 39: {
          skip(+1);
          break;
        }
        // space bar
        case 32: {
          if (trace) {
            toggleSorting();
          }
          break;
        }
        default: {
          break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // remove event handler on unmount
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [skip, toggleSorting, trace]);

  return (
    <Card bottomPadding={isOpen}>
      <div>
        <LinearProgress
          variant="determinate"
          value={normalize(step, 0, trace?.length - 1 || 0)}
          color="secondary"
        />
        <span className={classes.indicator}>
          {step}/{trace?.length - 1 || '-'}
        </span>
        <div className={classes.controlsWrapper}>
          <IconButton onClick={() => skip(-25)} disabled={!trace || step === 0}>
            <FastRewindIcon />
          </IconButton>
          <IconButton
            onClick={() => skip(-1)}
            disabled={!trace || isSorting || step === 0}
          >
            <SkipPreviousIcon />
          </IconButton>
          <IconButton
            onClick={toggleSorting}
            disabled={!trace}
            classes={{ root: classes.containedButton }}
            className={classes.controlButton}
          >
            {isSorting ? (
              <PauseIcon fontSize="large" />
            ) : (
              <PlayArrowIcon fontSize="large" />
            )}
          </IconButton>
          <IconButton
            onClick={() => skip(+1)}
            disabled={!trace || isSorting || step === trace.length - 1}
          >
            <SkipNextIcon />
          </IconButton>
          <IconButton
            onClick={() => skip(+25)}
            disabled={!trace || step === trace.length - 1}
          >
            <FastForwardIcon />
          </IconButton>
        </div>
      </div>

      <IconButton
        onClick={() => setIsOpen(!isOpen)}
        className={classes.collapseButton}
      >
        <ExpandMoreIcon className={classes.collapseIcon} />
      </IconButton>

      <Collapse in={isOpen}>
        <div>
          <div className={classes.buttonWrapper}>
            <FormControl>
              <InputLabel color="secondary">Algorithm</InputLabel>
              <Select
                value={algorithm}
                onChange={(event) => {
                  setAlgorithm(event.target.value);
                  setStep(0);
                }}
                inputProps={{
                  id: 'algorithm-selector',
                }}
                disabled={isSorting}
                input={<BootstrapInput />}
              >
                {Object.entries(algorithms).map(([value, { name }], key) => (
                  <MenuItem value={value} key={key}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="outlined"
              color="secondary"
              onClick={generateArray}
              disabled={isSorting}
              className={classes.button}
              startIcon={<ReplayIcon />}
            >
              Generate random array
            </Button>
          </div>

          <Typography gutterBottom>Size</Typography>
          <Slider
            value={size}
            onChange={(_e, value) => {
              setSize(value);
              generateArray();
            }}
            valueLabelDisplay="auto"
            min={2}
            max={100}
            disabled={isSorting}
            color="secondary"
          />

          <Typography gutterBottom>Range</Typography>
          <Slider
            value={minMax}
            onChange={(_e, value) => {
              setMinMax(value);
              generateArray();
            }}
            valueLabelDisplay="auto"
            min={0}
            max={1000}
            disabled={isSorting}
            color="secondary"
          />

          <Typography gutterBottom>Speed</Typography>
          <Slider
            value={speed}
            onChange={(_e, value) => {
              setSpeed(value);
              restartSorting();
            }}
            valueLabelDisplay="auto"
            min={0.25}
            step={0.25}
            max={4}
            marks
            color="secondary"
          />
        </div>
      </Collapse>
    </Card>
  );
};

export default Controls;
