import { Outlet } from "@remix-run/react";
import QuizProvider from "~/context/QuizContext";

export default function Index() {
  return (
      <Outlet />
  );
}
