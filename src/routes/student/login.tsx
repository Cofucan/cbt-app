import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { FormEvent, useEffect, useState } from "react";
import { useAuth } from "../../student/context/AuthProvider.tsx";
import ImportingImgs from "../../student/Components/ImportingImgs.tsx";
import { getSchoolConfig, loginUser } from "../../student/api/auth.ts";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";
import { AxiosError } from "axios";
import { baseUrl } from "../../lib/utils.ts";

export const Route = createFileRoute("/student/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const images = ImportingImgs();
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [loading, setLoading] = useState(false);
  const [schoolLogo, setSchoolLogo] = useState<string>("");

  useEffect(() => {
    const fetchSchoolLogo = async () => {
      try {
        const logoData = await getSchoolConfig();
        const logoPath = logoData?.logo;
        const logoUrl = logoPath
          ? `${baseUrl}/media/${logoPath}`
          : images.mainLogo;
        setSchoolLogo(logoUrl);
        console.log("School Logo URL in loginPage:", logoPath);
      } catch (error) {
        console.error("Error fetching school logo:", error);
      }
    };

    fetchSchoolLogo();
  }, []);

  const { login } = useAuth();

  const { mutate } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      // Save token and user data in local storage
      const token = data.access_token;
      const user = data.student;
      login(token, user);
      localStorage.setItem("token", token);
      localStorage.setItem("student", JSON.stringify(user));
      toast.success("Login Successful!");

      setTimeout(() => {
        navigate({ to: "/student/student-portal" });
      }, 2000);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      console.error("Login failed:", error.response?.data || error.message);
      toast.error(
        error.response?.data?.message || "Login failed. Please try again.",
      );
      setLoading(false);
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!identifier.trim()) {
      toast.error("Please enter a valid exam number.");
      return;
    }

    setLoading(true);

    mutate(
      {
        identifier,
      },
      {
        onSettled: () => {
          setLoading(false);
        },
      },
    );
  };

  return (
    <section className="overflow-hidden">
      <div className="border-b border-[#CBD5E1]">
        <img
          src={schoolLogo}
          // src={images.enugun}
          alt="Logo"
          className="object-cover px-8 py-3"
          width={200}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="h-[92vh] pb-[3px] lg:w-[90%]">
          <img
            src={images.computer_lab}
            alt="Illustration"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="mt-5 flex h-full w-full flex-col items-center justify-center gap-16 lg:mx-5 lg:mt-0 lg:max-w-2xl">
          <div className="flex flex-col items-center gap-5">
            <img
              src={schoolLogo}
              // src={images.enugun}
              alt="Main Logo"
              className="bg-cover object-cover"
              width={300}
            />
            <h2 className="text-2xl font-semibold text-[#13175A]">
              CBT PORTAL
            </h2>
          </div>

          <div className="container mx-auto border border-[#CBD5E1] lg:mx-0">
            <div className="flex flex-col gap-6 lg:w-full lg:gap-8">
              <form className="form" onSubmit={handleSubmit}>
                <div className="mx-3 mt-10 flex flex-col gap-3 md:mx-14 md:w-[85%] lg:gap-5">
                  <label className="text-xl font-medium text-slate-700">
                    Exam Number
                  </label>
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="Enter your exam number here..."
                    className="rounded-lg border-2 border-[#CBD5E1] p-5 transition-all duration-300 placeholder:text-lg focus:border-blue-400 focus:ring-blue-300 focus:placeholder:text-sm"
                  />
                </div>

                <div>
                  <button
                    className="mx-3 mb-10 mt-5 flex w-[93%] cursor-pointer items-center justify-center rounded-lg bg-[#FF6636] p-5 text-lg font-medium text-white transition duration-700 hover:bg-[#ff8652] md:ms-14 md:w-[85%]"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <BeatLoader color="#ffffff" size={14} />
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
