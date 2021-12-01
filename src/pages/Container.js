// import React, { useState, useEffect} from 'react'
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
// import {useStateValue} from "../context";
// import '../App.css';
// import LoadingComponent from "../components/loadingComponent";
//
//
// const ContainerComponent = () =>{
//     const [loading, setLoading] = useState(true)
//     const [{ formValues }, dispatch] = useStateValue();
//     console.log('hekkk', formValues.currency)
//
//     useEffect(()=>{
//         starter()
//     },[])
//
//     const starter = () =>{
//         if(formValues.currency){
//             setLoading(false)
//         }
//
//     }
//     return(
//         <>
//             {
//                 loading ?
//                     <div className='Loading'>
//                         <LoadingComponent />
//                     </div>:null
//             }
//         </>
//
//
//     )
// }
//
// export default ContainerComponent
