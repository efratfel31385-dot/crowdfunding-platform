const express = require('express');
const { groupschema } = require('./schema/s_groups');
const routerGroups = express.Router();
const groupsData = require('./data/groups_data');

routerGroups.get('/import', async (req, res) => {
    try {
        //הכנסה למונגו
        await groupschema.insertMany(groupsData);
        res.send("כל הנתונים הועברו בהצלחה למונגו!");
    } catch (err) {
        res.status(500).send("שגיאה בהעברת הנתונים: " + err.message);
    }
});

//קבלת הקבוצה על פי קוד וללא קוד כל הקבוצות
routerGroups.get('/', async (req, res) => {
    const groupcode = req.query.code; 
    
    if (groupcode) {
        const specificgroup = await groupschema.findOne({code: groupcode});
        res.json(specificgroup);
    } else {
        const allgroups = await groupschema.find({});
        res.json(allgroups);
    }
});
//מחיקת קבוצה על פי name
routerGroups.delete("/:name", async (req, res) => {
  try {
    const deleted = await groupschema.findOneAndDelete({
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
//בקבלת שם של קבוצה מוחזר היעד שלה
routerGroups.get('/name', async (req, res) => {
    const name = req.query.name; 
    if (name) {
        const group = await groupschema.findOne({name:{ $regex: `^${name}$`, $options: "i" }});
        res.json(group.yaad);
    } else {
        res.json("לא נמצאה קבוצה");
    }
});
// עדכון קבוצה
routerGroups.put("/:code", async (req, res) => {
  try {
    const updated = await groupschema.findOneAndUpdate(
      { code: req.params.code },
      req.body,
      { new: true }
    );
    if (!updated) {
      return res.status(404).send("לא נמצא נתון לעדכון");
    }
    res.json(updated);
  } catch (err) {
    res.status(500).send("שגיאה בעדכון: " + err.message);
  }
});


module.exports = routerGroups;
