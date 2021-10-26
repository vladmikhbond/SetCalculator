const setA = new Set("red", 60);
const setB = new Set("green", 50);
const setC = new Set("blue", 40);

function Set(color, r) 
{
    this.color = color;
    this.r = r;   
    this.x = NaN;
    this.y = NaN;   
}

Set.prototype.setPos = function (x0, y0) {
    this.x = x0; this.y = y0;
}

Set.prototype.belong = function (x, y) {
    let dx = this.x - x, dy = this.y - y;
    return dx * dx + dy * dy < this.r * this.r;
}

Set.prototype.getMatrix = function() {
    const res = new Array(N);
    for (let row = 0; row < N; row++) {
        res[row] = new Array(N);
        for (let col = 0; col < N; col++) {
            let x = col * Kx, y = row * Ky;
            res[row][col] = this.belong(x, y) ? 1 : 0;
        }
    }
    return res;
}



