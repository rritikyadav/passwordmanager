// submit password function:
let remarkinput = document.querySelector(".remark input");
let usernameinput = document.querySelector(".username input");
let passwordinput = document.querySelector(".password input");
let passwordqueue = document.querySelector(".passwordsqueue");
let selectsite = document.querySelector(".selectsite select");
let submit = document.querySelector("#submit");
let site;

submit.addEventListener("click", () => {
    if (remarkinput.value === "" || usernameinput.value === "" || passwordinput.value === "") {
        alert("Please Fill All The Details")
    } else {
        site = selectsite.value;
        passwordqueue.innerHTML = passwordqueue.innerHTML + ` <div class="passwordbox ${site}">
            <img class="delete" src="./img/delete.svg">
            <div class="pass">
              <p>${remarkinput.value}</p>
              <img src="./img/eye.png" alt="" />
            </div>
            <div class="droppass">
                <div class="dropusername">
                    <p>${usernameinput.value}</p>
                    <img id="copyusername" src="./img/copy.svg" alt="">
                </div>
                <div class="droppassword">
                    <p>${passwordinput.value}</p>
                    <img id="copypassword" src="./img/copy.svg" alt="">
                </div>
            </div>
          </div>`
        //   remarkinput.value = "";
        //   usernameinput.value = "";
        //   passwordinput.value = "";
        droppingfunction();
        saveData();
    }
})


// dropping password section
const droppingfunction = () => {

    let droppass = document.querySelectorAll(".droppass");
    let pass = document.querySelectorAll(".pass");
    let allpasswordbox = document.querySelectorAll(".passwordbox");

    // deleting function
    allpasswordbox.forEach((box) => {
        box.addEventListener("click", (e) => {
            if (e.target.classList.contains("delete")) {
                box.remove();
                saveData();
            }
        })
    })

    // giving index to showdrop
    pass.forEach((pass, index) => {
        pass.addEventListener("click", () => {
            showdrop(index);
        })
    })

    // showing username and password
    const showdrop = (index) => {
        if (droppass[index].classList.contains("showdrop")) {
            droppass[index].classList.remove("showdrop");
            pass[index].children[1].src = "./img/eye.png";
            allpasswordbox[index].children[0].style.display = "none";
        } else {
            droppass[index].classList.add("showdrop");
            pass[index].children[1].src = "./img/unsee.png";
            allpasswordbox[index].children[0].style.display = "block";
        }
    }
    saveData();
}



let formsection = document.querySelector(".passworddetails");
let queueheading = document.querySelector(".queueheading");
let add = document.querySelector("#add");
let sites = document.querySelectorAll(".site");
sites.forEach((site) => {
    site.addEventListener("click", (e) => {
        let text = e.target.innerText.replace(" ", "").trim();
        formsection.style.display = "none";
        add.style.display = "block";
        document.querySelectorAll(".passwordbox").forEach((box) => {
            box.style.display = box.classList.contains(text)? "block":"none";
        });
        queueheading.children[1].innerText = e.target.innerText;
        queueheading.children[0].src = `./img/${text}.png`;
    });
});


// event liastener for the add new btn
add.addEventListener("click", (e) => {
    formsection.style.display = "flex";
    add.style.display = "none";
});


// saving data in local 
let saveData = () => {
    localStorage.setItem("data", passwordqueue.innerHTML);
    // droppingfunction();
};

// getting all data when page loaded
let getData = () => {
    const savedData = localStorage.getItem("data");
    if (savedData) {
        passwordqueue.innerHTML = savedData;
        droppingfunction();
    }
};
getData();
localStorage.clear();