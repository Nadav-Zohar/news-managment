import { useContext, useState } from 'react';
import { GeneralContext } from "../App";
import { useNavigate } from 'react-router-dom';


export default function Signup(){
    const [formData, setFormData] = useState({
        userName: '',
        password: '',
        email: '',
        fullName: '',
    });
    const {snackbar, setIsLoader}= useContext(GeneralContext);
    const navigate= useNavigate();

    const handelInput = ev => {
        const { name, value } = ev.target;
        
        const obj = {
            ...formData,
            [name]: value,
        };
        setFormData(obj);
    }

    const signUp = ev => {
        ev.preventDefault();
        setIsLoader(true);
        fetch("https://api.shipap.co.il/signup", {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(formData),
        })
        .then(res => res.json())
        .then(data => {
            if(data.status ==="success"){
                snackbar("user created");
            } else {
                snackbar(data.message);
            }
        })
        .finally(() => {
            setIsLoader(false);
        })
    }



    return(
        <div className="Login smallFrame">
            <h2>Sign Up</h2>
            <form onSubmit={signUp}>
                <label>
                    User Name :
                    <input type="text" name='userName' value={formData.userName} onChange={handelInput} />
                </label>
                <label>
                    Password :
                    <input type="password" name='password' value={formData.password} onChange={handelInput} />
                </label>
                <label>
                    Email :
                    <input type="email" name='email' value={formData.email} onChange={handelInput} />
                </label>
                <label>
                    Full Name :
                    <input type="text" name='fullName' value={formData.fullName} onChange={handelInput} />
                </label>
                <button onClick={() => navigate("/")}>Sign Up</button>
            </form>
            <p className="signup">
                <a onClick={() => navigate("/") }>To Log In Press Here</a>
            </p>
        </div>
    )
}