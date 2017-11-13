function Ball(radius, color) {
  radius = radius || 40;
  color = color || '#ff0000';

  this.x = 0;
  this.y = 0;
  this.radius = radius;
  this.vx = 0;
  this.vy = 0;
  this.rotation = 0;
  this.scaleX = 1;
  this.scaleY = 1;
  this.color = utils.parseColor(color);
  this.lineWidth = 1;
}

Ball.prototype.draw = function(ctx) {
  ctx.save();
  ctx.translate(this.x, this.y);
  ctx.rotate(this.rotation);
  ctx.scale(this.scaleX, this.scaleY);
  ctx.lineWidth = this.lineWidth;
  ctx.fillStyle = this.color;
  ctx.beginPath();
  
  // x, y, radius, start_angle, end_angle, anti-clockwise
  ctx.arc(0, 0, this.radius, 0, (Math.PI*2), false);
  ctx.closePath();
  ctx.fill();
  (this.lineWidth > 0) && ctx.stroke();
  ctx.restore();
};

Ball.prototype.getBounds = function() {
  return {
    x: this.x - this.radius,
    y: this.y - this.radius,
    width: this.radius * 2,
    height: this.radius * 2
  };
};