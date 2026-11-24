const express = require('express')
const routerTurmim = express.Router();
const turmimData = require('./data/turmim_data'); 
const { turmimschema } = require('./schema/s_turmim');
routerTurmim.get('/import', async (req, res) => {
    try {
        //הכנסה למונגו
        await turmimschema.insertMany(turmimData);
        res.send("כל הנתונים הועברו בהצלחה למונגו!");
    } catch (err) {
        res.status(500).send("שגיאה בהעברת הנתונים: " + err.message);
    }
});
//שליפת התורם שהת.ז שלו התקבל כפרמטר או כל התורמים
routerTurmim.get('/', async (req, res) => {
    const turemId = req.query.id; 
    if (turemId) {
        const specificTurem = await turmimschema.findOne({id: turemId});
        res.json(specificTurem);
    } else {
        const allTurmim = await turmimschema.find({});
        res.json(allTurmim);
    }
});
//הוספת תורם
routerTurmim.post("/user", async (req,res)=>{ 
    try{
        await turmimschema.create(req.body);
    res.send("done!!");
    } catch (err) {
        res.status(500).send("שגיאה בהעברת הנתונים: " + err.message);
    }
});

module.exports = routerTurmim;
