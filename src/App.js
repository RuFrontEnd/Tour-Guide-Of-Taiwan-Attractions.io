import React, { useState, useEffect, lazy, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import {
  login,
  logout,
  setCurrentUser,
  setCurrentUserData,
} from "redux/member/memberActions"; // 判斷是否 login 的狀態
import { setAxiosDefaultURL } from "utils/data";
import { path } from "variable/path";
import Navbar from "components/NavBar";
import Footer from "components/Footer";
import ScenicSpots from "pages/ScenicSpots";
import ScenicSpotsFilter from "pages/ScenicSpotsFilter";
import FoodAndAccommodation from "pages/FoodAndAccommodation";

setAxiosDefaultURL("https://swin-opendata.herokuapp.com/api/v1/data/");

const routes = [
  {
    component: <ScenicSpots />,
    path: path[0],
  },
  // {
  //   component: <ScenicSpotsFilter />,
  //   path: "/scenicSpots/#/:category/:city",
  // },
  {
    component: <FoodAndAccommodation />,
    path: "/foodAndAccommodation",
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
          <Navbar />
          <Switch>
            {routes.map((route) => (
              <Route exact path={route.path}>
                {route.component}
              </Route>
            ))}
            {/* <Redirect to={routes[0].path} /> */}
          </Switch>
        </Suspense>
        <Footer />
      </>
    </Router>
  );
}

export default App;
