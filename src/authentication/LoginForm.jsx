// LoginForm.js
import { useState } from "react";
import styled from "styled-components";
import FormRowVertical from "./FormRowVertical";
import Input from "./Input";
import { useLogin } from "./useLogin";
import Loader from "../ui/Loader";

const FormContainer = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background-color: blur;
  border-radius: 8px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);


  /* Media query for small screens */
  @media (max-width: 480px) {
    padding: 1rem; 
    border-radius: 4px; 
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  color: #fff;
  background-color: #dc2626;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #b91c1c;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const H1 = styled.h1`
  font-size: 2rem;
  color: #333;
  text-align: center;
  margin: 0;
  padding-bottom: 1rem;

  /* Media query for small screens */
  @media (max-width: 480px) {
    font-size: 1.5rem;
    padding-bottom: 0.5rem;
  }
`;

function LoginForm() {
  const [email, setEmail] = useState("admin@admin.com");
  const [password, setPassword] = useState("Admin");

  const { login, isLoading } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;

    login({ email, password });
  }

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <H1>Admin</H1>
        <FormRowVertical label="Email address">
          <Input
            type="email"
            id="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
        </FormRowVertical>
        <FormRowVertical label="Password">
          <Input
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
        </FormRowVertical>
        <FormRowVertical>
          <Button type="submit" disabled={isLoading}>
            {!isLoading ? "Log in" : <Loader />}
          </Button>
        </FormRowVertical>
      </form>
    </FormContainer>
  );
}

export default LoginForm;

//email admin@admin.com
//pass Admin
