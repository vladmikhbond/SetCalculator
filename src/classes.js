
class XSet {
   constructor(color, r) {
       this.color = color;
       this.r = r;
       this.x = NaN;
       this.y = NaN;
       this.innerSet = new Set();
       // запасное поле
       this.z = 0;   
       this.zr = 0;
   }

   setInnerSet(str) {
       let arr = str.trim().split('').filter(c => c != ' ');
       this.innerSet = new Set(arr);
       this.r = this.innerSet.size * 10;
       return this.innerSet;
   }

   setPos(x0, y0) {
       this.x = x0; this.y = y0;
   }

    belong(x, y) {
        let dx = this.x - x;   
        let dy2 = (this.y - y) ** 2; 
        if (dx * dx + dy2 < this.r * this.r) 
            return true;
        // есть запасное поле
        if (this.z) {
            dx = this.x + this.z - x;
            if (dx * dx + dy2 < this.zr * this.zr) 
                return true;           
        }
        return false;
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
