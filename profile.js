$(document).ready(function () {
    var values = [];
    // form disabled initially
    $("#employeeForm input").prop("disabled", true);
    // form enable on new button click
    $('#btnNew').click(function () {
        $("#employeeForm input").prop("disabled", false);
        $('#employeeForm').each(function () {
            this.reset();
        });
    });
    // limitting input text length
    $('#txtId').attr({ maxLength: 4 });
    $('#txtName').attr({ maxLength: 50 });
    $('#txtDesignation').attr({ maxLength: 50 });
    $('#txtBasicPay').attr({ maxLength: 10 });
    $('#txtDailyAllowance').attr({ maxLength: 10 });
    $('#txtHouseRentalAllowance').attr({ maxLength: 10 });
    $('#txtMedicalAllowance').attr({ maxLength: 10 });

    // limitting salary field inputs to number only
    $("#txtBasicPay,#txtDailyAllowance, #txtHouseRentalAllowance, #txtMedicalAllowance ").bind("keydown", function (event) {
        if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 ||
            (event.keyCode == 65 && event.ctrlKey === true) || (event.keyCode >= 35 && event.keyCode <= 39)) {
            return;
        }
        else {
            // Ensure that it is a number and stop the keypress
            if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
                event.preventDefault();
            }
        }
    });

    $('#btnCancel').click(function () {
        $('#employeeForm').each(function () {
            this.reset();//reseting form after each CANCEL
        });
        $("#employeeForm input").prop("disabled", true);
    });

    // dialog box on succesfull submission
    $('.success').dialog({
        autoOpen: false,
        modal: true,
        show: {
            effect: "blind",
            duration: 1000
        }
    });

    // salary calculation
    $('.salary').keyup(function () {
        var sum = 0;// initialize the sum to zero
        $('.salary').each(function () {
            sum += Number($(this).val());
        });
        $('#txtTotalSalary').val(sum); // set the computed value to  textbox
    });

    // on save button click events
    $('#btnSave').click(function () {
        if ($("#txtId").val() != "") {
            $('#txtId').each(function () {
                if ($.inArray(this.value, values) >= 0) { //employee id duplication check
                    alert("Please enter a different Id");
                    return false;
                }
                else {
                    if ($("#txtName").val() == "") {
                        alert("Please Enter Employee Name");
                        return false;
                    }
                    else if ($("#txtDesignation").val() == "") {
                        alert("Please Enter Designation");
                        return false;
                    }
                    else if ($("#txtBasicPay").val() == "") {
                        alert("Please Enter Basic Pay");
                        return false;
                    }
                    else if ($("#txtDailyAllowance").val() == "") {
                        alert("Please Enter Daily Allowance");
                        return false;
                    }
                    else if ($("#txtHouseRentalAllowance").val() == "") {
                        alert("Please Enter Home Rental Allowance");
                        return false;
                    }
                    else if ($("#txtMedicalAllowance").val() == "") {
                        alert("Please Enter Home Medical Allowance");
                        return false;
                    }
                    else {
                        values.push(this.value);
                        var colEmpID = document.getElementById("txtId").value;
                        var colEmpName = document.getElementById("txtName").value;
                        var colEmpDesignation = document.getElementById("txtDesignation").value;
                        var colEmpTotalSalary = document.getElementById("txtTotalSalary").value;
                        var newRow = jQuery('<tr><td class ="f1">' + colEmpID + '</td><td class= "f2">' + colEmpName + '</td><td class ="f3">' + colEmpDesignation + '</td><td class ="f4">' + colEmpTotalSalary + '</td><td class ="f5">' + '<button class ="edit">Edit</button></td>' + '<td><button class= "delete">Delete</button>' + '</td></tr>');
                        $('#employeeTable').append(newRow);
                        $('.success').dialog('open');
                        //$("#employeeForm").prop("disabled", true);

                    }
                }
            });
        }
        else {
            alert("Please enter Employee ID");
        }
        $('#employeeForm').each(function () {
            this.reset();//reseting form after each save
            $("#employeeForm").prop("disabled", true);
        });
    });

    $('#employeeTable').on('click', '.edit', function () {
        $(this).closest('tr').remove();
        var id = $(this).parent().siblings().filter(".f1").text();
        for (var i = values.length; i--;) {
            if (values[i] === id) {
                values[i] = " ";
            }
        }
        var id = $(this).parent().siblings().filter(".f1").text();
        // values.pop(id);
        $('#txtId').val($(this).parent().siblings().filter(".f1").text());
        $('#txtName').val($(this).parent().siblings().filter('.f2').text());
        $('#txtDesignation').val($(this).parent().parent().find('.f3').text());
        $('#txtTotalSalary').val($(this).parent().parent().find('.f4 ').text());
        $("#employeeForm input").prop("disabled", false);
    });

    $('#employeeTable').on('click', '.delete', function () {
        if (confirm("Are you sure you want to delete?")) {
            $(this).closest('tr').remove();
        }
        var id = $(this).parent().siblings().filter(".f1").text();
        for (var i = values.length; i--;) {
            if (values[i] === id) {
                values[i] = " ";
            }
        }
    });
});

