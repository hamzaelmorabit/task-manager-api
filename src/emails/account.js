const sgMail = require("@sendgrid/mail");

// const API_KEY =
//   "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";
// "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";
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const message = {
  to: "hamzamorabit79@gmail.com",
  from: "hamzamorabit123@gmail.com",
  subject: "This is test for sendgrid",
  text: "About this text ...",
  html: "<h1>Thissss is me!!</h1>",
};

// sgMail
//   .send(message)
//   .then((res) => console.log("Email sent ..."))
//   .catch((error) => console.log("Error send => " + error.message));

const sendEmailCancelation = (name, email) => {
  console.log(name, email);
  sgMail.send({
    to: email,
    from: "hamzamorabit123@gmail.com",
    subject: "This is test for sendgrid",
    text: "About this text ...",
    html: `Good by see you soon! <h1>${name}!</h1>`,
  });
};
module.exports = { sendEmailCancelation };
