const request = require("supertest");
const router = require("./itemRoutes");
const app = require("./app");
const db = require("./fakeDb");

// let item = {
//   name:"hawaii",
//   price:"1000000000000000000000000000000000000"
// };
let items = [
  {
    name:"hawaii",
    price:"100000000000000000000000"
  },
  {
    name:"california",
    price:"1000000000000000000000000000000000000"
  },
];

beforeEach(function(){
  db.items = items;
});

describe("GET /items", function(){
  it("Gets a list of items", async function(){
    const resp = await request(app).get('/items');

    expect(resp.body).toEqual({
      items: items
    });
  });
});

describe("POST /items", function(){
  it("add item to the list", async function(){
    const resp = await request(app)
    .post('/items')
    .send(
      {
        name:"north carolina",
        price:"1000000000000000"
      }
    );

    expect(resp.body).toEqual({
      added:
      {
        name:"north carolina",
        price:"1000000000000000"
      }
    });
  });
});


describe("GET /items:name", function(){
  it("get an item", async function(){
    const resp = await request(app).get('/items/hawaii');

    expect(resp.body).toEqual(
      {
        name:"hawaii",
        price:"100000000000000000000000"
      }
    );

  })
})




