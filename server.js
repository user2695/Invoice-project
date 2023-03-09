var easyinvoice = require("easyinvoice");
var nodemailer = require("nodemailer");
var fs = require("fs");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const homeRoutes = require("./routes/home");
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.set("view engine", "ejs");
app.use(express.static("public"));

/*  
  Let's create a data object. 
  This object will contain all the data we would like to be visible on our invoice.
  We will add data later in our demo.
*/

var data = {
  // Let's add a recipient
  client: {
    company: "Client",
    address: "Peerbagh",
    zip: "456745",
    city: "Peerbagh",
    country: "Kashmir",
  },

  // Now let's add our own sender details
  sender: {
    company: "Yarikul Infotech",
    address: "Airport Road",
    zip: "123456",
    city: "Rambagh",
    country: "Kashmir",
  },

  images: {
    //      Logo:
    //     Use a url
    logo: "https://www.99corporates.com/CompanyLogo/U26942JK1982PTC000546.png",
  },

  // Let's add some standard invoice data, like invoice number, date and due-date
  information: {
    // Invoice number
    number: "2023.0001",
    // Invoice data
    date: "09-03-2023",
    // Invoice due date
    "due-date": "20-02-2023",
  },

  // Now let's add some products! Calculations will be done automatically for you.
  products: [
    {
      quantity: "3",
      description: "description of product 1",
      "tax-rate": 6,
      price: 27,
    },
    {
      quantity: "2",
      description: "description of product 2",
      "tax-rate": 7,
      price: 20,
    },
  ],

  // We will use bottomNotice to add a message of choice to the bottom of our invoice
  bottomNotice: "Kindly pay your invoice within 15 days.",

  // Here you can customize your invoice dimensions, currency, tax notation, and number formatting based on your locale
  settings: {
    currency: "USD",
  },

  translate: {},

  customize: {
    //"template": fs.readFileSync('template.html', 'base64') // Must be base64 encoded html
  },
};

easyinvoice.createInvoice(data, function (result) {
  /*  
    The 'result' variable will contain our invoice as a base64 encoded PDF
    Now let's save our invoice to our local filesystem so we can have a look!
    We will be using the 'fs' library we imported above for this.
    */
  fs.writeFileSync(
    `${Math.floor(Math.random() * 100)}.pdf`,
    result.pdf,
    "base64"
  );
});

app.use(homeRoutes);

app.listen(3000, () =>
  console.log("App is listening on url http://localhost:3000")
);
