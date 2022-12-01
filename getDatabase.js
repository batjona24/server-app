async function getDatabase(){
    const database = await fsp.readFile("database.json", "utf-8")
    const databaseParsed = JSON.parse(database)

}