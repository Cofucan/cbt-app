import {createFileRoute} from '@tanstack/react-router'
import {useState} from "react";
import AdminProfile from "../../../admin/Pages/MyAccount/AdminProfile";
import PasswordSettings from "../../../admin/Pages/Modals/MyAccount/PasswordSettings";
import EditProfile from "../../../admin/Pages/Modals/MyAccount/EditProfile";

export const Route = createFileRoute('/admin/_auth/my-account')({
    component: RouteComponent,
})

function RouteComponent() {
    const [passwordModalVisible, setPasswordModalVisible] = useState(false);
    const [editProfileModalVisible, setEditProfileModalVisible] = useState(false);
    const TogglePaaswordVisible = () => {
        setPasswordModalVisible(!passwordModalVisible);
    };
    const ToggleEditProfileVisible = () => {
        setEditProfileModalVisible(!editProfileModalVisible);
    };

    const [userData, setUserData] = useState(null)

    return (
        <section className="">
            <h2 className="text-xl font-bold px-20 pt-20">Profile</h2>
            <div>
                <AdminProfile setUserData={setUserData}/>
            </div>
            <div className="px-20 py-10">
                <button
                    onClick={TogglePaaswordVisible}
                    className="text-lg text-[#5c6168]"
                >
                    Change Password
                </button>
                <button onClick={ToggleEditProfileVisible}
                        className="px-14 py-2 mt-10 flex items-center gap-2 text-white bg-[#ff6636] shadow-md focus:outline-none">
                    Edit Profile
                </button>
            </div>
            {passwordModalVisible && (
                <>
                    <div
                        className="fixed inset-0 bg-black opacity-20 z-10"
                        onClick={TogglePaaswordVisible} // Close if the overlay is clicked
                    ></div>
                    <div className="fixed top-[20%] right-[20%] w-[40vw] z-20">
                        <PasswordSettings close={() => setPasswordModalVisible(false)}/>
                    </div>
                </>
            )}
            {editProfileModalVisible && (
                <>
                    <div
                        className="fixed inset-0 bg-black opacity-20 z-10"
                        onClick={ToggleEditProfileVisible} // Close if the overlay is clicked
                    ></div>
                    <div className="fixed top-[5%] right-[20%] w-[40vw] h-[40vh] z-20">
                        <EditProfile data={userData} close={() => setEditProfileModalVisible(false)}/>
                    </div>
                </>
            )}
        </section>
    );
}
