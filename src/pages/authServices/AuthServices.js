import axios from "axios";
import baseURLCustomerDash, {
  baseURLprofile,
  baseURLcart,
  baseURLOrder,
  baseURLProduct,
} from "./Url";

const getDataUser = async (Endpoint) => {
  try {
    const customerToken = await localStorage.getItem("accessToken");
    console.log("@@@@@@@@@@@@@@@customerToken", customerToken);
    const response = await axios({
      method: "GET",
      url: `${baseURLprofile}${Endpoint}`,
      headers: {
        "x-access-token": customerToken,
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const postDataProduct = async (Endpoint, data) => {
  try {
    const customerToken = await localStorage.getItem("accessToken");
    console.log(baseURLOrder + Endpoint, "URL");
    // console.log('@@@@@@@@@@@@@@@customerToken',JSON.parse(customerToken)['x-access-token']);
    const response = await axios({
      method: "POST",
      url: baseURLProduct + Endpoint,
      headers: {
        "Content-Type": "multipart/form-data",
        "x-access-token": customerToken,
      },
      data: data,
    });
    // console.log('responsefollowshop', response);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const patchDataProduct = async (Endpoint, data) => {
  try {
    const customerToken = await localStorage.getItem("accessToken");
    console.log(baseURLOrder + Endpoint, "URL");
    // console.log('@@@@@@@@@@@@@@@customerToken',JSON.parse(customerToken)['x-access-token']);
    const response = await axios({
      method: "PATCH",
      url: baseURLProduct + Endpoint,
      headers: {
        "Content-Type": "multipart/form-data",
        "x-access-token": customerToken,
      },
      data: data,
    });
    // console.log('responsefollowshop', response);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const deleteDataProduct = async (Endpoint) => {
  try {
    const customerToken = await localStorage.getItem("accessToken");
    console.log(baseURLOrder + Endpoint, "URL");
    // console.log('@@@@@@@@@@@@@@@customerToken',JSON.parse(customerToken)['x-access-token']);
    const response = await axios({
      method: "DELETE",
      url: baseURLProduct + Endpoint,
      headers: {
        "Content-Type": "multipart/form-data",
        "x-access-token": customerToken,
      },
    });
    // console.log('responsefollowshop', response);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const getDataProduct = async (Endpoint) => {
  try {
    const customerToken = await localStorage.getItem("accessToken");
    console.log(baseURLOrder + Endpoint, "URL");

    // console.log('@@@@@@@@@@@@@@@customerToken',JSON.parse(customerToken)['x-access-token']);
    const response = await axios({
      method: "GET",
      url: baseURLProduct + Endpoint,
      headers: {
        "Content-Type": "multipart/form-data",
        "x-access-token": customerToken,
      },
    });
    // console.log('responsefollowshop', response);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const postDataAdmin = async (Endpoint, data) => {
  try {
    const customerToken = await localStorage.getItem("accessToken");
    console.log(baseURLOrder + Endpoint, "URL");
    // console.log('@@@@@@@@@@@@@@@customerToken',JSON.parse(customerToken)['x-access-token']);
    const response = await axios({
      method: "POST",
      url: baseURLProduct + Endpoint,
      headers: {
        "Content-Type": "multipart/form-data",
        "x-access-token": customerToken,
      },
      data: data,
    });
    // console.log('responsefollowshop', response);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const putDataCDash = async (Endpoint) => {
  try {
    const customerToken = await localStorage.getItem("TokensData");
    // console.log('@@@@@@@@@@@@@@@customerToken',JSON.parse(customerToken)['x-access-token']);
    const response = await axios({
      method: "PUT",
      url: `${baseURLCustomerDash}${Endpoint}`,
      headers: {
        "x-access-token": JSON.parse(customerToken)["x-access-token"],
      },
    });
    console.log("responsefollowshop", response);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const putDataCart = async (Endpoint) => {
  try {
    const customerToken = await localStorage.getItem("TokensData");
    // console.log('@@@@@@@@@@@@@@@customerToken',JSON.parse(customerToken)['x-access-token']);
    const response = await axios({
      method: "PUT",
      url: `${baseURLcart}${Endpoint}`,
      headers: {
        "x-access-token": JSON.parse(customerToken)["x-access-token"],
      },
    });
    console.log("responsefollowshop", response);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const postDataOrder = async (Endpoint) => {
  try {
    const customerToken = await localStorage.getItem("TokensData");
    console.log(baseURLOrder + Endpoint, "URL");
    // console.log('@@@@@@@@@@@@@@@customerToken',JSON.parse(customerToken)['x-access-token']);
    const response = await axios({
      method: "GET",
      url: baseURLOrder + Endpoint,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "x-access-token": JSON.parse(customerToken)["x-access-token"],
      },
    });
    // console.log('responsefollowshop', response);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

// const getDataOrder = async (Endpoint) => {
//     try {
//         const customerToken = await AsyncStorage.getItem('TokensData');
//         console.log('@@@@@@@@@@@@@@@customerToken',JSON.parse(customerToken)['x-access-token']);
//         const response = await axios({
//             method: 'GET',
//             url: `${baseURLcart}${Endpoint}`,
//             headers: {
//                 'x-access-token': JSON.parse(customerToken)['x-access-token']
//             }
//         })
//         return response.data;
//     } catch (err) {
//         console.log(err);
//     }
// };

const getDataCart = async (Endpoint) => {
  try {
    const customerToken = await localStorage.getItem("TokensData");
    console.log(
      "@@@@@@@@@@@@@@@customerToken",
      JSON.parse(customerToken)["x-access-token"]
    );
    const response = await axios({
      method: "GET",
      url: `${baseURLcart}${Endpoint}`,
      headers: {
        "x-access-token": JSON.parse(customerToken)["x-access-token"],
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const deleteCart = async (Endpoint) => {
  try {
    // console.log('data', data);
    const customerToken = await localStorage.getItem("TokensData");
    const response = await axios({
      method: "DELETE",
      url: `${baseURLcart}${Endpoint}`,
      headers: {
        // 'Content-Type': 'application/json; charset=utf-8',
        "x-access-token": JSON.parse(customerToken)["x-access-token"],
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const getDataOrder = async (Endpoint) => {
  try {
    const customerToken = await localStorage.getItem("TokensData");
    console.log(
      "@@@@@@@@@@@@@@@customerToken",
      JSON.parse(customerToken)["x-access-token"]
    );
    const response = await axios({
      method: "GET",
      url: `${baseURLOrder}${Endpoint}`,
      headers: {
        "x-access-token": JSON.parse(customerToken)["x-access-token"],
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const putDataCDash1 = async (Endpoint, data) => {
  try {
    console.log("data", data);
    const customerToken = await localStorage.getItem("TokensData");
    const response = await axios({
      method: "PUT",
      url: `${baseURLCustomerDash}${Endpoint}`,
      // body: JSON.stringify(data),
      data: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "x-access-token": JSON.parse(customerToken)["x-access-token"],
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const getDataCProfile = async (Endpoint) => {
  try {
    const customerToken = await localStorage.getItem("TokensData");
    const response = await axios({
      method: "GET",
      url: `${baseURLprofile}${Endpoint}`,
      headers: {
        "x-access-token": JSON.parse(customerToken)["x-access-token"],
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const liveRate = async () => {
  try {
    const response = await axios({
      method: "GET",
      url: "https://zelt-cart.moshimoshi.cloud/cart/live-rate",
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const putProfile = async (Endpoint, data) => {
  try {
    console.log("data", data);
    const customerToken = await localStorage.getItem("TokensData");
    const response = await axios({
      method: "PUT",
      url: `${baseURLprofile}${Endpoint}`,
      // body: JSON.stringify(data),
      data: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        // 'Content-Type': 'multipart/form-data',
        "x-access-token": JSON.parse(customerToken)["x-access-token"],
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const putProfile2 = async (Endpoint, data) => {
  try {
    console.log("data", data);
    const customerToken = await localStorage.getItem("TokensData");
    const response = await axios({
      method: "PUT",
      url: `${baseURLprofile}${Endpoint}`,
      // body: JSON.stringify(data),
      data: JSON.stringify(data),
      // headers: {
      //     // 'Content-Type': 'application/json; charset=utf-8',
      //     'Content-Type': 'multipart/form-data',
      //     'x-access-token':JSON.parse(customerToken)['x-access-token'],
      // }
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const putProfile1 = async (Endpoint, data) => {
  try {
    console.log("data", data);
    const customerToken = await localStorage.getItem("TokensData");
    const response = await axios({
      method: "PUT",
      url: `${baseURLprofile}${Endpoint}`,
      data: JSON.stringify(data),
      headers: {
        // 'Content-Type': 'application/json; charset=utf-8',
        "Content-Type": "multipart/form-data",
        "x-access-token": JSON.parse(customerToken)["x-access-token"],
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
  // const postDataC = async (Endpoint, data) => {
  //     return axios
  //         .post(baseURLCustomerDash + Endpoint, data)
  //         .then((response) => {
  //             return response.data;
  //         })
  //         .catch((err) => {
  //             return err;
  //         });
  // };
};

const postProfile = async (Endpoint, data) => {
  try {
    console.log("data", data);
    const customerToken = await localStorage.getItem("TokensData");
    const response = await axios({
      method: "POST",
      url: `${baseURLprofile}${Endpoint}`,
      // body: JSON.stringify(data),
      data: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "x-access-token": JSON.parse(customerToken)["x-access-token"],
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const postCustomerInvestment = async (Endpoint, data) => {
  try {
    console.log("data", data);
    const customerToken = await localStorage.getItem("TokensData");
    const response = await axios({
      method: "POST",
      url: `${baseURLCustomerDash}${Endpoint}`,
      // body: JSON.stringify(data),
      data: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "x-access-token": JSON.parse(customerToken)["x-access-token"],
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const patchCustomerInvestment = async (Endpoint, data) => {
  try {
    console.log("data", data);
    const customerToken = await localStorage.getItem("TokensData");
    const response = await axios({
      method: "PATCH",
      url: `${baseURLCustomerDash}${Endpoint}`,
      // body: JSON.stringify(data),
      data: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "x-access-token": JSON.parse(customerToken)["x-access-token"],
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const addWishlist = async (Endpoint) => {
  try {
    // console.log('data', data);
    const customerToken = await localStorage.getItem("TokensData");
    const response = await axios({
      method: "POST",
      url: `${baseURLCustomerDash}${Endpoint}`,
      headers: {
        // 'Content-Type': 'application/json; charset=utf-8',
        "x-access-token": JSON.parse(customerToken)["x-access-token"],
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const deleteWishlist = async (Endpoint) => {
  try {
    // console.log('data', data);
    const customerToken = await localStorage.getItem("TokensData");
    const response = await axios({
      method: "DELETE",
      url: `${baseURLCustomerDash}${Endpoint}`,
      headers: {
        // 'Content-Type': 'application/json; charset=utf-8',
        "x-access-token": JSON.parse(customerToken)["x-access-token"],
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const getDataC = (Endpoint) => {
  return axios
    .get(baseURLCustomerDash + Endpoint)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

const postDataC = async (Endpoint, data) => {
  return axios
    .post(baseURLCustomerDash + Endpoint, data)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

const postCallC = (url, body, config) => {
  return new Promise((resolve, reject) => {
    axios
      .post(baseURLCustomerDash + url, body, config)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        if (error.response) resolve(error.response.data);
      });
  });
};

const getCallC = (url) => {
  return new Promise((resolve, reject) => {
    axios
      .get(baseURLCustomerDash + url)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        if (error.response) resolve(error.response.data);
      });
  });
};

const placeOrder = async (Endpoint) => {
  try {
    // console.log('data', data);
    const customerToken = await localStorage.getItem("TokensData");
    const response = await axios({
      method: "POST",
      url: `${baseURLOrder}${Endpoint}`,
      // body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "x-access-token": JSON.parse(customerToken)["x-access-token"],
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export default {
  getDataUser,
  postDataProduct,
  patchDataProduct,
  deleteDataProduct,
  getDataProduct,
  postDataAdmin,
  getDataC,
  postDataC,
  postCallC,
  getCallC,
  deleteWishlist,
  addWishlist,
  getDataCProfile,
  putProfile,
  liveRate,
  postCustomerInvestment,
  putDataCDash,
  putDataCDash1,
  putDataCart,
  getDataCart,
  deleteCart,
  getDataOrder,
  postDataOrder,
  postProfile,
  placeOrder,
  putProfile1,
  putProfile2,
  patchCustomerInvestment,
};
