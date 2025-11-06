const AdditionalInfo = ({ variants, weight }) => {
  return (
    <div>
      <div className="bg-white rounded-lg !text-xl border border-gray-200 p-6 max-w-sm my-6">
        <div className="space-y-4">
          {/* Size Selection */}
          <div className="space-y-3">
            <span className="text-gray-600 font-medium block">Variation</span>
            <div className="flex flex-wrap gap-2">
              {variants?.map((variant, idx) => (
                <button
                  key={idx}
                  className={`px-3 py-2 rounded-lg border transition-colors 
                      bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200`}
                >
                  {variant}
                </button>
              ))}
            </div>
          </div>

          {/* Weight Display */}
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Weight</span>
            <span className="text-gray-700 font-semibold">{weight}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfo;
