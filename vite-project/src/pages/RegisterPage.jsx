import React, { useState } from "react";
import { Form, Container, Alert } from "react-bootstrap";
import ActionButton from "../components/form/ActionButton";
import InputControl from "../components/form/InputControl";
import { useNavigate, Link } from "react-router-dom";
import UserAPI from "../api/UserAPI";

function RegisterPage() {
    const navigate = useNavigate();

    // Form state
    const [validationError, setValidationError] = useState("")
    const [formSubmitted, setFormSubmitted] = useState(false)

    // Account fields
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const accountType = 1; // Set account_type to User (1) by default
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormSubmitted(true);
        try {
            // Check that all fields have been filled in
            if (fullName == "" || email == "" || password == "" || confirmPassword == "") {
                setValidationError("Please ensure that all fields have been filled in");
                return;
            }
            // Check that the passwords are matching
            if (password != confirmPassword) {
                setValidationError("Please ensure the password fields are matching");
                return;
            }

            // Construct the user object
            const user = {
                "full_name": fullName,
                "email": email,
                "account_type": accountType,
                "password": password
            }

            await UserAPI.postUser(user);
            navigate("/login");
        } catch (error) {
            if (error.response && error.response.status === 409) {
                setValidationError("A user with this email already exists");
            } else if (error.response && error.response.status == 400) {
                const errorMsg = error.response.data.error
                setValidationError(errorMsg);
            } else {
                console.error("Error posting user:", error);
                setValidationError("Error posting user: Something went wrong");
            }
        }
        console.log("Account validation failed.");
    };

    return (
        <div className="register-background">
            <Container className="d-flex flex-column align-items-center justify-content-center vh-100">
                <h1>Register</h1>
                <Container className="transparent-card">
                    <Form>
                        <Container className="d-flex justify-content-center">
                            <InputControl
                                label="Full Name"
                                type="text"
                                value={fullName}
                                onChange={setFullName}
                            />
                            <InputControl
                                label="Email"
                                type="email"
                                value={email}
                                onChange={setEmail}
                            />
                        </Container>

                        <Container className="d-flex justify-content-center">
                            <InputControl
                                label="Password"
                                type="password"
                                value={password}
                                onChange={setPassword}
                            />
                            <InputControl
                                label="Confirm Password"
                                type="password"
                                value={confirmPassword}
                                onChange={setConfirmPassword}
                            />
                        </Container>

                        <Container className="d-flex justify-content-center mt-4">
                            <ActionButton text="Register" size="sm" type="submit" onClick={handleSubmit} />
                        </Container>

                        <Container className="d-flex justify-content-center mt-4">
                            <Link to="/login">
                                <p>Already have an account? <b>Login</b></p>
                            </Link>
                        </Container>
                    </Form>
                </Container>
                {formSubmitted && (
                    <>
                        {validationError && (
                          <Alert variant="danger" className="mt-3">
                            {validationError}
                          </Alert>
                        )}
                    </>
                )}
            </Container>
        </div>
    );
}

export default RegisterPage;