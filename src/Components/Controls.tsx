import React, { useCallback, useEffect, useRef, useState } from "react";

import {
  IconButton,
  LinearProgress,
  Collapse,
  Hidden,
  SwipeableDrawer,
} from "@material-ui/core";

import { Theme, makeStyles } from "@material-ui/core/styles";

import SkipNextIcon from "@material-ui/icons/SkipNext";
import FastForwardIcon from "@material-ui/icons/FastForward";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import FastRewindIcon from "@material-ui/icons/FastRewind";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SettingsIcon from "@material-ui/icons/Settings";

import ExtendedControls from "./ExtendedControls";
import Card from "./Layout/Card";

import { normalize, scaleValue } from "../util/utils";
import { defaultSettings } from "../util/constants";
import { SortItem, TraceEntry, generateRandomNumbers } from "../util/Trace";

interface ControlsProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  algorithm: string;
  setAlgorithm: React.Dispatch<React.SetStateAction<string>>;
  numbers: SortItem[];
  setNumbers: React.Dispatch<React.SetStateAction<SortItem[]>>;
  trace: TraceEntry[];
  setTrace: React.Dispatch<React.SetStateAction<TraceEntry[]>>;
  animation: boolean;
  setAnimation: React.Dispatch<React.SetStateAction<boolean>>;
}

interface StyleProps {
  isOpen: boolean;
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  controlsWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  controlButton: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  containedButton: {
    border: `2px solid ${theme.palette.secondary.main}`,
  },
  indicator: {
    display: "flex",
    justifyContent: "flex-end;",
    marginTop: theme.spacing(),
  },
  collapseButton: {
    marginTop: -theme.spacing(10),
  },
  collapseIcon: {
    transition: "all 125ms ease-in-out",
    transform: ({ isOpen }) => `rotate(${isOpen ? "0" : "-90"}deg)`,
  },
  drawerPaper: {
    borderTopLeftRadius: "15px",
    borderTopRightRadius: "15px",
    padding: theme.spacing(3),
  },
  openExtendedSettingsButton: {
    position: "fixed",
    width: "56px",
    height: "56px",
    backgroundColor: theme.palette.secondary.main,
    right: theme.spacing(2),
    bottom: theme.spacing(2),
    "&:hover": {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
  openExtendedSettingsIcon: {
    fontSize: 30,
  },
}));

const Controls = ({
  step,
  setStep,
  algorithm,
  setAlgorithm,
  setNumbers,
  trace,
  animation,
  setAnimation,
}: ControlsProps) => {
  const intervalId = useRef<undefined | number>(undefined);
  const [isSorting, setIsSorting] = useState(false);
  const [speed, setSpeed] = useState(defaultSettings.speed);
  const [size, setSize] = useState(defaultSettings.size);
  const [minMax, setMinMax] = useState(defaultSettings.range);
  const [isOpen, setIsOpen] = useState(false);

  const classes = useStyles({ isOpen });

  // skip forward or backward
  const skip = useCallback(
    (number: number) => {
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
    const array = generateRandomNumbers(size, minMax);
    setNumbers(array);
    setStep(0);
  }, [minMax, setNumbers, setStep, size]);

  // timer function for auto increment step
  const autoIncrement = useCallback(
    (_speed: number) => {
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
    const handleKeyDown = (event: KeyboardEvent) => {
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
            event.preventDefault();
          }
          break;
        }
        default: {
          break;
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // remove event handler on unmount
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [skip, toggleSorting, trace]);

  const extendedControls = (
    <ExtendedControls
      algorithm={algorithm}
      setAlgorithm={setAlgorithm}
      setStep={setStep}
      size={size}
      setSize={setSize}
      minMax={minMax}
      setMinMax={setMinMax}
      speed={speed}
      setSpeed={setSpeed}
      isSorting={isSorting}
      generateArray={generateArray}
      restartSorting={restartSorting}
      animation={animation}
      setAnimation={setAnimation}
    />
  );

  return (
    <Card bottomPadding={3}>
      <div>
        <LinearProgress
          variant="determinate"
          value={normalize(step, 0, trace?.length - 1 || 0)}
          color="secondary"
        />
        <span className={classes.indicator}>
          {step}/{trace?.length - 1 || "-"}
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

      <Hidden smDown>
        <IconButton
          onClick={() => setIsOpen(!isOpen)}
          className={classes.collapseButton}
        >
          <ExpandMoreIcon className={classes.collapseIcon} />
        </IconButton>

        <Collapse in={isOpen}>{extendedControls}</Collapse>
      </Hidden>

      <Hidden mdUp>
        <IconButton
          className={classes.openExtendedSettingsButton}
          onClick={() => setIsOpen(!isOpen)}
        >
          <SettingsIcon fontSize="large" />
        </IconButton>

        <SwipeableDrawer
          anchor="bottom"
          open={isOpen}
          onClose={() => setIsOpen(false)}
          onOpen={() => setIsOpen(true)}
          classes={{ paper: classes.drawerPaper }}
        >
          {extendedControls}
        </SwipeableDrawer>
      </Hidden>
    </Card>
  );
};

export default Controls;
