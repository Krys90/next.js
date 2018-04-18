"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.render = render;
exports.renderError = renderError;
exports.default = exports.emitter = exports.ErrorComponent = exports.router = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _getIterator2 = _interopRequireDefault(require("@babel/runtime/core-js/get-iterator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _promise = _interopRequireDefault(require("@babel/runtime/core-js/promise"));

var _react = require("react");

var _reactDom = _interopRequireDefault(require("react-dom"));

var _headManager = _interopRequireDefault(require("./head-manager"));

var _router2 = require("../lib/router");

var _EventEmitter = _interopRequireDefault(require("../lib/EventEmitter"));

var _utils = require("../lib/utils");

var _pageLoader = _interopRequireDefault(require("../lib/page-loader"));

var asset = _interopRequireWildcard(require("../lib/asset"));

var envConfig = _interopRequireWildcard(require("../lib/runtime-config"));

// Polyfill Promise globally
// This is needed because Webpack2's dynamic loading(common chunks) code
// depends on Promise.
// So, we need to polyfill it.
// See: https://github.com/webpack/webpack/issues/4254
if (!window.Promise) {
  window.Promise = _promise.default;
}

var _window = window,
    _window$__NEXT_DATA__ = _window.__NEXT_DATA__,
    props = _window$__NEXT_DATA__.props,
    err = _window$__NEXT_DATA__.err,
    page = _window$__NEXT_DATA__.page,
    pathname = _window$__NEXT_DATA__.pathname,
    query = _window$__NEXT_DATA__.query,
    buildId = _window$__NEXT_DATA__.buildId,
    chunks = _window$__NEXT_DATA__.chunks,
    assetPrefix = _window$__NEXT_DATA__.assetPrefix,
    runtimeConfig = _window$__NEXT_DATA__.runtimeConfig,
    location = _window.location; // With dynamic assetPrefix it's no longer possible to set assetPrefix at the build time
// So, this is how we do it in the client side at runtime

__webpack_public_path__ = "".concat(assetPrefix, "/_next/webpack/"); //eslint-disable-line
// Initialize next/asset with the assetPrefix

asset.setAssetPrefix(assetPrefix); // Initialize next/config with the environment configuration

envConfig.setConfig({
  serverRuntimeConfig: {},
  publicRuntimeConfig: runtimeConfig
});
var asPath = (0, _utils.getURL)();
var pageLoader = new _pageLoader.default(buildId, assetPrefix);

window.__NEXT_LOADED_PAGES__.forEach(function (_ref) {
  var route = _ref.route,
      fn = _ref.fn;
  pageLoader.registerPage(route, fn);
});

delete window.__NEXT_LOADED_PAGES__;

window.__NEXT_LOADED_CHUNKS__.forEach(function (_ref2) {
  var chunkName = _ref2.chunkName,
      fn = _ref2.fn;
  pageLoader.registerChunk(chunkName, fn);
});

delete window.__NEXT_LOADED_CHUNKS__;
window.__NEXT_REGISTER_PAGE = pageLoader.registerPage.bind(pageLoader);
window.__NEXT_REGISTER_CHUNK = pageLoader.registerChunk.bind(pageLoader);
var headManager = new _headManager.default();
var commonDomPrefix = pathname.replace('/', '__');
var appContainer = document.getElementById('__next' + commonDomPrefix);
var errorContainer = document.getElementById('__next-error' + commonDomPrefix);
var lastAppProps;
var router;
exports.router = router;
var ErrorComponent;
exports.ErrorComponent = ErrorComponent;
var ErrorDebugComponent;
var Component;
var App;

var stripAnsi = function stripAnsi(s) {
  return s;
};

var emitter = new _EventEmitter.default();
exports.emitter = emitter;

var _default =
/*#__PURE__*/
(0, _asyncToGenerator2.default)(
/*#__PURE__*/
_regenerator.default.mark(function _callee() {
  var _ref4,
      passedDebugComponent,
      passedStripAnsi,
      _iteratorNormalCompletion,
      _didIteratorError,
      _iteratorError,
      _iterator,
      _step,
      _chunkName,
      hash,
      _args = arguments;

  return _regenerator.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _ref4 = _args.length > 0 && _args[0] !== undefined ? _args[0] : {}, passedDebugComponent = _ref4.ErrorDebugComponent, passedStripAnsi = _ref4.stripAnsi;
          // Wait for all the dynamic chunks to get loaded
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context.prev = 4;
          _iterator = (0, _getIterator2.default)(chunks);

        case 6:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context.next = 13;
            break;
          }

          _chunkName = _step.value;
          _context.next = 10;
          return pageLoader.waitForChunk(_chunkName);

        case 10:
          _iteratorNormalCompletion = true;
          _context.next = 6;
          break;

        case 13:
          _context.next = 19;
          break;

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](4);
          _didIteratorError = true;
          _iteratorError = _context.t0;

        case 19:
          _context.prev = 19;
          _context.prev = 20;

          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }

        case 22:
          _context.prev = 22;

          if (!_didIteratorError) {
            _context.next = 25;
            break;
          }

          throw _iteratorError;

        case 25:
          return _context.finish(22);

        case 26:
          return _context.finish(19);

        case 27:
          stripAnsi = passedStripAnsi || stripAnsi;
          ErrorDebugComponent = passedDebugComponent;
          _context.next = 31;
          return pageLoader.loadPage('/_error');

        case 31:
          exports.ErrorComponent = ErrorComponent = _context.sent;
          _context.next = 34;
          return pageLoader.loadPage('/_app');

        case 34:
          App = _context.sent;
          _context.prev = 35;
          _context.next = 38;
          return pageLoader.loadPage(page);

        case 38:
          Component = _context.sent;

          if (!(typeof Component !== 'function')) {
            _context.next = 41;
            break;
          }

          throw new Error("The default export is not a React Component in page: \"".concat(pathname, "\""));

        case 41:
          _context.next = 47;
          break;

        case 43:
          _context.prev = 43;
          _context.t1 = _context["catch"](35);
          console.error(stripAnsi("".concat(_context.t1.message, "\n").concat(_context.t1.stack)));
          Component = ErrorComponent;

        case 47:
          exports.router = router = (0, _router2.createRouter)(pathname, query, asPath, {
            initialProps: props,
            pageLoader: pageLoader,
            App: App,
            Component: Component,
            ErrorComponent: ErrorComponent,
            err: err
          });
          router.subscribe(function (_ref5) {
            var Component = _ref5.Component,
                props = _ref5.props,
                hash = _ref5.hash,
                err = _ref5.err;
            render({
              Component: Component,
              props: props,
              err: err,
              hash: hash,
              emitter: emitter
            });
          });
          hash = location.hash.substring(1);
          render({
            Component: Component,
            props: props,
            hash: hash,
            err: err,
            emitter: emitter
          });
          return _context.abrupt("return", emitter);

        case 52:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, this, [[4, 15, 19, 27], [20,, 22, 26], [35, 43]]);
}));

