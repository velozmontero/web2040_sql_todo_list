$(document).ready(function () {
  $.ajax({
    url: "http://localhost:9000/get-tasks",
    success: function (response) {
      
      var res = JSON.parse(response);

      console.log('response ', res);

      if (res.success){
        res.rows.forEach(row => {
          console.log('row ',row);

          $('#tasks_ul').append(`
            <li data-id="${row.id}">${row.task}</li>
          `);
        });
      }
      
    }
  });

  function addTask(){
    var text = $('#task_input').val();

    if(text.trim()){
      console.log('pressed enter');
      $.ajax({
        url: "http://localhost:9000/add-task",
        method: 'POST',
        data: {task: text},
        success: function(response) {
          var res = JSON.parse(response);

          console.log('response ', res);

          if (res.success) {
        
            $('#tasks_ul').append(`
              <li>${res.task}</li>
            `);
            
            $('#task_input').val('');
          
          }
        }
      });
    }
  }

  $('#task_input').keypress(function(e){
    if(e.which === 13){
      addTask();
    }
  })
  
});