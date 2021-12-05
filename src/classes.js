
class XSet {
   constructor(color, r) {
       this.color = color;
       this.r = r;
       //
       this.x = NaN;
       this.y = NaN;
       this.innerSet = new Set();
   }

   setInnerSet(str) {
       let set = str.trim().split('');
       this.innerSet = new Set(set);
       this.r = this.innerSet.size * 10;
       return this.innerSet;
   }

   setPos(x0, y0) {
       this.x = x0; this.y = y0;
   }

   belong(x, y) {
       let dx = this.x - x, dy = this.y - y;
       return dx * dx + dy * dy < this.r * this.r;
   }

   getMatrix() {
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
}
