import mysqlConnection from "../config/db.js";
import bcrypt from "bcrypt";

//getAllUser controller
export const getAllUser = async (req, res) => {
  try {
    mysqlConnection.query(
      "SELECT * FROM users",
      function (err, result, fields) {
        res.send(result);
      }
    );
  } catch (error) {
    res.status(500).json(error);
  }
};


//update user

export const updateUser = async (req, res) => {
  try {
    const hashPass = await bcrypt.hash(req.body.password, 12);
    mysqlConnection.query(
      "UPDATE `users` SET `username`=?,`password`=?,`firstname`=?,`lastname`=? where `id`=?",
      [
        req.body.username,
        hashPass,
        req.body.firstname,
        req.body.lastname,
        req.body.id,
      ],
      function (error, results, fields) {
        if (error) throw error;
        // res.end(JSON.stringify(results));
        res.status(200).json("user successfully updated");
      }
    );
  } catch (error) {
    res.status(500).json(error);
  }
};


//delete user controller

export const deleteUser = async (req, res) => {
  try {
    mysqlConnection.query(
      "DELETE FROM `users` WHERE `id`=?",
      [req.body.id],
      function (error, results, fields) {
        if (error) throw error;
        res.status(200).json("Record has been deleted!");
      }
    );
  } catch (error) {
    res.status(500).json(error);
  }
};
