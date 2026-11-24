const express = require('express');
const { tromutschema } = require('./schema/s_tromut');
const routerTromut = express.Router();
const tromutData = require('./data/tromut_data');


routerTromut.get('/import', async (req, res) => {
    try {
        //הכנסה למונגו
        await tromutschema.insertMany(tromutData);
        res.send("כל הנתונים הועברו בהצלחה למונגו!");
    } catch (err) {
        res.status(500).send("שגיאה בהעברת הנתונים: " + err.message);
    }
});
//שליפת תרומה על פי קוד או כל התרומות אם אין קוד
routerTromut.get('/', async (req, res) => {
    const trumacode = req.query.code; 
    
    if (trumacode) {
        const specifictruma = await tromutschema.findOne({code: trumacode});
        res.json(specifictruma);
    } else {
        const alltrumut = await tromutschema.find({});
        res.json(alltrumut);
    }
});
//הוספת תרומה
routerTromut.post("/user", async (req,res)=>{ 
    try{
        await tromutschema.create(req.body);
    res.send("done!!");
    } catch (err) {
        res.status(500).send("שגיאה בהעברת הנתונים: " + err.message);
    }
});

module.exports = routerTromut;


