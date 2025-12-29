import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import FinalProject from "./component/FinalProject/FinalProject";
import Login from "./component/FinalProject/Login";
import PrincipleLogin from "./component/FinalProject/PrincipleLogin";
import CreateEvent from "./component/FinalProject/CreateEvent";
import PendingEvents from "./component/FinalProject/PendingEvents";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FinalProject />} />
        <Route path="/login" element={<Login />} />
        <Route path="/principle-login" element={<PrincipleLogin />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/pending-events" element={<PendingEvents />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;



