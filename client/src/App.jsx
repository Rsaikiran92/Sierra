import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/signup";
import VideoUpload from "./VideoUpload";
import "./App.css";
import VideoList from "./VideoList";
import VideoDetail from "./VideoDetail"; // Import VideoDetail
import PrivateRoute from "./components/PrivateRoute"; // Import PrivateRoute

function App() {
  return (
    <>
      <Navbar />
      <div className="main" style={{ height: "90vh" }}>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <VideoUpload />
              </PrivateRoute>
            }
          />
          <Route
            path="/videos"
            element={
              <PrivateRoute>
                <VideoList />
              </PrivateRoute>
            }
          />
          <Route
            path="/videos/:id"
            element={
              <PrivateRoute>
                <VideoDetail />
              </PrivateRoute>
            }
          />{" "}
          {/* Add route */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
