// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"scripts/export/render.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toDo = require("../toDo");

var SPAN_STYLE = "flex flex-row items-center justify-between mt-3 py-3 w-full bg-white bg-opacity-90 rounded-md shadow transition duration-150 ease-in-out transform-gpu hover:-translate-y-1 hover:shdow-xl";
var DEL_IMG_STYLE = "w-6 h-6 rounded-full mr-2 img-setting del-img transition duration-150 ease-in-out transform-gpu hover:scale-125 focus:outline-none focus:scale-95 focus:ring-2 focus:ring-red-300";
var FINISH_IMG_STYLE = "w-6 h-6 rounded-full img-setting fin-img transition duration-150 ease-in-out transform-gpu hover:scale-125 focus:outline-none focus:scale-95 focus:ring-2 focus:ring-blue-300";
var APPEND_IMG_STYLE = "w-6 h-6 rounded-full img-setting append-img transition duration-150 ease-in-out transform-gpu hover:scale-125 focus:outline-none focus:scale-95 focus:ring-2 focus:ring-green-300";
var BTN_STYLE = "flex flex-row mr-3";
var LI_STYLE = "ml-3";
var toDoList = document.querySelector(".todo-list");
var toDoFinList = document.querySelector(".todo-fin");

var renderToDo = function renderToDo(text, id, fin) {
  if (fin === false) {
    var span = document.createElement("span");
    var div = document.createElement("div");
    var li = document.createElement("li");
    var finBtn = document.createElement("button");
    var delBtn = document.createElement("button");
    li.innerHTML = "".concat(text);
    delBtn.innerHTML = "";
    finBtn.innerHTML = "";
    span.appendChild(li);
    div.appendChild(delBtn);
    div.appendChild(finBtn);
    span.appendChild(div);
    toDoList.appendChild(span);
    span.className = SPAN_STYLE;
    delBtn.className = DEL_IMG_STYLE;
    finBtn.className = FINISH_IMG_STYLE;
    div.className = BTN_STYLE;
    li.className = LI_STYLE;
    delBtn.id = id;
    delBtn.addEventListener("click", _toDo.deleteFromToDo);
    finBtn.addEventListener("click", _toDo.finToDo);
  } else if (fin === true) {
    var _span = document.createElement("span");

    var _div = document.createElement("div");

    var _li = document.createElement("li");

    var _delBtn = document.createElement("button");

    var returnBtn = document.createElement("button");
    _li.innerHTML = "".concat(text);
    _delBtn.innerHTML = "";
    returnBtn.innerHTML = "";

    _span.appendChild(_li);

    _div.appendChild(_delBtn);

    _div.appendChild(returnBtn);

    _span.appendChild(_div);

    toDoFinList.appendChild(_span);
    _span.className = SPAN_STYLE;
    _delBtn.className = DEL_IMG_STYLE;
    returnBtn.className = APPEND_IMG_STYLE;
    _div.className = BTN_STYLE;
    _li.className = LI_STYLE;
    _delBtn.id = id;

    _delBtn.addEventListener("click", _toDo.deleteFromFin);

    returnBtn.addEventListener("click", _toDo.returnToDo);
  }
};

var _default = renderToDo;
exports.default = _default;
},{"../toDo":"scripts/toDo.js"}],"scripts/toDo.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.returnToDo = exports.finToDo = exports.deleteFromToDo = exports.deleteFromFin = void 0;

