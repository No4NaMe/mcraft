"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

$(function () {
  var Snow = function Snow(canvas, count) {
    var ctx = canvas.getContext('2d');
    var snowflakes = [];

    var add = function add(item) {
      return snowflakes.push(item(canvas));
    };

    var update = function update() {
      return _.forEach(snowflakes, function (el) {
        return el.update();
      });
    };

    var resize = function resize() {
      ctx.canvas.width = canvas.offsetWidth;
      ctx.canvas.height = canvas.offsetHeight;

      _.forEach(snowflakes, function (el) {
        return el.resized();
      });
    };

    var draw = function draw() {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      _.forEach(snowflakes, function (el) {
        return el.draw();
      });
    };

    var events = function events() {
      window.addEventListener('resize', resize);
    };

    var loop = function loop() {
      draw();
      update();
      animFrame(loop);
    };

    var init = function init() {
      _.times(count, function () {
        return add(function (canvas) {
          return new SnowItem(canvas);
        });
      });

      events();
      loop();
    };

    init(count);
    resize();
    return {
      add: add,
      resize: resize
    };
  };

  var defaultOptions = {
    color: '#575B70',
    radius: [0.5, 3.0],
    speed: [1, 3],
    wind: [-0.5, 3.0]
  };

  var SnowItem = function SnowItem(canvas) {
    var _ref, _ref2, _ref3;

    var drawFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var opts = arguments.length > 2 ? arguments[2] : undefined;

    var options = _objectSpread({}, defaultOptions, opts);

    var radius = options.radius,
        speed = options.speed,
        wind = options.wind,
        color = options.color;
    var params = {
      color: color,
      x: _.random(0, canvas.offsetWidth),
      y: _.random(-canvas.offsetHeight, 0),
      radius: (_ref = _).random.apply(_ref, _toConsumableArray(radius)),
      speed: (_ref2 = _).random.apply(_ref2, _toConsumableArray(speed)),
      wind: (_ref3 = _).random.apply(_ref3, _toConsumableArray(wind)),
      isResized: false
    };
    var ctx = canvas.getContext('2d');

    var updateData = function updateData() {
      params.x = _.random(0, canvas.offsetWidth);
      params.y = _.random(-canvas.offsetHeight, 0);
    };

    var resized = function resized() {
      return params.isResized = true;
    };

    var drawDefault = function drawDefault() {
      ctx.beginPath();
      ctx.arc(params.x, params.y, params.radius, 0, 2 * Math.PI);
      ctx.fillStyle = params.color;
      ctx.fill();
      ctx.closePath();
    };

    var draw = drawFn ? function () {
      return drawFn(ctx, params);
    } : drawDefault;

    var translate = function translate() {
      params.y += params.speed;
      params.x += params.wind;
    };

    var onDown = function onDown() {
      if (params.y < canvas.offsetHeight) return;

      if (params.isResized) {
        updateData();
        params.isResized = false;
      } else {
        params.y = 0;
        params.x = _.random(0, canvas.offsetWidth);
      }
    };

    var update = function update() {
      translate();
      onDown();
    };

    return {
      update: update,
      resized: resized,
      draw: draw
    };
  };

  $('body').append($('<canvas id="snow" class="snow" style="width: 100%;height: ' + $('html').height() + 'px;"></canvas>'));
  var canvas = document.getElementById('snow');
  var animFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  var snow = Snow(canvas, 150);
});