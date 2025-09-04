import React, { useState } from "react";
import FullScreenLoader from "./Loader";
import Layout from "./components/Layout";
import './index.css';

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <>
      {loading ? (
        <FullScreenLoader 
          onLoadingComplete={() => setLoading(false)}
          loadingTime={3000}
          // backgroundColor="#ffffff"
        />
      ) : (
        <Layout />
      )}
    </>
  );
};

export default App;