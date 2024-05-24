import { Login } from "features/auth/ui/login/login";
import { TodolistsList } from "features/TodolistsList/ui/TodolistsList";
import React from "react";
import { Route, Routes } from "react-router-dom";

export const Routing = () => {
  return (
    <Routes>
      <Route path={"/"} element={<TodolistsList />} />
      <Route path={"/login"} element={<Login />} />
    </Routes>
  );
};
