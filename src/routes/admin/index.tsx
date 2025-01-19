import {createFileRoute, useNavigate} from '@tanstack/react-router'
import {useSelector} from "react-redux";
import useAuth from "../../admin/hooks/useAuth.ts";
import {useState} from "react";
import logo from "../../admin/assets/enugun.png";
import saly from "../../admin/assets/esut_computer_lab.jpg";
import {BeatLoader} from "react-spinners";
import {FaEye, FaEyeSlash} from 'react-icons/fa';

export const Route = createFileRoute('/admin/')({
    component: RouteComponent,
})

function RouteComponent() {
    const navigate = useNavigate();
    const {loading} = useSelector((state) => state.user);

    const {isLoading, formik} = useAuth()
    const [passwordVisible, setPasswordVisible] = useState(false);

    const handlePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const Submit = (e) => {
        e.preventDefault()
        formik?.handleSubmit()
    };

    return (
        <section>
            <div className="border-b border-[#CBD5E1] w-full fixed top h-24 flex items-center ">
                <img src={logo} alt="Logo" className="object-cover px-8"/>
            </div>
            <div className="flex h-screen pt-24 w-full">
                <div className="bg-[#EBEBFF] container h-full flex justify-center items-center ">
                    <img src={saly} alt="Logo" className="object-cover"/>
                </div>
                <div
                    className="w-full lg:max-w-2xl lg:mx-10 h-full flex items-center mt-5 lg:mt-0 justify-center overflow-hidden">
                    <div className="border border-[#CBD5E1] mx-2 lg:mx-0 w-full">
                        <div className="text-center py-2">
                            <h1 className="text-2xl font-semibold pb-3">Admin</h1>
                            <h3 className="text-xl font-normal text-gray-500">
                                Welcome Back
                            </h3>
                        </div>
                        <form onSubmit={(e) => Submit(e)} className="lg:w-full flex flex-col gap-6 lg:gap-8">
                            <div className="md:w-[85%] mx-3 md:mx-10 flex flex-col gap-3 lg:gap-5">
                                <label className="text-2xl text-slate-700">Email</label>
                                <input
                                    name="identifier"
                                    onChange={formik.handleChange}
                                    value={formik.values.identifier}
                                    autoComplete="off"
                                    placeholder="Enter your email address"
                                    className="border-2 border-[#CBD5E1] p-5 rounded-lg placeholder:text-lg focus:placeholder:text-sm
                  focus:ring-blue-300 focus:border-blue-400 custom-placeholder transition-all duration-300"
                                />
                            </div>

                            <div className="md:w-[85%] mx-3 md:ms-10 flex flex-col gap-3 lg:gap-5">
                                <label className="text-2xl text-slate-700">Password</label>
                                <div className="relative">
                                    <input
                                        onChange={formik.handleChange}
                                        value={formik.values.password}
                                        type={passwordVisible ? "text" : "password"}
                                        name="password"
                                        placeholder="Type Password"
                                        className="border-2 border-[#CBD5E1] p-5 rounded-lg placeholder:text-xl text-gray-500 focus:placeholder:text-sm custom-placeholder
                 focus:ring-blue-300 focus:border-blue-400 w-full"
                                    />
                                    {passwordVisible ? (
                                        <FaEye
                                            onClick={handlePasswordVisibility}
                                            className="absolute right-3 top-1/2 text-xl  -translate-y-1/2 text-gray-500 cursor-pointer"
                                        />
                                    ) : (
                                        <FaEyeSlash
                                            onClick={handlePasswordVisibility}
                                            className="absolute right-3 top-1/2  text-xl -translate-y-1/2 text-gray-500 cursor-pointer"
                                        />
                                    )}
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="p-5 flex justify-center w-[95%] md:w-[85%] mx-10 mt-3 mb-10 smd:ms-5 rounded-lg cursor-pointer text-white text-lg font-medium bg-[#FF6636] hover:bg-[#ff8652] hover:duration-700"
                                >
                                    {isLoading ? (
                                        <BeatLoader
                                            style={{background: "transparent"}}
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
