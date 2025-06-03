import React, { useEffect, useRef } from "react";
import { useCssHandles } from "vtex.css-handles";
import "./index.css";

const CSS_HANDLES = [
  "promoBanner",
  "promoBannerTitle",
  "promoBannerContent",
  "promoBannerPromoItem",
  "promoBannerPromoItemImage",
  "promoBannerButton",
  "promoButtonLeft",
  "promoButtonCenter",
  "promoButtonRight",
];

const PromoBanner = ({ title, btnText, btnLink, btnPosition, promotions }) => {

  const handles = useCssHandles(CSS_HANDLES);
  const scrollRef = useRef(null);

  const handleButtonClick = () => {
    if (btnLink) {
      window.location.href = btnLink;
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let index = 0;
    const scrollNext = () => {
      if (!container) return;

      index = (index + 1) % promotions.length;
      container.scrollTo({
        left: container.clientWidth * index,
        behavior: "smooth",
      });
    };

    const interval = setInterval(scrollNext, 4000); // cada 4s

    return () => clearInterval(interval);
  }, [promotions.length]);

  if (!promotions || promotions.length === 0) {
    return null; // No hay promociones para mostrar
  }

  return (
    <div className={handles.promoBanner}>
      <h2 className={handles.promoBannerTitle}>{title}</h2>
      <div className={handles.promoBannerContent} ref={scrollRef}>
        {promotions.map((promo, index) => (
          <div key={index} className={handles.promoBannerPromoItem}>
            {promo.image && (
              <img
                src={promo.image}
                alt={promo.title}
                className={handles.promoBannerPromoItemImage}
              />
            )}
          </div>
        ))}
      </div>
      <button onClick={() => handleButtonClick()}>{btnText}</button>
    </div>
  );
};

PromoBanner.schema = {
  title: "Promo Banner",
  description: "A banner to display promotional items",
  type: "object",
  properties: {
    title: {
      type: "string",
      title: "Banner Title",
      default: "Promotions",
    },
    btnText: {
      type: "string",
      title: "Button Text",
      default: "Shop Now",
    },
    btnLink: {
      type: "string",
      title: "Button Link",
      default: "/promotions",
    },
    btnPosition: {
      type: "string",
      title: "Button Position",
      enum: ["left", "center", "right"],
      default: "left",
    },
    promotions: {
      title: "Promotions",
      type: "array",
      items: {
        type: "object",
        properties: {
          title: {
            type: "string",
            title: "Title",
          },
          image: {
            type: "string",
            title: "Image",
            "widget": {
              "ui:widget": "image-uploader",
            },
          },
        },
      },
    },
  },
};

export default PromoBanner;
