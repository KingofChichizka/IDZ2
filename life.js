const size = 20;
matrix = [];
for(i = 0; i<size; i++)
{
    matrix.push([]);
    for(j = 0; j<size; j++)
    {
        //matrix[i].push(Math.random() > 0.5);
        matrix[i].push(false);
    }
}

window.onload = draw;

function draw()
{
world = document.getElementById("world");
world.innerHTML = "";
world.style.gridTemplateColumns = "repeat("+size+", 20px)";
worldDraw = "";
for(i = 0; i<size; i++)
{
    for(j = 0; j<size; j++)
    {
        if(matrix[i][j]) worldDraw += "<div class=\"cell\" style=\"background-color: white;\" id=\""+i+"-"+j+"\"></div>";
        else worldDraw += "<div class=\"cell\" style=\"background-color: black;\" id=\""+i+"-"+j+"\"></div>";
    }
}
world.innerHTML = worldDraw;
divs = document.getElementsByClassName("cell");
for(i = 0; i<divs.length; i++)
{
    divs[i].onclick = cellClick;
}
}

function cellClick()
{
    me = document.getElementById(this.id);
    coor = this.id.split('-');
    matrix[coor[0]][coor[1]] = !matrix[coor[0]][coor[1]];
    if(matrix[coor[0]][coor[1]]) me.style.backgroundColor = "white";
    else me.style.backgroundColor = "black";
}

function advance()
{
    buffMatrix = [];
    for(i = 0; i<size; i++)
    {
        buffMatrix.push([]);
        for(j = 0; j<size; j++)
        {
            buffMatrix[i].push(false);
        }
    }
    for(i = 0; i<size; i++)
    {
        for(j = 0; j<size; j++)
        {
            if(matrix[i][j])
            {
                if(countNeighbors(i, j) < 2) buffMatrix[i][j] = false;
                else if(countNeighbors(i, j) > 3) buffMatrix[i][j] = false;
                else buffMatrix[i][j] = matrix[i][j];
            }
            else
            {
                if(countNeighbors(i, j) == 3) buffMatrix[i][j] = true;
            }
        }
    }
    for(i = 0; i<size; i++)
    {
        for(j = 0; j<size; j++)
        {
            matrix[i][j] = buffMatrix[i][j];
        }
    }
    draw();
}

function countNeighbors(i, j)
{
    c = 0;
    if(getCell(i+1, j)) c++;
    if(getCell(i-1, j)) c++;
    if(getCell(i+1, j+1)) c++;
    if(getCell(i-1, j+1)) c++;
    if(getCell(i, j+1)) c++;
    if(getCell(i, j-1)) c++;
    if(getCell(i+1, j-1)) c++;
    if(getCell(i-1, j-1)) c++;
    return c;
}

function getCell(i, j)
{
    if(i < 0) i = size - 1;
    else if(i >= size) i = 0;
    if(j < 0) j = size - 1;
    else if(j >= size) j = 0;
    return matrix[i][j];
}

function generate()
{
    for(i = 0; i<size; i++)
    {
        for(j = 0; j<size; j++)
        {
            matrix[i][j] = Math.random() > 0.83;
        }
    }
    draw();
}

function clearWorld()
{
    for(i = 0; i<size; i++)
    {
        for(j = 0; j<size; j++)
        {
            matrix[i][j] = false;
        }
    }
    draw();
}