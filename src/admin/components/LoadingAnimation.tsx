import { BeatLoader } from "react-spinners";
import { ReactNode } from "react";

export interface LoadingAnimationProps {
  children: ReactNode
  loading: boolean
  length?: number
  isRefetching?: boolean
}

function LoadingAnimation(props: LoadingAnimationProps) {
  let { children, loading, length, isRefetching } = props;

  return (
    <>
      {!loading && (
        <>
          {children}
          {!loading && isRefetching && (
            <div className="flex h-auto w-full justify-center">
              <BeatLoader
                style={{ background: "transparent" }}
                color="#FF6636"
                size={24}
              />
            </div>
          )}
        </>
      )}

      {!loading && !isRefetching && (
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
            style={{ background: "transparent" }}
            color="#FF6636"
            size={24}
          />
        </div>
      )}
    </>
  );
}

export default LoadingAnimation;
