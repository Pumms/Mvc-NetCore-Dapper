var table = null;
var npm = '';

$(document).ready(function () {
    //Tooltip
    $('#tambah').tooltip({
        animation: true,
        title: 'Tambah Mahasiswa',
        trigger: 'hover',
        placement: 'right'
    });

    $('#edit').tooltip({
        animation: true,
        title: 'Edit Data',
        trigger: 'hover',
        placement: 'top'
    });
    //End Tooltip

    table = $('#tblMahasiswa').DataTable({
        "ajax": {
            url: '/Mahasiswa/GetData',
            type: 'GET',
            datatype: 'json'
        },
        "columns": [
            {
                className: 'details-control',
                orderable: false,
                data: null,
                defaultContent: ''
            },
            {
                className: 'npm',
                data: null, render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                }
            },
            { data: 'NPM' },
            { data: 'Name' },
            {
                data: 'Jenis_Kelamin', render: function (data) {
                    if (data == 'L') {
                        return 'Laki-Laki'
                    } else {
                        return 'Perempuan'
                    }
                }
            },
            {
                data: null, render: function (row, type, data) {
                    return `<td>
                                <button class="btn btn-warning" id="edit" data-toggle="modal" data-target="#MhsModal" onclick="GetById(${data.Id})"><i class="far fa-edit"></i></button>
                                <button class="btn btn-danger" id="delete" onclick="Delete(${data.Id})"><i class="far fa-trash-alt"></i></button>
                            </td>`
                }
            },
        ],
        "order": [[1, 'asc']]
    });

    // Add event listener for opening and closing details
    $('#tblMahasiswa tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = table.row(tr);

        if (row.child.isShown()) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            row.child(format(row.data())).show();
            tr.addClass('shown');
        }
    });


});

function format(d) {
    // `d` is the original data object for the row
    return `<table>
        <tr>
            <td> Jurusan :</td>
            <td> ${d.Jurusan} </td>
        </tr>
        <tr>
            <td> Asal Kampus :</td>
            <td> ${d.Kampus} </td>
        </tr>
    </table>`;
}

$('#tambah').on('click', function () {
    clearForm();
    $('#simpan').show();
    $('#update').hide();
    $('#npm').attr('disabled', false);
    $('.modal-title').html('Tambah Data');
})

function clearForm() {
    $('#id').val('');
    $('#npm').val('');
    $('#name').val('');
    $('#jurusan').val('');
    $('#kampus').val('');

    $('input[name="jenkel"]').attr('checked', false);
}

//INSERT
function Save() {
    debugger;
    if ($('#npm').val() == "" || $('#name').val() == "" || $('#jurusan').val() == "" || $('#kampus').val() == "") {
        //Eksekusi if validation true
        Swal.fire({
            icon: 'warning',
            title: 'Empty',
            text: 'Input Cannot be Empty',
        })
        return false;
    } else {
        var Mahasiswa = new Object();
        Mahasiswa.NPM = $('#npm').val();
        Mahasiswa.Name = $('#name').val();
        Mahasiswa.Jenis_Kelamin = $('input[name="jenkel"]:checked').val();
        Mahasiswa.Jurusan = $('#jurusan').val();
        Mahasiswa.Kampus = $('#kampus').val();

        $.ajax({
            type: 'POST',
            url: '/Mahasiswa/Insert',
            data: Mahasiswa,
            success: function (result) {
                debugger;
                if (result.StatusCode == 200) {
                    Swal.fire({
                        icon: 'success',
                        position: 'center',
                        title: 'Success Insert Data!',
                        timer: 2500
                    }).then((result) => {
                        if (result.value) {
                            table.ajax.reload();
                            $('#MhsModal').modal('hide');
                        }
                    })
                } else {

                }
            },
            error: function (errorResult) {
                Swal.fire({
                    icon: 'error',
                    position: 'center',
                    title: 'Error',
                    text: errorResult,
                })
            },
        })
    }
}

