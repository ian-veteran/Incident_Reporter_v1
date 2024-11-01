import styled from "styled-components";
import LoginForm from "./LoginForm";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background: linear-gradient(
      125deg,
      rgba(235, 240, 244, 0.4),
      rgba(210, 220, 230, 0.4)
    ),
    url("/mombasaDRCAT1.jpg"); /* Replace with your image path */
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  font-family: Arial, sans-serif;
  overflow: hidden;
  position: relative;

  ::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: inherit;
    backdrop-filter: blur(10px);
    z-index: -1;
  }

  h1 {
    font-size: 2rem;
    color: #333;
    margin-bottom: 1rem;

    /* Media queries for tablet responsiveness */
    @media (max-width: 768px) {
      h1 {
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
      }

      gap: 0.5rem;
    }

    @media (max-width: 480px) {
      h1 {
        font-size: 1.2rem;
      }

      gap: 0.25rem;
    }
  }
`;

function Login() {
  return (
    <LoginLayout>
      <LoginForm />
    </LoginLayout>
  );
}

export default Login;
