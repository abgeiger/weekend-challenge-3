console.log('js');

$(document).ready(onReady);

function onReady() {
    console.log('JQ');
    displayTasks();
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
            console.log('POST response', response);
            $('input').val('');
            displayTasks();
        }
    });
}

function displayTasks() {
    $.ajax({
        method: 'GET',
        url: '/toDoList',
        success: function(response) {
            console.log('GET response', response);
            $('#displayDiv').empty();
            for (let i = 0; i < response.length; i++) {
                var task = response[i];
                var $newTask = $('<div class="row task"><div class="col-sm-8"><span>' + task.task + '</span></div></div>');

                // create and append the create button
                var $completeButton = $('<div class="col-sm-2"><button class="completeButton">Complete</button></div>');
                $completeButton.children().data('id', task.id);
                $newTask.append($completeButton);

                // create and append the save delete
                var $deleteButton = $('<div class="col-sm-2"><button class="deleteButton">Delete</button></div>');
                $deleteButton.children().data('id', task.id);
                $newTask.append($deleteButton);

                // append the new task to the DOM
                $('#displayDiv').append($newTask);
            }
        }
    });
}