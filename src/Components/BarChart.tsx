import { useMemo, useRef } from "react";

import { makeStyles } from "@material-ui/core/styles";

import Bar, { BarState } from "./Bar";
import Card from "./Layout/Card";

import useResize from "../hooks/useResize";
import { SortItem, TraceEntry } from "../util/Trace";

interface BarChartProps {
  trace: TraceEntry;
  numbers: SortItem[];
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

  const max = useMemo(
    () => Math.max(...numbers.map((x) => x.value)),
    [numbers]
  );

  return (
    <Card>
      <div className={classes.barWrapper} ref={barChartRef}>
        {(trace?.numbers || numbers).map((number, i) => {
          let state: BarState | null = null;

          if (trace) {
            state = {
              a: trace.state.a.includes(number.id),
              b: trace.state.b.includes(number.id),
              c: trace.state.c.includes(number.id),
              d: trace.state.d.includes(number.id),
              marginLeft: trace.state.groups.some(
                (group) => group[0] === i + 1
              ),
              marginRight: trace.state.groups.some(
                (group) => group[1] === i - 1
              ),
              sorted: trace?.state.sorted.includes(number.id),
            };
          }

          if (!state) {
            return <span key={`${i}_${number}`}>Error</span>;
          }

          return (
            <Bar
              value={number.value}
              key={number.id}
              max={max}
              state={state}
              showNumber={showNumbers}
            />
          );
        })}
      </div>
    </Card>
  );
};

export default BarChart;
