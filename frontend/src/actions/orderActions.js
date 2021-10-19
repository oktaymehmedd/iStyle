import axios from "axios";

export const createOrder = (order) => (dispatch, getState) => {
  dispatch({
    type: "ORDER_CREATE_REQUEST",
  });

  const {
    userLogin: { userInfo },
  } = getState();

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  axios
    .post(`/api/orders`, order, config)
    .then(({ data }) => {
      dispatch({
        type: "ORDER_CREATE_SUCCESS",
        payload: data,
      });
    })
    .catch((error) => {
      dispatch({
        type: "ORDER_CREATE_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    });
};