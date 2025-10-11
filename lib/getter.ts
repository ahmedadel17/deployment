import axios from "axios";

const getRequest = async (
  endpoint: string,
  headers:any,
  body:any,
  locale:string,
  token?:string | null
) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`,
      {
        headers: {
          "Content-Type": "application/json",
          'Accept-Language': locale || 'en',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          ...headers,
           // merge custom headers
        },
        data: body,
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
