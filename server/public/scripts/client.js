console.log('js');

$(document).ready(onReady);

function onReady() {
    console.log('JQ');
    $('#create-button').on('click', createTask)
}

function createTask() {
    $.ajax({
        method: 'POST',
        url: '/toDoList',
        data: {
            task: $('#taskInput').val(),
            status: 'incomplete',
            dueDate: $('#dueDateInput').val()
        },
        success: function (response) {
            console.log('response', response);
            $('input').val('');
        }
    });
}