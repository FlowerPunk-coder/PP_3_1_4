$(async function () {
    await mainTable();
    await userTable();
    await addNewUser();
    await getAllRoles();
})

const fetchService = {
    head: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Refer': null
    },

    getAllUser: async () => await fetch('api/users'),
    getAllRoles: async () => await fetch('api/roles'),
    getCurrentUser: async () => await fetch('api/user'),
    getUserById: async (id) => await fetch(`api/getUser/${id}`),
    addNewUser: async (user) => await fetch('api/newUser/',
        {
            method: 'POST',
            headers: fetchService.head,
            body: JSON.stringify(user)
        }),
    deleteUser: async (id) => await fetch(`api/delete/${id}`,
        {
            method: 'DELETE',
            headers: fetchService.head
        }),
    editUser: async (user) => await fetch('api/updateUser/',
        {
            method: 'POST',
            headers: fetchService.head,
            body: JSON.stringify(user)
        }),
}

async function mainTable() {
    const userList = document.querySelector('#firstPageTable')
    let result = ''

    await fetchService.getAllUser()
        .then(res => res.json())
        .then(users => users.forEach(user => {
            result += `<tr>
                  <td>${user.id}</td>
                  <td>${user.name}</td>
                  <td>${user.lastName}</td>
                  <td>${user.age}</td>
                  <td>${user.email}</td>
                  <td>${user.roles.map(role => role.title)}</td>
                  <td>
                    <button type="button" data-whatever="${user.id}"  data-action="edit" class="btn btn-info btn-sm"
                            data-toggle="modal" data-target="#editModal">Edit
                    </button>
                  </td>
                  <td>
                    <button type="button" data-whatever="${user.id}" data-action="delete" class="btn btn-danger btn-sm"
                            data-toggle="modal" data-target="#deleteModal">Delete</button>
                  </td>
                </tr>
            `
        }))
    userList.innerHTML = result;

}

async function userTable() {
    let table = $('#oneUser');
    table.empty();

    await fetchService.getCurrentUser()
        .then(res => res.json())
        .then(activeUser => {
            let result = `$(
            <tr>
                <td>${activeUser.id}</td>
                <td>${activeUser.name}</td>
                <td>${activeUser.lastName}</td>
                <td>${activeUser.age}</td>
                <td>${activeUser.email}</td>
                <td>${activeUser.roles.map(role => role.title)}</td>
            </tr>
            )`
            table.append(result)
        })
}


async function getAllRoles() {
    let allRoles = [];
    await fetchService.getAllRoles()
        .then(res => res.json())
        .then(roles => roles.forEach(role => allRoles.push(role)))
    return allRoles;
}

async function addNewUser() {
    let roles = await getAllRoles();
    let addRoles = document.getElementById('newRoles');
    $('#newRoles').empty();
    roles.forEach(role => {
        if (role.role === 'ROLE_USER') {
            addRoles.add(new Option(role.title, role.role, false, true));
        } else {
            addRoles.add(new Option(role.title, role.role));
        }
    })
}

async function newUser() {
    let addUserForm = $('#addUserForm')
    let name = addUserForm.find('#newName').val().trim();
    let lastName = addUserForm.find('#newLastName').val().trim();
    let age = addUserForm.find('#newAge').val().trim();
    let email = addUserForm.find('#newEmail').val().trim();
    let password = addUserForm.find('#newPassword').val().trim();
    let rolesArray = addUserForm.find('#newRoles').val()
    let roles = []
    let tempRoles = await getAllRoles();
    for (let i = 0; i < tempRoles.length; i++) {
        for (let j = 0; j < rolesArray.length; j++) {
            if (tempRoles[i].role === rolesArray[j]) {
                roles.push(tempRoles[i]);
            }
        }
    }
    let data = {
        name: name,
        lastName: lastName,
        age: age,
        email: email,
        password: password,
        roles: roles
    }
    await fetchService.addNewUser(data)
        .then(() => {
            document.getElementById('addUserForm').reset();
            $('#nav-user-table-tab').tab('show');
        })
    await mainTable();
}

async function showDeleteWindow(id) {

    let thisUser = await fetchService.getUserById(`${id}`)
        .then(res => res.json());
    document.getElementById('deleteId').value = thisUser.id;
    document.getElementById('deleteName').value = thisUser.name;
    document.getElementById('deleteLastName').value = thisUser.lastName;
    document.getElementById('deleteAge').value = thisUser.age;
    document.getElementById('deleteEmail').value = thisUser.email;
    let selectDelete = document.getElementById('deleteRoles');
    $('#deleteRoles').empty();
    thisUser.roles.forEach(role => {
        selectDelete.add(new Option(role.title));
    });
}

async function delUser() {
    let id = document.getElementById('deleteId').value;
    await fetchService.deleteUser(id);
}

async function showEditWindow(id) {
    let thisUser = await fetchService.getUserById(`${id}`)
        .then(res => res.json());
    let roles = await fetchService.getAllRoles()
        .then(res => res.json());
    document.getElementById('editId').value = thisUser.id;
    document.getElementById('editName').value = thisUser.name;
    document.getElementById('editLastName').value = thisUser.lastName;
    document.getElementById('editAge').value = thisUser.age;
    document.getElementById('editPassword').value = thisUser.password;
    document.getElementById('editEmail').value = thisUser.email;
    let selectDelete = document.getElementById('editRoles');
    $('#editRoles').empty();
    roles.forEach(role => {
        if (containsObject(role, thisUser.roles)) {
            selectDelete.add(new Option(role.title, role.role, false, true));
        } else {
            selectDelete.add(new Option(role.title, role.role));
        }
    });
}

async function editUser() {
    let editUserForm = $('#edit-user-form')
    let id = editUserForm.find('#editId').val().trim();
    let name = editUserForm.find('#editName').val().trim();
    let lastName = editUserForm.find('#editLastName').val().trim();
    let age = editUserForm.find('#editAge').val().trim();
    let email = editUserForm.find('#editEmail').val().trim();
    let password = editUserForm.find('#editPassword').val().trim();
    let rolesArray = editUserForm.find('#editRoles').val()
    let roles = [];
    let tempRoles = await getAllRoles();
    for (let i = 0; i < tempRoles.length; i++) {
        for (let j = 0; j < rolesArray.length; j++) {
            if (tempRoles[i].role === rolesArray[j]) {
                roles.push(tempRoles[i]);
            }
        }
    }

    let data = {
        id: id,
        name: name,
        lastName: lastName,
        age: age,
        email: email,
        password: password,
        roles: roles
    }
    await fetchService.editUser(data)
        .then(() => {
            $('#editModal').modal('hide')
            $('#nav-user-table-tab').tab('show');

        });
    await mainTable();
}

$('#editModal').on('show.bs.modal', function (event) {
    let button = $(event.relatedTarget);
    let id = button.data('whatever')
    showEditWindow(id);
});

$('#deleteModal').on('show.bs.modal', function (event) {
    let button = $(event.relatedTarget);
    let id = button.data('whatever')
    showDeleteWindow(id);
});

function containsObject(obj, list) {
    for (let i = 0; i < list.length; i++) {
        if (list[i].role === obj.role) {
            return true;
        }
    }
    return false;
}

