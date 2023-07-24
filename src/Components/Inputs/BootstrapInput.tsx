import { withStyles } from "@material-ui/core/styles";

import InputBase from "@material-ui/core/InputBase";

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.secondary.main}`,
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    "&:focus": {
      borderRadius: 4,
    },
  },
}))(InputBase);

export default BootstrapInput;
