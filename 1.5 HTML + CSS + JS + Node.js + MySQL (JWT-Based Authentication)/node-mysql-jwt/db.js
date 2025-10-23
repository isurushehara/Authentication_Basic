import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "auth_node_mysql_jwt",
});

db.connect((err) => {
  if (err) console.log("DB error:", err);
  else console.log("✅ MySQL Connected");
});

export default db;
