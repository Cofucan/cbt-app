import {createFileRoute, useNavigate} from '@tanstack/react-router'
import {useContext, useEffect, useState} from "react";
import AuthContext from "../../student/context/AuthProvider.tsx";
import ImportingImgs from "../../student/Components/ImportingImgs.tsx";
import {getSchoolConfig, loginUser} from "../../student/api/auth.ts";
import {baseUrl} from "../../lib/utils.ts";
import {useMutation} from "@tanstack/react-query";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";

export const Route = createFileRoute('/student/login')({
    component: RouteComponent,
})

function RouteComponent() {

    const {setAuth, auth} = useContext(AuthContext)

    const images = ImportingImgs();
    const navigate = useNavigate();
    const [identifier, setIdentifier] = useState("");
    const [loading, setLoading] = useState(false);

    const [schoolLogo, setSchoolLogo] = useState(null);

    useEffect(() => {
        const fetchSchoolLogo = async () => {
            try {
                const logoData = await getSchoolConfig();
                const logoPath = logoData?.logo;

                const logoUrl = logoPath
                    ? `${baseUrl}/media/${logoPath}`
                    : images.mainLogo;
                setSchoolLogo(logoUrl);

            } catch (error) {
                console.error("Error fetching school logo:", error);
            }
        };

        fetchSchoolLogo();
    }, []);


    const {login} = useContext(AuthContext); // import the login function

    const {mutate} = useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            // Save token and user data in local storage
            const token = data.access_token;
            const user = data.student;

            // Call login from AuthContext to set auth state
            login(token, user);

            localStorage.setItem("token", token);
            localStorage.setItem("student", JSON.stringify(user));
            toast.success("Login Successful!");

            // Redirect to the student portal after a short delay
            setTimeout(() => {
                navigate({to: "/student/student-portal"});
            }, 2000);
        },
        onError: (error) => {
            console.error("Login failed:", error.response?.data || error.message);
            toast.error(
                error.response?.data?.message || "Login failed. Please try again."
            );
            setLoading(false);
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!identifier.trim()) {
            toast.error("Please enter a valid exam number.");
            return;
        }

        setLoading(true); // Start loading

        // Call the mutation function with the identifier
        mutate(
            {identifier},
            {
                onSettled: () => {
                    setLoading(false);
                },
            }
        );
    };

    return (
        <section className="overflow-hidden">
            <div className="border-b border-[#CBD5E1]">
                <img
                    // src={schoolLogo}
                    src={images.enugun}
                    alt="Logo"
                    className="object-cover px-8 py-3"
                    // width={120}
                    width={200}
                />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="lg:w-[90%] h-[92vh] pb-[3px]">
                    <img
                        src={images.computer_lab}
                        alt="Illustration"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div
                    className="w-full flex flex-col justify-center gap-16 items-center lg:max-w-2xl lg:mx-5 h-full mt-5 lg:mt-0">
                    <div className="flex flex-col items-center gap-5">
                        <img
                            // src={schoolLogo}
                            src={images.enugun}
                            alt="Main Logo"
                            className="bg-cover object-cover"
                            // width={150}
                            width={300}
                        />
                        <h2 className="text-2xl text-[#13175A] font-semibold">
                            CBT PORTAL
                        </h2>
                    </div>

                    <div className="border border-[#CBD5E1] mx-auto lg:mx-0 container">
                        <div className="lg:w-full flex flex-col gap-6 lg:gap-8">
                            <form className="form" onSubmit={handleSubmit}>
                                <div className="md:w-[85%] mx-3 md:mx-14 flex flex-col gap-3 lg:gap-5 mt-10">
                                    <label className="text-xl text-slate-700 font-medium">
                                        Exam Number
                                    </label>
                                    <input
                                        type="text"
                                        value={identifier}
                                        onChange={(e) => setIdentifier(e.target.value)}
                                        placeholder="Enter your exam number here..."
                                        className="border-2 border-[#CBD5E1] p-5 rounded-lg placeholder:text-lg
                      focus:placeholder:text-sm focus:ring-blue-300 focus:border-blue-400 transition-all duration-300"
                                    />
                                </div>

                                <div>
                                    <button
                                        className="p-5 flex justify-center items-center w-[93%] md:w-[85%] mx-3 mt-5 mb-10 md:ms-14 rounded-lg
                    cursor-pointer text-white text-lg font-medium bg-[#FF6636] hover:bg-[#ff8652] transition duration-700"
                                        type="submit"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <BeatLoader color="#ffffff" size={14}/>
                                            </>
                                        ) : (
                                            "Login"
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
