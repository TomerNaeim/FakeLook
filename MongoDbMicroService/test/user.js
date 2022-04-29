const chai = require("chai");
const chaiHttp = require("chai-http");
const userApi = require("../Routes/userRouter");

chai.should();
chai.use(chaiHttp);

describe("userApi", () => {
  describe("GET user/getAll", () => {
    it("it should GET all user", (done) => {
      chai.request(userApi);

      get("user/getAll").end((err, res) => {
        res.should.have.status(200);
        //response.body.be.a("array");
        done();
      });
    });
  });
});
