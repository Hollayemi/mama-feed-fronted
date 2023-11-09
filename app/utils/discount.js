function calculateDiscountedPrice(originalPrice, discountPercentage) {
  if (originalPrice < 0 || discountPercentage < 0 || discountPercentage > 100) {
    // Handle invalid input
    return "Invalid input. Please provide a valid price and discount percentage.";
  }

  const discountAmount = (originalPrice * discountPercentage) / 100;
  const discountedPrice = originalPrice - discountAmount;

  return discountedPrice.toFixed(2);
}

export default calculateDiscountedPrice