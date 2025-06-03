import React, { useContext, useMemo } from "react";
import { GenderContext } from "../GenderPanel";

const ProductsGrid = ({
  orderBy = "OrderByReleaseDateDESC",
  maxItems = 10,
  products = [],
}) => {
  const { selectedGender } = useContext(GenderContext);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "16px",
      }}
    >
      {products.map((product) => (
        <div
          key={product.productId}
          style={{
            border: "1px solid #eee",
            borderRadius: "8px",
            padding: "16px",
            background: "#fff",
          }}
        >
          <img
            src={product.items[0]?.images[0]?.imageUrl}
            alt={product.productName}
            style={{ width: "100%", height: "150px", objectFit: "contain" }}
          />
          <h3 style={{ fontSize: "1rem", margin: "12px 0 4px" }}>
            {product.productName}
          </h3>
          <p style={{ color: "#888", fontSize: "0.9rem" }}>{product.brand}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductsGrid;
