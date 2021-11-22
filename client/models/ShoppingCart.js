
const renderCart = () => {
  let cart = getLocalStorage("CART");
  document.getElementById("cartContent").innerHTML = "";
  let content = ``;
  let total = 0;
  for (let product of cart) {
    const { id, name, image, price, quantity } = product;
    content = `<tr>
            <td>
              <figure class="itemside">
                <div class="aside">
                  <img
                    src="${image}"
                    class="img-sm"
                  />
                </div>
                <figcaption class="info">
                  <a href="product.html" class="title text-dark"
                    >${name}</a
                  >
                  <p class="text-muted small">Brand: Gucci</p>
                </figcaption>
              </figure>
            </td>
            <td>
              <div class="input-group input-spinner">
                <div class="input-group-prepend">
                  <button
                    class="btn btn-light"
                    type="button"
                    id="button-plus"
                    onclick="decreaseQuantity(${id})"
                  >
                    <i class="fa fa-minus"></i>
                  </button>
                </div>
                <input type="text" class="form-control" value="${quantity}" />
                <div class="input-group-append">
                  <button
                    class="btn btn-light"
                    type="button"
                    id="button-minus"
                    onclick="increaseQuantity(${id})"
                  >
                    <i class="fa fa-plus"></i>
                  </button>
                </div>
              </div>
            </td>
            <td>
              <div class="price-wrap">
                <var class="price">${(price * quantity).toLocaleString()}</var>
                <small class="text-muted"> ${price.toLocaleString()} / 1 cái </small>
              </div>
              <!-- price-wrap .// -->
            </td>
            <td class="text-right">
              <button class="btn btn-light" onclick="deleteCart(${id})"> Xóa</button>
            </td>
          </tr>`;
    total += price * quantity; 
    document.getElementById("cartContent").innerHTML += content;
  }
  document.getElementById("cartQuantity").textContent = cart.length;
  document.getElementById("total").textContent = total.toLocaleString();
  document.getElementById("totalPrice").textContent = total.toLocaleString();
};

const decreaseQuantity = (id) => {
  let cart = getLocalStorage("CART");
  let index = cart.findIndex((item) => item.id === id);
  if (cart[index].quantity > 1) cart[index].quantity -= 1;
  setLocalStorage("CART", cart);
  renderCart();
};

const increaseQuantity = (id) => {
  let cart = getLocalStorage("CART");
  let index = cart.findIndex((item) => item.id === id);
  cart[index].quantity += 1;
  setLocalStorage("CART", cart);
  renderCart();
};

const deleteCart = (id) => {
  let cart = getLocalStorage("CART");
  let index = cart.findIndex((item) => item.id === id);
  cart.splice(index, 1);
  setLocalStorage("CART", cart);
  renderCart();
};

renderCart();
