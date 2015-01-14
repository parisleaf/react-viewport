"use strict";

var _interopRequire = function (obj) {
  return obj && (obj["default"] || obj);
};

var React = _interopRequire(require("react"));

var assign = _interopRequire(require("react/lib/Object.assign"));

var ViewportContainer = React.createClass({
  displayName: "ViewportContainer",


  getInitialState: function getInitialState() {
    return {
      viewportHeight: null,
      viewportWidth: null };
  },

  getDefaultProps: function getDefaultProps() {
    return {
      style: {},

      // Default to detecting for Modernizr support
      browserSupportsVh: typeof document === "undefined" || rootElementHasClass("cssvhunit"),
      browserSupportsVw: typeof document === "undefined" || rootElementHasClass("cssvwunit") };
  },

  componentDidMount: function componentDidMount() {
    if (!this.props.browserSupportsVh || !this.props.browserSupportsVw) {
      this.getWindowDimensions();
      window.addEventListener("resize", this.getWindowDimensions);
    }
  },

  componentDidUnmount: function componentDidUnmount() {
    window.removeEventListener("resize", this.getWindowDimensions);
  },

  getWindowDimensions: function getWindowDimensions() {
    this.setState({
      viewportHeight: window.innerHeight,
      viewportWidth: window.innerWidth });
  },

  render: function render() {
    var _this = this;


    var style = Object.keys(this.props.style).reduce(function (result, prop) {
      var value = _this.props.style[prop];

      if (isVhUnit(value)) {
        if (_this.props.browserSupportsVh) {
          result[prop] = value;
        } else {
          result[prop] = "" + _this.state.viewportHeight * removeViewportUnit(value) / 100 + "px";
        }
      } else if (isVwUnit(value)) {
        if (_this.props.browserSupportsVw) {
          result[prop] = value;
        } else {
          result[prop] = "" + _this.state.viewportWidth * removeViewportUnit(value) / 100 + "px";
        }
      }

      return result;
    }, {});

    style = assign({}, this.props.style, style);

    return React.createElement("div", React.__spread({}, this.props, {
      style: style
    }));
  }
});

function isVhUnit(value) {
  return typeof value === "string" && stringEndsWith(value, "vh");
}

function isVwUnit(value) {
  return typeof value === "string" && stringEndsWith(value, "vw");
}

function removeViewportUnit(value) {
  return value.slice(0, -2);
}

function stringEndsWith(string, suffix) {
  return string.indexOf(suffix, string.length - suffix.length) !== -1;
}

function elementHasClass(el, className) {
  return (" " + el.className + " ").indexOf(" " + className + " ") > -1;
}

function rootElementHasClass(className) {
  return typeof document !== "undefined" && elementHasClass(document.documentElement, className);
}

module.exports = ViewportContainer;