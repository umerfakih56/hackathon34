"use client"
import {Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


import { client } from '@/sanity/lib/client'
import { ifError } from "assert"
import React, { useEffect, useState } from 'react'


interface Iproducts{
  imageUrl:string;
  discountPercent: number;
  isNew: boolean;
  name: string;
  description: string;
  price: number;
  _id: string
}

async function Product() {
    const [products, setProducts] = useState<Iproducts[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      // Fetch products with error handling
      const fetchProducts = async () => {
        try {
          setLoading(true);
          setError(null);
          const fetchedProducts: Iproducts[] = await client.fetch(
            `*[_type == 'products']{
              "imageUrl": image.asset->url,
              category,
              discountPercent,
              isNew,
              name,
              description,
              price,
              _id
            }[0...4]`
          );
          setProducts(fetchedProducts);
        } catch (err: any) {
          setError("Failed to load products. Please try again later.");
          console.error("Error fetching products:", err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchProducts();
    }, []);  

    if (loading) {
      return(
        <div className="flex justify-center items-center h-scree n">
        <p>Loading products...</p>
        </div>
      )
    };
    if (error){
      return(
        <div className="flex justify-center items-center h-screen">
<p className="text-red-500 font-bold">{error}</p>
</div>
      );
    }
    
return (
  <div className="w-full mt-20 md:mt-36 h-full max-w-screen-xl mx-auto">
    {
      products.map((items:any)=>{
        return(
          <div>
            <h1>{items.name}</h1>
          </div>
        )
      })
    }
  </div> 
  )
}

export default Product
