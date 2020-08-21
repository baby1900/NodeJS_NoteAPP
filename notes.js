const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => 'print test'

const addNote = (title, body) => {
    const notes = loadNotes()
    
    const duplicateNote = notes.find((note) => note.title === note)

    if (!duplicateNote){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log(chalk.red.inverse('Duplication found!'))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const noteByTitle = notes.filter((note) => note.title !== title)
    
    if (noteByTitle.length === notes.length){
        console.log(chalk.red.inverse('No such note!'))
    } else {
        saveNotes(noteByTitle)
        console.log(chalk.green.inverse('Note removed!'))
    }
}

const readNote = (title) => {
    const notes = loadNotes()
    const desiredNote = notes.find((note) => note.title === title)

    if(desiredNote){
        console.log('Title: ' + desiredNote.title)
        console.log('Body: ' + desiredNote.body)
    } else {
        console.log(chalk.red.inverse('No such note!'))
    }
}


const listNote = () => {
    const notes = loadNotes()
    console.log(chalk.blue.inverse('Your Notes:'))
    notes.forEach(element => console.log('Title: ' + element.title + ' Body: ' + element.body))
}


const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e){
        return []
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNote: listNote,
    readNote: readNote
}