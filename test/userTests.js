//Usar o banco de dados de teste
process.env.NODE_ENV = "test";

const chai = require("chai"),
  chaiHttp = require("chai-http"),
    server = require("../app"),
    expect = require("chai").expect,
  mongoose = require("mongoose"),
    config = require("../config/default.json"),
      User = require("../models/user");

//Plugin sera usado pelo chai
chai.use(chaiHttp);

describe("User routes", function(){

    //Antes de tudo, remover todos os usuarios do banco
    before(function(done){
        User.remove({}, function(err){
            done();
        });
    });

    it("creates a user if the submited form is correct", function(done){
        chai
        .request(server)
        .post("/register")
        .type("form")
        .send({"username": "test_user", "password": "123456"})
        .end(function(err, res){
            expect(res.text).to.contain("Welcome To RoleCamp!");
            let result = User.find({username: "test_user"}, function(err, foundUser){
                expect(foundUser).to.have.lengthOf(1);
            });
            done();
        });
    });

    it("redirects to /login if credentials are wrong", function(done){
        chai
        .request(server)
        .post("/login")
        .type("form")
        .send({"username": "test_user", "password": "999999"})
        .end(function(err, res){
            expect(res.redirects[0]).to.contain('/login');
            expect(res.text).to.contain("Please login.");
            done();
        });
    });

    it("redirects to /campgrounds if credentials are correct", function(done){
        chai
        .request(server)
        .post("/login")
        .type("form")
        .send({"username": "test_user", "password": "123456"})
        .end(function(err, res){
            expect(res.redirects[0]).to.contain('/campgrounds');
            expect(res.text).to.contain("Welcome To RoleCamp!");
            done();
        });
    });

    it("redirects to /login after logout", function(done){
        chai
        .request(server)
        .get("/logout")
        .end(function(err, res){
            expect(res.redirects[0]).to.contain('/login');            
            expect(res.text).to.contain("Please login.");           
            done();
        });
    });

    after(function(done){
        mongoose.connection.dropDatabase();
        done();
    });
});