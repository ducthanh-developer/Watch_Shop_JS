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

 const setLocalStorage = (name, data) => {
  window.localStorage.setItem(name, JSON.stringify(data));
};

 const getLocalStorage = (name) => {
  if (window.localStorage.getItem(name))
    return JSON.parse(window.localStorage.getItem(name));
  return false;
};

 const getUrlParams = () => {
    let queryString = window.location.search;
    return new URLSearchParams(queryString);
}
