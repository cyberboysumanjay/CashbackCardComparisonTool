import React, { useState, useEffect } from 'react';
import './style.css';

const cards = [
  {
    name: 'SBI Cashback Credit Card',
    cashbackRates: {
      education: 0.00,
      fuel: 0.0,
      jewellery: 0.0,
      govtPayments: 0.01,
      insurance: 0.00,
      offlineSpends: 0.01,
      onlineSpends: 0.05,
      rent: 0.0,
      utilities: 0.0,
      walletLoads: 0.0,
    },
  },
  {
    name: 'Axis Ace Credit Card',
    cashbackRates: {
      education: 0.02,
      fuel: 0.0,
      jewellery: 0.0,
      govtPayments: 0.02,
      insurance: 0.0,
      offlineSpends: 0.02,
      onlineSpends: 0.02,
      rent: 0.00,
      utilities: 0.05,
      walletLoads: 0.00,
    },
  },
  {
    name: 'HDFC Millennia Credit Card',
    cashbackRates: {
      education: 0.01,
      fuel: 0.0,
      jewellery: 0.01,
      govtPayments: 0.0,
      insurance: 0.01,
      offlineSpends: 0.01,
      onlineSpends: 0.01,
      rent: 0.00,
      utilities: 0.01,
      walletLoads: 0.01,
    },
  },
  {
    name: 'Amazon Pay ICICI Credit Card',
    cashbackRates: {
      education: 0.01,
      fuel: 0.0,
      jewellery: 0.01,
      govtPayments: 0.01,
      insurance: 0.02,
      offlineSpends: 0.01,
      onlineSpends: 0.01,
      rent: 0.01,
      utilities: 0.02,
      walletLoads: 0.01,
    },
  }, {
    name: 'Flipkart Axis Credit Card',
    cashbackRates: {
      education: 0.0,
      fuel: 0.0,
      jewellery: 0.0,
      govtPayments: 0.015,
      insurance: 0.0,
      offlineSpends: 0.015,
      onlineSpends: 0.015,
      rent: 0.0,
      utilities: 0.0,
      walletLoads: 0.0,
    },
  }, {
    name: 'Airtel Axis Credit Card',
    cashbackRates: {
      education: 0.01,
      fuel: 0.0,
      jewellery: 0.00,
      govtPayments: 0.01,
      insurance: 0.01,
      offlineSpends: 0.01,
      onlineSpends: 0.01,
      rent: 0.0,
      utilities: 0.1,
      walletLoads: 0.0,
    },
  }, {
    name: 'Tata Neu Infinity Credit Card',
    cashbackRates: {
      education: 0.015,
      fuel: 0.0,
      jewellery: 0.015,
      govtPayments: 0.0,
      insurance: 0.015,
      offlineSpends: 0.015,
      onlineSpends: 0.015,
      rent: 0.0,
      utilities: 0.015,
      walletLoads: 0.0,
    },
  }, {
    name: 'Standard Chartered Smart Credit Card',
    cashbackRates: {
      education: 0.02,
      fuel: 0.0,
      jewellery: 0.02,
      govtPayments: 0.02,
      insurance: 0.02,
      offlineSpends: 0.01,
      onlineSpends: 0.02,
      rent: 0.02,
      utilities: 0.02,
      walletLoads: 0.02,
    }
  }, {
    name: 'HDFC Swiggy Credit Card',
    cashbackRates: {
      education: 0.01,
      fuel: 0.0,
      jewellery: 0.0,
      govtPayments: 0.0,
      insurance: 0.01,
      offlineSpends: 0.01,
      onlineSpends: 0.01,
      rent: 0.0,
      utilities: 0.01,
      walletLoads: 0.0,
    },
  },
];

