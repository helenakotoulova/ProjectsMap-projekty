import { Route, Routes } from "react-router-dom";

import AllTasks from "./pages/AllTasks";
import FinishedTasks from "./pages/FinishedTasks";
import AbortedTasks from "./pages/AbortedTasks";
import Layout from "./Layout/Layout";

function App() {
  return (
    <div>
      <Layout>
        <Routes>
          <Route path="/" element={<AllTasks />}/>
          <Route path="/finished-tasks" element={<FinishedTasks />}/>
          <Route path="/aborted-tasks" element={<AbortedTasks />}/>
        </Routes>
      </Layout>
    </div>

  );
}

export default App;
