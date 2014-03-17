(function() {
  Object.defineProperty(CanvasRenderingContext2D.prototype, 'rightPoly', {
    enumerable: false,
    value: function(x0, y0, outsideRadius, n) {
      var angle, i, _i, _ref;
      this.beginPath();
      this.moveTo(x0, y0 + outsideRadius);
      angle = 2 * Math.PI / n;
      for (i = _i = 1, _ref = n - 1; 1 <= _ref ? _i <= _ref : _i >= _ref; i = 1 <= _ref ? ++_i : --_i) {
        this.lineTo(x0 + Math.sin(angle * i) * outsideRadius, y0 + Math.cos(angle * i) * outsideRadius);
      }
      return this.closePath();
    }
  });

  Math.inBox = function(bbox, point) {
    return bbox[0].x <= point.x && bbox[1].x >= point.x && bbox[0].y <= point.y && bbox[1].y >= point.y;
  };

  Math.sqrHypot = function(xy1, xy2) {
    var dx, dy;
    dx = xy1.x - xy2.x;
    dy = xy1.y - xy2.y;
    return dx * dx + dy * dy;
  };

  Math._betweenX = function(bbox1, bbox2) {
    return bbox1[0].x < bbox2[0].x && bbox2[0].x < bbox1[1].x && bbox1[0].x < bbox2[1].x && bbox2[1].x < bbox1[1].x;
  };

  Math._betweenY = function(bbox1, bbox2) {
    return bbox1[0].y < bbox2[0].y && bbox2[0].y < bbox1[1].y && bbox1[0].y < bbox2[1].y && bbox2[1].y < bbox1[1].y;
  };

  Math._isBoxIntersect = function(bbox1, bbox2) {
    return Math.inBox(bbox1, bbox2[0]) || Math.inBox(bbox1, bbox2[1]) || Math.inBox(bbox1, {
      x: bbox2[0].x,
      y: bbox2[1].y
    }) || Math.inBox(bbox1, {
      x: bbox2[1].x,
      y: bbox2[0].y
    }) || (Math._betweenX(bbox1, bbox2) && Math._betweenY(bbox2, bbox1));
  };

  Math.isBoxIntersect = function(bbox1, bbox2) {
    return Math._isBoxIntersect(bbox1, bbox2) || Math._isBoxIntersect(bbox2, bbox1);
  };

  Object.defineProperty(Object, 'decapitalize', {
    enumerable: false,
    value: function(string) {
      return string.charAt(0).toLowerCase() + string.slice(1);
    }
  });

  Object.defineProperty(Number.prototype, 'toK', {
    enumerable: false,
    value: function() {
      var k, t;
      k = '';
      t = this;
      if (this >= 1000) {
        while (t > 1000) {
          t /= 1000;
          k += 'k';
        }
      }
      return Math.round(t * 10) / 10 + k;
    }
  });

  Object.defineProperty(String.prototype, 'camelizeLower', {
    enumerable: false,
    value: function() {
      return this.split('_').map(function(el) {
        return el.replace(el[0], el[0].toLocaleUpperCase());
      }).join('').replace(this[0].toLocaleUpperCase(), this[0].toLocaleLowerCase());
    }
  });

  Object.defineProperty(String.prototype, 'camelize', {
    enumerable: false,
    value: function() {
      return this.split('_').map(function(el) {
        return el.toLocaleLowerCase().replace(el[0], el[0].toLocaleUpperCase());
      }).join('');
    }
  });

  Object.defineProperty(String.prototype, 'underscore', {
    enumerable: false,
    value: function() {
      return this.replace(/([a-z\d])([A-Z]+)/g, '$1_$2').replace(/[-\s]+/g, '_').toLowerCase();
    }
  });

  Object.defineProperty(Object.prototype, 'toA', {
    enumerable: false,
    value: function() {
      var k, t, _i, _len, _ref;
      t = [];
      _ref = Object.keys(this);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        k = _ref[_i];
        t.push(this[k]);
      }
      return t;
    }
  });

  Object.defineProperty(Object, 'values', {
    enumerable: false,
    value: function(h) {
      var k, t, v;
      t = [];
      for (k in h) {
        v = h[k];
        t.push(v);
      }
      return t;
    }
  });

  Object.defineProperty(Array.prototype, 'intersect', {
    enumerable: false,
    value: function(b) {
      var ai, bi, result;
      ai = 0;
      bi = 0;
      result = [];
      while (ai < this.length && bi < b.length) {
        if (this[ai] < b[bi]) {
          ai += 1;
        } else if (this[ai] > b[bi]) {
          bi += 1;
        } else {
          result.push(this[ai]);
          ai += 1;
          bi += 1;
        }
      }
      return result;
    }
  });

  Object.defineProperty(Array.prototype, 'getAny', {
    enumerable: false,
    value: function() {
      if (this.length > 0) {
        return this[Math.floor(Math.random() * this.length)];
      } else {
        return null;
      }
    }
  });

  Object.defineProperty(Array.prototype, 'last', {
    enumerable: false,
    value: function() {
      if (this.length > 0) {
        return this[this.length - 1];
      } else {
        return null;
      }
    }
  });

  Object.defineProperty(Array.prototype, 'isInclude', {
    enumerable: false,
    value: function(el) {
      if (this.length > 0) {
        return this.indexOf(el) !== -1;
      } else {
        return false;
      }
    }
  });

}).call(this);
