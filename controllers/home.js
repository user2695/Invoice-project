var nodemailer = require("nodemailer");

exports.getHome = (req, res) => {
  res.render("home.ejs");
};

exports.postHome = (req, res) => {
  var sender = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "",
      pass: "",
    },
  });

  var mail = {
    from: "",
    to: "",
    subject: "Sending Email using Node.js",
    text: "That is difficult!",
  };

  sender.sendMail(mail, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent successfully: " + info.response);
    }
  });
};
