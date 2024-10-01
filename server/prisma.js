const prisma = require("./index")

async function CreateUser(email, phone, password, lat, lang) {
  await prisma.signin.create({
    data: {
      Email: email,
      Phone: phone,
      password: password,
      Location: {
        create: {
          Lat: lat,
          Lang: lang,
        },
      },
    },
  });
}

async function MapMarker(user,lang,lat){
  await prisma.Marker.create({
    data : {
      userMail: user,
      Lang : lang,
      Lat: lat
    }
  })
}

module.exports = {
  CreateUser,
  MapMarker
};
