const express = require('express');
const { matrimimschema } = require('./schema/s_matrimim');
const routerMatrimim = express.Router();
const matrimimData = require('./data/matrimim_data'); 
        //הכנסה למונגו
routerMatrimim.get('/import', async (req, res) => {
    try {
        await matrimimschema.insertMany(matrimimData);
        res.send("נתוני המתרמים הועברו בהצלחה למונגו!");
    } catch (err) {
        res.status(500).send("שגיאה בהעברת הנתונים: " + err.message);
    }
});
//קבלת מתרים על פי ת.ז
routerMatrimim.get('/', async (req, res) => {
    const id = req.query.id; 
    if (id) {
        
        const specificmatrim = await matrimimschema.findOne({id: id});
        res.json(specificmatrim);
    } else {
        const allmatrimim = await matrimimschema.find({});
        res.json(allmatrimim);
    }
});

//הוספת מתרים
routerMatrimim.post("/user", async (req,res)=>{ 
    try{
        await matrimimschema.create(req.body);
    res.send("done!!");
    } catch (err) {
        res.status(500).send("שגיאה בהעברת הנתונים: " + err.message);
    }
});
//מחיקת מתרים על פי שמו
routerMatrimim.delete("/:name", async (req, res) => {
  try {
    const deleted = await matrimimschema.findOneAndDelete({
      name: req.params.name
    });
    if (!deleted) {
      return res.status(404).send("לא נמצא נתון למחיקה");
    }
    res.send("נמחק בהצלחה");
  } catch (err) {
    res.status(500).send("שגיאה במחיקה: " + err.message);
  }
});
module.exports = routerMatrimim;