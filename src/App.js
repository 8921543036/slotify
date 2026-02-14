import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import FinalProject from "./component/FinalProject/FinalProject";
import Login from "./component/FinalProject/Login";
import PrincipleLogin from "./component/FinalProject/PrincipleLogin";
import CreateEvent from "./component/FinalProject/CreateEvent";
import PendingEvents from "./component/FinalProject/PendingEvents";
import CalendarView   from "./component/FinalProject/CalendarView";
import EventDetails from "./component/FinalProject/EventDetails";
import AdminLogin from "./component/FinalProject/AdminLogin";
import AdminDashboard from "./component/FinalProject/AdminDashboard";
import ProtectedAdmin from "./component/FinalProject/ProtectedAdmin";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FinalProject />} />
        <Route path="/login" element={<Login />} />
        <Route path="/principle-login" element={<PrincipleLogin />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/pending-events" element={<PendingEvents />} />
        <Route path="/calendar-view" element={<CalendarView />} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/admin-login" element={<AdminLogin />} />
<Route path="/admin-dashboard" element={<AdminDashboard />} />
<Route path="/admin-login" element={<AdminLogin />} />
<Route path="/protected-admin" element={<ProtectedAdmin />} />

 

       
      </Routes>
    </BrowserRouter>
  );
}

export default App;



