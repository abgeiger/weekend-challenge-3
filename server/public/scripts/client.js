console.log('js');

$(document).ready(onReady);

function onReady() {
    console.log('JQ');
    displayTasks();
    $('#create-button').on('click', createTask)
    $('#displayDiv').on('click', '.complete-button', completeTask);
    $('#displayDiv').on('click', '.completed-button', uncompleteTask);
    $('#displayDiv').on('click', '.delete-button', deleteTaskQuestion);
    $('#displayDiv').on('click', '.yes-button', deleteTask);
    $('#displayDiv').on('click', '.no-button', deleteQuesionButtons);
}

function completeTask() {
    console.log($(this).data()); // this should log {id: '7'} or whatever the id is
    var taskId = $(this).data().id;
    console.log('complete was clicked! The task id was', taskId);
    
    $.ajax({
        method: 'PUT',
        url: '/toDoList/complete/' + taskId,
        success: function(response) {
            displayTasks();
        }
    });
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

function deleteTask() {
    // console.log($(this).data());    
    // var taskId = $(this).data().id;
    console.log($(this).parent().parent().children('div:nth-child(3)').children().data());        
    var taskId = $(this).parent().parent().children('div:nth-child(3)').children().data().id;
    console.log('delete was clicked! The task id was', taskId);

    $.ajax({
        method: 'DELETE',
        url: '/toDoList/' + taskId,
        success: function(response) {
            displayTasks();
        }
    });
}

function deleteTaskQuestion() {
    $(this).parent().parent().append('<div class="col-xs-6"><span>Are you sure you want to delete?</span><button class="yes-button">Yes</button><button class="no-button">No</button></div>');
}

function deleteQuesionButtons() {
    $(this).parent().remove();
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
                var $newTask = $('<div class="row task"><div class="col-sm-4"><span>' + task.task + '</span></div><div class="col-sm-4"><span>' + task.due_date + '</span></div></div>');

                // create and append the create button
                var $completeButton = $('<div class="col-sm-2"><button class="complete-button">Complete</button></div>');
                $completeButton.children().data('id', task.id);
                $newTask.append($completeButton);

                // create and append the save delete
                var $deleteButton = $('<div class="col-sm-2"><button class="delete-button">Delete</button></div>');
                $deleteButton.children().data('id', task.id);
                $newTask.append($deleteButton);

                // append the new task to the DOM
                $('#displayDiv').append($newTask);

                // set task's color
                if (task.status === 'complete') {
                    $newTask.css('background-color', 'green');
                    // $('.complete-button').last().css('background-color', 'green');
                    $('.complete-button').last().replaceWith('<button class="completed-button">Completed</button>');
                    $('.completed-button').last().data('id', task.id);
                } else if (task.status === 'overdue') {
                    $newTask.css('background-color', 'red');
                }
            }
        }
    });
}

function uncompleteTask() {
    console.log($(this).data()); // this should log {id: '7'} or whatever the id is
    var taskId = $(this).data().id;
    console.log('uncomplete was clicked! The task id was', taskId);

    $.ajax({
        method: 'PUT',
        url: '/toDoList/uncomplete/' + taskId,
        success: function(response) {
            displayTasks();
        }
    });
}