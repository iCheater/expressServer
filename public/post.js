
function loadDoc() {

    var elements = document.getElementById("myForm").elements;
    var obj ={};
    for(var i = 0 ; i < elements.length ; i++){
        var item = elements.item(i);
        obj[item.name] = item.value;
    }
    console.log(obj);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", '/admin/goods/add', true);
    xhr.setRequestHeader("Content-type", "application/json");

    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            console.log('server responsed:', this.responseText);
        }
    };

    xhr.send(JSON.stringify(obj));
}