var _render = _interopRequireDefault(require("./export/render"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toDoForm = document.querySelector(".todo-form");
var toDoInput = document.querySelector("#todo-input");
var QUERY_TODO = "toDos";
var QUERY_FIN = "toDosFin";
var DELETE = "deleteToDo";
var POSTPONE = "postponeToDo";
var RETURN = "returnToDo";
var DELETE_FIN = "deleteFin";
var toDos = [];
var toDosFin = []; //!----------------------------------------------------------------------------------------

var loadToDo = function loadToDo(QUERY, setArr) {
  var dbToDo = localStorage.getItem(QUERY);
  dbToDo = JSON.parse(dbToDo);

  if (dbToDo !== null) {
    var dbToDos = Object.values(dbToDo); // 객체화 하기 but 순수 객체는 아니기에 객체의 valiue만 빼와서 arr에 대입.

    dbToDos.forEach(function (toDo) {
      setArr.push(toDo);
      (0, _render.default)(toDo.text, toDo.id, toDo.fin);
    });
  }
};

var getText = function getText(target) {
  var text = target.value;
  target.value = "";
  return text;
};

var handleToDo = function handleToDo(e) {
  e.preventDefault();
  var text = getText(toDoInput);
  var toDoObj = {
    text: text,
    id: Date.now(),
    fin: false
  };
  toDos.push(toDoObj);
  saveToDo();
  (0, _render.default)(toDoObj.text, toDoObj.id, toDoObj.fin);
};

var saveToDo = function saveToDo() {
  localStorage.setItem(QUERY_TODO, JSON.stringify(toDos));
};

var saveToDoFin = function saveToDoFin() {
  localStorage.setItem(QUERY_FIN, JSON.stringify(toDosFin));
};

var deleteFromToDo = function deleteFromToDo(e) {
  var delObjId = e.target.parentNode.querySelector("button").id;
  e.target.parentNode.parentNode.classList.add("hidden");
  mutatesArr(DELETE, toDos, null, delObjId);
};

exports.deleteFromToDo = deleteFromToDo;

var deleteFromFin = function deleteFromFin(e) {
  var delObjId = e.target.parentNode.querySelector("button").id;
  console.log(delObjId);
  e.target.parentNode.parentNode.classList.add("hidden");
  mutatesArr(DELETE_FIN, toDosFin, null, delObjId);
};

exports.deleteFromFin = deleteFromFin;

var finToDo = function finToDo(e) {
  var finObjId = e.target.parentNode.querySelector("button").id;
  e.target.parentNode.parentNode.classList.add("hidden");
  mutatesArr(POSTPONE, toDos, toDosFin, finObjId);
};

exports.finToDo = finToDo;

var returnToDo = function returnToDo(e) {
  var returnObjId = e.target.parentNode.querySelector("button").id;
  e.target.parentNode.parentNode.classList.add("hidden");
  mutatesArr(RETURN, toDosFin, toDos, returnObjId);
};

exports.returnToDo = returnToDo;

var mutatesArr = function mutatesArr(TYPE, mutateArr, inputArr, finObjId) {
  var mutationObj = mutateArr.find(function (toDo) {
    return toDo.id === Number(finObjId);
  });
  var idx = mutateArr.indexOf(mutationObj);

  switch (TYPE) {
    case DELETE:
      if (idx > -1) mutateArr.splice(idx, 1);
      saveToDo();
      break;

    case DELETE_FIN:
      if (idx > -1) mutateArr.splice(idx, 1);
      saveToDoFin();
      break;

    case POSTPONE:
      if (idx > -1) {
        var finObj = mutateArr[idx];
        finObj.fin = true;
        inputArr.push(finObj);
        mutateArr.splice(idx, 1);
        var text = finObj.text,
            id = finObj.id,
            fin = finObj.fin;
        (0, _render.default)(text, id, fin);
      }

      saveToDo();
      saveToDoFin();
      break;

    case RETURN:
      if (idx > -1) {
        var _finObj = mutateArr[idx];
        _finObj.fin = false;
        inputArr.push(_finObj);
        mutateArr.splice(idx, 1);
        var _text = _finObj.text,
            _id = _finObj.id,
            _fin = _finObj.fin;
        (0, _render.default)(_text, _id, _fin);
      }

      saveToDo();
      saveToDoFin();
      break;
  }
};

var init = function init() {
  loadToDo(QUERY_TODO, toDos);
  loadToDo(QUERY_FIN, toDosFin);
  toDoForm.addEventListener("submit", handleToDo);
};

init();
},{"./export/render":"scripts/export/render.js"}],"../node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "14774" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel/src/builtins/hmr-runtime.js","scripts/toDo.js"], null)
//# sourceMappingURL=/toDo.7ca1585d.js.map