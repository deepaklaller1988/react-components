
import React from 'react'
import {useRouter} from 'next/router';
  
export default function GetRoute() {
    // Calling useRouter() hook
    const router = useRouter()
    const productId = router.query.id;
    return (
        <div>
            <h2>pathname:- {router.asPath}</h2>
            <p>ID - {productId}</p>
        </div>
    )
}