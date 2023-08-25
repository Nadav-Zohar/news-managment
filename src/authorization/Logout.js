import { useContext } from "react";
import { GeneralContext } from "../App";
import { useNavigate } from "react-router-dom";

export default function Logout(){
    const {user, setIsLoader, snackbar, setUser}= useContext(GeneralContext);
    const navigate= useNavigate();


    const logout= () => {
        setIsLoader(true);
        fetch(`https://api.shipap.co.il/logout`, {
            credentials: 'include',
        })
        .then(() => {
            setUser(null);
            setIsLoader(false);
            snackbar("user disconnect");
            navigate("/");
        });
    };

    return(
        <p className="user">
            {user.fullName} is on!
            <button className="logout" onClick={logout}>Log-Out</button>
        </p>
    )
}