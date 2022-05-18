import { App, Database } from "./providers/index"


const app = App.getInstance()
const db = Database.getInstance()

app.initializeConnection()
db.initialize()