import CartItemQuantity from "./CartItemQuantity";
import RemoveFromCart from "./RemoveFromCart";

const CartItem = ({ item }) => {
  return (
    <div className="bg-white rounded-2xl p-3 shadow-sm flex gap-3">
      {/* Image */}
      <div className="w-24 h-24 bg-gray-100 rounded-xl flex-shrink-0 overflow-hidden">
        <div className="w-full h-full flex items-center justify-center text-4xl">
          {item.image}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between py-1">
        <div>
          <h3 className="font-semibold text-base leading-tight">{item.name}</h3>
          <p className="text-gray-500 text-sm">{item.description}</p>
        </div>
        <p className="font-bold text-lg">${item.price.toFixed(2)}</p>
      </div>

      {/* Actions */}
      <div className="flex flex-col justify-between items-end py-1">
        <RemoveFromCart itemId={item.id} />
        <CartItemQuantity initialQuantity={item.quantity} itemId={item.id} />
      </div>
    </div>
  );
};

export default CartItem;
