import React from "react";

const AdditionalInfo = () => {
  return (
    <div>
      <div className="bg-white rounded-lg border !text-2xl border-gray-200 p-6 max-w-sm !my-6">
        <div className="space-y-4">
          {/* Color Row */}
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Size</span>
            <span className="text-gray-700 font-semibold">Regular</span>
          </div>

          {/* Weight Row */}
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Weight</span>
            <span className="text-gray-700 font-semibold">430G</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfo;
