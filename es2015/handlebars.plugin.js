'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Generated by CoffeeScript 2.3.2
var hasProp = {}.hasOwnProperty;

module.exports = function (BasePlugin) {
  var HandlebarsPlugin;
  return HandlebarsPlugin = function () {
    // Define Plugin
    var HandlebarsPlugin = function (_BasePlugin) {
      _inherits(HandlebarsPlugin, _BasePlugin);

      function HandlebarsPlugin() {
        _classCallCheck(this, HandlebarsPlugin);

        return _possibleConstructorReturn(this, (HandlebarsPlugin.__proto__ || Object.getPrototypeOf(HandlebarsPlugin)).apply(this, arguments));
      }

      _createClass(HandlebarsPlugin, [{
        key: 'setConfig',

        // Constructor
        value: function setConfig(config) {
          var docpad, handlebars, helper, name, partial, ref, ref1, results;
          // Super
          _get(HandlebarsPlugin.prototype.__proto__ || Object.getPrototypeOf(HandlebarsPlugin.prototype), 'setConfig', this).call(this, config);
          // Prepare
          docpad = this.docpad;
          handlebars = this.handlebars = require('handlebars');
          this.precompileOpts = this.config.precompileOpts || {};
          // Add helpers, if defined in docpad.cson
          if (this.config.helpers) {
            ref = this.config.helpers;
            for (name in ref) {
              if (!hasProp.call(ref, name)) continue;
              helper = ref[name];
              handlebars.registerHelper(name, helper);
            }
          }
          // Add partials, if defined in docpad.cson
          if (this.config.partials) {
            ref1 = this.config.partials;
            results = [];
            for (name in ref1) {
              if (!hasProp.call(ref1, name)) continue;
              partial = ref1[name];
              results.push(handlebars.registerPartial(name, partial));
            }
            return results;
          }
        }

        // Render some content

      }, {
        key: 'render',
        value: function render(opts) {
          var content, handlebars, inExtension, outExtension, output, templateData;
          // Prepare
          inExtension = opts.inExtension;
          outExtension = opts.outExtension;
          templateData = opts.templateData;
          content = opts.content;

          handlebars = this.handlebars;
          if (inExtension === 'hb' || inExtension === 'hbs' || inExtension === 'handlebars') {
            if (outExtension === 'js' || outExtension === 'inlinejs') {
              output = this.handlePrecompileOpts(opts);
            } else {
              output = handlebars.compile(opts.content)(templateData);
            }
            return opts.content = output;
          }
        }
      }, {
        key: 'handlePrecompileOpts',
        value: function handlePrecompileOpts(opts) {
          var argv, post, pre, ref, templateName;
          argv = this.precompileOpts;
          if (argv.wrapper == null) {
            argv.wrapper = "default";
          }
          if (argv.amdPath == null) {
            argv.amdPath = "";
          }
          pre = post = "";
          templateName = opts.file.attributes.slug;
          if (argv.wrapper === "amd") {
            pre += 'define([\'' + argv.amdPath + 'handlebars\'], function(Handlebars) {\n';
          }
          if (argv.wrapper === "default") {
            pre += '(function() {\n';
          }
          if ((ref = argv.wrapper) === "default" || ref === "amd") {
            pre += '  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};\n';
            pre += 'templates[\'' + templateName + '\'] = template(';
            post += ');\n';
          }
          if (argv.wrapper === "amd") {
            post += '});';
          }
          if (argv.wrapper === "default") {
            post += '})();';
          }
          return pre + this.handlebars.precompile(opts.content) + post;
        }
      }]);

      return HandlebarsPlugin;
    }(BasePlugin);

    ;

    // Plugin name
    HandlebarsPlugin.prototype.name = 'handlebars';

    // Handlebars
    HandlebarsPlugin.prototype.handlebars = null;

    return HandlebarsPlugin;
  }.call(this);
};