// export default function ReviewForm({ reviews, name }) {
//   const hasReviews = reviews && reviews.length > 0;

//   return (
//     <div className="py-6">
//       {" "}
//       {!hasReviews ? (
//         <div className="text-lg">
//           <h2 className="text-2xl text-gray-700 mb-4">
//             Be the first to review "{name}"
//           </h2>
//         </div>
//       ) : (
//         <div>
//           <h2 className="text-2xl text-gray-700 mb-6">
//             Customer Reviews ({reviews.length})
//           </h2>

//           <div className="space-y-6">
//             {reviews.map((review, index) => (
//               <div
//                 key={review._id || index}
//                 className="border-b border-gray-200 pb-6"
//               >
//                 <div className="flex items-start gap-4">
//                   <div className="flex-shrink-0">
//                     <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
//                       <span className="text-gray-600 font-semibold text-sm">
//                         {review?.userId?.name?.charAt(0)?.toUpperCase() || "U"}
//                       </span>
//                     </div>
//                   </div>

//                   <div className="flex-1">
//                     <div className="flex items-center gap-2 mb-2">
//                       <h4 className="font-semibold text-gray-800">
//                         {review?.userId?.name || "Anonymous User"}
//                       </h4>
//                       <span className="text-gray-500 text-sm">
//                         {new Date(review.createdAt).toLocaleDateString()}
//                       </span>
//                     </div>

//                     <div className="flex gap-1 mb-3">
//                       {[1, 2, 3, 4, 5].map((star) => (
//                         <span
//                           key={star}
//                           className={`text-lg ${
//                             star <= review?.stars
//                               ? "text-yellow-400"
//                               : "text-gray-300"
//                           }`}
//                         >
//                           ★
//                         </span>
//                       ))}
//                     </div>

//                     <p className="text-gray-700 leading-relaxed">
//                       {review?.comment}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//       <form>
//         <div className="mb-6">
//           <label className="block mb-2">
//             Your rating <span className="text-red-600">*</span>
//           </label>
//           <div className="flex gap-1">
//             {[1, 2, 3, 4, 5].map((star) => (
//               <label key={star} className="cursor-pointer">
//                 <input
//                   type="radio"
//                   name="rating"
//                   value={star}
//                   required
//                   className="hidden peer"
//                 />
//                 <span className="text-2xl font-bold text-gray-500 peer-checked:text-yellow-400 hover:text-yellow-400">
//                   ☆
//                 </span>
//               </label>
//             ))}
//           </div>
//         </div>

//         <div className="mb-6">
//           <label className="block mb-2">
//             Your review <span className="text-red-600">*</span>
//           </label>
//           <textarea
//             name="review"
//             required
//             rows="6"
//             className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:border-gray-400"
//           />
//         </div>

//         <button
//           type="submit"
//           className="bg-yellow-400 font-bold hover:bg-yellow-500 text-gray-800 px-8 py-3 rounded transition-colors"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import {
  useAddReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
  useGetUserReviewQuery,
  useCanUserReviewQuery,
} from "@/redux/features/reviewApi";
import { useAuth } from "@/hooks/useAuth";
import Swal from "sweetalert2";
import { Trash2, Edit2 } from "lucide-react";

