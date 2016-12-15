var express = require('express');
var config = require('./libs/config.json');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var heroes = require('./libs/heroes.json');
var db = require('./libs/DBConnect.js');
var User = require("./models/UserModel.js")(db);
var Hero = require("./models/HeroModel.js")(db);
var Category = require("./models/CategoryModel.js")(db);
var Attribute = require("./models/AttributeModel.js")(db);


app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cors());

require('./src/users')(app);
var attributes = [
  [
    {
      category: 1,
      name: 'Physical',
      type: "rate",
      value: 0,
    },
    {
      category: 1,
      name: 'Magical',
      type: "rate",
      value: 0
    },
    {
      category: 1,
      name: 'Pure',
      type: "rate",
      value: 0
    },
  ],
  [
    {
      category: 2,
      name: 'Stun',
      type: "bool",
      value: 0,
    },
    {
      category: 2,
      name: 'Slow',
      type: "bool",
      value: 0
    },
    {
      category: 2,
      name: 'Pure',
      type: "bool",
      value: 0
    },
  ],
  [
    {
      category: 3,
      name: 'Position',
      type: "rate",
      value: 0,
    },
    {
      category: 3,
      name: 'Greed',
      type: "rate",
      value: 0
    }
  ],
  [
    {
      category: 4,
      name: 'Gank',
      type: "rate",
      value: 0,
    },
    {
      category: 4,
      name: 'Teamfight',
      type: "rate",
      value: 0
    },
    {
      category: 4,
      name: 'Push',
      type: "rate",
      value: 0,
    },
    {
      category: 4,
      name: 'Splitpush',
      type: "rate",
      value: 0
    }
  ],
  [
    {
      category: 5,
      name: 'BKB',
      type: "bool",
      value: 0,
    },
    {
      category: 5,
      name: 'Mekansm',
      type: "bool",
      value: 0
    },
    {
      category: 5,
      name: 'Force staff / Pike',
      type: "bool",
      value: 0
    }
  ],
  [
    {
      category: 6,
      name: 'Burst',
      type: "rate",
      value: 0,
    },
    {
      category: 6,
      name: 'Sustain',
      type: "rate",
      value: 0
    }
  ],
  [
    {
      category: 7,
      name: 'Mobile',
      type: "rate",
      value: 0,
    },
    {
      category: 7,
      name: 'Tanky',
      type: "rate",
      value: 0
    },
    {
      category: 7,
      name: 'Initiator',
      type: "rate",
      value: 0
    }
  ],
  [
    {
      category: 8,
      name: 'Early',
      type: "rate",
      value: 0,
    },
    {
      category: 8,
      name: 'Mid',
      type: "rate",
      value: 0
    },
    {
      category: 8,
      name: 'Late',
      type: "rate",
      value: 0
    }
  ]
];

function createHeroes(){
    for (var i = 0; i < heroes.length; i++) {
      Hero.create({
        name: heroes[i].localized_name
      })
    }
}
function createCategories() {
  var names=["Damage", "Disable", "Econ/Position", "Fight Style", "Item carrier", "Damage type", "Misc", "Stage"];
  for (var i = 0; i < names.length; i++) {
    Category.create({
      name: names[i]
    }).then(function(category){
          var name = category.name;
          console.log(name);
          var index = names.indexOf(name);
          var subattr = attributes[index];
          for (var k = 0; k < heroes.length; k++) {
              for (var j = 0; j < subattr.length; j++) {
                var attribute = subattr[j];
                Attribute.create({
                  user_id: 1,
                  hero_id: k+1,
                  category_id: category.id,
                  type: attribute.type,
                  value: attribute.value,
                  name: attribute.name
                })
              }
          }
    })
  }
}
function createAttributes(){
    for (var i = 0; i < attributes.length; i++) {
      var subattr = attributes[i];
      for (var j = 0; j < subattr.length; j++) {
        var attribute = subattr[j];
        Attribute.create({
          user_id: 1,
          hero_id: 1,
          category_id: attribute.category,
          type: attribute.type,
          value: attribute.value,
          name: attribute.name
        })
      }
    }
}

app.get('/test', function(req,res){
  //createHeroes();
  createCategories();
  // createAttributes();
})
app.get('/heroes', function(req,res){
  Hero.findAll().then(function(resp){
    res.send(resp);
  })
})

app.post('/getHeroInfo', function(req,res){
  var hero_id = req.body.hero_id;
  Category.findAll({
    include: [
     { model: Attribute, where: { hero_id: hero_id }}
    ]
  }).then(function(result){
    res.send(result);
  })

});

app.post('/updateAttributes', function(req, res){
  var attribute = req.body.attribute;
  var value = attribute.value;
  if(attribute.type == "bool"){
    if(attribute.value == true){ value = 1; }
    else{ value = 0; }
  }

  Attribute.update({
    value: value
  },
  {
    where: {
      id: attribute.id
    }
  }).then(function(result){
    if (result[0] == 1) {
      return res.status(200).json({message: result});
    }
    else{
      return res.status(400).json({message: "Could not update attribute"});
    }
  })
})

app.post('/categories', function(req,res){
  var token = req.get('Authentication-Token');
  console.log(req.data);
  var hero_id = req.body.hero_id;
  var category_name = req.body.category_name;
  User.findOne({
    where: {
      token: token
    }
  }).then(function(user){
    Category.create({
      user_id: user.id,
      hero_id: hero_id,
      name: category_name
    }).then(function(category){
      return res.status(200).json({category: category});
    })
  });
})

var environment = config.env;
var credentials = config[environment];
app.listen(credentials.port);

console.log("Running at Port " + credentials.port);
