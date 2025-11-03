const btnsubmit = document.getElementById('submit');
const inputName = document.getElementById('name');
const inputAge = document.getElementById('age');
const inputEmail = document.getElementById('email');
const btnList = document.getElementById('btnList');
const personList = document.getElementById('personList');

//crear bd con pouchdv

const db = new PouchDB('personas');

btnsubmit.addEventListener('click', (event) => {
    event.preventDefault();

    const persona = {
        _id: new Date().toISOString(),
        name: inputName.value.trim(),
        age: inputAge.value.trim(),
        email: inputEmail.value.trim(),
        status: 'pending'
    };

    if (!persona.name || !persona.age || !persona.email) {
        alert("Campos obligatorios");
        return;
    }

    db.put(persona)
        .then(() => {
            console.log('Persona guardada con exito');
            inputName.value = '';
            inputAge.value = '';
            inputEmail.value = '';
            listarPersonas();
        }).cath((err) => {
            console.error('Error al guardar la persona', err);
        });
})

// Funcion para listar personas
btnList.addEventListener('click', listarPersonas);

function listarPersonas() {
    personList.innerHTML = ''; // Limpiar

    db.allDocs({ include_docs: true })
        .then((result) => {
            result.rows.forEach((row) => {
                const persona = row.doc;

                // Crea cards
                const card = document.createElement('div');
                card.classList.add('card');
                card.innerHTML = `
                    <h3>${persona.name}</h3>
                    <p><strong>Edad:</strong> ${persona.age}</p>
                    <p><strong>Email:</strong> ${persona.email}</p>
                    <button class="btnDelete" data-id="${persona._id}" data-rev="${persona._rev}">Eliminar</button>
                `;

                personList.appendChild(card);
            });

            const deleteButtons = document.querySelectorAll('.btnDelete');
            deleteButtons.forEach((btn) => {
                btn.addEventListener('click', () => {
                    const id = btn.getAttribute('data-id');
                    const rev = btn.getAttribute('data-rev');
                    eliminarPersona(id, rev);
                });
            });
        })
        .catch((err) => {
            console.error('Error al listar personas', err);
        });
}

// Funcion para eliminar personas
function eliminarPersona(id, rev) {
    db.remove(id, rev)
        .then(() => {
            console.log('Persona eliminada');
            listarPersonas();
        })
        .catch((err) => {
            console.error('Error al eliminar persona', err);
        });
}