import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignupPage from './page/signup/SignupPage';
import Index from "./page/home/Index";
import Login from "./page/login/Login";
import Logout from "./page/login/Logout";
import HitAi from "./page/hit/HitAi";
import BoardDetail from './page/board/BoardDetail';
import BoardUpdate from "./page/board/BoardUpdate";
import HitAiDetail from "./page/hit/HitAiDetail";
import Community from "./page/board/Community";
import Write from "./page/board/Write";
import BoardDelete from "./page/board/BoardDelete";
import Mypage from "./page/member/MyPage";
import LeaderBoard from "./page/board/LeaderBoard";
import Update from "./page/member/Update";
import MySong from "./page/member/MySong";
import MyBoard from "./page/member/MyBoard";
import MemberDelete from "./page/member/MemberDelete";

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
          <Route path="/board/write" element={<Write/>}/>
          <Route path="/board/detail" element={<BoardDetail/>}/>
          <Route path="/board" element={<Community/>}/>
          {/*<Route exact path="/board" component={Community} />*/}
          {/*<Route path={`${board}/:id`} component={BoardDetail} />*/}
          <Route path="/board/delete" element={<BoardDelete/>}/>
          <Route path="/board/update" element={<BoardUpdate/>}/>
          <Route path="/board/paging" element={<Community/>}/>
          <Route path="/hit_ai_detail" element={<HitAiDetail/>}/>
          <Route path="/member/mypage" element={<Mypage/>}></Route>

          <Route path="/member/update" element={<Update/>}></Route>
          <Route path="/member/delete" element={<MemberDelete/>}></Route>
          <Route path="/member/mysong" element={<MySong/>}></Route>
          <Route path="/member/myboard" element={<MyBoard/>}></Route>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
