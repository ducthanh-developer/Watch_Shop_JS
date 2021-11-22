let contentCate = "";
let contentPagi = "";
let content = "";

const fetchProductsApi = (page = 1, sort = "") => {
  callApi(`products?_page=${page}&_limit=5${sort}`)
    .then((res) => {
      count = res.headers["x-total-count"];
      renderProducts(res.data, page);
    })
    .catch((err) => console.log(err));
};

const renderProducts = (products, page) => {
  getElById("products-content").innerHTML = "";
  for (let pro of products) {
    const { id, image, name, price, detail, cat_id } = pro;
    content = `<tr>
        <td>${id}</td>
        <td>
          ${name}
        </td>
        <td style="display: flex">
          <div>
            <img
              src="${image}"
              alt=""
              width="80px"
            />
          </div>
          <div>
           ${detail}
          </div>
        </td>
        <td class="text-center">${price.toLocaleString()}</td>
        <td class="project-actions text-center">
          <a
            class="btn btn-info btn-sm"
            data-toggle="modal"
            data-target="#modal-edit"
            onclick="editProducts(${id})"
          >
            <i class="fas fa-pencil-alt"> </i>
            Sửa
          </a>
          <a class="btn btn-danger btn-sm" onclick="deleteAlert(${id})">
            <i class="fas fa-trash"> </i>
            Xóa
          </a>
        </td>
      </tr>`;
    getElById("products-content").innerHTML += content;
  }

  let numOfPage = Math.ceil(count / 5);
  contentPagi = `<li class="page-item">
                <a class="page-link" href="#">Trước</a>
              </li>`;
  for (let i = 1; i <= numOfPage; i++) {
    contentPagi += `<li class="page-item ${
      page == i ? "active" : ""
    }"><a class="page-link" href="#" onclick="fetchProductsApi('${i}')">${i}</a></li>`;
  }
  contentPagi += `<li class="page-item">
                <a class="page-link" href="#">Sau</a>
              </li>`;
  getElById("pagination").innerHTML = contentPagi;
};

const fetchCategoriesApi = async () => {
  try {
    const response = await callApi("categories");
    for (let cate of response.data) {
      contentCate += `<option value="${cate.id}">${cate.name}</option>`;
    }
    getElById("category-list").innerHTML = contentCate;
    getElById("category-edit").innerHTML = contentCate;
  } catch (err) {
    console.log(err);
  }
};
fetchCategoriesApi();

const insertProductsApi = async (product) => {
  try {
    const response = await callApi("products", "POST", product);
  } catch (err) {
    console.log(err);
  }
};

const insertProducts = () => {
  let valid = true;
  let image = getElById("proImage").value;
  let name = getElById("proName").value;
  let price = Number(getElById("proPrice").value);
  let detail = getElById("proDetail").value;
  let cat_id = getElById("category-list").value;
  if (name == "") {
    getElById("errName").textContent = "Tên sản phẩm không để trống!";
    valid = false;
  } else valid = valid && true;
  if (detail == "") {
    getElById("errDetail").textContent = "Mô tả không để trống!";
    valid = false;
  } else valid = valid && true;

  if (price == "") {
    getElById("errPrice").textContent = "Giá không để trống!";
    valid = false;
  } else valid = valid && true;
  if (image == "") {
    getElById("errImage").textContent = "Hình ảnh không để trống!";
    valid = false;
  } else valid = valid && true;
  if (valid) {
    let product = { image, name, price, detail, cat_id };
    insertProductsApi(product);
    getElById("formInsert").reset();
    successAlert();
  }
};

const deleteProductsApi = async (id) => {
  try {
    const response = await callApi(`products/${id}`, "DELETE");
    console.log(response);
  } catch (err) {
    console.log(err);
  }
};

const editProductsApi = async (id, product) => {
  try {
    const response = await callApi(`products/${id}`, "PUT", product);
    console.log(response);
  } catch (err) {
    console.log(err);
  }
};

const editProducts = (id) => {
  callApi(`products/${id}`)
    .then((res) => {
      const { id, image, name, price, detail, cat_id } = res.data;
      getElById("category-edit").value = cat_id;
      getElById("productImage").value = image;
      getElById("productName").value = name;
      getElById("productPrice").value = price;
      getElById("productDetail").value = detail;
    })
    .catch((err) => console.log(err));
  getElById("btnEdit").addEventListener("click", () => {
    let valid = true;
    let image = getElById("productImage").value;
    let name = getElById("productName").value;
    let price = getElById("productPrice").value;
    let detail = getElById("productDetail").value;
    let cat_id = getElById("category-edit").value;
    if (name == "") {
      getElById("errNameEdit").textContent = "Tên sản phẩm không để trống!";
      valid = false;
    } else valid = valid && true;
    if (detail == "") {
      getElById("errDetailEdit").textContent = "Mô tả không để trống!";
      valid = false;
    } else valid = valid && true;

    if (price == "") {
      getElById("errPriceEdit").textContent = "Giá không để trống!";
      valid = false;
    } else valid = valid && true;
    if (image == "") {
      getElById("errImageEdit").textContent = "Hình ảnh không để trống!";
      valid = false;
    } else valid = valid && true;
    if (valid) {
      let product = { id, image, name, price: Number(price), detail, cat_id };
      editProductsApi(id, product);
      getElById("formEdit").reset();
      successAlert();
    }
  });
};

const deleteAlert = (id) => {
  Swal.fire({
    title: "Bạn chắc chắn muốn xóa?",
    text: "Dữ liệu sẽ bị xóa sẽ không thể hoàn tác",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "Thoát",
    confirmButtonText: "Tiếp tục xóa",
  }).then((result) => {
    if (result.isConfirmed) {
      deleteProductsApi(id);
      Swal.fire("Đã xóa!", "", "success");
    }
  });
};

const successAlert = () => {
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Chỉnh sửa của bạn đã được lưu",
    showConfirmButton: false,
    timer: 1500,
  });
};

getElById("btnInsert").addEventListener("click", insertProducts);

fetchProductsApi();
