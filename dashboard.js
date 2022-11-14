fetch("https://jsonplaceholder.typicode.com/users").then((data) => {
    return data.json(); //converted to object

}).then((objectData) => {
    let tableData = "";
    objectData.map((values) => {
        tableData += `<tr>
        <td> ${values.id}</td>
        <td> ${values.name}</td>
        <td> ${values.username}</td>
        <td> ${values.email}</td>
        <td> ${values.address.street}</td>
        <td> ${values.address.suite}</td>
        <td> ${values.address.city}</td>
        <td> ${values.address.zipcode}</td>
        <td> ${values.address.geo.lat}</td>
        <td> ${values.address.geo.ing}</td>
        <td> ${values.phone}</td>
        <td> ${values.website}</td>
        <td> ${values.company.name}</td>
        <td> ${values.company.catchPhrase}</td>
        <td> ${values.bs}</td>
        <td> '<button class="btn btn-primary" onclick="onEdit(this)">Edit</button> <button class="btn btn-danger" onClick="onDelete(this)">Delete</button>'</td>
      
        </tr>`;


    });
    document.getElementById("body").innerHTML = tableData;
})

onShow = () => {
    document.getElementById("form").style.display = "block";
    document.getElementById("table").style.display = "none";
}
addData = () => {
    var id = document.getElementById("id").value.trim();
    var nameinput = document.getElementById("name").value.trim();
    var usernameinput = document.getElementById("username").value.trim();
    var emailinput = document.getElementById("email").value.trim();
    var streetinput = document.getElementById("street").value.trim();
    var suiteinput = document.getElementById("suite").value.trim();
    var cityinput = document.getElementById("city").value.trim();
    var zipcodeinput = document.getElementById("zipcode").value.trim();
    var latitideinput = document.getElementById("latitude").value.trim();
    var longitudeinput = document.getElementById("longitude").value.trim();
    var phnoinput = document.getElementById("phno").value.trim();
    var websiteinput = document.getElementById("website").value.trim();
    var cmpynameinput = document.getElementById("cmpyname").value.trim();
    var catchphraseinput = document.getElementById("catchphrase").value.trim();
    var cmpybsinput = document.getElementById("cmpybs").value.trim();
    tbody = document.getElementById("body");
    var geo = {}, userinput = {}, company = {}, address = {};
    userinput = {
        name: nameinput,
        username: usernameinput,
        email: emailinput,
        address: {
            street: streetinput,
            suite: suiteinput,
            city: cityinput,
            zipcode: zipcodeinput,
            geo: {
                lat: latitideinput,
                lng: longitudeinput
            }
        },
        phone: phnoinput,
        website: websiteinput,
        company: {
            name: cmpynameinput,
            catchPhrase: catchphraseinput,
            bs: cmpybsinput
        }
    }
    console.log("User Input: ", userinput);

    fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(userinput)
    })
        .then(response => {
            if (response.ok) { console.log("POST request successfully"); }
            else { throw new Error("POST request unsuccessfully"); }
            return response;
        })
        .then(response => response.json())
        .then(newdata => tdata(newdata))
    tdata = (newdata) => {
        var newRow = tbody.insertRow();
        var cell = newRow.insertCell(0);
        cell.innerHTML = newdata.id;
        var cell = newRow.insertCell(1);
        cell.innerHTML = newdata.name;
        var cell = newRow.insertCell(2);
        cell.innerHTML = newdata.username;
        var cell = newRow.insertCell(3);
        cell.innerHTML = newdata.email;
        var cell = newRow.insertCell(4);
        cell.innerHTML = newdata.address.street;
        var cell = newRow.insertCell(5);
        cell.innerHTML = newdata.address.suite;
        var cell = newRow.insertCell(6);
        cell.innerHTML = newdata.address.city;
        var cell = newRow.insertCell(7);
        cell.innerHTML = newdata.address.zipcode;
        var cell = newRow.insertCell(8);
        cell.innerHTML = newdata.address.geo.lat;
        var cell = newRow.insertCell(9);
        cell.innerHTML = newdata.address.geo.lng;
        var cell = newRow.insertCell(10);
        cell.innerHTML = newdata.phone;
        var cell = newRow.insertCell(11);
        cell.innerHTML = newdata.website;
        var cell = newRow.insertCell(12);
        cell.innerHTML = newdata.company.name;
        var cell = newRow.insertCell(13);
        cell.innerHTML = newdata.company.catchPhrase;
        var cell = newRow.insertCell(14);
        cell.innerHTML = newdata.company.bs;
        console.log("Add data successfully");
        document.getElementById("form").style.display = "none";
        document.getElementById("table").style.display = "";
    }
}
onDelete = (t) => {
    rowindex = t.parentNode.parentNode.rowIndex;
    fetch("https://jsonplaceholder.typicode.com/users/" + (rowindex), {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json'
        }

    })
    document.getElementById("table").deleteRow(rowindex);
    console.log("index", rowindex);
}
onEdit = () => {
    rowindex = t.parentNode.parentNode.rowIndex;
}