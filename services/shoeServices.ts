import axiosConfig from "./axiosConfig";

// Hàm lấy tất cả giày từ axiosConfig
export const getShoes = async () => {
  try {
    const response = await axiosConfig.get("/shoes");
    return response.data;
  } catch (error) {
    console.error("Error fetching shoes:", error);
    throw error;
  }
};

// Hàm lấy thông tin chi tiết của một đôi giày dựa trên id
export const getShoeById = async (id: string) => {
  try {
    const response = await axiosConfig.get(`/shoes/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching shoe with id ${id}:`, error);
    throw error;
  }
};

// Hàm thêm một đôi giày mới vào axiosConfig
export const addShoe = async (newShoe: any) => {
  try {
    const response = await axiosConfig.post("/shoes", newShoe);
    return response.data;
  } catch (error) {
    console.error("Error adding shoe:", error);
    throw error;
  }
};

// Hàm cập nhật thông tin giày dựa trên id
export const updateShoe = async (id: string, updatedShoe: any) => {
  try {
    const response = await axiosConfig.put(`/shoes/${id}`, updatedShoe);
    return response.data;
  } catch (error) {
    console.error(`Error updating shoe with id ${id}:`, error);
    throw error;
  }
};

// Hàm xóa một đôi giày dựa trên id
export const deleteShoe = async (id: string) => {
  try {
    await axiosConfig.delete(`/shoes/${id}`);
  } catch (error) {
    console.error(`Error deleting shoe with id ${id}:`, error);
    throw error;
  }
};
