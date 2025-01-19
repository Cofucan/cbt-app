import { createFileRoute } from '@tanstack/react-router'
import ImportImgs from "../../../../admin/components/ImportImgs";
import {useState} from "react";
import ShareResultModal from "../../../../admin/Pages/Modals/ResultManagerModal/ShareResultModal";
import StudentResultList from "../../../../admin/Pages/ResultManager/StudentResultList";

export const Route = createFileRoute('/admin/_auth/result/view-result')({
  component: RouteComponent,
})

function RouteComponent() {
    const images = ImportImgs();
    const [shareResultModal, setShareResultModal] = useState(false);

    const openShareResultModal = () => {
      setShareResultModal(true);
    };
    const closeShareResultModal = () => {
      setShareResultModal(false);
    };
    return (
        <section>
          <div className="w-[90%] p-10 h-full py-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={images.arrowleft} alt="arrow-left" />
                <h2 className="text-xl font-semibold">View Result</h2>
              </div>
              <div className="flex items-center gap-5 ">
                <button className="px-10 py-2 flex items-center font-semibold gap-2 text-[#ff6636] bg-[#FFEEE8] shadow-md focus:outline-none">
                  Sort
                </button>
                <button onClick={openShareResultModal} className="px-10 py-2 flex font-semibold items-center gap-2 text-white bg-[#ff6636] shadow-md focus:outline-none">
                  Send
                </button>
              </div>
            </div>

            {/* share result modal */}
            {shareResultModal && (
                <ShareResultModal closeShareResultModal={closeShareResultModal}/>
            )}

            {/*Student Result Listed */}
            <div>
              <StudentResultList />
            </div>
          </div>
        </section>
    );
  };

