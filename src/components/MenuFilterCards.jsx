import SingleCart from "./SingleCart";

const MenuFilterCards = () => {
  return (
    <div className=" container bg-gray-100 py-12 px-4">
      <div className=" grid grid-cols-4">
        <SingleCart></SingleCart>
        <SingleCart></SingleCart>
        <SingleCart></SingleCart>
        <SingleCart></SingleCart>
      </div>
    </div>
  );
};

export default MenuFilterCards;
