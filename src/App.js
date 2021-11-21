import { Route, Routes } from "react-router-dom";
import FinishedProvider from "./context/FinishedContext";

import AllTasks from "./pages/AllTasks";
import FinishedTasks from "./pages/FinishedTasks";
import Layout from "./Layout/Layout";

function App() {
  return (
    <div>
      <FinishedProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<AllTasks />}/>
          <Route path="/finished-tasks" element={<FinishedTasks />}/>
        </Routes>
      </Layout>
      </FinishedProvider>
    </div>

  );
}

export default App;
