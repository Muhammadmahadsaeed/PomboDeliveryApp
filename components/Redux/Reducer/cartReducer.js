const cartItems = (cart = [], action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return [...cart, action.payload];
    case 'REMOVE_FROM_CART':
      return cart.filter((cartItem) => cartItem.productId !== action.payload.productId);

    case 'REMOVE_ALL_CART':
      return [];
  }
  return cart;
};

export default cartItems;
