"use strict";

var _interopRequire = function (obj) {
  return obj && (obj["default"] || obj);
};

var expect = require("chai").expect;
var jsdom = require("jsdom").jsdom;
global.document = jsdom("");
global.window = document.parentWindow;
global.navigator = {};
navigator.userAgent = "node";

describe("ViewportContainer", function () {
  var React = _interopRequire(require("react/addons"));

  var TestUtils = React.addons.TestUtils;
  var ViewportContainer = _interopRequire(require("../ViewportContainer"));

  it("is a div", function () {
    var component = TestUtils.renderIntoDocument(React.createElement(ViewportContainer, null));
    var componentEl = component.getDOMNode();

    expect(componentEl.nodeName).to.equal("DIV");
  });

  it("transfers existing props", function () {
    var component = TestUtils.renderIntoDocument(React.createElement(ViewportContainer, { foo: "bar", bar: "baz" }));

    expect(component.props.foo).to.equal("bar");
    expect(component.props.bar).to.equal("baz");
  });
});

function elementHasClass(el, className) {
  return (" " + el.className + " ").indexOf(" " + className + " ") > -1;
}