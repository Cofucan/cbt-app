import React from 'react'
import { BeatLoader } from 'react-spinners';

function LoadingAnimation(props) {

    let {
        children,
        loading,
        length,
        refeching, 
    } = props 

    return (
        <>
            {!loading && (
                <>
                    {children}
                    {(!loading && refeching) && ( 
                        <div className=' w-full h-auto flex justify-center ' >
                            <BeatLoader
                                style={{ background: "trasparent" }}
                                color="#FF6636"
                                size={24}
                            />
                        </div>
                    )}
                </>
            )}

            {(!loading && !refeching) && (
                <> 
                    {length === 0 && (
                        <div className=' w-full h-auto flex text-xl justify-center py-4 ' >
                            <p>No Records Found</p>
                        </div>
                    )}
                </>
            )}
            {loading && (
                <div className=' w-full h-auto flex justify-center ' >
                    <BeatLoader
                        style={{ background: "trasparent" }}
                        color="#FF6636"
                        size={24}
                    />
                </div>
            )}
        </>
    )
}

export default LoadingAnimation
