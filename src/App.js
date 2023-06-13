import { useEffect, useState } from 'react';
import CurrencyRow from './components/CurrencyRow';

const App = () => {
  const [amount1, setAmount1] = useState(1);
  const [amount2, setAmount2] = useState(1);
  const [currency1, setCurrency1] = useState('USD');
  const [currency2, setCurrency2] = useState('EUR');
  const [rates, setRates] = useState([]);

  useEffect(() => {
    fetch(
      `http://data.fixer.io/api/latest?access_key=${process.env.REACT_APP_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => setRates(data.rates));
  }, []);

  useEffect(() => {
    if (!!rates) {
      function init() {
        handleAmountChange1(1);
      }
      init();
    }
  }, [rates]);

  const handleAmountChange1 = (amount1) => {
    setAmount2(format((amount1 * rates[currency2]) / rates[currency1]));
    setAmount1(amount1);
  };

  const handleCurrency1Change = (currency1) => {
    setAmount2(format((amount1 * rates[currency2]) / rates[currency1]));
    setCurrency1(currency1);
  };

  const handleAmountChange2 = (amount2) => {
    setAmount1(format((amount2 * rates[currency1]) / rates[currency2]));
    setAmount2(amount2);
  };

  const handleCurrency2Change = (currency2) => {
    setAmount1(format((amount2 * rates[currency1]) / rates[currency2]));
    setCurrency2(currency2);
  };

  function format(number) {
    return number.toFixed(2);
  }
  return (
    <div>
      <h1>Currency converter</h1>
      <CurrencyRow
        amount={amount1}
        onAmountChange={handleAmountChange1}
        onCurrencyChange={handleCurrency1Change}
        currency={currency1}
        currencies={Object.keys(rates)}
      />
      <div>equals</div>
      <CurrencyRow
        amount={amount2}
        onAmountChange={handleAmountChange2}
        onCurrencyChange={handleCurrency2Change}
        currency={currency2}
        currencies={Object.keys(rates)}
      />
    </div>
  );
};

export default App;
