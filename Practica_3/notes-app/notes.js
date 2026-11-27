const fs = require('fs');
const path = require('path');

// Ubicación del archivo JSON
const filePath = path.join(__dirname, 'notes.json');

// Leer las notas
const loadNotes = () => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            return [];
        }

        throw error;
    }
};

// Guardar las notas
const saveNotes = (notes) => {
    const data = JSON.stringify(notes, null, 2);
    fs.writeFileSync(filePath, data, 'utf8');
};

// Agregar una nota
const addNote = (title, body) => {
    const notes = loadNotes();

    const cleanTitle = title.trim();

    if (!cleanTitle) {
        throw new Error('El título no puede estar vacío.');
    }

    const duplicate = notes.find(
        (note) => note.title.toLowerCase() === cleanTitle.toLowerCase()
    );

    if (duplicate) {
        return false;
    }

    notes.push({
        title: cleanTitle,
        body: body
    });

    saveNotes(notes);
    return true;
};

// Consultar todas las notas
const listNotes = () => {
    return loadNotes();
};

// Buscar una nota por título
const findNote = (title) => {
    const notes = loadNotes();

    return notes.find(
        (note) => note.title.toLowerCase() === title.trim().toLowerCase()
    );
};

// Eliminar una nota
const removeNote = (title) => {
    const notes = loadNotes();

    const filteredNotes = notes.filter(
        (note) => note.title.toLowerCase() !== title.trim().toLowerCase()
    );

    if (filteredNotes.length === notes.length) {
        return false;
    }

    saveNotes(filteredNotes);
    return true;
};

// Exportar funciones
module.exports = {
    addNote,
    listNotes,
    findNote,
    removeNote
};