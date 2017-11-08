// window.requestAnimationFrame
if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = (window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) {
      return window.setTimeout(callback, 1000/60);
    });
}

// window.cancelRequestAnimationFrame
if (!window.cancelRequestAnimationFrame) {
  window.cancelRequestAnimationFrame = (window.cancelAnimationFrame ||
    window.webkitCancelRequestAnimationFrame ||
    window.mozCancelRequestAnimationFrame ||
    window.oCancelRequestAnimationFrame ||
    window.msCancelRequestAnimationFrame ||
    window.clearTimeout);
}

window.utils = {};

window.utils.captureMouse = function(element) {
  var bodyElem = document.body,
    docElem = document.documentElement,
    mouse = { x: 0, y: 0, event: null },
    bodyScrollLeft = bodyElem.scrollLeft,
    bodyScrollTop = bodyElem.scrollTop,
    docScrollLeft = docElem.scrollLeft,
    docScrollTop = docElem.scrollTop,
    offsetLeft = element.offsetLeft,
    offsetTop = element.offsetTop;

  element.addEventListener('mousemove', function(e) {
    var x, y;

    if (e.pageX || e.pageY) {
      x = e.pageX;
      y = e.pageY;
    } else {
      x = e.clientX + bodyScrollLeft + docScrollLeft;
      y = e.clientY + bodyScrollTop + docScrollTop;
    }

    x -= offsetLeft;
    y -= offsetTop;

    mouse.x = x;
    mouse.y = y;
    mouse.event = e;
  }, false);

  return mouse;
};

window.utils.captureTouch = function(element) {
  var bodyElem = document.body,
    docElem = document.documentElement,
    finger = { x: null, y: null, isPressed: false, event: null },
    bodyScrollLeft = bodyElem.scrollLeft,
    bodyScrollTop = bodyElem.scrollTop,
    docScrollLeft = docElem.scrollLeft,
    docScrollTop = docElem.scrollTop,
    offsetLeft = element.offsetLeft,
    offsetTop = element.offsetTop;

  element.addEventListener('touchstart', function(e) {
    finger.isPressed = true;
    finger.event = e;
  }, false);

  element.addEventListener('touchmove', function(e) {
    var x, y, touch = e.touches[0];

    if (touch.pageX || touch.pageY) {
      x = touch.pageX;
      y = touch.pageY;
    } else {
      x = touch.clientX + bodyScrollLeft + docScrollLeft;
      y = touch.clientY + bodyScrollTop + docScrollTop;
    }

    x -= offsetLeft;
    y -= offsetTop;

    finger.x = x;
    finger.y = y;
    finger.event = e;
  }, false);

  element.addEventListener('touchend', function(e) {
    finger.isPressed = false;
    finger.x = null;
    finger.y = null;
    finger.event = e;
  }, false);

  return finger;
};

window.utils.parseColor = function(color, toNumber) {
  if (toNumber === true) {
    if (typeof color === 'number') {
      return (color | 0); //chop off decimal
    }
    if (typeof color === 'string' && color[0] === '#') {
      color = color.slice(1);
    }
    return window.parseInt(color, 16);
  } else {
    if (typeof color === 'number') {
      color = '#' + ('00000' + (color | 0).toString(16)).substr(-6); //pad
    }
    return color;
  }
};

window.utils.colorToRGB = function(color, alpha) {

  //number in octal format or string prefixed with #
  if (typeof color === 'string' && color[0] === '#') {
    color = window.parseInt(color.slice(1), 16);
  }
  alpha = (alpha === undefined) ? 1 : alpha;

  //parse hex values
  var r = color >> 16 & 0xff,
      g = color >> 8 & 0xff,
      b = color & 0xff,
      a = (alpha < 0) ? 0 : ((alpha > 1) ? 1 : alpha);
      
  //only use 'rgba' if needed
  if (a === 1) {
    return "rgb("+ r +","+ g +","+ b +")";
  } else {
    return "rgba("+ r +","+ g +","+ b +","+ a +")";
  }
};

window.utils.containsPoint = function(rect, x, y) {
  return !(x < rect.x || 
    x > rect.x + rect.width ||
    y < rect.y ||
    y > rect.y + rect.height);
};

window.utils.intersects = function(rectA, rectB) {
  return !(rectA.x + rectA.width < rectB.x ||
    rectB.x + rectB.width < rectA.x ||
    rectA.y + rectA.height < rectB.y ||
    rectB.y + rectB.height < rectA.y);
};