import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Button from "../components/button";
import Input from "../components/input";
import { cls } from "@libs/client/utils";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import { useRouter } from "next/router";

interface EnterForm {
  email?: string;
  phone?: string;
}
interface TokenForm {
  token: string;
}

interface MutationResult {
  ok: boolean;
  error: string;
}

const Enter: NextPage = () => {
  const [enter, { data }] = useMutation<MutationResult>("/api/users/enter");
  const { register, reset, handleSubmit } = useForm<EnterForm>();

  const [confirmToken, { loading: tokenLoading, data: tokenData }] =
    useMutation<MutationResult>("/api/users/confirm");
  const { register: tokenRegister, handleSubmit: tokenHandleSubmit } =
    useForm<TokenForm>();

  const [submitting, setSubmitting] = useState(false);
  const [method, setMethod] = useState<"email" | "phone">("email");

  const onEmailClick = () => {
    reset();
    setMethod("email");
  };
  const onPhoneClick = () => {
    reset();
    alert("일일 문자 전송량 초과로 사용 불가합니다.");
    return;
  };

  const onValid = (valiForm: EnterForm) => {
    enter(valiForm);
  };

  const onTokenValid = (validForm: TokenForm) => {
    if (tokenLoading) return;
    console.log(validForm);
    confirmToken(validForm);
  };

  const router = useRouter();
  useEffect(() => {
    if (tokenData?.ok) {
      router.push("/");
    }
  }, [router, tokenData]);

  console.log(tokenData);

  return (
    <div className="mt-16 px-4">
      <h3 className="text-center text-3xl font-bold">제이마켓</h3>
      <div className="mt-12">
        {data?.ok ? (
          <form
            onSubmit={tokenHandleSubmit(onTokenValid)}
            className="mt-8 flex flex-col space-y-4"
          >
            <Input
              register={tokenRegister("token", { required: true })}
              name="token"
              label="인증번호 입력"
              type="number"
              required
            />
            {tokenData ? <span>{tokenData.error}</span> : null}
            <Button text={submitting ? "Loading" : "인증번호 입력"} />
          </form>
        ) : (
          <>
            <div className="flex flex-col items-center">
              <h5 className="text-sm font-medium text-gray-500">로그인하기</h5>
              <div className="mt-8  grid  w-full grid-cols-2 border-b ">
                <button
                  className={cls(
                    "border-b-2 pb-4 text-sm font-medium",
                    method === "email"
                      ? " border-orange-500 text-orange-400"
                      : "border-transparent text-gray-500 hover:text-gray-400"
                  )}
                  onClick={onEmailClick}
                >
                  이메일
                </button>
                <button
                  className={cls(
                    "border-b-2 pb-4 text-sm font-medium",
                    method === "phone"
                      ? " border-orange-500 text-orange-400"
                      : "border-transparent text-gray-500 hover:text-gray-400"
                  )}
                  onClick={onPhoneClick}
                >
                  전화번호
                </button>
              </div>
            </div>
            <form
              onSubmit={handleSubmit(onValid)}
              className="mt-8 flex flex-col space-y-4"
            >
              {method === "email" ? (
                <Input
                  register={register("email", { required: true })}
                  name="email"
                  label="이메일"
                  type="email"
                  required
                />
              ) : null}
              {method === "phone" ? (
                <Input
                  register={register("phone", { required: true })}
                  name="phone"
                  label="전화번호"
                  type="number"
                  kind="phone"
                  required
                />
              ) : null}
              {method === "email" ? (
                <Button text={submitting ? "Loading" : "인증번호 받기"} />
              ) : null}
              {method === "phone" ? (
                <Button text={submitting ? "Loading" : "인증번호 받기"} />
              ) : null}
            </form>
          </>
        )}
      </div>
    </div>
  );
};
export default Enter;
