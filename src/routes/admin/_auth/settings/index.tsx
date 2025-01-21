import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import useGetSettings from "../../../../admin/hooks/getData/useGetSettings";
import LoadingAnimation from "../../../../admin/components/loadingAnimation";
import SettingForm from "../../../../admin/Pages/SettingPage/settingForm";
import SettingUpdated from "../../../../admin/Pages/Modals/SettingUpdated";

export const Route = createFileRoute("/admin/_auth/settings/")({
  component: RouteComponent,
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
      <div className="ml-20 w-[50%] rounded p-8">
        {/* Header Section */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Settings</h2>
          <button
            onClick={() => navigate({ to: "/admin/settings/activity-log" })}
            className="rounded bg-[#ff6636] px-4 py-2 text-white"
          >
            View Activity Logs
          </button>
        </div>

        {/* Form Section */}
        <div className="border-t border-gray-200 bg-white p-6">
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
            className="fixed inset-0 z-10 bg-black opacity-20"
          ></div>
          <div className="absolute left-[40%] top-[70%] z-20">
            <SettingUpdated
              ToggleSettingsUpdatedOpen={ToggleSettingsUpdatedOpen}
            />
          </div>
        </>
      )}
    </section>
  );
}
