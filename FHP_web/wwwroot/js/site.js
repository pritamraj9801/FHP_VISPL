$(document).ready(function () {
    $.ajax({
        url: "/Home/SignInPage",
        type: "GET",
        success: function (data) {
            $("#registrationContainer").html(data);
        },
        error: function (xhr, status, error) {
            console.error("Error loading registration content:", error);
        }
    });
});


function GetRegisterationForm() {
    $.ajax({
        url: "/Home/RegisterationPage",
        type: "GET",
        success: function (data) {
            $("#registrationContainer").html(data);
        },
        error: function (xhr, status, error) {
            console.error("Error loading registration content:", error);
        }
    });
}

function HideSignInPage() {
    document.getElementById("modalContainer").style.display = "none";
    GetAllRows();
}

function GetAllRows() {
    $.ajax({
        url: "Home/GetAllTrainee",
        type: "GET",
        success: function (data) {
            RenderRowData(data);
        },
        error: function (error) {
            console.error("Error loading registration content:", error);
        }
    })
}

// ------------------ rendering the employee data
function RenderRowData(data) {
    let tableRootElement = document.querySelector("#traineeDataTable tbody");
    for (var singleRow of data) {
        let newRow = document.createElement("tr");

        let pointerCell = document.createElement("td");
        newRow.appendChild(pointerCell);

        let serialNumberCell = document.createElement("td");
        serialNumberCell.textContent = singleRow.serialNumber + ".";
        newRow.appendChild(serialNumberCell);

        let prefixCell = document.createElement("td");
        prefixCell.textContent = singleRow.prefix;
        newRow.appendChild(prefixCell);

        let firstNameCell = document.createElement("td");
        firstNameCell.textContent = singleRow.firstName;
        newRow.appendChild(firstNameCell);

        let middleNameCell = document.createElement("td");
        middleNameCell.textContent = singleRow.middleName;
        newRow.appendChild(middleNameCell);

        let lastNameCell = document.createElement("td");
        lastNameCell.textContent = singleRow.lastName;
        newRow.appendChild(lastNameCell);

        let educationCell = document.createElement("td");
        educationCell.textContent = singleRow.education;
        newRow.appendChild(educationCell);

        let joiningDateCell = document.createElement("td");
        //joiningDateCell.textContent = singleRow.joiningDate;
        newRow.appendChild(joiningDateCell);

        let currentAddressCell = document.createElement("td");
        currentAddressCell.textContent = singleRow.currentAddress;
        newRow.appendChild(currentAddressCell);

        let currentCompanyCell = document.createElement("td");
        currentCompanyCell.textContent = singleRow.currentCompany;
        newRow.appendChild(currentCompanyCell);

        let dateOfBirthCell = document.createElement("td");
        //dateOfBirthCell.textContent = singleRow.dateOfBirth;
        newRow.appendChild(dateOfBirthCell);

        tableRootElement.appendChild(newRow);
    }

    // adding empty row in the end
    let newRow = document.createElement("tr");
    newRow.appendChild(document.createElement("td"));
    newRow.appendChild(document.createElement("td"));
    newRow.appendChild(document.createElement("td"));
    newRow.appendChild(document.createElement("td"));
    newRow.appendChild(document.createElement("td"));
    newRow.appendChild(document.createElement("td"));
    newRow.appendChild(document.createElement("td"));
    newRow.appendChild(document.createElement("td"));
    newRow.appendChild(document.createElement("td"));
    newRow.appendChild(document.createElement("td"));
    newRow.appendChild(document.createElement("td"));
    tableRootElement.appendChild(newRow);

    RowPointerSelection();
}

