import React,{useState,useEffect} from 'react'
import { Card,Button,CardColumns,Form } from "react-bootstrap";
import { Modal }  from "antd";
import axios from "axios";
import { Image } from "cloudinary-react";
import FileBase from "react-file-base64";


const SellerProduct = () => {

    const[products,setProducts]=useState(null);
    const [emptyStorage, setEmptyStorage] = useState(true);

    const [pId,setPId] = useState("");
    const [productName, setProductName] = useState("");
    const [category, setCategory] = useState("");
    const [productDetails, setProductDetails] = useState("");
    const [unitPrice, setUnitPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [productImage, setProductImage] = useState(" ");

    const [enc2Data, setEnc2Data] = useState(null);

    const [updatevisible, setUpdateVisible] = useState(false);
    const [addvisible, setAddVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);



    const handleOk = () => {
      setConfirmLoading(true);
      updateProductsHandler();
      setTimeout(() => {
        setUpdateVisible(false);
        setConfirmLoading(false);
      }, 3000);
    };

    const handleOk2 = () => {
      setConfirmLoading(true);
      AddProductsHandler();
      setTimeout(() => {
        setAddVisible(false);
        setConfirmLoading(false);
      }, 3000);
    };

    const handleCancel = () => {
      // console.log("Clicked cancel button");
      setUpdateVisible(false);
      setAddVisible(false);
     };

     const AddProductsHandler = async() => {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      const newProduct = {
        productName,
        category,
        productDetails,
        unitPrice,
        quantity,
        productImgEnc:enc2Data
      };
      try{
        await axios
          .post(
            "http://localhost:6500/ecom/api/sellerpvt/product/add",
            newProduct,
            config
          )
          .then((res) => {
            alert("Product added successfully");
          })
          .catch((err) => {
            alert(err);
          });
      }catch (error) {
        alert("Error Occured-" + error);
      }

     };


    const updateProductsHandler = async (productId) => {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      let dataObj = {
        productId:pId,
        productName,
        category,
        productDetails,
        unitPrice,
        quantity,
        productImgEnc:enc2Data
      };
      try{

     
        await axios
            .put(
              "http://localhost:6500/ecom/api/sellerpvt/product/update",
              dataObj,
              config
            )
            .then((res) => {
              alert("Product updated successfully");
              //alert("Helllo"+res.data.desc);
            })
            .catch((err) => {
              alert(err);
            });
      }catch (error) {
        alert("Error Occured-" + error);
      }
    };


    
 

    useEffect(()=>{
        setEmptyStorage(true);
        const getSellerProducts = async () =>{
            const config = {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
              };
                await axios
                  .get(
                    "http://localhost:6500/ecom/api/sellerpvt/product/getall",
                    config
                    )
                  .then((res) => {
                    console.log(res.data);
                    setProducts(res.data.products);
                    setEmptyStorage(false);
                    
                  })
                  
              .catch ((error) => {
                alert("Error in products : " + error);
              });
            };
            getSellerProducts();
        },[]);


    const removeProducts = async(productId) =>{

      // const config = {
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      //   },
      // };
        //alert("This is product ID"+productId);
  
        await axios
        .delete(
          "http://localhost:6500/ecom/api/sellerpvt/product/delete",
          {
            headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          data:{
            productId
          }
        }
          // productId,
          // config

        )
        .then((res)=>{
          //alert(res);
          alert("Product has been removed successfully");
        })
        .catch((err)=>{
          alert(err)
        });
    }


    return (
        <div>
        <Button onClick={()=>{
          setAddVisible(true);
        }}>Add Products</Button>
        {!emptyStorage && (
        <div>
        <CardColumns>
        {products.map((x) => {
            return (
        
          <Card style={{marginTop:'2rem'}}>
            <Image
            style={{width:'18rem', height: '12rem'}}
            variant="top"
            className="custom-cusprof-pp-img"
            cloudName="grid1234"
            publicId={x.productImage.imagePublicId}
          />
            <Card.Body>
              <Card.Title>{x.productName}</Card.Title>
              <Card.Text>
              <h6>Category:{x.category}</h6>
              <p>Product Details: {x.productDetails}</p>
              <p>Unit Price:Rs.{x.unitPrice}</p>
              <p>Quantity:{x.quantity}</p>
              </Card.Text>
              <Button style={{marginRight:'2rem'}}
               variant="outline-info" 
              onClick={()=>{
                setPId(x._id);
                setProductName(x.productName);
                setCategory(x.category);
                setProductDetails(x.productDetails);
                setUnitPrice(x.unitPrice);
                setQuantity(x.quantity);
                setProductImage(x.productImage.imagePublicId);
                setUpdateVisible(true);
            
              }}>
              Edit
            </Button>
            <Button 
               variant="outline-danger"
              onClick={()=>{
                removeProducts(x._id)
              }}
              >
              Remove
            </Button>
            </Card.Body>            
      </Card>  
            );
          })}
          </CardColumns>
          </div>
        )}
        <Modal
        title="Update Product"
        visible={updatevisible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
      <Form>
        
        <Form.Group controlId="formGroupUserName">
          <Form.Label>Product Name</Form.Label>
          <Form.Control type="text"  value={productName}
          onChange={(e) => {
            setProductName(e.target.value);
          }}/>
        </Form.Group>
        <Form.Group controlId="formGroupEmail">
          <Form.Label>Category</Form.Label>
          <Form.Control type="text"  value={category}
          onChange={(e) => setCategory(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formGroupPaymentOption">
          <Form.Label>Product Details</Form.Label>
          <Form.Control type="text"  value={productDetails}
          onChange={(e) => setProductDetails(e.target.value)} />
        </Form.Group>
          <Form.Group controlId="formGroupAddress">
          <Form.Label>Unit Price(Rs)</Form.Label>
          <Form.Control type="number"   value={unitPrice}
          onChange={(e) => setUnitPrice(e.target.value)}/>
      </Form.Group>
         <Form.Group controlId="formGroupPhone">
         <Form.Label>Quantity</Form.Label>
         <Form.Control type="number"   value={quantity}
         onChange={(e) => setQuantity(e.target.value)}/>
      </Form.Group>
      <Form.Group controlId="formGroupPhone">
      <Form.Label>Product Image</Form.Label>
      <h6>**Please do not exceed the amount of file size 25MB </h6>
      <FileBase type="file"   value={productImage}
      multiple={false}
      onDone={({ base64 }) => {
        setEnc2Data(base64); 
      }}/>
      </Form.Group>
      </Form>
      </Modal>
      <Modal
      title="Add Product"
      visible={addvisible}
      onOk={handleOk2}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
    <Form>
        <Form.Group controlId="formGroupUserName">
          <Form.Label>Product Name</Form.Label>
          <Form.Control type="text" 
          onChange={(e) => {
            setProductName(e.target.value);
          }}/>
        </Form.Group>
        <Form.Group controlId="formGroupEmail">
          <Form.Label>Category</Form.Label>
          <Form.Control type="text" 
          onChange={(e) => setCategory(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formGroupPaymentOption">
          <Form.Label>Product Details</Form.Label>
          <Form.Control type="text" 
          onChange={(e) => setProductDetails(e.target.value)} />
        </Form.Group>
          <Form.Group controlId="formGroupAddress">
          <Form.Label>Unit Price(Rs)</Form.Label>
          <Form.Control type="number"   
          onChange={(e) => setUnitPrice(e.target.value)}/>
      </Form.Group>
         <Form.Group controlId="formGroupPhone">
         <Form.Label>Quantity</Form.Label>
         <Form.Control type="number"   
         onChange={(e) => setQuantity(e.target.value)}/>
      </Form.Group>
      <Form.Group controlId="formGroupPhone">
      <Form.Label>Product Image</Form.Label>
      <h6>**Please do not exceed the amount of file size 25MB </h6>
      <FileBase type="file"  
      multiple={false}
      onDone={({ base64 }) => {
        setEnc2Data(base64); 
      }}/>
      </Form.Group>
      </Form>
    
    </Modal>
          </div>
       
        
    )
}

export default SellerProduct