import { Paper, Theme } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

interface CardProps {
  children: JSX.Element | JSX.Element[];
  bottomPadding?: number;
  topPadding?: number;
}

interface StyleProps {
  bottomPadding: number;
  topPadding: number;
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  card: {
    height: "100%",
    paddingTop: ({ topPadding = 1 }) =>
      topPadding ? theme.spacing(topPadding) : 0,
    paddingBottom: ({ bottomPadding = 1 }) =>
      bottomPadding ? theme.spacing(bottomPadding) : 0,
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    margin: theme.spacing(),
  },
}));

const Card = ({ children, bottomPadding = 3, topPadding = 3 }: CardProps) => {
  const classes = useStyles({ bottomPadding, topPadding });

  return (
    <Paper className={classes.card} variant="outlined">
      {children}
    </Paper>
  );
};

export default Card;
