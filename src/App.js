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

const transitionRoutes = [
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

const routes = [
  {
    component: <ScenicSpotsFilter />,
    path: "/scenicspots/filter",
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
          {/* <ScrollToTop /> */}

          <Switch>
            {transitionRoutes.map((transitionRoute) => (
              <Route exact path={transitionRoute.path}>
                {/* {({ match }) => (
                  <CSSTransition
                    in={match != null}
                    timeout={500}
                    classNames="transition"
                    unmountOnExit
                  > */}
                {transitionRoute.component}
                {/* </CSSTransition>
                )} */}
              </Route>
            ))}
            {routes.map((route) => (
              <Route exact path={route.path}>
                {route.component}
              </Route>
            ))}
            <Redirect to={transitionRoutes[0].path} />
          </Switch>
        </Suspense>
        <Footer />
      </>
    </Router>
  );
}

export default App;
