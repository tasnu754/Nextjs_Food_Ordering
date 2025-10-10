const apiUrl = process.env.API_BASE_URL;

export async function getCategories() {
  try {
    const response = await fetch(`${apiUrl}/categories`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (err) {
    console.error("Error fetching categories:", err);
    return getFallbackCategories();
  }
}

function getFallbackCategories() {
  return [
    {
      id: 1,
      name: "BURGERS",
      image: "/burger.png",
      link: "/menu/burgers",
    },
    {
      id: 2,
      name: "PIZZAS",
      image: "/pizza.png",
      link: "/menu/pizzas",
    },
    {
      id: 3,
      name: "DESSERTS",
      image: "/dessert.png",
      link: "/menu/desserts",
    },
    {
      id: 4,
      name: "SALADS",
      image: "/salad.png",
      link: "/menu/salads",
    },
    {
      id: 5,
      name: "FRIES",
      image: "/fries.png",
      link: "/menu/fries",
    },
  ];
}
