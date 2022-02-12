const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/', (req, res) => {
    console.log('in GET designer router');
    pool.query(`
    SELECT * FROM "designer";
    `).then(dbRes => {
        console.log('dbRes.rows designers is:', dbRes.rows);
        res.send(dbRes.rows)
    }).catch(err => {
        console.error('err in get designers', err);
        res.sendStatus(500);
    })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;