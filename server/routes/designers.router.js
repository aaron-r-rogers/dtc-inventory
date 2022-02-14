const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/', (req, res) => {
    console.log('in GET designer router');
    pool.query(`
    SELECT * FROM "designer"
    ORDER BY "designer"."name" ASC;
    `).then(dbRes => {
        console.log('dbRes.rows designers is:', dbRes.rows);
        res.send(dbRes.rows)
    }).catch(err => {
        console.error('err in get designers', err);
        res.sendStatus(500);
    })
});

router.post('/', (req, res) => {

    const queryText = `
        INSERT INTO "designer"("name")
        VALUES($1);
    `;

    pool
    .query(queryText, [Object.keys(req.body)[0]])
    .then((dbRes) => {
        console.log(`Added designer database`);
        res.sendStatus(201); 
    })
    .catch((error) => {
        console.log(`Error adding designer to database`);
        res.sendStatus(500);
    })
});

router.delete('/:designer', (req, res) => {
    console.log("DELETE designer req.params:", req.params);
    const queryText = `
        DELETE FROM "designer"
        WHERE "name" = $1;
    `;

    pool
    .query(queryText, [req.params.designer])
    .then((result) => {
        res.sendStatus(201);
    })
    .catch((error) => {
        console.log(`Error on designer delete`, error);
        res.sendStatus(500);
    });
});

module.exports = router;