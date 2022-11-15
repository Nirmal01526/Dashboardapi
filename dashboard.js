var action= `<button class="btn btn-success" onclick="onEdit(this)">Edit</button><button class="btn btn-danger" onclick="ondelete(this)">Delete</button></td>`

const xhttp = new XMLHttpRequest();
xhttp.open("GET", "https://jsonplaceholder.typicode.com/users");
xhttp.send();
xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        const obj = JSON.parse(this.responseText);
        let tableData = "";
        obj.map((values) => {
            tableData += `<tr>
    <td>${values.id}</td>
    <td> ${values.name}</td>
    <td> ${values.username}</td>
    <td> ${values.email}</td>
    <td> ${values.address.street}</td>
    <td> ${values.address.suite}</td>
    <td> ${values.address.city}</td>
    <td> ${values.address.zipcode}</td>
    <td> ${values.address.geo.lat}</td>
    <td> ${values.address.geo.lng}</td>
    <td> ${values.phone}</td>
    <td> ${values.website}</td>
    <td> ${values.company.name}</td>
    <td> ${values.company.catchPhrase}</td>
    <td> ${values.bs}</td>
    <td> <button class="btn btn-success" onclick="onEdit(this)">Edit</button><button class="btn btn-danger" onclick="ondelete(this)">Delete</button></td>

    </tr>`;
        })
        document.getElementById("body").innerHTML = tableData;
    }
}


onShow = () => {
    document.getElementById("form").style.display = "block";
    document.getElementById("table").style.display = "none";
}
enteredInput = () => {
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
    return userinput;
}
addData = () => {
    userinput = enteredInput();

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
onEdit = (t) => {
    document.getElementById("submit").style.display = "none";
    document.getElementById("form").style.display = "block";
    document.getElementById("table").style.display = "none";
    rowindex = t.parentNode.parentNode.rowIndex;
    posturl = "https://jsonplaceholder.typicode.com/users/" + rowindex;
    try {
        xml = new XMLHttpRequest();
        xml.onload = function () {
            if (xml.status > 199 && xml.status < 300) {
                data = JSON.parse(this.response);
                document.getElementById("id").value = data.id;
                document.getElementById("name").value = data.name;
                document.getElementById("username").value = data.username;
                document.getElementById("email").value = data.email;
                document.getElementById("street").value = data.address.street;
                document.getElementById("suite").value = data.address.suite;
                document.getElementById("city").value = data.address.city;
                document.getElementById("zipcode").value = data.address.zipcode;
                document.getElementById("latitude").value = data.address.geo.lat;
                document.getElementById("longitude").value = data.address.geo.lng;
                document.getElementById("phno").value = data.phone;
                document.getElementById("website").value = data.website;
                document.getElementById("cmpyname").value = data.company.name;
                document.getElementById("catchphrase").value = data.company.catchPhrase;
                document.getElementById("cmpybs").value = data.company.bs;
            }
            else throw new Error("Get request unsuccessfull !");
        };
        xml.open("GET", posturl);
        xml.send();
    } catch (error) {
        console.log(error);
    }
}
onUpdate = () => {
    userinput = enteredInput();
    try {
        fetch(posturl, {
            method: "PUT",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userinput)
        })
            .then(response => {
                if (response.ok) console.log("PUT request successfully");
                else throw new Error("PUT request unsuccessfully");
                return response;
            })
            .then(response => response.json())
            .then(data => putMethod(data))
        putMethod = (data) => {
            var cells = document.getElementById("table").rows[rowindex].cells;
            cells[0].innerHTML = data.id;
            cells[1].innerHTML = data.name;
            cells[2].innerHTML = data.username;
            cells[3].innerHTML = data.email;
            cells[4].innerHTML = data.address.street;
            cells[5].innerHTML = data.company.bs;
            cells[6].innerHTML = data.address.suite;
            cells[7].innerHTML = data.address.city;
            cells[8].innerHTML = data.address.zipcode;
            cells[9].innerHTML = data.address.geo.lat;
            cells[10].innerHTML = data.address.geo.lng;
            cells[11].innerHTML = data.phone;
            cells[12].innerHTML = data.website;
            cells[13].innerHTML = data.company.name;
            cells[14].innerHTML = data.company.catchPhrase;
            cells[15].innerHTML = data.action;
        }
    } catch (error) {
        console.log(error);
    }


    console.log("Add data successfully");
    document.getElementById("form").style.display = "none"
    document.getElementById("table").style.display = "block";

}
cenCel = () => {
    document.getElementById("form").style.display = "none";
    document.getElementById("table").style.display = "block";
}
