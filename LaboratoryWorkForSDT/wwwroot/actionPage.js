
//получение всех саженцев
async function getSeedling() {

    const response = await fetch("/api/seedlings/", {
        method: "GET",
        headers: { "Accept": "application/json" }
    });

    if (response.ok === true) {

        const seedling = await response.json();

        let rows = document.querySelector("tbody");

        seedling.forEach(seedlings => {
            rows.append(row(seedlings));
        });

    }

}

//получение саженца по ID
async function getSeedlingByID(id) {

    const response = await fetch("/api/seedlings/" + id, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });

    if (response.ok == true) {

        const seedling = await response.json();

        const form = document.forms["seedlingForm"];
        form.elements["id"].value = seedling.id;
        form.elements["name"].value = seedling.nameSeedlings;
        form.elements["type"].value = seedling.typeSeedlings;
        form.elements["count"].value = seedling.countSeedlings;
        form.elements["price"].value = seedling.priceSeedlings;

    }

}

//создание саженца
async function createSeedling(name, type, count, price) {

    const response = await fetch("/api/seedlings", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            nameSeedlings: name,
            typeSeedlings: type,
            countSeedlings: parseInt(count, 10),
            priceSeedlings: parseInt(price, 10)
        })
    });

    if (response.ok === true) {

        const seedling = await response.json();
        reset();
        document.querySelector("tbody").append(row(seedling));

    }

}

//изменение данных саженцев
async function editSeedling(id, name, type, count, price) {

    const response = await fetch("/api/seedlings/" + id, {
        method: "PUT",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            id: parseInt(id, 10),
            name: name,
            type: type,
            count: parseInt(count, 10),
            price: parseInt(price, 10)
        })
    });

    if (response.ok === true) {

        const seedling = await response.json();
        reset();
        document.querySelector("tr[data-rowid='" + seedling.id + "']").replaceWith(row(seedling));

    }

}

//удаление саженца
async function deleteSeedling(id) {

    const response = await fetch("/api/seedlings/" + id, {
        method: "DELETE",
        headers: { "Accept": "application/json" }
    });

    if (response.ok === true) {

        const seedling = await response.json();
        document.querySelector("tr[data-rowid='" + seedling.id + "']").remove();
    }

}

//функция очистки формы
function reset() {

    const form = document.forms["seedlingForm"];
    form.reset();
    form.elements["id"].value = 0;

}

//функция добавления / удаления строк
function row(seedling) {

    const tr = document.createElement("tr");
    tr.setAttribute("data-rowid", seedling.id);

    const idTd = document.createElement("td");
    idTd.append(seedling.id);
    tr.append(idTd);

    const nameTd = document.createElement("td");
    nameTd.append(seedling.nameSeedlings);
    tr.append(nameTd);

    const typeTd = document.createElement("td");
    typeTd.append(seedling.typeSeedlings);
    tr.append(typeTd);

    const countTd = document.createElement("td");
    countTd.append(seedling.countSeedlings);
    tr.append(countTd);

    const priceTd = document.createElement("td");
    priceTd.append(seedling.priceSeedlings);
    tr.append(priceTd);

    const linksTd = document.createElement("td");

    const editLink = document.createElement("a");
    editLink.setAttribute("data-id", seedling.id);
    editLink.setAttribute("style", "cursor:pointer;padding:15px;");
    editLink.append("Edit data");

    editLink.addEventListener("click", e => {
        e.preventDefault();
        getSeedlingByID(seedling.id);
    });

    linksTd.append(editLink);

    const removeLink = document.createElement("a");
    removeLink.setAttribute("data-id", seedling.id);
    removeLink.setAttribute("style", "cursor:pointer;padding:15px;");
    removeLink.append("Delete data");

    removeLink.addEventListener("click", e => {
        e.preventDefault();
        deleteSeedling(seedling.id);
    });

    linksTd.append(removeLink);
    tr.appendChild(linksTd);
    return tr;

}

//функция заполнения таблицы
function mainFunc() {

    document.getElementById("reset").click(function (e) {
        e.preventDefault();
        reset();
    })

    document.forms["seedlingForm"].addEventListener("submit", e => {
        e.preventDefault();

        const form = document.forms["seedlingForm"];

        const id = form.elements["id"].value;
        const name = form.elements["name"].value;
        const type = form.elements["type"].value;
        const count = form.elements["count"].value;
        const price = form.elements["price"].value;

        if (id == 0)
            createSeedling(name, type, count, price);
        else
            editSeedling(id, name, type, count, price)


    });

    getSeedling();

}