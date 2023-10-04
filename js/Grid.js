
let NoShip = true;
let Rotate = false;
let OneCellShip = false;
let TwoCellShip = false;
let ThreeCellShip = false;

// Function to create the initial table with buttons
function createInitialTable(rows, cols) {
    const tableBody = document.getElementById("table-body");


    //top row of numbers
    const row = document.createElement("tr");
    for (let i = 0; i < cols + 1; i++) {
        const col = document.createElement("td");
        col.textContent = `${i}`;
        col.classList.add("UnClickableTd");
        row.appendChild(col);
    }
    tableBody.appendChild(row);

    for (let i = 0; i < rows; i++) {
        const row = document.createElement("tr");
        const col1 = document.createElement("td");
        col1.textContent = `${i+1}`;
        col1.classList.add("UnClickableTd");
        row.appendChild(col1);
        for (let j = 0; j < cols; j++) {
            const cell = document.createElement("td");

            cell.addEventListener("mouseover", () => {
                assignHoverEventlisteners(row,cell,j)
            });
            cell.addEventListener("mouseout", () => {
                assignPostHoverEventlisteners(row,cell,j)
            });

            cell.classList.add("ClickableTd");
            row.appendChild(cell);
        }

        //left row of numbers
        const col2 = document.createElement("td");
        col2.classList.add("UnClickableTd");
        row.appendChild(col2);
        tableBody.appendChild(row);
    }
    tableCreated = true;
}

function assignHoverEventlisteners(row,cell,looppoint){
    if (NoShip){
        cell.style.opacity = 0.8;
        StopHoverLeft(cell);
        StopHoverRight(cell);
        StopHoverAbove(row,looppoint);
        StopHoverBelow(row,looppoint);
    }
    if (OneCellShip){
        cell.style.opacity = 0.5;
        StopHoverLeft(cell);
        StopHoverRight(cell);
        StopHoverAbove(row,looppoint);
        StopHoverBelow(row,looppoint);
    }
    if (TwoCellShip){
        cell.style.opacity = 0.5;
        if (Rotate){
            HoverAbove(row,looppoint,0.5);

            StopHoverBelow(row,looppoint);
            StopHoverRight(cell);
            StopHoverLeft(cell);
        }
        else
        {
            HoverRight(cell,0.5);

            StopHoverLeft(cell);
            StopHoverAbove(row,looppoint);
            StopHoverBelow(row,looppoint);
        }
    }
    if (ThreeCellShip){
        cell.style.opacity = 0.5;
        if (Rotate){
            HoverAbove(row,looppoint,0.5);
            HoverBelow(row,looppoint,0.5);

            StopHoverRight(cell);
            StopHoverLeft(cell);
        }
        else
        {
            HoverRight(cell,0.5);
            HoverLeft(cell,0.5);

            StopHoverAbove(row,looppoint);
            StopHoverBelow(row,looppoint);
        }
    }
}

function assignPostHoverEventlisteners(row,cell,looppoint){
    if (NoShip){
        cell.style.opacity = 1;
    }
    if (OneCellShip){
        cell.style.opacity = 1;
    }
    if (TwoCellShip){
        cell.style.opacity = 1;
        if (Rotate){
            StopHoverAbove(row,looppoint);
        }
        else
        {
            StopHoverRight(cell);
        }
    }
    if (ThreeCellShip){
        cell.style.opacity = 1;
        if (Rotate){
            StopHoverAbove(row,looppoint);
            StopHoverBelow(row,looppoint);
        }
        else
        {
            StopHoverRight(cell);
            StopHoverLeft(cell);
        }
    }
}

function HoverAbove(row, looppoint, opacity){
    const rowAbove = row.previousElementSibling;
    if (rowAbove) {
        const cellAbove = rowAbove.children[looppoint+1];
        if (cellAbove) {
            cellAbove.style.opacity = opacity;
        }
    }
}

function StopHoverAbove(row, looppoint){
    const rowAbove = row.previousElementSibling;
    if (rowAbove) {
        const cellAbove = rowAbove.children[looppoint+1];
        if (cellAbove) {
            cellAbove.style.opacity = 1;
        }
    }
}

function HoverBelow(row, looppoint, opacity){
    const rowBelow = row.nextElementSibling;
    if (rowBelow) {
        const cellBelow = rowBelow.children[looppoint+1];
        if (cellBelow) {
            cellBelow.style.opacity = opacity;
        }
    }
}

function StopHoverBelow(row, looppoint){
    const rowBelow = row.nextElementSibling;
    if (rowBelow) {
        const cellBelow = rowBelow.children[looppoint+1];
        if (cellBelow) {
            cellBelow.style.opacity = 1;
        }
    }
}

function HoverRight(cell, opacity){
    if (cell.nextSibling) {
        cell.nextSibling.style.opacity = opacity;
    }
}

function StopHoverRight(cell){
    if (cell.nextSibling) {
        cell.nextSibling.style.opacity = 1;
    }
}

function HoverLeft(cell, opacity){
    if (cell.previousSibling) {
        cell.previousSibling.style.opacity = opacity;
    }
}

function StopHoverLeft(cell){
    if (cell.previousSibling) {
        cell.previousSibling.style.opacity = 1;
    }
}

function reloadInitialTable() {
    if (tableCreated) {
        const tableBody = document.getElementById("table-body");
        tableBody.innerHTML = '';
        createInitialTable(10, 10);
    }
}

createInitialTable(10,10);

document.getElementById("NoShipButton").addEventListener("click", () => {
    NoShip = true;
    OneCellShip = false;
    TwoCellShip = false;
    ThreeCellShip = false;
    reloadInitialTable();
});

document.getElementById("RoteerButton").addEventListener("click", () => {
    Rotate = !Rotate;
    reloadInitialTable();
});

document.getElementById("OneCellShipButton").addEventListener("click", () => {
    NoShip = false;
    OneCellShip = true;
    TwoCellShip = false;
    ThreeCellShip = false;
    reloadInitialTable();
});

document.getElementById("TwoCellShipButton").addEventListener("click", () => {
    NoShip = false;
    OneCellShip = false;
    TwoCellShip = true;
    ThreeCellShip = false;
    reloadInitialTable();
});

document.getElementById("ThreeCellShipButton").addEventListener("click", () => {
    NoShip = false;
    OneCellShip = false;
    TwoCellShip = false;
    ThreeCellShip = true;
    reloadInitialTable();
});