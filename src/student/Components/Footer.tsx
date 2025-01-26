import { useEffect, useState } from "react";
import { getSchoolConfig } from "../api/auth";

const Footer = () => {
  const [schoolName, setSchoolName] = useState("");

  useEffect(() => {
    const fetchSchoolName = async () => {
      try {
        const response = await getSchoolConfig();
        const { name } = response;
        setSchoolName(name);
        console.log("School Name URL in footer:", name);
      } catch (error) {
        console.error("Error fetching school logo:", error);
      }
    };

    fetchSchoolName();
  }, []);

  return (
    <div className="container border-t-2 border-gray-400 bg-white py-5 text-gray-500 lg:text-lg">
      <h1 className="mx-2">
        Copyright @2024{" "}
        <span className="font-bold text-[#ff6636]">{schoolName} CBT</span> by{" "}
        <span className="font-bold text-[#ff6636]">
          {schoolName} ICT Center
        </span>{" "}
        All rights reserved
      </h1>
    </div>
  );
};

export default Footer;
