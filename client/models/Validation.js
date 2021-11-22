const validatEmpty = (inputID, errID, message) => {
  if (getElById(inputID).value == "") {
    getElById(errID).textContent = message;
  } else {
    getElById(errID).textContent = "";
  }
};

const validateByRegex = (inputID, errID, message, regex) => {
  if (getElById(inputID).value !== "") {
    if (!getElById(inputID).value.match(regex)) {
      getElById(errID).textContent = message;
    } else {
      getElById(errID).textContent = "";
    }
  }
};
