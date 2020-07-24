"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _platform = _interopRequireDefault(require("@yosmy/platform"));

var _uniqBy = _interopRequireDefault(require("lodash/uniqBy"));

var _sortBy = _interopRequireDefault(require("lodash/sortBy"));

var _phoneBuild = require("@yosmy/phone-build");

var _filter = require("./filter");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var collect = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(country, criteria) {
    var contacts;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return resolveNormalization(country);

          case 2:
            contacts = _context.sent;
            _context.next = 5;
            return resolveFiltration(contacts, {
              country: criteria.country,
              text: criteria.text
            });

          case 5:
            contacts = _context.sent;
            _context.next = 8;
            return resolveSplit(contacts, {
              skip: criteria.skip,
              limit: criteria.limit
            });

          case 8:
            contacts = _context.sent;
            return _context.abrupt("return", contacts);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function collect(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var resolveNormalization = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(country) {
    var raw, normalization;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _platform["default"].cache.get("contacts");

          case 2:
            raw = _context2.sent;

            if (!(typeof raw !== "undefined")) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt("return", raw);

          case 5:
            _context2.next = 7;
            return _platform["default"].contact.all([_platform["default"].contact.Emails, _platform["default"].contact.PhoneNumbers]);

          case 7:
            raw = _context2.sent;
            normalization = [];
            raw.forEach(function (contact) {
              if (!contact.phoneNumbers) {
                return null;
              }

              var phones = contact.phoneNumbers.map(function (_ref3) {
                var id = _ref3.id,
                    number = _ref3.number;

                try {
                  var phone = (0, _phoneBuild.build)(number, country);

                  if (!phone.country || !phone.prefix || !phone.number) {
                    // console.log(number, phone, "Incomplete phone number");
                    return false;
                  }

                  return {
                    id: id,
                    country: phone.country,
                    prefix: phone.prefix,
                    number: phone.number,
                    nickname: contact.name
                  };
                } catch (e) {
                  // console.log(e);
                  return false;
                }
              });
              normalization = normalization.concat(phones);
            }); // Remove falsy

            normalization = normalization.filter(function (x) {
              return x;
            }); // Remove duplicated

            normalization = (0, _uniqBy["default"])(normalization, function (contact) {
              var prefix = contact.prefix,
                  number = contact.number;
              return "".concat(prefix, "-").concat(number);
            }); // Sort

            normalization = (0, _sortBy["default"])(normalization, function (_ref4) {
              var nickname = _ref4.nickname;
              return nickname;
            });

            _platform["default"].cache.set("contacts", normalization);

            return _context2.abrupt("return", normalization);

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function resolveNormalization(_x3) {
    return _ref2.apply(this, arguments);
  };
}();

var resolveFiltration = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(contacts, filter) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!(!filter.country && !filter.text)) {
              _context3.next = 2;
              break;
            }

            return _context3.abrupt("return", contacts);

          case 2:
            return _context3.abrupt("return", contacts.map(function (contact) {
              if (!(0, _filter.passPhoneFilter)({
                country: filter.country,
                text: filter.text
              }, contact)) {
                return null;
              }

              return contact;
            }).filter(function (x) {
              return x;
            }));

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function resolveFiltration(_x4, _x5) {
    return _ref5.apply(this, arguments);
  };
}();

var resolveSplit = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(contacts, criteria) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            return _context4.abrupt("return", contacts.slice(criteria.skip, criteria.skip + criteria.limit));

          case 1:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function resolveSplit(_x6, _x7) {
    return _ref6.apply(this, arguments);
  };
}();

var _default = collect;
exports["default"] = _default;