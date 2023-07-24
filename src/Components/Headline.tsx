import { Typography } from "@material-ui/core";

import Card from "./Layout/Card";

const Headline = () => {
  return (
    <Card bottomPadding={2} topPadding={2}>
      <Typography variant="h4">Sorting Visualizer</Typography>
    </Card>
  );
};

export default Headline;
