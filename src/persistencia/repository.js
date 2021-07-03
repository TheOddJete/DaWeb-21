const pool = require("./database");

class UsuarioRepositorio {

  static async get(usuario) {
    var res = await pool.promise()
      .query("SELECT * FROM usuarios u WHERE u.usuario = ? ", usuario);
    return res[0][0];
  }

  static async getById(id){
    var res = await pool.promise()
      .query("SELECT * FROM usuarios u WHERE u.id = ? ", [id]);
      return res[0][0];
  }

  static async add(user) {
    await pool.promise().query(
      'INSERT INTO usuarios (nombre, apellidos, usuario, contrasena, email, credito,provincia) VALUES (?,?,?,?,?,?,?)',
      [
        user.nombre,
        user.apellidos,
        user.usuario,
        user.contrasena, 
        user.email,
        user.credito,
        user.provincia,
      ]
    );
  }

  static async update(user) {
    try {
      await pool.promise()
        .query(
          "UPDATE usuarios SET name = ?, apellidos = ?, passwd = ?, credito = ?, mail = ?, provincia = ? WHERE username = ?",
          [
            user.name,
            user.apellidos,
            user.passwd,
            user.credito,
            user.mail,
            user.provincia,
            user.username,
          ]
        );
    } catch (error) {
      throw error;
    }
  }

  static async delete(username) {
    try {
      await pool.promise()
        .query("DELETE FROM usuarios u WHERE u.username = ?", username);
    } catch (error) {
      throw error;
    }
  }

  static async login(username, password) {
    var res = await pool.promise().query(
      "SELECT * FROM usuarios WHERE (username = ? AND passwd = ?)", [username, password]
    );
    return res[0][0];
  }
}


class ProductoRepositorio {
  static async get(id) {
    try {
      let p = await pool
        .promise()
        .query("SELECT * FROM products WHERE id = ? ", [id]);
      return p[0][0];
    } catch (error) {
      throw error;
    }
  }

  static async add(product) {
    try {
      await pool
        .promise()
        .query(
          `INSERT INTO products (nombre, precio, descripcion, foto, fecha, visualizaciones, estado, categoria, usuario) VALUES (?,?,?,?,?,?,?,?,?)`,
          [
            product.nombre,
            product.precio,
            product.descripcion,
            product.foto,
            product.fecha,
            product.visualizaciones,
            product.estado,
            product.categoria,
            product.usuario,
          ]
        );
    } catch (error) {
      throw error;
    }
  }

  static async update(product) {
    try {
      await pool
        .promise()
        .query(
          "UPDATE products SET precio = ?, descripcion = ?, foto = ?, fecha = ?, visualizaciones = ?, estado = ?, categoria = ?, comprador = ?, cambiado_por = ? WHERE nombre = ?",
          [
            product.precio,
            product.descripcion,
            product.foto,
            product.fecha,
            product.visualizaciones,
            product.estado,
            product.categoria,
            product.comprador,
            product.cambiado_por,
            product.nombre
          ]
        );
    } catch (error) {
      throw error;
    }
  }

  static async delete(nombre) {
    try {
      await pool
        .promise()
        .query("DELETE FROM products p WHERE p.nombre = ?", nombre);
    } catch (error) {
      throw error;
    }
  }

  static async getAllNoMine(userId){
    try {
      const products = await pool.promise()
        .query("SELECT * FROM products WHERE usuario != ? AND comprador is NULL AND cambiado_por is NULL", [userId]);
      return products[0];
    } catch (error) {
      throw error;
    }
  }

  static async getByUser(userId){
    try {
      const products = await pool.promise().
        query("SELECT * FROM products WHERE usuario = ? AND comprador is NULL AND cambiado_por is NULL", [userId]);
      return products[0];
    } catch (error) {
      throw error;
    }
  }

  static async customQuery(queryString) {
    try {
      const products = await pool.promise().query(queryString);
      return products[0];
    } catch (error) {
      throw error;
    }
  }

  static async getBoughtProducts(compradorId){
    try {
      const products = await pool.promise()
        .query("SELECT * FROM products WHERE comprador = ? OR cambiado_por = ?", [compradorId, compradorId]);
      return products[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports.UsuarioRepositorio = UsuarioRepositorio;
module.exports.ProductoRepositorio = ProductoRepositorio;
