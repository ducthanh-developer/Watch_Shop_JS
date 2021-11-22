const callApi = (endpoint, method = "get", data = null) => {
  return axios({
    url: `http://localhost:3000/${endpoint}`,
    method,
    data,
  });
};

const getElById = (id) => {
  return document.getElementById(id);
};

const getUrlParams = () => {
  let queryString = window.location.search;
  return new URLSearchParams(queryString);
};
