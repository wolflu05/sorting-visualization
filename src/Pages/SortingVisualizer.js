import React, { useState } from 'react';

import BarChart from '../Components/BarChart';

import { makeStyles } from '@material-ui/core/styles';
import Controls from '../Components/Controls';

import { generateRandomArray } from '../util/utils';

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
    </div>
  );
};

export default App;
