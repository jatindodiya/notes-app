const fs = require('fs')
const chalk = require("chalk")

const getNotes = () => {
    return 'Your notes...'
}

const addNote = (title, body) => {
    const notes = loadNotes()
    // const duplicateNotes = notes.filter( (note) => note.title === title )
    const duplicateNote = notes.find( (note) => note.title === title )

    // if (duplicateNotes.length === 0) {
    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log('New note added!')
    } else {
        console.log('Note title taken!')
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

const removeNotes = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter( (note) => note.title !== title )

    if(notes.length > notesToKeep.length){
        console.log(chalk.green.inverse("Notes removed!"))
        saveNotes(notesToKeep)
    }
    else{
        console.log(chalk.red.inverse("No note found"))
    }
}

const showAllNotes = () => {
    console.log(chalk.inverse("Your Notes!"))
    const notes = loadNotes()
    notes.forEach( note => {
        console.log(note.title)
    });
    // console.log(notes)
}

const readNote = (title) => {
    const notes = loadNotes()
    const read_note = notes.find( (note) => note.title === title )
    if(read_note){
        console.log(read_note)
    }else{
        console.log(chalk.inverse.red("No note found :("))
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNotes: removeNotes,
    showAllNotes: showAllNotes,
    readNote: readNote
}