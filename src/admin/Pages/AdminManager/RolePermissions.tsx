import React, { useState } from "react";
import ImportImgs from "../../components/ImportImgs";

const rolesData = {
  "Super Admin": [
    "Can manage bets",
    "Can view user wallets",
    "Can approve transactions",
    "Can manage withdrawals",
    "Can view and edit revenue",
    "Can suspend users",
    "Can manage roles",
    "Can access audit logs",
    "Can issue refunds",
    "Can manage content",
  ],
  Admins: [
    "Can manage bets",
    "Can view user wallets",
    "Can approve transactions",
    "Can manage withdrawals",
    "Can suspend users",
    "Can manage roles",
  ],
  "Customer Service": [
    "Can view user wallets",
    "Can approve transactions",
    "Can suspend users",
    "Can issue refunds",
  ],
};

const RolePermissions = () => {
  const images = ImportImgs();
  const [activeRole, setActiveRole] = useState("Super Admin");
  const [switchStates, setSwitchStates] = useState(
    rolesData[activeRole].reduce((acc, permission) => {
      acc[permission] = true; // All switches initially set to true
      return acc;
    }, {}),
  );

  const handleRoleChange = (role) => {
    setActiveRole(role);
    setSwitchStates(
      rolesData[role].reduce((acc, permission) => {
        acc[permission] = true; // Reset switch states when role changes
        return acc;
      }, {}),
    );
  };

  const toggleSwitch = (permission) => {
    setSwitchStates({
      ...switchStates,
      [permission]: !switchStates[permission],
    });
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar Navigation */}
      <div className="px-4">
        <div className="border-2 bg-white p-1">
          <ul>
            {Object.keys(rolesData).map((role) => (
              <li
                key={role}
                className={`cursor-pointer border-b px-4 py-2 text-lg ${
                  activeRole === role ? "bg-[#ff6636] text-white" : "text-black"
                }`}
                onClick={() => handleRoleChange(role)}
              >
                {role}
                <p className="mt-1 text-sm text-gray-300">
                  {role === "Super Admin" && "Full access, control"}
                  {role === "Admins" && "Moderate access control"}
                  {role === "Customer Service" && "Support-focused access"}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Permissions Section */}
      <div className="w-3/4 border-2 bg-white px-6 py-4">
        <div className="border-b-2 pb-2">
          <h2 className="text-xl font-semibold">Permissions</h2>
          <p className="text-gray-600">
            See the list of permissions for this role
          </p>
        </div>

        <div className="mt-4">
          {rolesData[activeRole].map((permission) => (
            <div
              key={permission}
              className="mb-4 flex items-center justify-between"
            >
              <span className="text-[#525252]">{permission}</span>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={switchStates[permission]}
                  onChange={() => toggleSwitch(permission)}
                />

                <div className="relative h-6 w-11 rounded-full bg-gray-200">
                  {/* Conditionally render the image based on switch state */}
                  {switchStates[permission] ? (
                    <img
                      src={images.switchOn}
                      alt="Switch On"
                      className="absolute inset-0"
                    />
                  ) : (
                    <img
                      src={images.switchOff}
                      alt="Switch Off"
                      className="absolute inset-0"
                    />
                  )}

                  {/* The dot inside the toggle switch */}
                  <span
                    className={`dot absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition ${
                      switchStates[permission] ? "translate-x-6" : ""
                    }`}
                  ></span>
                </div>
              </label>
            </div>
          ))}
        </div>

        <button className="mt-6 rounded-lg bg-[#ff6636] px-6 py-3 font-semibold text-white hover:bg-orange-600">
          Save Preferences
        </button>
      </div>
    </div>
  );
};

export default RolePermissions;
