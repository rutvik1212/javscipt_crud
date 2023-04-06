let myjson = [
    {
        "country": "India",
        "statelist": [
            {
                "state": "Gujarat",
                "cityList": [
                    "surat",
                    "Ahemdabad",
                    "Gandhinagar"
                ]
            },
            {
                "state": "Karnataka",
                "cityList": [
                    "Bangluru",
                    "Mangluru",
                    "Mysuru"
                ]
            },
            {
                "state": "Maharastra",
                "cityList": [
                    "Pune",
                    "Mumbai",
                    "Kanpur"
                ]
            }
        ]
    },
    {
        "country": "China",
        "statelist": [
            {
                "state": "Henan",
                "cityList": [
                    "Anyang",
                    "Nanyang",
                    "Puyang"
                ]
            },
            {
                "state": "Yunan",
                "cityList": [
                    "Yuxi",
                    "Dali",
                    "Baoshan"
                ]
            },
            {
                "state": "Jhejiang",
                "cityList": [
                    "Yiwu",
                    "Huzhou",
                    "ziaxing"
                ]
            }
        ]
    },
    {
        "country": "USA",
        "statelist": [
            {
                "state": "Alaska",
                "cityList": [
                    "Juneau",
                    "Anchorage",
                    "Sitka"
                ]
            },
            {
                "state": "Florida",
                "cityList": [
                    "Tallahassee",
                    "Miami",
                    "Tampa"
                ]
            },
            {
                "state": "NewYork",
                "cityList": [
                    "Albany",
                    "Manhattan",
                    "Bronx"
                ]
            }
        ]
    }
]

// for country Selection
let country = document.getElementById("country");
let arr = [];
for (let key of myjson) {
    let elm = document.createElement("option");
    elm.textContent = key.country;
    arr.push(elm.textContent)
    // country.append(elm)
}

arr.unshift("Please select country");
let str = "";
arr.map(x => {
    return str += `<option>${x}</option>`
})
country.innerHTML = str;



// for state selection
country.addEventListener("change", function () {
    state_change();
})

function state_change() {
    let state = document.getElementById("state")
    let arr2 = [];
    for (let key of myjson) {
        let country = document.getElementById("country").value;
        // console.log("country" + " " + country)
        let elm = document.createElement("option");
        if (key.country == country) {
            key.statelist?.map(x => {
                elm.textContent = x.state;
                arr2.push(x.state)
            })
        }
    }
    let placeholder = state.setAttribute("placeholder", "Please select state")
    // console.log(state)
    arr2.unshift("Please select state");
    let str2 = "";
    arr2.map(x => {
        return str2 += `<option>${x}</option>`
    })
    state.innerHTML = str2;
}

// for city selection
let city = document.getElementById("city");
state.addEventListener("change", function () {
    city_change();
})

function city_change() {
    let arr3 = [];
    let str3 = "";

    for (let key of myjson) {
        let state = document.getElementById("state").value;
        let elm = document.createElement("option");
        // elm.setAttribute("placeholder" , "Please select city")[0];
        // console.log(key.statelist)
        key.statelist?.map(x => {
            if (x.state == state) {
                elm.textContent = x.cityList;
                x.cityList.forEach(x => {
                    arr3.push(x)
                })
            }
        })
    }
    arr3.unshift("Please select city")
    arr3.map(x => {
        return str3 += `<option>${x}</option>`
    })
    city.innerHTML = str3;
}


//whenever i change country i need state and city field option is that please select state/city
country.addEventListener("change", function () {
    city.innerHTML = "Please select city";
})

// ==================== CRUD OPERATION ===========================

