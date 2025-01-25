// import BestSeller from "../components/BestSeller"
// import Footer from "../components/Footer";
import Hero from "../components/Hero"
import HomeBanner from "../components/HomeBanner";
import HomeCategory from "../components/HomeCategory"
import OurBenifits from "../components/OurBenifits";
import ProductList from "../components/ProductList"
import {  useProduct } from "../context/ProductContext";



const Home = () => {
  const {products,loading} = useProduct()
  
  return (
    <div className="">
      <Hero />
      <OurBenifits />
      <HomeCategory />
      <ProductList title='Our Bestsellers' products={products} />
      <HomeBanner />
      <ProductList title='Featured Products' products={products} />
  
    </div>
  )
}

export default Home
