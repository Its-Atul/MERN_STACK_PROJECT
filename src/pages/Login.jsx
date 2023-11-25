import React from "react";
import Template from "../compoments/core/Auth/Template";
import loginImage from "../assets/Images/login.webp";
const Login = () => {
    return(
        <div>
            <Template 
            title="Welcome Back"
            desc1="Build skills for today, tomorrow, and beyond."
            desc2="Education to future-proof your career."
            image={loginImage}
            formtype="login"
            />
        </div>
    );
}

export default Login;