const SpendInput = () => {
  const [spends, setSpends] = useState({
    education: 0,
    fuel: 0,
    jewellery: 0,
    govtPayments: 0,
    insurance: 0,
    offlineSpends: 0,
    onlineSpends: 0,
    rent: 0,
    utilities: 0,
    walletLoads: 0,
  });
  const [selectedCard, setSelectedCard] = useState(cards[0]);
  const [totalCashback, setTotalCashback] = useState(0);

  useEffect(() => {
    let cashback = 0;
    Object.keys(spends).forEach((category) => {
      cashback += spends[category] * selectedCard.cashbackRates[category];
    });
    setTotalCashback(cashback);
  }, [spends, selectedCard]);

  const getBestCard = () => {
    let bestCard = selectedCard;
    let bestCashback = totalCashback;

    cards.forEach((card) => {
      let cashback = 0;
      Object.keys(spends).forEach((category) => {
        cashback += spends[category] * card.cashbackRates[category];
      });
      if (cashback > bestCashback) {
        bestCard = card;
        bestCashback = cashback;
      }
    });

    return [bestCard, bestCashback];
  };
  const [bestCard, bestCashback] = getBestCard();

  const otherCardsCashback = cards
    .filter((card) => card.name !== bestCard.name)
    .map((card) => {
      let cashback = 0;
      Object.keys(spends).forEach((category) => {
        cashback += spends[category] * card.cashbackRates[category];
      });
      return {
        cardName: card.name,
        cashback: cashback.toFixed(2),
      };
    });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSpends({
      ...spends,
      [name]: value,
    });
  };

  const handleCardChange = (e) => {
    const cardName = e.target.value;
    const card = cards.find((card) => card.name === cardName);
    setSelectedCard(card);
  };


  return (
    <><div className='spend-input'>
      <h2>Cashback Cards Comparison Tool</h2>
      <label htmlFor="education">
        Education (₹):
        <input
          type="number"
          name="education"
          id="education"
          value={spends.education}
          onChange={handleInputChange} />
      </label>
      <label htmlFor="fuel">
        Fuel (₹):
        <input
          type="number"
          name="fuel"
          id="fuel"
          value={spends.fuel}
          onChange={handleInputChange} />
      </label>
      <label htmlFor="jewellery">
        Jewellery (₹):
        <input
          type="number"
          name="jewellery"
          id="jewellery"
          value={spends.jewellery}
          onChange={handleInputChange} />
      </label>
      <label htmlFor="govtPayments">
        Govt. Payments (₹):
        <input
          type="number"
          name="govtPayments"
          id="govtPayments"
          value={spends.govtPayments}
          onChange={handleInputChange} />
      </label>
      <label htmlFor="insurance">
        Insurance (₹):
        <input
          type="number"
          name="insurance"
          id="insurance"
          value={spends.insurance}
          onChange={handleInputChange} />
      </label>
      <label htmlFor="offlineSpends">
        Offline Spends (₹):
        <input
          type="number"
          name="offlineSpends"
          id="offlineSpends"
          value={spends.offlineSpends}
          onChange={handleInputChange} />
      </label>
      <label htmlFor="onlineSpends">
        Online Spends (₹):
        <input
          type="number"
          name="onlineSpends"
          id="onlineSpends"
          value={spends.onlineSpends}
          onChange={handleInputChange} />
      </label>
      <label htmlFor="rent">
        Rent (₹):
        <input
          type="number"
          name="rent"
          id="rent"
          value={spends.rent}
          onChange={handleInputChange} />
      </label>
      <label htmlFor="utilities">
        Utilities (₹):
        <input
          type="number"
          name="utilities"
          id="utilities"
          value={spends.utilities}
          onChange={handleInputChange} />
      </label>
      <label htmlFor="walletLoads">
        Wallet Loads (₹):
        <input
          type="number"
          name="walletLoads"
          id="walletLoads"
          value={spends.walletLoads}
          onChange={handleInputChange} />
      </label>
      <br />
      {/*
      <div className='spend-input-others'>
        <label htmlFor="card">
          Check Cashback for:
          <select name="card" id="card" defaultValue={bestCard.name} onChange={handleCardChange}>
            {cards.map((card) => (
              <option key={card.name} value={card.name}>
                {card.name}
              </option>
            ))}
          </select>
        </label><br />
        Total Cashback: <strong>{totalCashback.toFixed(2)}</strong>
      </div>
            */}
      <p>
        Best Card for the entered expense is <strong>{bestCard.name}</strong> with total cashback of <strong>₹ {bestCashback.toFixed(2)}</strong>
      </p>

      <h3>Other Card Cashbacks:</h3>{' '}
      <ul>
        {
          otherCardsCashback.map((card) => (
            <li key={card.cardName}>
              <strong>{card.cardName}</strong>: ₹ {card.cashback}{' '}
            </li>
          ))}
      </ul>

    </div>
      <div className='footer'>
        <p>Made with ❤️ by <a href="https://github.com/cyberboysumanjay">Sumanjay</a><br />
          <img alt="Hits" src="https://hits.sh/cashbackcards.netlify.app/hits.svg?style=flat-square&label=Page%20Views" /></p>
      </div >
    </>
  );
};

export default SpendInput;
