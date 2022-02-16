const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    console.log('in GET admin users router');
    pool.query(`
    SELECT * FROM "user"
    ORDER BY "user"."username" ASC;
    `).then(dbRes => {
        console.log('dbRes.rows users is:', dbRes.rows);
        res.send(dbRes.rows)
    }).catch(err => {
        console.error('err in get all users for admin', err);
        res.sendStatus(500);
    })
});

module.exports = router;