import db from "../models/index";
import CRUDService from "../services/CRUDService";
let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    console.log(data);
    return res.render("homepage.ejs", {
      data: JSON.stringify(data),
    });
  } catch (e) {
    console.log(e);
  }
};

let getAboutPage = (req, res) => {
  return res.render("test/about.ejs");
};

let getCRUD = (req, res) => {
  return res.render("crud.ejs");
};
let postCRUD = async (req, res) => {
  let message = await CRUDService.createNewUser(req.body);
  console.log(message);
  return res.send("post CRUD from server");
};

let displayGetCRUD = async (req, res) => {
  let data = await CRUDService.getAllUser();
  // console.log("-----------------------'");
  // console.log(data);
  // console.log("-----------------------'");
  return res.render("displayCRUD.ejs", {
    dataTable: data,
  });
};

let getEditCRUD = async (req, res) => {
  let userId = req.query.id;
  console.log(userId);

  if (userId) {
    let userData = await CRUDService.getUserInforByID(userId);
    //check UserData not found
    return res.render("editCRUD.ejs", {
      user: userData,
    });
  } else {
    return res.send("User not found!");
  }
};
let putCRUD = async (req, res) => {
  let data = req.body;
  // console.log(data);
  let allUser = await CRUDService.updateUserData(data);
  return res.render("displayCRUD.ejs", {
    dataTable: allUser,
  });
};

let deleteCRUD = async (req, res) => {
  let id = req.query.id;
  if (id) {
    await CRUDService.deleteUserByID(id);
    return res.send("delete is  success");
  } else {
    return res.send("delete is not success");
  }
};

module.exports = {
  getHomePage: getHomePage,
  getAboutPage: getAboutPage,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
  displayGetCRUD: displayGetCRUD,
  getEditCRUD: getEditCRUD,
  putCRUD: putCRUD,
  deleteCRUD: deleteCRUD,
};
