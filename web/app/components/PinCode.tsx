export default function PinCode() {
    return(
        <div className="text-center ">
            <form method="post">
                <div>
                    <label>
                        PIN kode:{" "}
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
                        submit
                    </button>
                </div>
            </form>
        </div>
        
    )
    
}