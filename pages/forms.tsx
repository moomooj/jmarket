import { FieldErrors, useForm } from "react-hook-form";

interface LoginForm {
  username: string;
  password: string;
  email: string;
}

export default function Forms() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onValid = (data: LoginForm) => {
    console.log("나는 검증되었어yo ");
  };

  const onInValid = (errors: FieldErrors) => {
    console.log(errors);
  };
  console.log(Boolean(errors.email?.message) ? "border-red-500" : "");

  return (
    <form onSubmit={handleSubmit(onValid, onInValid)}>
      <input
        {...register("username", {
          required: "닉네임을 입력해주세요",
          minLength: {
            message: "닉네임은 5자 이상.",
            value: 5,
          },
        })}
        type="text"
        placeholder="Username"
      />
      <input
        {...register("email", {
          required: "이메일을 입력해주세요",
          validate: {
            notGmail: (value) =>
              !value.includes("@gmail.com") || "구글메일은 사용 할 수 없어요",
          },
        })}
        type="email"
        placeholder="Email"
      />
      {errors.email?.message}
      <input
        {...register("password", { required: "비밀번호를 입력해주세요" })}
        type="password"
        placeholder="Password"
      ></input>
      <input type="submit" value="Creat Acc" />
    </form>
  );
}
