// a function to build the navigation bar dynamically
function navBuilder() {
    let fragment = document.createDocumentFragment(); // using fragment for better performance 
    // creating list element with anchor element child for each section and adding attributes and content to anchor element.
    for (section of sections) {
        let listElement = document.createElement("li");
        let anchorElement = document.createElement("a");
        anchorElement.setAttribute("href", `#${section.id}`);
        anchorElement.setAttribute("class", `menu__link`);
        anchorElement.textContent = `${section.dataset.nav}`;
        anchorElement.addEventListener("click", scrollToSection); // call scrollToSection function on click
        listElement.appendChild(anchorElement); // append a to li
        fragment.appendChild(listElement); // append li to fragment
    }
    navBarList.appendChild(fragment); // append the fragment to the ul element for one single time
}

// a function to make a smooth scroll to the desired section
function scrollToSection(event) {
    event.preventDefault();
    const secId = event.target.getAttribute("href");
    const currentSection = document.querySelector(secId);
    currentSection.scrollIntoView({behavior: "smooth" });
}

// a function to detect section in viewport and give it active class, also give active class to related link
function activeSectionDetect(){
    sections.forEach(section => {
        // get related link to current section
        const relatedAnchor  = document.querySelector(`a[href="#${section.id}"]`);
        
        /* get the position of current section relative to viewport using getBoundingClientRect method
         and add active class to section while being in viewport, also add active class to related link */
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop >= -200 && sectionTop <= 150){
            section.classList.add("your-active-class");
            relatedAnchor.classList.add("active");
        } else {
            section.classList.remove("your-active-class");
            relatedAnchor.classList.remove("active");
        }
    });
}

// a function to make "To Top" button appear after scrolling down and to scroll to top when clicking it
function goToTop () {
    let toTop = document.querySelector(".to_top");
    (this.scrollY >= 400) ? toTop.classList.add("show") : toTop.classList.remove("show");
    toTop.onclick = function () {
        window.scrollTo({top: 0, behavior: "smooth"});
    }
}

// a function that show the navbar while scrolling and hide it after 3.5 seconds if not scrolling (navbar is present on page load)
function navSwitcher() {
    if(timeoutID !== "undefined"){
        clearTimeout(timeoutID); // cancels any pending function previously established by calling setTimeout()
    }
    //show navbar 
    header.style.opacity = "1";
    navBarList.style.display = "block";
    // wait 3.5 seconds and hide navbar
    timeoutID = setTimeout(function(){ //assign the ID returned by "the call to setTimeout()" to timeoutID variable
        header.style.opacity = "0";
        setTimeout(function() {navBarList.style.display = "none"}, 500); // wait navbar to smoothly disappear and hide ul to avoid being clicked while opacity="0"
    }, 3500);
}

let header = document.querySelector(".page__header"); // assigning page header to a variable to be used in functions
let navBarList = document.getElementById("navbar__list"); // assigning ul to a variable to be used later in different functions
const sections = [...document.querySelectorAll("section")]; // making an array of all sections in the document
document.addEventListener("DOMContentLoaded", navBuilder); // Wait the initial HTML document to be loaded then call navBuilder function
window.addEventListener("scroll", activeSectionDetect); // call activeSectionDetect function on scroll event
window.addEventListener("scroll", goToTop); // call goToTop function on scroll event
let timeoutID; // undefined variable which will be used to store setTimeout() ID
document.addEventListener("scroll", navSwitcher); // call navSwitcher function on scroll event

