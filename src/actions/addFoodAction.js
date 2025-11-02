"use server";

export async function createFoodItem(formData) {
  try {
    // Extract form data
    const title = formData.get("title");
    const price = formData.get("price");
    const weight = formData.get("weight");
    const category = formData.get("category");
    const shortDescription = formData.get("shortDescription");
    const variants = formData.get("variants"); // JSON string
    const fullDescription = formData.get("fullDescription"); // JSON string

    // Handle file uploads
    const thumbnail = formData.get("thumbnail");
    const additionalImages = formData.getAll("additionalImages");

    // Parse JSON fields
    const variantsArray = variants ? JSON.parse(variants) : [];
    const fullDescriptionObj = fullDescription
      ? JSON.parse(fullDescription)
      : {};

    // TODO: Upload images to storage (S3, Cloudinary, etc.)
    // const thumbnailUrl = await uploadImage(thumbnail);
    // const imageUrls = await Promise.all(additionalImages.map(img => uploadImage(img)));

    // TODO: Save to database
    const foodItem = {
      title,
      price: parseFloat(price),
      weight,
      category,
      shortDescription,
      variants: variantsArray,
      fullDescription: fullDescriptionObj,
      // thumbnail: thumbnailUrl,
      // images: imageUrls,
    };

    console.log("Creating food item:", foodItem);

    // Return success response
    return {
      success: true,
      message: "Food item created successfully!",
      data: foodItem,
    };
  } catch (error) {
    console.error("Error creating food item:", error);
    return {
      success: false,
      message: "Failed to create food item. Please try again.",
    };
  }
}
