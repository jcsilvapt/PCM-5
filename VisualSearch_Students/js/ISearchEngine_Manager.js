
let app = null;

function main() {
    let canvas = document.querySelector("canvas");
    app = new ISearchEngine("XML/Image_database.xml");
    app.init(canvas);
}

function Generate_Image(canvas) {
    var ctx = canvas.getContext("2d");
    var imgData = ctx.createImageData(100, 100);

    for (var i = 0; i < imgData.data.length; i += 4) {
        imgData.data[i + 0] = 204;
        imgData.data[i + 1] = 0;
        imgData.data[i + 2] = 0;
        imgData.data[i + 3] = 255;
        if ((i >= 8000 && i < 8400) || (i >= 16000 && i < 16400) || (i >= 24000 && i < 24400) || (i >= 32000 && i < 32400))
            imgData.data[i + 1] = 200;
    }
    ctx.putImageData(imgData, 150, 0);
    return imgData;
}

var actualTab = 'imagens';
var asSearch = false;

function setName(value) {
    document.getElementById("searchBar").placeholder = "Pesquisar "+value+"...";
    actualTab = value;
}
function drag(ev) {
    if(actualTab === 'imagens') {
        ev.dataTransfer.setData("text", ev.target.id);
        document.getElementById("searchBar").style.display = "none";
        document.getElementById("searchSub").style.display = "none";
        document.getElementById("toDrop").style.display = "block";
    }
}
function allowDrop(ev) {
    if(actualTab === 'imagens') {
        ev.preventDefault();
    }

}

function drop(ev) {
    if(actualTab === 'imagens') {
        ev.preventDefault();
        document.getElementById("toDrop").innerHTML = "";
        var data = ev.dataTransfer.getData("text");
        ev.target.appendChild(document.getElementById(data));
        document.getElementById("searchTi").style.display = "block";
        document.getElementById("loader").style.display = "block";
        setTimeout(function(){
            document.getElementById('results').style.display = "block";
            copyTo();
        }, 2000);
    }
}

function displaySearchOutPut() {
    document.getElementById('results').style.display = "block";
}

function copyTo() {
    var x = document.getElementById('toDrop').children;
    var toPlace = document.getElementById('results');
    var divR = document.createElement('div');
    divR.classList.add('result');
    var img = x[0];
    divR.appendChild(img);
    toPlace.appendChild(divR);
    document.getElementById("searchBar").style.display = "block";
    document.getElementById("searchSub").style.display = "block";
    document.getElementById("searchTi").style.display = "none";
    document.getElementById("loader").style.display = "none";
    document.getElementById("toDrop").style.display = "none";
    document.getElementById("toDrop").innerHTML = "Drop here to Search related Images";
}

function checkSearch() {
    if(asSearch){
        clearContent();
        asSearch = false;
    }
    let value = document.getElementById("searchBar").value;
    let imgLocation = null;
    var toPlace = document.getElementById('results');
    if(value.length > 0) {
        imgLocation = app.searchKeywords(value);
        if(imgLocation != false) {
            for (let i = 0; i < imgLocation.length; i++) {
                let divR = document.createElement('div');
                divR.classList.add('result');
                let img = document.createElement('img');
                img.src = imgLocation[i];
                img.id = "img"+i;
                divR.appendChild(img);
                toPlace.appendChild(divR);
            }
        }else {
            let temp = document.createElement('span');
            temp.innerHTML = "Não conseguimos descobrir nada :(";
            temp.classList.add('resultF');
            toPlace.appendChild(temp);
        }
        asSearch = true;
        displaySearchOutPut();
    }else {
        alert("OOps... Não tenho nada para procurar :(");
    }
}

function clearContent() {
    let node = document.getElementById('results');
    while(node.firstChild){
        node.removeChild(node.firstChild);
    }
    let temp = document.createElement('span');
    temp.classList.add('resultT');
    temp.innerHTML = "Resultados:";
    node.appendChild(temp);
}

function showModal() {
    let modal = document.getElementById('myModal');
    for(let i = 0; i < )
    let img = document.getElementById(value);
    let modalImg = document.getElementById("img01");
    img.onclick = function () {
        modal.style.display = "block";
        modalImg.src = this.src;
    }
    let span = document.getElementsByClassName("close")[0];
    span.onclick = function () {
        modal.style.display = "none";
    }
}