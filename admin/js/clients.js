/*global $*/

// READ recods on page load
$(document).ready(function () {
    readRecords(); // calling function
});

// READ records
function readRecords() {
    $.get("/clients/", {}, function (data, status) {
        data.forEach(function(value) {
            var row = '<tr id="row_id_'+ value.id_client +'">'
            			+ displayColumns(value)
        				+ '</tr>';
            $('#clients').append(row);
        });
    });
}

function displayColumns(value) {
    return 	'<td>'+value.id_client+'</td>'
            + '<td class="first_name">'+value.first_name+'</a></td>'
			+ '<td class="last_name">'+ value.last_name+ '</td>'
			+ '<td class="payment_type">'+ value.payment_type +'</td>'
			+ '<td align="center">'
			+	'<button onclick="viewRecord('+ value.id_client +')" class="btn btn-edit">Update</button>'
			+ '</td>'
			+ '<td align="center">'
			+	'<button onclick="deleteRecord('+ value.id_client +')" class="btn btn-danger">Exclude</button>'
			+ '</td>';
}

function addRecord() {
    $('#id').val('');
    $('#first_name').val('');
    $('#last_name').val('');
    $('#payment_type').val('');
  
    $('#myModalLabel').html('Add New Article');
    $('#add_new_record_modal').modal('show');
}

function viewRecord(id) {
    var url = "/clients/" + id;
    
    $.get(url, {}, function (data, status) {
        //bind the values to the form fields
        $('#first_name').val(data.first_name);
        $('#last_name').val(data.last_name);
        $('#payment_type').val(data.payment_type);
       
        $('#id').val(id);
        $('#myModalLabel').html('Edit CLIENT');
        
        $('#add_new_record_modal').modal('show');
    });
}

function saveRecord() {
    var formData = $('#record_form').serializeObject();
    if(formData.id) {
        updateRecord(formData);
    } else {
        createRecord(formData);
    }
}

function createRecord(formData) {
    $.ajax({
        url: '/clients/',
        type: 'POST',
        accepts: {
            json: 'application/json'
        },
        data: formData,
        success: function(data) {
            $('#add_new_record_modal').modal('hide');
            
            var row = '<tr id="row_id_'+ data.id +'">'
            			+ displayColumns(data)
        				+ '</tr>';
            $('#clients').append(row);
        } 
    });
}

function updateRecord(formData) {
    $.ajax({
        url: '/clients/'+formData.id,
        type: 'PUT',
        accepts: {
            json: 'application/json'
        },
        data: formData,
        success: function(data) {
            $('#row_id_'+formData.id+'>td.first_name').html(formData.first_name);
            $('#row_id_'+formData.id+'>td.last_name').html(formData.last_name);
            $('#row_id_'+formData.id+'>td.payment_type').html(formData.payment_type);
            $('#add_new_record_modal').modal('hide');
        } 
    });
}

function deleteRecord(id) {
    $.ajax({
        url: '/clients/'+id,
        type: 'DELETE',
        success: function(data) {
            $('#row_id_'+id).remove();
        }
    });
}


//extending jQuery with a serializeObject method so that form values can be retrieved as JSON objects
$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};