import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { GameContext } from "./GameContext";
import cookieSrc from "../cookie.svg";
import Item from "./Item";

const Game = props => {
  //console.log("PROPS.ITEMS", props.items);
  const {
    numCookies,
    setNumCookies,
    purchasedItems,
    setPurchasedItems,
    cookiesPerSecond
  } = React.useContext(GameContext);

  React.useEffect(() => {
    const data = localStorage.getItem("stored-stats");
    if (data) {
      setNumCookies(JSON.parse(data));
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem("stored-stats", JSON.stringify(numCookies));
  });

  /////// This stores my purchased points... I commentted it out because
  /////// it was annoying to see the accumulation...

  // React.useEffect(() => {
  //   const purchaseData = localStorage.getItem("purchased");
  //   if (purchaseData) {
  //     setPurchasedItems(JSON.parse(purchaseData));
  //   }
  // }, []);

  // React.useEffect(() => {
  //   localStorage.setItem("purchased", JSON.stringify(purchasedItems));
  // });

  const incrementCookies = () => {
    setNumCookies(c => c + 1);
  };

  React.useEffect(() => {
    document.title = `${numCookies} cookies - Cookie Clicker Workshop`;

    return () => {
      document.title = "Cookie Clicker Workshop";
    };
  }, [numCookies]);

  React.useEffect(() => {
    const handleKeydown = ev => {
      if (ev.code === "Space") {
        incrementCookies();
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  });

  return (
    <Wrapper>
      <GameArea>
        <Indicator>
          <Total>{numCookies} cookies</Total>
          <strong>{cookiesPerSecond}</strong> cookies per second
        </Indicator>
        <Button onClick={incrementCookies}>
          <Cookie src={cookieSrc} />
        </Button>
      </GameArea>

      <ItemArea>
        <SectionTitle>Items:</SectionTitle>
        {props.items.map((item, index) => {
          // console.log("RIGHT BEFORE RENDER SECTION", items);
          return (
            <Item
              key={item.id}
              index={index}
              name={item.name}
              cost={item.cost}
              value={item.value}
              numOwned={purchasedItems[item.id]}
              handleAttemptedPurchase={() => {
                if (numCookies < item.cost) {
                  alert("Cannot afford item");
                  return;
                }

                setNumCookies(numCookies - item.cost);
                setPurchasedItems({
                  ...purchasedItems,
                  [item.id]: purchasedItems[item.id] + 1
                });
              }}
            />
          );
        })}
      </ItemArea>
      <HomeLink to="/">Return home</HomeLink>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;
const GameArea = styled.div`
  flex: 1;
  display: grid;
  place-items: center;
`;
const Button = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  transform-origin: center center;

  &:active {
    transform: scale(0.9);
  }
`;

const Cookie = styled.img`
  width: 200px;
`;

const ItemArea = styled.div`
  height: 100%;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SectionTitle = styled.h3`
  text-align: center;
  font-size: 32px;
  color: yellow;
`;

const Indicator = styled.div`
  position: absolute;
  width: 250px;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
`;

const Total = styled.h3`
  font-size: 28px;
  color: lime;
`;

const HomeLink = styled(Link)`
  position: absolute;
  top: 15px;
  left: 15px;
  color: #666;
`;

export default Game;
