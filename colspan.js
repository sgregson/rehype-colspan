'use strict';

// var u = require('unist-builder');
var h = require('hastscript');
var is = require('hast-util-is-element');
var has = require('hast-util-has-property');
var visit = require('unist-util-visit');
// var doctypes = require('doctype');

module.exports = colspan;

function colspan() {
  return transformer;

  function transformer(tree) {
    visit(tree, 'element', visitor);
  }
  function visitor(node, index, parent) {
    if (!has(node, 'colSpan')) {
      return;
    }

    var blank = h(node.tagName, '');
    var count = node.properties.colSpan || 0;

    node.properties.colSpan = null;
    var filled = [node];

    while(count > 1) {
      filled.push(blank);
      count--;
    }

    parent.children.splice(index, 1, ...filled);
  }
}
