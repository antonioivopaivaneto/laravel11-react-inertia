import { useEffect } from "react";
import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import IconTrash from "@/Components/IconTrash";
import ApplicationLogo from "@/Components/ApplicationLogo";

export default function Login({ status, canResetPassword }) {
  const { data, setData, post, processing, errors, reset, get } = useForm({
    email: "",
    password: "",
    remember: false,
  });

  useEffect(() => {
    return () => {
      reset("password");
    };
  }, []);

  const submit = (e) => {
    e.preventDefault();

    post(route("login"));
  };

  return (
    <GuestLayout>
      <Head title="Log in" />

      {status && (
        <div className="mb-4 font-medium text-sm text-green-600">{status}</div>
      )}

      <div className="mx-auto flex justify-center mb-5">
     <ApplicationLogo className=" block w-auto fill-current text-white  " />


      </div>


      <h1 className=" text-4xl font-bold text-white  mb-5 ">Login</h1>

      <p className=" text-white  mb-5">digite seus dados no campo abaixo</p>

      <form onSubmit={submit}>
        <div>
          <InputLabel htmlFor="email" value="Email" className="text-white" />

          <TextInput
            id="email"
            type="email"
            name="email"
            value={data.email}
            className="mt-1 block w-full"
            autoComplete="username"
            isFocused={true}
            onChange={(e) => setData("email", e.target.value)}
          />

          <InputError message={errors.email} className="mt-2" />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="password" value="Senha" className="text-white" />

          <TextInput
            id="password"
            type="password"
            name="password"
            value={data.password}
            className="mt-1 block w-full"
            autoComplete="current-password"
            onChange={(e) => setData("password", e.target.value)}
          />

          <InputError message={errors.password} className="mt-2" />
        </div>

        <div className=" flex justify-between">
          <div className="block mt-4">
            <label className="flex items-center text-white">
              <Checkbox
                name="remember"
                checked={data.remember}
                onChange={(e) => setData("remember", e.target.checked)}
              />
              <span className="ms-2 text-sm text-white">Lembrar-me</span>
            </label>

          </div>


          <div className="mt-3">

            {canResetPassword && (
              <Link
                href={route("password.request")}
                className="underline text-sm text-white hover:text-[#00dae8] rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Esqueceu sua senha?
              </Link>


            )}

          </div>
        </div>
        <div className="flex flex-col  mt-5">
          <button
          style={{ background: 'linear-gradient(35.9deg,#00dae8 -6.17%,#00dae8 67.99%,#1c3047 99.29%)' }}
            className="  hover:shadow-glow text-center inline-flex items-center px-4 py-4 bg-gray-800 border border-transparent rounded-md font-semibold text-xs  uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 "
            disabled={processing}
          >
            Acessar
          </button>
          <Link
                href={route("register")}
                className="mt-5 text-sm text-white hover:text-[#00dae8] rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
               Não possui conta? faça aqui
              </Link>
        </div>

        <div className="flex flex-col justify-center text-center mt-4">
          <p className="text-white">Acessar com</p>

          <a
            href="/auth/google/redirect"
            className="text-center mx-auto cursor-pointer"
          >
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill=" rgba(255, 255, 255, 1)"
            >
              <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
            </svg>
          </a>

        </div>

      </form>
    </GuestLayout>
  );
}
