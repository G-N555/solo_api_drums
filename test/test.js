const request = require("supertest");
const knex = require("../db/knex");
const app = require("../app");
const { expect, assert } = require("chai");
const mockDrums = require("./mockDrums");

const additionalDrum = {
  id: 9,
  name: "Additional",
  brand: "Nakano",
  price: "200,000",
  url: "https://www.Nakanofake.com/this/is/a/fake/url/"
};

const changeDrum = {
  name: "changeMan",
  brand: "Changed",
  price: "41,744",
  url: "https://www.Nakanofake.com/this/is/a/fake/url/"
};

describe("drumShop test", () => {
  before(done => {
    //run migrations
    knex.migrate
      .latest()
      .then(() => {
        //run seeds
        return knex.seed.run();
      })
      .then(() => done());
  });

  it("Lists all Records", async () => {
    await request(app)
      .get("/api/v1/drums")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body).to.be.a("array");
        expect(res.body).to.deep.equal(mockDrums);
      });
  });

  it("show one drum", async () => {
    await request(app)
      .get("/api/v1/drums/5")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body).to.be.a("object");
        expect(res.body.name).to.be.eql(mockDrums[4].name);
      });
  });

  it("adds one drum", async () => {
    await request(app)
      .post("/api/v1/drums/")
      .send(additionalDrum)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        mockDrums.push(additionalDrum);
        expect(res.body).to.be.deep.equal(mockDrums);
        expect(res.body[res.body.length - 1].brand).to.be.equal("Nakano");
      });
  });

  it("updates one drum", async () => {
    await request(app)
      .patch("/api/v1/drums/1")
      .send(changeDrum)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body[0].name).to.be.equal("changeMan");
        expect(res.body[0].brand).to.be.equal("Changed");
        expect(res.body[0].price).to.be.equal("41,744");
      });
  });

  it("remove one drum", async () => {
    await request(app)
      .delete("/api/v1/drums/5")
      .expect(200)
      .then(res => {
        expect(res.body.length).to.be.deep.equal(5);
      });
  });
});
