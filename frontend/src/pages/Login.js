import LoginForm from "../components/LoginForm";
import Nav from "../components/Nav";

const Login = () => {
    return (
        <div className="login">
            <Nav />
            <h2> Login </h2>
            <LoginForm />
        </div>
    );
};

export default Login;