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

router.put('/', (req, res) => {
    
    const queryText = `
        UPDATE "user"
        SET "authLevel" = $1
        WHERE "id" = $2;
    `;

    const queryParams = [
        req.body.authLevel,
        req.body.id
    ]

    pool
    .query(queryText, queryParams)
    .then(() => res.sendStatus(201))
    .catch((err) => {
        console.log('User auth admin.router PUT endpoint failed: ', err);
        res.sendStatus(500);
    });
})

module.exports = router;