const fetchCategory = () => {
  callApi("categories")
    .then((res) => {
      renderCategory(res.data);
    })
    .catch((err) => console.log(err));
};

const cartQuantity = () => {
  let cart = getLocalStorage("CART");
  document.getElementById("cartQuantity").textContent = cart ? cart.length : 0;
};

const renderCategory = (categories) => {
  let content = "";
  for (let category of categories) {
    const { id, name } = category;
    content = `<a class="dropdown-item" href="category.html?id=${id}">${name}</a>`;
    getElById("categoryList").innerHTML += content;
  }
};

const addCart = (id, name, image, price, quantity = 1) => {
  let cart = [];
  if (!getLocalStorage("CART")) {
    cart.push({ id, name, image, price, quantity });
  } else {
    cart = getLocalStorage("CART");
    let index = cart.findIndex((item) => item.id === id);
    if (index == -1) {
      cart.push({ id, name, image, price, quantity });
    } else {
      cart[index].quantity += 1;
    }
  }
  setLocalStorage("CART", cart);
  cartQuantity();
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Thêm giỏ hàng thành công",
    showConfirmButton: false,
    timer: 1500,
  });
};

getElById("btnSearch").addEventListener("click", () => {
  let search = getElById("search").value;
  window.location = `search.html?search=${search}`;
});

cartQuantity();

fetchCategory();
