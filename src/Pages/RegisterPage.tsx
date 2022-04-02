import { useState, SyntheticEvent, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import FormContainer from "../Components/FormContainer";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../Redux/Actions/userActions";
import { RootState } from "../Redux/store";
import { UserState } from "../Redux/Reducers/userReducer";
const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [passError, setPassError] = useState("");
  const [showAlert, setShowAlert] = useState(true);
  const [showPassAlert, setPassShowAlert] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userRegister = useSelector<RootState, UserState>(
    (state: RootState) => state.userRegister,
  );
  const { userInfo, error } = userRegister;
  const submitHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    setPassError("");
    setShowAlert(true);
    setPassShowAlert(true);
    if (password === repeatedPassword) {
      console.log("submited");
      dispatch(register(username, password));
    } else {
      setPassError("Passwords must match");
    }
  };

  useEffect(() => {
    //check if user is logged in
    if (userInfo !== undefined && userInfo.username) {
      navigate("/login");
    }
  }, [userInfo, navigate]);
  return (
    <FormContainer>
      <h1>Register</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Enter username</Form.Label>
          <Form.Control
            type="username"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Repeat Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Repeat Password"
            value={repeatedPassword}
            onChange={(e) => setRepeatedPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
      {passError !== "" ? (
        <Alert
          show={showPassAlert}
          variant="danger"
          className="mt-3"
          onClose={() => setPassShowAlert(false)}
          dismissible
        >
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>{passError}</p>
        </Alert>
      ) : (
        <></>
      )}
      {error !== undefined ? (
        <Alert
          show={showAlert}
          variant="danger"
          className="mt-3"
          onClose={() => setShowAlert(false)}
          dismissible
        >
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>{error}</p>
        </Alert>
      ) : (
        <></>
      )}
    </FormContainer>
  );
};

export default RegisterPage;
