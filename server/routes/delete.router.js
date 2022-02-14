const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.delete('/:id', (req, res) => {

    const queryText = `
        DELETE FROM "furniture"
        WHERE "id" = $1;
    `;

    pool.query(queryText, [req.params.id])
    .then(dbRes => {
        console.log('Delete successful');
        res.sendStatus(201);
    }).catch(err => {
        console.error('err in delete', err);
        res.sendStatus(500);
    })
});

module.exports = router;