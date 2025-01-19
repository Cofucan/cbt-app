import {createFileRoute, useNavigate} from '@tanstack/react-router'
import ImportImgs from "../../../admin/components/ImportImgs";
import AddTestForm from "../../../admin/Pages/NewTestPage/AddTestForm";

export const Route = createFileRoute('/admin/_auth/new-test')({
    component: RouteComponent,
})

function RouteComponent() {
    const navigate = useNavigate();
    const images = ImportImgs();

    return (
        <section className="w-full">
            <div className="py-10 w-[90%] mx-auto">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold">Add New Test</h2>
                    <div className="flex items-center gap-20">
                        <button className="flex items-center gap-5 font-bold text-[#ff6636] bg-[#FFEEE8] px-4 py-2">
                            Download Template
                            <img src={images.DownloadDown} alt="DownloadIcon"/>
                        </button>
                        <button onClick={() => navigate({to: "/admin/test"})}
                                className="px-5 py-2 font-medium flex items-center gap-2 text-white bg-[#ff6636] shadow-md focus:outline-none">
                            Test Manager
                        </button>
                    </div>
                </div>
                <div className="mt-5">
                    <AddTestForm/>
                </div>

            </div>
        </section>
    );
}
