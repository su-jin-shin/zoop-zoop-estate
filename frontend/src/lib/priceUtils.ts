
export const formatPrice = (price: number | string): string => {
  const numPrice = typeof price === 'string' ? parseInt(price) : price;
  
  if (isNaN(numPrice)) return '';
  
  if (numPrice >= 10000) {
    const eok = Math.floor(numPrice / 10000);
    const remainder = numPrice % 10000;
    
    if (remainder === 0) {
      return `${eok}억`;
    } else {
      return `${eok}억 ${remainder}만원`;
    }
  } else {
    return `${numPrice}만원`;
  }
};

export const formatPriceInput = (input: string): string => {
  if (!input || input.trim() === '') return '';
  
  const numValue = parseInt(input);
  if (isNaN(numValue)) return '';
  
  return formatPrice(numValue);
};
