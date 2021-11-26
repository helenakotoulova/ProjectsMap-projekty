import { Route, Routes } from "react-router-dom";
import FinishedProvider from "./context/FinishedContext";

import AllTasks from "./pages/AllTasks";
import FinishedTasks from "./pages/FinishedTasks";
import AddNewTask from './pages/AddNewTask';
import Layout from "./Layout/Layout";

function App() {
  return (
    <div>
      <FinishedProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<AllTasks />}/>
          <Route path="/finished-tasks" element={<FinishedTasks />}/>
          <Route path='/add-new-task' element={<AddNewTask />}/>
        </Routes>
      </Layout>
      </FinishedProvider>
    </div>

  );
}

export default App;
