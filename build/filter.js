"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.passPhoneFilter = void 0;

var _string = require("@yosmy/string");

var passPhoneFilter = function passPhoneFilter(filter, _ref) {
  var country = _ref.country,
      number = _ref.number,
      nickname = _ref.nickname;
  return passCountry({
    country: filter.country
  }, country) && (passNumber({
    text: filter.text
  }, number) || passNickname({
    text: filter.text
  }, nickname));
};

exports.passPhoneFilter = passPhoneFilter;

var passCountry = function passCountry(filter, country) {
  if (!filter.country) {
    return true;
  }

  return filter.country === country;
};

var passNumber = function passNumber(filter, number) {
  if (!filter.text) {
    return true;
  }

  if (!number) {
    return false;
  }

  return number.indexOf(filter.text) !== -1;
};

var passNickname = function passNickname(filter, nickname) {
  if (!filter.text) {
    return true;
  }

  if (!nickname) {
    return false;
  }

  var text = (0, _string.normalize)(filter.text);
  nickname = (0, _string.normalize)(nickname);
  return nickname.indexOf(text) !== -1;
};