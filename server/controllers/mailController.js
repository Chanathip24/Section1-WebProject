const db = require('../config/db')

//user promise
const Jabwanttoquerying = (query,value) => new Promise((resolve,reject)=>{
    db.query(query,value,(err,result)=>{
        if(err) reject(err);
        resolve(result)
    })
})

exports.getAllmail = async (req,res)=>{
    const query = "select * from contactmail"
    try {
        const data = await Jabwanttoquerying(query)
        res.json(data)
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.getMailbyID = async (req,res)=>{
    const query = "select * from contactmail where mail_id = ?"
    const id = req.params.id

    try {
        const data = await Jabwanttoquerying(query,id)
        res.json(data)
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.createMail = async (req,res) =>{
    const query = "INSERT INTO contactmail(name,email,message) VALUES(?,?,?)"

    //data
    const {name,email,message} = req.body
    try {
        await Jabwanttoquerying(query,[name,email,message])
        res.json("Sent email success fully")
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.deleteMail = async (req,res)=>{
    const {id} = req.params

    const query = "DELETE FROM contactmail where mail_id = ?"
    try {
        await Jabwanttoquerying(query,id)
        res.json({msg : "Delete success"})
    } catch (error) {
        res.status(500).json({error})
    }
}