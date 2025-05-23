﻿var dataTable;

$(document).ready(function () {
    loadDataTable();
})

function loadDataTable() {
    dataTable = $('#tblData').DataTable({
        "ajax": {
            "url": "/Admin/User/GetAll"
        },
        "columns": [
            { "data": "name", "width": "15%" },
            { "data": "email", "width": "15%" },
            { "data": "phoneNumber", "width": "15%" },
            { "data": "campany.name","width":"15%"},
            { "data": "role", "width": "15%" },
            {
                "data": {
                    id: "id", lockoutEnd: "LockoutEnd"
                },
                "render": function (data) {
                    var today = new Date().getTime();
                    var lockout = new Date(data.lockoutEnd).getTime();
                    if (lockout > today) {
                        //User Locked
                        return `
                             <div class="text-center">
                              <a onclick=LockUnlock('${data.id}') class="btn btn-danger text-white" style="cursor:pointer">
                         UnLock
                           </a>
                          </div>
                        `;
                    }
                    else {
                        //User UnLock
                        return `
                          <div class="text-center">
                          <a onclick=LockUnlock('${data.id}') class="btn btn-success text-white" style="cursor:pointer">
                           Lock
                           </a>
                          </div>
                        `;
                    }
                }
            }


        ]
    })
}
function LockUnlock(id) {
    $.ajax({
        type: "POST",
        url: "/Admin/User/LockUnlock",
        data: JSON.stringify(id),
        contentType: "application/json",
        success: function (data) {
            if (data.success) {
                toastr.success(data.message);
                dataTable.ajax.reload();

            }
            else {
                toastr.error(data.message);
            }
        }
    })
}