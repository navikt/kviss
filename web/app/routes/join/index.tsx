import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import PinCode from "~/components/PinCode";
import Username from "~/components/Username";

export type ButtonProps = {
  handleClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, pinCode: String) => void;
};



export default function QuizIndexRoute() {

    const [pinCode, setPinCode] = useState<String>("")
    const [nickname, setNickName] = useState<String>("")


    const handleClickPin = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, pc: String) => {
      event.preventDefault()
      setPinCode(pc)
    }

    const handleClickNick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, pc: String) => {
      event.preventDefault()
      setNickName(pc)
  }



    return (
      <div className="flex flex-col h-screen justify-center items-center">
       
        {pinCode === ""? 
          <PinCode handleClick={handleClickPin}/>:
          (nickname ===""?
            <Username handleClick={handleClickNick}/>
            : 
            <div className="text-center ">
              See your name on the screen?
              <br/>
              {nickname}
            </div>
          )}
      </div>
    );
  }