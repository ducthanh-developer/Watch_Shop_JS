const fetchProduct = () => {
  let id = getUrlParams().get("id");
  callApi(`products/${id}`)
    .then((res) => {
      renderProductDetail(res.data);
    })
    .catch((err) => console.log(err));
};

const renderProductDetail = (product) => {
  const { id, name, image, price, detail } = product;
  let productInfo = name.split(" ");
  let quantity = parseInt(getElById("productQuantity").value);
  getElById("btnAddCart").addEventListener("click", () =>
    addCart(id, name, image, price, quantity)
  );
  getElById("productImg").src = image;
  getElById("productName").textContent = name;
  getElById("productPrice").textContent = price.toLocaleString();
  getElById("productDesc").textContent = detail;
  getElById("productCode").textContent = productInfo[1];
  getElById("productBrand").textContent = productInfo[0];
};

const addProduct = () => {
  getElById("productQuantity").value =
    parseInt(getElById("productQuantity").value) + 1;
  fetchProduct();
};

const subProduct = () => {
  if (getElById("productQuantity").value > 1) {
    getElById("productQuantity").value =
      parseInt(getElById("productQuantity").value) - 1;
    fetchProduct();
  }
};

getElById("button-plus").addEventListener("click", addProduct);
getElById("button-minus").addEventListener("click", subProduct);

fetchProduct();
