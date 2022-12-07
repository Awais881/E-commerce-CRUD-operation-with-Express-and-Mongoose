import axios from "axios";
import {useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';





let baseUrl = ``;
if (window.location.href.split(":")[0] === "http") {
    baseUrl = `http://localhost:5001`;
}
function Products() {
      
    let [products, setProducts] = useState(null);
    let [name, setName] = useState([]);
    let [price, setPrice] = useState([]);
    let [description, setDescription] = useState([]);
  

       // Get All Products

       
    useEffect(() => {

      const getAllProducts = async () => {
          try {
              let response = await axios({
                  url: `${baseUrl}/products`,
                  method: "get",
                  // withCredentials: true
              })
              if (response.status === 200) {
                  console.log("response: ", response.data.data);
                  setProducts(response.data.data);
                  // setProducts(response.data.data.reverse());
                  // setProduct(response.data);
                  

              } 
              
             
          } catch (e) {
              console.log("Error in api call: ", e);
          }
      }
      getAllProducts();

  }, [])











    let object ={
      name: name,
      price: price,
      description: description,
    }
               // Add Products
      
    const saveProduct = async (e) => {
        e.preventDefault();

        try {
          axios.post(`${baseUrl}/product`, object)
          .then(response => {
            console.log("response: ", response.data);
          })
          console.log("post", object);
          
         
          toast.success('Added Sucessfully', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
              
          
           
            // {
            //   setName(response.data);
            //   setPrice(response.data);
            //   setDescription(response.data);
            // }
           
           

        } 
        
        
        
        
        catch (e) {
            console.log("error : ", e);
        }

    }
      
        
      











    return (
     <>
     
     <form onSubmit={saveProduct}>

       <TextField 
       id="name"
        label="Name"
        variant="filled"
        onChange={(e) => {
            setName(e.target.value)
          }}
        
        />
         
         <TextField 
       id="name"
        label="Price"
        variant="filled"
        onChange={(e) => {
            setPrice(e.target.value)
          }}
        
        />  <TextField 
        id="name"
         label="Description"
         variant="filled"
         onChange={(e) => {
             setDescription(e.target.value)
           }}
         
         />
<Button  variant="contained" color="success"  type="submit" >
  Add
</Button>
       </form>


       {(products === null) ? null :
          <div>
           
        
          <div className="time">{new Date().toDateString()}</div>
        <div className="name"><h3>{products.name}</h3></div> <br />


          <div className="price">price: {products.price}</div>
          
      
         <div className="description">description : {products.description}</div> 
           
          
            </div> 

     




       }
     
       <ToastContainer />
     
     </>
    );
  }
  
  export default Products;