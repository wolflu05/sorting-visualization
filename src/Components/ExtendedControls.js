import React from 'react';

import {
  Button,
  Slider,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import ReplayIcon from '@material-ui/icons/Replay';

import * as algorithms from '../Algorithms';
import BootstrapInput from './Inputs/BootstrapInput';

const useStyles = makeStyles((theme) => ({
  buttonWrapper: {
    marginBottom: theme.spacing(),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  button: {
    marginLeft: theme.spacing(),
  },
}));

const Controls = ({
  algorithm,
  setAlgorithm,
  setStep,
  size,
  setSize,
  minMax,
  setMinMax,
  speed,
  setSpeed,
  isSorting,
  generateArray,
  restartSorting,
}) => {
  const classes = useStyles();

  return (
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
  );
};

export default Controls;
