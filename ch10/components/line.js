function Line(x1, y1, x2, y2) {
  this.x = 0;
  this.y = 0;
  this.x1 = (x1 === undefined) ? 0 : x1;
  this.y1 = (y1 === undefined) ? 0 : y1;
  this.x2 = (x2 === undefined) ? 0 : x2;
  this.y2 = (y2 === undefined) ? 0 : y2;
  this.rotation = 0;
  this.scaleX = 1;
  this.scaleY = 1;
  this.lineWidth = 1;
}

Line.prototype.draw = function(ctx) {
  ctx.save();
  ctx.translate(this.x, this.y);
  ctx.rotate(this.rotation);
  ctx.scale(this.scaleX, this.scaleY);
  ctx.lineWidth = this.lineWidth;
  ctx.beginPath();
  ctx.moveTo(this.x1, this.y1);
  ctx.lineTo(this.x2, this.y2);
  ctx.closePath();
  ctx.stroke();
  ctx.restore();
};

Line.prototype.getBounds = function() {
  if (this.rotation === 0) {
    var minX = Math.min(this.x1, this.x2),
      minY = Math.min(this.y1, this.y2),
      maxX = Math.max(this.x1, this.x2),
      maxY = Math.max(this.y1, this.y2);

    return {
      x: this.x + minX,
      y: this.y + minY,
      width: maxX - minX,
      height: maxY - maxY
    };
  } else {
    var sin = Math.sin(this.rotation),
      cos = Math.cos(this.rotation),
      x1r = cos * this.x1 + sin * this.y1,
      x2r = cos * this.x2 + sin * this.y2,
      y1r = cos * this.y1 + sin * this.x1,
      y2r = cos * this.y2 + sin * this.x2;

    return {
      x: this.x + Math.min(x1r, x2r),
      y: this.y + Math.min(y1r, y2r),
      width: Math.max(x1r, x2r) - Math.min(x1r, x2r),
      height: Math.max(y1r, y2r) - Math.min(y1r, y2r)
    };
  }
};