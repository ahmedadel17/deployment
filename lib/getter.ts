import axios from "axios";

const getRequest = async (
  endpoint: string,
  headers:any
) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`,
      {
        headers: {
          "Content-Type": "application/json",
          ...headers, // merge custom headers
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};

export default getRequest;
