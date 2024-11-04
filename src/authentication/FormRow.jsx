import styled from "styled-components";

const StyledFormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  gap: 1rem;
  padding: 1.2rem 0;
  align-items: center;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid grey-200;
  }

  /* Special styling when the row contains buttons */
  &:has(button) {
    grid-template-columns: 1fr;
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
    padding-top: 1.6rem;
  }
`;

const Label = styled.label`
  font-weight: 600;
  font-size: 1rem;
  color: grey-800;
`;

const Error = styled.span`
  font-size: 1rem;
  color: red-600;
  margin-top: 0.4rem;
  font-weight: 500;
  text-align: left;
`;

function FormRow({ label, error, children }) {
  return (
    <StyledFormRow>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRow;
