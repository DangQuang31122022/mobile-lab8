import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { getShoes } from "../services/shoeServices";

type Product = {
  id: string;
  name: string;
  discount: string;
  image: string;
  details?: {
    productName: string;
    sole: string;
    closure: string;
    shoeWidth: string;
    laceUp: string;
    gripRubberSole: string;
    paddedInsole: string;
    features: [string];
    price: string;
  };
};

// const products: Product[] = [
//   {
//     id: "1",
//     name: "Nike shoes",
//     discount: "50%",
//     image: "s1.png",
//   },
//   {
//     id: "2",
//     name: "Adidas shoes",
//     discount: "80%",
//     image: "s2.png",
//   },
//   {
//     id: "3",
//     name: "Nike Bicycle",
//     discount: "30%",
//     image: "s3.png",
//   },
//   {
//     id: "4",
//     name: "Yonex shoes",
//     discount: "50%",
//     image: "s4.png",
//   },
//   {
//     id: "5",
//     name: "Victor shoes",
//     discount: "50%",
//     image: "s5.png",
//   },
//   {
//     id: "6",
//     name: "Lining shoes",
//     discount: "50%",
//     image: "s6.png",
//   },
//   {
//     id: "7",
//     name: "Binh Minh shoes",
//     discount: "90%",
//     image: "s7.png",
//   },
// ];
const images: { [key: string]: any } = {
  "1": require("../assets/s1.png"),
  "2": require("../assets/s2.png"),
  "3": require("../assets/s3.png"),
  "4": require("../assets/s4.png"),
  "5": require("../assets/s5.png"),
  "6": require("../assets/s6.png"),
  "7": require("../assets/s7.png"),
};
const { width } = Dimensions.get("window");

const Portrait_a = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const [products, setProducts] = useState<Product[]>([]); // State để lưu dữ liệu sản phẩm
  const [loading, setLoading] = useState<boolean>(true); // State để quản lý loading

  // Hàm fetch dữ liệu giày từ API
  const fetchShoes = async () => {
    try {
      const data = await getShoes();
      setProducts(data); // Cập nhật state sản phẩm với dữ liệu từ API
    } catch (error) {
      console.error("Error fetching shoes:", error);
    } finally {
      setLoading(false); // Tắt trạng thái loading sau khi fetch dữ liệu
    }
  };

  // Dùng useEffect để gọi fetchShoes khi component được mount
  useEffect(() => {
    fetchShoes();
  }, []);

  const renderProduct = ({ item }: { item: Product }) => {
    return (
      <View style={styles.card}>
        <Image source={images[item.id]} style={styles.image} />
        <View style={styles.infoContainer}>
          <Text style={styles.title}>
            {item.name} - discount {item.discount}
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("ProductDetails", { product: item });
            }}
          >
            <Text style={styles.buttonText}>Pls touch to see detail</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 10,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginVertical: 10,
    borderRadius: 10,
    overflow: "hidden",
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
  },
  infoContainer: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  button: {
    backgroundColor: "#d3d3d3",
    padding: 8,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 14,
    color: "#000",
  },
});

export default Portrait_a;
