import React, { useState } from 'react';
import Discover from "../components/Home/Discover";
import Front from "../components/Home/Front1";
import Funds from "../components/Home/Funds2";
import HowItWorks from "../components/Home/HowItWorks2";
import News from "../components/Home/News2";
import Quiz from "../components/Home/Quiz";
import Stats from "../components/Home/Stats1";
import Stories from "../components/Home/Stories";
import Trusted from "../components/Home/Trusted";

export default function Collpred() {
  const [showFunds, setShowFunds] = useState(false);
  
  return (
    <main>
      <Front />
      <Stats onSearch={() => setShowFunds(true)} />
      {showFunds && <Funds />}
      <News />
      <HowItWorks />
    </main>
  );
}
