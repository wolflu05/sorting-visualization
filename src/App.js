import React, { useState } from 'react';

import SortingVisualizer from './Pages/SortingVisualizer';

import ThemeProvider from './Components/Layout/ThemeProvider';
import Layout from './Components/Layout/Layout';

const App = () => {
  const [theme] = useState('dark');

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <SortingVisualizer />
      </Layout>
    </ThemeProvider>
  );
};

export default App;
