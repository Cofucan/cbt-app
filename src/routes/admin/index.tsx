import { createFileRoute } from "@tanstack/react-router";
import useAuth from "../../admin/hooks/useAuth.ts";
import { FormEvent, useState } from "react";
import logo from "../../admin/assets/logo.svg";
import saly from "../../admin/assets/esut_computer_lab.jpg";
import { BeatLoader } from "react-spinners";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const Route = createFileRoute("/admin/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { isLoading, formik } = useAuth();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const Submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formik?.handleSubmit();
  };

  return (
    <section>
      <div className="top fixed flex h-24 w-full items-center border-b border-[#CBD5E1]">
        <img src={logo} alt="Logo" className="object-cover px-8" />
      </div>
      <div className="flex h-screen w-full pt-24">
        <div className="container flex h-full items-center justify-center bg-[#EBEBFF]">
          <img src={saly} alt="Logo" className="object-cover" />
        </div>
        <div className="mt-5 flex h-full w-full items-center justify-center overflow-hidden lg:mx-10 lg:mt-0 lg:max-w-2xl">
          <div className="mx-2 w-full border border-[#CBD5E1] lg:mx-0">
            <div className="py-2 text-center">
              <h1 className="pb-3 text-2xl font-semibold">Admin</h1>
              <h3 className="text-xl font-normal text-gray-500">
                Welcome Back
              </h3>
            </div>
            <form
              onSubmit={Submit}
              className="flex flex-col gap-6 lg:w-full lg:gap-8"
            >
              <div className="mx-3 flex flex-col gap-3 md:mx-10 md:w-[85%] lg:gap-5">
                <label className="text-2xl text-slate-700">Email</label>
                <input
                  name="identifier"
                  onChange={formik.handleChange}
                  value={formik.values.identifier}
                  autoComplete="off"
                  placeholder="Enter your email address"
                  className="custom-placeholder rounded-lg border-2 border-[#CBD5E1] p-5 transition-all duration-300 placeholder:text-lg focus:border-blue-400 focus:ring-blue-300 focus:placeholder:text-sm"
                />
              </div>

              <div className="mx-3 flex flex-col gap-3 md:ms-10 md:w-[85%] lg:gap-5">
                <label className="text-2xl text-slate-700">Password</label>
                <div className="relative">
                  <input
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    placeholder="Type Password"
                    className="custom-placeholder w-full rounded-lg border-2 border-[#CBD5E1] p-5 text-gray-500 placeholder:text-xl focus:border-blue-400 focus:ring-blue-300 focus:placeholder:text-sm"
                  />
                  {passwordVisible ? (
                    <FaEye
                      onClick={handlePasswordVisibility}
                      className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-xl text-gray-500"
                    />
                  ) : (
                    <FaEyeSlash
                      onClick={handlePasswordVisibility}
                      className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-xl text-gray-500"
                    />
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="smd:ms-5 mx-10 mb-10 mt-3 flex w-[95%] cursor-pointer justify-center rounded-lg bg-[#FF6636] p-5 text-lg font-medium text-white hover:bg-[#ff8652] hover:duration-700 md:w-[85%]"
                >
                  {isLoading ? (
                    <BeatLoader
                      style={{ background: "transparent" }}
                      color="#ffffff"
                      size={14}
                    />
                  ) : (
                    "Login"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
