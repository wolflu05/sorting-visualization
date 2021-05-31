import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import BarChart from '../Components/BarChart';
import Controls from '../Components/Controls';
import Description from '../Components/Description';

import { generateRandomArray } from '../util/utils';
import * as algorithms from '../Algorithms';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    marginTop: theme.spacing(3),
  },
}));

const App = () => {
  const classes = useStyles();

  const [step, setStep] = useState(0);
  const [numbers, setNumbers] = useState(generateRandomArray(30, 0, 100));
  const [algorithm, setAlgorithm] = useState('mergeSort');
  const [trace, setTrace] = useState(null);

  // recalculate trace if algorithm or array changes
  useEffect(() => {
    if (numbers) {
      setTrace(algorithms[algorithm].default([...numbers]));
    }
  }, [numbers, algorithm, setTrace]);

  return (
    <div className={classes.wrapper}>
      <BarChart trace={trace?.[step]} numbers={numbers} />

      <Controls
        step={step}
        setStep={setStep}
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
        numbers={numbers}
        setNumbers={setNumbers}
        trace={trace}
        setTrace={setTrace}
      />

      <Description algorithm={algorithms[algorithm]} />
    </div>
  );
};

export default App;
