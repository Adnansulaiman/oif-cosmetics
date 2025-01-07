import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard'
import axios from 'axios'
const Wishlist = () => {
    const [products,setProducts] = useState(null);
    // const [loading,setLoading] = useState(true);

    useEffect(()=>{
        const fetchWishlistProduct = async()=>{
            try{
                const token = localStorage.getItem('token')
                const response = await axios.get(`http://localhost:3000/api/user/wishlist`, {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    }
                });
                setProducts(response.data?.wishlist)
                console.log(response.data?.wishlist)
            }catch(err){
                console.log("Error :" ,err)
            }
        }
        fetchWishlistProduct()
    },[])


  return (
    <div className="flex justify-center md:justify-start  flex-wrap px-12 pt-28 gap-5 md:gap-10">
       {
            products?.map((product)=>(

                <ProductCard key={product._id} product={product?.productId}  />
            ))
        }
        
    </div>
  )
}

export default Wishlist