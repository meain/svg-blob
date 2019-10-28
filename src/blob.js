function create(root) {
  const canvas = document.createElement("canvas");
  canvas.setAttribute("touch-action", "none");
  root.appendChild(canvas);

  const resize = function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  window.addEventListener("resize", resize);
  resize();
  return canvas;
}

function getRandomArbitrary(min, max) {
  const amount = Math.random() * (max - min) + min;
  const sign = Math.random() < 0.4 ? -1 : 1;
  return sign * amount;
}

function getCirclePoints(count, base, radius) {
  // const angles = [0, 45, 90, 135, 180, 225, 270, 315]; // randomize gaps (360 omitted)
  const angles = [0, 90, 180, 270]; // randomize gaps (360 omitted)
  const positions = [];
  for (a in angles) {
    const angle = (angles[a] * Math.PI) / 180;
    let ba = ((angles[a] - 20) * Math.PI) / 180;
    let rr = radius + getRandomArbitrary(40, 80);
    positions.push({
      x: base.x + radius * Math.sin(angle),
      y: base.y + radius * Math.cos(angle),
      mx: base.x + rr * Math.sin(ba),
      my: base.y + rr * Math.cos(ba)
    });
  }
  positions.push(positions[0]);
  return positions;
}

function drawBlob(ctx) {
  let points = getCirclePoints(null, { x: 300, y: 300 }, 150);
  let cpath = `M${points[0].x},${points[1].y}`;
  for (let point of points)
    cpath += `S${point.mx},${point.my},${point.x},${point.y}`;
  cpath += "Z";

  let p = new Path2D(cpath);
  ctx.fillStyle = "rgb(229, 244, 216)";
  ctx.fill(p);

  // ctx.beginPath();
  // for (p of points) {
  //   ctx.arc(p.x, p.y, 2, 0, 2 * Math.PI);
  // }
  // ctx.strokeStyle = "red";
  // ctx.stroke();
  // ctx.beginPath();
  // ctx.strokeStyle = "green";
  // for (p of points) {
  //   ctx.arc(p.mx, p.my, 2, 0, 2 * Math.PI);
  // }
  // ctx.stroke();
}

const canvas = create(document.body);
const ctx = canvas.getContext("2d");

setInterval(() => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBlob(ctx);
}, 1000);
