const express = require('express');
const app = express();
const PORT = 4000
const {Pool} = require('pg')
const cors = require("cors")

const pool = new Pool({
    connectionString: `postgresql://postgres:postgres@db:5432/postgres`
})

app.use(cors())

app.get("/", async(req,res)=>{
    
    const client = await pool.connect() 
    
    const query = await client.query("SELECT NOW() as now")

    res.send(query.rows[0])

    await client.end()
})

app.listen(PORT, (req, res) => {
    console.log("listening on port: "+ PORT);
})