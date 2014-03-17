(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  glob.RedTeaUI || (glob.RedTeaUI = {});

  RedTeaUI.BaseWidget = (function(_super) {
    __extends(BaseWidget, _super);

    function BaseWidget(params) {
      var k, v;
      if (params != null) {
        for (k in params) {
          v = params[k];
          this[k] = v;
        }
      }
    }

    BaseWidget.prototype.destroy = function() {
      this.removeSelf();
      return delete this.dom;
    };

    return BaseWidget;

  })(RedTeaWidget);

  RedTeaUI.VeriField = (function(_super) {
    var NOT_FOCUSED_CLASS, ON_RESULT, SPACE, UI_CLASS, VERI_FIELD_CLASS;

    __extends(VeriField, _super);

    ON_RESULT = 'onResult';

    VeriField.prototype.dir = '/field/verification';

    VeriField.prototype.timeout = 1000;

    VeriField.prototype.isSaving = false;

    VeriField.prototype.reqSending = false;

    VeriField.prototype.isChecking = false;

    VeriField.prototype.lastValue = '';

    VeriField.prototype.alreadyFocused = false;

    UI_CLASS = 'ui';

    VERI_FIELD_CLASS = 'veriField';

    NOT_FOCUSED_CLASS = 'notFocused';

    SPACE = ' ';

    VeriField.register(VERI_FIELD_CLASS);

    function VeriField() {
      VeriField.__super__.constructor.apply(this, arguments);
      this.classes || (this.classes = []);
      this.classes.push(UI_CLASS);
      this.classes.push(VERI_FIELD_CLASS);
      this.classes.push(NOT_FOCUSED_CLASS);
      this.field = this.input({
        "class": this.classes.join(SPACE)
      }).bi(RTC.KEYUP, this.onKeyUp, {
        context: this
      }).bi(RTC.FOCUS, this.onFocus, {
        context: this
      });
      this.loadedResults = {};
    }

    VeriField.prototype.onKeyUp = function(el, e) {
      if (this.lastValue !== this.field.value) {
        this.checksThroughDelay();
      }
      return this.lastValue = this.field.value;
    };

    VeriField.prototype.onFocus = function(el, e) {
      if (!this.alreadyFocused) {
        this.alreadyFocused = true;
        return this.field.remCls(NOT_FOCUSED_CLASS);
      }
    };

    VeriField.prototype.checksThroughDelay = function() {
      var _this = this;
      if (!this.reqSending) {
        if (!this.isChecking) {
          this.isChecking = true;
          return setTimeout(function() {
            _this.isChecking = false;
            if (_this.sendedValue !== _this.field.value) {
              return _this.startChecks();
            }
          }, this.timeout);
        }
      }
    };

    VeriField.prototype.onComlete = function(xhr, e) {
      var result;
      if (e.target.readyState === 4 && e.target.status === 200) {
        this.reqSending = false;
        result = JSON.parse(e.target.responseText);
        this.loadedResults[this.sendedValue] = result;
        this.action(result, this.sendedValue);
      }
      if (e.target.readyState === 4 && e.target.status !== 200) {
        this.reqSending = false;
        if (this.field.value !== this.sendedValue) {
          return this.startChecks();
        }
      }
    };

    VeriField.prototype.action = function(result, sendedValue) {
      return this.fire(ON_RESULT, result, sendedValue);
    };

    VeriField.prototype.startChecks = function() {
      var field_value, req;
      field_value = this.field.value;
      this.sendedValue = field_value;
      if (this.loadedResults[field_value] == null) {
        if (this.parse(field_value)) {
          this.reqSending = true;
          req = new XMLHttpRequest;
          req.bi(RTC.READYSTATECHANGE, this.onComlete, {
            context: this
          });
          req.open(RTC.GET, "" + this.dir + "/" + field_value);
          return req.send();
        }
      } else {
        return this.action(this.loadedResults[field_value], field_value);
      }
    };

    VeriField.prototype.parse = function() {
      return true;
    };

    return VeriField;

  })(RedTeaUI.BaseWidget);

  RedTeaUI.Mask = (function(_super) {
    var MASK_CLASS, SPACE, UI_CLASS;

    __extends(Mask, _super);

    UI_CLASS = 'ui';

    MASK_CLASS = 'mask';

    SPACE = ' ';

    Mask.register(MASK_CLASS);

    function Mask() {
      Mask.__super__.constructor.apply(this, arguments);
      this.classes || (this.classes = []);
      this.classes.push(UI_CLASS);
      this.classes.push(MASK_CLASS);
      this.moveX = this.moveX == null ? true : void 0;
      this.moveY = this.moveY == null ? true : void 0;
      this.interval = this.interval == null ? 100 : void 0;
      this.div({
        "class": this.classes.join(SPACE)
      });
      if (!glob.isTouchDevice) {
        this.dom.bi(RTC.MOUSEDOWN, this.onmousedown, {
          context: this
        });
        glob.bi(RTC.MOUSEUP, this.onmouseup, {
          context: this
        });
      } else {
        this.dom.bi(RTC.TOUCHSTART, this.onmousedown, {
          context: this
        });
        glob.bi(RTC.TOUCHEND, this.onmouseup, {
          context: this
        });
      }
    }

    Mask.prototype.onmousedown = function(obj, e) {
      var rect,
        _this = this;
      e.stopPropagation();
      e.preventDefault();
      if (this.movablePanel == null) {
        this.setMovablePanel();
      }
      if (this.intervalId != null) {
        clearInterval(this.intervalId);
      }
      if (e.touches != null) {
        e = e.touches[0];
      }
      if (!glob.isTouchDevice) {
        glob.bi(RTC.MOUSEMOVE, this.onmousemove, {
          context: this
        });
      } else {
        glob.bi(RTC.TOUCHMOVE, this.onmousemove, {
          context: this
        });
      }
      rect = this.movablePanel.getBoundingClientRect();
      this.movablePanelWidth = rect.width;
      this.movablePanelHeight = rect.height;
      rect = this.dom.getBoundingClientRect();
      this.maskWidth = rect.width;
      this.maskHeight = rect.height;
      this.x = e.clientX;
      this.y = e.clientY;
      this.clientX = this.x;
      this.clientY = this.y;
      this.elX = parseFloat(this.movablePanel.style.marginLeft) || 0;
      this.elY = parseFloat(this.movablePanel.style.marginTop) || 0;
      return this.intervalId = setInterval(function() {
        return _this.move();
      }, this.interval);
    };

    Mask.prototype.onmouseup = function(obj, e) {
      clearInterval(this.intervalId);
      delete this.intervalId;
      if (!glob.isTouchDevice) {
        return glob.unbi(RTC.MOUSEMOVE, this.onmousemove, this);
      } else {
        return glob.unbi(RTC.TOUCHMOVE, this.onmousemove, this);
      }
    };

    Mask.prototype.onmousemove = function(obj, e) {
      if (e.touches != null) {
        e = e.touches[0];
      }
      this.newClientX = e.clientX;
      return this.newClientY = e.clientY;
    };

    Mask.prototype.coordCorrect = function(elX, x, clientX, newClientX, movablePanelWidth, maskWidth) {
      var t;
      t = elX + newClientX - x;
      if (t < 0 && t + movablePanelWidth < maskWidth) {
        if (movablePanelWidth > maskWidth) {
          return x + newClientX - clientX;
        } else {
          return x;
        }
      }
      if (t > 0 && t + movablePanelWidth > maskWidth) {
        if (movablePanelWidth > maskWidth) {
          return x + newClientX - clientX;
        } else {
          return x;
        }
      }
      return x;
    };

    Mask.prototype.clientCorrect = function(elX, x, clientX, newClientX, movablePanelWidth, maskWidth) {
      var t;
      t = elX + newClientX - x;
      if (t < 0 && t + movablePanelWidth > maskWidth) {
        return newClientX;
      }
      if (t < 0 && t + movablePanelWidth < maskWidth) {
        if (movablePanelWidth > maskWidth) {
          return x - elX - movablePanelWidth + maskWidth;
        } else {
          return x - elX;
        }
      }
      if (t > 0 && t + movablePanelWidth < maskWidth) {
        return newClientX;
      }
      if (t > 0 && t + movablePanelWidth > maskWidth) {
        if (movablePanelWidth > maskWidth) {
          return x - elX;
        } else {
          return x - elX + maskWidth - movablePanelWidth;
        }
      }
      if (movablePanelWidth === maskWidth) {
        return x - elX;
      }
      return newClientX;
    };

    Mask.prototype.setMovablePanel = function() {
      this.movablePanel = this.dom.firstChild;
      return this.movablePanelStyle = this.movablePanel.style;
    };

    Mask.prototype.unsetMovablePanel = function() {
      delete this.movablePanel;
      return delete this.movablePanelStyle;
    };

    Mask.prototype.move = function() {
      var isAnyChages;
      isAnyChages = false;
      if (this.moveX) {
        if (this.newClientX !== this.oldClientX) {
          isAnyChages = true;
          this.oldClientX = this.newClientX;
          this.clientX = this.clientCorrect(this.elX, this.x, this.clientX, this.newClientX, this.movablePanelWidth, this.maskWidth);
        }
      } else {
        this.clientX = this.x;
      }
      if (this.moveY) {
        if (this.newClientY !== this.oldClientY) {
          isAnyChages = true;
          this.oldClientY = this.newClientY;
          this.clientY = this.clientCorrect(this.elY, this.y, this.clientY, this.newClientY, this.movablePanelHeight, this.maskHeight);
        }
      } else {
        this.clientY = this.y;
      }
      if (isAnyChages) {
        return this.movablePanelStyle.margin = "" + (this.elY + this.clientY - this.y) + "px 0 0 " + (this.elX + this.clientX - this.x) + "px";
      }
    };

    return Mask;

  })(RedTeaUI.BaseWidget);

  RedTeaUI.DelayButton = (function(_super) {
    var DELAY_BUTTON_CLASS, DISABLED, ONCLICK, PRESSED, SPACE, UI_CLASS;

    __extends(DelayButton, _super);

    function DelayButton() {
      _ref = DelayButton.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    UI_CLASS = 'ui';

    DELAY_BUTTON_CLASS = 'delayButton';

    SPACE = ' ';

    ONCLICK = 'onClick';

    DISABLED = 'disabled';

    PRESSED = 'pressed';

    DelayButton.register(DELAY_BUTTON_CLASS);

    DelayButton.prototype.isPressed = false;

    DelayButton.prototype.isDisabled = false;

    DelayButton.prototype.isStateful = false;

    DelayButton.prototype.timeout = 200;

    DelayButton.prototype.createDom = function() {
      this.classes || (this.classes = []);
      if (!this.noDefaultClass) {
        this.classes.push(UI_CLASS);
        this.classes.push(DELAY_BUTTON_CLASS);
      }
      return this.a({
        href: RTC.EMPTY_HREF,
        "class": this.classes.join(SPACE)
      }).bi(RTC.CLICK, this.onClick, {
        context: this
      }).notClickTimout(this.timeout);
    };

    DelayButton.prototype.onClick = function(el, e) {
      e.preventDefault();
      e.stopPropagation();
      if (!el.notClick) {
        if (!this.isDisabled) {
          if (this.isStateful) {
            if (this.isPressed) {
              this.unpress();
            } else {
              this.press();
            }
          }
          return this.fire(ONCLICK);
        }
      }
    };

    DelayButton.prototype.enable = function() {
      this.dom.remCls(DISABLED);
      return this.isDisabled = false;
    };

    DelayButton.prototype.disable = function() {
      this.dom.addCls(DISABLED);
      return this.isDisabled = true;
    };

    DelayButton.prototype.press = function() {
      this.dom.addCls(PRESSED);
      return this.isPressed = true;
    };

    DelayButton.prototype.unpress = function() {
      this.dom.remCls(PRESSED);
      return this.isPressed = false;
    };

    return DelayButton;

  })(RedTeaWidget);

}).call(this);
