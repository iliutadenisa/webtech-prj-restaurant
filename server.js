
var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
var nodeadmin=require('nodeadmin');
var Sequelize = require('sequelize');

//create express app
var app = new express();
app.use(bodyParser.json());
app.use(cors());

app.use(nodeadmin(app));
app.use('/admin', express.static('admin'));

//define entity
var sequelize = new Sequelize('Restaurant','iliutadenisa', '', {
    dialect: 'mysql',
    port: 3306
})

//define -----------MODELS-------------------------------------------
var MENU = sequelize.define('menus',{
    id:{
        type: Sequelize.INTEGER,
        field: 'id',
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: Sequelize.STRING, 
        field:'name'
    },
    description:{
        type: Sequelize.STRING,
        field:'description'
    },
    price:{
        type: Sequelize.FLOAT, 
        field:'price' }
    },  
    {
    timestamps: false,
    tableName: 'Menu',
     classMethods: {
        associate: function(models){
           MENU.hasMany(models.CLIENT);
        }
     }
 });
 
 var CLIENT = sequelize.define('clients',{
    id_client:{
        type: Sequelize.INTEGER,
        field: 'id_client',
        primaryKey: true,
        autoIncrement: true
    },
    first_name:
    {
        type: Sequelize.STRING,
        field: 'first_name'

    },
    last_name:
    {
        type: Sequelize.STRING,
        field: 'last_name'
    },
    payment_type:
    {
        type: Sequelize.STRING,
        field: 'payment_type'
    },
    // id:{ //i see this is autogenerates...
    //     type: Sequelize.INTEGER,
    //     field: 'id',
    //     foreignKey: true}
    },
    {
    timestamps: false,
    tableName: 'Client',
    classMethods: {
        associate: function(models){
            CLIENT.belongsTo(models.MENU, {
          //  foreignKey: 'id', //autogenerates
             onDelete: "CASCADE"
            });
        }
    }
   });

//----------------------------------for MENU-----------------------------------------
//CREATE 
app.post('/menus', function(request, response){
 MENU.create(request.body).then(function(menu){
     MENU.findById(menu.id).then(function(menu) {
          response.status(201).send(menu);
     });
       
    });
});


//READ by id
app.get('/menus/:id', function(request, response){
    MENU.findById(request.params.id).then(function(menu){
        if(menu){
        
            response.status(200).send(menu);
        } 
        else{
            response.status(404).send();
        }
    });
        // .then(function(menu){
            
        // })
    
});

//READ all
app.get('/menus', function(request, response){
    MENU.findAll().then(function(menus){
        response.status(200).send(menus)
    });
});

//UPDATE
app.put('/menus/:id',function(request, response){
    MENU
        .findById(request.params.id)
        .then(function(menu){
            if(menu){
                menu
                    .updateAttributes(request.body)
                    .then(function(){
                        response.status(200).send('update');
                        
                    }).catch(function(err){
                        console.warn(err);
                        response.status(500).send('server error');
                    });
            }else { response.status(404).send('not found');  }
        });
});

//DELETE by id
app.delete('/menus/:id', function(request,response){
    MENU
        .findById(request.params.id)
        .then(function(menu){
            if(menu){
                menu
                    .destroy()
                    .then(function(){
                        response.status(204).send();
                    }).catch(function(err){
                        console.warn(err);
                        response.status(500).send('server error');
                    });
            } else {response.status(404).send();}
        });
});


//----------------------------------for CLIENT-----------------------------------------
//CREATE 
app.post('/clients', function(request, response){
 CLIENT.create(request.body).then(function(client){
     CLIENT.findById(client.id).then(function(client) {
          response.status(201).send(client);
     });
       
    });
});

//READ by id
app.get('/clients/:id', function(request, response){
    CLIENT.findById(request.params.id).then(function(client){
        if(client){
        
            response.status(200).send(client);
        } 
        else{
            response.status(404).send();
        }
    });
});

//READ all
app.get('/clients', function(request, response){
    CLIENT.findAll().then(function(clients){
        response.status(200).send(clients)
    });
});

//UPDATE
app.put('/clients/:id',function(request, response){
    CLIENT
        .findById(request.params.id)
        .then(function(client){
            if(client){
                client
                    .updateAttributes(request.body)
                    .then(function(){
                        response.status(200).send('update');
                        
                    }).catch(function(err){
                        console.warn(err);
                        response.status(500).send('server error');
                    });
            }else { response.status(404).send('not found');  }
        });
});

//DELETE by id
app.delete('/clients/:id', function(request,response){
    CLIENT
        .findById(request.params.id)
        .then(function(client){
            if(client){
                client
                    .destroy()
                    .then(function(){
                        response.status(204).send();
                    }).catch(function(err){
                        console.warn(err);
                        response.status(500).send('server error');
                    });
            } else {response.status(404).send();}
        });
});


// MENU.create({  // I insert row with NodeAdmin
//     id:2, 
//     name:"Breakfast", 
//     description:"Breakfast is the first meal of the day:fresh fruits, vegetables, eggs.", 
//     price: 3}).then(function(art){
//         art.save();
//     });
// CLIENT.create({
//     id_client:2,
//     first_name:"Denisa",
//     last_name:"Ionescu",
//     payment_type:"card",
//     id:1
//     }) .then(function(art){
//         art.save();
//     });

sequelize.sync();
app.listen(process.env.PORT);