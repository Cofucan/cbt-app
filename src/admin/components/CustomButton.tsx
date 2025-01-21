import React from "react";
import { BeatLoader } from "react-spinners";

export default function CustomButton(props) {
  const { onClick, title, isLoading, type, red, disabled } = props;

  return (
    <button
      type={type ? type : "button"}
      disabled={disabled}
      onClick={onClick} // Attach the handler here
      className={`h-[40px] w-full rounded-lg text-sm text-white ${red || title?.includes("delete") ? "bg-[red] hover:bg-[red]" : "bg-[#FF6636] hover:bg-[#ff8652]"} font-medium hover:duration-700`}
    >
      {isLoading ? (
        <BeatLoader
          style={{ background: "transparent" }}
          color="#ffffff"
          size={14}
        />
      ) : (
        title
      )}
    </button>
  );
}
