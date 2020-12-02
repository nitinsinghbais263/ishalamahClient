import * as types from './types';
import ReactNative from 'react-native';
import {baseUrl} from '../constants/API';
import AsyncStorage from '@react-native-community/async-storage';
import i18n from '../../lang/i18n';

export function addToCartSuccess(response) {
  return {
    type: types.ADD_TO_CART,
    payload: {
      response,
    },
  };
}

export function addToCartError(error) {
  return {
    type: types.ADD_TO_CART_ERROR,
    payload: {
      error,
    },
  };
}

export function addToCart(data) {
  return function(dispatch) {
    fetch(`${baseUrl}/order`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: data.state.token,
      },
      body: JSON.stringify({
        productUuid: data.state.productUuid,
        itemCount: data.state.itemCount,
      }),
    })
      .then(response => response.json())
      .then(responseJSON => {

        if (responseJSON.status == 'success') {

          let total = responseJSON.order;
          // var totals = "" + data.total
          // var count = "" +  data.total_items
          // AsyncStorage.setItem('CART_TOTAL', totals);
          // AsyncStorage.setItem('CART_COUNT', count);
          dispatch(addToCartSuccess(total));
        } else if (responseJSON.status == 'fail') {
          dispatch(addToCartError(responseJSON.error));
        } else {

          i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))
        }
      })
      .catch(error => {

        i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))
      });
  };
}

export function getItemTotalSuccess(response) {
  return {
    type: types.GET_ITEM_TOTAL,
    payload: {
      response,
    },
  };
}

export function getItemTotalError(error) {
  return {
    type: types.GET_ITEM_TOTAL_ERROR,
    payload: {
      error,
    },
  };
}

export function getItemTotal(data) {
  return function(dispatch) {
    fetch(`${baseUrl}/item-count`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: data.state.token,
      },
    })
      .then(response => response.json())
      .then(responseJSON => {

        if (responseJSON.status == 'success') {

          let data = responseJSON.orders;
          var totals = '' + data.total;
          var count = '' + data.total_items;
          AsyncStorage.setItem('CART_TOTAL', totals);
          AsyncStorage.setItem('CART_COUNT', count);
          dispatch(getItemTotalSuccess(data));
        } else if (responseJSON.status == 'fail') {
          dispatch(getItemTotalError(responseJSON.error));
        } else {

          i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))
        }
      })
      .catch(error => {

        i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))
      });
  };
}

export function getCartSuccess(response) {
  return {
    type: types.GET_CART_ITEM,
    payload: {
      response,
    },
  };
}

export function getCartError(error) {
  return {
    type: types.GET_CART_ITEM_ERROR,
    payload: {
      error,
    },
  };
}

export function getCart(data) {
  const orderStatus = '?orderStatus=cart';
  return function(dispatch) {
    fetch(`${baseUrl}/order${orderStatus}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: data.state.token,
      },
    })
      .then(response => response.json())
      .then(responseJSON => {
        if (responseJSON.status == 'success') {
          let items = responseJSON.orders.data;
          dispatch(getCartSuccess(items));
        } else if (responseJSON.status == 'fail') {
          dispatch(getCartError(responseJSON.error));
        } else {
          i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))
        }
      })
      .catch(error => {
        i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))
      });
  };
}

export function removeFromCartSuccess(response) {
  return {
    type: types.REMOVE_ITEM_FROM_CART,
    payload: {
      response,
    },
  };
}

export function removeFromCartError(error) {
  return {
    type: types.REMOVE_ITEM_FROM_CART_ERROR,
    payload: {
      error,
    },
  };
}

export function removeFromCart(data) {
  const uuid = data.state.uuid;
  return function(dispatch) {
    fetch(`${baseUrl}/order/${uuid}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: data.state.token,
      },
    })
      // .then(response =>  response.json())
      .then(responseJSON => {
        if (responseJSON.status == '204') {
          dispatch(removeFromCartSuccess(responseJSON));
        } else if (responseJSON.status == 'fail') {
          dispatch(removeFromCartError(responseJSON.error));
        } else {
          i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))
        }
      })
      .catch(error => {
        i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))
      });
  };
}

export function checkoutCartSuccess(response) {
  return {
    type: types.CHECKOUT_CART,
    payload: {
      response,
    },
  };
}

export function checkoutCartError(error) {
  return {
    type: types.CHECKOUT_CART_ERROR,
    payload: {
      error,
    },
  };
}

export function checkoutCart(_this, data) {
  return function(dispatch) {
    var that = _this;
    fetch(`${baseUrl}/checkout`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: _this.state.token,
      },
      body: JSON.stringify({
        subTotal: data.subTotal,
        total: data.total,
      }),
    })
      .then(response => response.json())
      .then(responseJSON => {
        if (responseJSON.status == 'success') {
          dispatch(checkoutCartSuccess(responseJSON));
          that.props.navigation.navigate('Purchase');
        } else if (responseJSON.status == 'fail') {
          dispatch(checkoutCartError(responseJSON.error));
        } else {
          i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))
        }
      })
      .catch(error => {
        i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))
      });
  };
}

export function getLatestOrdersSuccess(response) {
  return {
    type: types.GET_LATEST_ORDERS,
    payload: {
      response,
    },
  };
}

