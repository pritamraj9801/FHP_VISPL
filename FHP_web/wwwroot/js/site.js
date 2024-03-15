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
        serialNumberCell.textContent = singleRow.serialNumber+".";
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

// ------- adding double click functionality to the row pointer for selecting the row
function RowPointerSelection() {
    var allRows = document.querySelectorAll('#traineeDataTable tbody tr');
    for (let row = 1; row < allRows.length; row++) {
        allRows[row].querySelector('td').addEventListener("click", function () {
            ClearSelection(allRows);
            allRows[row].style.backgroundColor = "#F7EEDD";
        })
    }
}
function ClearSelection(allRows) {
    for (let row = 1; row < allRows.length; row++)
    {
            allRows[row].style.backgroundColor = "white";
    }
}