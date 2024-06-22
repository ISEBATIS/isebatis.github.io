// import React, { useEffect, useRef, useState } from 'react';

// import styles from "./App.module.css";
// import { Navbar } from './components/Navbar/Navbar';
// import { Banner } from './components/Banner/Banner';
// import gsap from 'gsap';
// import { useGSAP } from '@gsap/react';



// const App = () => {
//   const textRef = useRef();
//   const [xOffset, changexOffset] = useState(0);


//   const y_square = (x) => {
//     return Math.sqrt(500**2 - x**2 );
//   }

  
//   const test = () => {
//     console.log("test is called {}", gsap.ticker.deltaRatio(60));
//   }
  
//   gsap.ticker.fps(30);
//   gsap.ticker.add(test);  

//   // useGSAP(() => {
//   //   console.log("Gsap Again Called")


//   //   var tl = gsap.timeline({
//   //     repeat: -1,
//   //     repeatDelay: 0})

//   //   var maxIteration = 500
//   //   for (let x = -maxIteration; x < maxIteration; x++) {
//   //     var yV = y_square(x);
//   //     var xV = y_square(yV)
//   //     // console.log(x, yV)
//   //     tl.to(
//   //       textRef.current,
//   //       {
//   //         x: x,
//   //         y: yV,
//   //         duration: 0.0001,
//   //         animationTimingFunction: "linear"
//   //       }
//   //     )
//   //   }

//   //   for (let x = maxIteration; x > -maxIteration; x--) {
//   //     var yV = y_square(x);
//   //     // console.log(x, yV)
//   //     tl.to(
//   //       textRef.current,
//   //       {
//   //         x: x,
//   //         y: -yV,
//   //         duration: 0.001,
//   //       }
//   //     )
//   //   }

//     // tl.to(
//     //   textRef.current,
//     //   {
//     //     x: - 50,
//     //     y: - 50
//     //   }
//     // )

//     // tl.to(
//     //   textRef.current,
//     //   {
//     //     x: 0,
//     //     y: 0
//     //   }
//     // )

//     // tl.to(
//     //   textRef.current,
//     //   {
//     //     x: 100,
//     //     y: -100
//     //   }
//     // )

//   // })


//   return (
//     <div className={styles.TestContainer}>
//       {/* <Navbar />
//       <Banner /> */}
//       <div className={styles.MovingObject} ref={textRef}>
//       </div>
//       <div className={styles.HelloTest}>
//         I am here
//       </div>
//     </div>
//   );
// };

// export default App;