// "use client"
// import { Button } from "@/components/ui/button";
// import { client } from "@/sanity/lib/client";
// import { urlFor } from "@/sanity/lib/image";
// import Image from "next/image";
// import Link from "next/link";
// import { FaStar } from "react-icons/fa";
// import { useEffect, useState } from "react";

// // Adding key prop in star array
// let star = [
//     <FaStar key={1} />,
//     <FaStar key={2} />,
//     <FaStar key={3} />,
//     <FaStar key={4} />,
//     <FaStar key={5} />,
// ];

// interface Iproducts {
//     image: string;
//     discountPercent: number;
//     isNew: boolean;
//     name: string;
//     description: string;
//     price: number;
//     _id: string;
// }

// export default function Product() {
//     const [products, setProducts] = useState<Iproducts[]>([]);

//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const fetchedProducts = await client.fetch(
//                     `*[_type == 'products' && category == 'tshirt']{
//                         "image": image.asset->url,
//                         category,
//                         discountPercent,
//                         isNew,
//                         name,
//                         description,
//                         price,
//                         _id
//                     }[0...4]`
//                 );
//                 setProducts(fetchedProducts);
//             } catch (error) {
//                 console.error("Error fetching products:", error);
//             }
//         };

//         fetchProducts();
//     }, []);

//     return (
//         <>
//             <div className="w-full h-full mt-10 lg:mt-36 max-w-screen-xl mx-auto">
//                 <h1 className="text-3xl md:text-4xl font-bold text-center">NEW ARRIVALS</h1>
//                 <div className="relative mt-10 overflow-x-auto flex space-x-5 px-8">
//                     {products.length > 0 ? (
//                         products.map((data) => {
//                             return (
//                                 <div key={data._id} className="flex-shrink-0">
//                                     <Link href={`/product/${data._id}`}>
//                                         <div className="w-[200px] md:w-[283px] h-[200px] md:h-[290px] bg-[#F0EEED] rounded-[20px]">
//                                             {data.image && (
//                                                 <Image
//                                                     src={urlFor(data.image).url()}
//                                                     alt={data.name}
//                                                     className="w-full h-full rounded-[20px]"
//                                                     width={100}
//                                                     height={100}
//                                                 />
//                                             )}
//                                         </div>
//                                     </Link>
//                                     <div className="pl-2">
//                                         <p className="text-lg mt-2 font-bold">{data.name}</p>
//                                         <div className="flex text-yellow-400">
//                                             {star.map((icon, index) => (
//                                                 <span key={index}>{icon}</span>
//                                             ))}
//                                         </div>
//                                         <p className="font-bold mt-1">
//                                             {data.price}{" "}
//                                             <span className="text-gray-400 font-bold line-through">
//                                                 {data.discountPercent}
//                                             </span>
//                                         </p>
//                                     </div>
//                                 </div>
//                             );
//                         })
//                     ) : (
//                         <p className="text-center text-gray-500 w-full">
//                             No products available at the moment. Please try again later.
//                         </p>
//                     )}
//                 </div>
//             </div>
//             <div className="flex justify-center items-start mt-5">
//                 <Link href="/casual">
//                     <Button
//                         variant={"outline"}
//                         className="sm:mt-0 w-[80%] sm:w-[200px] rounded-[20px]"
//                     >
//                         View all
//                     </Button>
//                 </Link>
//             </div>
//         </>
//     );
// }
"use client";
import { Button } from "@/components/ui/button";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";

// Star icon array with unique keys
const stars = Array(5)
  .fill(null)
  .map((_, index) => <FaStar key={index} />);

interface IProduct {
  image: string;
  discountPercent: number;
  isNew: boolean;
  name: string;
  description: string;
  price: number;
  _id: string;
}

export default function Product() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const fetchedProducts = await client.fetch(
          `*[_type == 'products']{
            "image": image.asset->url,
            discountPercent,
            isNew,
            name,
            description,
            price,
            _id
          }[6...10]`
        );

        setProducts(fetchedProducts);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 font-bold">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full mt-10 lg:mt-36 max-w-screen-xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold text-center">NEW ARRIVALS</h1>
      <div className="relative mt-10 overflow-x-auto flex space-x-5 px-8">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="flex-shrink-0">
              <Link href={`/product/${product._id}`}>
                <div className="w-[200px] md:w-[283px] h-[200px] md:h-[290px] bg-[#F0EEED] rounded-[20px]">
                  {product.image ? (
                    <Image
                      src={urlFor(product.image).url()}
                      alt={product.name}
                      className="w-full h-full rounded-[20px]"
                      width={200}
                      height={200}
                    />
                  ) : (
                    <div className="flex justify-center items-center h-full bg-gray-300 rounded-[20px]">
                      <p>No Image</p>
                    </div>
                  )}
                </div>
              </Link>
              <div className="pl-2">
                <p className="text-lg mt-2 font-bold">{product.name}</p>
                <div className="flex text-yellow-400">
                  {stars}
                </div>
                <p className="font-bold mt-1">
                  ${product.price.toFixed(2)}{" "}
                  {product.discountPercent > 0 && (
                    <span className="text-gray-400 font-bold line-through ml-2">
                      -{product.discountPercent}%
                    </span>
                  )}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 w-full">
            No products available at the moment. Please try again later.
          </p>
        )}
      </div>
      <div className="flex justify-center items-start mt-5">
        <Link href="/casual">
          <Button
            variant="outline"
            className="sm:mt-0 w-[80%] sm:w-[200px] rounded-[20px]"
          >
            View all
          </Button>
        </Link>
      </div>
    </div>
  );
}
