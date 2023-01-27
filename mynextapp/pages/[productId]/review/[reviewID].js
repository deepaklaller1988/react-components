
import React from 'react'
import {useRouter} from 'next/router';
  
export default function Review() {
    // Calling useRouter() hook
    const router = useRouter()
    const {productId,reviewID} = router.query;
    return (
        <div>
            <h2>pathname:- {router.asPath}</h2>
            <p>Product ID - {productId}</p>
            <p>Review ID - {reviewID}</p>
        </div>
    )
}