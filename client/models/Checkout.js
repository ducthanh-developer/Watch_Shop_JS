const setOrderInfo = (e) => {
  let customer_name = getElById("fullName").value;
  let customer_address = getElById("address").value;
  let customer_email = getElById("email").value;
  let customer_phone = getElById("phone").value;
  let create_date = moment().format("DD/MM/YYYY");
  let status = "Thành công";
  const order = {
    customer_name,
    customer_address,
    customer_email,
    customer_phone,
    create_date,
    status,
  };
  callApi("orders", "POST", order)
    .then((res) => inderOrderDetail(res.data.id))
    .catch((err) => console.log(err));
};

const inderOrderDetail = (orderID) => {
  let cart = getLocalStorage("CART");
  cart.forEach((product) => {
    const { id, price, quantity } = product;
    let orderDetail = {
      order_id: orderID,
      product_id: id,
      quantity: quantity,
      unti_price: price * quantity,
    };
    callApi("order_detail", "POST", orderDetail)
      .then(() => {
        window.localStorage.removeItem("CART");
        window.location = "order-complete.html";
      })
      .catch((err) => console.log(err));
  });
};

const validateForm = () => {
  getElById("fullName").addEventListener("blur", () =>
    validatEmpty("fullName", "nameErr", "Vui lòng không để trống họ và tên!")
  );
  getElById("email").addEventListener("blur", () => {
    let regex = /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/gm;
    validatEmpty("email", "emailErr", "Vui lòng không để trống email!");
    validateByRegex(
        "email",
        "emailErr",
        "Vui lòng nhập đúng định dạng email!",
        regex
      );
  });
  getElById("phone").addEventListener("blur", () => {
    regex = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/g;
    validatEmpty("phone", "phoneErr", "Vui lòng không để trống số điện thoại!");
    validateByRegex(
        "phone",
        "phoneErr",
        "Vui lòng nhập đúng định dạng số điện thoại!",
        regex
      );
  });
  getElById("address").addEventListener("blur", () =>
    validatEmpty("address", "addressErr", "Vui lòng không để trống địa chỉ!")
  );
};
validateForm();

getElById("form-order").addEventListener("submit", (e) => e.preventDefault());
getElById("btnOrder").addEventListener("click", (e) => setOrderInfo(e));
