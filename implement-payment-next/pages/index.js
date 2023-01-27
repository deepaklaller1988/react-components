import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css';
import { checkout } from "../checkout"

export default function Home() {

  const items = [
    {
      title: "Apple Macbook ",
      description: "Apple Macbook 256GB Storage",
      image:
        "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mbp-spacegray-select-202011_GEO_IN?wid=904&hei=840&fmt=jpeg&qlt=80&.v=1613672874000",
      price: 122900,
    },
    {
      title: "Samsung ",
      description: "Sammmm 256GB Storage",
      image: "/images.jpeg",
      price: 9999,
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  bg-green-400">
      <div className="flex gap-3">
        {items?.map((item) => (
          <div className="bg-white rounded-2xl h-[500px] w-[400px] p-3 shadow-xl flex flex-col justify-center items-center" key={item.title}>
            <Image
              width={300}
              height={300}
              objectFit="contain"
              src={item.image}
              alt={item.title}
            />
            <h2 className="text-center font-semibold">{item.title}</h2>
            <h2 className="text-center">{item.description}</h2>
            <h3>₹{item.price}</h3>
            <button
              onClick={(() => {
                checkout({
                  lineItems: [
                    {
                      price: "price_1M0MKcSCxpWDpBx5FwkQSVEF",
                      quantity: 1
                    }
                  ]
                })
              })}
              role="link"
              className="bg-green-400 px-4 py-2 rounded-lg"
            >
              Buy now
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
