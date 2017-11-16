function Segment(width, height, color) {
  this.x = 0;
  this.y = 0;
  this.width = width;
  this.height = height;
  this.vx = 0;
  this.vy = 0;
  this.rotation = 0;
  this.scaleX = 1;
  this.scaleY = 1;
  this.color = (color === undefined) ? '#ffffff' : utils.parseColor(color);
  this.lineWidth = 1;
}

Segment.prototype.draw = function(ctx) {
  var h = this.height,
    d = this.width + h,   // top-right diagonal
    cr = h / 2;           // corner radius

  ctx.save();
  ctx.translate(this.x, this.y);
  ctx.rotate(this.rotation);
  ctx.scale(this.scaleX, this.scaleY);
  ctx.lineWidth = this.lineWidth;
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.moveTo(0, -cr);
  ctx.lineTo(d - 2 * cr, -cr);
  ctx.quadraticCurveTo(-cr + d, -cr, -cr + d, 0);
  ctx.lineTo(-cr + d, h - 2 * cr);
  ctx.quadraticCurveTo(-cr + d, -cr + h, d - 2 * cr, -cr + h);
  ctx.lineTo(0, -cr + h);
  ctx.quadraticCurveTo(-cr, -cr + h, -cr, h - 2 * cr);
  ctx.lineTo(-cr, 0);
  ctx.quadraticCurveTo(-cr, -cr, 0, -cr);
  ctx.closePath();
  ctx.fill();
  (this.lineWidth > 0) && ctx.stroke();

  // draw 2 'pins'
  ctx.beginPath();
  ctx.arc(0, 0, 2, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(this.width, 0, 2, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.stroke();
  ctx.restore();
};

Segment.prototype.getPin = function() {
  return {
    x: this.x + Math.cos(this.rotation) * this.width,
    y: this.y + Math.sin(this.rotation) * this.width
  };
};