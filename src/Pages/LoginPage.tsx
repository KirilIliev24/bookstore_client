import { SyntheticEvent, useEffect, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import FormContainer from "../Components/FormContainer";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../Redux/Actions/userActions";
import { RootState } from "../Redux/store";
import { UserState } from "../Redux/Reducers/userReducer";
const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector<RootState, UserState>(
    (state: RootState) => state.userLogin,
  );
  const { userInfo, error } = userLogin;

  const submitHandler = (e: SyntheticEvent) => {
    e.preventDefault();

    //send to dispatch
    dispatch(login(username, password));

    console.log("submited");
  };

  useEffect(() => {
    //check if user is logged in
    if (userInfo !== undefined && userInfo.username) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  return (
    <FormContainer>
      <h1>Login</h1>
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

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
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

export default LoginPage;
