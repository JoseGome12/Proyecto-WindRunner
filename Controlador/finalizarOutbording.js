//localStorage.setItem('outbording', 1)
document.getElementById("botonF").addEventListener("click", function() {
    localStorage.setItem('outbording', 0)
    window.open('Main.html','_self')
});