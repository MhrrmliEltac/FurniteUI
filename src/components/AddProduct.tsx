import { ChangeEvent, useState, useEffect } from "react";
import axios from "axios";

// chairs array-ı ilə məhsul məlumatları
const chairs = [
  {
    name: "Ergonomic Office Chair",
    price: 199.99,
    discountPrice: 149.99,
    discountPercent: 25,
    description: "An ergonomic office chair for comfortable working.",
    colors: ["Black", "White", "Gray"],
    structureColor: ["Black", "Silver"],
    material: ["Leather", "Metal"],
    size: ["Small", "Medium", "Large"],
    category: "Office Furniture",
    subCategory: "Chairs",
  },
  // {
  //   name: "Gaming Chair",
  //   price: 299.99,
  //   discountPrice: 249.99,
  //   discountPercent: 15,
  //   description:
  //     "A chair designed for long gaming sessions with great comfort.",
  //   colors: ["Red", "Black", "Blue"],
  //   structureColor: ["Black", "Red"],
  //   material: ["Fabric", "Metal"],
  //   size: ["Medium", "Large"],
  //   category: "Gaming Furniture",
  //   subCategory: "Chairs",
  // },
  // // başqa məhsullar əlavə oluna bilər
];

const AddProduct = () => {
  const [images, setImages] = useState<File[]>([]);

  // Fayl seçimini idarə etmək üçün funksiya
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files)); // Seçilən şəkilləri array-ə çeviririk
    }
  };

  useEffect(() => {
    const sendData = async () => {
      const formDataToSend = new FormData();

      // Statik məlumatları FormData obyektinə əlavə edirik
      chairs.forEach((product, index) => {
        formDataToSend.append(`product_${index}_name`, product.name);
        formDataToSend.append(
          `product_${index}_price`,
          product.price.toString()
        );
        formDataToSend.append(
          `product_${index}_discountPrice`,
          product.discountPrice.toString()
        );
        formDataToSend.append(
          `product_${index}_discountPercent`,
          product.discountPercent.toString()
        );
        formDataToSend.append(
          `product_${index}_description`,
          product.description
        );
        formDataToSend.append(
          `product_${index}_colors`,
          JSON.stringify(product.colors)
        );
        formDataToSend.append(
          `product_${index}_structureColor`,
          JSON.stringify(product.structureColor)
        );
        formDataToSend.append(
          `product_${index}_material`,
          JSON.stringify(product.material)
        );
        formDataToSend.append(
          `product_${index}_size`,
          JSON.stringify(product.size)
        );
        formDataToSend.append(`product_${index}_category`, product.category);
        formDataToSend.append(
          `product_${index}_subCategory`,
          product.subCategory
        );
      });

      // Faylları əlavə edirik
      images.forEach((file) => {
        formDataToSend.append("images", file); // Hər şəkil faylını `images` sahəsinə əlavə edirik
      });

      try {
        // Bütün məlumatları göndəririk
        const response = await axios.post(
          "http://localhost:4000/api/products/create",
          formDataToSend,
          { headers: { "Content-Type": "multipart/form-data" } } // multipart/form-data ilə göndəririk
        );
        console.log("Products created:", response.data);
      } catch (error) {
        console.error("Error creating products:", error);
      }
    };

    if (images.length > 0) {
      sendData(); // Fayl seçildikdən sonra məlumatları göndəririk
    }
  }, [images]); // images array dəyişdikcə bu effect çağrılır

  return (
    <div>
      <h1>Upload Product Images</h1>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
      />
      <div style={{ marginTop: "10px" }}>
        <p>Selected images:</p>
        {images.length > 0 && (
          <ul>
            {images.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AddProduct;
