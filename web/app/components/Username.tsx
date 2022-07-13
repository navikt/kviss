export default function PinCode() {
    return(
        <div className="text-center ">
            <form>
                <div>
                    <label>
                        Brukernavn:{" "}
                    </label>
                </div>
                <div>
                    <input
                    name="name"
                    type="text"
                    />
                </div>
                <div>
                    <button type="submit">
                        Neste
                    </button>
                </div>
            </form>
        </div>
        
    )
    
}