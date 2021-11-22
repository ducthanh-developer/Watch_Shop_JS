const fetchOrderApi = async () => {
  try {
    const response = await callApi("orders");
    renderOrder(response.data);
  } catch (err) {
    console.log(err);
  }
};

const renderOrder = (orders) => {
  getElById("order-content").innerHTML = "";
  let content = "";
  for (let order of orders) {
    const {
      id,
      customer_name,
      customer_address,
      customer_email,
      customer_phone,
      create_date,
      status,
    } = order;
    content += `<tr>
    <td>${id}</td>
    <td class="text-center">${customer_name}</td>
    <td>${customer_address}</td>
    <td class="text-center">${customer_email}</td>
    <td class="text-center">${customer_phone}</td>
    <td class="text-center">${create_date}</td>
    <td class="text-center">${status}</td>
    <td class="project-actions text-center">
      <a
        class="btn btn-primary btn-sm"
        data-toggle="modal"
        data-target="#modal-view"
        onclick="fetchOrderDetailApi(${id})"
      >
        <i class="fas fa-folder"> </i>
        Xem
      </a>
    </td>
  </tr>`;
  }
  getElById("order-content").innerHTML = content;
};

const fetchOrderDetailApi = async (id) => {
  try {
    const response = await callApi(`order_detail?order_id=${id}`);
    renderOrderDetail(response.data);
  } catch (err) {
    console.log(err);
  }
};

const renderOrderDetail = async (orderDetails) => {
  let content = "";
  getElById("detail-content").innerHTML = "";
  for (let detail of orderDetails) {
    const { id, product_id, quantity, unti_price } = detail;
    const product = await callApi(`products/${product_id}`);
    const {name} = product.data;
    content += `<tr>
        <td>${id}</td>
        <td class="text-left">
          ${name}
        </td>
        <td class="text-center">${quantity}</td>
        <td class="text-center">${unti_price.toLocaleString()}</td>
      </tr>`;
  }
  getElById("detail-content").innerHTML = content;
};

fetchOrderApi();
