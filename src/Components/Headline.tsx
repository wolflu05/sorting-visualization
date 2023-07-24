import { Typography } from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import { version } from "../../package.json";

import Card from "./Layout/Card";

const Headline = () => {
  return (
    <Card bottomPadding={2} topPadding={2}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">Sorting Visualizer</Typography>
        <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
          <Typography variant="subtitle1" style={{ marginTop: "5px" }}>
            v{version}
          </Typography>
          <a
            href="https://github.com/wolflu05/sorting-visualization"
            style={{ color: "black" }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubIcon fontSize="large" />
          </a>
        </div>
      </div>
    </Card>
  );
};

export default Headline;
