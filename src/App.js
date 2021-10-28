import React, { useState, useEffect, lazy, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  login,
  logout,
  setCurrentUser,
  setCurrentUserData,
} from "redux/member/memberActions"; // 判斷是否 login 的狀態
import { setAxiosDefaultURL } from "utils/data";
// import Navbar from "components/navBar/NavBar";
// import Footer from "components/footer/Footer";
import SignIn from "pages/SignIn";
import GPSPostion from "pages/GPSPostion";
import Attractions from "pages/Attractions";

setAxiosDefaultURL("https://swin-opendata.herokuapp.com/api/v1/data/");

const routes = [
  {
    component: <SignIn />,
    path: "/",
  },
  {
    component: <GPSPostion />,
    path: "/gpsPostion",
  },
  {
    component: <Attractions />,
    path: "/attractions",
  },
];

// 引入 所有人的總元件
// const page = lazy(() => import("pages/page/page"));

// 路由表
function App() {
  const dispatch = useDispatch();
  // const isLogin = useSelector((state) => state.member.isLogin);

  // if (isLogin === null) {
  //   return <></>;
  // }

  return (
    <Router>
      <>
        {/* <Navbar
          style={{ display: !showNavBar && "none" }}
          cartNumber={cartNumber}
          amount={amount}
          setShowLoginModal={setShowLoginModal}
          setShowSuccessBox={setShowSuccessBox}
          showLoginModal={showLoginModal}
        />
        <LoginModal
          showLoginModal={showLoginModal}
          setShowLoginModal={setShowLoginModal}
          showSuccessBox={showSuccessBox}
          setShowSuccessBox={setShowSuccessBox}
        /> */}
        <Suspense
        // fallback={<FallBack />}
        >
          <Switch>
            {routes.map((route) => (
              <Route exact path={route.path}>
                {route.component}
              </Route>
            ))}
          </Switch>
        </Suspense>
        {/* <Footer /> */}
      </>
    </Router>
  );
}

export default App;
