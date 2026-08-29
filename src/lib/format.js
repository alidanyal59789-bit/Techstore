/** Money is formatted in one place so every price in the UI matches. */
const inr = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

export const formatPrice = (amount) => inr.format(amount);

/** "1,284" — review counts and other plain integers. */
export const formatCount = (value) => new Intl.NumberFormat('en-US').format(value);

/** Whole-percent reduction, for the sale badge. */
export const discountPercent = (price, oldPrice) =>
  !oldPrice || oldPrice <= price ? 0 : Math.round((1 - price / oldPrice) * 100);

/** Zero-padded figure number for catalogue plate captions: 1 -> "01". */
export const figureNumber = (index) => String(index + 1).padStart(2, '0');
