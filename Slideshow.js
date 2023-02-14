// ==UserScript==
// @name         Slideshow
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Get images from wikihow article as a slideshow. Guess the title based on the pictures.
// @author       Munchma Coochie
// @match        https://www.wikihow.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    // this function looks a bit... IIFE!!!
    // goal is to guess the answer. So first, get the answer.
    let answer = getAnswer();
    console.log(answer);
    const images = document.getElementsByClassName("whcdn content-fill");
    var slideshow = {
        url_List : [],
        width_List : [],
        height_List : []
    };
    for (const pic of images){
        slideshow.url_List.push(pic.src);
        slideshow.width_List.push(pic.width);
        slideshow.height_List.push(pic.height);
    }
    removeAllChildNodes(document.body)
    renderAnswer(answer);
    for (let i=0; i<slideshow.url_List.length; i++){
        renderSlide(slideshow,i);}
})();

function getAnswer () {
const anchors = document.getElementsByTagName("a");
    for (const anchor of anchors){
        if (anchor.href == window.location.href){
            return anchor.innerHTML;
            break;
        }
    }
}

function renderAnswer(answer) {
    let div = document.createElement("div");
    let br = document.createElement("br");
    div.innerHTML = answer;
    div.id = "answer";
    div.style.filter = 'blur(10px)'
    div.style.fontSize = '300%';
    div.onclick = function(){this.style.filter='';};
    document.body.appendChild(div);
    document.body.appendChild(br);
}


function renderSlide (slideshow,n) {
    var div = document.createElement("div");
    div.style.backgroundImage = "url(" + slideshow.url_List[n] + ")";
    div.style.width = slideshow.width_List[n] + 'px';
    div.style.height = slideshow.height_List[n] + 'px';
    document.body.appendChild(div);
}


function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
