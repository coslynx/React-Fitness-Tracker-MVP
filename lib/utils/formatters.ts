import moment from 'moment';

// Format a date string to "MMMM Do YYYY" (e.g., January 1st 2024)
export const formatDate = (dateString: string): string => {
  if (!dateString) {
    return '';
  }
  return moment(dateString).format('MMMM Do YYYY');
};

// Format a number with commas as separators (e.g., 1000000 -> 1,000,000)
export const formatNumber = (number: number): string => {
  return number.toLocaleString();
};

// Format a currency value (e.g., 12.34 -> $12.34, 1000 -> €1,000)
export const formatCurrency = (amount: number, currencyCode: string = 'USD'): string => {
  return amount.toLocaleString(undefined, { style: 'currency', currency: currencyCode });
};