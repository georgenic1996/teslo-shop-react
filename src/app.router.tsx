import { createHashRouter, Navigate } from "react-router";
import ShopLayout from "./shop/layouts/ShopLayout";
import HomePage from "./shop/pages/home/HomePage";
import ProductPage from "./shop/pages/product/ProductPage";
import GenderPage from "./shop/pages/gender/GenderPage";

import DashboardPage from "./admin/pages/dashboard/DashboardPage";
import AdminProductsPage from "./admin/pages/products/AdminProductsPage";

import { lazy } from "react";
import { LoginPage } from "./auth/pages/login/LoginPage";
import { RegisterPage } from "./auth/pages/register/RegisterPage";
import { AdminProductPage } from "./admin/pages/product/AdminProductPage";
import {
  AdminRoute,
  NotAuthenticatedRouter,
} from "./components/routes/ProtectedRoutes";

const AuthLayout = lazy(() => import("./auth/layouts/AuthLayout"));
const AdminLayout = lazy(() => import("./admin/layouts/AdminLayout"));

export const appRouter = createHashRouter([
  // export const appRouter = createBrowserRouter([
  //main router
  {
    path: "/",
    element: <ShopLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "product/:idSlug",
        element: <ProductPage />,
      },
      {
        path: "gender/:gender",
        element: <GenderPage />,
      },
    ],
  },

  //Auth Routes
  {
    path: "/auth",
    element: (
      <NotAuthenticatedRouter>
        <AuthLayout />
      </NotAuthenticatedRouter>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/auth/login" />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },

  //Admin Router
  {
    path: "/admin",
    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "products",
        element: <AdminProductsPage />,
      },
      {
        path: "products/:id",
        element: <AdminProductPage />,
      },
    ],
  },

  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);
