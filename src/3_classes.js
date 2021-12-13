
class XSet {
    constructor(color, str) {
        this.color = color;
        this.str = str;
        this.innerSet = this.setInnerSet(str);
        this.x = this.y = 0;
        // запасное поле 
        this.z = this.zr = 0;
    }

    setInnerSet(str) {
        this.str = str;
        let arr = str.trim().split('').filter(c => c != ' ');
        this.innerSet = new Set(arr);
        this.r = this.innerSet.size * 10;
        return this.innerSet;
    }

    // SETS ======================

    setPos(x, y) {
        this.x = x; this.y = y;
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
        const res = new Array(ROWS);
        for (let row = 0; row < ROWS; row++) {
            res[row] = new Array(COLS);
            for (let col = 0; col < COLS; col++) {
                let x = col * Kx, y = row * Ky;
                res[row][col] = this.belong(x, y) ? 1 : 0;
            }
        }
        return res;
    }

    // NUMBERS =========================================

    // Если this.str содержит число, 
    // метод возвращает строку с его двоичным представлением
    getBinaryStr() {
        let n = Number.parseInt(this.str);
        return  n ? n.toString(2) : "0";
    }
}
