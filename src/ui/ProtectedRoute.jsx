// ProtectedRoute.jsx
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import styled from "styled-components";
import Loader from "./Loader";
import { useUser } from "../authentication/useUser";

const FullPage = styled.div`
  height: 100vh;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = useUser();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <FullPage>
        <Loader />
      </FullPage>
    );
  }

  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
