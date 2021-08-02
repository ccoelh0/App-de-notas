const addBtn = document.getElementById("add");
const bodyDiv = document.querySelector(".body");
const notes = JSON.parse(localStorage.getItem("notes"));

if (notes) {
  notes.forEach((note) => {
    addNuevaNota(note);
  });
}

addBtn.addEventListener("click", () => {
  addNuevaNota();
});

function addNuevaNota(text = "") {
  const note = document.createElement("div");
  note.classList.add("note");

  //el ? es if ternario: El operador condicional (ternario) es el único operador en JavaScript que tiene tres operandos. Este operador se usa con frecuencia como atajo para la instrucción if.

  note.innerHTML = `
  <div class="notes">
      <div class="tools">
          <button class="edit"><i class="fas fa-edit"></i></button>
          <button class="delete"><i class="fas fa-trash-alt"></i></button>
      </div>
      <div class="main ${text ? "" : "hidden"}"></div>
      <textarea class="${text ? "hidden" : ""}"></textarea>
  </div>
`;

  const editBtn = note.querySelector(".edit");
  const deleteBtn = note.querySelector(".delete");

  const main = note.querySelector(".main");
  const textArea = note.querySelector("textarea");

  textArea.value = text;
  main.innerHTML = marked(text);

  editBtn.addEventListener("click", () => {
    main.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
  });

  deleteBtn.addEventListener("click", () => {
    note.remove();
    actualizarLS();
  });

  textArea.addEventListener("input", (e) => {
    const { value } = e.target;

    main.innerHTML = marked(value);

    actualizarLS();
  });

  bodyDiv.appendChild(note);
}

function actualizarLS() {
  const notesText = document.querySelectorAll("textarea");
  const notes = [];

  notesText.forEach((note) => {
    notes.push(note.value);
  });

  localStorage.setItem("notes", JSON.stringify(notes));
}
