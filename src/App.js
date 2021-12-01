import React, { useState, useEffect, lazy, Suspense } from "react";
import "App.css";
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
import { CSSTransition } from "react-transition-group";
import { path } from "variable/path";
import Navbar from "components/NavBar";
import Footer from "components/Footer";
import ScenicSpots from "pages/ScenicSpots";
import ScenicSpotsFilter from "pages/ScenicSpotsFilter";
import FoodAndAccommodation from "pages/FoodAndAccommodation";
import ScrollToTop from "components/ScrollToTop";

setAxiosDefaultURL("https://swin-opendata.herokuapp.com/api/v1/data/");

const routes = [
  {
    component: <ScenicSpots />,
    path: path[0],
  },
  // {
  //   component: <ScenicSpotsFilter />,
  //   path: "/scenicspots/filter",
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
        <Suspense
        // fallback={<FallBack />}
        >
          <Navbar />
          <ScrollToTop />

          {/* <Switch> */}
          {routes.map((route) => (
            <>
              <Route exact path={route.path}>
                {({ match }) => (
                  <CSSTransition
                    in={match != null}
                    timeout={500}
                    classNames="transition"
                    unmountOnExit
                  >
                    {route.component}
                  </CSSTransition>
                )}
              </Route>
              <Route exact path={"/scenicspots/filter"}>
                <ScenicSpotsFilter />
              </Route>
            </>
          ))}
          {/* <Redirect to={routes[0].path} /> */}
          {/* </Switch> */}
        </Suspense>
        <Footer />
      </>
    </Router>
  );
}

export default App;
