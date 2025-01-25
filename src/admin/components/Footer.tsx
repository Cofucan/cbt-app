import useGetSettings from "../hooks/getData/useGetSettings.ts";

const Footer = () => {
  const { data } = useGetSettings();

  return (
    <div className="w-full border-t-2 border-gray-400 bg-white py-5 text-lg text-gray-500">
      <h1 className="mx-2">
        Copyright @2024{" "}
        <span className="font-bold text-[#ff6636]">{data?.name}</span> by{" "}
        <span className="font-bold text-[#ff6636]">{data?.name} ICT Center</span> All
        rights reserved
      </h1>
    </div>
  );
};

export default Footer;
