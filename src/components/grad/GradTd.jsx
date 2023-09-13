// import { useEffect, useState } from "react";
// import { gradChecker } from "../../functions/order";
// import { getGrads } from "../../functions/grad";

// const GradTd = ({ grade }) => {
//     const [grads, setGrads] = useState([]);

//     useEffect(() => {
//       loadgrad();
//     }, []);
  
//     const loadgrad = () => {
//       getGrads().then((res) => {
//         setGrads(res.data);
//         // console.log('categories', res.data)
//       });
//     };
//   checkGrade(grade);
//   return (
//     <div>
//       {data.ok ? (
//         <>{grade}</>
//       ) : (
//         <>
//           {grade}
//           <span>{data.message}</span>
//         </>
//       )}
//     </div>
//   );
// };

// export default GradTd;
