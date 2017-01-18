"use strict";
var _1 = require("./_");
var yaku_1 = require("./yaku");
var isFn = _1["default"].isFunction;
exports.__esModule = true;
exports["default"] = function (fn, self) { return function (a, b, c, d, e) {
    var len = arguments.length;
    var args;
    var resolve;
    var reject;
    var promise = new yaku_1["default"](function (r, rj) {
        resolve = r;
        reject = rj;
    });
    function cb(err, val) {
        err == null ? resolve(val) : reject(err);
    }
    // For the sake of performance.
    switch (len) {
        case 0:
            fn.call(self, cb);
            break;
        case 1:
            isFn(a) ? fn.call(self, a) : fn.call(self, a, cb);
            break;
        case 2:
            isFn(b) ? fn.call(self, a, b) : fn.call(self, a, b, cb);
            break;
        case 3:
            isFn(c) ? fn.call(self, a, b, c) : fn.call(self, a, b, c, cb);
            break;
        case 4:
            isFn(d) ? fn.call(self, a, b, c, d) : fn.call(self, a, b, c, d, cb);
            break;
        case 5:
            isFn(e) ? fn.call(self, a, b, c, d, e) : fn.call(self, a, b, c, d, e, cb);
            break;
        default:
            args = new Array(len);
            for (var i = 0; i < len; i++) {
                args[i] = arguments[i];
            }
            if (isFn(args[len - 1])) {
                return fn.apply(self, args);
            }
            args[i] = cb;
            fn.apply(self, args);
    }
    return promise;
}; };