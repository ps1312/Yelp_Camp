//Usar o banco de dados de teste
process.env.NODE_ENV = "test";

const chai = require("chai"),
    chaiHttp = require("chai-http"),
    server = require("../app"),
    expect = require("chai").expect,
    mongoose = require("mongoose"),
    config = require("../config/default.json"),
    User = require("../models/user"),
    Campground = require("../models/campground");

//Plugin sera usado pelo chai
chai.use(chaiHttp);
var agent = chai.request.agent(server)

describe("Campground routes", function () {

    //Criar user no banco e fazer login
    before(function (done) {
        //Mock user
        User.register(new User({ username: "test_user2" }), "test_password", function (err, createdUser) {
            if (err) {
                console.log(err)
            }
            done();
        });
    });

    //Antes de qualquer teste, fazer login
    beforeEach(function(done){
        agent
            .post("/login")
            .type("form")
            .send({username: "test_user2", password: "test_password"})
            .end(function(err, res){
                done();
            });
    });

    it("creates a campground posting in /campground as a authenticated user", function (done) {
        agent
            .post("/campgrounds")
            .type("form")
            .send({ "name": "Test camp", "description": "Test description", "location": "Recife"})
            .end(function (err, res) {
                let result = Campground.find({creator_username: "test_user2"}, function(err, foundCampground){
                    expect(foundCampground).to.have.lengthOf(1);
                    expect(res.redirects[0]).to.contain('/campgrounds/' + foundCampground[0]._id);
                    expect(res.text).to.contain("Created by test_user2");
                    done();
                });
            });
    });

    it("get a campground by its id", function(done){
        const newCamp = {name: "Test camp", description: "Test description", location: "Recife"};        
        Campground.create(newCamp, function(err, createdCamp){
            agent
                .get("/campgrounds/" + createdCamp._id)
                .end(function (err, res) {
                    expect(res.text).to.contain("Test camp");
                    expect(res.text).to.contain("Test description");
                    expect(res.text).to.contain("Location: Recife");                                        
                    done();
                });
        });
    });

 /*    it("updates a campground by its id", function(done){

    }); */

/*     it("deletes a campground by its id", function(done){
        const newCamp = {name: "Test camp", description: "Test description", location: "Recife"};
        Campground.create(newCamp, function(err, createdCamp){
            agent
                .del("/campgrounds/" + createdCamp._id)
                .end(function (err, res) {
                    done();
                });
        });
    }); */

    //Apos qualquer teste, fazer logout
    afterEach(function(done){
        agent
            .get("/logout")
            .end(function(err, res){
                done();
            });
    });

    after(function (done) {
        mongoose.connection.dropDatabase();
        done();
    });
});