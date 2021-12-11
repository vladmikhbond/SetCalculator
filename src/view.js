function draw(matrix) 
{
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "lightgray";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // fill circles startig from the smallest 
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
    // current
    if (current) {
        let r = current.r;
        ctx.fillStyle = current.color;
        fillSet(ctx, current);
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


