import React, { useEffect, useState } from "react";
import { Col, Row, Divider, Card } from "antd";
import { Container } from "react-bootstrap";
import CategoryList from "../../components/Adithya/CategoryList";
import "./ProductListingScreen.css";
import axios from "axios";
import { Image } from "cloudinary-react";
const { Meta } = Card;

const ProductListingScreen = () => {
  const [fetchedProds, setFetchedProds] = useState([]);
  const [emptyStorage, setEmptyStorage] = useState(true);

  let categoryNo = localStorage.getItem("selectedCategory");
  useEffect(() => {
    setEmptyStorage(true);
    const fetchItems = async () => {
      await axios
        .get(`http://localhost:6500/ecom/api/guest/getProducts/${categoryNo}`)
        .then((res) => {
          setFetchedProds(res.data.prods);
          setEmptyStorage(false);
        })
        .catch((err) => {
          alert("Error: " + err);
        });
    };

    fetchItems();
  }, [categoryNo]);

  const openSingleProduct = (productID) => {
    window.location = `/products/single/${productID}`;
  };

  return (
    <div>
      <Divider orientation="left">Product Shelf</Divider>
      <Row>
        <Col span={5}>
          <CategoryList />
        </Col>
        <Col span={19}>
          <Container className="custom-product-list-container">
            {!emptyStorage && (
              <div className="custom-prod-listing">
                {fetchedProds.map((prod) => {
                  return (
                    <div
                      className="col-md-3"
                      key={prod._id}
                      onClick={() => {
                        openSingleProduct(prod._id);
                      }}
                    >
                      <Card
                        hoverable
                        style={{ width: 240, height: 400 }}
                        cover={
                          <div className="custom-prod-img-covering">
                            <Image
                              className="custom-prod-img "
                              cloudName="grid1234"
                              publicId={prod.productImage.imagePublicId}
                            />
                          </div>
                        }
                      >
                        <Meta
                          title={prod.productName}
                          description={"Rs:" + prod.unitPrice}
                        />
                      </Card>
                    </div>
                  );
                })}
              </div>
            )}
          </Container>
        </Col>
      </Row>
    </div>
  );
};

export default ProductListingScreen;
