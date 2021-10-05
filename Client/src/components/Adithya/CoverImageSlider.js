import React from "react";
import { Carousel, Button } from "antd";
import "./CoverImageSlider.css";

const items = [
  {
    key: "1",
    title: "Web and mobile payment built for developers",

    content:
      "An vim odio ocurreret consetetur, justo constituto ex mea. Quidam facilisis vituperata pri ne. Id nostrud gubergren urbanitas sed, quo summo animal qualisque ut, cu nostro dissentias consectetuer mel. Ut admodum conceptam mei, cu eam tation fabulas abhorreant. His ex mandamus.",
  },
  {
    key: "2",
    title: "Work better together. Schedule meetings",

    content:
      "An vim odio ocurreret consetetur, justo constituto ex mea. Quidam facilisis vituperata pri ne. Id nostrud gubergren urbanitas sed, quo summo animal qualisque ut, cu nostro dissentias consectetuer mel. Ut admodum conceptam mei, cu eam tation fabulas abhorreant. His ex mandamus.",
  },
];

const CoverImageSlider = () => {
  return (
    <div className="custome-img-slider-content">
      <Carousel autoplay={true}>
        {items.map((item) => {
          return (
            <div key={item.key} className="container-fluid">
              <div>
                <h3 className="custome-slider-content">{item.title}</h3>
                <p className="custome-slider-content">{item.content}</p>
                <div className="btnHolder">
                  <Button type="primary" size="large">
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default CoverImageSlider;
