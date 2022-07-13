import { json, LoaderFunction } from "@remix-run/node";
import { Form, Outlet, useLoaderData } from "@remix-run/react";
import PinCode from "~/components/PinCode";

export const loader: LoaderFunction = async () => {
    return json([
      { id: "1", name: "quiz 1",  },
      { id: "2", name: "Jacket" },
    ]);
  };

export default function QuizIndexRoute() {

    const quiz = useLoaderData();

    return (
      <div className="flex flex-col h-screen justify-center items-center">
        <PinCode />
      </div>
    );
  }