/*
This is redTea v0.3 - js library

TERMS OF USE redtea

Open source under the BSD License. 

Copyright © 2013 Kirill Jakovlev
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, 
are permitted provided that the following conditions are met:

Redistributions of source code must retain the above copyright notice, this list of 
conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list 
of conditions and the following disclaimer in the documentation and/or other materials 
provided with the distribution.

Neither the name of the author nor the names of contributors may be used to endorse
or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
OF THE POSSIBILITY OF SUCH DAMAGE.
*/


(function() {
  var FUNCTION_TYPE, MOUSEDOWN, MOUSEUP, OBJECT_TYPE, STRING_TYPE, applyParams, klass, obj, t, tags, _fn, _fn1, _fn2, _i, _j, _k, _l, _len, _len1, _len10, _len2, _len3, _len4, _len5, _len6, _len7, _len8, _len9, _m, _n, _o, _p, _q, _r, _ref, _ref1, _ref10, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9, _s,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.glob = window;

  glob.root = glob.document;

  glob.RedTea = {};

  glob.RT = RedTea;

  RedTea.rtid = 0;

  RedTea.genid = function() {
    return this.rtid += 1;
  };

  if (typeof MozWebSocket !== "undefined") {
    glob.WebSocket = MozWebSocket;
  }

  if (typeof HTMLDocument === "undefined") {
    glob.HTMLDocument = Document;
  }

  if (navigator.appName === 'Microsoft Internet Explorer') {
    Object.defineProperty(Function.prototype, "name", {
      get: function() {
        var t;
        t = this.toString().match(/^function\s*([^\s(]+)/)[1];
        Object.defineProperty(this, "name", {
          enumerable: false,
          value: t
        });
        return t;
      },
      enumerable: false,
      configurable: true
    });
  }

  glob.RTC = {
    ON_CLASS: 'on',
    ON: 'on',
    FUNCTION_TYPE: 'function',
    STRING_TYPE: 'string',
    UNDEFINED_TYPE: "undefined",
    KEYDOWN: 'keydown',
    CLICK: 'click',
    READYSTATECHANGE: 'readystatechange',
    CLICK: 'click',
    MOUSEDOWN: 'mousedown',
    MOUSEUP: 'mouseup',
    MOUSEMOVE: 'mousemove',
    TOUCHSTART: 'touchstart',
    TOUCHEND: 'touchend',
    TOUCHMOVE: 'touchmove',
    DRAGSTART: 'dragstart',
    KEYDOWN: 'keydown',
    DBLCLICK: 'dblclick',
    CHANGE: 'change',
    KEYPRESS: 'keypress',
    KEYUP: 'keyup',
    FOCUS: 'focus',
    GET: 'get',
    POST: 'post',
    TEXTNODENAME: '#text',
    BR: 'BR',
    CLASS: 'class',
    C2D: '2d',
    EMPTY_HREF: '#',
    BLANK_TARGET: '_blank'
  };

  FUNCTION_TYPE = 'function';

  OBJECT_TYPE = 'object';

  STRING_TYPE = 'string';

  MOUSEDOWN = 'mousedown';

  MOUSEUP = 'mouseup';

  RedTea.moduleKeywords = ['extended', 'included'];

  RedTea.Base = (function() {
    function Base() {}

    Base.extend = function(obj) {
      var key, value, _ref, _ref1;
      obj.classes || (obj.classes = []);
      obj.classes.push(this);
      this["extends"] || (this["extends"] = []);
      this["extends"].push(obj);
      _ref = obj.prototype;
      for (key in _ref) {
        value = _ref[key];
        if (__indexOf.call(RedTea.moduleKeywords, key) < 0) {
          if (this[key] == null) {
            this[key] = value;
          }
        }
      }
      if ((_ref1 = obj.prototype.extended) != null) {
        _ref1.call(this);
      }
      return this;
    };

    Base.include = function(obj) {
      var key, value, _ref, _ref1;
      obj.classes || (obj.classes = []);
      obj.classes.push(this);
      this.includes || (this.includes = []);
      this.includes.push(obj);
      _ref = obj.prototype;
      for (key in _ref) {
        value = _ref[key];
        if (__indexOf.call(RedTea.moduleKeywords, key) < 0) {
          if (this.prototype[key] == null) {
            this.prototype[key] = value;
          }
        }
      }
      if ((_ref1 = obj.prototype.included) != null) {
        _ref1.call(this);
      }
      return this;
    };

    return Base;

  })();

  RT.Anticipant = (function() {
    Anticipant.prototype.isItTime = false;

    Anticipant.prototype.isRemoving = false;

    Anticipant.prototype.priority = 0;

    function Anticipant() {
      this._rtid = RT.genid();
    }

    Anticipant.prototype.binded = function(observer, event, func, c) {};

    Anticipant.prototype.fire = function(observer, event, args) {};

    return Anticipant;

  })();

  RT.DoOnce = {
    isItTime: true,
    isRemoving: true,
    priority: 0,
    _rtid: RT.genid(),
    constructor: function() {},
    binded: function() {},
    fire: function() {}
  };

  RT.CountAnticipant = (function(_super) {
    __extends(CountAnticipant, _super);

    CountAnticipant.prototype.isItTime = true;

    function CountAnticipant(maxCount) {
      this.maxCount = maxCount;
      this.count = 0;
      this.events = {};
      CountAnticipant.__super__.constructor.apply(this, arguments);
    }

    CountAnticipant.prototype.binded = function(observer, event, func, c) {
      return this.event = event;
    };

    CountAnticipant.prototype.fire = function(observer, event, args) {
      if (event === this.event) {
        this.count += 1;
      }
      if (this.count >= this.maxCount) {
        return this.isRemoving = true;
      }
    };

    return CountAnticipant;

  })(RT.Anticipant);

  RT.SimpleSyncAnticipant = (function(_super) {
    __extends(SimpleSyncAnticipant, _super);

    function SimpleSyncAnticipant() {
      this.events = [];
      this.eventsChecks = {};
      SimpleSyncAnticipant.__super__.constructor.apply(this, arguments);
    }

    SimpleSyncAnticipant.prototype.binded = function(observer, event, func, c) {
      return this.events.push(event);
    };

    SimpleSyncAnticipant.prototype.fire = function(observer, event, args) {
      var _this = this;
      if (this.isItTime) {
        this.eventsChecks = {};
        this.isItTime = false;
      }
      this.eventsChecks[event] = true;
      if (this.events.every(function(el) {
        return _this.eventsChecks[el];
      })) {
        return this.isItTime = true;
      }
    };

    return SimpleSyncAnticipant;

  })(RT.Anticipant);

  RT.PeriodSyncAnticipant = (function(_super) {
    __extends(PeriodSyncAnticipant, _super);

    function PeriodSyncAnticipant(period) {
      this.period = period;
      this.events = [];
      this.eventsChecks = {};
      PeriodSyncAnticipant.__super__.constructor.apply(this, arguments);
    }

    PeriodSyncAnticipant.prototype.binded = function(observer, event, func, c) {
      return this.events.push(event);
    };

    PeriodSyncAnticipant.prototype.fire = function(observer, event) {
      var period, t,
        _this = this;
      if (this.isItTime) {
        this.eventsChecks = {};
        this.isItTime = false;
      }
      t = (new Date).getTime();
      period = this.period;
      this.eventsChecks[event] = t;
      if (this.events.every(function(el) {
        return (_this.eventsChecks[el] != null) && (t - _this.eventsChecks[el] < period);
      })) {
        return this.isItTime = true;
      }
    };

    return PeriodSyncAnticipant;

  })(RT.Anticipant);

  RT.Observer = (function() {
    function Observer(owner, callbacks) {
      this.owner = owner != null ? owner : {};
      this.callbacks = callbacks;
      this.__listenersHash = {};
      this.contexts = {};
      this.funcs = {};
      this.anticipants = {};
      this.__contextsUsingCounts = {};
      this.__funcsUsingCounts = {};
      this.__eventsUsingCounts = {};
      this.__cachedListeners = {};
      this.__cachedListeners = {};
      this.__cachedAnticipants = null;
      if (this.callbacks != null) {
        this.callbacksContext = this.callbacks.context != null ? this.callbacks.context : this.owner;
      }
    }

    Observer.prototype.fire = function(event) {
      var anti_rtid, anticipant, anticipants, args, cachedListeners, context_rtid, contexts, func_rtid, isItTime, listener, listener_c, listener_f, params, t, through, _i, _j, _len, _len1, _ref, _ref1;
      if ((this.__listenersHash[event] != null) && this.__eventsUsingCounts[event] > 0) {
        cachedListeners = this.__cachedListeners[event];
        if (cachedListeners == null) {
          cachedListeners = [];
          this.__cachedListeners[event] = cachedListeners;
          _ref = this.__listenersHash[event];
          for (func_rtid in _ref) {
            contexts = _ref[func_rtid];
            for (context_rtid in contexts) {
              anticipants = contexts[context_rtid];
              for (anti_rtid in anticipants) {
                params = anticipants[anti_rtid];
                cachedListeners.push([this.funcs[func_rtid], this.contexts[context_rtid], params]);
              }
            }
          }
          cachedListeners.sort(function(a, b) {
            return a[2].priority - b[2].priority;
          });
        }
        if (this.__cachedAnticipants == null) {
          t = Object.values(this.anticipants);
          this.__cachedAnticipants = t;
          t.sort(function(a, b) {
            return a.priority - b.priority;
          });
        }
        if (arguments.length > 4) {
          args = Array.prototype.slice.call(arguments);
          args[0] = this.owner;
        }
        _ref1 = this.__cachedAnticipants;
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          anticipant = _ref1[_i];
          anticipant.fire(this, event, arguments);
        }
        for (_j = 0, _len1 = cachedListeners.length; _j < _len1; _j++) {
          listener = cachedListeners[_j];
          listener_f = listener[0];
          listener_c = listener[1];
          params = listener[2];
          through = params.through;
          if (through != null) {
            isItTime = through.isItTime;
            anti_rtid = through._rtid;
          } else {
            anti_rtid = through;
          }
          if ((through == null) || isItTime) {
            params.callCount += 1;
          }
          if ((through == null) || isItTime) {
            switch (arguments.length) {
              case 1:
                if (typeof listener_f === FUNCTION_TYPE) {
                  listener_f.call(listener_c, this.owner);
                } else {
                  listener_c[listener_f](this.owner);
                }
                break;
              case 2:
                if (typeof listener_f === FUNCTION_TYPE) {
                  listener_f.call(listener_c, this.owner, arguments[1]);
                } else {
                  listener_c[listener_f](this.owner, arguments[1]);
                }
                break;
              case 3:
                if (typeof listener_f === FUNCTION_TYPE) {
                  listener_f.call(listener_c, this.owner, arguments[1], arguments[2]);
                } else {
                  listener_c[listener_f](this.owner, arguments[1], arguments[2]);
                }
                break;
              case 4:
                if (typeof listener_f === FUNCTION_TYPE) {
                  listener_f.call(listener_c, this.owner, arguments[1], arguments[2], arguments[3]);
                } else {
                  listener_c[listener_f](this.owner, arguments[1], arguments[2], arguments[3]);
                }
                break;
              default:
                if (typeof listener_f === FUNCTION_TYPE) {
                  listener_f.apply(listener_c, args);
                } else {
                  listener_c[listener_f].apply(listener_c, args);
                }
            }
          }
          if ((through != null) && through.isRemoving) {
            if (typeof listener_f === FUNCTION_TYPE) {
              this.unbiById(event, listener_f._rtid, listener_c._rtid, anti_rtid);
            } else {
              this.unbiById(event, listener_f, listener_c._rtid, anti_rtid);
            }
          }
        }
      }
      return this.owner || this;
    };

    Observer.prototype.bi = function(event, func, p) {
      var anti, anti_rtid, context, context_rtid, func_rtid, params, through;
      if (func == null) {
        throw "empty function for " + event + " bind";
      }
      params = p || {};
      context = params.context || this.owner;
      if (this.__listenersHash[event] == null) {
        this.__listenersHash[event] = {};
        this.__eventsUsingCounts[event] = 0;
      }
      if (typeof func === FUNCTION_TYPE) {
        func_rtid = func._rtid;
        if (func_rtid == null) {
          func_rtid = RedTea.genid();
          func._rtid = func_rtid;
        }
      } else {
        func_rtid = func;
        if (context[func_rtid] == null) {
          throw "empty function for " + event + " bind";
        }
      }
      context_rtid = context._rtid;
      if (context_rtid == null) {
        context_rtid = RT.genid();
        context._rtid = context_rtid;
      }
      anti = params.through;
      if (typeof anti === OBJECT_TYPE) {
        anti_rtid = anti._rtid;
      } else {
        anti_rtid = anti;
      }
      if (this.funcs[func_rtid] == null) {
        this.funcs[func_rtid] = func;
        this.__funcsUsingCounts[context_rtid] = 0;
      }
      if (this.contexts[context_rtid] == null) {
        this.contexts[context_rtid] = context;
        this.__contextsUsingCounts[context_rtid] = 0;
      }
      if (anti != null) {
        if (this.anticipants[anti_rtid] == null) {
          this.anticipants[anti_rtid] = anti;
          delete this.__cachedAnticipants;
        }
        anti.binded(this, event, func, context);
      }
      if (this.__listenersHash[event][func_rtid] == null) {
        this.__listenersHash[event][func_rtid] = {};
      }
      if (this.__listenersHash[event][func_rtid][context_rtid] == null) {
        this.__listenersHash[event][func_rtid][context_rtid] = {};
      }
      if (this.__listenersHash[event][func_rtid][context_rtid][anti_rtid] != null) {
        throw "listener with this parameters already added for " + event;
      }
      if (this.__eventsUsingCounts[event] < 1) {
        if ((this.callbacks != null) && (this.callbacks.onAddEvent != null)) {
          this.callbacks.onAddEvent.call(this.callbacksContext, event);
        }
      }
      this.__funcsUsingCounts[context_rtid] += 1;
      this.__contextsUsingCounts[context_rtid] += 1;
      this.__eventsUsingCounts[event] += 1;
      this.__listenersHash[event][func_rtid][context_rtid][anti_rtid] = params;
      params.callCount || (params.callCount = 0);
      params.priority || (params.priority = 0);
      through = params.through;
      delete this.__cachedListeners[event];
      return this.owner || this;
    };

    Observer.prototype.unbiById = function(event, func_rtid, context_rtid, anti_rtid) {
      if ((this.__listenersHash[event] != null) && (this.__listenersHash[event][func_rtid] != null) && (this.__listenersHash[event][func_rtid][context_rtid] != null) && (this.__listenersHash[event][func_rtid][context_rtid][anti_rtid] != null)) {
        if (this.__cachedListeners[event] != null) {
          delete this.__cachedListeners[event];
        }
        this.removeAnticipants(anti_rtid);
        delete this.__listenersHash[event][func_rtid][context_rtid][anti_rtid];
        this.__eventsUsingCounts[event] -= 1;
        this.__contextsUsingCounts[context_rtid] -= 1;
        if (this.__contextsUsingCounts[context_rtid] < 1) {
          delete this.contexts[context_rtid];
        }
        this.__funcsUsingCounts[func_rtid] -= 1;
        if (this.__funcsUsingCounts[func_rtid] < 1) {
          delete this.funcs[func_rtid];
        }
        if (this.__eventsUsingCounts[event] < 1) {
          if ((this.callbacks != null) && (this.callbacks.onDeleteEvent != null)) {
            return this.callbacks.onDeleteEvent.call(this.callbacksContext, event);
          }
        }
      }
    };

    Observer.prototype.unbi = function(event, func, params) {
      var anti, anti_rtid, context, func_rtid;
      context = params.context;
      context || (context = this.owner);
      anti = params.through;
      if (typeof func === FUNCTION_TYPE) {
        func_rtid = func._rtid;
      } else {
        func_rtid = func;
      }
      if (typeof anti === OBJECT_TYPE) {
        anti_rtid = anti._rtid;
      } else {
        anti_rtid = anti;
      }
      this.unbiById(event, func_rtid, context._rtid, anti_rtid);
      return this.owner || this;
    };

    Observer.prototype.removeAnticipants = function(anti_rtid) {
      if (anti_rtid != null) {
        delete this.anticipants[anti_rtid];
        return delete this.__cachedAnticipants;
      }
    };

    return Observer;

  })();

  RT.Observable = (function(_super) {
    __extends(Observable, _super);

    function Observable() {
      _ref = Observable.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Observable.prototype.fire = function() {
      if (this.observer != null) {
        return this.observer.fire.apply(this.observer, arguments);
      }
    };

    Observable.prototype.bi = function(event, func, params) {
      if (this.observer == null) {
        this.observer = new RT.Observer(this);
      }
      return this.observer.bi(event, func, params);
    };

    Observable.prototype.unbi = function(event, func, params) {
      if (this.observer != null) {
        return this.observer.unbi(event, func, params);
      }
    };

    Observable.prototype.doOnce = function(event, func) {
      if (this.observer == null) {
        this.observer = new RT.Observer(this);
      }
      return this.observer.doOnce(event, func);
    };

    return Observable;

  })(RedTea.Base);

  _ref1 = [glob, HTMLElement.prototype, SVGElement.prototype, XMLHttpRequest.prototype];
  for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
    obj = _ref1[_i];
    obj.bi = function(event, func, params) {
      var _this = this;
      if (this.observer == null) {
        this._funcs = {};
        this.observer = new RT.Observer(this, {
          onAddEvent: function(e) {
            _this._funcs[e] = function(ee) {
              return this.observer.fire(e, ee);
            };
            return _this.addEventListener(e, _this._funcs[e]);
          },
          onDeleteEvent: function(e) {
            _this.removeEventListener(e, _this._funcs[e]);
            return _this._funcs[e] = null;
          }
        });
      }
      this.observer.bi(event, func, params);
      return this;
    };
    obj.on = obj.bi;
    obj.unbi = function(event, func, params) {
      if (this.observer != null) {
        this.observer.unbi(event, func, params);
      }
      return this;
    };
    obj.fire = function() {
      if (this.observer != null) {
        return this.observer.fire.apply(this.observer, arguments);
      }
    };
    obj.doOnce = function(event, func) {
      this.bi(event, func, {
        through: RT.DoOnce
      });
      return this;
    };
  }

  _ref2 = [glob, HTMLElement.prototype, SVGElement.prototype];
  for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
    obj = _ref2[_j];
    obj.stopProp = function() {
      var arg, _k, _len2;
      for (_k = 0, _len2 = arguments.length; _k < _len2; _k++) {
        arg = arguments[_k];
        this.bi(arg, this._stopProp);
      }
      return this;
    };
    obj.prevDef = function() {
      var arg, _k, _len2;
      for (_k = 0, _len2 = arguments.length; _k < _len2; _k++) {
        arg = arguments[_k];
        this.bi(arg, this._prevDef);
      }
      return this;
    };
    obj.stopPropAndDef = function() {
      var arg, _k, _len2;
      for (_k = 0, _len2 = arguments.length; _k < _len2; _k++) {
        arg = arguments[_k];
        this.bi(arg, this._stopPropAndDef);
      }
      return this;
    };
    obj.notClickTimout = function(t) {
      this._notClickTimeout = t;
      this.bi(MOUSEDOWN, _notClickMouseDown, {
        context: this
      });
      return this.bi(MOUSEUP, _notClickMouseUp, {
        context: this
      });
    };
    obj._notClickMouseDown = function(obj, e) {
      return this._mouseDownTime = (new Date).getTime();
    };
    obj._notClickMouseUp = function(obj, e) {
      return this.notClick = ((new Date).getTime() - this._mouseDownTime) > this._notClickTimeout;
    };
    obj._stopProp = function(obj, e) {
      return e.stopPropagation();
    };
    obj._prevDef = function(obj, e) {
      return e.preventDefault();
    };
    obj._stopPropAndDef = function(obj, e) {
      e.preventDefault();
      return e.stopPropagation();
    };
  }

  glob.RedTeaWidget = (function(_super) {
    var GENERATE_OBJECT;

    __extends(RedTeaWidget, _super);

    GENERATE_OBJECT = function(proto, args, mainWidget) {
      var constructor, t;
      constructor = proto.constructor;
      t = Object.create(proto);
      t.widget = t;
      if (t.isMain) {
        t.mainWidget = t;
      } else {
        if (mainWidget != null) {
          t.mainWidget = mainWidget;
        }
      }
      if (constructor != null) {
        switch (args.length) {
          case 0:
            constructor.call(t);
            break;
          case 1:
            if (typeof args[0] === FUNCTION_TYPE) {
              constructor.call(t);
              t.add(args[0]);
            } else {
              constructor.call(t, args[0]);
            }
            break;
          case 2:
            constructor.call(t, args[0], args[1]);
            break;
          case 3:
            constructor.call(t, args[0], args[1], args[2]);
            break;
          case 4:
            constructor.call(t, args[0], args[1], args[2], args[3]);
            break;
          default:
            constructor.apply(t, args);
        }
      }
      return t;
    };

    RedTeaWidget.register = function(widgetName) {
      var proto;
      proto = this.prototype;
      RedTea[widgetName] = function() {
        return GENERATE_OBJECT(proto, arguments, this.mainWidget);
      };
      RedTeaWidget.prototype[widgetName] = function() {
        var t;
        t = GENERATE_OBJECT(proto, arguments, this.mainWidget);
        this.dom.add(t);
        return t;
      };
      return HTMLElement.prototype[widgetName] = function() {
        var t;
        t = GENERATE_OBJECT(proto, arguments, this.mainWidget);
        this.appendChild(t.dom);
        return t;
      };
    };

    RedTeaWidget.prototype.isMain = false;

    RedTeaWidget.prototype.isWidget = true;

    RedTeaWidget.prototype.dom = null;

    function RedTeaWidget(params, func) {
      var k, v;
      if (typeof params === OBJECT_TYPE) {
        for (k in params) {
          v = params[k];
          this[k] = v;
        }
        this.createDom(this);
      }
      if ((params == null) || typeof params === FUNCTION_TYPE) {
        this.createDom(this);
      }
      if (typeof params === FUNCTION_TYPE) {
        this.add(params);
      }
      if (func != null) {
        this.add(func);
      }
      this.init(params);
    }

    RedTeaWidget.prototype.createDom = function(self) {};

    RedTeaWidget.prototype.init = function(params) {};

    RedTeaWidget.prototype.isAdded = function() {
      return this.dom.isAdded();
    };

    RedTeaWidget.prototype.add = function(el) {
      return this.addHelper(this, el);
    };

    RedTeaWidget.prototype.addHelper = function(addTo, el) {
      if (typeof el === FUNCTION_TYPE) {
        el.call(addTo);
      } else {
        addTo.add(el);
      }
      return this;
    };

    RedTeaWidget.prototype.removeSelf = function() {
      return this.dom.removeSelf();
    };

    RedTeaWidget.prototype.remChilds = function() {
      return this.dom.remChilds();
    };

    RedTeaWidget.prototype.hasCls = function(c) {
      return this.dom.hasCls(c);
    };

    RedTeaWidget.prototype.addCls = function(c) {
      this.dom.addCls(c);
      return this;
    };

    RedTeaWidget.prototype.remCls = function(c) {
      this.dom.remCls(c);
      return this;
    };

    RedTeaWidget.prototype.togCls = function(c) {
      this.dom.togCls(c);
      return this;
    };

    RedTeaWidget.prototype.destroy = function() {
      this.removeSelf();
      return delete this.dom;
    };

    RedTeaWidget.prototype.ins = function(el) {
      return this.dom.ins(el);
    };

    RedTeaWidget.prototype.preadd = function(el, beforeEl) {
      console.log('preadd is deprecated');
      this.dom.preadd(el, beforeEl);
      return this;
    };

    RedTeaWidget.prototype.replaceBy = function(c) {
      console.log('replaceBy is deprecated');
      return this.dom.replaceBy(c);
    };

    RedTeaWidget.prototype.addAfter = function(c) {
      console.log('addAfter is deprecated');
      return this.dom.addAfter(c);
    };

    return RedTeaWidget;

  })(RT.Observable);

  glob.RTW = RedTeaWidget;

  root.create = root.createElement;

  root.one = root.getElementById;

  root.byName = root.getElementsByName;

  _ref3 = [HTMLDocument.prototype, HTMLElement.prototype, SVGElement.prototype];
  for (_k = 0, _len2 = _ref3.length; _k < _len2; _k++) {
    klass = _ref3[_k];
    klass.tags = function(tagname) {
      return this.getElementsByTagName(tagname);
    };
    klass.tag = function(tagname) {
      return this.getElementsByTagName(tagname)[0];
    };
    klass.byClass = function(cls) {
      return this.getElementsByClassName(cls);
    };
    klass.firstByClass = function(cls) {
      return this.getElementsByClassName(cls)[0];
    };
  }

  _ref4 = [HTMLElement.prototype, SVGElement.prototype];
  for (_l = 0, _len3 = _ref4.length; _l < _len3; _l++) {
    klass = _ref4[_l];
    klass.sprm = function(k, v) {
      this[k] = v;
      return this;
    };
    klass.prm = function(k) {
      return this[k];
    };
    klass.atr = HTMLElement.prototype.getAttribute;
    klass.intAtr = function(k) {
      return parseInt(this.getAttribute(k));
    };
    klass.floatAtr = function(k) {
      return parseFloat(this.getAttribute(k));
    };
    klass.satr = function(k, v) {
      this.setAttribute(k, v);
      return this;
    };
    klass.satrs = function(obj) {
      var k, v, _results;
      _results = [];
      for (k in obj) {
        v = obj[k];
        _results.push(this.setAttribute(k, v));
      }
      return _results;
    };
    klass.addCls = function(cls) {
      this.classList.add(cls);
      return this;
    };
    klass.remCls = function(removingCls) {
      this.classList.remove(removingCls);
      return this;
    };
    klass.hasCls = function(cls) {
      return this.classList.contains(cls);
    };
    klass.togCls = function(cls) {
      this.classList.toggle(cls);
      return this;
    };
    klass.remove = klass.removeChild;
    klass.remChilds = function() {
      var _results;
      _results = [];
      while (this.hasChildNodes()) {
        _results.push(this.remove(this.firstChild));
      }
      return _results;
    };
    klass.sliceChildNodes = function() {
      return Array.prototype.slice.call(this.childNodes);
    };
    klass.setWigets = function(el) {
      if (!el.isWidget) {
        el.widget || (el.widget = this.widget);
      }
      if (this.mainWidget != null) {
        return el.mainWidget = this.mainWidget;
      }
    };
    klass.add = function(el) {
      if (typeof el === FUNCTION_TYPE) {
        el.call(this);
      } else if (el.isWidget) {
        this.appendChild(el.dom);
      } else {
        this.appendChild(el);
      }
      this.setWigets(el);
      return this;
    };
    klass.removeSelf = function() {
      if (this.parentElement != null) {
        return this.parentElement.remove(this);
      }
    };
    klass.insert = function(el) {
      if (el.isWidget) {
        this.appendChild(el.dom);
      } else {
        this.appendChild(el);
      }
      this.setWigets(el);
      return el;
    };
    klass.ins = klass.insert;
    klass.preadd = function(el, beforeEl) {
      console.log('preadd is deprecated');
      if (this.firstChild != null) {
        el = el.isWidget ? el.dom : el;
        beforeEl = beforeEl != null ? beforeEl.isWidget ? beforeEl.dom : beforeEl : this.firstChild;
        this.insertBefore(el, beforeEl);
      } else {
        this.add(el);
      }
      return this;
    };
    klass.replaceBy = function(el) {
      console.log('replaceBy is deprecated');
      if (el.isWidget) {
        this.parentNode.insertBefore(el.dom, this);
      } else {
        this.parentNode.insertBefore(el, this);
      }
      this.removeSelf();
      return this;
    };
    klass.addAfter = function(el) {
      console.log('addAfter is deprecated');
      return this.parentNode.insertBefore(el, this.nextSibling);
    };
    klass.addBefore = function(el) {
      console.log('addBefore is deprecated');
      return this.parentNode.insertBefore(el, this);
    };
  }

  _ref5 = [HTMLDocument.prototype, HTMLElement.prototype, SVGElement.prototype, RedTeaWidget.prototype, Text.prototype];
  for (_m = 0, _len4 = _ref5.length; _m < _len4; _m++) {
    klass = _ref5[_m];
    klass.setta = function(name, o) {
      if (o != null) {
        o[name] = this;
      } else {
        this.mainWidget[name] = this;
      }
      return this;
    };
  }

  _ref6 = [HTMLDocument.prototype, HTMLElement.prototype, SVGElement.prototype, Text.prototype];
  for (_n = 0, _len5 = _ref6.length; _n < _len5; _n++) {
    klass = _ref6[_n];
    klass.isAdded = function() {
      return this.parentNode != null;
    };
    klass.isAddedToDom = function() {
      var el;
      if (this.parentNode == null) {
        return false;
      } else {
        while (el = this.parentNode) {
          if (this.parentNode === root) {
            return true;
          }
        }
        return false;
      }
    };
  }

  _ref7 = [Text.prototype];
  for (_o = 0, _len6 = _ref7.length; _o < _len6; _o++) {
    klass = _ref7[_o];
    klass.removeSelf = function() {
      if (this.parentElement != null) {
        return this.parentElement.remove(this);
      }
    };
  }

  tags = ["script", "meta", "link", "div", "p", "span", "a", "img", "br", "hr", "em", "strong", "button", "table", "tr", "th", "td", "thead", "tbody", "tfoot", "ul", "ol", "li", "dl", "dt", "dd", "h1", "h2", "h3", "h4", "h5", "h6", "h7", "form", "fieldset", "input", "textarea", "label", "select", "option", "canvas", "pre", "code", "noscript"];

  applyParams = function(obj, p1, p2) {
    var k, v;
    if (p1 != null) {
      if (typeof p1 === FUNCTION_TYPE) {
        p1.call(obj);
      } else {
        for (k in p1) {
          v = p1[k];
          k = k.split('_').join('-');
          obj.setAttribute(k, v);
        }
      }
    }
    if (p2 != null) {
      p2.call(obj);
    }
    return obj;
  };

  _fn = function(tt) {
    HTMLElement.prototype[tt] = function(p1, p2) {
      var el, ttt;
      ttt = root.create(tt);
      ttt.widget || (ttt.widget = this.widget);
      if (this.mainWidget != null) {
        ttt.mainWidget = this.mainWidget;
      }
      el = applyParams(ttt, p1, p2);
      this.appendChild(el);
      return el;
    };
    glob.RedTea[tt] = function(p1, p2) {
      return applyParams(root.create(tt), p1, p2);
    };
    return glob.RedTeaWidget.prototype[tt] = function(p1, p2) {
      var el, ttt;
      ttt = root.create(tt);
      ttt.widget || (ttt.widget = this);
      if (this.mainWidget != null) {
        ttt.mainWidget = this.mainWidget;
      }
      el = applyParams(ttt, p1, p2);
      if (this.dom != null) {
        this.dom.appendChild(el);
      } else {
        this.dom = el;
      }
      return el;
    };
  };
  for (_p = 0, _len7 = tags.length; _p < _len7; _p++) {
    t = tags[_p];
    _fn(t);
  }

  glob.RedTea.textNode = function(text) {
    return root.createTextNode(text);
  };

  glob.RedTea.tn = glob.RedTea.textNode;

  glob.RedTeaWidget.prototype.textNode = function(text) {
    var el;
    el = root.createTextNode(text);
    el.widget || (el.widget = this);
    if (this.mainWidget != null) {
      el.mainWidget = this.mainWidget;
    }
    if (this.dom != null) {
      this.dom.appendChild(el);
    } else {
      this.dom = el;
    }
    return el;
  };

  glob.RedTeaWidget.prototype.tn = glob.RedTeaWidget.prototype.textNode;

  _ref8 = [HTMLElement.prototype, SVGElement.prototype];
  for (_q = 0, _len8 = _ref8.length; _q < _len8; _q++) {
    klass = _ref8[_q];
    klass.textNode = function(text) {
      var el;
      el = root.createTextNode(text);
      el.widget = this.widget;
      el.mainWidget = this.mainWidget;
      this.appendChild(el);
      return el;
    };
    klass.tn = HTMLElement.prototype.textNode;
  }

  _ref9 = ["svg"];
  _fn1 = function(tt) {
    return HTMLElement.prototype[tt] = function(p1, p2) {
      var el;
      el = root.createElementNS("http://www.w3.org/2000/svg", tt);
      applyParams(el, p1, p2);
      this.appendChild(el);
      return el;
    };
  };
  for (_r = 0, _len9 = _ref9.length; _r < _len9; _r++) {
    t = _ref9[_r];
    _fn1(t);
  }

  _ref10 = ["svg", "path", 'rect', 'text', 'tspan'];
  _fn2 = function(tt) {
    SVGElement.prototype[tt] = function(p1, p2) {
      var el;
      el = root.createElementNS("http://www.w3.org/2000/svg", tt);
      applyParams(el, p1, p2);
      this.appendChild(el);
      return el;
    };
    return glob.RedTea[tt] = function(hash) {
      return applyParams(root.createElementNS("http://www.w3.org/2000/svg", tt), p1, p2);
    };
  };
  for (_s = 0, _len10 = _ref10.length; _s < _len10; _s++) {
    t = _ref10[_s];
    _fn2(t);
  }

  t = RT.div();

  t.satr(RTC.ONTOUCHSTART, 'return;');

  glob.isTouchDevice = typeof t[RTC.ONTOUCHSTART] === RTC.FUNCTION_TYPE;

}).call(this);
