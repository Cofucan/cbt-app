import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import useGetSettings from "../../../../admin/hooks/getData/useGetSettings";
import LoadingAnimation from "../../../../admin/components/loadingAnimation";
import SettingForm from "../../../../admin/Pages/SettingPage/settingForm";
import SettingUpdated from "../../../../admin/Pages/Modals/SettingUpdated";

export const Route = createFileRoute("/admin/_auth/settings/")({
  component: RouteComponent
});

function RouteComponent() {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading } = useGetSettings();

  const ToggleSettingsUpdatedOpen = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <section>
      <div className="w-[50%] ml-20 p-8 rounded">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold">Settings</h2>
          <button onClick={() => navigate({ to: "/admin/settings/activity-log" })}
                  className="bg-[#ff6636] rounded text-white px-4 py-2">
            View Activity Logs
          </button>
        </div>

        {/* Form Section */}
        <div className="border-t  bg-white border-gray-200 p-6">
          <LoadingAnimation loading={isLoading}>
            <SettingForm data={data} loading={isLoading} />
          </LoadingAnimation>
        </div>
      </div>
      {/*settingUpdated */}
      {isModalOpen && (
        <>
          <div
            onClick={ToggleSettingsUpdatedOpen}
            className="fixed inset-0 bg-black opacity-20 z-10"
          ></div>
          <div className="absolute top-[70%] left-[40%] z-20">
            <SettingUpdated ToggleSettingsUpdatedOpen={ToggleSettingsUpdatedOpen} />
          </div>
        </>
      )}
    </section>
  );
}
