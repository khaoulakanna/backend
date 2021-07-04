const User = require("../models/user");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");
const crypto = require("crypto");

const transporter = nodemailer.createTransport(
    sendGridTransport({
      auth: {
        api_key:
          "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",
      },
    })
  );

exports.postSignUp = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const nom = req.body.nom;
  const prenom = req.body.prenom;
  const dateNaissance = req.body.dateNaissance;
  const genre = req.body.genre;
  const ville = req.body.ville;

  User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        req.flash("error", "Email already exists.");
        return;
      }
      return bcrypt
        .hash(password, 12)
        .then((hashedPassword)=> {
            const user = new User({
                email,
                hashedPassword,
                nom,
                prenom,
                dateNaissance,
                genre,
                ville,
              });
              user.save();
        }).then((result)=> {
            console.log("User Added Successfully!");
            return transporter.sendMail({
                to: email,
                from: "myComfortApp@gmail.com",
                subject: "Inscription réussite  🎉",
                html: `<h5>Mr/Mme ${nom}, votre inscription a été bien enregistrée. Nous vous remercions pour votre collaboration.</h5>`,
            })
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

exports.postLoginIn = (req, res, next) => {

};

exports.postUserData = (req, res, next) => {
  const email = req.body.email;
  const nom = req.body.nom;
  const prenom = req.body.prenom;
  const dateNaissance = req.body.dateNaissance;
  const genre = req.body.genre;
  const ville = req.body.ville;

  const newUser = new User({
    email,
    nom,
    prenom,
    dateNaissance,
    genre,
    ville,
  });

  newUser
    .save()
    .then((result) => {
      console.log(result);
      console.log("User Added Successfully!");
      return transporter.sendMail({
        to: email,
        from: "myComfortApp@gmail.com",
        subject: "Inscription réussite  🎉",
        html: `<h5>Mr/Mme ${nom}, votre inscription a été bien enregistrée. Nous vous remercions pour votre collaboration.</h5>`,
    })
    }).then((result)=> {
      console.log('Email sent.')
    })
    .catch((err) => console.log(err));
};