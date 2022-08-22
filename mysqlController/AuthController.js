import bcrypt from "bcrypt";
import mysqlConnection from "../config/db.js";
import jwt from "jsonwebtoken";

//register controller

export const register = async (req, res) => {
  try {
    mysqlConnection.query(
      "SELECT COUNT(*) AS cnt FROM users WHERE username = ? ",
      req.body.username,
      async function (err, data) {
        if (err) {
          console.log(err);
        } else {
          if (data[0].cnt > 0) {
            res.send({ message: "user alreasy exist" });
          } else {
            const hashPass = await bcrypt.hash(req.body.password, 12);
            const rows = await mysqlConnection.query(
              "INSERT INTO `users`(`username`,`password`,`firstname`,`lastname`) VALUES(?,?,?,?)",
              [
                req.body.username,
                hashPass,
                req.body.firstname,
                req.body.lastname,
              ],
              function (err, insert) {
                if (err) {
                  return err;
                }
                res.status(200).send({
                  message: "user inserted successfully",
                  data: insert,
                });
              }
            );
          }
        }
      }
    );
  } catch (error) {
    res.status(500).json({ message: "some thig wrong" });
  }
};

//login controller

export const login = async (req, res) => {
  try {
    mysqlConnection.connect(function (err) {
      let email = req.body.username;
      let password = req.body.password;

      mysqlConnection.query(
        "SELECT * FROM users WHERE username = ? ",
        [email],
        function (error, results, fields) {
          if (error) throw error;
          else {
            if (results.length > 0) {
              bcrypt.compare(
                req.body.password,
                results[0].password,
                function (err, result) {
                  if (result) {
                    const data = req.body.username;

                    const theToken = jwt.sign(
                      { data: data },
                      process.env.JWT_KEY,
                      {
                        expiresIn: "1h",
                      }
                    );
                    return res.send({
                      message: "Login Successful",
                      token: theToken,
                    });
                  } else {
                    return res
                      .status(400)
                      .send({ message: "Invalid Password" });
                  }
                }
              );
            } else {
              return res.status(400).send({ message: "Invalid Email" });
            }
          }
        }
      );
    });
  } catch (error) {
    res.status(500).json({ message: "some thig wrong" });
  }
};
