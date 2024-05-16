import React, { useEffect, useState } from "react";
import ReactConfetti from "react-confetti";

const Confetti = () => {
  const [wh, setWh] = useState({
    width: window.innerWidth*98/100,
    height: window.innerHeight,
  });

  const [showConfetti, setShowConfetti] = useState(true);
  const detectSize = () =>{
    setWh({width:window.innerWidth*98/100, height:window.innerHeight})
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 2000); 

    return () => clearTimeout(timer);
  }, []);

  useEffect(()=>{
    window.addEventListener('resize',detectSize)
    return ()=>{
      window.removeEventListener('resize',detectSize)
    }
  })
  return (
    <>
    
        <ReactConfetti
        style={{position:'fixed'}}
          width={wh.width.toString()}
          height={wh.height.toString()}
          recycle={showConfetti}
        />
      
    </>
  );
};

export default Confetti;