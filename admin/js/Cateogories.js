let content = "";

const fetchCategoriesApi = async () => {
  try {
    const response = await callApi("categories");
    renderCategories(response.data);
  } catch (err) {
    console.log(err);
  }
};

const insertCategoriesApi = async (category) => {
  try {
    const response = await callApi("categories", "POST", category);
    console.log(response);
  } catch (err) {
    console.log(err);
  }
};

const deleteCategoriesApi = async (id) => {
  try {
    const response = await callApi(`categories/${id}`, "DELETE");
    console.log(response);
  } catch (err) {
    console.log(err);
  }
};

const editCategoriesApi = async (id, category) => {
  try {
    const response = await callApi(`categories/${id}`, "PUT", category);
    console.log(response);
  } catch (err) {
    console.log(err);
  }
};

const renderCategories = (categories) => {
  for (let cate of categories) {
    const { id, name } = cate;
    content += `<tr>
    <td>${id}</td>
    <td class="text-center">${name}</td>
    <td class="project-actions text-center">
      <a
        class="btn btn-info btn-sm"
        data-toggle="modal"
        data-target="#modal-edit"
        onclick="editCategories(${id})"
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
  }
  getElById("categories-content").innerHTML = content;
};

const insertCategories = () => {
  let name = getElById("catename-add").value;
  if (name == "") {
    getElById("errName").textContent = "Tên loại không để trống!";
  } else {
    getElById("errName").textContent = "";
    let category = { name };
    insertCategoriesApi(category);
    getElById("formInsert").reset();
    successAlert();
  }
};

const editCategories = (id) => {
  callApi(`categories/${id}`)
    .then((res) => {
      getElById("catename-edit").value = res.data.name;
    })
    .catch((err) => console.log(err));
  getElById("btnEdit").addEventListener("click", () => {
    let name = getElById("catename-edit").value;
    if (name == "") {
      getElById("errNameEdit").textContent = "Tên loại không để trống!";
    } else {
      getElById("errNameEdit").textContent = "";
      let category = { id, name };
      editCategoriesApi(id, category);
      getElById("formEdit").reset();
      successAlert();
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
      deleteCategoriesApi(id);
      Swal.fire("Đã xóa!", "", "success");
    }
  });
};
getElById("btnInsert").addEventListener("click", insertCategories);

fetchCategoriesApi();
