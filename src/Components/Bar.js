import React from 'react';
import { stateColors } from '../util/constants';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  bar: {
    height: ({ value, max }) => `${(value / max) * 100}%`,
    backgroundColor: ({ state }) => {
      if (!state) {
        return stateColors.default;
      }

      if (state.a) {
        return stateColors.a;
      } else if (state.b) {
        return stateColors.b;
      } else if (state.c) {
        return stateColors.c;
      } else if (state.d) {
        return stateColors.d;
      } else if (state.sorted) {
        return stateColors.sorted;
      } else {
        return stateColors.default;
      }
    },
    border: '1px solid #000',
    flex: 'auto',
    overflow: 'hidden',
    lineHeight: '16px',
    marginRight: ({ state }) => (state?.marginLeft ? '15px' : '0'),
    marginLeft: ({ state }) => (state?.marginRight ? '15px' : '0'),
  },
  text: {
    display: 'inline-block',
    whiteSpace: 'nowrap',
  },
}));

const Bar = ({ value, state, max }) => {
  const classes = useStyles({ value, state, max });

  return (
    <div className={classes.bar}>
      <div className={classes.text}>{value}</div>
    </div>
  );
};

export default Bar;
