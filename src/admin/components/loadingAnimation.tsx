import React from "react";
import { BeatLoader } from "react-spinners";

function LoadingAnimation(props) {
  let { children, loading, length, refeching } = props;

  return (
    <>
      {!loading && (
        <>
          {children}
          {!loading && refeching && (
            <div className="flex h-auto w-full justify-center">
              <BeatLoader
                style={{ background: "trasparent" }}
                color="#FF6636"
                size={24}
              />
            </div>
          )}
        </>
      )}

      {!loading && !refeching && (
        <>
          {length === 0 && (
            <div className="flex h-auto w-full justify-center py-4 text-xl">
              <p>No Records Found</p>
            </div>
          )}
        </>
      )}
      {loading && (
        <div className="flex h-auto w-full justify-center">
          <BeatLoader
            style={{ background: "trasparent" }}
            color="#FF6636"
            size={24}
          />
        </div>
      )}
    </>
  );
}

export default LoadingAnimation;
