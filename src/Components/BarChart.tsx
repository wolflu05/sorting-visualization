import { useMemo, useRef } from "react";

import { makeStyles } from "@material-ui/core/styles";

import Bar, { BarState } from "./Bar";
import Card from "./Layout/Card";

import useResize from "../hooks/useResize";
import { TraceEntry } from "../util/Trace";

interface BarChartProps {
  trace: TraceEntry;
  numbers: number[];
}

const useStyles = makeStyles((theme) => ({
  barChart: {
    height: "100%",
    padding: theme.spacing(3),
    margin: theme.spacing(),
  },
  barWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    width: "100%",
    height: "400px",
  },
}));

const BarChart = ({ trace, numbers }: BarChartProps) => {
  const classes = useStyles();
  const barChartRef = useRef(null);

  const { width } = useResize(barChartRef);
  const showNumbers = useMemo(
    () => width / (trace?.numbers || numbers).length > 20,
    [numbers, trace?.numbers, width]
  );

  const max = useMemo(() => Math.max(...numbers), [numbers]);

  return (
    <Card>
      <div className={classes.barWrapper} ref={barChartRef}>
        {(trace?.numbers || numbers).map((number, i) => {
          let state: BarState | null = null;

          if (trace) {
            state = {
              a: trace.state.a.includes(i),
              b: trace.state.b.includes(i),
              c: trace.state.c.includes(i),
              d: trace.state.d.includes(i),
              marginLeft: trace.state.groups.some(
                (group) => group[0] === i + 1
              ),
              marginRight: trace.state.groups.some(
                (group) => group[1] === i - 1
              ),
              sorted: trace?.state.sorted.includes(i),
            };
          }

          if (!state) {
            return <span key={`${i}_${number}`}>Error</span>;
          }

          return (
            <Bar
              value={number}
              max={max}
              state={state}
              key={`${i}_${number}`}
              showNumber={showNumbers}
            />
          );
        })}
      </div>
    </Card>
  );
};

export default BarChart;
