import { useState } from 'react'
import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useNavigate } from "react-router-dom"

type ButtonProps = {
    handleClick: (pinCode: String) => void;
  };

export default function PinCode({handleClick}: ButtonProps) {

    const [pinCode, setPinCode] = useState<String>("")

      
    return(
        <div className="text-center ">
            <form>
                <div>
                    <label>
                        PIN kode:{""}
                    </label>
                </div>
                <div>
                    <input
                        name="pinCode"
                        type="text"
                        onChange={(e) => setPinCode(e.target.value)}
                    />
                </div>
                <div>
                    <button 
                    type="submit"
                    onClick={event => handleClick(pinCode)}
                    >
                        Neste
                    </button>
                </div>
            </form>
        </div>
        
    )
    
}