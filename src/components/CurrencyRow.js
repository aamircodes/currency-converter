const CurrencyRow = ({
  amount,
  currency,
  currencies,
  onAmountChange,
  onCurrencyChange,
}) => {
  return (
    <>
      <input
        type='number'
        value={amount}
        onChange={(e) => onAmountChange(e.target.value)}
      />
      <select
        value={currency}
        onChange={(e) => onCurrencyChange(e.target.value)}
      >
        {currencies.map((currency) => {
          return (
            <option value={currency} key={currency}>
              {currency}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default CurrencyRow;
