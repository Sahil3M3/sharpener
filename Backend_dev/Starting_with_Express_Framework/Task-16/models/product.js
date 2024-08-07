

const Cart = require('./cart');

const db=require('../util/database')

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() 
  {
return db.execute('insert into products(title,price,imageUrl,description)values(?,?,?,?)',
  [this.title,this.price,this.imageUrl,this.description] );
  }

  static deleteById(id) {
   
  }

  static fetchAll(cb) {
    return db.execute('select * from products');
  }

  static findById(id, cb) {
   return db.execute('select * from products where id=?',[id])
  }
};
