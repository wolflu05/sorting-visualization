import { CssBaseline } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  /**
   * See:
   * https://css-tricks.com/almanac/properties/s/scrollbar/
   * https://stackoverflow.com/questions/53772429/material-ui-how-can-i-style-the-scrollbar-with-css-in-js
   */
  "@global": {
    "*::-webkit-scrollbar": {
      width: "0.4em",
    },
    "*::-webkit-scrollbar-thumb": {
      borderRadius: "5px",
      backgroundColor: theme.palette.grey[600],
    },
  },
  wrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  innerWrapper: {
    width: "90%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
}));

const Layout = ({ children }: { children: JSX.Element }) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <CssBaseline />
      <div className={classes.innerWrapper}>{children}</div>
    </div>
  );
};

export default Layout;
