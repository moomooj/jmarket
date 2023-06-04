"use client";
import { FieldError, FieldErrors, useForm } from "react-hook-form";

interface LoginFrom {
  username: string;
  email: string;
  password: string;
  errors?: string;
}

export default function Forms() {
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFrom>({
    mode: "onChange",
  });

  const onVaild = (data: LoginFrom) => {
    console.log("문제없음");
  };
  const onInvaild = (errors: FieldErrors) => {};

  return (
    <form onSubmit={handleSubmit(onVaild, onInvaild)}>
      <input
        {...register("username", {
          required: "Username is required",
          minLength: {
            message: "The username shoild be longer than 5 char",
            value: 5,
          },
        })}
        type="text"
        placeholder="Username"
      />
      <input
        {...register("email", {
          required: "email is required",
          validate: {
            notGamil: (value) =>
              !value.includes("@gmail.com") || "Gamil is not allowed",
          },
        })}
        type="email"
        placeholder="Email"
      />
      {errors.email?.message}
      <input
        {...register("password", { required: "Password is required" })}
        type="password"
        placeholder="Password"
      />
      <input type="submit" value="계정만들기" />
    </form>
  );
}
