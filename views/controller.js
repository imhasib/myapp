var pg = null;
var lengthSlider = null;
var results = null;

$(function() {
    pg = new PasswordGenerator();
    lengthSlider = new Slider('#length', {});
    resetInputs(pg.constant);
    $('#single_result').hide();
    $('#alert').hide();
});


function resetInputs(pg) {
    lengthSlider.setValue([pg.minLength, pg.maxLength]);
    $("#excluded_char").val(pg.excludedCharacters);
    $("#lower_case").prop("checked", pg.includeLowercase);
    $("#upper_case").prop("checked", pg.includeUppercase);
    $("#numbers").prop("checked", pg.includeNumbers);
    $("#symbols").prop("checked", pg.includeSymbols);
    $("#quantity").val(pg.quantity);
}


function getInputs() {
    var lengths = lengthSlider.getValue();
    var inputs = {
        minLength : lengths[0],
        maxLength : lengths[1],
        excludedCharacters : $("#excluded_char").val(),
        includeLowercase : $("#lower_case").prop( "checked" ),
        includeUppercase : $("#upper_case").prop( "checked" ),
        includeNumbers : $("#numbers").prop( "checked" ),
        includeSymbols : $("#symbols").prop( "checked" ),
        quantity : $("#quantity").val()
    }

    return inputs;
}

function getPassword() {
    var inputs = getInputs();
    if(!validateInputs(inputs)) {
        return;
    }

    var output = pg.generate(inputs);
    if(output.status == 'ok') {
        results = output.results;
    }
    var resultsHtml = ""
    if(results.length > 1) {
        for(var i=0 ; i<results.length; i++) {
            resultsHtml += '\n' + results[i] + '';
        }
        $("#generated_password").html(resultsHtml);
        $('#myModal').modal('show');
        $('#single_result').hide();
    } else {
        $("#generated_single_password").val(results[0]);
        $('#single_result').show();
    }
}

function validateInputs(inputs) {
    if(!inputs.includeUppercase && !inputs.includeLowercase && !inputs.includeNumbers && !inputs.includeSymbols) {
        showMessage('error', 'At least one character set should be selected.');
        return false;
    }

    if(inputs.quantity < 1) {
        showMessage('error', 'Minimum quantity is one.');
        return false;
    }

    if(inputs.quantity > 100000) {
        showMessage('error', 'Quantity should be less than 100000');
        return false;
    }

    return true;
}

function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

function copyToClipBoard() {
    /* Get the text field */
    var copyText = $("#generated_single_password");

    /* Select the text field */
    copyText.select();

    /* Copy the text inside the text field */
    document.execCommand("copy");

    /* Alert the copied text */
    showMessage('success', 'Password is copied to clipboard')
}


function showMessage(type, message) {
    $("#alert").removeClass();

    if(type == "success") {
        $("#alert").addClass("alert alert-dismissible collapse alert-success");
        $("#alert_message").html('<strong>Success: </strong>' + message);
    } else if(type == "error") {
        $("#alert").addClass("alert alert-dismissible collapse alert-danger");
        $("#alert_message").html('<strong>Error: </strong>' + message);
    }

    $("#alert").show();

    var interval = setInterval(function() {
        $("#alert").hide();
        clearInterval(interval);
    }, 10000);
}