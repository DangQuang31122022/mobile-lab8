import { useRoute } from "@react-navigation/native";
import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
const images: { [key: string]: any } = {
  "1": require("../assets/s1.png"),
  "2": require("../assets/s2.png"),
  "3": require("../assets/s3.png"),
  "4": require("../assets/s4.png"),
  "5": require("../assets/s5.png"),
  "6": require("../assets/s6.png"),
  "7": require("../assets/s7.png"),
};
type Product = {
  id: string;
  name: string;
  discount: string;
  image: string;
  details?: {
    productName: string;
    sole: string;
    closure: string;
    width: string;
    features: [string];
    price: string;
  };
};

const ProductDetails = () => {
  const route = useRoute();
  const { product } = route.params as { product: Product };
  return (
    <View style={styles.container}>
      {/* Phần hiển thị hình ảnh sản phẩm */}
      <Image source={images[product.id]} style={styles.productImage} />

      {/* Phần hiển thị thông tin sản phẩm */}
      <View style={styles.productDetails}>
        <Text style={styles.productName}>
          {product.details?.productName ?? product.name}
        </Text>
        <Text style={styles.productInfo}>Sole: {product.details?.sole}</Text>
        <Text style={styles.productInfo}>
          Closure: {product.details?.closure}
        </Text>
        <Text style={styles.productInfo}>
          Shoe Width: {product.details?.width}
        </Text>
        {product.details?.features.map((feature, index) => (
          <Text key={index} style={styles.productInfo}>
            {feature}
          </Text>
        ))}

        {/* Hiển thị giá tiền */}
        <Text style={styles.productPrice}>{product.details?.price}</Text>
      </View>
    </View>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  productImage: {
    width: width * 0.8, // Chiếm 80% chiều rộng của màn hình
    height: width * 0.6, // Đặt chiều cao dựa trên chiều rộng để giữ tỉ lệ
    resizeMode: "contain",
    backgroundColor: "#FADADD", // Màu nền
    borderRadius: 10,
  },
  productDetails: {
    width: width * 0.8, // Chiếm 80% chiều rộng của màn hình
    padding: 10,
    backgroundColor: "#D8BFD8", // Màu nền cho phần thông tin
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginTop: -10, // Để hình ảnh và thông tin kết nối mượt mà
    elevation: 5,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#000",
  },
  productInfo: {
    fontSize: 14,
    marginBottom: 5,
    color: "#333",
  },
  productPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    textAlign: "right",
    marginTop: 10,
  },
});

export default ProductDetails;
