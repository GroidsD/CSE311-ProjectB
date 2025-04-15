import db from "../models/index";
import UserService from "../services/UserService";

let getAllUser = async (req, res) => {
  try {
    let data = await UserService.getAllUser();
    //console.log(data);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      errMessage: " Error from Server",
    });
  }
};
let createNewUser = async (req, res) => {
  try {
    let data = await UserService.createNewUser(req.body);
    //console.log(data);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      errMessage: " Error from Server",
    });
  }
};

let deleteUserCRUD = async (req, res) => {
  try {
    // console.log(req.body.userId, "ssss");

    let data = await UserService.deleteUserByID(req.body.userId);
    //console.log(data);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      errMessage: " Error from Server",
    });
  }
};

let updateUserCRUD = async (req, res) => {
  try {
    let data = req.body;
    //console.log(data);
    let allUser = await UserService.updateUserData(data);
    return res.status(200).json(allUser);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      errMessage: " Error from Server",
    });
  }
};
let getBillByUserID = async (req, res) => {
  try {
    let infor = await UserService.getBillByUserID(req.query.id);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      error: -1,
      errMessage: "Messge form sever",
    });
  }
};
module.exports = {
  getAllUser: getAllUser,
  createNewUser: createNewUser,
  deleteUserCRUD: deleteUserCRUD,
  updateUserCRUD: updateUserCRUD,
  getBillByUserID: getBillByUserID,
};
