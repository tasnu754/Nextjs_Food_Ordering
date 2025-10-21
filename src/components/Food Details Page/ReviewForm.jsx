// app/actions/reviewActions.js
// 'use server'

// export async function submitReview(formData) {
//   const rating = formData.get('rating');
//   const review = formData.get('review');
//   const name = formData.get('name');
//   const email = formData.get('email');
//   const saveInfo = formData.get('saveInfo');

//   // Validate required fields
//   if (!rating || !review || !name || !email) {
//     return {
//       success: false,
//       message: 'Please fill in all required fields'
//     };
//   }

//   // Here you would typically save to a database
//   // For now, we'll just log the data
//   console.log('Review submission:', {
//     rating,
//     review,
//     name,
//     email,
//     saveInfo: saveInfo === 'on'
//   });

//   // Simulate database save
//   // await db.reviews.create({ rating, review, name, email });

//   return {
//     success: true,
//     message: 'Review submitted successfully!'
//   };
// }

export default function ReviewForm() {
  return (
    <div className="py-6 text-lg">
      <h2 className="text-2xl text-gray-700 mb-4">
        Be the first to review "Classical Burger"
      </h2>

      <form
      //   action={submitReview}
      >
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
                <span className="text-2xl font-bold  text-gray-500 peer-checked:text-yellow-400 hover:text-yellow-400">
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
          className="bg-yellow-400 font-bold  hover:bg-yellow-500 text-gray-800  px-8 py-3 rounded transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
