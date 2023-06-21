import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignupPage from './page/signup/SignupPage';
import Index from "./page/home/Index";
import Login from "./page/login/Login";
import Logout from "./page/login/Logout";
import HitAi from "./page/hit/HitAi";
import BoardDetail from './page/board/BoardDetail';
import BoardUpdate from "./page/board/BoardUpdate";



function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Index/>}/>
          <Route path="/member/save" element={<SignupPage/>}/>
          <Route path="/member/login" element={<Login/>}/>
          <Route path="/member/logout" element={<Logout/>}/>
          <Route path="/member/hit_ai" element={<HitAi/>}/>
          <Route path="/board/detail" element={<BoardDetail/>}/>
          <Route path="/board/update" element={<BoardUpdate/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
