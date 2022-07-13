import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import PinCode from "~/components/PinCode";
import Username from "~/components/Username";


export default function QuizIndexRoute() {

    const [pinCode, setPinCode] = useState<String>("")

    const handleClick = (pc: String) => {
      console.log(pc)

      setPinCode(pc)
  }


    return (
      <div className="flex flex-col h-screen justify-center items-center">
       
        {pinCode === "" ? 
          <PinCode handleClick={handleClick}/>
          : <Username/>
        }
      </div>
    );
  }