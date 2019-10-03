//#### Section Form START ####////

//Year Select option
let start = 2019;
let end = 2035;
let options = "";
let year = start;
for (year = start; year <= end; year++) {
    options += "<option>" + year + "</option>";
}
document.getElementById('formYear').innerHTML = options;
// END ear Select option

let btnDonation = document.getElementById('btnDonation');
let fullname = document.getElementById('fullname');
let fullnameSpan = document.getElementById('fullnameSpan');
let email = document.getElementById('email');
let emailSpan = document.getElementById('emailSpan');
let amount = document.getElementById('amount');
let amountSpan = document.getElementById('amountSpan');
let credit = document.getElementById('credit');
let creditSpan = document.getElementById('creditSpan');
let formYear = document.getElementById('formYear');
let formMonth = document.getElementById('formMonth');
let thankyou = document.getElementById('thankyou');

btnDonation.addEventListener('click', validation);
let checkValidation = false;

function validateEmail(email) {
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validate_creditcardnumber(credit) {
    var re8digit = /^\d{8}$/
    return re8digit.test(credit);
}

function validation(e) {
    e.preventDefault();
    checkValidation = true;
    if (fullname.value.trim() == '' || fullname.value.trim().length < 4) {
        fullname.style.border = "solid 3px red";
        fullnameSpan.innerHTML = "** Please enter your Full name, At least 4 chars";
        checkValidation = false;
        //return false;
    }

    else {
        fullname.style.border = "solid 3px green";
        fullnameSpan.innerHTML = "";
        //checkValidation = true;
        //fullname.value = '';
//        Note: by using that clear method => doesn't move the value to table
//        setTimeout(function () {
//            document.getElementById("fullname").value = '';
//        }, 2000);

    }

    // email validation
    if (email.value == '') {

        checkValidation = false;
        email.style.border = "solid 3px red";
        emailSpan.innerHTML = "** please enter proper email address";
    } else {
        if (validateEmail(email.value)) {
            email.style.border = "solid 3px green";
            emailSpan.innerHTML = "";
            //checkValidation = true;
            //email.value = '';
//            setTimeout(function () {
//                document.getElementById("email").value = '';
//            }, 2000);

        } else {
            checkValidation = false;
            emailSpan.innerHTML = "please enter proper email address";
            email.style.border = "solid 3px red";
        }
    }

    // amount value
    if (amount.value == '' || amount.value < 1) {
        amount.style.border = "solid 3px red";
        amountSpan.innerHTML = "** Please enter an amount above zero";
        checkValidation = false;
    } else {
        amount.style.border = "solid 3px green";
        amountSpan.innerHTML = "";
        //checkValidation = true;
        //amount.value = '';
//        setTimeout(function () {
//            document.getElementById("amount").value = '';
//        }, 2000);
    }

    // Credit card number validation
    if (credit.value <= 0 || credit.value == '') {
        credit.style.border = "solid 3px red";
        creditSpan.innerHTML = "please enter 8 digits Credit card number";
        checkValidation = false;
        //return false;

    } else {
        if (validate_creditcardnumber(credit.value)) {
            creditSpan.innerHTML = "";
            credit.style.border = "solid 3px green";
            //checkValidation = true;
            //credit.value = '';
//            setTimeout(function () {
//                document.getElementById("credit").value = '';
//            }, 2000);
        } else {
            creditSpan.innerHTML = "please enter 8 digits Credit card number";
            credit.style.border = "solid 3px red";
            checkValidation = false;
        }
    }

    // message Thank you
    setTimeout(function () {
        document.getElementById("thankyou").innerHTML = '';
    }, 3000);
    if (checkValidation == true) {
        document.getElementById("thankyou").innerHTML = `thank you for your donation ${fullname.value}`;
        table();
        document.getElementById("myForm").reset();
        return true;
    }
    if (checkValidation == false)
        return false;


}
/// Insert into table
// alert(localStorage.length);
if(localStorage.length){
  rowCount = localStorage.length;

}
else{
  rowCount = 0;
}


function table() {
    let table = document.getElementById('table');

    let row = table.insertRow(rowCount+1);
    
    let cel0 = row.insertCell(0);
    let cel1 = row.insertCell(1);
    let cel2 = row.insertCell(2);
    let cel3 = row.insertCell(3);
    let cel4 = row.insertCell(4);
    let cel5 = row.insertCell(5);

    cel0.innerHTML = fullname.value;
    cel1.innerHTML = email.value;
    cel2.innerHTML = amount.value;
    cel3.innerHTML = credit.value;
    cel4.innerHTML = formYear.value;
    cel5.innerHTML = formMonth.value;

    rowCount++;

    // locaStorage start
    data = [];
    data.push(fullname.value);
    data.push(amount.value);
    data.push(email.value);
    data.push(credit.value);
    data.push(formYear.value);
    data.push(formMonth.value);
    localStorage.setItem('person-' + rowCount, JSON.stringify(data));
    console.log(data);
}
data = JSON.parse(localStorage.getItem('person-1'));
    //alert(data);
//alert(localStorage.length);
var ii=0;
for (var j = 0; j < localStorage.length; j++) {
    ii++;
    data = JSON.parse(localStorage.getItem('person-'+ii));
    //alert(data);
    if (data != null) {

        //console.log(data);

        let table = document.getElementById('table');

        var row = table.insertRow(ii);

        var cel0 = row.insertCell(0);
        var cel1 = row.insertCell(1);
        var cel2 = row.insertCell(2);
        var cel3 = row.insertCell(3);
        var cel4 = row.insertCell(4);
        var cel5 = row.insertCell(5);

        cel0.innerHTML = data[0]
        cel1.innerHTML = data[2]
        cel2.innerHTML = data[1]
        cel3.innerHTML = data[3]
        cel4.innerHTML = data[4]
        cel5.innerHTML = data[5]

        row = null;
    }

}
//localStorage.clear();

///////////////////// Start Table sort
function sortTableByName() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("table");
  switching = true;
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[0];
      y = rows[i + 1].getElementsByTagName("TD")[0];
      //check if the two rows should switch place:
      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        //if so, mark as a switch and break the loop:
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}
function sortTableByAmount() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("table");
  switching = true;
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[1];
      y = rows[i + 1].getElementsByTagName("TD")[1];
      //check if the two rows should switch place:
      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        //if so, mark as a switch and break the loop:
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

//#### Section Form End ####////

// 1) how to clear vlaues AND still get values in table + Local storage
// //fullname.value = '';  => prevents from getting the vlaues in the table
// 2) keep values in both table AND local storage
// 3) add few rows of vlaues, refresh the page, then add more values, seems it doesn't add to the same table, try to refresh, the new vlaues\rows will disappear;
// 4) how can I implement table sort to both buttons (by Name + By amount (number))
// https://www.w3schools.com/howto/howto_js_sort_table.asp
