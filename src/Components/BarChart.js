import React, { useMemo } from 'react';

import { Paper } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import Bar from './Bar';

const useStyles = makeStyles((theme) => ({
  barChart: {
    height: '100%',
    padding: theme.spacing(3),
    margin: theme.spacing(),
  },
  barWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: '100%',
    height: '400px',
  },
}));

const BarChart = ({ trace, numbers }) => {
  const classes = useStyles();

  const max = useMemo(() => Math.max(...numbers), [numbers]);

  return (
    <Paper className={classes.barChart}>
      <div className={classes.barWrapper}>
        {(trace?.numbers || numbers).map((number, i) => {
          let state = null;

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

          return (
            <Bar
              value={number}
              max={max}
              state={state}
              key={`${i}_${number}`}
            />
          );
        })}
      </div>
    </Paper>
  );
};

export default BarChart;
