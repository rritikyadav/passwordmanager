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

        //   making all the input null
          remarkinput.value = "";
          usernameinput.value = "";
          passwordinput.value = "";

        // working of saved button
        let done = document.querySelector(".done");
        done.style.width = "9vw";
        done.style.opacity = "1";
        done.style.bottom = "5vh";

        // again hiding the saved button
        setTimeout(() => {
            done.style.width = "0vw";
            done.style.opacity = "0";
            done.style.bottom = "0vh";
        },2000)

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
    // saveData();
}


// working of saved passwords
let formsection = document.querySelector(".passworddetails");
let add = document.querySelector("#add");
let sites = document.querySelectorAll(".site");
sites.forEach((site) => {
    site.addEventListener("click", (e) => {
        let text = e.currentTarget.children[1].innerText.replace(" ", "").trim();
        formsection.style.display = "none";
        add.style.display = "block";

        // filtering passwords
        document.querySelectorAll(".passwordbox").forEach((box) => {
            box.style.display = box.classList.contains(text)? "block":"none";
        });
        
        // changing heading of the heading of paswords:-
        let queueheading = document.querySelector(".queueheading");
        queueheading.classList.remove("hidequeueheading")
        queueheading.children[1].innerText = e.currentTarget.children[1].innerText;
        queueheading.children[0].src = `./img/${text}.png`;
    });
});


// event liastener for the add new btn
add.addEventListener("click", (e) => {
    formsection.style.display = "flex";
    add.style.display = "none";
    let queueheading = document.querySelector(".queueheading");
    queueheading.classList.add("hidequeueheading");
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
// localStorage.clear();