// ===================== Submit Data ==========================
let array = [];
let form = document.getElementById("form");
form.addEventListener("submit", function (e) {
    e.preventDefault();
    let obj = {};
    let input_field = document.querySelectorAll(".input_field");
    input_field.forEach(x => {
        obj[x.name] = x.value;
    })

    let gender = document.querySelectorAll(".gender:checked");
    gender.forEach(x => {
        obj.gender = x.value;
    });

    let hby = [];
    let hobbies = document.querySelectorAll(".hobbies:checked");
    hobbies.forEach(x => {
        hby.push(x.value)
        obj.hobbies = hby;
    })
    // console.log(array)
    let validatoin_all = array.some(x => {
        for (let key in x) {
            x[key] == ""
        }
    })

    let validate = obj.country == "Please select country" || obj.state === "Please select state" || obj.city === "Please select city"
    if (obj.id != "" && obj.email != "" && obj.number != "" && obj.gender != "" && obj.hobbies != "" && obj.country != "" && obj.state != "" && obj.city != "") {

        if (validate) {
            alert("Fill All Data Compulsory !!")
        }
        else if (obj.id == "0") {
            obj.id = setId();

            obj.selected = false;
            array.push(obj);
            console.log(array)
            form.reset();
            let select = document.getElementsByClassName("stay");
            for (let i = 0; i < select.length; i++) {
                select[i].length = 0;
            }
        }
        else {

            let index = array.findIndex(x => x.id == obj.id);
            array.splice(index, 1, obj);
            document.getElementsByName("id")[0].value = "0"  //after update data , new data will taking new id.


            // for changing button when i click on update
            document.getElementById("submit").value = "Submit";


            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Data Updated Succesfully',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }
    else {
        Swal.fire('Fill the Form !')
    }
    grid();

})

// ==================================== For Manage Id ============================ 
function setId() {
    // console.log("Main Array :", array)
    let num = 1;
    if (array.length == 0) {
        return num;
    }
    else if (array.length > 0) {
        let id = array.map(x => x.id)
        let max_id = Math.max(...id)
        return max_id + 1;
    }
}
// =============================== Delete user ============
const deleteuser = (id) => {
    let delete_btn = document.getElementById("delete");
    let confirmation = confirm("Are you sure you want to delete this file");
    if (confirmation) {
        let index = array.findIndex(x => x.id == id);
        array.splice(index, 1)
        grid();
        // document.getElementById("Submit").value = "Submit";

        form.reset();
        //for dropdown blank
        let select = document.getElementsByClassName("stay");
        for (let i = 0; i < select.length; i++) {
            select[i].length = 0;
        }
        document.getElementById("submit").value = "Submit";
    }
    delete_btn.style.display = "none";
}

// ========================= Edituser ===========================

const edituser = (id) => {
    form.reset();
    let editObj = array.find(x => x.id == id);
    for (let key in editObj) {
        if (key == "gender") {
            document.querySelector(`.gender[value = ${editObj[key]}]`).checked = true;
        }
        else if (key == "hobbies") {
            editObj[key].forEach(x => {
                document.querySelector(`.hobbies[value = ${x}]`).checked = true;
            })
        }
        else if (key == "state") {
            state_change();
            document.querySelector(`[name = ${key}]`).value = editObj[key];
        }
        else if (key == "city") {
            city_change();
            document.querySelector(`[name = ${key}]`).value = editObj[key];

        }
        else {
            let data = document.querySelector(`.input_field[name = ${key}]`).value = editObj[key];

            // for changing button when i click on submit
            document.getElementById("submit").value = "Update";

        }
    }




}

// ================checkbox - manage ============================
// if checkbox checked  you got popup and  called deleteAll function
// checked - uncheked task  = one to all

function checkAll(x, e) {
    let inputs = document.getElementsByClassName("checkbox_select");
    let delete_btn = document.getElementById("delete");

    // one to all checked with destructuring
    let value = e.target.checked;
    let newArr = array.map(u => {

        u = {
            ...u, selected: value
        }
        if (u.selected == true) {
            delete_btn.style.display = "inline-block"
        }
        else {
            delete_btn.style.display = "none";
        }
        return u;

    })
    // console.log("newArr",newArr)
    // console.log("Array",array)
    array = newArr;
    grid();
}

// ===================== Delete Btn ====================
function Delete() {
    let delete_btn = document.getElementById("delete");
    let confirmUser = confirm("Are you sure you want to delete ?")
    if (confirmUser) {
        array = array.filter(data => data.selected === false);
        grid();
        delete_btn.style.display = "none";
        document.getElementById("main_checkbox").checked = false;
    }
}

//onchange event on checkbox (if checkbox checked then selected true otherwise false)
// //check-uncheck task = All to one
function checkbox_sel(id) {
    let big_check = document.getElementById("main_checkbox");
    let newObj = array.find(data => data.id === id);
    newObj.selected = !newObj.selected;
    const condition_check = array.length && array.every(x => x.selected);
    big_check.checked = condition_check;
  

    //for button show and hide
    let delete_btn = document.getElementById("delete");
    const btn_show = array.length && array.some(u => u.selected); //check any of one is selected or not
    if (btn_show) {
        delete_btn.style.display = "inline-block";
    }
    else {
        delete_btn.style.display = "none"
    }

    grid();
}

// =========================== print data into table ======================

const grid = () => {
    let blankstr = "";
    array?.map(x => {
        console.log(x)
        return blankstr += `
        <tr>
        <td > <input type="checkbox" style="height: 20px !important" class="checkbox_select"   ${x.selected && "checked"} onchange="checkbox_sel(${x.id},this)" id ="checkbox_select"></td>
            <td>${x.id}</td>
            <td>${x.fname}</td>
            <td>${x.lname}</td>
            <td>${x.email}</td>
            <td>${x.number}</td>
            <td>${x.dob}</td>
            <td>${x.gender}</td>
            <td>${x.hobbies}</td>
            <td>${x.country}</td>
            <td>${x.state}</td>
            <td>${x.city}</td>
           
            <td>
                <button class = "btn btn-info me-2 text-white" onclick = "edituser(${x.id})">EDIT</button>
                <bu 
                
                tton class = "btn btn-danger" onclick="deleteuser(${x.id})">DELETE</bu>
            </td>
        </tr>
        `
    })
    document.getElementById("tbody").innerHTML = blankstr;
}
grid()   
