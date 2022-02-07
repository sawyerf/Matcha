import RegisterForm from "../components/RegisterForm";
import Nav from "../components/Nav";

const Register = () => {
    return (
        <div className="register">
            <Nav />
            <h2> Register </h2>
            <RegisterForm />
        </div>
    );
};

export default Register;