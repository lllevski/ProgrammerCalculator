﻿$(document).ready(function (ev) {
    toggleButtonAvaliability(true);

    let baseType = +$("input[name='baseType']:checked").val();
    enableButtonWithValueUnder(baseType);
})

function toggleButtonAvaliability(isDisabled) {
    $('.number-container .number-button').attr('disabled', isDisabled);
}

function enableButtonWithValueUnder(upperBound) {
    $('.number-container .number-button').each(function () {
        let buttonValue = isFinite($(this).text()) ? $(this).text() : -1;

        if (buttonValue >= 0 && buttonValue < upperBound) {
            $(this).attr('disabled', false);
        }
    });
}

function makeApiCall(route, data) {
    $.ajax(route, data)
        .done(function (res) {
            $('#calcInput').val(res);
        });
}

$("input[name='baseType']").click(function (ev) {
    toggleButtonAvaliability(true);

    let activeBaseType = $(ev.target).val();

    if (activeBaseType === '2') {
        enableButtonWithValueUnder(2);
    } else if (activeBaseType === '8') {
        enableButtonWithValueUnder(8);
    } else if (activeBaseType === '10') {
        enableButtonWithValueUnder(10);
    } else if (activeBaseType === '16') {
        toggleButtonAvaliability(false);
    }

    makeApiCall("/home/resetexpression", { data: {} });
})

$('.number-button').click(function (ev) {
    let calcInput = $('#calcInput').val();
    let numberValue = $(ev.target).text();
    let data = { calcInput: calcInput, numberValue: numberValue };

    makeApiCall("/home/inputnumber", { data: data });
})

$('.operator-button').click(function (ev) {
    let calcInput = $('#calcInput').val();
    let operatorValue = $(ev.target).attr('operation');
    let baseType = $("input[name='baseType']:checked").val();

    let data = { calcInput: calcInput, fromBase: baseType };

    makeApiCall("/home/" + operatorValue, { data: data });
})