//GET BY ID
function GetById(id) {
    //Change DOM Modal
    clearForm();
    $('#update').show();
    $('#simpan').hide();
    $('#npm').attr('disabled', true);
    $('.modal-title').html('Ubah Data');

    //Function GetById
    $.ajax({
        type: 'GET',
        url: '/Mahasiswa/GetById/' + id,
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (result) {
            $('#id').val(result.data[0].Id);
            npm = result.data[0].NPM;
            $('#npm').val(result.data[0].NPM);
            $('#name').val(result.data[0].Name);
            if (result.data[0].Jenis_Kelamin == 'L') {
                $('#jenkel1').attr('checked', true);
            } else if (result.data[0].Jenis_Kelamin == 'P') {
                $('#jenkel2').attr('checked', true);
            }
            $('#jurusan').val(result.data[0].Jurusan);
            $('#kampus').val(result.data[0].Kampus);
        },
        error: function (errorResult) {
            Swal.fire({
                icon: 'error',
                position: 'center',
                title: 'Error',
                text: errorResult,
            })
        },
    });
}

function Update() {
    //Question for Update
    Swal.fire({
        icon: 'warning',
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        showCancelButton: true,
        confirmButtonText: "Yes"
    }).then((result) => {
        if (result.value) {
            //Validation
            if ($('#id').val() == "" || $('#npm').val() == "" || $('#name').val() == "" || $('#jurusan').val() == "" || $('#kampus').val() == "") {
                //Eksekusi if validation true
                Swal.fire({
                    icon: 'warning',
                    title: 'Empty',
                    text: 'Input Cannot be Empty',
                })
                return false;
            } else {
                //Eksekusi if validation false
                //Lakukan Update data
                var Mahasiswa = new Object();
                Mahasiswa.Id = $('#id').val();
                Mahasiswa.NPM = $('#npm').val();
                Mahasiswa.Name = $('#name').val();
                Mahasiswa.Jenis_Kelamin = $('input[name="jenkel"]:checked').val();
                Mahasiswa.Jurusan = $('#jurusan').val();
                Mahasiswa.Kampus = $('#kampus').val();

                if (npm != Mahasiswa.NPM) {
                    Swal.fire({
                        icon: 'error',
                        position: 'center',
                        title: 'Error',
                        text: 'NPM tidak boleh diubah!',
                    })
                } else {
                    $.ajax({
                        type: 'POST',
                        url: '/Mahasiswa/Update',
                        data: Mahasiswa,
                        success: function (result) {
                            debugger;
                            if (result.StatusCode == 200) {
                                Swal.fire({
                                    icon: 'success',
                                    position: 'center',
                                    title: 'Success Update Data!',
                                    timer: 2500
                                }).then((result) => {
                                    if (result.value) {
                                        table.ajax.reload();
                                        clearForm();
                                        $('#MhsModal').modal('hide');
                                    }
                                })
                            }
                        },
                        error: function (errorResult) {
                            Swal.fire({
                                icon: 'error',
                                position: 'center',
                                title: 'Error Update',
                                text: errorResult,
                            })
                        },
                    })
                }
            }

        } else {
            //else Question for Update
            //do nothing
        }
    });
}

function Delete(id) {
    //Question for Delete
    Swal.fire({
        icon: 'warning',
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        showCancelButton: true,
        confirmButtonText: "Yes"
    }).then((result) => {
        if (result.value) {
            $.ajax({
                type: 'POST',
                url: '/Mahasiswa/Delete/'+id,
                success: function (result) {
                    debugger;
                    if (result.StatusCode == 200) {
                        Swal.fire({
                            icon: 'success',
                            position: 'center',
                            title: 'Success Delete Data!',
                            timer: 2500
                        }).then((result) => {
                            table.ajax.reload();
                        })
                    }
                },
                error: function (errorResult) {
                    Swal.fire({
                        icon: 'error',
                        position: 'center',
                        title: 'Error Delete',
                        text: errorResult,
                    })
                },
            })
        } else {
            //else Question for Update
            //do nothing
        }
    });
}