export function getLatestOrdersError(error) {
  return {
    type: types.GET_LATEST_ORDERS_ERROR,
    payload: {
      error,
    },
  };
}

export function getLatestOrders(data) {
  return function(dispatch) {
    fetch(`${baseUrl}/order?orderList=1`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: data.state.token,
      },
    })
      .then(response => response.json())
      .then(responseJSON => {
        if (responseJSON.status == 'success') {
          let data = responseJSON.orders.data;
          dispatch(getLatestOrdersSuccess(data));
        } else if (responseJSON.status == 'fail') {
          dispatch(getLatestOrdersError(responseJSON.error));
        } else {
          i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))
        }
      })
      .catch(error => {
        i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))
      });
  };
}

export function reorderSuccess(response) {
  return {
    type: types.REORDER_ITEMS,
    payload: {
      response,
    },
  };
}

export function reorderError(error) {
  return {
    type: types.REORDER_ITEMS_ERROR,
    payload: {
      error,
    },
  };
}

export function reorder(_this, data) {
  return function(dispatch) {
    var that = _this;
    fetch(`${baseUrl}/order`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: data.token,
      },
      body: JSON.stringify({
        previousOrderUuid: data.previousOrderUuid,
      }),
    })
      .then(response => response.json())
      .then(responseJSON => {
        if (responseJSON.status == 'success') {
          that.props.navigation.navigate('Cart');
          dispatch(reorderSuccess(responseJSON));
        } else if (responseJSON.status == 'fail') {
          dispatch(reorderError(responseJSON.error));
        } else {
          i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))
        }
      })
      .catch(error => {
        i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))
      });
  };
}

// export function getTaxSuccess(response){
//   return {
//     type: types.GET_TAX_SUCCESS,
//     payload: {
//       response
//     }
//   }
// }
//
// export function getTaxError(error){
//   return {
//     type: types.GET_TAX_ERROR,
//     payload: {
//       error
//     }
//   }
// }
//
// export function getTax(data) {
//
//   return function (dispatch) {
//
//     fetch(`https://staging.core.yejji.com/api/v1/work-experience/762c36c0-b776-11ea-bc21-f9476471976a`, {
//       method: 'PUT',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//         Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMzdjYWNjYmRmYjQ2MzA1YjNlZDc0ZGIzMmE4MWViNTgxMDJjMGRlYjhhNzFhN2E5NWVmMTA2YzhiNmMyMjJjMzc0Mjg4ZTQ0ODExNjgyY2IiLCJpYXQiOjE1OTMwODAzOTYsIm5iZiI6MTU5MzA4MDM5NiwiZXhwIjoxNjAxNzIwMzk2LCJzdWIiOiJlZWJmYTllMC1iNTQ5LTExZWEtOGMxYi02M2FhYWZkYTIxOTQiLCJzY29wZXMiOltdfQ.DjoMy22cygSe_W7cuusw8bkVkRxMrVQYonNyvg_UN3D7cgK37OdY_7CdeAWa9aaWHdZD4rkym9dz0uIwq8bymTz0gFAqtbqrrwE3qSAKNTrzIOqD5xvAOuLvL9CMsNDR2MBW-RyhXOKhudVTnAPsAt_6o9sMSZdMSXS3t0e-vSQV92KfCuaOO3MUOjMtpXaqIOXsXdTCDnGRicbsj1f5vNyftStbQEZRzwTnzkf7PdYkuLqHG18DY3x-AB1GqmfsoZL6nO8lWSmy2vPrVHoR1axFlJU4ciq52fdkkJKtMgKwk3zwKT4XlzAXI_C3F7uem7XYQdvwajEnRViwYQhMZiFm8wZg36a0TgaSIOxGdlqUgRXwignclh62AjHDUgdEek8LtTLMzH0mTNiaCHz5Ye5gydl7qHM7-taYTChnZgQ_gannQ8VSAia0RQvA6obsQ_K5ubQ--Bn5KsY2sL1J0ADpkEuX7hncTwmcn0ot_zRHa8X5vz7h1NHoPn4EsPR9m8zFczcsqiuH9jNty_DoqESBukTf2R9_PPOHK1_WUNQY830LhgqVxh5QCA5lYE2ywxg0eKDxaxy_9WzPkJUO7JganlXpL-EUUiPdo-FrQhNX6_VQvdsy1SmkHRjPtSfYsUMWEsAD5igi9e0vZbI-YiXAs5m0JRTRQUakPxJ80Mg'
//       },
//       body: JSON.stringify({
//           endOn:"2019-09",
//           startOn:"2019-05",
//           company:"yash",
//           jobTitle:"dev",
//           responsibilities:["find","debug"]
//       })
//     })
//     .then(response => response.json())
//     .then(responseJSON => {
//       if(responseJSON.status == "success"){
//         let tax = responseJSON
//         dispatch(getTaxSuccess(tax))
//       } else if(responseJSON.status == "fail"){
//         dispatch(getTaxError(responseJSON.error))
//       }else{
//         alert("i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))")
//       }
//     })
//     .catch( (error) => {
//       alert("i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))")
//     });
//   }
// }
