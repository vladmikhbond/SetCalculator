// SETS ===============================

function drawSets(matrix) 
{
    const ctx = canvas.getContext("2d");
    clearCanvas(ctx);
    ctx.lineWidth = 2;
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
                    //ctx.fillStyle = row % 3 ? "black" : "white";
                    ctx.fillStyle = "white";
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

function clearCanvas(ctx) {
    ctx.fillStyle = "gray";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
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
    
    const ctx = canvas.getContext("2d");
    clearCanvas(ctx);
    ctx.font = '36px arial';
    ctx.textAlign = "center" ;
    ctx.textBaseline = "middle" ;

    let len = setU.innerSet.size;
    const sets = [setA, setB, setC, setR];
    let bins = sets.map(set => set.getBinaryStr());
    bins = bins.map(b => ("00000000000000000000000000000" + b).slice(-len));
    
    const dw = (canvas.width - 40) / len;
    const dh = (canvas.height - 50) / sets.length;
    ctx.lineWidth = 2;
    
    
    

    for( let row = 0; row < sets.length; row++) {
        let color = sets[row].color;  
        for(let col = 0; col < len; col++) {
            let x = col * dw + 20;
            let y = row * dh + 20;
            if (row == 3) y += 10;
            // draw cell
            ctx.fillStyle = color;
            ctx.fillRect(x, y, dw, dh); 
            ctx.strokeStyle = (row == 3) ? "black" : "white";
            ctx.strokeRect(x, y, dw, dh);
            // draw text in a cell
            ctx.fillStyle = (row == 3) ? "black" : "white";
            ctx.fillText(bins[row][col], x + dw/2, y+dh/2);
        }
    }
}

// EXTREMS ===============================

const bears = [new Image(), new Image(), new Image(), new Image()]; 
bears.forEach((img, i) => img.src = `pic/bear${i}.png`)
//
function drawExtrems(setR) 
{
    const ctx = canvas.getContext("2d");
    clearCanvas(ctx);
    //  
    let sets = [setA, setB, setC, setR];
    let maxHeigh = Math.max(...sets.map(s => +s.str));
    sets.forEach( (set, i) => {
        set.img = bears[i]; 
        set.h = set.str * (canvas.height - 10) / maxHeigh;
        set.w = set.h * 265 / 400;
        set.x = 10 + i * 120;
        set.y = canvas.height - set.h;
    });
    
    sets.sort((a, b) => b.str - a.str);
    
    for(let set of sets) {
        ctx.drawImage(set.img, set.x, set.y, set.w, set.h);
    }

    
 
}

