
let NoShip = true;
let Rotate = false;
let OneCellShip = false;
let TwoCellShip = false;
let ThreeCellShip = false;
let tableCreated = false;

// Function to create the initial table with buttons
function createInitialTable(rows, cols) {
    const tableBody = document.getElementById("table-body");
    let boat = false;

    //Create the top row of numbers here
    //All rows are unclickable by assigning the style class UnclickableTd
    const row = document.createElement("tr");
    for (let i = 0; i < cols + 1; i++) {
        const col = document.createElement("td");
        col.textContent = `${i}`;
        col.classList.add("UnClickableTd");
        row.appendChild(col);
    }
    tableBody.appendChild(row);

    //Create Rest of table
    for (let i = 0; i < rows; i++) {
        const row = document.createElement("tr");

        //Create number in front of clickable table
        const frontcol = document.createElement("td");
        frontcol.textContent = `${i+1}`;
        frontcol.classList.add("UnClickableTd");
        row.appendChild(frontcol);
        //Create clickable table
        for (let j = 0; j < cols; j++) {
            const cell = document.createElement("td");

            //add eventlisteners
            cell.addEventListener("click", () => {
                if (NoShip){
                    alert("selecteer eerst een schip");
                }
                else if(OneCellShip){
                    ShowBoat(i+1,j+1);
                    console.log(`Clicked Cell: Row ${i + 1}, Column ${j + 1}, OneCellShip`);
                }
                else if (TwoCellShip && Rotate){
                    ShowBoat(i+1,j+1);
                    ShowBoat(i,j+1);
                    console.log(`Clicked Cell: Row ${i + 1}, Column ${j + 1}, TwoCellShip & Rotate`);
                }
                else if (TwoCellShip){
                    ShowBoat(i+1,j+1);
                    ShowBoat(i+1,j+2);
                    console.log(`Clicked Cell: Row ${i + 1}, Column ${j + 1}, TwoCellShip`);
                }
                else if (ThreeCellShip && Rotate){
                    ShowBoat(i,j+1);
                    ShowBoat(i+1,j+1);
                    ShowBoat(i+2,j+1);
                    console.log(`Clicked Cell: Row ${i + 1}, Column ${j + 1}, ThreeCellShip & Rotate`);
                }
                else if (ThreeCellShip){
                    ShowBoat(i+1,j);
                    ShowBoat(i+1,j+1);
                    ShowBoat(i+1,j+2);
                    console.log(`Clicked Cell: Row ${i + 1}, Column ${j + 1}, ThreeCellShip`);
                }
            });
            cell.addEventListener("mouseover", () => {
                assignHoverEventlisteners(row,cell,j)
            });
            cell.addEventListener("mouseout", () => {
                assignPostHoverEventlisteners(row,cell,j)
            });
            cell.classList.add("ClickableTd");
            row.appendChild(cell);
        }

        //Row on the right of the table, to center the table in the middle of the page
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

document.getElementById("NoShipButton").addEventListener("click", () => {
    NoShip = true;
    OneCellShip = false;
    TwoCellShip = false;
    ThreeCellShip = false;
});
document.getElementById("RoteerButton").addEventListener("click", () => {
    Rotate = !Rotate;
});
document.getElementById("OneCellShipButton").addEventListener("click", () => {
    NoShip = false;
    OneCellShip = true;
    TwoCellShip = false;
    ThreeCellShip = false;
});
document.getElementById("TwoCellShipButton").addEventListener("click", () => {
    NoShip = false;
    OneCellShip = false;
    TwoCellShip = true;
    ThreeCellShip = false;
});
document.getElementById("ThreeCellShipButton").addEventListener("click", () => {
    NoShip = false;
    OneCellShip = false;
    TwoCellShip = false;
    ThreeCellShip = true;
});
document.getElementById("DatabaseButton").addEventListener("click", () => {
    const apiUrl = 'https://localhost:32768/api';
    fetch(apiUrl)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log('Database:', data);
        })
});
document.getElementById("EmptyDatabaseButton").addEventListener("click", () => {
    fetch(`/clear-database`, {
        method: "POST",

    }).then((response) => {
        if (response.status === 200) {
            alert("Database cleared successfully!");
        } else {
            alert("Error clearing database.");
        }
    })
        .catch((error) => {
            console.error("Error clearing database:", error);
        });
});

function ShowBoat(row, col) {
    const table = document.getElementById("table-body");

    // Change color of the cell
    const cell = table.rows[row].cells[col];
    cell.style.backgroundColor = "blue";
}

async function Loadboats() {
    const apiUrl = 'https://localhost:32768/api';

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            data.forEach(boat => {
                ShowBoat(boat.y,boat.x);
            })
        })

        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function PlaceShip(x,y) {
    x++;
    y++;

    const coordinates = [];
    if (OneCellShip) {
        coordinates.push(
            {x: x, y: y}
        );

    } else if (TwoCellShip) {
        if (Rotate) {
            coordinates.push(
                {x: x, y: (y - 1)},
                {x: x, y: y}
            );
        } else {
            coordinates.push(
                {x: x, y: y},
                {x: (x + 1), y: y}
            );
        }
    } else if (ThreeCellShip) {
        if (Rotate) {
            coordinates.push(
                {x: x, y: (y - 1)},
                {x: x, y: y},
                {x: x, y: (y + 1)}
            );
        } else {
            coordinates.push(
                {x: (x - 1), y: y},
                {x: x, y: y},
                {x: (x + 1), y: y}
            );
        }
    }
}

createInitialTable(10,10);
Loadboats();

