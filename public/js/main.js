"use strict";

let subscribeBtns = document.getElementsByClassName("subscribeBtn");
let closeBtns = document.getElementsByClassName("fa-xmark");
let navbar = document.getElementById("navbarBtn");
let images = document.getElementsByClassName("image");
let mainImage = document.getElementById("image-main");
let forms = document.querySelectorAll("form");

for (let btn of subscribeBtns) {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    document.getElementById("subscribe").style.display = "flex";
  });
}
for (let btn of closeBtns) {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    btn.parentElement.parentElement.style.display = "none";
    document.getElementById("page-overlay").style.display = "none";
  });
}
navbar.addEventListener("click", function (e) {
  e.preventDefault();
  document.getElementById("page-overlay").style.display = "block";
  document.getElementById("sidebar").style.display = "block";
});
for (let image of images) {
  image.addEventListener("click", function (e) {
    e.preventDefault();
    let active = document.getElementsByClassName("active")[0];
    active.classList.remove("active");
    this.classList.add("active");
    let imageSrc = this.children[1].src;
    let room = this.children[1].name;
    mainImage.children[0].src = imageSrc;
    mainImage.children[1].innerText = room;
  });
}

for (let form of forms) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let result = true;
    let errors = form.querySelectorAll(".error");
    if (errors.length !== 0) {
      for (let error of errors) {
        this.removeChild(error);
      }
    }
    let inputs = this.querySelectorAll("input");
    for (let child of inputs) {
      if (isEmpty(child.value) === false) {
        console.log("here");
        if (child.name.includes("date")) {
          if (!isValidDate(child.value)) {
            let errorElement = document.createElement("p");
            errorElement.classList.add("error");
            errorElement.innerText = "Date is not valid";
            this.insertBefore(errorElement, child.nextElementSibling);
            result = false;
          }
        }
        if (child.name === "email") {
          if (!isValidEmail(child.value)) {
            let errorElement = document.createElement("p");
            errorElement.classList.add("error");
            errorElement.innerText = "Email is not valid";
            this.insertBefore(errorElement, child.nextElementSibling);
            result = false;
          }
        }
        if (child.name === "adults") {
          if (child.value < 1) {
            let errorElement = document.createElement("p");
            errorElement.classList.add("error");
            errorElement.innerText = "Must be greater than 0";
            this.insertBefore(errorElement, child.nextElementSibling);
            result = false;
          }
        }
      } else {
        let errorElement = document.createElement("p");
        errorElement.classList.add("error");
        errorElement.innerText = "The field is required";
        this.insertBefore(errorElement, child.nextElementSibling);
        result = false;
      }
    }
    if (result === true) {
      alert("submitted");
    }
  });
}

function isEmpty(value) {
  if (value.trim() !== "") {
    return false;
  } else {
    return true;
  }
}

function isValidEmail(value) {
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (value.trim().match(mailformat)) {
    return true;
  } else {
    return false;
  }
}

function isValidDate(value) {
  var reg = /^(0?[1-9]|[12][0-9]|3[01])[\/\-\.](0?[1-9]|1[012])[\/\-\.]\d{4}$/;
  if (value.match(reg)) {
    return true;
  } else {
    return false;
  }
}
