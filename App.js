import { Route, Routes } from "react-router-dom";
// Route is another component from react router dom

import AllMeetUpsPage from "./pages/AllMeetups";
import Favorites from "./pages/Favorites";
import NewMeetUpsPage from "./pages/NewMeetups";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<AllMeetUpsPage />} />
        <Route path="/new-meetups" element={<NewMeetUpsPage />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </Layout>
  );
}

export default App;
