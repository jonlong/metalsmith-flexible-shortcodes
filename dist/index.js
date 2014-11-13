"use strict";
var shortcode = require('shortcode-parser'),
    each = require('lodash.foreach'),
    merge = require('lodash.merge'),
    plugin;
plugin = function(opts) {
  each(opts.shortcodes, (function(fn, name) {
    shortcode.add(name, fn);
  }));
  return (function(files, metalsmith, done) {
    each(files, (function(file, path) {
      if (!file.shortcodes) {
        return;
      }
      var cnt = file.contents.toString(),
          data = merge({}, file, metalsmith.metadata());
      if (opts.clean) {
        cnt = cnt.replace(/(<p>)(\[.*?\])(<\/p>)/gi, (function(all, p, code) {
          return code;
        }));
      }
      file.contents = new Buffer(shortcode.parse(cnt, data));
    }));
    done();
  });
};
module.exports = plugin;