exports.default = _default;

function render(_x) {
  return _render.apply(this, arguments);
} // This method handles all runtime and debug errors.
// 404 and 500 errors are special kind of errors
// and they are still handle via the main render method.


function _render() {
  _render = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2(props) {
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!props.err) {
              _context2.next = 4;
              break;
            }

            _context2.next = 3;
            return renderError(props.err);

          case 3:
            return _context2.abrupt("return");

          case 4:
            _context2.prev = 4;
            _context2.next = 7;
            return doRender(props);

          case 7:
            _context2.next = 15;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](4);

            if (!_context2.t0.abort) {
              _context2.next = 13;
              break;
            }

            return _context2.abrupt("return");

          case 13:
            _context2.next = 15;
            return renderError(_context2.t0);

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this, [[4, 9]]);
  }));
  return _render.apply(this, arguments);
}

function renderError(_x2) {
  return _renderError.apply(this, arguments);
}

function _renderError() {
  _renderError = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee3(error) {
    var prod, errorMessage, initProps, _props;

    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            prod = process.env.NODE_ENV === 'production'; // We need to unmount the current app component because it's
            // in the inconsistant state.
            // Otherwise, we need to face issues when the issue is fixed and
            // it's get notified via HMR

            _reactDom.default.unmountComponentAtNode(appContainer);

            errorMessage = "".concat(error.message, "\n").concat(error.stack);
            console.error(stripAnsi(errorMessage));

            if (!prod) {
              _context3.next = 12;
              break;
            }

            initProps = {
              Component: ErrorComponent,
              router: router,
              ctx: {
                err: error,
                pathname: pathname,
                query: query,
                asPath: asPath
              }
            };
            _context3.next = 8;
            return (0, _utils.loadGetInitialProps)(ErrorComponent, initProps);

          case 8:
            _props = _context3.sent;
            renderReactElement((0, _react.createElement)(ErrorComponent, _props), errorContainer);
            _context3.next = 13;
            break;

          case 12:
            renderReactElement((0, _react.createElement)(ErrorDebugComponent, {
              error: error
            }), errorContainer);

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));
  return _renderError.apply(this, arguments);
}

function doRender(_x3) {
  return _doRender.apply(this, arguments);
}

function _doRender() {
  _doRender = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee4(_ref6) {
    var Component, props, hash, err, _ref6$emitter, emitterProp, _router, _pathname, _query, _asPath, appProps;

    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            Component = _ref6.Component, props = _ref6.props, hash = _ref6.hash, err = _ref6.err, _ref6$emitter = _ref6.emitter, emitterProp = _ref6$emitter === void 0 ? emitter : _ref6$emitter;

            if (!(!props && Component && Component !== ErrorComponent && lastAppProps.Component === ErrorComponent)) {
              _context4.next = 6;
              break;
            }

            _router = router, _pathname = _router.pathname, _query = _router.query, _asPath = _router.asPath;
            _context4.next = 5;
            return (0, _utils.loadGetInitialProps)(App, {
              Component: Component,
              router: router,
              ctx: {
                err: err,
                pathname: _pathname,
                query: _query,
                asPath: _asPath
              }
            });

          case 5:
            props = _context4.sent;

          case 6:
            Component = Component || lastAppProps.Component;
            props = props || lastAppProps.props;
            appProps = (0, _objectSpread2.default)({
              Component: Component,
              hash: hash,
              err: err,
              router: router,
              headManager: headManager
            }, props); // lastAppProps has to be set before ReactDom.render to account for ReactDom throwing an error.

            lastAppProps = appProps;
            emitterProp.emit('before-reactdom-render', {
              Component: Component,
              ErrorComponent: ErrorComponent,
              appProps: appProps
            }); // We need to clear any existing runtime error messages

            _reactDom.default.unmountComponentAtNode(errorContainer);

            renderReactElement((0, _react.createElement)(App, appProps), appContainer);
            emitterProp.emit('after-reactdom-render', {
              Component: Component,
              ErrorComponent: ErrorComponent,
              appProps: appProps
            });

          case 14:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));
  return _doRender.apply(this, arguments);
}

var isInitialRender = true;

function renderReactElement(reactEl, domEl) {
  // The check for `.hydrate` is there to support React alternatives like preact
  if (isInitialRender && typeof _reactDom.default.hydrate === 'function') {
    _reactDom.default.hydrate(reactEl, domEl);

    isInitialRender = false;
  } else {
    _reactDom.default.render(reactEl, domEl);
  }
}