import React, { useEffect } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import axiosClient from "../axios-client";

export default function DefaultLayout() {
    const { user, token, setUser, notification } = useStateContext();
    const navigate = useNavigate();
    // debugger;
    if (!token) return <Navigate to="/login" />;
    const onLogout = (ev) => {
        ev.preventDefault();
        axiosClient.post("logout").then(() => {
            setUser({});
            setToken(null);
            <Navigate to="/login" />;
        });
    };

    useEffect(() => {
        axiosClient.get("/user").then((data) => {
            console.log(data.data.name);
            setUser(data.data);
        });
    }, []);

    return (
        <div id="defaultLayout">
            <aside>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/users">Users</Link>
            </aside>
            <div className="content">
                <header>
                    <div>Header</div>
                    <div>
                        {user.name}{" "}
                        <a href="#" onClick={onLogout} className="btn-logout">
                            Logout
                        </a>
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
            {notification && <div className="notification">{notification}</div>}
        </div>
    );
}
