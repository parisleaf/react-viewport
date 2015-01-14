"use strict";

var _interopRequire = function (obj) {
  return obj && (obj["default"] || obj);
};

var React = _interopRequire(require("react"));

var ViewportContainer = _interopRequire(require("./ViewportContainer"));

global.React = React;

React.render(React.createElement(
  ViewportContainer,
  {
    style: {
      backgroundColor: "red",
      minHeight: "90vh" }
  },
  "Hello world"
), document.getElementById("demo"));