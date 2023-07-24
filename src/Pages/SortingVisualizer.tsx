import React, { useEffect, useState } from "react";

import BarChart from "../Components/BarChart";
import Controls from "../Components/Controls";
import Description from "../Components/Description";

import { generateRandomArray } from "../util/utils";
import { algorithms } from "../Algorithms";
import Legend from "../Components/Legend";
import { defaultSettings } from "../util/constants";
import Headline from "../Components/Headline";
import { TraceEntry } from "../util/Trace";

// const algorithms1: Record<string, algorithms.AlgorithmDefinition> = algorithms

const App = () => {
  const [step, setStep] = useState(0);
  const [numbers, setNumbers] = useState(
    generateRandomArray(defaultSettings.size, ...defaultSettings.range)
  );
  const [algorithm, setAlgorithm] = useState(defaultSettings.algorithm);
  const [trace, setTrace] = useState<TraceEntry[]>([]);

  // recalculate trace if algorithm or array changes
  useEffect(() => {
    if (numbers) {
      setTrace(algorithms[algorithm].default([...numbers]));
    }
  }, [numbers, algorithm, setTrace]);

  return (
    <div>
      <Headline />

      <BarChart trace={trace?.[step]} numbers={numbers} />

      <Legend algorithm={algorithms[algorithm]} />

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
