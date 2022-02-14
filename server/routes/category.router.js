const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/', (req, res) => {
    console.log('in GET category router');
    pool.query(`
        SELECT * FROM "category"
        ORDER BY "category"."name" ASC;
    `).then(dbRes => {
        console.log('dbRes.rows is:', dbRes.rows);
        res.send(dbRes.rows)
    }).catch(err => {
        console.error('err in get category', err);
        res.sendStatus(500);
    })
});

router.post('/', (req, res) => {

    const queryText = `
        INSERT INTO "category"("name")
        VALUES($1);
    `;

    pool
    .query(queryText, [Object.keys(req.body)[0]])
    .then((dbRes) => {
        console.log(`Added category database`);
        res.sendStatus(201); 
    })
    .catch((error) => {
        console.log(`Error adding category to database`);
        res.sendStatus(500);
    })
});

router.delete('/:category', (req, res) => {
    console.log("DELETE category req.params:", req.params);
    const queryText = `
        DELETE FROM "category"
        WHERE "name" = $1;
    `;

    pool
    .query(queryText, [req.params.category])
    .then((result) => {
        res.sendStatus(201);
    })
    .catch((error) => {
        console.log(`Error on category delete`, error);
        res.sendStatus(500);
    });
});

module.exports = router;