function Box(width, height, color) {
  width = width || 50;
  height = height || 50;
  color = color || '#ff0000';

  this.x = 0;
  this.y = 0;
  this.width = width;
  this.height = height;
  this.vx = 0;
  this.vy = 0;
  this.rotation = 0;
  this.scaleX = 1;
  this.scaleY = 1;
  this.color = utils.parseColor(color);
  this.lineWidth = 1;
}

Box.prototype.draw = function(ctx) {
  ctx.save();
  ctx.translate(this.x, this.y);
  ctx.rotate(this.rotation);
  ctx.scale(this.scaleX, this.scaleY);
  ctx.lineWidth = this.lineWidth;
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.rect(0, 0, this.width, this.height);
  ctx.closePath();
  ctx.fill();
  if (this.lineWidth > 0) {
    ctx.stroke();
  }
  ctx.restore();
};