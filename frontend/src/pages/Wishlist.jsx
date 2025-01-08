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

    const handleRemoveFromWishlist = (removedProductId) => {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.productId._id !== removedProductId)
        );
      };

  return (
    
        
    <div className="flex flex-col px-12 pt-28 ">
        <h1 className='text-3xl text-center text-slate-800 font-bold mb-6'>Your Wishlist</h1>
       <div className="flex gap-5 md:gap-10 justify-center md:justify-start  flex-wrap">
       {
            products?.map((product)=>(

                <ProductCard key={product._id} product={product?.productId} onRemoveFromWishlist={handleRemoveFromWishlist} />
            ))
        }
       </div>
        
    </div>
    
  )
}

export default Wishlist