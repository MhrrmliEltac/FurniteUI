import { Skeleton } from "@mui/material";

type Dimensions = {
  width: string;
  height: string;
};

interface ProductDetailFooterType {
  description: string;
  material: string[];
  structureColor: string[];
  dimensions: Dimensions;
  style: string[];
}

const ProductDetailFooter: React.FC<ProductDetailFooterType> = ({
  description,
  material,
  style,
  dimensions,
  structureColor,
}) => {
  return (
    <section className="product-detail-footer-section">
      <div className="product-description">
        <h4>Product Details</h4>
        {!description ? (
          <Skeleton variant="text" height={40} width={450} />
        ) : (
          <p>{description}</p>
        )}
      </div>
      <div className="product-material">
        <h4>Materials</h4>
        <ul className="material-list">
          <li>
            {" "}
            Material: <span>{material}</span>
          </li>
          <li>
            Structure color: <span>{structureColor}</span>
          </li>
          <li>
            Style:{" "}
            {style &&
              style.map((item, index) => <span key={index}>{item}, </span>)}
          </li>
        </ul>
      </div>
      <div className="product-dimension">
        <h4>Dimensions</h4>
        <ul className="dimension-list">
          <li>
            Diameter: <span>{dimensions.width}</span>
          </li>
          <li>
            Height: <span>{dimensions.height}</span>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default ProductDetailFooter;
