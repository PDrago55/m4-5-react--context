import React, { useState } from "react";
import useInterval from "../hooks/use-interval.hook";

export const GameContext = React.createContext(null);

export const GameProvider = ({ children }) => {
  const [numCookies, setNumCookies] = useState(1000);
  const [purchasedItems, setPurchasedItems] = useState({
    cursor: 0,
    grandma: 0,
    farm: 0
  });
  const calculateCookiesPerSecond = purchasedItems => {
    const items = [
      { id: "cursor", name: "Cursor", cost: 10, value: 1 },
      { id: "grandma", name: "Grandma", cost: 100, value: 10 },
      { id: "farm", name: "Farm", cost: 1000, value: 80 }
    ];
    return Object.keys(purchasedItems).reduce((acc, itemId) => {
      const numOwned = purchasedItems[itemId];
      const item = items.find(item => item.id.toString() === itemId);
      const value = item.value;
      return acc + value * numOwned;
    }, 0);
  };

  useInterval(() => {
    const numOfGeneratedCookies = calculateCookiesPerSecond(purchasedItems);
    setNumCookies(numCookies + numOfGeneratedCookies);
  }, 1000);

  return (
    <GameContext.Provider
      value={{
        numCookies,
        setNumCookies,
        purchasedItems,
        setPurchasedItems,
        cookiesPerSecond: calculateCookiesPerSecond(purchasedItems)
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
