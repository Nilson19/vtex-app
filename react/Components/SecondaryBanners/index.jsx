import React, { useEffect, useRef, useContext } from "react";
import { useCssHandles } from "vtex.css-handles";
import "./index.css";

import { GenderContext } from "../GenderPanel";

const CSS_HANDLES = [
  "slidersContainer",
  "sliderItem",
  "sliderImage",
  "sliderText",
  "sliderButton",
  "buttonLeft",
  "buttonCenter",
  "buttonRight",
];

const SecondaryBanners = ({ title, description, banners }) => {
  const handles = useCssHandles(CSS_HANDLES);
  const scrollRef = useRef(null);

  const genderContext = useContext(GenderContext);
  const selectedGender = genderContext ? genderContext.selectedGender : null;


  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let index = 0;
    const scrollNext = () => {
      if (!container) return;

      index = (index + 1) % banners.length;
      container.scrollTo({
        left: container.clientWidth * index,
        behavior: "smooth",
      });
    };

    const interval = setInterval(scrollNext, 4000); // cada 4s

    return () => clearInterval(interval);
  }, [banners]);

  return (
    <div className={handles.slidersContainer} ref={scrollRef}>
      {banners?.map((banner, index) => (
        <div
          key={index}
          className={handles.sliderItem}
          style={{ backgroundColor: banner.bgColor }}
        >
          {banner.image && (
            <img
              src={banner.image}
              alt={banner.text}
              className={handles.sliderImage}
            />
          )}
          <div className={handles.sliderText}>
            <h2>{banner.text}</h2>
            {banner.btnText && (
              <a
                href="#"
                className={`${handles.sliderButton} ${
                  handles[banner.btnPosition]
                }`}
              >
                {banner.btnText}
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

SecondaryBanners.schema = {
  title: "Banners Secundarios",
  description: "A component to display a series of banners in a slider format.",
  type: "object",
  properties: {
    banners: {
      title: "Banners Principales",
      type: "array",
      items: {
        type: "object",
        properties: {
          btnPosition: {
            type: "string",
            title: "Button Position",
            enum: ["left", "center", "right"],
            default: "left",
          },
          btnText: {
            type: "string",
            title: "Button Text",
            default: "Shop Now",
          },
          text: {
            type: "string",
            title: "Banner Text",
            default: "Welcome to our store!",
          },
          image: {
            type: "string",
            title: "Image URL",
            widget: {
              "ui:widget": "image-uploader",
            },
          },
          bgColor: {
            type: "string",
            title: "Background Color",
            default: "#ffffff",
          },
          gender: {
            type: "string",
            title: "gender",
            enum: ["male", "female"],
            default: "female",
          }
        },
      },
    },
  },
};

export default SecondaryBanners;
