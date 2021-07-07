const pool = require("./database");

class UsuarioRepositorio {

  static async get(usuario) {
    var res = await pool.query("SELECT * FROM usuarios u WHERE u.usuario = ? ", usuario);
    return res[0];
  }

  static async getById(id) {
    var res = await pool.query("SELECT * FROM usuarios u WHERE u.id = ? ", [id]);
    return res[0];
  }

  static async add(usuario) {
    await pool.query(
      'INSERT INTO usuarios (nombre, apellidos, usuario, contrasena, email, credito,provincia) VALUES (?,?,?,?,?,?,?)',
      [
        usuario.nombre,
        usuario.apellidos,
        usuario.usuario,
        usuario.contrasena,
        usuario.email,
        usuario.credito,
        usuario.provincia,
      ]
    );
  }

  static async update(usuario) {
    try {
      await pool.query(
        "UPDATE usuarios SET nombre = ?, apellidos = ?, contrasena = ?, credito = ?, email = ?, provincia = ? WHERE usuario = ?",
        [
          usuario.nombre,
          usuario.apellidos,
          usuario.contrasena,
          usuario.credito,
          usuario.email,
          usuario.provincia,
          usuario.usuario,
        ]
      );
    } catch (error) {
      throw error;
    }
  }

  static async delete(usuario) {
    try {
      await pool.promise()
        .query("DELETE FROM usuarios u WHERE u.usuario = ?", usuario);
    } catch (error) {
      throw error;
    }
  }

  static async login(usuario, contrasena) {
    var res = await pool.query(
      "SELECT * FROM usuarios WHERE (usuario = ? AND contrasena = ?)", [usuario, contrasena]
    );
    return res[0];
  }
}


class ProductoRepositorio {
  static async get(id) {
    try {
      let p = await pool
        .query("SELECT * FROM productos WHERE id = ? ", [id])
      return p[0];
    } catch (error) {
      throw error;
    }
  }

  static async add(producto) {
    await pool
      .query(
        `INSERT INTO productos (nombre, precio, descripcion, imagen, fecha, categoria, estado, visualizaciones, usuario) VALUES (?,?,?,?,?,?,?,?,?)`,
        [
          producto.nombre,
          producto.precio,
          producto.descripcion,
          producto.imagen,
          producto.fecha,
          producto.categoria,
          producto.estado,
          producto.visualizaciones,
          producto.usuario,
        ]
      );
  }

  static async update(producto) {
    try {
      await pool
        .query(
          "UPDATE productos SET precio = ?, descripcion = ?, imagen = ?, fecha = ?, categoria = ?, estado = ?, visualizaciones = ?, comprador = ?, cambiado_por = ? WHERE nombre = ?",
          [
            producto.precio,
            producto.descripcion,
            producto.imagen,
            producto.fecha,
            producto.categoria,
            producto.estado,
            producto.visualizaciones,
            producto.comprador,
            producto.cambiado_por,
            producto.nombre
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

  static async getAllNoMine(usuarioId) {
    try {
      const productos = await pool
      .query("SELECT * FROM productos WHERE usuario != ? AND comprador is NULL AND cambiado_por is NULL", [usuarioId]);
      return productos;
    } catch (error) {
      throw error;
    }
  }

  static async getByusuario(usuarioId) {
    try {
      const productos = await pool.
        query("SELECT * FROM productos WHERE usuario = ? AND comprador is NULL AND cambiado_por is NULL", [usuarioId]);
      return productos;
    } catch (error) {
      throw error;
    }
  }

  static async customQuery(queryString) {
    try {
      const products = await pool.query(queryString);
      return products;
    } catch (error) {
      throw error;
    }
  }

  static async getBoughtProducts(compradorId) {
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
