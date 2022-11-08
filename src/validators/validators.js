const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const isValid = function (value) {
  if (typeof value == undefined || value == null || value.length == 0)
    return false;
  if (typeof value === "string" && value.trim().length === 0) return false;
  return true;
};

const isValidBody = function (data) {
  return Object.keys(data).length > 0;
};


const isValidBookTitle = function (title) {
  return /^[A-Za-z ,.'-]{1,45}/i.test(title);
};

const isValidName = function (name) {
  if (/^[a-z ,.'-]+$/i.test(name)) return true;
  return false;
};

const isValidNumber = function (number) {
  if (/^[0]?[6789]\d{9}$/.test(number)) return true;
  return false;
};

const isValidId = function (id) {
  return mongoose.Types.ObjectId.isValid(id);
};

const isValidUrl = function (Url) {
  if(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%.\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%\+.~#?&//=]*)/.test(Url)) return true;
  return false;
}

const isValidEmail = function (mail) {
  if (/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
};


module.exports = {
  isValid,
  isValidBody,
  isValidBookTitle,
  isValidName,
  isValidNumber,
  isValidId,
  isValidEmail,
  isValidUrl
  
};
