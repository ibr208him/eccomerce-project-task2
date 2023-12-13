import {React,useContext} from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
// import ReactImageMagnify from "react-image-magnify";
import './ProductDetails.css'
import { CartContext } from '../Context/CartContext.jsx'

export default function ProductDetails() {
  const { id } = useParams("id");

  const getProductDetails = async () => {
    const {data} = await axios.get(
      `${import.meta.env.VITE_API_URL}/products/${id}`
    );

    return data;
  };

  const { data, isLoading } = useQuery("ProductDetails", getProductDetails);
  console.log(data, "rtrtrtr");

const {addToCartContext}=useContext(CartContext);
  const addToCart=async (productId)=>{
    const res=await addToCartContext(productId);
    console.log(res);
  }

  if (isLoading) {
    return <h2> loading.................</h2>;
  }
  return (
    <div className="container mt-5 text-center">
      <div className="text-center bg-success p-5">
        <h2 className="mb-5 fs-1">{data?.product.name}</h2>
        <p className="mb-5 fs-5">{data?.product.description}</p>
        <div className="imgContainer w-50 h-50 me-auto">

          {/* <ReactImageMagnify
            {...{
              smallImage: {
                alt: "Wristwatch by Ted Baker London",
                isFluidWidth: false,
                width: 400,
                height: 600,
                src: data.product.mainImage.secure_url,
              },
              largeImage: {
                src: data.product.mainImage.secure_url,
                width: 1200,
                height: 800,
              },
              // enlargedImagePosition:'over',
              isHintEnabled: true,
              hintTextMouse: "hover to zoom",
              enlargedImageContainerDimensions: {
                width: "90%",
                height: "70%",
              },
            }}
          /> */}
<img src={data.product.mainImage.secure_url} className="img-fluid" />
        </div>

        <p className="my-5 fw-bold fs-2">
          Final Price: {data?.product.finalPrice}
        </p>
        <button className='btn btn-outline-info' onClick={()=>addToCart(data?.product._id)}> Add to Cart</button>



      </div>
      <div className="subImages row mt-5">
        {data?.product.subImages.map((subImage, index) => {
          return (
            <div className="subImageContainer col-lg-4" key={index}>
              <img src={subImage.secure_url} className="img-fluid" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
