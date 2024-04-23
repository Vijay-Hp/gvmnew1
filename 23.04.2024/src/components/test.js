import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Btn } from "./Input";
import { dataContext } from "./context/DataContext.jsx";

export default function Test() {
    // axios

// const url = 'https://jsonplaceholder.typicode.com/posts'
// const data = {
//   a: 10,
//   b: 20,
// };
// axios
//   .post(url, data, {
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json;charset=UTF-8",
//     },
//   })
//   .then(({data}) => {
//     console.log(data);
// });

const { purchaseData, setPurchaseData } = useContext(dataContext);

const handleFetchData = async () => {

    try {
    //   const purchase = purchaseData?.purchase_id; 
      const data_purchase={
        "purchaseId":"12"
      }
  
      const res = await axios.get('http://localhost/GVM_Backend/controllers/api/get/fetch_PurchaseDetails.php',data_purchase);
      console.log("data",data_purchase);
      console.log(res.data);
      // Update state or do other operations with the response data
    } catch (error) {
      console.log(error);
    }
}
    return(
        
        <Btn btn="Fetch" btnEvent={handleFetchData}/>
    );
}
