export default function ReviewForm({ reviews, name }) {
  const hasReviews = reviews && reviews.length > 0;

  return (
    <div className="py-6">
      {" "}
      {!hasReviews ? (
        <div className="text-lg">
          <h2 className="text-2xl text-gray-700 mb-4">
            Be the first to review "{name}"
          </h2>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl text-gray-700 mb-6">
            Customer Reviews ({reviews.length})
          </h2>

          <div className="space-y-6">
            {reviews.map((review, index) => (
              <div
                key={review._id || index}
                className="border-b border-gray-200 pb-6"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 font-semibold text-sm">
                        {review?.userId?.name?.charAt(0)?.toUpperCase() || "U"}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-gray-800">
                        {review?.userId?.name || "Anonymous User"}
                      </h4>
                      <span className="text-gray-500 text-sm">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex gap-1 mb-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={`text-lg ${
                            star <= review?.stars
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>

                    <p className="text-gray-700 leading-relaxed">
                      {review?.comment}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <form>
        <div className="mb-6">
          <label className="block mb-2">
            Your rating <span className="text-red-600">*</span>
          </label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <label key={star} className="cursor-pointer">
                <input
                  type="radio"
                  name="rating"
                  value={star}
                  required
                  className="hidden peer"
                />
                <span className="text-2xl font-bold text-gray-500 peer-checked:text-yellow-400 hover:text-yellow-400">
                  ☆
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block mb-2">
            Your review <span className="text-red-600">*</span>
          </label>
          <textarea
            name="review"
            required
            rows="6"
            className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:border-gray-400"
          />
        </div>

        <button
          type="submit"
          className="bg-yellow-400 font-bold hover:bg-yellow-500 text-gray-800 px-8 py-3 rounded transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
