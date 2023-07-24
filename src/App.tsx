import { useState } from "react";

import SortingVisualizer from "./Pages/SortingVisualizer";

import ThemeProvider from "./Components/Layout/ThemeProvider";
import Layout from "./Components/Layout/Layout";

import { defaultSettings } from "./util/constants";

const App = () => {
  const [theme] = useState(defaultSettings.theme);

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <SortingVisualizer />
      </Layout>
    </ThemeProvider>
  );
};

export default App;
