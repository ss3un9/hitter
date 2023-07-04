import React, {Component} from "react";
import {Route, BrowserRouter, Routes} from "react-router-dom";
import SignupPage from './page/signup/SignupPage';
import Login from "./page/login/Login";
import Logout from "./page/login/Logout";
import HitAi from "./page/hit/HitAi";
import BoardDetail from './page/board/BoardDetail';
import BoardUpdate from "./page/board/BoardUpdate";
import HitAiDetail from "./page/hit/HitAiDetail";
import Community from "./page/community/Community";
import Write from "./page/board/Write";
import BoardDelete from "./page/board/BoardDelete";
import Mypage from "./page/member/MyPage";
import LeaderBoard from "./page/hit/LeaderBoard";
import Update from "./page/member/Update";
import MySong from "./page/member/MySong";
import MyBoard from "./page/member/MyBoard";
import MemberDelete from "./page/member/MemberDelete";
import MenuBar from "./component/MenuBar";
import LoginMenuBar from "./component/LoginMenuBar";
import Home from "./page/home/Home";
import HowToUse from "./page/howtouse/HowToUse";
import MyLikeSong from "./page/member/MyLikeSong";

class App extends Component {

  render() {
    const session = [];
    const storedSession = JSON.parse(localStorage.getItem('session'));
    if (storedSession && storedSession.loginName) {
      console.log(storedSession.loginName);
    }

    return (
        <div className="main-app">

          <BrowserRouter>
            {
              storedSession && storedSession.loginName ?
                  <LoginMenuBar/> :
                  <MenuBar/>

            }

            <Routes>
              <Route path="/board/write" element={<Write/>}/>
              <Route path="/board/detail" element={<BoardDetail/>}/>
              <Route path="/" exact element={<Home/>}></Route>
              <Route path="/member/delete" element={<MemberDelete/>}></Route>
              <Route path="/hit" element={<HitAi/>}></Route>
              <Route path="/song/board" element={<LeaderBoard/>}></Route>
              <Route path="/board" element={<Community/>}></Route>
              <Route path={`/member/update`} element={<Update/>}></Route>
              <Route path="/signup" element={<SignupPage/>}></Route>
              <Route path="/login" element={<Login/>}></Route>
              <Route path="/logout" element={<Logout/>}></Route>
              <Route path="/member/mypage" element={<Mypage/>}></Route>
              <Route path="/member/mysong" element={<MySong/>}></Route>
              <Route path="/member/mylikesong" element={<MyLikeSong/>}></Route>
              <Route path="/member/myboard" element={<MyBoard/>}></Route>
              <Route path={"/hit_ai_detail"} element={<HitAiDetail/>}></Route>
              <Route path="/board/delete" element={<BoardDelete/>}/>
              <Route path="/board/update" element={<BoardUpdate/>}/>
              <Route path="/board/paging" element={<Community/>}/>
              <Route path="/howtouse" element={<HowToUse/>}/>
            </Routes>
          </BrowserRouter>


        </div>
    );
  };
}

export default App;


  /* <Router>
        <Routes>
          <Route path="/" element={<NoUse/>}/>
          <Route path="/member/save" element={<SignupPage/>}/>
          <Route path="/member/login" element={<Login/>}/>
          <Route path="/member/logout" element={<Logout/>}/>
          <Route path="/member/hit_ai" element={<HitAi/>}/>
          <Route path="/board/write" element={<Write/>}/>
          <Route path="/board/detail" element={<BoardDetail/>}/>
          <Route path="/board" element={<Community/>}/>
          {/*<Route exact path="/board" component={Community} />*/
/*<Route path={`${board}/:id`} component={BoardDetail} />
<Route path="/board/delete" element={<BoardDelete/>}/>
<Route path="/board/update" element={<BoardUpdate/>}/>
<Route path="/board/paging" element={<Community/>}/>
<Route path="/hit_ai_detail" element={<HitAiDetail/>}/>
<Route path="/member/mypage" element={<Mypage/>}></Route>

<Route path="/member/update" element={<Update/>}></Route>
<Route path="/member/delete" element={<MemberDelete/>}></Route>
<Route path="/member/mysong" element={<MySong/>}></Route>
<Route path="/member/myboard" element={<MyBoard/>}></Route>


<Route path="/song/board" element={<LeaderBoard/>}></Route> */