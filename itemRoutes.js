/**Routes for items in shopping app. */

const express = require("express");
//should we import expressError in both router file and app file or just in app file?
const { NotFoundError } = require("./expressError");

const db = require("./fakeDb");
const router = new express.Router();

/**GET/items: returns a list of shopping items */
router.get("/", function(req, res){
  return res.json({ items: db.items});
});


/**POST/items: accepts JSON body and adds an item to database and return it*/
router.post("/", function(req, res){
  const name = req.body.name;
  const price = req.body.price;
  db.items.push({
    name,
    price
  });
  return res.json({
    added:{
      name,
      price
    }
  });
});


/**GET/items/:name : returns a single item */
router.get("/:name", function(req, res){
  const itemName = req.params.name;
  for(const item of db.items){
    if(item["name"] === itemName){
      return res.json(item);
    }
  }
  throw new NotFoundError();
});


/**PATCH/items/:name: accepts JSON body, modifies item and returns it */
router.patch("/:name", function(req, res){
  const itemName = req.params.name;
  const updateItem = req.body;

  for(let item of db.items){
    if(item["name"] === itemName){
      const i = db.items.indexOf(item);
      db.items[i] = updateItem;

      return res.json({
        updated: db.items[i]
      });
    }
  }
  throw new NotFoundError();
});


/**DELETE/items/:name: delete item and returns JSON object saying it
 * successfully deleted  */
router.delete("/:name", function(req, res){
  const itemName = req.params.name;
  for(let i = 0; i < db.items.length; i++){
    if(db.items[i].name === itemName){
      db.items.splice(i, 1);

      return res.json({message: "Deleted"})
    }
  }
  throw new NotFoundError();
});

module.exports = router;