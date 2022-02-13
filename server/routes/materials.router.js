const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/', (req, res) => {
    console.log('in GET materials router');
    pool.query(`
    SELECT ARRAY_AGG("material"."name" 
        ORDER BY "material"."name") AS "materials"
    FROM "material";
    `).then(dbRes => {
        console.log('dbRes.rows material is:', dbRes.rows);
        res.send(dbRes.rows)
    }).catch(err => {
        console.error('err in get material', err);
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