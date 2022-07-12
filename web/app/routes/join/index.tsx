import { json, LoaderFunction } from "@remix-run/node";
import { Form, Outlet, useLoaderData } from "@remix-run/react";
import Footer from "~/components/Footer";
import Header from "~/components/Header";
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
        <>
        <Header />
          <div className="container max-w-full my-10 bg-orange-100">
            <div className="flex place-items-center justify-center text-center">
              <PinCode />
            </div>
          </div>
        <Footer />
        </>
    );
  }