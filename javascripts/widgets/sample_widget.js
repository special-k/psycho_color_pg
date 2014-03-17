(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  glob.SampleWidget = (function(_super) {
    __extends(SampleWidget, _super);

    function SampleWidget() {
      return SampleWidget.__super__.constructor.apply(this, arguments);
    }

    SampleWidget.register('sampleWidget');

    SampleWidget.prototype.createDom = function() {
      return this.div(function() {
        return this.tn('hi!');
      });
    };

    return SampleWidget;

  })(RedTeaWidget);

}).call(this);
