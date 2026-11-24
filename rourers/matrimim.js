const express = require('express');
const { matrimimschema } = require('./schema/s_matrimim');

const routerMatrimim = express.Router();



routerMatrimim.get('/import', async (req, res) => {
  try {
    res.json({ ok: true, msg: 'import route works' });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});


routerMatrimim.get('/', async (req, res) => {
  try {
    const id = req.query.id;

    if (id) {
      const specificmatrim = await matrimimschema.findOne({ id: id });
      return res.json(specificmatrim);
    } else {
      const allmatrimim = await matrimimschema.find({});
      return res.json(allmatrimim);
    }
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

routerMatrimim.post('/', async (req, res) => {
  try {
    res.json({ ok: true, msg: 'POST handler for /matrimim route.', body: req.body });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

module.exports = routerMatrimim;
