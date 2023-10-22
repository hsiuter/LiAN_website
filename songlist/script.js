document.body.onkeydown = function (e) {
    var keyCode = e.keyCode || e.which || e.charCode;
    var ctrlKey = e.ctrlKey || e.metaKey;
    if (ctrlKey && (keyCode == 83 || keyCode == 85 || keyCode == 73)) {
        e.preventDefault();
        return false;
    }
    else if (ctrlKey && (keyCode == 83 || keyCode == 85 || keyCode == 67)) {
        e.preventDefault();
        return false;
    } else if (keyCode && keyCode == 123) {
        return false;
    }
}

function clear() {
    Source = document.body.firstChild.data;
    document.open();
    document.close();
    document.title = "看不到源代码";
    document.body.innerHTML = Source;
}