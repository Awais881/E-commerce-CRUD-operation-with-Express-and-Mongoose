import axios from "axios";
import {useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';




let baseUrl = ``;
if (window.location.href.split(":")[0] === "http") {
    baseUrl = `http://localhost:5001`;
}
function Products() {
    // const [del, setDel] = useState(""); 

    let [products, setProducts] = useState(null);
    let [name, setName] = useState([]);
    let [price, setPrice] = useState([]);
    let [description, setDescription] = useState([]);
    let [toggleReload, setToggleReload] = useState(false);
    let [editProduct, setEditProduct] = useState(
      { editingId: null,
        editingName: "",
        editingPrice: "",
        editingDescription: ""
      }
    );
  

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
                  // setProducts(response.data.data);
                  setProducts(response.data.data.reverse());
                  // setProduct(response.data);
                  

              } 
              
             
          } catch (e) {
              console.log("Error in api call: ", e);
          }
      }
      getAllProducts();

  }, [toggleReload])







let editObj=   {
         name: editProduct.editingName,
         price: editProduct.editingPrice,
         description: editProduct.editingDescription
}



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
          setToggleReload(!toggleReload)
         
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
      
        
  
  //   let updateHandler = async (e) => {
  //     e.preventDefault();

  //     try {
  //         let updated = await axios.put(`${baseUrl}/product/${editProduct}`,editObj)
  //              {
  //                   name: editProduct.editingName,
  //                   price: editProduct.editingPrice,
  //                 description: editProduct.editingDescription
  //              }
  //             // {
  //             //     withCredentials: true
  //             // }
          
  //         console.log("updated: ", updated.data);
  //         setToggleReload(!toggleReload);
  //         setEditProduct({
  //                editingId: null,
  //                editingName: "",
  //                editingPrice: "",
  //                editingDescription: "",
  //              });

  //     } catch (e) {
  //         console.log("Error in api call: ", e);
  //     }


  // }


  const updateHandler = (e) => {
    console.log(editProduct.editingId);
    setToggleReload(!toggleReload);
    e.preventDefault();
    axios.put(`${baseUrl}/product/${editProduct.editingId}`, editObj)
    
      // {
      //   name: editProduct.editingName,
      //   price: editProduct.editingPrice,
      //   description: editProduct.editingDescription
      // }
     
   
      .then((response) => {
        console.log(response);
        toast.success('Update Sucessfully', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      })
      
      setEditProduct({
      editingId: null,
      editingName: "",
      editingPrice: "",
      editingDescription: "",
    });
  };

  const deleted = (id) => {
    // console.log(postId);
    setToggleReload(!toggleReload);
    axios.delete(`${baseUrl}/product/${id}`)
      .then((response) => {
        console.log(response.data);
        toast.success('Deleted Sucessfully', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      })
      .catch((err) => {
        console.log("err", err);
        toast.error('Error', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      });
  }
    return (
     <>
     
     <form onSubmit={saveProduct}>
     <h1>Add Products</h1> 
<div className="textFields">
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
<Button  variant="contained" color="success" className="add" type="submit" >
  Add
</Button>
</div>
       </form> <br />
     

        {/* {(products === null) ? null :
          <div>
           
        
          <div className="time">{new Date().toDateString()}</div>
        <div className="name"><h3>{products.name}</h3></div> <br />


          <div className="price">price: {products.price}</div>
          
      
         <div className="description">description : {products.description}</div> 
           
          
            </div> 

     




       } */}



<div>
 
     {products?.map((eachProduct, i) => (
          <div key={i}>
   <div className="editbtn">  
       <Button variant="contained" color="success" onClick={() => {
                          setEditProduct({
                            editingId: eachProduct?.id,
                            editingName: eachProduct?.name,
                            editingPrice: eachProduct?.price,
                            editingDescription: eachProduct?.description
                          })
                      }}>
                        Edit</Button> 
                    
       <IconButton aria-label="delete" onClick={()=>{
        deleted(eachProduct?.id);
        // setDel()
       }}>   
       <DeleteIcon />
       </IconButton> 
       </div>   
       <div className="card">
<Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3SwX529LOk8gikjlCqVSFJ5taynRirQh0qA&usqp=CAU"
        alt="green iguana"
      /> 

      <CardContent> 
        <Typography gutterBottom variant="h5" component="div">
        {eachProduct?.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {eachProduct?.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">{eachProduct?.price}</Button>
        
      </CardActions>
    </Card>
    </div>
       {/* <div className="time">{new Date().toDateString()}</div> */}
        {/* <div className="name"><h3>{eachProduct?.name}</h3></div> <br />


          <div className="price">price: {eachProduct?.price}</div>
          
      
         <div className="description">description : {eachProduct?.description}</div>  */}

     
     
                                                 
 {
   (eachProduct.id === editProduct.editingId ) ?
      (<div>
      
           <h1>update form</h1>
                <form onSubmit={updateHandler}>
                    Name: <input type="text" 
                    onChange={(e) => { setEditProduct({ ...editProduct, editingName: e.target.value }) }}
                     value={editProduct.editingName} /> <br />
                    Price:<input type="text" 
                    onChange={(e) => { setEditProduct({ ...editProduct, editingPrice: e.target.value }) }}
                     value={editProduct.editingPrice} /> <br />
                    Description:<input type="text"
                     onChange={(e) => { setEditProduct({ ...editProduct, editingDescription : e.target.value }) }}
                      value={editProduct.editingDescription} /> <br />
                  

                    <button type="submit" >Proceed Update</button>  
        </form>

      </div>): null 
    }
         
    </div>
      ))}

    </div>
    

    
     
       <ToastContainer />
     
     </>
    );
  }
  
  export default Products;