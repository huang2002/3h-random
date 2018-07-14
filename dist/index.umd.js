(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.Random = factory());
}(this, (function () { 'use strict';

    var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    var m = 1 << 20,
        a = 9,
        b = 7;

    var Randomizer = function () {
        function Randomizer() {
            var seed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Date.now();
            var cursor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

            _classCallCheck(this, Randomizer);

            this.seed = seed;
            this.cursor = cursor;
            this.reset(seed, cursor);
        }

        _createClass(Randomizer, [{
            key: '_get',
            value: function _get() {
                var _last = this._last;

                return (this._last = (a * (_last ? _last : this.seed) + b) % m) / m;
            }
        }, {
            key: 'float',
            value: function float() {
                var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
                var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

                return min + this._get() * (max - min);
            }
        }, {
            key: 'int',
            value: function int() {
                var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
                var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;

                return Math.round(this.float(min, max));
            }
        }, {
            key: 'boolean',
            value: function boolean() {
                return this.float() >= .5;
            }
        }, {
            key: 'string',
            value: function string() {
                var radix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 16;
                var upperCase = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

                var ans = this.float().toString(radix).slice(2);
                if (upperCase) {
                    ans = ans.toUpperCase();
                }
                return ans;
            }
        }, {
            key: 'element',
            value: function element(arrayLike) {
                return arrayLike[this.int(0, arrayLike.length - 1)];
            }
        }, {
            key: 'reset',
            value: function reset() {
                var seed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.seed;
                var cursor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

                this.seed = seed;
                this.cursor = cursor;
                this._last = undefined;
                for (var i = 0; i < cursor; i++) {
                    this._get();
                }
                return this;
            }
        }]);

        return Randomizer;
    }();

    var Random = new Randomizer();
    Object.defineProperty(Random, 'Randomizer', { value: Randomizer });

    return Random;

})));
