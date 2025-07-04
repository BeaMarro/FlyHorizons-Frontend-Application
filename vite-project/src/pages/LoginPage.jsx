import React, { useState } from "react";
import { Form, Container, Alert } from "react-bootstrap";
import ActionButton from "../components/form/ActionButton";
import InputControl from "../components/form/InputControl";
import { useNavigate, Link } from "react-router-dom";
import AuthAPI from "../api/AuthAPI";
import TokenManager from "../api/TokenManager";

function LoginPage() {
    const navigate = useNavigate();

    // Login credentials
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Login status
    const [loginFailed, setLoginFailed] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await AuthAPI.login(email, password);
            const accessToken = TokenManager.getAccessToken();

            if (accessToken) {
                // Navigate to the profile page after successful login
                navigate("/profile");
                // Reload the page after redirection
                window.location.reload();
              } else {
                setLoginFailed(true);
              }      
            navigate("/profile");
        } catch (error) {
            console.error("Login failed:", error);
            setLoginFailed(true)
        }
    };

    return (
        <div className="login-background">
            <Container className="d-flex flex-column align-items-center justify-content-center vh-100">
                <h1>Login</h1>
                <Container className="transparent-card">
                    <Form>
                        <InputControl
                            label="Email"
                            type="email"
                            value={email}
                            onChange={setEmail}
                        />
                        <InputControl
                            label="Password"
                            type="password"
                            value={password}
                            onChange={setPassword}
                        />

                        <Container className="d-flex justify-content-center">
                            <ActionButton text="Login" size="sm" type="submit" onClick={handleSubmit} />
                        </Container>

                        <Container className="d-flex justify-content-center mt-4">
                            <Link to="/register">
                                <p>Are you new here? <b>Register</b></p>
                            </Link>
                        </Container>
                    </Form>
                </Container>
                {loginFailed && (
                    <Alert variant="danger" className="mt-3">
                        Login failed. Please ensure that your email and password credentials are correct.
                    </Alert>
                )}
            </Container>
        </div>
    );
}

export default LoginPage;