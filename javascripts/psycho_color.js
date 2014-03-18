(function() {
  var BlueTableWidget, FooterWidget, GrayTableWidget, GreenTableWidget, MainTableWidget, NextTableWidget, PsychoColor, PsychoColorPanelsManager, RedTableWidget, ResultTableWidget, SelectColorYouDontLike, SelectColorYouLike, SelectColorsYouDontLike, SelectColorsYouLike, TableManager, WaitMomentBeforeselectColorsYouLike, YellowTableWidget, ss,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  ss = function(t, d) {
    return ".card{ width: " + (5 * t + d) + "; height: " + (5 * t + d) + ";} .grayTable{ width: " + (17.5 * t + d) + "; height: " + (17.5 * t + d) + ";} .nextTable{ width: " + (27.5 * t + d) + "; height: " + (12.5 * t + d) + ";} .nextTable .darkBlue{ left: " + (7.5 * t + d) + ";} .nextTable .blueGreen{ right: " + (7.5 * t + d) + ";} .nextTable .purple{ left: " + (7.5 * t + d) + ";} .nextTable .brown{ right: " + (7.5 * t + d) + ";} .next2Table{ width: " + (27.5 * t + d) + "; height: " + (12.5 * t + d) + ";} .next2Table .darkBlue{ left: " + (7.5 * t + d) + ";} .next2Table .redYellow{ right: " + (7.5 * t + d) + ";} .next2Table .yellow{ left: " + (7.5 * t + d) + ";} .next2Table .brown{ right: " + (7.5 * t + d) + ";} .pairTable{ width: " + (19 * t + d) + "; height: " + (7 * t + d) + ";} .pairTable .card{ width: " + (7 * t + d) + "; height: " + (7 * t + d) + ";} .resultTable{ width: " + (32 * t + d) + "; padding: " + (1 * t + d) + "; padding-top: " + (3 * t + d) + "; padding-bottom: " + (2 * t + d) + ";} .window{ width: " + (15 * t + d) + "; height: " + (10 * t + d) + "; padding: " + (2 * t + d) + "; font-size: " + (0.9 * t + d) + ";} .window .delayButton{ padding: " + (0.5 * t + d) + "; font-size: " + (1.2 * t + d) + ";} .footer{ font-size: " + (0.4 * t + d) + ";} .footer span, a{ padding: " + (0.16 * t + d) + ";} p{ margin: " + (0.4 * t + d) + ";}";
  };

  window.start = function() {
    window.psychoColor = new PsychoColor;
    return root.body.add(psychoColor.dom);
  };

  PsychoColor = (function(_super) {
    __extends(PsychoColor, _super);

    PsychoColor.prototype.width = 500;

    PsychoColor.prototype.height = 300;

    function PsychoColor(dom, canvas) {
      this.dom = dom;
      this.canvas = canvas;
      PsychoColor.__super__.constructor.apply(this, arguments);
      this.dom || (this.dom = RT.div({
        "class": 'psychoColor'
      }));
      this.footer = RT.footer();
      this.addFooter();
      this.addManager('controlsPanelsManager', new PsychoColorPanelsManager);
      this.addManager('controlsManager', new RT.ControlsManager);
      this.addManager('tableManager', new TableManager);
      this.headStyle = root.one('jsStyle').add(function() {
        return this.tn(ss(window.screen.availWidth / 100 * 2.5, 'px'));
      });
      window.bi('orientationchange', 'onResize', {
        context: this
      });
      window.bi('resize', 'onResize', {
        context: this
      });
    }

    PsychoColor.prototype.onResize = function() {
      return this.headStyle.firstChild.nodeValue = ss(window.screen.availWidth / 100 * 2.5, 'px');
    };

    PsychoColor.prototype.addFooter = function() {
      return this.dom.add(this.footer);
    };

    PsychoColor.prototype.removeFooter = function() {
      return this.footer.removeSelf();
    };

    return PsychoColor;

  })(RT.Stratum);

  PsychoColorPanelsManager = (function(_super) {
    __extends(PsychoColorPanelsManager, _super);

    function PsychoColorPanelsManager() {
      return PsychoColorPanelsManager.__super__.constructor.apply(this, arguments);
    }

    PsychoColorPanelsManager.prototype.init = function() {
      PsychoColorPanelsManager.__super__.init.apply(this, arguments);
      this.setPanel('central', RT.div({
        id: 'centralPanel'
      }));
      return this.stratum.dom.add(this.central);
    };

    return PsychoColorPanelsManager;

  })(RT.ControlsPanelsManager);

  TableManager = (function(_super) {
    var BLUE_STAGE, CENTRAL_PANEL, GRAY_STAGE, GREEN_STAGE, MAIN_STAGE, NEXT2_STAGE, NEXT_STAGE, ON_SELECT, RED_STAGE, RESULT_STAGE, YELLOW_STAGE;

    __extends(TableManager, _super);

    TableManager.prototype.managers = ['controlsPanelsManager'];

    GRAY_STAGE = 'gray';

    NEXT_STAGE = 'next';

    MAIN_STAGE = 'main';

    BLUE_STAGE = 'blue';

    GREEN_STAGE = 'green';

    RED_STAGE = 'red';

    YELLOW_STAGE = 'yellow';

    NEXT2_STAGE = 'next2';

    RESULT_STAGE = 'result';

    TableManager.prototype.stage = GRAY_STAGE;

    TableManager.prototype.isLike = true;

    TableManager.prototype.step = 0;

    ON_SELECT = 'onSelect';

    CENTRAL_PANEL = 'central';

    function TableManager() {
      this.grayResults = [];
      this.nextResults = [];
      this.mainResults = [0, 0, 0, 0];
      this.blueResults = [0, 0, 0, 0];
      this.greenResults = [0, 0, 0, 0];
      this.redResults = [0, 0, 0, 0];
      this.yellowResults = [0, 0, 0, 0];
      this.next2Results = [];
      this.grayTable = RT.grayTable().bi(ON_SELECT, ON_SELECT, {
        context: this
      });
      this.nextTable = RT.nextTable().bi(ON_SELECT, ON_SELECT, {
        context: this
      });
      this.mainTable = RT.mainTable().bi(ON_SELECT, ON_SELECT, {
        context: this
      });
      this.blueTable = RT.blueTable().bi(ON_SELECT, ON_SELECT, {
        context: this
      });
      this.greenTable = RT.greenTable().bi(ON_SELECT, ON_SELECT, {
        context: this
      });
      this.redTable = RT.redTable().bi(ON_SELECT, ON_SELECT, {
        context: this
      });
      this.yellowTable = RT.yellowTable().bi(ON_SELECT, ON_SELECT, {
        context: this
      });
      this.next2Table = RT.next2Table().bi(ON_SELECT, ON_SELECT, {
        context: this
      });
      this.resultTable = RT.resultTable({
        manager: this
      });
    }

    TableManager.prototype.setStage = function() {
      this.step = 0;
      this.isLike = true;
      this.controlsPanelsManager.clear(CENTRAL_PANEL);
      return this.controlsPanelsManager.showIn(CENTRAL_PANEL, this["" + this.stage + "Table"]);
    };

    TableManager.prototype.controlsPanelsManagerLoaded = function() {
      this.setStage();
      this.lock();
      return this.controlsPanelsManager.append(CENTRAL_PANEL, RT.selectColorsYouLike().bi('onClick', 'unlock', {
        context: this
      }).bi('onClick', 'removeFooter', {
        context: this
      }));
    };

    TableManager.prototype.removeFooter = function() {
      return this.stratum.removeFooter();
    };

    TableManager.prototype.unlock = function() {
      this.isLock = false;
      this.grayTable.isLock = false;
      this.nextTable.isLock = false;
      this.mainTable.isLock = false;
      this.blueTable.isLock = false;
      this.greenTable.isLock = false;
      this.redTable.isLock = false;
      this.yellowTable.isLock = false;
      return this.next2Table.isLock = false;
    };

    TableManager.prototype.lock = function() {
      this.isLock = true;
      this.grayTable.isLock = true;
      this.nextTable.isLock = true;
      this.mainTable.isLock = true;
      this.blueTable.isLock = true;
      this.greenTable.isLock = true;
      this.redTable.isLock = true;
      this.yellowTable.isLock = true;
      return this.next2Table.isLock = true;
    };

    TableManager.prototype.onSelect = function(self, v) {
      if (this.isLock) {
        return;
      }
      if (this.stage === GRAY_STAGE) {
        if (this.isLike) {
          this.grayResults[this.step] = v;
        } else {
          this.grayResults[4] = v;
        }
      }
      if (this.stage === NEXT_STAGE) {
        if (this.isLike) {
          this.nextResults[this.step] = v;
        } else {
          this.nextResults[12 - this.step] = v;
        }
      }
      if (this.stage === MAIN_STAGE) {
        this.mainResults[v] += 1;
      }
      if (this.stage === BLUE_STAGE) {
        this.blueResults[v] += 1;
      }
      if (this.stage === GREEN_STAGE) {
        this.greenResults[v] += 1;
      }
      if (this.stage === RED_STAGE) {
        this.redResults[v] += 1;
      }
      if (this.stage === YELLOW_STAGE) {
        this.yellowResults[v] += 1;
      }
      if (this.stage === NEXT2_STAGE) {
        if (this.isLike) {
          this.next2Results[this.step] = v;
        } else {
          this.next2Results[12 - this.step] = v;
        }
      }
      this.step += 1;
      if (this.stage === GRAY_STAGE) {
        if (this.step > 1) {
          this.isLike = false;
          this.lock();
          this.controlsPanelsManager.append(CENTRAL_PANEL, RT.selectColorYouDontLike().bi('onClick', 'unlock', {
            context: this
          }));
        }
        if (this.grayTable.isFinish) {
          this.stage = NEXT_STAGE;
          this.setStage();
          this.lock();
          this.controlsPanelsManager.append(CENTRAL_PANEL, RT.selectColorsYouLike().bi('onClick', 'unlock', {
            context: this
          }));
        }
      }
      if (this.stage === NEXT_STAGE) {
        if (this.step > 4) {
          if (this.isLike) {
            this.lock();
            this.controlsPanelsManager.append(CENTRAL_PANEL, RT.selectColorsYouDontLike().bi('onClick', 'unlock', {
              context: this
            }));
            this.isLike = false;
          }
        }
        if (this.nextTable.isFinish) {
          this.stage = NEXT2_STAGE;
          this.setStage();
          this.lock();
          this.controlsPanelsManager.append(CENTRAL_PANEL, RT.waitMomentBeforeselectColorsYouLike().bi('onClick', 'unlock', {
            context: this
          }));
        }
      }
      if (this.stage === MAIN_STAGE) {
        if (this.mainTable.isFinish) {
          if (this.isJaggies(this.mainResults) || this.mainTable["try"] > 1) {
            this.stage = BLUE_STAGE;
            this.setStage();
          } else {
            this.mainResults = [0, 0, 0, 0];
            this.mainTable.startAgain();
          }
        }
      }
      if (this.stage === BLUE_STAGE) {
        if (this.blueTable.isFinish) {
          if (this.isJaggies(this.blueResults) || this.blueTable["try"] > 1) {
            this.stage = GREEN_STAGE;
            this.setStage();
          } else {
            this.blueResults = [0, 0, 0, 0];
            this.blueTable.startAgain();
          }
        }
      }
      if (this.stage === GREEN_STAGE) {
        if (this.greenTable.isFinish) {
          if (this.isJaggies(this.greenResults) || this.greenTable["try"] > 1) {
            this.stage = RED_STAGE;
            this.setStage();
          } else {
            this.greenResults = [0, 0, 0, 0];
            this.greenTable.startAgain();
          }
        }
      }
      if (this.stage === RED_STAGE) {
        if (this.redTable.isFinish) {
          if (this.isJaggies(this.redResults) || this.redTable["try"] > 1) {
            this.stage = YELLOW_STAGE;
            this.setStage();
          } else {
            this.redResults = [0, 0, 0, 0];
            this.redTable.startAgain();
          }
        }
      }
      if (this.stage === YELLOW_STAGE) {
        if (this.yellowTable.isFinish) {
          if (this.isJaggies(this.yellowResults) || this.yellowTable["try"] > 1) {
            this.stage = NEXT2_STAGE;
            this.setStage();
            this.lock();
            this.controlsPanelsManager.append(CENTRAL_PANEL, RT.selectColorsYouLike().bi('onClick', 'unlock', {
              context: this
            }));
          } else {
            this.yellowResults = [0, 0, 0, 0];
            this.yellowTable.startAgain();
          }
        }
      }
      if (this.stage === NEXT2_STAGE) {
        if (this.step > 4) {
          if (this.isLike) {
            this.lock();
            this.controlsPanelsManager.append(CENTRAL_PANEL, RT.selectColorsYouDontLike().bi('onClick', 'unlock', {
              context: this
            }));
            this.isLike = false;
          }
        }
        if (this.next2Table.isFinish) {
          this.makeNextResultString();
          this.stage = RESULT_STAGE;
          this.setStage();
        }
      }
      if (this.stage === RESULT_STAGE) {
        this.resultTable.showLessResult();
        return this.stratum.addFooter();
      }
    };

    TableManager.prototype.isJaggies = function(arr) {
      var sa, _ref, _ref1;
      sa = arr.slice(0).sort();
      return ((sa[0] < (_ref1 = sa[1]) && _ref1 < (_ref = sa[2])) && _ref < sa[3]);
    };

    TableManager.prototype.makeNextResultString = function() {
      var color, d, groups, head, i, j, lastChouse, lastChouse2, other, tail, v, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _len5, _m, _n, _o, _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
      lastChouse = [true, true, true, true, true, true, true, true];
      lastChouse2 = [true, true, true, true, true, true, true, true];
      _ref = this.nextResults;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        color = _ref[i];
        if (this.nextResults[i] != null) {
          lastChouse[this.nextResults[i]] = false;
        }
        if (this.next2Results[i] != null) {
          lastChouse2[this.next2Results[i]] = false;
        }
      }
      for (i = _j = 0, _len1 = lastChouse.length; _j < _len1; i = ++_j) {
        v = lastChouse[i];
        if (v) {
          _ref1 = this.nextResults;
          for (j = _k = 0, _len2 = _ref1.length; _k < _len2; j = ++_k) {
            color = _ref1[j];
            if (color == null) {
              this.nextResults[j] = i;
            }
          }
        }
      }
      for (i = _l = 0, _len3 = lastChouse2.length; _l < _len3; i = ++_l) {
        v = lastChouse2[i];
        if (v) {
          _ref2 = this.next2Results;
          for (j = _m = 0, _len4 = _ref2.length; _m < _len4; j = ++_m) {
            color = _ref2[j];
            if (color == null) {
              this.next2Results[j] = i;
            }
          }
        }
      }
      groups = [];
      _ref3 = this.nextResults;
      for (i = _n = 0, _len5 = _ref3.length; _n < _len5; i = ++_n) {
        color = _ref3[i];
        if (i > 0) {
          groups.push("" + this.nextResults[i - 1] + "," + this.nextResults[i]);
          groups.push("" + this.nextResults[i] + "," + this.nextResults[i - 1]);
        }
      }
      head = [];
      d = 0;
      if (groups.indexOf("" + this.next2Results[0] + "," + this.next2Results[1]) !== -1) {
        head.push("+" + this.next2Results[0]);
        head.push("+" + this.next2Results[1]);
        if (groups.indexOf("" + this.next2Results[1] + "," + this.next2Results[2]) !== -1) {
          head.push("x" + this.next2Results[1]);
          head.push("x" + this.next2Results[2]);
          d += 1;
        } else if (groups.indexOf("" + this.next2Results[2] + "," + this.next2Results[3]) !== -1) {
          head.push("x" + this.next2Results[2]);
          head.push("x" + this.next2Results[3]);
        } else {
          head.push("x" + this.next2Results[2]);
        }
      } else {
        head.push("+" + this.next2Results[0]);
        if (groups.indexOf("" + this.next2Results[1] + "," + this.next2Results[2]) !== -1) {
          head.push("x" + this.next2Results[1]);
          head.push("x" + this.next2Results[2]);
        } else {
          head.push("x" + this.next2Results[1]);
        }
      }
      tail = [];
      if (groups.indexOf("" + this.next2Results[6] + "," + this.next2Results[7]) !== -1) {
        tail.push("-" + this.next2Results[6]);
        tail.push("-" + this.next2Results[7]);
      } else {
        tail.push("-" + this.next2Results[7]);
      }
      other = [];
      for (i = _o = _ref4 = head.length - d, _ref5 = 7 - tail.length; _ref4 <= _ref5 ? _o <= _ref5 : _o >= _ref5; i = _ref4 <= _ref5 ? ++_o : --_o) {
        other.push("=" + this.next2Results[i]);
      }
      this.nextResultRow = "+" + this.nextResults[0] + "+" + this.nextResults[1] + "x" + this.nextResults[2] + "x" + this.nextResults[3] + "=" + this.nextResults[4] + "=" + this.nextResults[5] + "-" + this.nextResults[6] + "-" + this.nextResults[7];
      return this.next2ResultRow = "" + (head.join('')) + (other.join('')) + (tail.join(''));
    };

    return TableManager;

  })(RT.BaseManager);

  GrayTableWidget = (function(_super) {
    var NUM_ATTR;

    __extends(GrayTableWidget, _super);

    function GrayTableWidget() {
      return GrayTableWidget.__super__.constructor.apply(this, arguments);
    }

    NUM_ATTR = 'number';

    GrayTableWidget.prototype.isMain = true;

    GrayTableWidget.register('grayTable');

    GrayTableWidget.prototype.step = 0;

    GrayTableWidget.prototype.maxStep = 2;

    GrayTableWidget.prototype.isFinish = false;

    GrayTableWidget.prototype.isLock = false;

    GrayTableWidget.prototype.createDom = function(self) {
      return this.div({
        "class": 'grayTable'
      }, function() {
        this.div({
          "class": 'gray card'
        }).satr(NUM_ATTR, 0).bi('click', 'onSelect', {
          context: self
        });
        this.div({
          "class": 'darkGray card'
        }).satr(NUM_ATTR, 1).bi('click', 'onSelect', {
          context: self
        });
        this.div({
          "class": 'black card'
        }).satr(NUM_ATTR, 2).bi('click', 'onSelect', {
          context: self
        });
        this.div({
          "class": 'lightGray card'
        }).satr(NUM_ATTR, 3).bi('click', 'onSelect', {
          context: self
        });
        return this.div({
          "class": 'white card'
        }).satr(NUM_ATTR, 4).bi('click', 'onSelect', {
          context: self
        });
      });
    };

    GrayTableWidget.prototype.onSelect = function(el, e) {
      if (this.isLock) {
        return;
      }
      this.step += 1;
      if (this.step > this.maxStep) {
        this.isFinish = true;
      }
      el.addCls('selected');
      return this.fire('onSelect', el.intAtr('number'));
    };

    return GrayTableWidget;

  })(RedTeaWidget);

  NextTableWidget = (function(_super) {
    var NUM_ATTR;

    __extends(NextTableWidget, _super);

    function NextTableWidget() {
      return NextTableWidget.__super__.constructor.apply(this, arguments);
    }

    NUM_ATTR = 'number';

    NextTableWidget.prototype.isMain = true;

    NextTableWidget.register('nextTable');

    NextTableWidget.prototype.step = 0;

    NextTableWidget.prototype.maxStep = 6;

    NextTableWidget.prototype.isFinish = false;

    NextTableWidget.prototype.createDom = function(self) {
      return this.div({
        "class": 'nextTable'
      }, function() {
        this.div({
          "class": 'gray card'
        }).satr(NUM_ATTR, 0).bi('click', 'onSelect', {
          context: self
        });
        this.div({
          "class": 'darkBlue card'
        }).satr(NUM_ATTR, 1).bi('click', 'onSelect', {
          context: self
        });
        this.div({
          "class": 'blueGreen card'
        }).satr(NUM_ATTR, 2).bi('click', 'onSelect', {
          context: self
        });
        this.div({
          "class": 'redYellow card'
        }).satr(NUM_ATTR, 3).bi('click', 'onSelect', {
          context: self
        });
        this.div({
          "class": 'yellow card'
        }).satr(NUM_ATTR, 4).bi('click', 'onSelect', {
          context: self
        });
        this.div({
          "class": 'purple card'
        }).satr(NUM_ATTR, 5).bi('click', 'onSelect', {
          context: self
        });
        this.div({
          "class": 'brown card'
        }).satr(NUM_ATTR, 6).bi('click', 'onSelect', {
          context: self
        });
        return this.div({
          "class": 'black card'
        }).satr(NUM_ATTR, 7).bi('click', 'onSelect', {
          context: self
        });
      });
    };

    return NextTableWidget;

  })(GrayTableWidget);

  NextTableWidget = (function(_super) {
    __extends(NextTableWidget, _super);

    function NextTableWidget() {
      return NextTableWidget.__super__.constructor.apply(this, arguments);
    }

    NextTableWidget.register('next2Table');

    NextTableWidget.prototype.createDom = function(self) {
      NextTableWidget.__super__.createDom.apply(this, arguments);
      return this.dom.className = 'next2Table';
    };

    return NextTableWidget;

  })(NextTableWidget);

  MainTableWidget = (function(_super) {
    var NUM_ATTR;

    __extends(MainTableWidget, _super);

    function MainTableWidget() {
      return MainTableWidget.__super__.constructor.apply(this, arguments);
    }

    NUM_ATTR = 'number';

    MainTableWidget.prototype.isMain = true;

    MainTableWidget.register('mainTable');

    MainTableWidget.prototype["try"] = 0;

    MainTableWidget.prototype.step = 0;

    MainTableWidget.prototype.maxStep = 5;

    MainTableWidget.prototype.isFinish = false;

    MainTableWidget.prototype.isLock = false;

    MainTableWidget.prototype.colors = ['darkBlue', 'blueGreen', 'redYellow', 'yellow'];

    MainTableWidget.prototype.init = function() {
      var color1, color2, wasCompare, _i, _j, _len, _len1, _ref, _ref1;
      this.pairs = [];
      this.reversedPairs = [];
      wasCompare = [];
      _ref = this.colors;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        color1 = _ref[_i];
        _ref1 = this.colors;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          color2 = _ref1[_j];
          if (color1 !== color2 && wasCompare.indexOf("" + color1 + "_" + color2) === -1) {
            wasCompare.push("" + color1 + "_" + color2);
            wasCompare.push("" + color2 + "_" + color1);
            if (this.pairs.length % 2 === 0) {
              this.pairs.push([color1, color2]);
              this.reversedPairs.push([color2, color1]);
            } else {
              this.pairs.push([color2, color1]);
              this.reversedPairs.push([color1, color2]);
            }
          }
        }
      }
      return this.setPair();
    };

    MainTableWidget.prototype.createDom = function(self) {
      return this.div({
        "class": 'pairTable'
      });
    };

    MainTableWidget.prototype.setPair = function() {
      var pair;
      if (this.pairs.length > 0) {
        pair = this.pairs.shift();
      } else {
        pair = this.reversedPairs.shift();
      }
      if (pair != null) {
        return this.dom.add(function() {
          this.div({
            "class": "" + pair[0] + " left card"
          }).satr(NUM_ATTR, this.mainWidget.colors.indexOf(pair[0])).bi('click', 'onSelect', {
            context: this.mainWidget
          });
          return this.div({
            "class": "" + pair[1] + " right card"
          }).satr(NUM_ATTR, this.mainWidget.colors.indexOf(pair[1])).bi('click', 'onSelect', {
            context: this.mainWidget
          });
        });
      }
    };

    MainTableWidget.prototype.startAgain = function() {
      this.step = 0;
      return this.isFinish = false;
    };

    MainTableWidget.prototype.onSelect = function(el, e) {
      if (this.isLock) {
        return;
      }
      this.step += 1;
      if (this.step > this.maxStep) {
        this.isFinish = true;
        this["try"] += 1;
      }
      el.addCls('selected');
      this.fire('onSelect', el.intAtr('number'));
      this.dom.remChilds();
      return this.setPair();
    };

    return MainTableWidget;

  })(RedTeaWidget);

  BlueTableWidget = (function(_super) {
    __extends(BlueTableWidget, _super);

    function BlueTableWidget() {
      return BlueTableWidget.__super__.constructor.apply(this, arguments);
    }

    BlueTableWidget.register('blueTable');

    BlueTableWidget.prototype.createDom = function(self) {
      return this.div({
        "class": 'pairTable'
      });
    };

    BlueTableWidget.prototype.colors = ['darkBlue', 'greenBlue', 'violet', 'lightBlue'];

    return BlueTableWidget;

  })(MainTableWidget);

  GreenTableWidget = (function(_super) {
    __extends(GreenTableWidget, _super);

    function GreenTableWidget() {
      return GreenTableWidget.__super__.constructor.apply(this, arguments);
    }

    GreenTableWidget.register('greenTable');

    GreenTableWidget.prototype.createDom = function(self) {
      return this.div({
        "class": 'pairTable'
      });
    };

    GreenTableWidget.prototype.colors = ['greenBrown', 'blueGreen', 'green', 'greenYellow'];

    return GreenTableWidget;

  })(MainTableWidget);

  RedTableWidget = (function(_super) {
    __extends(RedTableWidget, _super);

    function RedTableWidget() {
      return RedTableWidget.__super__.constructor.apply(this, arguments);
    }

    RedTableWidget.register('redTable');

    RedTableWidget.prototype.createDom = function(self) {
      return this.div({
        "class": 'pairTable'
      });
    };

    RedTableWidget.prototype.colors = ['brown', 'brownRed', 'redYellow', 'orange'];

    return RedTableWidget;

  })(MainTableWidget);

  YellowTableWidget = (function(_super) {
    __extends(YellowTableWidget, _super);

    function YellowTableWidget() {
      return YellowTableWidget.__super__.constructor.apply(this, arguments);
    }

    YellowTableWidget.register('yellowTable');

    YellowTableWidget.prototype.createDom = function(self) {
      return this.div({
        "class": 'pairTable'
      });
    };

    YellowTableWidget.prototype.colors = ['lightBrown', 'greenYellow', 'orange', 'yellow'];

    return YellowTableWidget;

  })(MainTableWidget);

  ResultTableWidget = (function(_super) {
    __extends(ResultTableWidget, _super);

    function ResultTableWidget() {
      return ResultTableWidget.__super__.constructor.apply(this, arguments);
    }

    ResultTableWidget.prototype.isMain = true;

    ResultTableWidget.register('resultTable');

    ResultTableWidget.prototype.grayResultText = {
      '0,1,2': "Тенденция к стабилизации - зависимость от чувств - самоутверждение. Добивается надежных упорядоченных связей, которые гарантировали бы длительное удовлетворение потребностей и не допускали бы причинение ему ущерба.",
      '0,1,3': "Тенденция к стабилизации - зависимость от чувств - перераздражение. Не в состоянии больше выносить несправедливые требования. Стремится к спокойным упорядоченным связям, дающим чувство удовлетворенности и опирающимся на эмоциональную близость.",
      '0,1,4': "Тенденция к стабилизации - зависимость от чувств - концентрация. Стремится жить в спокойных и упорядоченных условиях и благодаря прочным связям, чувствовать себя уверенным, находящимся в ситуации, удовлетворяющей его.",
      '0,2,1': "Тенденция к стабилизации - принуждение - недоверие. Предъявляет к определенной связи повышенные требования и не верит, что она перерастет в духовное единство. Старается держать внутреннее напряжение под кон­тролем, чтобы не вызвать открытый конфликт, сохранять нормальные отношения и внешнее спокойствие.",
      '0,2,3': "Тенденция у стабилизации - принуждение - перераздражение. Желает оградить себя от невыносимых требований партнера и пытается во что бы то ни стало поддержать внешнее спокойствие и порядок. ",
      '0,2,4': "Тенденция к стабилизации - принуждение - концентрация. Последовательно и с определенной тактикой преследует поставленную цель. Твердо намерен поддерживать упорядоченные, стабильные отношения, чтобы обеспечить реализацию собственных требований.",
      '0,3,1': "Тенденция к стабилизации - возбудимость — недоверие. Не доверяет связи с партнером, не уверен, что она будет длительной и удовлетворяющей его. Поэтому стремится сдерживать возбуждение и подавлять потребность в кон­тактах для того, чтобы добиться упорядочения отношений.",
      '0,3,2': "Тенденция к стабилизации - возбудимость - самоутверждение. Жаждет интересных контактов и хотел бы пользоваться любыми возможностями, которые предлагает жизнь. Однако остерегается необдуманного риска и стремится к упорядоченному образу жизни.",
      '0,3,4': "Тенденция к стабилизации - возбудимость - концентрация. Стремится к тому, чтобы его связи были прочными, длительными и упорядоченными. Желает, чтобы его отношения с другими были жизнерадостными. Не выходит за рамки принятых норм, чтобы случайно не нарушить постоянство и прочность этих отношений.",
      '0,4,1': "Тенденция к стабилизации - позыв - недоверие. Охотнее всего убежал бы прочь. Считает, что при создавшихся условиях поддерживать добрые, основанные на доверии отношения невозможно. Однако пытается, по меньшей мере внешне, сохранять порядок и временно смириться с обстоятельствами, чтобы предотвратить разрыв отношений и полностью не лишиться душевного равно­весия.",
      '0,4,2': "Тенденция к стабилизации - позыв - самоутверждение. Стремится выйти из стесняющей его ситуации, однако вынужден из осторожности сдерживать себя, заботиться об упорядочении отношений и, насколько это возможно, временно смириться с обстоятельствами.",
      '0,4,3': "Тенденция к стабилизации - позыв - перераздражение. Не желает больше мириться с невыносимыми обстоятельствами и охотнее всего убежал бы прочь. Однако пытается сохранить внешний порядок и избегает открытых конфликтов, чтобы не потерять уверенность и душевное равновесие.",
      '1,0,2': "Регрессия - потребность в удовлетворении - самоутверждение. Стремится к приятному чувству защищенности так сильно, что потребность в установлении сердечной связи становится доминантой. От этой связи он ждет исполнения своих желаний и чувства удовлетворенности.",
      '1,0,3': "Регрессия - потребность в удовлетворении - перераздражение. Чрезмерно раздражен невыносимыми обстоятельствами и нуждается в основанной на доверии связи, которая гарантировала бы постоянное чувство защищенности.",
      '1,0,4': "Регрессия - потребность в удовлетворении - концентрация. Стремится к полной взаимопонимания и эмоциональной близости сердечной связи, благодаря которой надеется почувствовать успокоение, удовлетворенность и защи­щенность.",
      '1,2,0': "Регрессия - принуждение - жажда перемен. Опасается быть обойденным. Поэтому с нетерпением требует, чтобы его потребности удовлетворялись незамедлительно и так же незамедлительно выполнялись его притязания.",
      '1,2,3': "Регрессия - принуждение - чрезмерное раздражение. Раздражен невыносимыми отношениями и несправедливыми требованиями. Требует или непременного удовлетворения своих требований или надежных гарантий этого. Пытается, удовлетворяя физические потребности, отключиться от мучительных об­стоятельств и найти успокоение.",
      '1,2,4': "Регрессия - принуждение - концентрация. Нуждается в отношениях, достойных доверия, в надежном партнере. Чтобы получить доказательство наличия тесной внутренней связи партнера с ним и его привязаннос­ти к нему, настойчиво добивается эмоционального и физического единения с этим партнером.",
      '1,3,0': "Регрессия - возбудимость - жажда перемен. Не удовлетворен ситуацией, в которой находится. Нетерпеливо стремится к защи­щенности и чувственной общности, ожидая, что это принесет душевное и физическое удовлетворение.",
      '1,3,2': "Регрессия - возбудимость - самоутверждение, Хочет обрести  чувство, что он в безопасности, и стремится к такой чувственной общности, которая дала бы ощущение душевной и физической удовлетворенности.",
      '1,3,4': "Регрессия - возбудимость - концентрация. Испытывает жизненную потребность полностью отдаться чувствам и в наполненном любовью покровительстве и общности найти душевную и физическую удовлетворен­ность.",
      '1,4,0': "Регрессия - позыв - жажда перемен. Воспринимает ситуацию как неудовлетворительную и парализующую. Хотел бы избавится от неё и нетерпеливо настаивает на её изменении. Компенсирует отсутствие духовной общности с кем-либо требованием неограниченного удовлетворения неис­полненных ранее потребностей и возможности успокоиться.",
      '1,4,2': "Регрессия - позыв - самоутверждение. Стремится к неограниченному удовлетворению как физических, так и духовных потребностей, чтобы обрести ощущение покоя и безопасности.",
      '1,4,3': "Регрессия - позыв - чрезмерное раздражение. Из-за невыносимых забот чувствует себя слишком раздраженным и изнуренным. Желает, чтобы его оставили в покое. Ему необходимы внимание со стороны других и отношения, которые удовлетворяли бы его и гарантировали безопасность и защищен­ность.",
      '2,0,1': "Оппозиционность - потребность в удовлетворении - недоверие. Сопротивляется, находясь в длительной и упорной оппозиции. Отвергает сердечную привязанность, замкнут. Ведет себя своенравно.",
      '2,0,3': "Оппозиционность - потребность в удовлетворении - чрезмерное раздражение. Недоступен. Раздражен и испытывает отвращение к обстоятельствам, затрудняющим его деятельность. Не идет ни на какие уступки.",
      '2,0,4': "Оппозиционность - потребность в удовлетворении - концентрация. Отвергает неприятные ему обстоятельства и не желает идти ни на какие уступки.",
      '2,1,0': "Оппозиционность - зависимость от чувств - жажда перемен. С отвращением относясь к затруднениям в жизнедеятельности, стремится вырваться из неудовлетворяющей его ситуации, так как затруднения исключают полную удов­летворенность и абсолютную безопасность.",
      '2,1,3': "Оппозиционность - зависимость от чувств - чрезмерное раздражение. Воспринимая обстоятельства как невыносимые и испытывая к ним отвращение, вос­стает против них.",
      '2,1,4': "Оппозиционность - зависимость от чувств - концентрация. Считается только со своим мнением и упрямо отвергает все, что мешает осуществле­нию собственных намерений.",
      '2,3,0': "Оппозиционность - возбудимость - жажда перемен. Стремится вырваться из неприятной ситуации, так как обстоятельства мешают ему в осуществлении собственных намерений, а это, в свою очередь, вызывает мучитель­ное беспокойство.",
      '2,3,1': "Оппозиционность - возбудимость - недоверие. Противится возможности установления глубокой сердечной привязанности, раздраженно и с нетерпением отвергает ее.",
      '2,3,4': "Оппозиционность - возбудимость - концентрация. Если возникают обстоятельства, препятствующие осуществлению намеченной им цели, они вызывают у него отвращение. Легко возбуждаясь, выходит из себя.",
      '2,4,0': "Оппозиционность - позыв - жажда перемен. Не может больше выносить ситуацию, которую воспринимает как парализующую его. Хочет во что бы то ни стало устранить неприятные обстоятельства и добиться ради­кального изменения. ",
      '2,4,1': "Оппозиционность - позыв - недоверие. Испытывает отвращение от определенной чувственной связи. Из-за тенденции к не­доверию и оппозиционности противится установлению сердечных отношений вообще. Настаивает на своих бескомпромиссных решениях и ищет выход в независи­мости.",
      '2,4,3': "Оппозиционность - позыв - чрезмерное раздражение, Требования, предъявляемые ему партнером, считает невыносимыми, шокирован ими и поэтому отклоняет эту связь. Считается только со своим мнением и борется с каж­дым, кто не соглашается с его притязаниями на превосходство.",
      '3,0,1': "Готовность к переживаниям - потребность в удовлетворении - недоверие. Готов прямо вступать с людьми в контакт и принимать участие в совместных ме­роприятиях. Однако, пока нет уверенности, что ему ничто не угрожает, не спешит связывать себя какими бы то ни было обязательствами и не идет на интимную связь.",
      '3,0,2': "Готовность к переживаниям - потребность в удовлетворении - самоутверждение. Смело вступает в контакт с другими людьми, не считая необходимым ограничивать себя предписаниями, не согласованными с его убеждениями. Надеется, что новые встречи обогатят его, дадут возможность узнать много интересного. Вследствие это­го готов к соучастию и сопереживанию.",
      '3,0,4': "Готовность к переживаниям - потребность в удовлетворении - концентрация... Ожидает, что новые встречи обогатят его, дадут возможность узнать много интерес­ного. Поэтому охотно вступает в контакт с другими людьми и стремится завязать устойчивые и полезные связи.",
      '3,1,0': "Готовность к переживаниям  - зависимость от чувств-жажда перемен. Стремится положить конец неопределенности и ожиданиям, не приносящим удовлет­ворения. Хотел бы установить сердечные отношения, которые принесли бы удовлет­ворение и обогатили его внутренний мир.",
      '3,1,2': "Готовность к переживаниям - зависимость от чувств - самоутверждение. Не позволяя ущемлять себя или мешать осуществлению своих намерений, смело вступает в контакт с другими людьми. Хотел бы построить свои отношения таким образом, чтобы они были сердечными, интересными и давали духовное удовлетворе­ние.",
      '3,1,4': "Готовность к переживаниям - зависимость от чувств - концентрация. Раскрывает перед партнером свои чувства и хочет построить отношения с ним таким образом, чтобы они превратились в длительную сердечную связь, приносящую взаим­ное внутреннее обогащение.",
      '3,2,0': "Готовность к переживаниям - вынужденность - жажда перемен. Повседневное и посредственное вызывает скуку. Ищет встреч и жаждет событий, ко­торые могли бы его захватить, вызвать у него необычайную активность.",
      '3,2,1': "Готовность к переживаниям - вынужденность - недоверие. Не допускает сближения с неинтересным и не соответствующим определенным требо­ваниям партнером. Ищет встреч и переживаний, которые могли бы его захватить, вызвать у него необычайную активность.",
      '3,2,4': "Готовность к переживаниям - вынужденность - концентрация, Открыт и готов к установлению контактов. Преследует свои цели с непоколебимым упорством.",
      '3,4,0': "Готовность к переживаниям - позыв - жажда перемен. Стремится покончить с ситуацией, в которой находится, так как считает ее невыноси­мой и парализующей. Ищет новые контакты, необременяющие встречи, готов участ­вовать в интересных событиях.",
      '3,4,1': "Готовность к переживаниям - позыв - недоверие. Отклоняет не приносящую духовное удовлетворение связь. Жаждет интересных не­обременяющих встреч.",
      '3,4,2': "Готовность к переживаниям - позыв - самоутверждение. Опасаясь быть ущемленным, встретить сопротивление, оказаться в невыгодном положении, стремится, если только нет препятствий, использовать все появляющиеся в его жизни возможности.",
      '4,0,1': "Понуждение - потребность в удовлетворении - недоверие. Отвергает сердечную связь, в которой разочаровался. Хотел бы забыть ее, чтобы вновь обрести внутреннее равновесие.",
      '4,0,2': "Понуждение - потребность в удовлетворении - самоутверждение. Чувствует себя ущемленным, обойденным, поставленным в невыгодное положение. Хотел бы избавиться от этой обременяющей ситуации и найти такие жизненные усло­вия, которые соответствовали бы его требованиям.",
      '4,0,3': "Понуждение - потребность в удовлетворении - перераздражение. Перегружен обстоятельствами, которые не в состоянии вынести. Старается избежать их, чтобы освободиться от их давления и вновь обрести внутреннее равновесие.",
      '4,1,0': "Понуждение - зависимость от чувств - жажда перемен. Воспринимая ситуацию, в которой находится, как парализующую и обременяющую, жаждет от нее избавиться и установить отношения, которые принесли бы духовное удовлетворение.",
      '4,1,2': "Понуждение-зависимость от чувств - самоутверждение. Больше не в состоянии выносить лишения и обиды имеющейся связи, хотел бы осво­бодиться от ее бремени и найти настоящее духовное единство и удовлетворение.",
      '4,1,3': "Понуждение - зависимость от чувств - перераздражение. Больше не в состоянии выносить требования связи и пытается уклониться от нее. Хотел бы даже покончить со сложившейся ситуацией и найти настоящее духовное единство и удовлетворение.",
      '4,2,0': "Понуждение - вынужденность - жажда перемен. Стремится уйти от удручающей, воспринимаемой как парализующая, ситуации и обя­зательно найти выход, освобождающий его.",
      '4,2,1': "Понуждение - вынужденность - недоверие. Стремится непременно и не идя ни на какие уступки освободиться от бремени отно­шений, в которые попал, так как считает, что они мешают ему создать полную дове­рия сердечную связь.",
      '4,2,3': "Понуждение - вынужденность - перераздражение. Больше не в состоянии мириться с требованиями к нему в отношениях, в которых он находится, и непременно и без каких-либо уступок стремится освободиться от бреме­ни этих отношений.",
      '4,3,0': "Понуждение-возбудимость - жажда перемен. Стремится вырваться из ситуации, воспринимаемой как ущемляющая и парализующая, освободиться от всего и испытать ничем не сдерживаемое сильное возбуждение.",
      '4,3,1': "Понуждение - возбудимость - недоверие. Полон предубеждений относительно партнера. Не верит, что с ним можно установить основанные на доверии доброжелательные отношения, которые принесут ему удов­летворение. Стремится освободиться от бремени этой нежелательной связи.",
      '4,3,2': "Понуждение - возбудимость - самоутверждение. Отстаивает требование на то, что ему все позволено, и стремится освободиться от бремени имеющихся связей."
    };

    ResultTableWidget.prototype.nextResultText = {
      '+0': "Реакция отхода от контактов с окружающими в связи с блокированностью насущных потребностей. Чувство усталости, ограничение сферы общения, снижение социальной активности. Необходим покой, отдых, сочувствие и понимание.",
      '+0+1': "Потребность в покое, избегании конфликтов, установка на избегание конфликтов, сниженный фон настроения, стремление к расслаблению и отдыху. Трудности общения. Чувство непонятости и одиночества.",
      '+0+2': "Реакция отхода от контактов в связи с тем, что отношения не складываются. Необходимо разрешение конфликтной ситуации и возможность сохранить свой социальный статус и уважение окружающих. Нуждается в стабильной обстановке, в таком виде деятельности, где нужна вдумчивость, точность и аккуратность. Ситуация вызывает недоверчивость, сопротивление внешним воздействиям, стремление оградить себя от внешнего давления и при этом сохранить свою позицию и престиж. Трезвая, рассудочная оценка ситуации. Упрямство.",
      '+0+3': "Отход от активной деятельности и широкого круга контактов в связи с переутомлением и выраженными трудностями. Внутренняя напряженность и конфликт разнонаправленных тенденций. Мотивация достижения успеха и тенденция к независимой самореализации сталкивается с повышенным чувством усталости и ощущением непреодолимых трудностей. Напористость и самобытность, обычно способствующие достижению целей, блокированы временным снижением активности, что может быть связано с неблагоприятно сложившимися обстоятельствами или усталостью.",
      '+0+4': "Реакция отхода от активной деятельности и широкого круга контактов в связи с переутомлением и неблагоприятной ситуацией. Потребность в эмоциональной вовлеченности и чувстве причастности к интересам референтной группы не реализуется в полной мере, что усиливает черты эмоциональной лабильности. Необходимость повышения самоконтроля создает некоторую напряженность, ощущается как тяжкое бремя, так как приходится брать на себя большую, чем этого хотелось бы, ответственность. Не реализуется в полной мере потребность в привлечении внимания окружающих к своей персоне.",
      '+0+5': "Интровертная реакция, вызванная трудностями адаптации в социальной среде. Потребность избегания контактов широкого круга, уход в мир субъективных представлений, фантазий, мечты. Пассивно-созерцательная позиция, сензитивность, тонко нюансированная чувствительность, ирреальность притязаний и субъективизм в оценке жизненных явлений, тенденция к идеализации окружающей действительности, черты эмоциональной незрелости. Индивидуалистич-ность в сочетании с повышенной ранимостью, выраженная избирательность в контактах. Эстетическая ориентированность, своеобразие пристрастий.",
      '+0+6': "Реакция отхода от контактов, напряженность, усталость, блокированность физиологических потребностей, плохое самочувствие, утрата привычного жизненного стереотипа, мнительность, болезненная сосредоточенность на плохом самочувствии. Пассивность, сочетающаяся с беспокойством, ощущение непреодолимых трудностей, потребность в избавлении от их гнета, тревожное состояние, отсутствие возможности самореализации, сниженный фон настроения. Потребность в помощи и отдыхе.",
      '+0+7': "Сочетание усталости и пассивности с выраженным чувством внутреннего протеста против сложившихся обстоятельств (судьбы), неприятие ситуации, задевающей самолюбие и блокирующей насущные потребности личности. Потребность в освобождении от гнетущих обстоятельств, несправедливости. Наряду со сниженным фоном настроения и активности — эмоции гнева.",
      '+1': "Потребность в прочной и глубокой привязанности, эмоциональном комфорте и защите от внешних воздействий. Дружелюбие, конформность установок. Потребность в понимании, любви и поддержке является ведущей и поэтому наиболее легко травмируемой мишенью. Замкнутость, избирательность в контактах, аналитический склад ума, вдумчивый подход к решению проблем, инертность в принятии решений. Тормозимые черты, преобладание стремления к покою, уединенности, всплески активности быстро сменяются фазой пассивности.",
      '+1+0': "Потребность в прочной и глубокой привязанности, эмоциональном комфорте и защите от внешних воздействий. Дружелюбие, конформность установок. Потребность в понимании, любви и поддержке является ведущей и поэтому наиболее легко травмируемой мишенью. Замкнутость, избирательность в контактах, аналитический склад ума, вдумчивый подход к решению проблем, инертность в принятии решений. Тормозимые черты, преобладание стремления к покою, уединенности, всплески активности быстро сменяются фазой пассивности. Вышеописанные тенденции служат инструментом достижения покоя и избавления от стресса. Выраженная склонность к ограничению контактов, расслаблению, избеганию конфликтов.",
      '+1+2': "Потребность в прочной и глубокой привязанности, эмоциональном комфорте и защите от внешних воздействий. Дружелюбие, конформность установок. Потребность в понимании, любви и поддержке является ведущей и поэтому наиболее легко травмируемой мишенью. Замкнутость, избирательность в контактах, аналитический склад ума, вдумчивый подход к решению проблем, инертность в принятии решений. Тормозимые черты, преобладание стремления к покою, уединенности, всплески активности быстро сменяются фазой пассивности. Вышеописанные тенденции служат инструментом для достижения нормальных условий работы и взаимодействия с окружающими на основании вдумчивого, рассудительного, трезвого подхода при решении проблем. Потребность в оберегании от посягательств своей социальной позиции, повышенное чувство собственного достоинства, потребность как в самоуважении, так и сохранении личностного реноме в глазах значимых окружающих. Склонность к системному мышлению, тяга к точным сферам знаний. Деликатность в сфере межличностных контактов сочетается с упрямством в отстаивании своей позиции. Мотивация избегания неуспеха при достаточно ригидных (негибких) установках и упорстве в своих начинаниях. Черты повышенной аккуратности и внимания к деталям.",
      '+1+3': "Конфликтное сочетание разнонаправленных тенденций — высокой мотивации избегания неуспеха и мотивации достижения. Выраженная склонность к непосредственной самореализации сталкивается со столь же высокой тенденцией к избеганию конфликтов, повышенным контролем над своими чувствами и поведением. Уравновешивая друг друга, эти тенденции создают внешне гармоничный поведенческий рисунок, чреватый физиологическими расстройствами. Эротичность в сфере влечения к противоположному полу сочетается с эмпатийностью (умением сопереживать), что может служить основой для гармоничных отношений.",
      '+1+4': "Смешанный, эмоционально неустойчивый рисунок индивидуально-личностных свойств, выявляющий высокую подверженность внешним (средовым) воздействиям. Ранимость, чувствительность, зависимость от значимых других, повышенный самоконтроль и конформность установок сочетаются с тенденцией к легкой смене настроения и устремлений, вживаемостью в разные социальные роли. Склонность к экзальтации, потребность нравиться окружающим. Энтузиазм и стремление к сопричастности интересам референтной группы легко сменяются тенденцией уйти от излишней ответственности, участие и сопереживание более значимы, чем конкретные цели. В работе значение придается больше самому процессу, как удовлетворяющему ведущим тенденциям, чем ее окончательному результату. Большое значение придается произведенному впечатлению и дружелюбным отношениям с окружающими.",
      '+1+5': "Пассивно-созерцательная позиция, высокая чувствительность к внешним воздействиям, тонкая нюансированность чувств во взаимоотношениях с окружающими и в оценке явлений жизни. Незрелость позиции, ранимость, трудности адаптации, избегание пут жестко ограниченных рамок деятельности. Мечтательность и поэтичность натуры, сентиментальность, эстетическая ориентированность. Нешаблонность мышления, стремление к своеобразным видам занятий и увлечений. Минорный фон настроения.",
      '+1+6': "Пассивность позиции, черты зависимости, тревожность, неуверенность в себе, мнительность и боязливость, опасения за свое здоровье. Чувство непонятости, недостаток эмоционального тепла со стороны окружающих. Выраженная зависимость от объекта привязанности, потребность в защите и помощи.",
      '+1+7': "Реакция пассивно-протестная (смешанный тип реагирования, характерный для лиц со склонностью к развитию физических недомоганий в ситуации эмоциональной напряженности), выраженная неустойчивость состояния, несбалансированность эмоционально-вегетативного тонуса. Неудовлетворенность и протест против сложившихся обстоятельств, сниженный фон настроения, сочетающийся с протестными реакциями. Потребность в разрешении невыносимой ситуации — и ощущение ее неразрешимости. Осознанный контроль над иррациональными (не поддающимися пониманию) поведенческими реакциями. Столкновение конфликтных мотивов, приводящее к эмоциональной напряженности, которая, не имея возможности быть отреагированной вовне, проявляется психосоматическими расстройствами.",
      '+2': "Скептический настрой в отношении мнения других лиц, потребность в отстаивании собственных установок, упорство, противодействие обстоятельствам, которое носит защитный характер. Практичность и трезвость суждений, рационализм, тенденция к системному подходу при решении проблем. Опора на накопленный опыт. Ориентировка на собственное мнение, сопротивление внешне-средовым воздействиям. Зрелость жизненной платформы. Чувство соперничества. Значимость собственной социальной позиции. Тропизм к конкретным видам деятельности, сфере точных знаний и положению лидера в социальном окружении.",
      '+2+0': "Скептичность и недоверчивость, потребность в отстаивании собственных установок, упорство, противодействие обстоятельствам, которое носит защитный характер. Практичность и трезвость суждений, рационализм, тенденция к системному подходу при решении проблем. Опора на накопленный опыт. Ориентировка на собственное мнение, сопротивление внешне-средовым воздействиям. Зрелость жизненной платформы. Чувство соперничества. Значимость собственной социальной позиции. Тропизм к конкретным видам деятельности, сфере точных знаний и положению лидера в социальном окружении. Вышеописанные тенденции сталкиваются с чувством изолированности, наличия трудностей, мешающих реализации ведущей потребности. Трудности общения, проблема межличностного конфликта.",
      '+2+1': "Скептичность, потребность в отстаивании собственных установок, упорство, противодействие обстоятельствам, которое носит защитный характер. Практичность и трезвость суждений, рационализм, тенденция к системному подходу при решении проблем. Опора на накопленный опыт. Ориентировка на собственное мнение, сопротивление внешне-средовым воздействиям. Зрелость жизненной платформы.",
      '+2+2': "Чувство соперничества. Значимость собственной социальной позиции. Тропизм к конкретным видам деятельности, сфере точных знаний и положению лидера в социальном окружении. Эти особенности смягчаются установкой на избегание конфликта и контролируемостью. Повышенная ранимость в отношении критических замечаний со стороны окружающих, уязвимое самолюбие, значимость социального престижа. Потребность в самоуважении и уважении со стороны окружающих. Вдумчивость, аккуратность, серьезное отношение к обязанностям, интерес к точным наукам и работе, требующей конкретных знаний, тонкого ручного выполнения, подсчета. Интерес к технике, экономике, математике или физике.",
      '+2+3': "Амбициозность и защитно-оборонительные тенденции, высокая поисковая активность, упорство в достижении цели, выраженная тенденция к доминированию, противодействие давлению внешних факторов, самостоятельность принятия решений, предприимчивость, инициативность. Эти характеристики усилены уверенностью в себе, наступательностью тактики взаимодействия в межличностных контактах, еще более выраженными чертами независимости. Стеничность (волевая активность), стрессоустойчивость, противодействие обстоятельствам, препятствующим свободной самореализации личности, развитое чувство соперничества, увлеченность и стремление к преодолению стоящих на пути к реализации своих намерений препятствий.",
      '+2+4': "Амбициозно-защитные тенденции, потребность в отстаивании собственных установок, упорство, противодействие обстоятельствам, которое носит защитный характер. Практичность и трезвость суждений, рационализм, тенденция к системному подходу при решении проблем. Опора на накопленный опыт. Ориентировка на собственное мнение, сопротивление внешне-средовым воздействиям. Зрелость жизненной платформы. Чувство соперничества. Значимость собственной социальной позиции. Тропизм к конкретным видам деятельности, сфере точных знаний и положению лидера в социальном окружении сочетается с такими особенностями, как выраженная надежда на успех, потребность в эмоциональной вовлеченности, в переменах, в общении. Оптимистичность, легкое вживание в разные социальные роли, демонстративность, потребность нравиться окружающим, зависимость от средовых воздействий, поиски признания и стремления к сопричастности в межличностном взаимодействии. В выборе вида деятельности наибольшее значение придается тому, чтобы сам процесс деятельности приносил удовольствие. Любые формальные рамки тесны и плохо переносятся. Непосредственность чувств, пристрастие к забавам, игровому компоненту в деятельности. Противоречивое сочетание повышенного чувства собственного достоинства и болезненного самолюбия с подвластностью средовым влияниям, ориентировкой на мнение значимых других и референтной группы. Стремление укрепить самооценку через престижность позиции и популярность среди окружения.",
      '+2+5': "Защитные внешнеобвиняющие тенденции при затрудненной адаптации в межличностных отношениях. Наряду с трезвостью в оценках и рационализмом проявляются элементы субъективизма, сверхчувствительности к критическим замечаниям, недоверчивость, ощущение опасности в связи с недоброжелательностью некоторых людей. Мышление синтетическое, изобретательное, с художественными наклонностями и восприимчивостью к эстетике. Стремление привлечь к себе внимание, завоевать симпатии окружающих и признание своей оригинальности. Тенденция придавать особую значимость своим суждениям и высказываниям других людей. Настороженность. Обидчивость. Тенденция к построению субъективной иррациональной схемы враждебных межличностных отношений.",
      '+2+6': "Реакция на сложившуюся ситуацию внешнеобвиняющая, обидчивая. Упорство в отстаивании своих позиций неустойчиво, наталкивается на трудности в межличностных контактах, что вызывает повышенную раздражительность, тревожную неуверенность, усталость и ухудшение самочувствия; характеристики стеничности направлены на преодоление чувства дискомфорта и неуверенности, смягчены некоторой конформностью установок. Ощущение известной приниженности своего социального престижа.",
      '+2+7': "Реакция на сложившуюся ситуацию агрессивная, внешнеобвиняющая. Гиперстенические (сверхактивные) тенденции с выраженным чувством протеста. Ригидность установок в отстаивании своих позиций, ущемленность чувства собственного достоинства, под угрозой престижность позиции, что вызывает нарастание эмоций гнева; характеристики стеничности (активности) резко усилены противодействием среды, неблагоприятными обстоятельствами, бороться с которыми трудно в силу субъективно переживаемого чувства их неотвратимости.",
      '+3': "Активность и наступательность, высокая мотивация достижения, потребность в обладании жизненными благами, стремление к доминированию, нормальная эротичность, непосредственность и рас^ крепощенность поведения, высокая самооценка, потребность в самореализации, противодействие обстоятельствам, препятствующим свободной самореализации личности, черты стеничности (активности) и мужественности, склонность к риску.",
      '+3+0': "Противоречивость тенденций, активность компенсирует невозможность полной реализации насущных потребностей. Высокая мотивация достижения, потребность в обладании жизненными благами, стремление к доминированию, нормальная эротичность, целенаправленность действий, непосредственность и раскрепощенность поведения, высокая самооценка, потребность в самореализации, противодействие обстоятельствам, препятствующим свободной самореализации личности, черты стеничности и мужественности, склонность к риску. Характеристики воли направлены на преодоление конфликта с окружением. Трудности самореализации усиливают непосредственность поведенческих реакций, но это не приносит чувства удовлетворения, увеличивает дистанцию в отношениях с окружающими и усугубляет остроту конфликта.",
      '+3+1': "Смешанный тип реагирования, в котором конфликтно сочетаются разнонаправленные тенденции. Такие характеристики, как активность позиции, высокая мотивация достижения, потребность в обладании жизненными благами, стремление к доминированию, нормальная эротичность, целенаправленность действий, непосредственность и раскрепощенность поведения, высокая самооценка, потребность в самореализации, противодействие обстоятельствам, препятствующим свободной самореализации личности, черты стеничности и мужественности, склонность к риску используются как инструмент достижения гармоничных и доброжелательных отношений с окружающими, особенно в дружеских и интимно-эротических контактах. Внешне уравновешенное поведение дается ценой известного напряжения с тенденцией к раскачиванию вегетативного баланса и физическим недомоганиям, мишенью которых является сердце.",
      '+3+2': "Активность, высокая мотивация достижения, потребность в обладании жизненными благами, стремление к доминированию, нормальная эротичность, целенаправленность действий, непосредственность и раскрепощенность поведения, высокая самооценка, потребность в самореализации, противодействие обстоятельствам, препятствующим свободной самореализации личности, черты стеничности и мужественности, склонность к риску сочетаются с такими тенденциями, как скептичность и внешнеобвиняющие реакции, потребность в отстаивании собственных установок, упорство, противодействие обстоятельствам, которое носит защитный характер. Практичность и трезвость суждений, рационализм, тенденция к системному подходу при решении проблем. Опора на накопленный опыт. Ориентировка на собственное мнение, сопротивление внешне-средовым воздействиям. Зрелость жизненной платформы. Чувство соперничества. Значимость собственной социальной позиции. Тропизм к конкретным видам деятельности, сфере точных знаний и положению лидера в социальном окружении. Стрессоустойчивость, стремление к престижной позиции, доминированию. Склонность к вспыльчивости в конфликтных ситуациях.",
      '+3+4': "Активность, высокая мотивация достижения, потребность в обладании жизненными благами, стремление к доминированию, нормальная эротичность, целенаправленность действий, непосредственность и раскрепощенность поведения, высокая самооценка, потребность в самореализации, противодействие обстоятельствам, препятствующим свободной самореализации личности, Черты стеничности и мужественности, склонность к риску сочетаются с неустойчивостью эмоционального состояния, тенденция к самореализации — с изменчивостью установок и непоследовательностью. Яркость эмоциональных реакций, экзальтация чувств, широкий спектр увлечений, оптимистичность, выраженная общительность, поиски новых контактов и сфер интересов. Самооценка неустойчива, наряду с высоким уровнем притязаний неуверенность в себе, которая легко переходит в другую крайность в ситуации признания и успеха в глазах окружения.",
      '+3+5': "Активность самореализации, высокая мотивация достижения, потребность в обладании жизненными благами, стремление к доминированию, нормальная эротичность, целенаправленность действий, непосредственность и раскрепощенность поведения, высокая самооценка, противодействие обстоятельствам, препятствующим свободной самореализации личности, черты стеничности и мужественности, склонность к риску сочетаются с чертами эмоциональной незрелости, индивидуалистичностью, повышенным стремлением к независимой позиции, ирреальностью завышенных притязаний. Нетривиальный подход к решению проблем, оригинальность, некоторая склонность к рисовке, стремление привлечь внимание к себе и вовлечь в сферу своего обаяния тех, чье мнение значимо. При достаточно высоком интеллекте данный эмоционально-динамический рисунок представляет собой оптимальные условия для проявления творческих способностей.",
      '+3+6': "Активность, высокая мотивация достижения, потребность в обладании жизненными благами, стремление к доминированию, нормальная эротичность, целенаправленность действий, непосредственность и раскрепощенность поведения, высокая самооценка, потребность в самореализации, противодействие обстоятельствам, препятствующим свободной самореализации личности, черты стеничности и мужественности, склонность к риску — все эти тенденции сталкиваются с напряженностью физиологических потребностей, чувством общего дискомфорта, утратой привычного жизненного стереотипа. Высокая активность направлена на поиски выхода из неблагоприятной ситуации, которая оказывает фрустрирующее воздействие, препятствует реализации намерений и ущемляет личностный престиж. Дискомфорт вызывает напряженность биологических потребностей, повышенную тревожность, потребность в расслаблении, успокоении.",
      '+3+7': "Высокая мотивация достижения, потребность в обладании жизненными благами, стремление к доминированию, нормальная эротичность, целенаправленность действий, непосредственность и раскрепощенность поведения, высокая самооценка, потребность в самореализации, противодействие обстоятельствам, препятствующим свободной самореализации личности, черты стеничности (активности) и мужественности, склонность к риску. Повышенная активность связана с протестной гиперстенической реакцией, стремлением к независимости, отстаиванием своих индивидуалистических устремлений от давления авторитетов. Импульсивность поведения, пренебрежение условностями. Трудности социальной адаптации. Склонность к протестным поведенческим реакциям. Агрессивнось.",
      '+4': "Потребность в действии, эмоциональной вовлеченности, в переменах, в общении. Оптимистичность, эмоциональная неустойчивость, легкое вживание в разные социальные роли, демонстративность, потребность нравиться окружающим, зависимость от средовых воздействий, поиски признания и стремления к сопричастности в межличностном взаимодействии. Тенденция к избеганию ответственности. В выборе вида деятельности наибольшее значение придается тому, чтобы сам процесс деятельности приносил удовольствие. Любые формальные рамки тесны и плохо переносятся. Выраженная эмоциональная переключаемость без глубины переживаний и непостоянство в привязанностях. Непосредственность чувств, пристрастие к забавам, игровому компоненту в деятельности.",
      '+4+0': "Потребность в действии, эмоциональной вовлеченности, в переменах, в общении сталкивается с препятствиями, что создает чувство повышенной усталости, затруднения в контактах с окружающими. Эмоциональная неустойчивость, легкое вживание в разные социальные роли, демонстративность, потребность нравиться окружающим .— Все эти характерные черты акцентированы в связи с повышенной зависимостью от средовых воздействий, поисками признания и стремлением к сопричастности в межличностном взаимодействии. Тенденция к избеганию ответственности. В выборе вида деятельности наибольшее значение придается тому, чтобы сам процесс деятельности приносил удовольствие. Любые формальные рамки тесны и плохо переносятся. Выраженная эмоциональная переключаемость без глубины переживаний и непостоянство в привязанностях. Непосредственность чувств, пристрастие к забавам, игровому компоненту в деятельности. Все это — вопреки трудностям, отсутствию поддержки и помощи со стороны окружающих, неопределенности ситуации. Смутное ощущение тревожности, вытеснение проблем. Эмоциональная напряженность, причины которой практически не осознаются.",
      '+4+1': "Неустойчивость фона настроения, противоречивость реакций, непосредственно связанная с противодействием разнонаправленных тенденций. Потребность в действии, эмоциональной вовлеченности, в переменах, в общении. Оптимистичность, эмоциональная неустойчивость, легкое вживание в разные социальные роли, демонстративность, потребность нравиться окружающим, зависимость от средовых воздействий, поиски признания и стремления к сопричастности в межличностном взаимодействии. Тенденция к избеганию ответственности. В выборе вида деятельности наибольшее значение придается тому, чтобы сам процесс деятельности приносил удовольствие. Любые формальные рамки тесны и плохо переносятся. Выраженная эмоциональная переключаемость без глубины переживаний и непостоянство в привязанностях. Непосредственность чувств, пристрастие к забавам, игровому компоненту в деятельности сочетаются с такими свойствами? как потребность в прочной и глубокой привязанности, эмоциональном комфорте и защите от внешних воздействий. Дружелюбие, конформность установок. Потребность в понимании? любви и поддержке является ведущей и поэтому наиболее легко травмируемой мишенью. Отсюда некоторая избирательность в контактах, аналитический склад ума, менее беспечный подход к решению проблем, временами стремления к покою, уединенности, всплески активности быстро сменяются фазой пассивности — что создает почву для внутреннего конфликта, в ситуации личностно значимой ведущими являются тенденции стенического круга и проявляется повышенная эмотивность. В социально значимой ситуации эти свойства успешно контролируются. Склонность к перепадам в настроении — от приподнятого, экзальтированного до грустного. Выраженная зависимость от средовых воздействий и от ситуации успеха-неуспеха.",
      '+4+2': "Надежда на успех и выраженная эмотивность сочетаются с педантизмом. Преобладают такие характеристики как потребность в действии, эмоциональной вовлеченности, в переменах, в общении, оптимистичность, эмоциональная неустойчивость, легкое вживание в разные социальные роли, демонстративность, потребность нравиться окружающим, зависимость от средовых воздействий, поиски признания и стремления к сопричастности в межличностном взаимодействии, тенденция к избеганию ответственности, в выборе вида деятельности ориентированность на то, чтобы сам процесс деятельности приносил удовольствие. Любые формальные рамки тесны и плохо переносятся. Выраженная эмоциональная переключаемость без глубины переживаний и непостоянство в привязанностях. Непосредственность чувств, пристрастие к забавам, игровому компоненту в деятельности. Эти черты усиливаются такими тенденциями, как упрямство, практичность, потребность в отстаивании собственных установок, упорство, агрессивность, которая носит защитный характер. Трезвость суждений, рационализм, тенденция к системному подходу при решении проблем. Опора на накопленный опыт. Ориентировка на собственное мнение, сопротивление внешне-средовым воздействиям. Зрелость жизненной платформы. Чувство соперничества. Значимость собственной социальной позиции. Тропизм к конкретным видам деятельности, сфере точных знаний и положению лидера в социальном окружении. Неустойчивость и ригидность в сочетании могут взаимно уравновешивать друг друга при хорошем контроле достаточно высокого интеллекта. Широта диапазона интересов и высокая поисковая активность в содружестве с тенденцией к планомерности в принятии решений и действиях способствуют эффективной деятельности. При недостаточной личностной интеграции — повышенная конфликтность. Проблема личности, «ищущей признания».",
      '+4+3': "Такие характеристики, как потребность в действии, в эмоциональной вовлеченности, в переменах, в общении, оптимистичность и легкое вживание в разные социальные роли, демонстративность, стремление нравиться окружающим, зависимость от ередовых воздействий, поиски признания и стремления к сопричастности в межличностном взаимодействии, тенденция к избеганию ответственности, стремление придавать наибольшее значение тому, чтобы сам Процесс деятельности приносил удовольствие, трудности адаптации в условиях жесткого регламента, при выраженной эмоциональной переключаемости и непостоянстве в привязанностях, непосредственности чувств, пристрастии к забавам и игровому компоненту в деятельности усиливаются такими свойствами; как активность позиции, высокая мотивация достижения, потребность в обладании жизненными благами, стремление к доминированию, нормальная эротичность, непосредственность и раскрепощенность поведения, высокая самооценка, потребность в самореализации, противодействие обстоятельствам, препятствующим свободной самореализации личности, черты стеничности и мужественности, склонность к риску. Непоследовательность, своеволие, повышенное чувство авторитарности. Тенденция к самореализации при повышенной эмотивности, склонности разбрасываться, браться сразу за несколько дел.",
      '+4+5': "Эмоциональная неустойчивость, повышенная эмотивность. Потребность в общении* эмоциональной вовлеченности, в переменах, в признании. Оптимистичность, легкое вживание в разные социальные роли, демонстративность, потребность нравиться окружающим, зависимость от средовых воздействий, поиски признания и стремление к сопричастности в межличностном взаимодействии. Тенденция к избеганию ответственности. В выборе вида деятельности наибольшее значение придается тому, чтобы сам процесс деятельности приносил удовольствие. Любые формальные рамки тесны и плохо переносятся. Выраженная эмоциональная переключаемость без глубины переживаний и непостоянство в привязанностях. Непосредственность чувств, пристрастие к забавам, игровому компоненту в деятельности — все это усугубляется ирреальностью притязаний, чертами эмоциональной незрелости, трудностями социальной адаптации. Художественный склад мышления, элементы артистизма в поведении, потребность в сильных переживаниях, богатое воображение, повышенная ранимость, впечатлительность, мечтательность. Склонность к выбору занятий в сфере искусства и избеганию рамок режимных видов деятельности и формальностей.",
      '+4+6': "Реакция эмоциональной неустойчивости в ситуации переутомления или утраты привычного жизненного стереотипа. Потребность в общении, эмоциональной вовлеченности, в переменах усилена в связи с ситуацией, в которой ощущается общий дискомфорт и чувство приниженности. Оптимистичность, эмоциональная неустойчивость, легкое вживание в разные социальные роли, демонстративность, потребность нравиться окружающим, зависимость от средовых воздействий, поиски признания и стремления к сопричастности в межличностном взаимодействии. Тенденция к избеганию ответственности. В выборе вида деятельности наибольшее значение придается тому, чтобы сам процесс деятельности приносил удовольствие. Любые формальные рамки тесны и плохо переносятся. Выраженная эмоциональная переключаемость без глубины переживаний и непостоянство в привязанностях. Непосредственность чувств, пристрастие к забавам, игровому компоненту в деятельности. Состояние эмоциональной напряженности, физическая усталость, дискомфорт. Эмоциональная неустойчивость усугубляется недомоганием, опасениями за свое здоровье, тревожными ощущениями надвигающейся опасности. Потребность в избавлении от проблем. Вытеснение психологических причин и соматизация конфликта. Напряженность физиологических потребностей.",
      '+4+7': "В силу неприемлемых обстоятельств, вызывающих протест и негативизм, резко усилены такие свойства личности, как потребность в общении, эмоциональной вовлеченности, в переменах, поиски признания. Оптимистичность, эмоциональная неустойчивость, легкое вживание в разные социальные роли, демонстративность, потребность нравиться окружающим, зависимость от средовых воздействий, поиски признания и стремление к сопричастности в межличностном взаимодействии. Тенденция к избеганию ответственности. В выборе вида деятельности наибольшее значение придается тому, чтобы сам процесс деятельности приносил удовольствие. Любые формальные рамки тесны и плохо переносятся. Выраженная эмоциональная переключаемость без глубины переживаний и непостоянство в привязанностях. Непосредственность чувств, пристрастие к забавам, игровому компоненту в деятельности. Выраженная эмоциональная напряженность. Стремление уйти от проблем и ответственности сталкивается с серьезным препятствием, вызывающим чувство протеста. Непосредственность поступков и высказываний может быть поспешной и опережать их продуманность. Активные поиски выхода из ситуации избыточно суетливы, непоследовательны, непланомерны.",
      '+5': "Неустойчивость, трудности социальной адаптации, эмоциональность и субъективность пристрастий превалирует над рассудочностью. Нешаблонный, самобытный подход к решению проблем, оригинальность мышления, богатое воображение, недостаток практицизма, реалистичности. Индивидуалистичность, создающая трудности в попытках завязывания контактов. Ранимость, сензитивность. Трудно вырабатываются навыки общепринятых норм поведения. Тонкая нюансированность чувств, своеобразие интересов, суждений.",
      '+5+0': "Трудности социальной адаптации у личности своеобразной, избирательной в контактах, оторванной от реальности повседневной жизни. Пассивно-созерцательная позиция, иррациональный способ защиты от стресса и межличностных конфликтов. Потребность в отстаивании своего индивидуального стиля путем пассивного сопротивления с уходом в мир идеальных субъективных представлений и переживаний, в мир фантазий и мечты.",
      '+5+1': "Неустойчивость, трудности социальной адаптации, эмоциональности и субъективность пристрастий превалирует над рассудочностью.-Нр шаблонный, самобытный подход к решению проблем, оригинальности мышления, богатое воображение, недостаток практицизма, реалистичности. Индивидуалистичность, создающая трудности в попытках завязывания контактов. Ранимость, сензитивность. Трудно вырабатываются навыки общепринятых норм поведения. Тонкая нюансированность чувств, своеобразие интересов, суждений сочетается с такими особенностями, как потребность в прочной и глубокой привязанности, эмоциональном комфорте и защите от внешних воздействий. Дружелюбие, конформность установок. Потребность в понимании, любви и поддержке является ведущей и поэтому наиболее легко травмируемой мишенью. Замкнутость, избирательность в контактах, аналитический склад ума, вдумчивый подход к решению проблем, инертность в принятии решений. Тормозимые черты, преобладание стремления к покою, уединенности, всплески активности быстро сменяются фазой пассивности. Эстетическая ориентированность, уход от житейских проблем в мир искусства, поэзию, мир фантазий.",
      '+5+2': "Трудности социальной адаптации. Повышенная обидчивость. Трудности межличностных отношений, смешанный тип реагирования, сензитивность к критическим замечаниям со стороны окружающих, недоверчивость. Изобретательный склад ума, нешаблонность решений сочетается с тенденцией к систематизации, иррациональность чувств с трезвостью суждений. Подозрительность, повышенное чувство справедливости, стремление настоять на своем. Потребность в признании своего авторитета в глазах окружающих. Планомерность действий сочетается с осторожностью и чуткой реакцией на изменения в ситуации. Восприимчивость к эстетике.",
      '+5+3': "Трудности социальной адаптации в силу повышенной сензитивности и выраженной индивидуалистичности. Неустойчивость мотивационной направленности. Повышенная эмотивность, потребность в самореализации при недостаточно развитом контроле. Экзальтированность. Нешаблонный подход к решению проблем, склонность к расширению сферы интересов, увлеченность. Стремление привлечь внимание окружающих, высокий уровень притязаний, избирательность в контактах, своеобразие интересов. Адаптация затрудняется в жестко регламентированной ситуации и в контактах с людьми категоричными и нетерпимыми.",
      '+5+4': "Трудности социальной адаптации в силу повышенной чувствительности и выраженного индивидуализма. Выраженная эмоциональная неустойчивость, быстрая переключаемость внимания, легкое вживание в разные социальные роли. Артистизм, экзальтированность, иррациональность притязаний. Высокий, но неустойчивый уровень самооценки, на которую оказывает влияние мнение окружающих, отсюда повышенная потребность в признании, элементы демонстративности. Развитое воображение, богатая фантазия, художественный стиль восприятия. Черты эмоциональной незрелости. Благоприятная почва для развития творческой одаренности.",
      '+5+6': "Состояние тревожное, неустойчивое, обостренная чувствительность к средовым воздействиям, трудности адаптации, связанные с индивидуальным своеобразием и известным идеализмом. Выраженная избирательность в отношении жизненны:: ценностей, в контактах с людьми. Сужена зона жизненного комфорта: потребность в щадящих условиях, прихотливость вкуса. Повышенная мнительность, болезненная сосредоточенность на своих ощущениях, склонность к страхам.",
      '+5+7': "Протестно-негативная иррациональная реакция на ситуацию. Эмоциональная напряженность, трудности адаптации, чувство неудовлетворенности в связи с обстоятельствами, субъективно оцениваемыми как навязанные и нежелательные. Потребность в сохранении собственного стиля самореализации фрустрирована, способы решения проблем носят иррациональный характер, однако поступки и высказывания не столь агрессивны, сколь своеобразны. Ощущение диссонанса с окружением, неэтичности происходящего вокруг. Столкновение идеальных представлений с грубой реальностью.",
      '+6': "Неудовлетворенность потребности в физиологическом комфорте, повышенная тревожность, эмоциональная напряженность с тенденцией к биологизации тревоги (плохое самочувствие). Опасения, связанные с недомоганием, усталостью, перенапряжением. Потребность в отдыхе, щадящем режиме, восстановлении сил.",
      '+6+0': "Выраженная потребность в отдыхе, состояние тревоги, беспокойство, переживание конфликта, усталость, перенапряжение. Тревожные опасения за свое здоровье. Проблемы субъективно переживаются как трудно преодолимые. Страх перед будущим. Потребность в понимании и защите от стрессов, в покое и расслаблении. Повышенная чувствительность к средовым воздействиям. Стремление освободиться от избыточной и обременительной ответственности, снижение социальной активности. Страх перед надвигающейся опасностью и трудностями.",
      '+6+1': "Потребность в избавлении от усталости и конфликтов. Повышенная тревожность, страх одиночества. Потребность в помощи, понимании, теплых отношениях и поддержке. Физическое переутомление, ухудшение самочувствия. Избыточный самоконтроль, гиперсоциальность установок, ориентация на общепринятые нормы поведения как защита от конфликтов с окружающими. Зависимость от объекта аффилиативной привязанности. Зажатость, отсутствие спонтанности поступков и высказываний. Повышенные требования к себе и окружающим в вопросах морали.",
      '+6+2': "Проблема сдерживаемой раздражительности. Предрасположенность к физиологическим расстройствам. Повышенная утомляемость, перенапряжение контролирующих систем. Потребность в расслаблении и отдыхе, избавлении от напряженных отношений, переживаемых как враждебный настрой окружающих лиц, недоброжелательность с их стороны. Большие усилия затрачиваются на сдерживание собственных эмоций раздражения и обиды. Раздражает отсутствие привычного стереотипа.",
      '+6+3': "Напряженность физиологических потребностей, неудовлетворенная чувственность. Проблема сдерживания спонтанной (непосредственной) самоактуализации, собственной авторитарности во избежание нарастания конфликта и для сохранения объекта привязанности. Повышенная нервозность, неуверенность в себе. Непривычная обстановка, выбивающая из колеи.",
      '+6+4': "Состояние эмоциональной напряженности, неустойчивость фона настроения, повышенная тревожность. Стремление уйти от сложностей, избавиться от гнетущего чувства ответственности. Потребность в ограничении круга обязанностей, страх перед трудностями, опасения за свое здоровье; потребность в расслаблении и отдыхе, удобной и комфортной обстановке.",
      '+6+5': "Напряженность физиологических потребностей, неудовлетворенность, дискомфорт. Выраженная избирательность в вопросах вкуса, потребность в особых условиях, разборчивость, причудливость выбора. Трудности адаптации к новым условиям. Повышенная чувствительность к средовым воздействиям.",
      '+6+7': "Эмоциональная напряженность, физиологический дискомфорт, потребность в покое. Ситуация воспринимается как трудно разрешимая. Горечь разочарования, неудовлетворенность собой, избыточная самокритичность. Пассивный протест против сложившихся обстоятельств.",
      '+7': "Протестная реакция на сложившуюся ситуацию. Отстаивание собственной точки зрения. Субъективная оценка обстоятельств, непримиримое отношение к позиции окружающих, нетерпимость к мнению других. Противодействие внешнему давлению, средовым воздействиям, протест против судьбы.",
      '+7+0': "Негативно-протестная реакция, напряженность, стресс. Пессимистическая оценка ситуации. Сопротивление внешним обстоятельствам, давлению средовых воздействий. Стремление отстоять собственную позицию ограничением контактов, пассивным противодействием. Аутичность, отход от привычного круга контактов. Неудовлетворены ведущие потребности.",
      '+7+1': "Состояние характеризуется выраженной неустойчивостью. Протестная реакция на обстоятельства, нарушающие покой, затрудняющие самореализацию личности, не может в полной мере проявиться в поведении и высказываниях из-за подключившегося контроля над эмоциями. Вегето-эмоциональная неустойчивость усиливается в связи с блокированностью потребностей, которые обозначены ниже. Раздражительная слабость, функциональные нарушения психосоматического круга.",
      '+7+2': "Протестная реакция в ответ на убежденность в недоброжелательности значимых окружающих или их попытки ограничить действия и самостоятельность обследуемого лица. Упорство в отстаивании собственного мнения и своей независимости. Внешнеобвиняющий тип реагирования. Акцентированы черты недоверчивости. Склонность к формированию жесткой субъективной схемы конфликтных межличностных отношений.",
      '+7+3': "Протестная реакция на средовые воздействия с избыточной возбудимостью. Повышенная импульсивность. Склонность к неожиданным своевольным поступкам в состоянии аффекта. Возможны деструктивные агрессивные тенденции.",
      '+7+4': "Протестная реакция в ситуации выраженной эмоциональной напряженности. Негативизм в отношении средовых воздействий сочетается с эмоциональной неустойчивостью, иррациональными страхами. Потребность в избавлении от непереносимой ситуации может спровоцировать необдуманные импульсивные высказывания. Отчаянные поиски выхода из ситуации трудно прогнозируемы и могут проявиться в аутоагрессивной (направленной на себя) форме и других иррациональных поступках на фоне сниженного инстинкта самосохранения.",
      '+7+5': "Негативная реакция на ситуацию личности своеобразной, ориентированной лишь на собственное субъективное мнение. Ирреальные требования к жизни, потребность в идеалах, которые не могут быть воплощены в реальность. Категоричность и необычность суждений, жесткость позиции, невозможность каких-либо компромиссов в отношениях с окружающими, убежденность в своей исключительности, пренебрежение к общепринятым канонам. Склонность к иррациональным решениям. Проявления социальной дезадаптации.",
      '+7+6': "Состояние выраженной социально-психологической дезадаптации. Ощущение разочарования, диссонанса между идеальными представлениями и грубой реальностью. Потребность в покое и расслаблении, освобождении от стресса. Неприятие ситуации, протест, непримиримость. Перенапряжение физическое и душевное. Тревожная и болезненная оценка своего самочувствия.",
      'x0': "Ограниченная эмоциональная готовность к общению во имя избежания конфликтных напряжений.",
      'x0x1': "Пассивность в данный момент связана с обстоятельствами, затрудняющими завязывание взаимно удовлетворяющих отношений.",
      'x0x2': "Несмотря на сложность ситуации, предпринимаются упорные попытки для достижения целей. Действия планомерны, продуманы, осторожны.",
      'x0x3': "Мотивация достижения блокирована препятствиями и трудностями. Напряженность контролирующих спонтанность «тормозных» механизмов проявляется повышенной тревожностью и раздражительностью.",
      'x0x4': "Неустойчивость состояния, затрудняющая целенаправленность поведения, создает эмоциональную напряженность.",
      'x0x5': "Пассивность и осторожность мешают гармонизации отношений, которым придается идеальная окраска.",
      'x0x6': "Пассивность, зависимость от значимых других, ощущение приниженности. Потребность в большей безопасности, в теплых отношениях, избавлении от проблем.",
      'x0x7': "Состояние стресса в связи со сложившейся ситуацией. Трудности самореализации, ограничение независимости, стеснение свободы выбора решений. Стремление освободиться от помех.",
      'x1': "Выраженный контроль над проявлениями чувств и поступков, раскованность в узком кругу близких контактов.",
      'x1x0': "Дружелюбие и конформность, контролируемость чувств и поступков, избирательность в контактах, необходима спокойная обстановка.",
      'x1x2': "Упорядоченность, методичность и самостоятельность действий. Потребность в сочувствии и понимании, самоуважении и уважении со стороны значимых окружающих.",
      'x1x3': "Склонность к плодотворному сотрудничеству без притязаний на лидирующую позицию. Умение сглаживать конфликты, сдерживать собственные непосредственные реакции. Хороший самоконтроль при достаточной активности.",
      'x1x4': "Подверженность средовым влияниям, потребность в сопричастности. Стремление к вживанию в разные социальные роли. Колебания настроения в зависимости от степени принятия окружением, успешности своих действий.",
      'x1x5': "Сензитивность, эстетическая ориентированность, потребность в гармоничных отношениях, теплой привязанности.",
      'x1x6': "Потребность в избегании лишних усилий, уюте, безопасности и теплых отношениях. Необходим покой и защищенность.",
      'x1x7': "Неустойчивость. Осознанный контроль над спонтанными реакциями создает известную напряженность. Неуверенность в себе, в связи с этим повышенная ранимость, болезненное чувство уязвленного самолюбия делают поведение неровным.",
      'x2': "Поведение настойчивое, требовательное, упорство в достижении целей, отстаивание своих позиций.",
      'x2x0': "Оборонительная реакция в связи с ощущением угрозы, затруднениями в реализации своих планов. Тревожные опасения усиливают решимость довести дело до конца.",
      'x2x1': "Аккуратность, методичность и самостоятельность в деятельности. Потребность в самоуважении и уважении со стороны значимых других.",
      'x2x3': "Актуализация лидерских тенденций, упорство в преодолении трудностей, напряженность и чувство соперничества.",
      'x2x4': "Обстоятельства способствуют неустойчивости самооценки, требуют самоутверждающегося поведения. Стремление повысить свою значимость в глазах окружающих.",
      'x2x5': "Стремление преодолеть предубеждение и недоброжелательность окружающих; настороженность и недоверчивость во взаимоотношениях в связи с тенденцией к преувеличению значимости их мнения, сензитивность к критическим замечаниям. Упрямство и своеволие, возводимые в принцип. Изобретательность и богатство фантазии.",
      'x2x6': "Раздражительность, мнительность в отношении высказываний окружающих на свой счет, упрямство в сочетании с обидчивостью. Проблема уязвленного самолюбия и нарушенного равновесия в отношениях с окружающими.",
      'x2x7': "Упорство в отстаивании своей позиции, отсутствие склонности к компромиссам, упрямство и несговорчивость.",
      'x3': "Активность в достижении поставленной цели, однако достигнутое в значительной степени обесценивается по мере приближения к желанной цели и становится жаль потраченных усилий.",
      'x3x0': "Повышенная импульсивность, раздражительность. Состояние, близкое к стрессу. Активность не приводит к решению проблем и усугубляет конфликт.",
      'x3x1': "Высокая активность успешно контролируется сознанием. Внешняя сбалансированность дается ценой известного напряжения и может быть почвой для развития соматических дисфункций.",
      'x3x2': "Активность в преодолении трудностей, доминантность в отношениях с окружающими, стремление к лидирующей позиции, вспыльчивость в конфликтных ситуациях.",
      'x3x4': "Общительность, непостоянство в привязанностях, легкая переключаемость на другие виды деятельности, что может привести к поверхностности. Откликаемость на средовые воздействия, чувствительность к изменениям микроклимата в социуме. ",
      'x3x5': "Стремление к независимой позиции, оригинальность суждений, своеобразие интересов, увлеченность, потребность в «особых» переживаниях и отношениях, которым отдается предпочтение перед конкретными реальными целями.",
      'x3x6': "Нежелание проявлять предприимчивость и практицизм, стремление к безопасности и комфорту, отсутствие выраженного честолюбия.",
      'x3x7': "Самореализация и достижение цели затруднены из-за существенных препятствий, что способствует усилению стеничности.",
      'x4': "Оптимистический настрой, стремление к ярким впечатлениям, поиски перемен и новизны, приключений и ярких переживаний.",
      'x4x0': "Трудности выбора пути решения проблем, известная напряженность, причины которой не осознаются.",
      'x4x1': "Податливость влиянию окружающих, изменчивость настроения в зависимости от реакций находящихся рядом людей. Стремление к установлению дружеских контактов. Самооценка зависит от успеха и мнения значимых других.",
      'x4x2': "Актуальность надежды на повышение социального статуса и материальной обеспеченности.",
      'x4x3': "Активность, переходящая в разбросанность, торопливость. Раздражительность, вызванная медленным ходом событий. Переменчивость и недостаток целенаправленной настойчивости в достижении целей.",
      'x4x5': "Богатое воображение, яркость чувств, потребность в необычных приключениях, интересных знакомствах, волнующих событиях, вызывающих заинтересованность и энтузиазм.",
      'x4x6': "Неустойчивость, неуверенность в себе, боязливость, тревожные опасения непреодолимости существующих проблем; истинная причина конфликта — внутренняя — не осознается.",
      'x4x7': "Активные, но недостаточно целенаправленные поиски разрешения конфликтной ситуации, истоки которой не полностью осознаны. Избыточная эмотивность мешает рассудочно подойти к проблеме. Поступки лишены планомерности и продуманности, решения могут быть опрометчивы, иррациональны.",
      'x5': "Своеобразие самореализации, индивидуальный стиль решения проблем, трудности адаптации, связанные с индивидуалистичностью; нешаблонность подхода к решению проблем. Потребность в определенной «социальной нише» и тонком понимании со стороны окружающих. Сензитивность к средовым воздействиям.",
      'x5x0': "Тревожная настороженность, пассивное выжидание, уход от конфликтов и непонимания окружающими в мир внутренних переживаний, мечты и фантазий, бегство от повседневности, стремление быть собой, сохранить индивидуальность. Избирательность в контактах.",
      'x5x1': "Потребность в теплых отношениях, любви и понимании. Сентиментальность, идеализация объекта привязанности, эстетическая ориентированность. Застенчивость, бегство от житейских проблем в мир искусства и теплых межличностных отношений.",
      'x5x2': "Недоверчивость, переживание чувства обиды, стремление улучшить впечатление о себе в глазах значимых окружающих. Сензитивность в отношении критических замечаний в свой адрес. Иррациональные способы противодействия недоброжелательности окружающих. Склонность преувеличивать враждебность отношения к себе других. Изобретательность и богатство фантазии. Стремление упрочить свою позицию.",
      'x5x3': "Экспансивность высказываний и поведения, эмоциональная вовлеченность, стремление к переживанию сильных ощущений. Оригинальность и творческий подход в решениях. Настойчивость в отстаивании собственной индивидуальности, что несколько усложняет адаптацию.",
      'x5x4': "Стремление к независимости позиции, оригинальность суждений, своеобразие интересов. Потребность в «особых» переживаниях и отношениях, которым отдается предпочтение перед конкретными и реальными целями.",
      'x5x6': "Обостренная чувствительность к средовым воздействиям. Сужена зона жизненного комфорта. Потребность в дифференцированном, щадящем подходе. Избирательность, капризность, стремление к удовлетворению своих прихотливых вкусов.",
      'x5x7': "Категоричность и субъективизм суждений в оценке ситуации, настойчивость в нереальных требованиях. Бескомпромиссность в отстаивании своеобразных убеждений. Ощущение своей непонятости, одиночества.",
      'x6': "Чувство тревоги и неуверенности, физического перенапряжения. Страхи, обостренная мнительность, дискомфорт, потребность в отдыхе и расслаблении.",
      'x6x0': "Пассивность, зависимость от значимых других, ощущение приниженности. Потребность в большей безопасности, теплых отношениях, избавлении от проблем.",
      'x6x1': "Потребность в избегании лишних усилий, в уюте, безопасности и теплых отношениях. Необходим покой и защищенность.",
      'x6x2': "Раздражительность, мнительность в отношении высказываний окружающих на свой счет, упрямство в сочетании с обидчивостью. Проблема уязвленного самолюбия и нарушенного равновесия в отношениях с окружающими.",
      'x6x3': "Ощущение избытка трудностей и бесполезности дальнейших усилий. Стремление к безопасности и комфорту. Отказ от реализации честолюбивых планов ценою потери спокойствия.",
      'x6x4': "Неустойчивость состояния, неуверенность в себе, боязливость, тревожное ощущение непреодолимости препятствий. Стремление к устойчивому положению, уюту и спокойствию за счет активности других лиц, без затраты собственных усилий.",
      'x6x5': "Чувственен. Желает наслаждаться предметами, доставляющими удовольствие, но отвергает всё безвкусное, вульгарное и грубое",
      'x6x6': "Обостренная чувствительность к средовым воздействиям. Сужена зона жизненного комфорта. Потребность в индивидуализированном и бережном подходе. Избирательность, капризность, стремление к удовлетворению своих прихотливых вкусов.",
      'x6x7': "Эмоциональное и физическое перенапряжение, тенденция к самоуничижению, чувство приниженности. Потребность в покое и помощи.",
      'x7': "Конфликт или неудовлетворенность ситуацией.",
      'x7x0': "Противодействие сложившейся ситуации, пессимистический настрой, стремление освободиться от напряженности, отстоять собственную позицию ограничением контактов.",
      'x7x1': "Неустойчивость состояния, раздражительность в ответ на ситуацию, нарушающую покой и затрудняющую контакты. Чувствительность к средовым воздействиям; потребность в понимании, затрудненная выраженной избирательностью в межличностных контактах, обидчивостью.",
      'x7x2': "Упорное отстаивание своего мнения, неуступчивость, категоричность в отстаивании собственной независимости, уверенность в своей правоте. Внешнеобвиняющая реакция на неблагоприятную ситуацию.",
      'x7x3': "Самореализация и действия, направленные на достижения цели, затруднены из-за существенных препятствий, что вызывает усиление стенических реакций.",
      'x7x4': "Активность носит недостаточно целенаправленный характер, что затрудняет разрешение конфликтной ситуации, истоки которой не полностью осознаются. Избыточная эмотивность мешает рассудочному овладению ситуацией. Поступки лишены планомерности и продуманности, решения могут быть опрометчивы, иррациональны.",
      'x7x5': "Субъективизм и категоричность в оценке ситуации, неуступчивость в отстаивании своей независимости, своеобразных убеждений. Ощущение своей непонятости, одиночества.",
      'x7x6': "Эмоциональное и физическое перенапряжение, чувство приниженности. Потребность в покое и помощи.",
      '=0': "Известная напряженность в контактах с окружающими, стремление уйти от конфликта и избежать излишних волнений.",
      '=0=1': "Избирательность в контактах, обособленность, стремление избегать глубоких привязанностей, чтобы не испытывать разочарования. Сосредоточенность на своих проблемах.",
      '=0=2': "Настороженность, выжидательная позиция, попытка примириться с существующей ситуацией и найти в ней новые возможности.",
      '=0=3': "Тревожные опасения, вынужденная сдержанность, контроль над поведением, стремление к избеганию конфликта.",
      '=0=4': "Во избежание конфликтов проявляется тенденция к сдерживанию непосредственных реакций и ярких эмоциональных всплесков, позволительных лишь в контактах узкого круга.",
      '=0=5': "Повышенная обидчивость, связанная с эгоцентричностью.",
      '=0=6': "Потребность в большей эмоциональной вовлеченности, эротичность.",
      '=0=7': "Вынужденная необходимость пойти на компромисс ради сохранения добрых отношений с окружающими.",
      '=1': "Потребность в теплых контактах не является актуальной.",
      '=1=0': "Потребность в эмоциональной вовлеченности, носящей поверхностный характер.",
      '=1=2': "Неудовлетворенная потребность в самоуважении и уважении со стороны значимых других. Напряженность взаимоотношений с близкими людьми.",
      '=1=3': "Трудности в достижении сотрудничества и гармоничных отношений.",
      '=1=4': "Затруднения в попытке контролировать повышенную эмотивность, недостаточно учитывается ситуация и мнение окружающих.",
      '=1=5': "Трудности в межличностных контактах из-за повышенной ранимости и сосредоточенности на своих проблемах.",
      '=1=6': "Застенчивость и пассивность, затрудняющие чувственную раскованность.",
      '=1=7': "Уступчивость и пассивность, мешающие сохранить эмоциональную привязанность. Уступчивость. Самолюбивое отстаивание своих позиций в данный момент не актуально, оборонительные тенденции смягчены доверием к окружающим.",
      '=2': "Ощущение, что обстоятельства не дают возможность упрочить свое положение, необходимость наилучшим образом использовать эти обстоятельства.",
      '=2=0': "Тенденция скрыть свою неуверенность и стремление к избеганию конфликтов.",
      '=2=1': "Уступчивость, обусловленная тем, что проявление упорства не уместно при сложившихся обстоятельствах. Напряженность в контактах узкого круга.",
      '=2=3': "Стремление к сохранению миролюбивых отношений с окружающими, несмотря на внутренний протест.",
      '=2=4': "Несмотря на трудности и препятствия, гибкость позиции способствует целенаправленности действий.",
      '=2=5': "Тщательно скрываемая обидчивость, стремление занять гибкую и уступчивую позицию.",
      '=2=6': "Стремление примириться с трудностями и найти оптимальную зону комфорта.",
      '=2=7': "Сдержанность в эмоциональных проявлениях, отказ от своих притязаний, уступчивость, обусловленная сложившимися обстоятельствами.",
      '=3': "Потребность в расслаблении и покое в связи с предшествовавшей избыточной активностью. Раздражительная слабость.",
      '=3=0': "Ощущение непреодолимости препятствий, что вызывает потребность в покое.",
      '=3=1': "Трудности достижения гармоничных отношений с окружающими создают чувство изолированности, дистресса.",
      '=3=2': "Препятствия и трудности вызывают чувство несчастливости и вынуждают примириться с ситуацией.",
      '=3=4': "Потребность в поддержке и одобрении, спокойной обстановке, что позволило бы расширить сферу контактов и надеяться на лучшее в будущем.",
      '=3=5': "Эгоцентрическая сосредоточенность на своих огорчениях и обидах.",
      '=3=6': "Поиски выхода из сложной ситуации. Удовлетворенность физиологических потребностей.",
      '=3=7': "Ситуация вынуждает к сдержанности и подавлению сиюминутных потребностей.",
      '=4': "Потребность в ободрении и поощрении для сохранения надежды на улучшение ситуации в будущем. Осмотрительность в межличностных контактах во избежание разочарований.",
      '=4=0': "Потребность в общении при выраженной избирательности в межличностных контактах. Неуверенность в себе и стремление к избеганию конфликтов.",
      '=4=1': "Избирательность в межличностных контактах, особенно — близких, интимных. Диссонанс между идеалом и реальностью приносит разочарование.",
      '=4=2': "Упорство в достижении целей, рационализация, гибкость позиции несмотря на неудачи и трудности, субъективно переживаемые как избыточные.",
      '=4=3': "Потребность в покое и ободрении для избавления от субъективно переживаемой неудовлетворенности; это связано с опасениями новых трудностей, мешающих реализации собственных намерений и расширению сферы деятельности.",
      '=4=5': "Убежденность в реалистичности своих надежд, потребность в ободрении и поддержке. Обидчивость и сосредоточенность на своих проблемах.",
      '=4=6': "Выраженная избирательность в межличностных отношениях, особенно в сфере близких, интимных отношений. Ирреальность притязаний.",
      '=4=7': "Убежденность и упрямство в отстаивании своих намерений несмотря на противодействие внешних обстоятельств. Нетерпимость к слабостям других в межличностных контактах узкого круга.",
      '=5': "Стремление не обнаружить свою сентиментальность и обидчивость, эгоцентрическая сосредоточенность на своих проблемах.",
      '=5=1': "Ощущение изолированности и одиночества. Потребность в ярких эмоциональных переживаниях, эгоцентрическая сосредоточенность на своих проблемах, обидчивость.",
      '=5=2': "Сдержанность, за которой скрывается обида и неудовлетворенность. Защитный механизм рационализации уменьшает напряженность.",
      '=5=3': "Эгоцентрическая обидчивость, ощущение изолированности и непо-нятости окружающими, отсутствия поддержки.",
      '=5=4': "Эгоцентрическая обидчивость; убежденность в том, что надежды и замыслы осуществимы, требующая поддержки и ободрения.",
      '=5=6': "Эгоцентрическая обидчивость, эмоциональная сдержанность. Физиологические потребности в зоне комфорта.",
      '=5=7': "Чувства подменяются рассуждательством.",
      '=6': "Физиологические потребности в зоне комфорта.",
      '=6=0': "Стремление к бесконфликтному общению и физиологическому комфорту.",
      '=6=1': "Затруднения в межличностных контактах узкого круга, физиологические потребности в зоне комфорта.",
      '=6=2': "Защитный механизм рационализации задействован в связи с неудовлетворенностью своей социальной позицией. Физиологические потребности в зоне комфорта.",
      '=6=3': "Блокирована потребность в самореализации и достижении цели, стремление оградить себя от дополнительных волнений. Физиологические потребности в зоне комфорта, но не окрашены позитивными переживаниями.",
      '=6=4': "Выраженная разборчивость и избирательность в межличностных контактах. Нереальные требования к объекту влечения.",
      '=6=5': "Эгоцентрическая обидчивость. Эмоциональная сдержанность. Физиологическая сфера не блокирована.",
      '=6=7': "Вынужденная уступчивость. Физиологические потребности в зоне относительного комфорта. Трудности вынуждают проявить уступчивость и временно отказаться от реализации своих намерений.",
      '=7': "Чувство, что на пути стоят препятствия. Обстоятельства, вынуждающик идти на компромиссы и временно отказываться от некоторых удовольствий.",
      '=7=0': "Для сохранения социальных связей и теплых отношений проявляется уступчивость.",
      '=7=1': "Эмоциональная заторможенность. Сдержанность в притязаниях и надеждах, вынужденный отказ от реализации некоторых потребностей.",
      '=7=2': "В связи с обстоятельствами, ограничивающими свободу действий, вынужденный отказ от реализации намерений и упорства в отстаивании своей позиции.",
      '=7=2': "В связи с обстоятельствами, ограничивающими свободу действий, вынужденный отказ от самореализации.",
      '=7=4': "Убежденность в реальности своих планов и упорство в их достижении несмотря на давление обстоятельств, вынуждающих идти на компромиссные решения. Избыточная критичность в оценке лиц ближайшего окружения.",
      '=7=5': "Сложность ситуации искажает непосредственность чувств, подменяя их интеллектуальной переработкой, тенденцией к раздумьям.",
      '=7=6': "Вынужденная установка на компромиссное поведение и временный отказ от реализации некоторых намерений. Физиологические потребности не блокированы.",
      '-0': "Выраженная общительность, активность, обращенность в мир окружающих явлений жизни.",
      '-0-1': "Отказ от расслабления и уступок, стремление сохранить активность, овладеть эмоциями. Нет возможности реализовать потребность в любви, понимании, дружелюбных отношениях, беспокойная неудовлетворенность, связанная с осознанием своей зависимости от объекта привязанности. Раздражительность и трудности концентрации внимания.",
      '-0-2': "Нет возможности для реализации потребности в отстаивании своей позиции и права на уважение. Противодействие средовому давлению вызвало перенапряжение.",
      '-0-3': "Болезненно переживается отсутствие возможности реализовать потребность в самореализации и достижении желаемых целей, что является почвой для гневных вспышек, невротизации, психосоматических расстройств (кардиалгии). Ощущение бессилия перед существующими препятствиями. Чувство страха, нервное истощение, беспокойная раздражительность.",
      '-0-4': "Состояние стресса в связи с блокировкой непосредственного поведения, невозможностью реализовать потребность в радостном общении, беззаботном существовании. Неуверенность, тревожная настороженность. Болезненно переживается неудовлетворенное тщеславие, потребность нравиться окружающим. Отказ от компромиссов, упорство в ирреальных притязаниях.",
      '-0-5': "Стресс, контролируемый тонкостью суждений и контролем рассудка над эмоциями. Тенденция к излишней доверчивости в качестве защитного механизма вызывает повышенную требовательность к искренности окружающих, особенно в контактах узкого круга. Контролируемая сензитивность.",
      '-0-6': "Подавление физиологических потребностей. Неудовлетворенная потребность в отношениях, полных взаимопонимания, с тенденцией сохранить свое превосходство.",
      '-0-7': "Повышенная чувствительность к внешним раздражителям. Потребность в преодолении ограничений, в том числе дистанции, отделяющей от окружающих; стремление к самостоятельности в принятии решений.",
      '-1': "Стремление справиться с угнетенностью, овладеть собой, сохраняя активность. Блокирована потребность теплых межличностных отношениях, зависимость от объекта глубокой привязанности. Озабоченность и раздражительная несдержанность могут ухудшить концентрацию внимания. Беспокойная неудовлетворенность.",
      '-1-0': "Нетерпеливость, беспокойство, угнетенность. Блокирована потребность в теплых отношениях и любви; стремление избежать отношений, обязывающих к ответственности. Неустойчивость состояния, беспокойные попытки изменить ситуацию, что может отразиться на концентрации внимания, работоспособности.",
      '-1-2': "Стресс, ослабляющий волю и настойчивость. Стремление избавиться от ситуации, оказывающей чрезмерное давление. Перенапряжение от усилий, направленных на преодоление существующих трудностей, воспринимается как избыточное и бесполезное. Разлад в сфере значимых межличностных контактов.",
      '-1-3': "Чувство несчастливости, вызванное разладом в сфере значимых межличностных контактов. Гневные реакции. Блокированность сексуальной потребности или иной значимой сферы самореализации. Возможность кардиалгии. Беспомощность с проявлениями раздражительности. Нарушен баланс между тенденцией к активности и контролем.",
      '-1-4': "Состояние стресса, переживание разочарованности. Противоречивое сочетание разнонаправленных тенденций — стремление уйти от обременительных отношений и страх потерять объект привязанности.",
      '-1-5': "Болезненно переживается отсутствие возможности реализовать потребность в любви и теплых отношениях; стремление избавиться от гнетущего состояния, нетерпеливость; потребность в понимании и доброжелательных отношениях неудовлетворена. Напряженность вызывает чувство раздражения, ощущение непонятости значимыми окружающими.",
      '-1-6': "Стресс, выраженная неудовлетворенность, которая вызвана чуством приниженности и проявляется ограничительным поведением. Зависимость позиции, неуверенность, повышенная чувствительность к средовым воздействиям. Выраженный контроль рассматривается как единственная гарантия самоутверждения и отстаивания своих позиций. Основные проблемы — недостаток признания и повышенный самоконтроль.",
      '-1-7': "Стресс. Блокирована потребность в независимости. Ситуация вызывает неудовлетворенность. Повышенный самоконтроль помогает скрыть свою ранимость. Сложившиеся отношения тягостны, однако потребность в свободе действий сталкивается с опасениями в разрыве контактов, создающих атмосферу доброжелательности и сотрудничества. Беспокойство, нарушающее продуктивную концентрацию внимания.",
      '-2': "Угнетена способность к отстаиванию своей позиции. Неудовлетворенность своим социальным статусом, трезвая, рассудочная оценка происходящего, однако ослабление воли мешает изменить ситуацию. Нежелание предпринять что-либо.",
      '-2-0': "Блокирована потребность в отстаивании своих позиций. Способность к сопротивлению противодействующим внешним факторам исчерпана, однако установка на достижение целей остается устойчивой. Субъективное отношение к ситуации мешает оценить ее трезво, что создает внутренний конфликт между ригидностью установки и неразрешимостью проблемы.",
      '-2-1': "Блокирована потребность в позитивной самооценке и уважении со стороны референтной группы. Противодействие среды воспринимается как враждебное. Ощущение утраты воли и жизнестойкости, потребность в избавлении от данной ситуации. Стресс и разлад межличностных отношений.",
      '-2-3': "Состояние гневливой раздражительности в связи с субъективным ощущением враждебности окружающих, высокий уровень невротизации, возможны кардиалгии. Давление внешних обстоятельств воспринимается как невыносимое, требования — как неразумные. Ощущение собственного бессилия перед лицом несправедливости.",
      '-2-4': "Стресс, вызванный конфликтом между надеждой и необходимостью (желаниями и реальностью), в связи с состоянием выраженного разочарования. Тревожная неуверенность усиливает стремление уйти от ответственных решений, переключиться на малозначимые, но отвлекающие от проблем занятия. Нерешительность, вызванная разочарованием.",
      '-2-5': "Нет возможности реализовать потребность в уважении и понимании. Субъективное переживание униженности, отсутствия доверия и расположения к себе; в связи с этим страдает самоуважение. Без поддержки и признания трудно принять необходимое решение и избавиться от унижающей достоинство ситуации.",
      '-2-6': "Эмоциональная напряженность связана с перенапряжением избыточного самоконтроля, используемого как инструмент для завоевания расположения и уважения других. Несмотря на недостаток признания ригидно сохраняется установка на исключительность своей позиции. Желание избавиться от неприятной ситуации не может служить поводом для компромиссных решений. Упорство в притязаниях вопреки печальной реальности.",
      '-2-7': "Блокирована потребность в независимости. Стремление избавиться от ограничений. В противодействии сильному давлению внешних обстоятельств не достает целенаправленности.",
      '-3': "Блокирована потребность в самореализации и достижении целей, вызвавшая перевозбуждение. Повышенная раздражительность, гневные реакции, неврастенические проявления (кардиалгии). Ощущение нависшей угрозы. Чувство собственного бессилия и переутомления перед лицом препятствий, стоящих на пути к реализации собственных намерений.",
      '-3-0': "Проблема сдерживания противодействия обстоятельствам, вызванного блокировкой потребности к самореализации и достижению целей. Стремление к сдерживанию гипертимных реакций. Нетерпеливость и раздражительность. Эмоциональное напряжение может проявиться психосоматическим вариантом дезадаптации (гипертония, кардиалгия). Страх потерь, субъективизм в оценке ситуации. Бессилие перед лицом препятствий, стоящих на пути к реализации собственных намерений.",
      '-3-1': "Подавленное противодействие обстоятельствам, препятствующим свободной самореализации личности и достижению целей. Неспособность к релаксации. Нетерпеливость, раздражительность. Противоречие между разнонаправленными тенденциями (высокой спонтанностью и повышенным самоконтролем) приводит к избыточной эмоциональной напряженности. Физиологический вариант дезадаптации (гипертония, кардиалгия). Нарушена гармония в сфере значимых межличностных отношений. Чувство несчастливости, чувство бессилия что-либо исправить, наладить.",
      '-3-2': "Выраженный стресс в связи с блокированностью самореализации. Нет возможности реализовать потребность достижения успеха, утрачена лидирующая позиция в сложившейся ситуации. Проблема уязвленного самолюбия, неудовлетворенность своим социальным статусом. Ощущение собственного бессилия перед лицом препятствий, которые субъективно воспринимаются как неодолимые, и враждебностью окружающих. Выраженное общее перенапряжение с тенденцией к функциональным нарушениям в сердечно-сосудистой системе. Негодование и беспомощность, которые могут компенсироваться за счет преобладающих установок (см. первые строки интерпретации).",
      '-3-4': "Стресс, проявляющийся выраженной эмоциональной неустойчивостью и тревогой, связан с разочарованием. Защитный механизм — вытеснение истинных причин конфликта. Стремление сохранить хорошее впечатление о себе в кругу значимых межличностных контактов. Высокие притязания сталкиваются с невозможностью реализации своих намерений и надежд. Чувство обманутого доверия, ощущение своего положения как жертвы злой воли окружающих людей. Своя доля вины в конфликте перекладывается на других.",
      '-3-5': "Болезненно переживается отсутствие возможности реализовать потребность в сохранении собственной индивидуальности и «социальной ниши», создающей ощущение понимания и безопасности. Состояние крайней разочарованности, неудовлетворенности. Потребность в сочувствии и ощущение собственного бессилия.",
      '-3-6': "Напряженность, связанная с блокированностью физиологических потребностей, чрезмерно ограничиваемых. Сложившаяся ситуация ущемляет чувство независимости. Выраженный самоконтроль в сфере чувственности приводит к изоляции. Стремление к завоеванию признания и уважения со стороны значимых других. Неуверенность усугубляется недостатком внимания к своей персоне.",
      '-3-7': "Стресс, вызванный разочарованиями и препятствиями на пути к реализации своих намерений. Противодействие обстоятельствам, препятствующим свободной самореализации личности и раздражение сочетаются с неуверенностью. Потребность в избавлении от ограничений и в обретении свободы принятия решений. Фрустрирована потребность в независимости.",
      '-4': "Стресс, вызванный неудовлетворенной потребностью в активном взаимодействии с окружающими и избегании серьезной ответственности. Чувство страха, связанное с опасениями потерять престижность собственной-позиции. Защитный механизм — вытеснение истинных причин конфликта. Завышенные требования к окружающим, отсутствие гибкости, нет установки на разумный компромисс. Беспокойство, дистресс, сниженный фон настроения.",
      '-4-0': "Беспокойная напряженность. Неудовлетворена потребность в непосредственной самореализации в активном взаимодействии с окружающими и без обременяющей ответственности. Вытеснение истинных причин неудовлетворенности. Убежденность в том, что надежды и желания должны быть реализованы сами собой, без применения собственных усилий. Потребность в признании и помощи со стороны окружающих, чувство страха и неуверенности.",
      '-4-1': "Тревожное беспокойство, базирующееся на внутренне конфликтном сочетании разнонаправленных тенденций: стремления к непосредственной самореализации без обременяющей ответственности сталкивается с тенденцией к повышенному самоконтролю. Колебания настроения, проблема уязвленного самолюбия, неудовлетворенность тщеславия. Переживание нарушенных конгруэнтных отношений со значимыми окружающими. Стремление к подавлению неустойчивости эмоциональных проявлений. Дистресс. Выраженная подверженность средовым воздействиям, зависимость от реакции значимых других.",
      '-4-2': "Состояние стресса, вызванное неудовлетворенностью потребности в спонтанной самореализации без обременительной ответственности, противоречиво сочетающейся с ригидностью рациональных установок на удержание собственных позиций. Конфликт между беспечной уверенностью в саморешаемости проблем и трезвой оценкой реально существующей ситуации. Тревожная неуверенность, пессимистический фон настроения, трудности в принятии решений, бездеятельность.",
      '-4-3': "Блокирована потребность в самореализации, дистресс, тревожность и беспокойство. Высокий уровень притязаний и потребность в признании сталкиваются с противодействием, вызывающим неуверенность в возможности успеха. Вытеснение истинных причин конфликта, стремление переложить ответственность за сложившуюся ситуацию на других. Склонность видеть себя в роли жертвы собственной доверчивости.",
      '-4-5': "Неудовлетворенная потребность в спонтанной самореализации без обременительной ответственности и в сохранении собственной индивидуальности. Состояние характеризуется уходом от межличностных контактов в мир собственных переживаний. Сдержанность в проявлении чувств, недоверчивость; ирреальность притязаний маскируется замкнутостью. Настороженность, сензитивность. Подавлены творческие наклонности; экзальтация чувств под контролем.",
      '-4-6': "Неудовлетворенная потребность в признании, беспокойство, тревога, комплекс собственного несовершенства маскируется демонстративностью поведения. Высокий уровень притязаний сталкивается с ощущением собственной изолированности. Жажда одобрения и успеха неудовлетворена. Состояние характеризуется переживанием чувства одиночества и неуверенности, маскируемых напускным безразличием, презрительным отношением к критике в свой адрес.",
      '-4-7': "Стресс, связанный с блокировкой потребности в независимости и спонтанной самореализации. Напряженность, настороженность, настойчивая потребность в избавлении от каких бы то ни было ограничений. Неуверенность в возможности улучшения ситуации не снижает уровень притязаний и не приводит к компромиссным решениям.",
      '-5': "Напряженность, связанная с тенденцией к сдерживанию эмоциональных проявлений. Выраженная избирательность в межличностных контактах, тонкость вкуса и повышенная сензитивность к внешним воздействиям диктует необходимость повышенного самоконтроля. Повышенные требования к окружающим как защита от собственной излишней доверчивости.",
      '-5-0': "Нетерпеливость и напряженность, высокая мотивация достижения сочетается с чувством недостаточности понимания и сочувствия со стороны окружающих. Настороженная критичность в межличностных отношениях. Повышенные требования к окружающим как защита от собственной излишней доверчивости.",
      '-5-1': "Неудовлетворенность в связи с блокировкой аффилиативной потребности в сфере значимых межличностных контактов. Беспокойная неудовлетворенность, раздражительность и нетерпеливость, вызывающие трудности концентрации внимания.",
      '-5-2': "Блокирована потребность в уважении и понимании. Субъективное переживание униженности, отсутствие доверия и расположения к себе со стороны значимых окружающих. В связи с этим страдает самоуважение. Без поддержки и признания трудно принять необходимое решение и избавиться от унижающей достоинство ситуации.",
      '-5-3': "Нет возможности реализовать потребность в сохранении собственной индивидуальности и той «социальной ниши», которая бы создавала ощущение понимания и безопасности. Возможны явления нервного переутомления, кардиологических функциональных нарушений. Состояние крайней разочарованности, потребность в сочувствии, ощущение собственного бессилия в стремлении к достижению цели.",
      '-5-4': "Блокирована потребность в спонтанной самореализации без обременительной ответственности и в сохранении собственной индивидуальности. Состояние характеризуется уходом от межличностных контактов в мир собственных переживаний. Сдержанность в проявлении чувств, недоверчивость. Ирреальность притязаний маскируется замкнутостью. Настороженность, сензитивность. Подавлены творческие наклонности; экзальтация чувств под контролем.",
      '-5-6': "Напряженность, вызванная трудностями в межличностных контактах, имеющих большую значимость. Высокий уровень притязаний вносит разлад в отношения. Ограничительные тенденции проявляются как мера защиты сензитивной личности, критичной, разборчивой, с независимостью суждений. Избирательность в контактах, интеллектуальная и эстетическая чувствительность.",
      '-5-7': "Напряженность, вызванная ограничением собственной независимости внешними воздействиями. Выраженный субъективизм в оценке явлений окружающей жизни, избирательность в межличностных контактах, категоричность и бескомпромиссность в принятии самостоятельных решений. Потребность в независимости.",
      '-6': "Стресс, вызванный подавлением физиологических потребностей. Самоограничение, которое субъективно воспринимается как вынужденная необходимость для самоутверждения в связи с неудовлетворенной потребностью конгруэнтных отношений.",
      '-6-0': "Стресс, вызванный подавлением физиологических потребностей. Неудовлетворенное желание найти признание и общность интересов в кругу значимых окружающих вызывает повышенную напряженность самоконтроля. Сдерживаемая чувственность, потребность в уважении и внимательном отношении.",
      '-6-1': "Неудовлетворенность и отсутствие взаимопонимания в сфере значимых межличностных контактов вызывает усиление контроля над чувственностью; подавление физиологических потребностей; неуверенность в себе. Стремление к конгруэнтным отношениям вступает в противоречие с тенденцией к отстаиванию своей индивидуальности.",
      '-6-2': "Стресс вызван неудовлетворенностью потребности в сохранении личностной позиции, в уважении со стороны значимых окружающих. Высокий уровень притязаний находится в конфликтном соотношении с реальными обстоятельствами, ущемляющими самолюбие. Упорство сталкивается с собственной неуверенностью.",
      '-6-3': "Стресс, связанный с подавлением физиологических потребностей. Сложившаяся ситуация ущемляет чувство независимости. Выраженный самоконтроль в сфере чувственности приводит к изоляции. Стремление к завоеванию признания и уважения со стороны значимых других. Неуверенность усугубляется недостатком внимания к своей персоне.",
      '-6-4': "Нет возможности реализовать потребность в признании. Стремление скрыть неуверенность и тревогу демонстративностью поведения. Высокий уровень притязаний сталкивается с ощущением собственной изолированности. Жажда одобрения и успеха неудовлетворена. Состояние характеризуется переживанием чувства одиночества и неуверенности, маскируемых напускным безразличием, презрительным отношением к критике в свой адрес.",
      '-6-5': "Напряженность, вызванная трудностями в межличностных контактах, имеющих большую значимость. Высокий уровень притязаний создает почву для разлада в отношениях. Ограничительные тенденции проявляются как мера защиты сензитивной личности, критичной, разборчивой, с независимостью суждений. Избирательность в контактах, интеллектуальная и эстетическая чувствительность. Защитный механизм сублимации.",
      '-6-7': "Протест в отношении запретов и нежелательных ограничений. Потребность распоряжаться своей судьбой.",
      '-7': "Потребность самостоятельно решать свои проблемы и распоряжаться своей судьбой.",
      '-7-0': "Потребность в ярких переживаниях, общении, неистовая увлеченность, уверенность в себе, стремление достичь большего, неуемная активность.",
      '-7-1': "Эмоциональная неустойчивость, связанная с неудовлетворенностью сложившихся отношений. Попытка контролировать свои чувства, чтобы скрыть свою ранимость, усиливает обостренную чувствительность к средовым воздействиям. Установка на компромиссное поведение. Беспокойство, сказывающееся на ослаблении функции внимания.",
      '-7-2': "Нет возможности реализовать потребность в независимости. Стремление избавиться от ограничений. В противодействии сильному давлению обстоятельств не достает целенаправленности.",
      '-7-3': "Стресс, вызванный разочарованиями и препятствиями на пути к реализации своих намерений. Противодействие обстоятельствам, препятствующим свободной самореализации личности и раздражительность сочетаются с неуверенностью. Потребность в избавлении от ограничений и обретении свободы принятия решений. Фрустрирована потребность в независимости.",
      '-7-4': "Стресс, связанный с блокированностью потребности в независимости и спонтанной самореализации. Напряженность, настойчивая потребность в избавлении от каких бы то ни было ограничений. Неуверенность в возможности улучшения ситуации не снижает уровень притязаний и не приводит к компромиссным решениям.",
      '-7-5': "Стресс, вызванный ограничением собственной независимости внешними преградами. Чувствительность, впечатлительность, взыскательность в межличностных отношениях. Недоверчивость. Обособленность и требовательность к другим.",
      '-7-6': "Стресс, вызванный ограничениями или запретами. Потребность распоряжаться своей судьбой. Протест против однообразия и заурядности. Настойчивость в отстаивании своего мнения, авторитарность. Повышенное чувство независимости. "
    };

    ResultTableWidget.prototype.mainTextResults = {
      '0,1,2,3': "Связь с партнером считает зависимостью и противится ей. Желая освободиться от внутренней зависимости, избегает проблем. Неспокоен и суетлив. Напряженно на­деется, что найдется выход, долгожданная развязка, которая принесет облегчение.",
      '0,1,3,2': "Противится связи, считая, что занимает в ней зависимое положение. Испытывает неудовлетворенность, боится, что его обойдут. Реализуя возможности, ведущие к достижению успеха, стремится проявить себя и освободиться от внутренней зависи­мости.",
      '0,2,1,3': "Противится общности с кем-то, считая, что занимает в ней зависимое положение. Же­лает освободиться от нее и обрести независимость. Напряженно надеется, что своим превосходством перед другими он вскоре вызовет симпатию, завоюет авторитет, до­бьется любви.",
      '0,2,3,1': "Противится общности с кем-то, считая, что занимает в ней зависимое положение. Боится, что его обойдут. Хочет стать независимым. Намерен добиться успеха, не обра­щая внимания на «какие-то» чувства.",
      '0,3,1,2': "Противится зависимости в неудовлетворяющей его связи. Стремится стать неза­висимым, чтобы, ни с чем не считаясь, добиться реализации собственных намере­ний.",
      '0,3,2,1': "Не желает быть верным прежней связи, поскольку она его не удовлетворяет и в ней он чувствует себя зависимым. Стремится стать независимым, чтобы иметь возможность поступать в соответствии со своими требованиями, самостоятельно, а не вследствие сердечных отношений.",
      '1,0,2,3': "Желание быть сильным и обрести превосходство не осуществилось. Трудности вос­принимаются как давление и вызывают невыносимое напряжение. Уклоняясь от них, бежит в мир иллюзий и надежд.",
      '1,0,3,2': "Трудности в осуществлении своих намерений воспринимает как препятствия и пы­тается от них уклониться. Хочет, чтобы его переживания были интенсивными. Же­лает проявить себя с лучшей стороны.",
      '1,2,0,3': "Уже не в состоянии справиться с собственным чрезмерным волнением. Пришел в от­чаяние и надеется вырваться из мучительной ситуации, чтобы освободившись, найти облегчение.",
      '1,2,3,0': "Концентрирует внимание на поставленной перед собой цели, чтобы избежать разо­чарований и неудач. Хочет утвердиться. В стремлении добиться признания не допус­кает сомнений в собственной силе и настойчивости.",
      '1,3,0,2': "Чрезмерно раздражен мучительными неприятными отношениями. Нуждается в бе­режном отношении, признании и уверенности в себе.",
      '1,3,2,0': "Хотел бы оградить себя от неуважения и от возможных разочарований. Считает, что самоутверждением может упрочить свою безопасность. Нуждается в признании.",
      '2,0,1,3': "Воспринимает ущемление своих интересов как невыносимое давление, которому вы­нужден уступить, чтобы не тратить зря силы. Предается надеждам и строит иллюзии.",
      '2,0,3,1': "Стремится жить, интенсивно переживая, пользуясь успехом и любовью. Однако, если ущемляют его интересы, теряется, воспринимая это как невыносимое давление.",
      '2,1,0,3': "Избегает раздражений и волнений. Разочарован и утомлен. Ищет выход, надеясь на то, что облегчение придет само.",
      '2,1,3,0': "Хотел бы оградить себя от разочарований и пустоты и с головой уйти в решение какой-либо задачи или отдаться переживаниям любви и с помощью сильной эмоцио­нальной отдачи построить гармоничные отношения.",
      '2,3,0,1': "Вследствие того, что его ожидания не сбываются, раздражен. Своеволен и поэтому легко уязвим. Помехи на пути осуществления своих намерений воспринимает как несправедливое к себе отношение, которое угнетает его.",
      '2,3,1,0': "Боится, что ситуация может стать ненадежной или неопределенной. Боится пустоты одиночества. Поэтому с повышенной чувствительностью напряженно следит за тем, относятся ли к нему с должным вниманием и надежно ли гарантирована его безо­пасность.",
      '3,0,1,2': "Воспринимает трудности в преодолении неприятных обстоятельств как давление про­тив него, которое невозможно вынести. Избегает напряженности в отношениях. Ищет ситуации, где к нему относились бы бережно и где он чувствовал бы себя в безо­пасности.",
      '3,0,2,1': "Не чувствует себя способным преодолеть трудности и отстоять свои требования. Уклоняется от напряженности конфликтных ситуаций и ищет удовлетворения в даю­щем удовольствие комфорте и душевной гармонии.",
      '3,1,0,2': "Считает свое состояние из-за разногласий и ожиданий, которые не сбываются, невы­носимо мучительным. Остро нуждается в покое и удовлетворенности.",
      '3,1,2,0': "Боится пустоты одиночества. Стремится к более тесной и полной сердечной близости с кем-то, чтобы быть уверенным, что его не бросят, и чтобы постоянно чувствовать удовлетворение.",
      '3,2,0,1': "Эмоциональное напряжение, вызванное внутренними противоречиями, стало невы­носимым, хотел бы от них спрятаться. Чрезмерно восприимчив и нуждается в покое, разрядке. Хочет, чтобы с ним обращались бережно.",
      '3,2,1,0': "Боится пустоты одиночества. Ищет опору и убежище в тесной сердечной связи. В ней же он видит гарантию своей безопасности и условие, при котором сбудутся не испол­нившиеся ранее желания."
    };

    ResultTableWidget.prototype.blueTextResults = {
      '0,1,2,3': "Противится связи, в которой чувствует себя зависимым и которая его не удовлет­воряет. Старается не привязываясь к кому-то сердцем беззаботно наслаждаться счас­тьем без навязчивых страхов, что надо чем-то жертвовать ради партнера.",
      '0,1,3,2': "Противится отношениям, в которых чувствует себя зависимым и которые не удовлет­воряют его. Стараясь не привязываться к кому-то сердцем, испытывает пристрастие к идеализированным объектам, воодушевляющим его.",
      '0,2,1,3': "Критически настроен и отвергает сердечную связь с партнером, в котором разочаро­вался. Не удовлетворен этой связью и считает, что она ставит его в зависимое поло­жение. Требует, чтобы считались с его пристрастиями. Стремится к независимости и беззаботности.",
      '0,2,3,1': "Не хочет быть преданным имеющейся сердечной связи, так как она не удовлетворяет его притязания на достоинство и уважение. Чтобы не потерять независимость, обуз­дывает свою склонность увлекаться.",
      '0,3,1,2': "Не желает быть преданным сердечной связи, чтобы всегда быть независимым. В отно­шениях держит партнера на определенном расстоянии, требует к себе уважения. Пред­почитает защищаться, критикуя других.",
      '0,3,2,1': "Чтобы не потерять независимость, не хочет быть преданным кому-то в сердечной связи. Требует к себе уважения и заверений в благосклонном отношении. Переоце­нивает собственные идеи и достижения. Ведет себя с партнером деспотично.",
      '1,0,2,3': "Оптимистическая настроенность по отношению к партнеру и к связи с ним. Хотел бы освободиться от чувства внутреннего одиночества, чтобы беззаботно наслаждаться счастьем.",
      '1,0,3,2': "Опасается пустоты одиночества. Партнер и увлечение им являются для него ценнос­тями, приносящими счастье и ставшими в его сознании доминирующим идеалом. С воодушевлением отдается этому чувству.",
      '1,2,0,3': "В желании установить контакт наталкивается на сопротивление и считает себя уни­женным. Поэтому чрезмерно чувствителен, уязвим и, особенно в отношении к близ­ким (партнеру или родителям), ведет себя бесцеремонно, беспечно, возмущаясь по любому поводу.",
      '1,2,3,0': "В восторге от своего партнера и от увлечения им. Став в его сознании доминирующим идеалом, этот восторг усилил у него чувство собственной значимости. Требует от партнера беспредельной преданности. Привязывает его к себе авторитарной заботой о нем, мотивируя это ответственностью за его благополучие.",
      '1,3,0,2': "Полный возмущение и неприязни, отворачивается от партнера, предпочитая быть независимым. Требует достойного отношения и уважения к себе.",
      '1,3,2,0': "В сердечных отношениях претендует на неограниченную взаимность, но, в то же вре­мя, боится, что придется разочароваться или потерять любовь. Чтобы как-то стабили­зировать свой эмоциональный тонус, старается быть независимым, однако нуждается в уважении.",
      '2,0,1,3': "С одной стороны, хотел бы избежать чувства одиночества и чувствует потребность в сердечном союзе, с другой - испытывает к партнеру предубеждение. Поэтому нас­троение его неустойчивое.",
      '2,0,3,1': "Хотел бы обязательно избежать ощущения, что его держат на расстоянии, и избавить­ся от чувства одиночества. Испытывает непреодолимую потребность с воодушевле­нием отдаться чувственному влечению как доминирующему в сознании идеалу.",
      '2,1,0,3': "Испытывает горькое разочарование в сердечной связи. Хотел бы беспрепятственно наслаждаться счастьем, но порывает отношения, чтобы избежать мучительных пере­живаний.",
      '2,1,3,0': "Испытывает непреодолимую потребность всего себя отдать чувственному сердечно­му влечению как доминирующему в сознании идеалу. Ожидает от партнера неогра­ниченной взаимности.",
      '2,3,0,1': "Испытывает в сердечной связи горькое разочарование. Порывает отношения, чтобы избежать мучительных переживаний. Хотел бы стать независимым и свободным, дабы не страдать от собственной чувствительности и обидчивости.",
      '2,3,1,0': "В сердечных отношениях претендует на неограниченную взаимность, но, в то же вре­мя, боится разочароваться или потерять любовь. Чтобы как-то стабилизировать свой эмоциональный тонус, старается держать себя независимо, однако из-за высокой чувствительности испытывает страдания, если не встречает от партнера должного внимания и уважения.",
      '3,0,1,2': "Опасается из-за утраты любви испытать чувство одиночества. Очень хочет беззаботно наслаждаться гармоничной сердечной связью, чувствуя себя защищенным.",
      '3,0,2,1': "Опасается из-за утраты любви испытать чувство одиночества. Испытывает непреодо­лимую потребность в гармоничных сердечных отношениях.",
      '3,1,0,2': "Страдает от отсутствия такой сердечной связи, которая удовлетворяла бы его. Счи­тает, что его состояние невыносимо и мечтает о беззаботном наслаждении и ощущении защищенности.",
      '3,1,2,0': "Испытывает настоятельную потребность создать крепкую и гармоничную сердечную связь.",
      '3,2,0,1': "Страдает от отношений, вызывающих мучительные волнения и горькие разочарова­ния. В этих связях стал чрезмерно чувствительным и пытается уклониться от них, чтобы найти необходимые разрядку или состояние покоя. Мечтает об ощущении за­щищенности.",
      '3,2,1,0': "Настойчиво стремится найти такие гармоничные сердечные отношения, которые бы его удовлетворяли. Претендует на безграничную взаимность в сердечных отноше­ниях и остро реагирует, если не встречает к себе внимания."
    };

    ResultTableWidget.prototype.greenTextResults = {
      '0,1,2,3': "Считает, что не обладает достаточной твердостью, чтобы добиться желаемого. Свою неуверенность компенсирует повышенной возбудимостью. Нуждается в атмосфере, соответствующей его возбужденному состоянию. Ищет такие контакты и такие об­стоятельства, которые поддерживали бы его в возбужденном состоянии. Развивает бурную деятельность, чтобы не впасть в состояние расслабления.",
      '0,1,3,2': "Старается утвердиться, не поддаваясь нецелесообразным потребностям и не прини­мая даже выгодные компромиссы. Однако умеет приспосабливаться.",
      '0,2,1,3': "Ищет отвечающих его особым требованиям встреч, которые возбуждают его и по-осо­бому очаровывают. Поскольку физические наслаждения не дают соответствующей разрядки, для отвлечения от внутреннего напряжения ему нужны «острые ощу­щения».",
      '0,2,3,1': "Хочет утвердиться, проявляя стойкость и самоуверенность. Хочет решать и действо­вать самостоятельно. Если надо, сдерживает и регулирует удовлетворение своих по­требностей. Может даже отказаться от удовлетворения. Не идет ни на какие компро­миссы.",
      '0,3,1,2': "Напряженно пытается утвердиться и справиться с ситуацией. Если для выполнения собственных намерений необходимо - умеет приспосабливаться.",
      '0,3,2,1': "Напрягает силу воли, чтобы справиться с желанием реализовать нецелесообраз­ные потребности или поддаться постороннему влиянию. Непременно, не обращая внимания на трудности или соблазны, хочет утвердиться.",
      '1,0,2,3': "Напряжение, вызываемое неудовлетворенными потребностями, воспринимает как внешнее нестерпимое давление. Стремится побыстрее удовлетворить эти потребнос­ти, чтобы снять напряжение.",
      '1,0,3,2': "Стремится утвердиться, проявляя стойкость и самоуверенность. Добиваясь своего, не проявляет излишнего упорства. Пользуется инициативой других с выгодой для себя.",
      '1,2,0,3': "Желает освободиться от заведенного порядка. Стремится к необычному и проявляет интерес к встречам, обещающим неожиданности.",
      '1,2,3,0': "Хочет занять определенное место в обществе, утвердиться в нем, проявляя твердость характера. Чтобы правильно ориентироваться, обязательно должен знать точку зре­ния окружающих по этому вопросу. Избегает ни к чему не обязывающих контактов.",
      '1,3,0,2': "Из-за перенапряжения недоволен существующим порядком. Это недовольство вы­зывает страх, который вытесняется. Хочет обратить на себя внимание своенравием, а оригинальностью добиться уважения. Любит выделяться необычными идеями и взглядами.",
      '1,3,2,0': "Хочет убедить себя и других в собственной независимости и превосходстве. Вследствие усиленного самоутверждения находится в напряженном состоянии. Упор­но настаивает на своем мнении. Непреклонен и защищается от постороннего влия­ния.",
      '2,0,1,3': "Стремление удовлетворить свои потребности, несмотря на трудности, вызвало силь­ное напряжение, которое истощает силу воли и оценивается как невыносимое. Поэ­тому стремление утвердить себя и возможность оказывать сопротивление другим ос­лаблены. Неспособен проявлять выдержку и целенаправленно проводить свою линию. Избегает беспокойства и уклоняется от сопротивления. Не уверен в себе и нереши­телен. Уступает, чтобы не отвечать за последствия.",
      '2,0,3,1': "Хочет утвердиться, занимая решительную позицию, но не находит в себе сил для нас­тойчивой и длительной борьбы, так как ему мешает то, что потребность в разрядке, благополучии и физической удовлетворенности хоть и регулируется, но не подав­ляется.",
      '2,1,0,3': "Не признает условностей и установленного порядка. Не принимает окончательных решений, чтобы не пришлось потом от них отказываться. Хочет быть оригинальным, ищет экстравагантных решений и встреч.",
      '2,1,3,0': "Хочет утвердиться, занимая решительную позицию, хотел бы не поддаваться посто­роннему влиянию. Однако отказывается от стремления к самоутверждению, если оно мешает достичь желанного для него физического удовлетворения и взаимодействия с другими.",
      '2,3,0,1': "Не признает условностей и установленного порядка. Хочет все делать по-своему, же­лает претворить в жизнь собственные оригинальные идеи и желания.",
      '2,3,1,0': "Считает, что его обошли. Противопоставляет себя создавшимся отношениям, воспри­нимая их как неприемлемый фактор, который, изнуряя, ослабляет твердость воли и стремление утвердить себя.",
      '3,0,1,2': "Считает, что он неспособен утвердить себя, чтобы быть выше трудностей и сопротив­ления. Предпочитает не мобилизовывать необходимую для твердости и настойчи­вости силу воли, а сразу уступать. Ищет лишенного конфликтов и напряжения сос­тояния удовлетворенности и приятности.",
      '3,0,2,1': "Испытывает потребность в разрядке, но не хочет не только отказаться от удовлет­ворения своих потребностей, но даже напрячь силу воли, чтобы сдерживать или хотя бы регулировать их. Стремится к постоянству тех отношений, которые приносят ему чувственное удовлетворение.",
      '3,1,0,2': "Главное для него - удовлетворение настоятельных потребностей в физических удо­вольствиях. Не хочет ни в чем себе отказывать. Воспринимает установленный поря­док как стесняющую помеху в стремлении беспрепятственно удовлетворять свои причудливые потребности.",
      '3,1,2,0': "Стремится к спокойствию и постоянству, которые могут обеспечить ему разрядку, комфорт и удовлетворение физических потребностей.",
      '3,2,0,1': "Испытывает тягу к удовлетворению настоятельных потребностей в физических удо­вольствиях. Не хочет приспосабливаться к обстановке. Не желает терпеть лишения. Отклоняет установленный порядок как стеснение или как помеху. Пытается осла­бить внутреннее напряжение, удовлетворяя непомерно большие потребности.",
      '3,2,1,0': "Стремление реализовать свои притязания, сталкиваясь с необходимостью адаптации, порождает конфликт. Не допускает постороннего влияния и, в то же время, уклоняется от принятия собственных решений. Избегает проблем, заглушая их удовлетво­рением потребностей в разрядке, комфорте и физическом удовольствии."
    };

    ResultTableWidget.prototype.redTextResults = {
      '0,1,2,3': "Легко возбудим. Нуждается в «острых ощущениях», чтобы разрядить повышенное внутреннее напряжение и заглушить страх перед скукой и неудовлетворенностью. По этой причине стремится пережить и прочувствовать все сам и жить по своему усмо­трению.",
      '0,1,3,2': "Ждет от других интенсивного выражения симпатии и живого участия. Считает, что не встречает даже предупредительного отношения и понимания. Не хочет испытывать чувство неудовлетворенности и скуку. Поэтому проявлять инициативу, чтобы вооду­шевить себя успехом и сделать более яркими переживания.",
      '0,2,1,3': "Неудовлетворенность сделала его более раздраженным и возбудимым. Накапли­вающееся возбуждение разряжает по первому подвернувшемуся под руку поводу. Отвергая все, пытается жить по своему усмотрению.",
      '0,2,3,1': "Ожидает от других, что они примут непосредственное активное участие в его интен­сивно развиваемой деятельности. Но обнаруживает у других отсутствие понимания и предупредительного отношения к себе. Но хочет возникновения чувства неудовлет­воренности, проявляет активность, заинтересованность происходящим и готовность им увлечься.",
      '0,3,1,2': "Чувство неудовлетворенности происходящим и отвращение к тем, кто не согласен с ним, вызывают раздражение, которое накапливается и с трудом сдерживается. Сущес­твует опасность его разрядки в виде мощной вспышки.",
      '0,3,2,1': "Ситуация его не удовлетворяет. Испытывает к ней сильное отвращение. Сдерживает свое возбуждение и пытается не поддаваться раздражению. Подавляемые агрессив­ные аффекты со временем вызывают повышенную чувствительность к физическим недомоганиям и депрессивную подавленность.",
      '1,0,2,3': "То ли из-за подавленности, то ли из-за пренебрежительного отношения к себе, чув­ствует себя настолько скованным, что это стеснение перерастает в невыносимое напряжение. Испытывает сильную потребность вырваться из оков стесняющей си­туации, чтобы, завоевав признание, свободно развернуться и жить по своему усмо­трению.",
      '1,0,3,2': "Хотел бы освободиться от собственной скованности и сдерживающих обстоятельств, чтобы, развернув собственную активность, воодушевить себя успехом и сделать бо­лее яркими свои переживания.",
      '1,2,0,3': "Испытывает мучительные волнения, чрезмерно раздражен. Хотел бы убежать от вы­зывающих чувство отвращения отношение, так как их, с одной стороны, уже нельзя изменить, с другой - нет больше сил сопротивляться.",
      '1,2,3,0': "Контролирует свои движущие импульсы, действует расчетливо и целеустремленно. Не хочет ссор, волнений и объяснений.",
      '1,3,0,2': "Испытывает сильное отвращение к отношениям, воспринимаемым как мучительные. Пытается сдерживать свое возбуждение, однако чрезмерное раздражение, которое они вызывают, обессиливает его и не дает возможности оказать сопротивление.",
      '1,3,2,0': "Считает, что к нему относятся с пренебрежением или что его эксплуатируют. Чув­ствует, что должен с этим бороться. Испытывает отвращение к несправедливым тре­бованиям. Занимает оборонительную позицию. Свое возбуждение и агрессивность сдерживает, но иногда теряет спонтанность и становится чересчур возбудимым.",
      '2,0,1,3': "Опасается, что из-за внутреннего стеснения или внешних ограничений не сможет сво­бодно действовать и все пережить. Стремится преодолеть стеснение и избавиться от ограничений, делающих поведение вынужденным, однако это вызывает повышенную возбудимость.",
      '2,0,3,1': "Защищается от ограничений, мешающих стремлению все пережить. Намерен, благо­даря собственной активности, показать, на что он способен.",
      '2,1,0,3': "Изнурен мучительным волнениями, чрезмерно раздражен. Легко возбудим. Боится, что поступит необдуманно.",
      '2,1,3,0': "Хочет активно действовать и интенсивно переживать. Однако при этом ищет постоян­ства и спокойных ситуаций и опасается, что если вдруг возникнут разногласия или его что-то разволнует, он может впасть в состояние чрезмерного возбуждения.",
      '2,3,0,1': "Не в состоянии больше переносить ситуацию, в которой находится, которая его не удовлетворяет и которую он оценивает как мучительную. Поэтому испытывает раздражение, которое, однако, сдерживает, чтобы не показать другим, что происходя­щие события вызывают у него отвращение, и чтобы не впасть в депрессивные сос­тояние.",
      '2,3,1,0': "Сдерживает свое раздражение, чтобы не показать другим, что он испытывает отвра­щение, и, по возможности, избежать невыносимых разногласий и переживаний.",
      '3,0,1,2': "Определенные обстоятельства ситуации воспринимает как помехи, но не хотел бы возникновения разногласий с другими из-за этого и появления раздражения. Желает, чтобы с ним обращались бережно.",
      '3,0,2,1': "Определенные обстоятельства ситуации воспринимает как помехи. Они стесняют его, но, тем не менее, чтобы избежать напряженности, не хотел бы провоцировать ссоры. Желал бы, чтобы какие-либо требования удовлетворялись мирным путем. Стремится к постоянству, спокойствию и удовлетворенности.",
      '3,1,0,2': "Состояние, в котором находится, оценивает как мучительное и чувствует, что уже не в состоянии его выносить. Перегружен, чрезмерно раздражен и истощен. Хотел бы, чтобы с ним обращались бережно, хотел бы чувствовать удовлетворенность.",
      '3,1,2,0': "Хотел бы, чтобы все требования друг к другу решались мирным путем. Избегает вол­нения. Хотел бы чувствовать удовлетворенность. Стремится к постоянству и спо­койствию.",
      '3,2,0,1': "Состояние, в котором он находится, считает мучительным и невыносимым. Требо­вания к нему, оцениваемые как несправедливые, вызывают перенапряжение. Чрез­мерно раздражен и, испытывая отвращение, уклоняется от этих требований. Хотел бы, чтобы с ним обращались бережно, относились к нему с вниманием.",
      '3,2,1,0': "Чрезмерно раздражен состоянием, которое его не удовлетворяет. Нуждается в осо­бом внимании. Для того чтобы снять напряжение и обрести спокойствие, желает по­быстрее удовлетворить свои потребности."
    };

    ResultTableWidget.prototype.yellowTextResults = {
      '0,1,2,3': "Данная ситуация его не удовлетворяет. Стремится решить ее по-новому, надеясь, что это принесет облегчение и создаст условия, благоприятствующие раскрытию его спо­собностей. Из-за этого напряженного ожидания возбужден.",
      '0,1,3,2': "Из-за отсутствия близких отношений, в которых можно было бы удовлетворить по­требность в приятном времяпрепровождении и во взаимной нежности, из-за страха, что упустит такой случай, если он представится, напряженно ждет нового случая, когда можно будет беспрепятственно пережить радость чувственных наслаждений.",
      '0,2,1,3': "Не согласен с имеющейся ситуацией, находя ее неудовлетворяющей. Ведет себя в этой связи напряженно, соблюдая дистанцию. Опасается, что его поставят в невыгодное положение или используют в своих интересах. Поэтому ставит упредительные усло­вия. Стремится изменить отношения так, чтобы возникла ясность и можно было бы найти выход.",
      '0,2,3,1': "Потребность в нежном отношении и в приятном времяпрепровождении почему-то не удовлетворена. Боится, что упустит случай удовлетворить ее, если такой подвернет­ся, и что его обойдут другие. Для того чтобы иметь возможность пережить радость чувственных наслаждений, ведет себя расчетливо.",
      '0,3,1,2': "Чувствует, что попал в ситуацию непонимания, которое воспринимается как оскорб­ление, бессердечное нежелание пойти навстречу, стремление использовать его в своих интересах и вызывает обиду. Поэтому держится от других на расстоянии и, на­пряженно следя за отношением к себе, защищается от критики или от бесцеремонных нападок.",
      '0,3,2,1': "Опасается, что его притязания встретят критику или отказ и это поставит его в не­выгодное положение, а его притязания в конце концов, проигнорируют. Поэтому за­щищает себя с напряженным вниманием и с помощью гибкой тактики. Следит за тем, чтобы не допустить нанесения ущерба собственным интересам.",
      '1,0,2,3': "Хотел бы освободиться от внутренних и внешних препятствий, найти контакт с окру­жающей средой и свободно проявить себя в новых условиях.",
      '1,0,3,2': "Усиленно стремится установить с окружающими прямой непосредственный контакт, чтобы переживать всю гамму чувств, возникающих между людьми в контакте. Ра­дуется этим чувствам.",
      '1,2,0,3': "Считает, что его отношения с окружающими неприятные и невыносимые. Поэтому ус­танавливает для других границу приемлемого и неприемлемого поведения и хочет пока держать себя на расстоянии, чтобы внести ясность, снять напряжение и найти выход.",
      '1,2,3,0': "Хочет, предварительно защитив себя от недооценки, возможности изоляции и воз­можных разочарований, насладиться радостью чувственных ощущений и пережи­ваний во время общения. Добивается выполнения своих желаний, ведя себя рас­четливо.",
      '1,3,0,2': "Определенная связь вызывает у него чувство отвращения. Пытается отделиться. Ус­танавливает для партнера жесткую границу между приемлемым и неприемлемым по­ведением. Держится по отношению к нему с холодным отчуждением.",
      '1,3,2,0': "Разочарован. Поэтому ведет себя осторожно. Держится на расстоянии, чтобы лишний раз не столкнуться с тем, что ему отказали или подвергли критике, недооценили или оскорбили. Чтобы не тешить себя иллюзиями, держится настороженно.",
      '2,0,1,3': "Стремится освободиться от неприятной ему ситуации, которая его удручает. Надеет­ся на полное понимание, предупредительное отношение и доброжелательность окру­жающих.",
      '2,0,3,1': "Стремится к доброжелательным и гармоничным, лишенным напряженности отноше­ниям и к приятным переживаниям.",
      '2,1,0,3': "Рвет отношения, чтобы избежать неприятных до такой степени чувств, что, как ему кажется, они могут его парализовать, и чтобы найти облегчение. Надеется на выход, полное понимание, предупредительное отношение и доброжелательность других.",
      '2,1,3,0': "Не хочет, чтобы появилось чувство одиночества и пустоты. Не хочет лишиться чув­ственных переживаний, но и не хочет ущемления личных интересов. Поэтому стре­мится к установлению гармоничных отношений, в которых никогда бы не возникало осложнений.",
      '2,3,0,1': "Чувствителен, легко раним. Чувствует себя униженным. Испытывает чувство отвра­щения к другим. С напряженным вниманием охраняет себя от любого проявления бестактности.              ",
      '2,3,1,0': "Чтобы защитить себя от горького разочарования, оскорбительного отказа и чтобы не обманывать себя иллюзиями, устанавливает другим границу между приемлемым и неприемлемым их поведением.",
      '3,0,1,2': "Мечтая о доброжелательном отношении, испытывает потребность в нежности и удо­вольствиях, чтобы благодаря им в благожелательной атмосфере забыть пренебрежи­тельное отношение и избавиться от чувства одиночества.",
      '3,0,2,1': "Испытывает потребность в установлении таких гармоничных непосредственных отно­шений, чтобы в них можно было, ничего не боясь, постоянно испытывать чувствен­ные наслаждения.",
      '3,1,0,2': "Неприятная ситуация вызывает отвращение, навевает скуку. А хотелось бы полного понимания, бережного и ласкового отношения.",
      '3,1,2,0': "Хотел бы, наслаждаясь приятной атмосферой, забыть пренебрежительное отношение, изоляцию и одиночество.",
      '3,2,0,1': "Недоволен, чувствует себя безрадостно и испытывает ко всему отвращение. А ему бы хотелось, чтобы с ним обращались бережно, ласково и нежно. Боится разочароваться, поэтому чрезмерно чувствителен и легко раним.",
      '3,2,1,0': "Испытывает чувство жалости к себе из-за несбывшихся ожиданий и пренебрежитель­ной недооценки. Мечтает о ласковом и нежном обращении. Хотел бы наслаждаться приятной атмосферой во взаимоотношениях."
    };

    ResultTableWidget.prototype.plusMinusText = [['+0', '-0', 'Противоречивость тенденций в сфере коммуникативной и общей активности. (Стремление к общению и боязнь общения одновременно.)'], ['+0', '-1', 'Тревожность и напряжение нивелируются пассивностью и отходом от эмоционально значимых контактов.'], ['+0', '-2', 'Эмоциональная напряженность нивелируется попыткой уйти от ответственных решений.'], ['+0', '-3', 'Усталость и ощущение бессилия болезненно переживаются и вызывают защитную реакцию ограничительного поведения, несмотря на решимость добиться своего.'], ['+0', '-4', 'Несбывшиеся надежды и тревога за будущее вызвали реакцию «ухода». Подавленность, страх перед неизвестностью.'], ['+0', '-5', 'Застенчивость и недоверчивость, повышенная требовательность к другим в межличностных контактах.'], ['+0', '-6', 'Проблема уязвленного самолюбия, повышенная застенчивость при выраженной потребности в общении.'], ['+0', '-7', 'Стремление оградить себя от посягательств на свою независимость, потребность в покое.'], ['+1', '-1', 'Противоречивость отношения к объекту привязанности от удовлетворенной до тревожно-неудовлетворенной.'], ['+1', '-2', 'Чувство собственного несовершенства, развившееся в результате неуспеха. Стремление уйти от ситуации, успокоиться, контролировать свои эмоции.'], ['+1', '-3', 'Беспокойство в связи с бессмысленностью дальнейшей борьбы на пути к достижению цели; потребность в доброжелательных отношениях и безопасности побуждает усилить самоконтроль.'], ['+1', '-4', 'Разочарования и страх перед будущим создают тревожный фон настроения. Потребность в гармонизации отношений с окружающими и повышении самоконтроля для избавления от чувства уязвленного самолюбия.'], ['+1', '-5', 'Потребность в глубокой привязанности не полностью удовлетворена, нет необходимого взаимопонимания, что приводит к повышению самоконтроля.'], ['+1', '-6', 'Потребность в повышении собственной позиции за счет усиления самоконтроля.'], ['+1', '-7', 'При выраженной самостоятельности и независимости стремление к избеганию конфликта за счет повышения самоконтроля.'], ['+2', '-0', 'Настойчивость в отстаивании своей позиции из опасения, что могут лоявиться препятствия на пути к достижению цели.'], ['+2', '-1', 'Эмоциональная неудовлетворенность в связи с ситуацией, ущемляющей самолюбие. Стремление избавиться от тревожного беспокойства, скрывая его подчеркнутой уверенностью и самостоятельностью.'], ['+2', '-2', 'Противоречивое соотношение между потребностью в самоутверждении и желанием избавиться от противодействия среды.'], ['+2', '-3', 'Переутомление и ощущение бессилия перед лицом трудностей, раздражение и горечь обиды. Повышенная чувствительность к критическим замечаниям в свой адрес.'], ['+2', '-4', 'Неудовлетворенность, бесперспективность, тревожные опасения, уязвленное самолюбие создают почву для беспокойства. Стремление отстоять свои позиции через упорство и требовательность к окружающим, сопротивляемость внешним обстоятельствам.'], ['+2', '-5', 'Рассудочный, пассивно-созерцательный подход, используемый для укрепления своих позиций и самоутверждения.'], ['+2', '-6', 'Потребность в самоуважении реализуется через признание своей значимости референтной группой.'], ['+2', '-7', 'Стеничное отстаивание своей самостоятельности, стремление к независимости и упрочению своих позиций.'], ['+3', '-0', 'Напряженная, лихорадочная активность, направленная на достижение цели в связи с опасением препятствий и помех.'], ['+3', '-1', 'Неудовлетворенность в связи с переживанием утраты или разлада в сфере глубокой привязанности. Стремление забыться в напряженной деятельности.'], ['+3', '-2', 'Трудности в преодолении препятствий породили тревогу и неуверенность в себе. Напряженность и стремление реализовать свои намерения могут привести к гневным реакциям.'], ['+3', '-3', 'Противоречивое соотношение между потребностью в самостоятельном принятии решений и желанием обрести покой.'], ['+3', '-4', 'Огорчения и чувство бесперспективности являются почвой для стресса. Трудности самореализации и разлад в межличностных контактах компенсируются напряженной деятельностью, направленной на достижение цели.'], ['+3', '-5', 'Спонтанность (свобода) самореализации ограничивается стремлением рассудочно взвесить все обстоятельства.'], ['+3', '-6', 'Спонтанная самореализация, доставляющая удовлетворение и повышающая собственную ценность в глазах других.'], ['+3', '-7', 'Стеничность в борьбе с ограничениями и препятствиями на пути самореализации, самостоятельность, потребность в независимости.'], ['+4', '-0', 'Опасения встретить препятствия на пути к достижению желаемых целей вызывает беспокойную активность, направленную на малопродуктивную деятельность.'], ['+4', '-1', 'Напряженность, вызванная неудовлетворенной потребностью в любви, теплых отношениях, ощущение непонятости. Беспокойные поиски новых взаимоотношений, которые могли бы принести радость и спокойствие.'], ['+4', '-2', 'Блокирована потребность в сохранении своих позиций и в уважении со стороны значимых окружающих. Активные поиски средств, которые могли бы повысить реноме личности. Внешнеобвиняющий тип реагирования. Склонность к навязчивым проявлениям.'], ['+4', '-3', 'Возбуждение, поведенческие реакции, импульсивность и повышенная раздражительность на фоне выраженного переутомления, нетерпимость к предъявляемым обстоятельствами требованиям. Ощущение собственного бессилия сочетается с надеждой на избавление от нависшей угрозы.'], ['+4', '-4', 'Противоречивое соотношение между оптимистичностью и пессимизмом. Неустойчивое настроение.'], ['+4', '-5', 'Категоричность в критической оценке ситуации, которая воспринимается как непродуманная и дезорганизующая. Потребность в ясности и полном понимании происходящего в целях упорядоченности и планомерности дальнейших действий.'], ['+4', '-6', 'Стремление изменить ситуацию, ущемляющую самолюбие, и произвести должное впечатление в сфере значимых межличностных контактов.'], ['+4', '-7', 'Стремление избежать любых ограничений, стесняющих свободу дальнейшего роста, повышения престижа личности.'], ['+5', '-0', 'Опасения помех на пути к достижению цели побуждает к интенсивному использованию интуитивно найденных способов самоактуализации.'], ['+5', '-1', 'Бегство в мир иллюзий, эстетики и искусства от печальной реальности и разочарований в сфере значимых межличностных контактов.'], ['+5', '-2', 'Спад усилий, направленных на достижение цели и повышение собственного статуса. Бегство в мир иллюзий.'], ['+5', '-3', 'Переутомление, стремление избежать возбуждения и новых усилий, бегство в мир иллюзий, более соответствующего собственным представлениям и требованиям.'], ['+5', '-4', 'Состояние разочарованности и бесперспективности, сопровождающееся тревогой и чувством беспомощности. Бегство в мир иллюзорных представлений, отвечающих собственному настроению и желаниям.'], ['+5', '-5', 'Противоречивое соотношение между иррациональной чувствительностью и рассудочной критичностью.'], ['+5', '-6', 'Впечатлительность. Стремление к своеобразным увлечениям, оригинальность и субъективизм в ценностной ориентации, чувствительность к средовым воздействиям и потребность в щадящей "социальной нише".'], ['+5', '-7', 'Ранимость в отношении критических замечаний, повышенное чувство независимости, потребность в свободе принятия решений и действий. Опора на интуицию и сугубо индивидуальный способ самореализации.'], ['+6', '-0', 'Тревожные опасения угрозы, усиливающие потребность в спокойствии и безопасности. Поиски условий, создающих чувство устойчивости и возможность расслабления.'], ['+6', '-1', 'Блокирована потребность в любви и теплых отношениях. Стремление к избеганию конфликтов и восстановлению душевных сил.'], ['+6', '-2', 'Тревожность и неуверенность в себе. Чувство приниженности, скрываемое из самолюбия, ощущение собственного бессилия перед лицом непреодолимых обстоятельств. Потребность в спокойной и безопасной обстановке, в расслаблении.'], ['+6', '-3', 'Переутомление, чувство бессилия, развившееся в процессе противодействия неблагоприятным обстоятельствам, создает ощущение беспомощности и несчастливости. Потребность в отдыхе и расслаблении.'], ['+6', '-4', 'Тревога и горькая убежденность в том, что бессмысленно надеяться на лучшее. Ощущение утраты сочувствия и признания со стороны значимых окружающих. Потребность в устойчивости собственной позиции и избавлении от страхов и напряженности.'], ['+6', '-5', 'Повышенная ранимость в конфликтных ситуациях при повышенной требовательности к социальному окружению.'], ['+6', '-6', 'Противоречивое соотношение между потребностью в безопасности и жаждой признания.'], ['+6', '-7', 'Потребность в спокойствии и безопасности.'], ['+7', '-0', 'Опасение возможных помех на пути реализации своих намерений вызывает критическое отношение к жизненным ценностям, защитную иронию и цинизм, за которыми скрывается беспомощность, чувство несостоятельности.'], ['+7', '-1', 'Неудовлетворена потребность в любви и понимании. Внешнеобвиняющая реакция на стресс, протестные формы поведения и высказываний.'], ['+7', '-2', 'Перенапряжение усилий, направленных на преодоление препятствий, вызвавшее тревогу и ощущение утраты престижности собственной позиции, тщательно скрываемое. Внешнеобвиняющая реакция, прикрывающая собственное бессилие.'], ['+7', '-3', 'Переутомление, непереносимость к сильным внешним воздействиям, бегство в мир иллюзий, ирреальность требований к окружению, ощущение несчастливости, протестные формы высказываний и поведения, потребность в самостоятельности принятия решений. Возможны импульсивные разрушительно-агрессивные поступки.'], ['+7', '-4', 'Страх, чувство бесперспективности, ощущение утраты личностной позиции, самоуничижение, скрываемое от окружающих и маскируемое нарочитой беспечностью.'], ['+7', '-5', 'Субъективизм и индивидуалистичность утрированы и проявляются • в виде негативизма и категоричного критиканства по отношению к любым мнениям и ценностям.'], ['+7', '-6', 'Императивная потребность в уважении, завышенные притязания, стремление претендовать на исключительность, отказ от обыденности и подчиненной позиции.'], ['+7', '-7', 'Противоречивое соотношение между отстаиванием собственной индивидуалистичности и негативным отношением ко всему окружающему.']];

    ResultTableWidget.prototype.term = {
      grayResults: 'серый: ',
      nextResults: '8 цветов(1): ',
      next2Results: '8 цветов(2): ',
      nextResultRow: 'анализ(1): ',
      next2ResultRow: 'анализ(2): ',
      mainResults: 'основные цвета: ',
      blueResults: 'синий: ',
      greenResults: 'зеленый: ',
      redResults: 'красный: ',
      yellowResults: 'желтый: ',
      NF: 'настроенность/фрустрированность: ',
      SP: 'спонтанность/полезависимость: ',
      RT: 'ригидность/транс: ',
      energy: 'энергичность/утомление: ',
      relaxation: 'расслабленность/напряженность: ',
      cold: 'хладнокровие/стресс: ',
      calm: 'спокойствие/тревожность: ',
      tolerance: 'терпимость/принципиальность: ',
      disposition: 'расположенность/критичность: ',
      sociability: 'общительность/замкнутость: ',
      conformity: 'конформность/фанатичность: ',
      rapture: 'восхищенность/возмущенность: ',
      cynthonity: 'синтония/асинтония: ',
      sympathy: 'симпатия/антипатия: ',
      love: 'любовь/ненависть: ',
      willingness: 'готовность/растерянность: ',
      curiosity: 'любопытство/скука: ',
      satiety: 'сытость/голод: ',
      friendliness: 'дружелюбие/враждебность: '
    };

    ResultTableWidget.prototype.createDom = function(self) {
      return this.div({
        "class": 'resultTable'
      }, function() {});
    };

    ResultTableWidget.prototype.opps = function(arr, polynom) {
      var multi, s, _i, _len;
      s = 0;
      for (_i = 0, _len = polynom.length; _i < _len; _i++) {
        multi = polynom[_i];
        s += (8 - arr.indexOf(multi[0])) * multi[1];
      }
      return s;
    };

    ResultTableWidget.prototype.showResult = function() {
      var bres, eres, gres, mres, n2res, row, row2, rres, yres;
      row = this.manager.nextResultRow;
      row2 = this.manager.next2ResultRow;
      n2res = this.manager.next2Results;
      gres = this.manager.grayResults;
      mres = this.manager.mainResults;
      bres = this.manager.blueResults;
      eres = this.manager.greenResults;
      rres = this.manager.redResults;
      yres = this.manager.yellowResults;
      this.dom.remChilds();
      return this.dom.add(function() {
        var k, v, _i, _len, _ref, _ref1, _results;
        this.div({
          "class": 'grayResults'
        }, function() {
          this.tn(this.mainWidget.term[this.className]);
          return this.tn(gres.join(','));
        });
        this.div({
          "class": 'nextResults'
        }, function() {
          this.tn(this.mainWidget.term[this.className]);
          return this.tn(this.mainWidget.manager.nextResults.toString());
        });
        this.div({
          "class": 'next2Results'
        }, function() {
          this.tn(this.mainWidget.term[this.className]);
          return this.tn(this.mainWidget.manager.next2Results.toString());
        });
        this.div({
          "class": 'nextResultRow'
        }, function() {
          this.tn(this.mainWidget.term[this.className]);
          return this.tn(row);
        });
        this.div({
          "class": 'next2ResultRow'
        }, function() {
          this.tn(this.mainWidget.term[this.className]);
          return this.tn(row2);
        });
        this.div({
          "class": 'mainResults'
        }, function() {
          this.tn(this.mainWidget.term[this.className]);
          return this.tn(this.mainWidget.manager.mainResults.join(','));
        });
        this.div({
          "class": 'blueResults'
        }, function() {
          this.tn(this.mainWidget.term[this.className]);
          return this.tn(this.mainWidget.manager.blueResults.join(','));
        });
        this.div({
          "class": 'greenResults'
        }, function() {
          this.tn(this.mainWidget.term[this.className]);
          return this.tn(this.mainWidget.manager.blueResults.join(','));
        });
        this.div({
          "class": 'redResults'
        }, function() {
          this.tn(this.mainWidget.term[this.className]);
          return this.tn(this.mainWidget.manager.redResults.join(','));
        });
        this.div({
          "class": 'yellowResults'
        }, function() {
          this.tn(this.mainWidget.term[this.className]);
          return this.tn(this.mainWidget.manager.blueResults.join(','));
        });
        this.br();
        this.div({
          "class": "NF"
        }, function() {
          var v;
          this.tn(this.mainWidget.term[this.className]);
          v = this.mainWidget.opps(n2res, [[4, 1], [3, 1], [1, 1], [7, -3]]);
          return this.tn("" + v + " (" + (v - 2.19) + ")");
        });
        this.div({
          "class": "SP"
        }, function() {
          var v;
          this.tn(this.mainWidget.term[this.className]);
          v = this.mainWidget.opps(n2res, [[3, 2], [4, 1], [7, 1], [2, -2], [1, -2]]);
          return this.tn("" + v + " (" + (v + 5.69) + ")");
        });
        this.div({
          "class": "RT"
        }, function() {
          var v;
          this.tn(this.mainWidget.term[this.className]);
          v = this.mainWidget.opps(n2res, [[4, 2], [2, 2], [6, 1], [5, -2], [0, -2], [3, -1]]);
          return this.tn("" + v + " (" + (v - 3.08) + ")");
        });
        this.br();
        this.div({
          "class": "energy"
        }, function() {
          var v;
          this.tn(this.mainWidget.term[this.className]);
          v = this.mainWidget.opps(n2res, [[3, 1], [2, -1]]);
          return this.tn("" + v + " (" + (v - (-1.21)) + ")");
        });
        this.div({
          "class": "relaxation"
        }, function() {
          var v;
          this.tn(this.mainWidget.term[this.className]);
          v = this.mainWidget.opps(n2res, [[5, 1], [6, -1]]);
          return this.tn("" + v + " (" + (v - 2.37) + ")");
        });
        this.div({
          "class": "cold"
        }, function() {
          var v;
          this.tn(this.mainWidget.term[this.className]);
          v = this.mainWidget.opps(n2res, [[0, 1], [7, -1]]);
          return this.tn("" + v + " (" + (v - (-1.98)) + ")");
        });
        this.div({
          "class": "calm"
        }, function() {
          var v;
          this.tn(this.mainWidget.term[this.className]);
          v = this.mainWidget.opps(n2res, [[4, 1], [1, -1]]);
          return this.tn("" + v + " (" + (v - (-1.75)) + ")");
        });
        this.div({
          "class": "tolerance"
        }, function() {
          var v;
          this.tn(this.mainWidget.term[this.className]);
          v = this.mainWidget.opps(n2res, [[2, 1], [5, -1]]);
          return this.tn("" + v + " (" + (v - 0.5) + ")");
        });
        this.div({
          "class": "disposition"
        }, function() {
          var v;
          this.tn(this.mainWidget.term[this.className]);
          v = this.mainWidget.opps(n2res, [[4, 1], [0, -1]]);
          return this.tn("" + v + " (" + (v - 1.82) + ")");
        });
        this.div({
          "class": "sociability"
        }, function() {
          var v;
          this.tn(this.mainWidget.term[this.className]);
          v = this.mainWidget.opps(n2res, [[3, 1], [7, -1]]);
          return this.tn("" + v + " (" + (v - 0.55) + ")");
        });
        this.div({
          "class": "conformity"
        }, function() {
          var v;
          this.tn(this.mainWidget.term[this.className]);
          v = this.mainWidget.opps(n2res, [[6, 1], [7, -1]]);
          return this.tn("" + v + " (" + (v - (-1.13)) + ")");
        });
        this.div({
          "class": "rapture"
        }, function() {
          var v;
          this.tn(this.mainWidget.term[this.className]);
          v = this.mainWidget.opps(n2res, [[3, 1], [0, -1]]);
          return this.tn("" + v + " (" + (v - 2.46) + ")");
        });
        this.div({
          "class": "cynthonity"
        }, function() {
          var v;
          this.tn(this.mainWidget.term[this.className]);
          v = this.mainWidget.opps(n2res, [[1, 1], [0, -1]]);
          return this.tn("" + v + " (" + (v - 3.37) + ")");
        });
        this.div({
          "class": "sympathy"
        }, function() {
          var v;
          this.tn(this.mainWidget.term[this.className]);
          v = this.mainWidget.opps(n2res, [[1, 1], [7, -1]]);
          return this.tn("" + v + " (" + (v - 1.80) + ")");
        });
        this.div({
          "class": "love"
        }, function() {
          var v;
          this.tn(this.mainWidget.term[this.className]);
          v = this.mainWidget.opps(n2res, [[5, 1], [7, -1]]);
          return this.tn("" + v + " (" + (v - 1.25) + ")");
        });
        this.div({
          "class": "willingness"
        }, function() {
          var v;
          this.tn(this.mainWidget.term[this.className]);
          v = this.mainWidget.opps(n2res, [[3, 1], [6, -1]]);
          return this.tn("" + v + " (" + (v - 1.65) + ")");
        });
        this.div({
          "class": "curiosity"
        }, function() {
          var v;
          this.tn(this.mainWidget.term[this.className]);
          v = this.mainWidget.opps(n2res, [[4, 1], [7, -1]]);
          return this.tn("" + v + " (" + (v - (-0.09)) + ")");
        });
        this.div({
          "class": "satiety"
        }, function() {
          var v;
          this.tn(this.mainWidget.term[this.className]);
          v = this.mainWidget.opps(n2res, [[2, 1], [6, -1]]);
          return this.tn("" + v + " (" + (v - 2.89) + ")");
        });
        this.div({
          "class": "friendliness"
        }, function() {
          var v;
          this.tn(this.mainWidget.term[this.className]);
          v = this.mainWidget.opps(n2res, [[4, 1], [2, -1]]);
          return this.tn("" + v + " (" + (v - (-1.84)) + ")");
        });
        this.h3({
          "class": 'conclusions'
        });
        this.div(function() {
          return this.tn(this.mainWidget.grayResultText["" + gres[0] + "," + gres[1] + "," + gres[4]]);
        });
        this.br();
        _ref = this.mainWidget.nextResultText;
        for (k in _ref) {
          v = _ref[k];
          if (row2.indexOf(k) !== -1) {
            this.div(function() {
              return this.tn(k);
            });
            this.div(function() {
              return this.tn(v);
            });
          }
        }
        this.br();
        this.p(function() {
          return this.tn(this.mainWidget.mainTextResults[mres.join(',')]);
        });
        this.p(function() {
          return this.tn(this.mainWidget.blueTextResults[bres.join(',')]);
        });
        this.p(function() {
          return this.tn(this.mainWidget.greenTextResults[eres.join(',')]);
        });
        this.p(function() {
          return this.tn(this.mainWidget.redTextResults[rres.join(',')]);
        });
        this.p(function() {
          return this.tn(this.mainWidget.yellowTextResults[yres.join(',')]);
        });
        this.br();
        _ref1 = this.mainWidget.plusMinusText;
        _results = [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          v = _ref1[_i];
          if ((row.indexOf(v[0]) !== -1 || row2.indexOf(v[0]) !== -1) && (row.indexOf(v[1]) !== -1 || row2.indexOf(v[1]) !== -1)) {
            this.div(function() {
              return this.tn("" + v[0] + v[1]);
            });
            _results.push(this.div(function() {
              return this.tn(v[2]);
            }));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      });
    };

    ResultTableWidget.prototype.showLessResult = function() {
      var gres, n2res, row, row2;
      row = this.manager.nextResultRow;
      row2 = this.manager.next2ResultRow;
      n2res = this.manager.next2Results;
      gres = this.manager.grayResults;
      this.dom.remChilds();
      return this.dom.add(function() {
        var k, v, _i, _len, _ref, _ref1, _results;
        this.h3({
          "class": 'conclusions'
        });
        this.p(function() {
          return this.tn(this.mainWidget.grayResultText["" + gres[0] + "," + gres[1] + "," + gres[4]]);
        });
        _ref = this.mainWidget.nextResultText;
        for (k in _ref) {
          v = _ref[k];
          if (row2.indexOf(k) !== -1) {
            this.p(function() {
              return this.tn(v);
            });
          }
        }
        _ref1 = this.mainWidget.plusMinusText;
        _results = [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          v = _ref1[_i];
          if ((row.indexOf(v[0]) !== -1 || row2.indexOf(v[0]) !== -1) && (row.indexOf(v[1]) !== -1 || row2.indexOf(v[1]) !== -1)) {
            _results.push(this.p(function() {
              return this.tn(v[2]);
            }));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      });
    };

    return ResultTableWidget;

  })(RedTeaWidget);

  SelectColorsYouLike = (function(_super) {
    __extends(SelectColorsYouLike, _super);

    function SelectColorsYouLike() {
      return SelectColorsYouLike.__super__.constructor.apply(this, arguments);
    }

    SelectColorsYouLike.register('selectColorsYouLike');

    SelectColorsYouLike.prototype.createDom = function(self) {
      return this.div({
        "class": 'window selectColorsYouLike'
      }, function() {
        this.div({
          "class": 'message'
        });
        return this.delayButton().bi('onClick', 'onClick', {
          context: self
        });
      });
    };

    SelectColorsYouLike.prototype.onClick = function() {
      this.fire('onClick');
      return this.removeSelf();
    };

    return SelectColorsYouLike;

  })(RedTeaWidget);

  WaitMomentBeforeselectColorsYouLike = (function(_super) {
    __extends(WaitMomentBeforeselectColorsYouLike, _super);

    function WaitMomentBeforeselectColorsYouLike() {
      return WaitMomentBeforeselectColorsYouLike.__super__.constructor.apply(this, arguments);
    }

    WaitMomentBeforeselectColorsYouLike.register('waitMomentBeforeselectColorsYouLike');

    WaitMomentBeforeselectColorsYouLike.prototype.createDom = function(self) {
      return this.div({
        "class": 'window waitMomentBeforeselectColorsYouLike'
      }, function() {
        this.div({
          "class": 'message'
        });
        return this.delayButton().bi('onClick', 'onClick', {
          context: self
        });
      });
    };

    WaitMomentBeforeselectColorsYouLike.prototype.onClick = function() {
      this.fire('onClick');
      return this.removeSelf();
    };

    return WaitMomentBeforeselectColorsYouLike;

  })(SelectColorsYouLike);

  SelectColorYouDontLike = (function(_super) {
    __extends(SelectColorYouDontLike, _super);

    function SelectColorYouDontLike() {
      return SelectColorYouDontLike.__super__.constructor.apply(this, arguments);
    }

    SelectColorYouDontLike.register('selectColorYouDontLike');

    SelectColorYouDontLike.prototype.createDom = function(self) {
      return this.div({
        "class": 'window selectColorYouDontLike'
      }, function() {
        this.div({
          "class": 'message'
        });
        return this.delayButton().bi('onClick', 'onClick', {
          context: self
        });
      });
    };

    return SelectColorYouDontLike;

  })(SelectColorsYouLike);

  SelectColorsYouDontLike = (function(_super) {
    __extends(SelectColorsYouDontLike, _super);

    function SelectColorsYouDontLike() {
      return SelectColorsYouDontLike.__super__.constructor.apply(this, arguments);
    }

    SelectColorsYouDontLike.register('selectColorsYouDontLike');

    SelectColorsYouDontLike.prototype.createDom = function(self) {
      return this.div({
        "class": 'window selectColorsYouDontLike'
      }, function() {
        this.div({
          "class": 'message'
        });
        return this.delayButton().bi('onClick', 'onClick', {
          context: self
        });
      });
    };

    return SelectColorsYouDontLike;

  })(SelectColorsYouLike);

  SelectColorYouLike = (function(_super) {
    __extends(SelectColorYouLike, _super);

    function SelectColorYouLike() {
      return SelectColorYouLike.__super__.constructor.apply(this, arguments);
    }

    SelectColorYouLike.register('selectColorYouLike');

    SelectColorYouLike.prototype.createDom = function(self) {
      return this.div({
        "class": 'window selectColorYouLike'
      }, function() {
        this.div({
          "class": 'message'
        });
        return this.delayButton().bi('onClick', 'onClick', {
          context: self
        });
      });
    };

    return SelectColorYouLike;

  })(SelectColorsYouLike);

  FooterWidget = (function(_super) {
    __extends(FooterWidget, _super);

    function FooterWidget() {
      return FooterWidget.__super__.constructor.apply(this, arguments);
    }

    FooterWidget.register('footer');

    FooterWidget.prototype.createDom = function(self) {
      return this.div({
        "class": 'footer'
      }, function() {
        this.a({
          "class": 'author',
          href: 'mailto:special-k@li.ru'
        }, function() {
          return this.tn('Разработано Кириллом Яковлевым.');
        });
        return this.span({
          "class": 'materials'
        }, function() {
          return this.tn('В тесте использовались работы Люшера М, Базыма Б.А, Джоса В.В');
        });
      });
    };

    return FooterWidget;

  })(RedTeaWidget);

}).call(this);
