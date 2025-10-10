import SingleCart from "./SingleCart";

const MenuFilterCards = () => {
  return (
    <div className=" container bg-gray-100 py-12 px-4">
      <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <SingleCart></SingleCart>
        <SingleCart></SingleCart>
        <SingleCart></SingleCart>
        <SingleCart></SingleCart>
      </div>
    </div>
  );
};

export default MenuFilterCards;
