let catID = getUrlParams().get("id");
let count = 0;

const fetchProducts = (page = 1, sort = '') => {
  callApi(`products?cat_id=${catID}&_page=${page}&_limit=5${sort}`)
    .then((res) => {
      count = res.headers['x-total-count'];
      renderProduct(res.data, page);
    })
    .catch((err) => console.log(err));
};

const fetchOneCategory = () => {
  callApi(`categories/${getUrlParams().get("id")}`)
    .then((res) => {
      getElById("categoryName").textContent = res.data.name;
    })
    .catch((err) => console.log(err));
};
fetchOneCategory();

const renderProduct = (productList, page) => {
  document.getElementById("productRow").innerHTML = "";
  let content = ``;
  for (let product of productList) {
    const { id, name, image, price } = product;
    content = `<div class="col-md-4">
      <figure class="card card-product-grid">
        <div class="img-wrap">
          <img
            src="${image}"
          />
          <a class="btn-overlay" href="#"
            ><i class="fa fa-search-plus"></i> Xem nhanh</a
          >
        </div>
        <figcaption class="info-wrap">
          <div class="fix-height">
            <a href="product.html?id=${id}" class="title">
            ${name.lenght < 50 ? name : name.slice(0, 50) + "..."}
            </a>
            <div class="price-wrap mt-2">
              <span class="price">${price.toLocaleString()} VND</span>
            </div>
          </div>
          <button onclick="addCart(${id},'${name}', '${image}', ${price})" class="btn btn-block btn-primary"
            >Thêm giỏ hàng <i class="fa fa-shopping-cart"></i>
          </button>
        </figcaption>
      </figure>
    </div>`;
    document.getElementById("productRow").innerHTML += content;
  }
  getElById("numberResult").textContent = count;  
  let numOfPage = count / 5;
  content = `<li class="page-item">
                <a class="page-link" href="#">Trước</a>
              </li>`;
  for (let i = 1; i <= numOfPage; i++) {
    content += `<li class="page-item ${page == i ? 'active' : ''}"><a class="page-link" href="#" onclick="fetchProducts('${i}')">${i}</a></li>`;
  }
  content += `<li class="page-item">
                <a class="page-link" href="#">Sau</a>
              </li>`;
  getElById("pagination").innerHTML = content;
};
getElById('filterProduct').addEventListener('change', ()=>{
  let filterPro = getElById('filterProduct').value;
  fetchProducts(`1`, `&_sort=price&_order=${filterPro}`);
})
fetchProducts();
