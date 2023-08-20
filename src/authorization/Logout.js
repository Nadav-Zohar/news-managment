import { useContext } from "react";
import { GeneralContext } from "../App";

export default function Logout(){
    const {user, setIsLoader, snackbar, setUser}= useContext(GeneralContext);

    const logout= () => {
        setIsLoader(true);
        fetch(`https://api.shipap.co.il/logout`, {
            credentials: 'include',
        })
        .then(() => {
            setUser(null);
            setIsLoader(false);
            snackbar("user disconnect")
        });
    };

    return(
        <p className="user">
            {user.fullName} is on!
            <button className="logout" onClick={logout}>Log-Out</button>
        </p>
    )
}