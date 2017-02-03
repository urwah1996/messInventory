var Sequelize = require('sequelize');

var sequelize = new Sequelize('centralMessInventory', 'sa', '1234' , {
			dialect: 'mssql',
			host: 'localhost',
			port: 1433, // Default port
            pool: {
                max: 5,
                min: 0,
                idle: 10000
            },
     // omitNull: true ,
			dialectOptions: {
				instanceName: 'MSSQLSERVER'
			}
});

var User = sequelize.define('user', {
  username: {
    type:Sequelize.STRING,
    
  },
  password:{
    type:Sequelize.STRING,
  }

}
);
var array="newuser";
var object=[];
sequelize.sync().then(function() {
return User
      .findOrCreate({where: {username: array , password: 'hello'}})
      .spread(function(user, created) {
        /*console.log(user.get({
          plain: true
        }))*/
        
       
        console.log(created)
      });
  
});

User.findOne({where:{username: 'world'}}).then(function(user){
  if(user)
     {
       object=user.get({
          plain: true
        }) ;
     } 
     else{
       console.log("Data not found");
     }
  }).then(function(){
  console.log(object.password);
  console.log("hellop")
})

  
