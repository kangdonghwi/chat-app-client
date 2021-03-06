import React from "react";
import styled from "styled-components";

const LoginForm = styled.form`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
`;

const LoginTitle = styled.h3`
  font-weight: 900;
  font-size: 1.5rem;
  margin: 0.5rem;
  color: white;
`;

const LoginInput = styled.input`
  background-color: transparent;
  border-bottom: 2px solid white;
  font-size: 1.5rem;
  font-weight: 900;
  text-align: center;
  width: 100%;
  animation-duration: 3s;
  animation-timing-function: ease-in-out;
  animation-name: expend;

  &:focus {
    outline: none;
  }
`;

const LoginSubmit = styled.input`
  display: none;
`;

const Login = ({ setLogin, userName, setUserName }) => {
  return (
    <>
      <LoginForm
        onSubmit={(e) => {
          e.preventDefault();
          setUserName(userName);
          setLogin(true);
        }}
      >
        <LoginTitle>이름을 알려주세요</LoginTitle>
        <LoginInput
          value={userName}
          autoFocus
          onChange={(e) =>
            setUserName(e.target.value)
          }
        />
        <LoginSubmit type="submit" value="" />
      </LoginForm>
    </>
  );
};

export default Login;