export default function ReviewForm({ reviews, name, foodItemId }) {
  const { isAuthenticated, user } = useAuth();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingReviewId, setEditingReviewId] = useState(null);

  const { data: userReviewData } = useGetUserReviewQuery(foodItemId, {
    skip: !isAuthenticated || !foodItemId,
  });

  const { data: canReviewData } = useCanUserReviewQuery(foodItemId, {
    skip: !isAuthenticated || !foodItemId,
  });

  const [addReview, { isLoading: isAdding }] = useAddReviewMutation();
  const [updateReview, { isLoading: isUpdating }] = useUpdateReviewMutation();
  const [deleteReview, { isLoading: isDeleting }] = useDeleteReviewMutation();

  const hasReviews = reviews && reviews.length > 0;
  const userReview = userReviewData?.data?.review;
  const hasReviewed = userReviewData?.data?.hasReviewed;
  const canReview = canReviewData?.data?.canReview;
  const hasOrdered = canReviewData?.data?.hasOrdered;

  // Load user's existing review for editing
  useEffect(() => {
    if (userReview && !isEditing) {
      setRating(userReview.stars);
      setComment(userReview.comment);
      setEditingReviewId(userReview._id);
    }
  }, [userReview, isEditing]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to submit a review",
        confirmButtonColor: "#AE3433",
      });
      return;
    }

    if (rating === 0) {
      Swal.fire({
        icon: "warning",
        title: "Rating Required",
        text: "Please select a rating",
        confirmButtonColor: "#AE3433",
      });
      return;
    }

    if (!comment.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Review Required",
        text: "Please write a review",
        confirmButtonColor: "#AE3433",
      });
      return;
    }

    try {
      if (hasReviewed && editingReviewId) {
        // Update existing review
        await updateReview({
          foodItemId,
          reviewId: editingReviewId,
          stars: rating,
          comment: comment.trim(),
        }).unwrap();

        Swal.fire({
          icon: "success",
          title: "Review Updated!",
          text: "Your review has been updated successfully",
          confirmButtonColor: "#AE3433",
          timer: 2000,
          showConfirmButton: false,
        });

        setIsEditing(false);
      } else {
        // Add new review
        await addReview({
          foodItemId,
          stars: rating,
          comment: comment.trim(),
        }).unwrap();

        Swal.fire({
          icon: "success",
          title: "Review Submitted!",
          text: "Thank you for your review",
          confirmButtonColor: "#AE3433",
          timer: 2000,
          showConfirmButton: false,
        });

        // Reset form
        setRating(0);
        setComment("");
      }
    } catch (error) {
      console.error("Review error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.data?.message || "Failed to submit review",
        confirmButtonColor: "#AE3433",
      });
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    if (userReview) {
      setRating(userReview.stars);
      setComment(userReview.comment);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    if (userReview) {
      setRating(userReview.stars);
      setComment(userReview.comment);
    }
  };

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Delete Review?",
      text: "Are you sure you want to delete your review? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#AE3433",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await deleteReview({
          foodItemId,
          reviewId: editingReviewId,
        }).unwrap();

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Your review has been deleted",
          confirmButtonColor: "#AE3433",
          timer: 2000,
          showConfirmButton: false,
        });

        // Reset form
        setRating(0);
        setComment("");
        setEditingReviewId(null);
        setIsEditing(false);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to delete review",
          confirmButtonColor: "#AE3433",
        });
      }
    }
  };

  return (
    <div className="py-6">
      {/* Display existing reviews */}
      {!hasReviews ? (
        <div className="text-lg mb-8">
          <h2 className="text-2xl text-gray-700 mb-4">
            Be the first to review "{name}"
          </h2>
        </div>
      ) : (
        <div className="mb-8">
          <h2 className="text-2xl text-gray-700 mb-6">
            Customer Reviews ({reviews.length})
          </h2>

          <div className="space-y-6">
            {reviews.map((review, index) => {
              const isCurrentUserReview =
                user && review?.userId?._id === user?._id;

              return (
                <div
                  key={review._id || index}
                  className="border-b border-gray-200 pb-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-[#AE3433] rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {review?.userId?.name?.charAt(0)?.toUpperCase() ||
                            "U"}
                        </span>
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-gray-800">
                            {review?.userId?.name || "Anonymous User"}
                          </h4>
                          {isCurrentUserReview && (
                            <span className="text-xs bg-[#C9983C] text-white px-2 py-1 rounded">
                              Your Review
                            </span>
                          )}
                        </div>
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
                                ? "text-[#C9983C]"
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

                      {/* Edit/Delete buttons for user's own review */}
                      {isCurrentUserReview && !isEditing && (
                        <div className="flex gap-2 mt-3">
                          <button
                            onClick={handleEdit}
                            className="text-[#AE3433] hover:text-[#5E0208] text-sm font-semibold flex items-center gap-1"
                          >
                            <Edit2 size={14} />
                            Edit
                          </button>
                          <button
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="text-red-600 hover:text-red-700 text-sm font-semibold flex items-center gap-1"
                          >
                            <Trash2 size={14} />
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Review Form */}
      {isAuthenticated ? (
        <>
          {!hasOrdered ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <p className="text-yellow-800">
                You can only review items you have ordered and received.
              </p>
            </div>
          ) : hasReviewed && !isEditing ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-green-800">
                You have already reviewed this item. Click "Edit" above to
                update your review.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {isEditing ? "Edit Your Review" : "Write a Review"}
              </h3>

              <div className="mb-6">
                <label className="block mb-2 font-semibold text-gray-700">
                  Your rating <span className="text-red-600">*</span>
                </label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="focus:outline-none"
                    >
                      <span
                        className={`text-3xl transition-colors ${
                          star <= (hoverRating || rating)
                            ? "text-[#C9983C]"
                            : "text-gray-300"
                        }`}
                      >
                        ★
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block mb-2 font-semibold text-gray-700">
                  Your review <span className="text-red-600">*</span>
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                  rows="6"
                  placeholder="Share your experience with this item..."
                  className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:border-[#AE3433] focus:ring-1 focus:ring-[#AE3433]"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={isAdding || isUpdating}
                  className="bg-[#C9983C] font-bold hover:bg-[#b8872d] disabled:bg-gray-400 text-white px-8 py-3 rounded transition-colors"
                >
                  {isAdding || isUpdating
                    ? "Submitting..."
                    : isEditing
                    ? "Update Review"
                    : "Submit Review"}
                </button>

                {isEditing && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="bg-gray-200 font-bold hover:bg-gray-300 text-gray-700 px-8 py-3 rounded transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          )}
        </>
      ) : (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-800">
            Please{" "}
            <a href="/login" className="font-semibold underline">
              login
            </a>{" "}
            to write a review.
          </p>
        </div>
      )}
    </div>
  );
}
