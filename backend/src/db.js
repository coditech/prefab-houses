import sqlite from 'sqlite';
 

const initializeDatabase = async()=>{
    const db = await sqlite.open('./database1.sqlite');






   
    const ReadSubscribe = async () =>{
        try {
            const rows = await db.all(`SELECT * FROM Subscribe order by Location `);
            if (rows.length == 0) {
              throw new Error("Subcribe are empty!");
            }
            return rows;
          } catch (err) {
            throw new Error("Could not retrieve any Subscriber");
          }
        };

    const CreateSubscribe = async (props) => {
        const { location, email } = props
        
        if (!props || !location || !email) {
          throw new Error(`You must provide a location and email`);
        }
        try {
        const result = await db.run(`INSERT INTO Subscribe (Location,Email) VALUES ('${location}', '${email}')`);
        const id = result.stmt.lastID
            return id
        } catch (err) {
          throw new Error("This combination doesnt work");
        }
      };
    
    const DeleteSubscribe = async (id) => {
        try{
          const result = await db.run(`DELETE FROM Subscribe WHERE ID = ${id}`);
          if(result.stmt.changes === 0){
            throw new Error(`Subscribe with id ${id} doesn't exist`); 
        }
        return true;
        }catch (err){
          throw new Error(`could not delete subscriber with id ${id}` + err); 
        }
    };

    const UpdateSubscribe = async (id, props) => {
      const { location, email } = props;
      if (!props && !(props.location && props.email)) {
        throw new Error(`You must provide a location or an email`);
      }
  
      let stmt = "";
      if (location && email) {
        stmt = `update Subscribe set Location = '${location}', Email = '${email}' where ID = ${id} `;
        console.log(stmt);
      } else if (location && !email) {
        stmt = `update Subscribe set Location = '${location}' where ID = ${id} `;
      } else {
        stmt = `update Subscribe set  Email = '${email}' where ID = ${id} `;
      }
      try {
        const result = await db.run(stmt);
        console.log(result);
        if (result.stmt.changes == 0) {
          throw new Error(`Subscribe with ID ${id} doesnt exist`);
        }
        return true;
      } catch (err) {
        throw new Error(`Could not update Subscribe with ID ${id}` + err);
      }
    };











    const ReadAdmin = async () =>{
      try {
          const rows = await db.all(`SELECT * FROM Admin order by UserName `);
          if (rows.length == 0) {
            throw new Error("Admin list are empty!");
          }
          return rows;
        } catch (err) {
          throw new Error("Could not retrieve any Admin");
        }
      };

  const CreateAdmin = async (props) => {
      const { username, password } = props
      
      if (!props || !username || !password) {
        throw new Error(`You must provide an username and password`);
      }
      try {
      const result = await db.run(`INSERT INTO Admin (UserName,UserPassword) VALUES ('${username}', '${password}')`);
      const id = result.stmt.lastID
          return id
      } catch (err) {
        throw new Error("This combination doesnt work");
      }
    };
  
  const DeleteAdmin = async (id) => {
      try{
        const result = await db.run(`DELETE FROM Admin WHERE ID = ${id}`);
        if(result.stmt.changes === 0){
          throw new Error(`Admin with id ${id} doesn't exist`); 
      }
      return true;
      }catch (err){
        throw new Error(`could not delete admin with id ${id}` + err); 
      }
  };

  const UpdateAdmin = async (id, props) => {
    const { username, password } = props;
    if (!props && !(props.username && props.password)) {
      throw new Error(`You must provide a username or an password`);
    }

    let stmt = "";
    if (username && password) {
      stmt = `update Admin set UserName = '${username}', UserPassword = '${password}' where ID = ${id} `;
      console.log(stmt);
    } else if (username && !password) {
      stmt = `update Admin set UserName = '${username}' where ID = ${id} `;
    } else {
      stmt = `update Admin set  UserPassword = '${password}' where ID = ${id} `;
    }
    try {
      const result = await db.run(stmt);
      console.log(result);
      if (result.stmt.changes == 0) {
        throw new Error(`Admin with ID ${id} doesnt exist`);
      }
      return true;
    } catch (err) {
      throw new Error(`Could not update Admin with ID ${id}` + err);
    }
  };












  const ReadProduct = async () =>{
    try {
        const rows = await db.all(`SELECT * FROM Product `);
        if (rows.length == 0) {
          throw new Error("Product list are empty!");
        }
        return rows;
      } catch (err) {
        throw new Error("Could not retrieve any Product");
      }
    };

const CreateProduct = async (props) => {
    const { typename} = props
    
    if (!props || !typename ) {
      throw new Error(`You must provide an type of the product`);
    }
    try {
    const result = await db.run(`INSERT INTO Product (TypeName) VALUES ('${typename}')`);
    const id = result.stmt.lastID
        return id
    } catch (err) {
      throw new Error("This combination doesnt work");
    }
  };

const DeleteProduct = async (id) => {
    try{
      
      const stmt=`DELETE FROM Product WHERE IDproduct = ${id}`;
      
      const result = await db.run(stmt);
      if(result.stmt.changes === 0){
        throw new Error(`Product with id ${id} doesn't exist`); 
    }
    return true;
    }catch (err){
      throw new Error(`could not delete Product with id ${id}` + err); 
    }
};

const UpdateProduct = async (id, props) => {
  const { typename } = props;
  if (!props || !props.typename) {
    throw new Error(`You must provide type of the modal`);
  }
  try {
    const result = await db.run( `update Product set TypeName = '${typename}' where IDproduct = ${id} `);
    if (result.stmt.changes == 0) {
      throw new Error(`Product with ID ${id} doesnt exist`);
    }
    return true;
  } catch (err) {
    throw new Error(`Could not update Product with ID ${id}` + err);
  }
};










const ReadColor = async () =>{
  try {
      const rows = await db.all(`SELECT * FROM Color`);
      if (rows.length == 0) {
        throw new Error("Color list are empty!");
      }
      return rows;
    } catch (err) {
      throw new Error("Could not retrieve any color");
    }
  };



const UpdateColor = async (props) => {
const { type, color } = props;
if (!props && !(props.type && props.color)) {
  throw new Error(`You must provide a type witha color`);
}
 let stmt = `update Color set  color = '${color}' where type ='${type}' `;

try {
  const result = await db.run(stmt);
  console.log(result);
  if (result.stmt.changes == 0) {
    throw new Error(`color with type ${type} doesnt exist`);
  }
  return true;
} catch (err) {
  throw new Error(`Could not update color with type ${type}` + err);
}
};












    const controller={
        ReadSubscribe,
        CreateSubscribe,
        DeleteSubscribe,
        UpdateSubscribe,

        ReadAdmin,
        CreateAdmin,
        DeleteAdmin,
        UpdateAdmin,

        ReadProduct,
        CreateProduct,
        DeleteProduct,
        UpdateProduct,

        ReadColor,
        UpdateColor


    }
    return controller;
  
}

export default  initializeDatabase ;

    