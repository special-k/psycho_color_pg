(function() {
  var _ref, _ref1,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  glob.ImageAnimator = (function() {
    var CANVAS_NODE, CONTEXT2D, EMPTY_CANVAS, STRING_TYPE;

    CANVAS_NODE = 'canvas';

    STRING_TYPE = 'string';

    CONTEXT2D = '2d';

    EMPTY_CANVAS = root.create(CANVAS_NODE);

    ImageAnimator.prototype.isRequiresLoaded = false;

    ImageAnimator.prototype.isRequiresLoading = false;

    function ImageAnimator(loader, animHash, w, h, delta) {
      this.loader = loader;
      this.animHash = animHash;
      this.w = w;
      this.h = h;
      this.delta = delta != null ? delta : 0;
      this.startTime = (new Date).getTime();
      this.images = this.loader.images;
      this.requiredImages = [];
      this.usingImages = this.imagesList(this.animHash);
    }

    ImageAnimator.prototype.imagesList = function(hash, usingImages) {
      var hashImage, _i, _len, _ref;
      if (usingImages == null) {
        usingImages = [];
      }
      _ref = hash.images;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        hashImage = _ref[_i];
        if (typeof hashImage === STRING_TYPE) {
          usingImages.push(hashImage);
        } else {
          this.imagesList(hashImage, usingImages);
        }
      }
      return usingImages;
    };

    ImageAnimator.prototype.doLoadRequires = function() {
      var usingImage, _i, _len, _ref, _results;
      this.isRequiresLoading = true;
      this.isRequiresLoaded = true;
      _ref = this.usingImages;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        usingImage = _ref[_i];
        if (this.loader.loaded[usingImage] == null) {
          this.isRequiresLoaded = false;
          this.requiredImages.push(usingImage);
          _results.push(this.loader.load(usingImage, this.onLoad, this));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    ImageAnimator.prototype.onLoad = function(loader, imageName, imageData) {
      var index;
      index = this.requiredImages.indexOf(imageName);
      this.requiredImages.splice(index, 1);
      if (this.requiredImages.length === 0) {
        return this.isRequiresLoaded = true;
      }
    };

    ImageAnimator.prototype.image = function() {
      if (this.isRequiresLoaded) {
        this.timeLost = (new Date).getTime() - this.startTime;
        return this.parseAnimHash(this.animHash);
      } else if (!this.isRequiresLoading) {
        this.doLoadRequires();
      }
      return EMPTY_CANVAS;
    };

    ImageAnimator.prototype.parseAnimHash = function(hash) {
      var can, ctx, hashImage, hashImages, param, value, _i, _len, _ref;
      can = root.create(CANVAS_NODE);
      can.width = this.w;
      can.height = this.h;
      ctx = can.getContext(CONTEXT2D);
      ctx.translate(this.w / 2, this.h / 2);
      if (hash.transforms != null) {
        _ref = hash.transforms;
        for (param in _ref) {
          value = _ref[param];
          ctx[param].apply(ctx, value);
        }
      }
      hashImages = hash.anim != null ? (hash.period == null ? hash.period = 1000 : void 0, hash.images[Math.floor(((this.timeLost + this.delta) % (hash.images.length * hash.period)) / hash.period)]) : hash.images;
      if (typeof hashImages !== STRING_TYPE && (hashImages.length != null)) {
        for (_i = 0, _len = hashImages.length; _i < _len; _i++) {
          hashImage = hashImages[_i];
          this.drawImageOrParseHash(hashImage, ctx);
        }
      } else {
        this.drawImageOrParseHash(hashImages, ctx);
      }
      return can;
    };

    ImageAnimator.prototype.drawImageOrParseHash = function(hashImage, ctx) {
      var image;
      if (typeof hashImage === STRING_TYPE) {
        image = this.images[hashImage];
      } else {
        image = this.parseAnimHash(hashImage);
      }
      return ctx.drawImage(image, -image.width / 2, -image.height / 2, image.width, image.height);
    };

    return ImageAnimator;

  })();

  RT.Stratum = (function(_super) {
    __extends(Stratum, _super);

    function Stratum() {
      this.managers = {};
    }

    Stratum.prototype.addManager = function(name, manager) {
      if (this.managers[name] != null) {
        throw 'object with this name already added';
      }
      manager.init(this, name);
      this.fire("onAddManager:" + name, manager);
      this.fire("onAddManager", manager);
      return this.managers[name] = manager;
    };

    Stratum.prototype.updateManager = function(name, manager) {};

    Stratum.prototype.removeManager = function(manager) {
      if (this.managers[manager.name] == null) {
        throw 'object with this name not added';
      }
      manager.destroy();
      return delete this.managers[name];
    };

    Stratum.prototype.setBaseControls = function() {
      this.managers.controlsGenerator.clear();
      this.managers.controlsManager.clear();
      return this.baseControls();
    };

    return Stratum;

  })(RT.Observable);

  RT.BaseManager = (function(_super) {
    __extends(BaseManager, _super);

    function BaseManager() {
      _ref = BaseManager.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    BaseManager.prototype.managers = [];

    BaseManager.prototype.init = function(stratum, name) {
      this.stratum = stratum;
      this.name = name;
      this.setManagers();
      return this.setListeners();
    };

    BaseManager.prototype.setManagers = function() {
      var manager, manager_name, _i, _len, _ref1, _results;
      _ref1 = this.managers;
      _results = [];
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        manager_name = _ref1[_i];
        manager = this.stratum.managers[manager_name];
        if (manager != null) {
          this.initManager(this.stratum, manager);
        } else {
          this.stratum.bi("onAddManager:" + manager_name, this.initManager, {
            context: this
          });
        }
        _results.push(this.stratum.bi("onUpdateManager" + manager_name, this.initManager, {
          context: this
        }));
      }
      return _results;
    };

    BaseManager.prototype.initManager = function(stratum, manager) {
      var func;
      this.stratum = stratum;
      this[manager.name] = manager;
      func = this["" + manager.name + "Loaded"];
      if (func != null) {
        return func.call(this);
      }
    };

    BaseManager.prototype.setListeners = function() {};

    return BaseManager;

  })(RT.Observable);

  RT.ImagesLoaderManager = (function(_super) {
    var ONLOAD;

    __extends(ImagesLoaderManager, _super);

    ONLOAD = 'onload';

    function ImagesLoaderManager(imageDir, imageFormat) {
      this.imageDir = imageDir;
      this.imageFormat = imageFormat != null ? imageFormat : 'png';
      this.images = {};
      this.loading = {};
      this.loaded = {};
    }

    ImagesLoaderManager.prototype.load = function(imageName, onLoad, c) {
      var image,
        _this = this;
      if (this.loading[imageName] == null) {
        image = new Image;
        this.images[imageName] = image;
        this.loading[imageName] = 1;
        image.onload = function() {
          _this.loaded[imageName] = 1;
          _this.fire(ONLOAD, image);
          return _this.fire("" + ONLOAD + imageName, image);
        };
        image.onerror = this.onError;
        image.src = "" + this.imageDir + "/" + imageName + "." + this.imageFormat;
      }
      if (onLoad != null) {
        return this.bi("" + ONLOAD + imageName, onLoad, {
          context: c,
          maxCount: 1
        });
      }
    };

    ImagesLoaderManager.prototype.onError = function(e) {
      console.log('LoadError');
      console.log(e.target.src);
      return console.log(e);
    };

    return ImagesLoaderManager;

  })(RT.BaseManager);

  RT.ControlsKitManager = (function(_super) {
    __extends(ControlsKitManager, _super);

    ControlsKitManager.prototype.managers = ['controlsManager', 'controlsGenerator'];

    function ControlsKitManager() {
      this.kits = {};
    }

    ControlsKitManager.prototype.setListeners = function() {};

    ControlsKitManager.prototype.addKit = function(name, f) {
      return this.kits[name] = f;
    };

    ControlsKitManager.prototype.setKit = function(name) {
      this.controlsGenerator.clear();
      this.controlsManager.clear();
      return this.kits[name](this.controlsManager, this.controlsGenerator);
    };

    return ControlsKitManager;

  })(RT.BaseManager);

  RT.ControlsGenerator = (function(_super) {
    __extends(ControlsGenerator, _super);

    ControlsGenerator.prototype.managers = ['controlsManager'];

    function ControlsGenerator() {
      this.controlsNames = [];
    }

    ControlsGenerator.prototype.setListeners = function() {};

    ControlsGenerator.prototype.addControlName = function(name) {
      this.controlsNames.push(name);
      if (!Control[name].isUsingGenerator) {
        throw 'isBelongsToFeature should be true for features controls';
      }
    };

    ControlsGenerator.prototype.removeControlName = function(name) {
      return this.controlsNames.splice(this.controlsNames.indexOf(name), 1);
    };

    ControlsGenerator.prototype.clear = function() {
      var _results;
      _results = [];
      while (this.controlsNames.length > 0) {
        _results.push(this.removeControlName(this.controlsNames[0]));
      }
      return _results;
    };

    return ControlsGenerator;

  })(RT.BaseManager);

  RT.ControlsManager = (function(_super) {
    __extends(ControlsManager, _super);

    function ControlsManager() {
      this.controls = [];
      this.toggleGroups = {};
    }

    ControlsManager.prototype.setListeners = function() {};

    ControlsManager.prototype.addControl = function(control) {
      this.controls.push(control);
      this.setToggleGroup(control);
      return control.init(this.stratum);
    };

    ControlsManager.prototype.removeControl = function(control) {
      this.controls.splice(this.controls.indexOf(control), 1);
      this.unsetToggleGroup(control);
      return control.destroy();
    };

    ControlsManager.prototype.setToggleGroup = function(control) {
      if (control.toggleGroupeName != null) {
        control.toggleGroupe = this.getToggleGroup(control.toggleGroupeName);
        control.toggleGroupe.bi('onDeactivate', control.deactivate, {
          context: control
        });
        if (control.isDefaultToggleControl) {
          return control.toggleGroupe.bi('onActivateDefault', control.activate, {
            context: control
          });
        }
      }
    };

    ControlsManager.prototype.unsetToggleGroup = function(control) {
      if (control.toggleGroupeName != null) {
        control.toggleGroupe.unbi('onDeactivate', control.deactivate, control);
        if (control.isDefaultToggleControl) {
          return control.toggleGroupe.unbi('onActivateDefault', control.activate, control);
        }
      }
    };

    ControlsManager.prototype.getToggleGroup = function(toggleGroupeName) {
      if (this.toggleGroups[toggleGroupeName] != null) {
        return this.toggleGroups[toggleGroupeName];
      } else {
        return this.toggleGroups[toggleGroupeName] = new Observer(this);
      }
    };

    ControlsManager.prototype.clear = function() {
      var _results;
      _results = [];
      while (this.controls.length > 0) {
        _results.push(this.removeControl(this.controls[0]));
      }
      return _results;
    };

    return ControlsManager;

  })(RT.BaseManager);

  RT.ControlsPanelsManager = (function(_super) {
    var ADDED;

    __extends(ControlsPanelsManager, _super);

    ADDED = 'added';

    function ControlsPanelsManager() {
      ControlsPanelsManager.__super__.constructor.apply(this, arguments);
      this.widgets = {};
    }

    ControlsPanelsManager.prototype.setPanel = function(panelName, panel) {
      this[panelName] = panel;
      return this.widgets[panelName] = [];
    };

    ControlsPanelsManager.prototype.showIn = function(panelName, widget) {
      this[panelName].remChilds();
      this.widgets[panelName].length = 0;
      return this.append(panelName, widget);
    };

    ControlsPanelsManager.prototype.clear = function(panelName) {
      this[panelName].remChilds();
      return this.widgets[panelName].length = 0;
    };

    ControlsPanelsManager.prototype.append = function(panelName, el) {
      var event, panel;
      panel = this[panelName];
      panel.add(el);
      this.widgets[panelName].push(el);
      event = new CustomEvent(ADDED, {
        parent: panel,
        bubbles: true,
        cancelable: true
      });
      if (el.isWidget) {
        return el.dom.dispatchEvent(event);
      } else {
        return el.dispatchEvent(event);
      }
    };

    return ControlsPanelsManager;

  })(RT.BaseManager);

  RT.BaseControl = (function(_super) {
    __extends(BaseControl, _super);

    BaseControl.isUsingGenerator = false;

    BaseControl.prototype.managers = ['controlsPanelsManager'];

    function BaseControl(params) {
      var k, v;
      if (params != null) {
        for (k in params) {
          v = params[k];
          this[k] = v;
        }
      }
      this.doms = [];
    }

    BaseControl.prototype.addElements = function() {
      var element, _i, _len, _ref1, _results;
      _ref1 = this.doms;
      _results = [];
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        element = _ref1[_i];
        _results.push(this.stratum.managers.controlsPanelsManager[this.panel].add(element));
      }
      return _results;
    };

    BaseControl.prototype.controlsPanelsManagerLoaded = function() {
      this.bindElements();
      if (!this.constructor.isUsingGenerator) {
        return this.addElements();
      }
    };

    BaseControl.prototype.active = false;

    BaseControl.prototype.strategies = [];

    BaseControl.prototype.activate = function() {
      throw 'You should implement method activate';
    };

    BaseControl.prototype.deactivate = function() {
      throw 'You should implement method deactivate';
    };

    BaseControl.prototype.bindElements = function() {
      throw 'You should implement method bindElements';
    };

    BaseControl.prototype.setListeners = function() {};

    BaseControl.prototype.destroy = function() {
      var dom, _i, _len, _ref1;
      _ref1 = this.doms;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        dom = _ref1[_i];
        dom.removeSelf();
      }
      delete this.doms;
      return delete this.imageAnimator;
    };

    BaseControl.prototype.update = function() {
      throw 'You should implement method update';
    };

    BaseControl.prototype.draw = function(can) {};

    return BaseControl;

  })(RT.BaseManager);

  RT.SimpleControl = (function(_super) {
    var ON_ACTIVATE_DEFAULT, ON_DEACTIVATE;

    __extends(SimpleControl, _super);

    function SimpleControl() {
      _ref1 = SimpleControl.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    SimpleControl.prototype.buttonClass = 'controlButton';

    SimpleControl.prototype.iconClass = 'standart';

    SimpleControl.prototype.toggleGroupeName = null;

    SimpleControl.prototype.activateOnStart = false;

    ON_ACTIVATE_DEFAULT = 'onActivateDefault';

    ON_DEACTIVATE = 'onDeactivate';

    SimpleControl.prototype.bindElements = function() {
      return this.doms.push(RT.delayButton({
        classes: [this.buttonClass, this.iconClass]
      }).bi(RTC.CLICK, 'toggleActive', {
        context: this
      }));
    };

    SimpleControl.prototype.activate = function() {
      if (this.toggleGroupe) {
        this.toggleGroupe.fire(ON_DEACTIVATE);
      }
      this.active = true;
      return this.doms[0].addCls(RTC.ON);
    };

    SimpleControl.prototype.deactivate = function() {
      this.active = false;
      return this.doms[0].remCls(RTC.ON);
    };

    SimpleControl.prototype.toggleActive = function(el, e) {
      if (this.active) {
        if (this.toggleGroupe != null) {
          this.toggleGroupe.fire(ON_ACTIVATE_DEFAULT);
        } else {
          this.deactivate(el, e);
        }
      } else {
        this.activate(el, e);
      }
      e.stopPropagation();
      return e.preventDefault();
    };

    SimpleControl.prototype.destroy = function() {
      this.doms[0].unbi(RTC.CLICK, 'toggleActive', {
        context: this
      });
      return SimpleControl.__super__.destroy.apply(this, arguments);
    };

    return SimpleControl;

  })(RT.BaseControl);

}).call(this);
