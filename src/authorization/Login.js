import { useContext, useState } from "react"
import { GeneralContext } from "../App";
import Snackbar from "../components/Snackbar";
import { useNavigate } from "react-router-dom";

export default function Login(){
    const [formData, setFormData]= useState({
        userName: "",
        password: "",
    });

    const {setUser, setIsLoader, snackbar}= useContext(GeneralContext);
    const navigate= useNavigate();
    
    const handleInput= ev => {
        const {name, value}= ev.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    const login= ev =>{
        ev.preventDefault();
        if(!formData.userName){
            snackbar("no username");
            return
        }
        if(!formData.password){
            snackbar("no password");
            return
        }
        setIsLoader(true);
        fetch(`https://api.shipap.co.il/login`, {
            credentials: 'include',
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(formData),
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return res.text().then(x => {
                throw new Error(x);
            });
            }
        })
        .then(data => {
            setUser(data)
        })
        .catch(err => {
            Snackbar(err.message);
        })
        .finally(() => {
            setIsLoader(false);
        });
    }

    return(
        <div className="Login smallFrame">
            <h2>Log-In</h2>

            <form onSubmit={login}>
                <label>
                    User Name :
                    <input type="text" name="userName" value={formData.userName} onChange={handleInput} />
                </label>
                <label>
                    Password :
                    <input type="password" name="password" value={formData.password} onChange={handleInput} />
                </label>
                <button>Log-In</button>
            </form>
            <p className="signup">
                <a onClick={() => navigate("/signup") }>To Sign Up Press Here</a>
            </p>
        </div>
    )
}