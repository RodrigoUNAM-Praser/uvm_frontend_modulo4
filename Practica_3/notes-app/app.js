const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const notes = require('./notes');

yargs(hideBin(process.argv))

    // AGREGAR NOTAS
    .command({
        command: 'add',
        describe: 'Agregar una nueva nota',

        builder: {
            title: {
                describe: 'Título de la nota',
                demandOption: true,
                type: 'string'
            },
            body: {
                describe: 'Contenido de la nota',
                demandOption: true,
                type: 'string'
            }
        },

        handler(argv) {
            const result = notes.addNote(argv.title, argv.body);

            if (result) {
                console.log('Nota agregada correctamente.');
            } else {
                console.log('Ya existe una nota con ese título.');
            }
        }
    })

    // MOSTRAR NOTAS
    .command({
        command: 'list',
        describe: 'Mostrar todas las notas',

        handler() {
            const allNotes = notes.listNotes();

            if (allNotes.length === 0) {
                console.log('No hay notas guardadas.');
                return;
            }

            allNotes.forEach((note) => {
                console.log('Título: ' + note.title);
                console.log('Contenido: ' + note.body);
                console.log('----------------------');
            });
        }
    })

    // CONSULTAR UNA NOTA
    .command({
        command: 'read',
        describe: 'Consultar una nota',

        builder: {
            title: {
                describe: 'Título de la nota',
                demandOption: true,
                type: 'string'
            }
        },

        handler(argv) {
            const note = notes.findNote(argv.title);

            if (note) {
                console.log('Título: ' + note.title);
                console.log('Contenido: ' + note.body);
            } else {
                console.log('No se encontró la nota.');
            }
        }
    })

    // ELIMINAR NOTAS
    .command({
        command: 'remove',
        describe: 'Eliminar una nota',

        builder: {
            title: {
                describe: 'Título de la nota',
                demandOption: true,
                type: 'string'
            }
        },

        handler(argv) {
            const result = notes.removeNote(argv.title);

            if (result) {
                console.log('Nota eliminada correctamente.');
            } else {
                console.log('No se encontró la nota.');
            }
        }
    })

    .demandCommand(1, 'Debes indicar un comando.')
    .help()
    .parse();