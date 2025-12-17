import { lazy } from "react";
import Loadable from "app/components/Loadable";

const NotFound = lazy(() => import("./NotFound"));
const ForgotPassword = lazy(() => import("./ForgotPassword"));

const JwtLogin = Loadable(lazy(() => import("./login/JwtLogin")));
const JwtRegister = Loadable(lazy(() => import("./register/JwtRegister")));
const ResetPassword = Loadable(lazy(() => import("./ResetPassword"))); // 👈 ADD

const sessionRoutes = [
  { path: "/session/signup", element: <JwtRegister /> },
  { path: "/session/signin", element: <JwtLogin /> },
  { path: "/session/forgot-password", element: <ForgotPassword /> },

  // 👇 ADD THIS
  { path: "/session/reset-password", element: <ResetPassword /> },

  { path: "*", element: <NotFound /> },
];

export default sessionRoutes;

