import {createFileRoute, useNavigate} from '@tanstack/react-router'
import ImportingImgs from "../../student/Components/ImportingImgs.tsx";
import {useEffect, useState} from "react";
import {getSchoolConfig} from "../../student/api/auth.ts";
import {baseUrl} from "../../lib/utils.ts";

export const Route = createFileRoute('/student/')({
    component: RouteComponent,
})

function RouteComponent() {
    const images = ImportingImgs();
    const navigate = useNavigate();
    const [schoolLogo, setSchoolLogo] = useState(null);

    useEffect(() => {
        const fetchSchoolLogo = async () => {
            try {
                const token = localStorage.getItem("token");
                if (token) {
                    const logoData = await getSchoolConfig(token);
                    const logoPath = logoData?.logo;

                    const logoUrl = logoPath ? `${baseUrl}/media/${logoPath}` : images.mainLogo;
                    setSchoolLogo(logoUrl);

                    console.log("School Logo URL in landingPage:", logoPath);
                } else {
                    console.error("No token found in localStorage");
                }
            } catch (error) {
                console.error("Error fetching school logo:", error);
            }
        };

        fetchSchoolLogo();
    }, []);

    return (
        <section
            className="relative flex items-center justify-center w-full h-screen bg-cover bg-center"
            style={{backgroundImage: `url(${images.bgImgMain})`}}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-5"></div>

            <div className="flex flex-col gap-5 justify-center items-center z-10">
                <div>
                    <img
                        // src={schoolLogo}
                        src={images.enugun}
                        alt="School Logo"
                        className="bg-cover bg-center"
                        width={200}
                    />
                </div>

                <div
                    className="text-center text-white "
                    style={{
                        fontSize: "3rem",
                        fontWeight: "bold",
                        textShadow: "8px 5px 10px rgba(0, 0, 0, 0.8)",
                    }}
                >
                    <h1 className="text-2xl md:text-5xl lg:text-7xl font-bold mb-4 lg:my-8">
                        Welcome to ESUT
                    </h1>
                    <h2 className="text-2xl md:text-5xl lg:text-7xl font-bold mb-8">
                        CBT Portal
                    </h2>

                    <div className="flex justify-center font-semibold">
                        <button
                            onClick={() => navigate({to: "/student/login"})}
                            className="bg-[#FF6636] cursor-pointer flex items-center gap-2 justify-center text-white py-4 px-8 lg:px-10 text-lg md:text-3xl lg:text-3xl"
                        >
                            Proceed To Login
                            <img src={images.arrowRight} alt="Proceed"/>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
