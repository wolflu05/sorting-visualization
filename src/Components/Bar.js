import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  bar: {
    height: ({ value, max }) => `${(value / max) * 100}%`,
    backgroundColor: ({ state }) => {
      if (!state) {
        return theme.palette.bars.default;
      }

      if (state.a) {
        return theme.palette.bars.a;
      } else if (state.b) {
        return theme.palette.bars.b;
      } else if (state.c) {
        return theme.palette.bars.c;
      } else if (state.d) {
        return theme.palette.bars.d;
      } else if (state.sorted) {
        return theme.palette.bars.sorted;
      } else {
        return theme.palette.bars.default;
      }
    },

    flex: 'auto',
    overflow: 'hidden',
    lineHeight: '16px',
    marginRight: ({ state }) => (state?.marginLeft ? '15px' : '0'),
    marginLeft: ({ state }) => (state?.marginRight ? '15px' : '0'),

    transition: 'transform 125ms ease-in-out',
    transformOrigin: 'bottom center',
    '&:hover': {
      transform: 'scale(1.1)',
    },

    border: '1px solid #000',
    borderTopLeftRadius: '5px',
    borderTopRightRadius: '5px',

    [theme.breakpoints.down('xs')]: {
      borderTopLeftRadius: '2px',
      borderTopRightRadius: '2px',

      '&:hover': {
        transform: 'scale(1.03)',
      },
    },
  },
  text: {
    userSelect: 'none',
    display: 'inline-block',
    whiteSpace: 'nowrap',
    textAlign: 'center',
    width: '100%',
    marginTop: theme.spacing(),
  },
}));

const Bar = ({ value, state, max, showNumber }) => {
  const classes = useStyles({ value, state, max });

  return (
    <div className={classes.bar}>
      {showNumber && <div className={classes.text}>{value}</div>}
    </div>
  );
};

export default Bar;
