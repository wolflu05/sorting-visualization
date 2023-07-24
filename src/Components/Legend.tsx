import { Typography } from "@material-ui/core";

import { makeStyles, useTheme } from "@material-ui/core/styles";

import Card from "./Layout/Card";
import { AlgorithmDefinition } from "../Algorithms";

interface LegendProps {
  algorithm: AlgorithmDefinition;
}

const useStyles = makeStyles((theme) => ({
  colorPreviewWrapper: {
    display: "flex",
    flexWrap: "wrap",
  },
  colorPreview: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(),
  },
  colorPreviewBox: {
    width: "20px",
    height: "20px",
    marginRight: theme.spacing(),
    borderRadius: "5px",
    transition: "all 125ms ease-in-out",
    "&:hover": {
      transform: "scale(1.13)",
    },
  },
}));

const Legend = ({ algorithm }: LegendProps) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Card bottomPadding={0.5} topPadding={0.5}>
      <div className={classes.colorPreviewWrapper}>
        {Object.entries({ sorted: "Sorted", ...algorithm?.colors }).map(
          ([color, description], i) => (
            <div key={i} className={classes.colorPreview}>
              <div
                className={classes.colorPreviewBox}
                style={{
                  backgroundColor:
                    theme.palette.bars[
                      color as "sorted" | "a" | "b" | "c" | "d"
                    ],
                }}
              ></div>
              <Typography>{description}</Typography>
            </div>
          )
        )}
      </div>
    </Card>
  );
};

export default Legend;
