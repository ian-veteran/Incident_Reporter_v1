import { useForm } from "react-hook-form";
import styled from "styled-components";

import FormRow from "./FormRow";
import Input from "./Input";
import { useSignup } from "./useSignup";
import Button from "./Button";
// Email regex: /\S+@\S+\.\S+/

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 100%; /* Full width for alignment */
  max-width: 400px; /* Restrict max-width for a narrow form */
  margin-left: 2rem; /* Align form to the left with some spacing */
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 600px) {
    padding: 1.5rem;
    gap: 1.2rem;
    margin-left: 1rem; /* Adjust margin for smaller screens */
  }
`;

function SignupForm() {
  const { signup, isLoading } = useSignup();
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  function onSubmit({ fullName, email, password }) {
    signup({ fullName, email, password }, { onSettled: () => reset() });
  }

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isLoading}
          {...register("fullName", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isLoading}
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 6 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          disabled={isLoading}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password needs a minimum of 6 characters",
            },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isLoading}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || "Passwords need to match",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button disabled={isLoading}>Cancel</Button>
        <Button disabled={isLoading}>Create new user</Button>
      </FormRow>
    </StyledForm>
  );
}

export default SignupForm;
