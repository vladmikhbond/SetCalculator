// SETS ===============================

 function drawSets(matrix) 
{
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "lightgray";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // рисуем круги в порядке возрастания радиуса 
    let sets = [setA, setB, setC].sort((a,b) => {
        // если есть запасное поле, радиус вдвое меньше
        let ar = a.z ? a.r/2 : a.r;
        let br = b.z ? b.r/2 : b.r;
        return br - ar;
    });   
    for (let set of sets) {
        ctx.fillStyle = set.color;
        fillSet(ctx, set);

    }   
    // matrix
    if (matrix) {
        const D = 1;
        for (let row = 0; row < ROWS; row++) {
            for (let col = 0; col < COLS; col++) {
                if (matrix[row][col]) {  
                    let x = col * Kx, y = row * Ky;
                    ctx.fillStyle = row % 3 ? "black" : "white";
                    ctx.fillRect(x - Kx/2, y - Ky/2, D, D);                
                }
            }
        }
    }
    // sets stroke    
    ctx.strokeStyle = "white";
    for (let s of [setA, setB, setC]) {
        strokeSet(ctx, s);   
    }   
}

function fillSet(ctx, set) {
    ctx.beginPath(); 
    ctx.arc(set.x, set.y, set.r, 0, Math.PI*2, true);  
    // есть запасное поле 
    if (set.z) {        
        ctx.arc(set.x + set.z, set.y, set.zr, 0, Math.PI*2, true);
    } 
    ctx.fill(); 
}

function strokeSet(ctx, set) {
    ctx.beginPath();
    ctx.arc(set.x, set.y, set.r, 0, Math.PI*2, true);
    ctx.moveTo(set.x + set.z + set.zr, set.y);  
    // есть запасное поле 
    if (set.z) {        
        ctx.arc(set.x + set.z, set.y, set.zr, 0, Math.PI*2, true);
    } 
    ctx.stroke();
}


// NUMBERS ===============================

function drawNumbers(setR) {
    //let len = maxBinLength;
    let max = Math.max(...[setA,setB,setC].map(s => +s.str));
    let len = Math.log2(max) + 1;
    len = ((len|0) == len) ? len : (len|0);
    let n = +setR.str;
    if (setR.str < 0)  setR.str = 2**len + setR.str;


    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "lightgray";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const sets = [setA, setB, setC, setR];
    let bins = sets.map(set => set.getBinaryStr());
    bins = bins.map(b => ("00000000000000000000000000000" + b).slice(-len));
    
    const dw = (canvas.width - 100) / len;
    const dh = (canvas.height - 50) / sets.length;
    ctx.lineWidth = 3;
    
    ctx.font = '36px arial';
    ctx.textAlign = "center" ;
    ctx.textBaseline = "middle" ;
    
    ctx.strokeStyle = "white";

    for( let r = 0; r < sets.length; r++) {
        let color = sets[r].color;  
        for(let c = 0; c < len; c++) {
            let x = c * dw + 50;
            let y = r * dh + 20;
            // move down result line
            if (r == 3) y += 10;
            
            if (bins[r][c] == 1) {
                ctx.fillStyle = color;
                ctx.fillRect(x, y, dw, dh);  
            } 
            ctx.strokeRect(x, y, dw, dh);
            // draw 0 or 1
            ctx.fillStyle = "white";
            ctx.fillText(bins[r][c], x + dw/2, y+dh/2);
        }
    }
}

// SETS ===============================

function drawExtrems(setR) 
{
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "lightgray";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //  
    let sets = [setA, setB, setC, setR]; 
    
    for(let i = 0; i < sets.length; i++) {
        let x = 20 + i * 120
        let y = 20;
        ctx.fillStyle = sets[i].color;
        ctx.fillRect(x, y, 100, sets[i].str*10);
    }

    
    
    // sets stroke    
    // ctx.strokeStyle = "white";
    // for (let s of [setA, setB, setC]) {
    //     strokeSet(ctx, s);   
    // }   
}

