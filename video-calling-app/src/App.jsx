import React from "react"
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from "./components/Home";
import VideoComponent from "./components/VideoComponet";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/room/:roomID" element={<VideoComponent />} />
      </Routes>
    </BrowserRouter >
  )
}
export default App;