import React, { useState, useEffect } from "react";
import axios from "axios";
import { Image } from "cloudinary-react";
import { Button, Container } from "react-bootstrap";
import { Row, Col } from "antd";
import "./WishList.css";

const WishList = () => {
  const [cusWishList, setCusWishList] = useState(null);
  const [emptyStorage, setEmptyStorage] = useState(true);

  const remove = async (wID) => {
    const id = wID;
    alert(wID);
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    const dt = {
      id,
    };

    await axios
      .put(
        "http://localhost:6500/ecom/api/customerpvt/removeItemsFromWishlist",
        dt,
        config
      )
      .then((res) => {
        alert(wID);
        alert("removed from wishlist");
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => {
    setEmptyStorage(true);
    const getCustomerData = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      await axios
        .get(`http://localhost:6500/ecom/api/customerpvt/getWishlist`, config)
        .then((res) => {
          console.log(res.data);
          setCusWishList(res.data.wishlist);
          setEmptyStorage(false);
        })
        .catch((err) => {
          alert("Error in order set : " + err);
        });
    };
    getCustomerData();
  }, []);

  return (
    <div className="wishlist">
      {!emptyStorage && (
        <div>
          {cusWishList.map((x) => {
            return (
              <Container className="wishlistCard">
                <Row className="wishlistRow">
                  <Col className="wishlistImg">
                    <Image
                      className="custom-cusprof-pp-img "
                      cloudName="grid1234"
                      publicId={x.proImg}
                    />
                  </Col>
                  <Col className="detWishlist">
                    <h3>{x.proName}</h3>
                    <h5>Product ID: {x.productID}</h5>
                    <h6>Added At: {x.createdAt}</h6>

                    <Button
                      type="submit"
                      onClick={() => {
                        remove(x._id);
                      }}
                    >
                      Remove
                    </Button>
                  </Col>
                </Row>
              </Container>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default WishList;
