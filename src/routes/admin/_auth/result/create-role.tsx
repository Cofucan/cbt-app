import {createFileRoute} from '@tanstack/react-router'
import ImportImgs from "../../../../admin/components/ImportImgs";

export const Route = createFileRoute('/admin/_auth/result/create-role')({
    component: RouteComponent,
})

function RouteComponent() {
    const images = ImportImgs();
    return (
        <section>
            <div className="w-[95%] mx-auto h-full py-10">
                <div className='flex items-center gap-'>
                    <img src={images.arrowleft} alt='Arrow-left'/>
                    <h2 className="text-2xl font-semibold">Create New Role</h2>
                </div>
                <div>
                </div>
            </div>
        </section>
    )
}
