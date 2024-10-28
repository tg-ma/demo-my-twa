import { useEffect, useState } from 'react';
import Counter from '../contracts/counter';
import { useTonClient } from './useTonClient';
import { useAsyncInitialize } from './useAsyncInitialize';
import { useTonConnect } from './useTonConnect';
import { Address, OpenedContract } from '@ton/core';

const transaction = {
  messages: [
      {
          address: "0:412410771DA82CBA306A55FA9E0D43C9D245E38133CB58F1457DFB8D5CD8892F", // destination address
          amount: "20000000" //Toncoin in nanotons
      }
  ]
}

export const Settings = () => {
  const [tonConnectUI, setOptions] = useTonConnectUI();

  return (
      <div>
          <button onClick={() => tonConnectUI.sendTransaction(transaction)}>
              Send transaction
          </button>
      </div>
  );
};