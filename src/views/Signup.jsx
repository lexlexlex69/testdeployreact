import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";

export default function Signup() {
    const navigate = useNavigate();
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    const [errors, setErrors] = useState(null);
    const { setUser, setToken } = useStateContext();
    const onSubmit = (ev) => {
        ev.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        };
        axiosClient
            .post("/signup", payload)
            .then(({ data }) => {
                navigate("/");
                alert("signup successfully");
                // setUser(data.user);
                // setToken(data.token);
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            });
        console.log(payload);
    };

    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">Create an account for free</h1>
                    {errors && (
                        <div className="alert">
                            {Object.keys(errors).map((key) => (
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                        </div>
                    )}
                    <input ref={nameRef} placeholder="Full name" />
                    <input ref={emailRef} type="email" placeholder="Email" />
                    <input
                        ref={passwordRef}
                        type="password"
                        placeholder="Password"
                    />
                    <input
                        ref={passwordConfirmationRef}
                        type="password"
                        placeholder="Confirm password"
                    />
                    <button className="btn btn-block">Signup</button>
                    <p className="message">
                        Already registered?{" "}
                        <Link to="/login">login an account</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
