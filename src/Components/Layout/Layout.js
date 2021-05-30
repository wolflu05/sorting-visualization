import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  innerWrapper: {
    width: '90%',
  },
}));

const Layout = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <div className={classes.innerWrapper}>{children}</div>
    </div>
  );
};

export default Layout;
