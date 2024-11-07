const FormatMoney: (amount?: number) => string = (amount) => {
  if (amount === undefined) {
    return ""; // Or return "0" or any other default value you prefer
  }

  return new Intl.NumberFormat("en-US").format(amount);
};

export default FormatMoney;
