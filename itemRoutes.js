/**Routes for items in shopping app. */

const express = require("express");

const db = require("./fakeDb");
const router = new express.Router();

module.exports = router;

/**GET/items: returns a list of shopping items */
router.get("/", function(req, res){
  return res.json({ items: db.items});
});


/**POST/items: accepts JSON body and adds an item to database and return it*/
router.post("/", function(req, res){

});


/**GET/items/:name : returns a single item */
router.get("/:name", function(req, res){

});


/**PATCH/items/:name: accepts JSON body, modifies item and returns it */
router.patch("/:name", function(req, res){

});


/**DELETE/items/:name: delete item and returns JSON object saying it
 * successfully deleted  */
router.delete("/:name", function(req, res){

});