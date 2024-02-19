import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

inquirer
  .prompt([
    {
      message: "Type in your URL: ",
      name: "URL",
    },
  ])
  .then((answers) => {
    const url = answers.URL;

    const qr_png = qr.image(url);
    const qrFileName = `qr_image_${url.replace(/[:\/.]/g, "_")}.png`;
    qr_png.pipe(fs.createWriteStream(qrFileName));

    fs.appendFile("URL_Road.txt", url + "\n", (err) => {
      if (err) throw err;
      console.log("The URL has been appended to the file!");
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.error("Prompt couldn't be rendered in the current environment");
    } else {
      console.error("Something went wrong");
    }
  });
