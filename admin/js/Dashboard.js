const fetchOrdersApi = async () => {
  try {
    const response = await callApi("orders");
    getElById("numOrder").textContent = response.data.length;
  } catch (err) {
    console.log(err);
  }
};

const fetchCategoriesApi = async () => {
  try {
    const response = await callApi("categories");
    getElById("numCategory").textContent = response.data.length;
  } catch (err) {
    console.log(err);
  }
};

const fetchProductApi = async () => {
  try {
    const response = await callApi("products");
    getElById("numProduct").textContent = response.data.length;
  } catch (err) {
    console.log(err);
  }
};

const fetchOrderDetailApi = () => {
  try {
    callApi("order_detail").then((res) => {
      let sum = res.data.reduce((total, detail) => {
        return total + Number(detail.unti_price);
      }, 0);
      getElById("numTotal").textContent = sum.toLocaleString();
    });
  } catch (err) {
    console.log(err);
  }
};

fetchOrderDetailApi();
fetchProductApi();
fetchCategoriesApi();
fetchOrdersApi();
const renderChart = async () => {
  const response = await callApi("categories");
  let labelValue = [];
  let dataValue = [];
  for (let [key, cate] of response.data.entries()) {
    labelValue.push(cate.name);
    const resProductApi = await callApi(`products?cat_id=${cate.id}`);
    dataValue.push(resProductApi.data.length);
  }

  var productData = {
    labels: labelValue,
    datasets: [
      {
        data: dataValue,
        backgroundColor: [
          "#f56954",
          "#00a65a",
          "#f39c12",
          "#00c0ef",
          "#3c8dbc",
          "#d2d6de",
        ],
      },
    ],
  };
  var productChartCanvas = $("#productChart").get(0).getContext("2d");
  var productData = productData;
  var productOptions = {
    maintainAspectRatio: false,
    responsive: true,
  };
  new Chart(productChartCanvas, {
    type: "pie",
    data: productData,
    options: productOptions,
  });
};

renderChart();