let currentSelectedRow; // holds which row is currently selected
// ------- adding click functionality to the row pointer for selecting the row
function RowPointerSelection() {
    var allRows = document.querySelectorAll('#traineeDataTable tbody tr');
    for (let row = 1; row < allRows.length; row++) {
        allRows[row].querySelector('td').addEventListener("click", function () {
            ClearSelection(allRows);
            allRows[row].style.backgroundColor = "#F7EEDD";
            currentSelectedRow = row;
            ToggleNavMenuBtns();
        })
    }
}
function IdOfCurrentSelectedRow() {
    if (currentSelectedRow === undefined) {
        return 0;
    }
    let value = document.querySelectorAll('#traineeDataTable tbody tr')[currentSelectedRow].querySelectorAll('td')[1].innerText.split('.')[0];
    return value;
}
function ClearSelection(allRows) {
    for (let row = 1; row < allRows.length; row++) {
        allRows[row].style.backgroundColor = "white";
    }
}

function GetTraineeData() {
    console.log("Getting trainee data for: " + IdOfCurrentSelectedRow());
    $.ajax({
        url: "Home/SigleTrainee/" + IdOfCurrentSelectedRow(),
        type: "GET",
        success: function (data) {
            document.getElementById("modalContainer").style.display = "block";
            $("#modalContainer").html(data);
        },
        error: function (error) {
            console.error("Error loading registration content:", error);
        }
    })
}

// ------- toggeling class to nav bar items, based on the selected row
function ToggleNavMenuBtns() {
    //  if the last row is selected then the add button will be enabled and edit/delete will be disabled
    let allRows = document.querySelectorAll('#traineeDataTable tbody tr');
    if (currentSelectedRow == allRows.length - 1) {
        document.getElementById('newBtn').classList.remove('disableBtn');
        document.getElementById('newBtn').classList.add('activeBtn');
        document.getElementById('editBtn').classList.remove('activeBtn');
        document.getElementById('editBtn').classList.add('disableBtn');
        document.getElementById('deleteBtn').classList.remove('activeBtn');
        document.getElementById('deleteBtn').classList.add('disableBtn');
    }
    // else if other rows are selected then add button will be disabled and edit/delete button will be enabled
    else {
        document.getElementById('newBtn').classList.remove('activeBtn');
        document.getElementById('newBtn').classList.add('disableBtn');
        document.getElementById('editBtn').classList.remove('disableBtn');
        document.getElementById('editBtn').classList.add('activeBtn');
        document.getElementById('deleteBtn').classList.remove('disableBtn');
        document.getElementById('deleteBtn').classList.add('activeBtn');
    }
}

// --------------------- handling filter-box clear btn, show hide functionality
let allInputFields = document.querySelectorAll('.textSearchBox');
for (let inputBox = 0; inputBox < allInputFields.length; inputBox++) {
    allInputFields[inputBox].addEventListener('input', () => {
        let value = allInputFields[inputBox].value;
        if (value.length == 0) {
            document.querySelectorAll('.close_btn')[inputBox].style.display = 'none';
        } else {
            document.querySelectorAll('.close_btn')[inputBox].style.display = 'initial';
        }
    });
}

// --------------------- handling filter-box clear btn, clear functionality
let allBtns = document.querySelectorAll('.close_btn');
for (let btnNumber = 0; btnNumber < allBtns.length; btnNumber++) {

    allBtns[btnNumber].addEventListener('click', () => {
        document.querySelectorAll('.textSearchBox')[btnNumber].value = "";
        document.querySelectorAll('.close_btn')[btnNumber].style.display = 'none';
    })
}

// --------------------- clearing all the filters when clear filter is clicked
document.querySelector('#clearAllFilters').addEventListener('click', () => {
    // ----- clearing all filter boxes
    var allFilterBox = document.querySelectorAll('.textSearchBox')
    for (let boxNumber = 0; boxNumber < allFilterBox.length; boxNumber++) {
        allFilterBox[boxNumber].value = "";
    }

    // ----- hidding all filter clear btns of table
    var allFilterClearBtn = document.querySelectorAll('.close_btn')
    for (let filterClearBtnNumber = 0; filterClearBtnNumber < allFilterClearBtn.length; filterClearBtnNumber++) {
        allFilterClearBtn[filterClearBtnNumber].style.display = "none";
    }
});