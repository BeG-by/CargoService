import axios from "axios";

export async function getDrivers() {
  // todo: delete it;
  const config = {
    headers: {
      Authorization:
        "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyb290Iiwicm9sZXMiOlsiU1lTQURNSU4iXSwiaWF0IjoxNTk5MjI4NTEwLCJleHAiOjE4MDE1OTkyMjg1MTB9.pWThA99Lk9LNudr2AAqx3uvrsGgpQ6LnfaTZXGHeZUM",
    },
  };

  const endpoint = "/v1/api/drivers";
  return await axios.get(endpoint, config).then(
    (res) => {
      const drivers = res.data;
      console.log("DRIVERS COME");
      console.log(drivers);
      return drivers;
    },
    (error) => {
      console.log(error);
    }
  );
}

export async function getRejectedInvoices() {
  return [
    {
      index: "MPP683261927301",
      registrationUser: {
        name: "Vladislav",
        lastName: "Reznov",
        patronymic: "Gol",
      },
      clientCompany: {
        name: "5-element",
        pan: "32132FASD",
      },
      carrierCompany: {
        name: "Cargo",
        pan: "321321FASD",
      },
      driver: {
        name: "Alex",
        surname: "Sokol",
        passport: "PP2123123",
      },
      products: [
        {
          name: "Banana",
          amount: 1,
          priceForOne: 3,
          priceForAll: 3,
        },
      ],

      departurePlace: "Minsk",
      deliveryPlace: "Berlin",
      registrationDate: "2020-07-09",
    },

    {
      index: "SSSS68321ASASD4",
      registrationUser: {
        name: "Vladislav",
        lastName: "Reznov",
        patronymic: "Gol",
      },
      clientCompany: {
        name: "6-element",
        pan: "32132FASD",
      },
      carrierCompany: {
        name: "Cargo",
        pan: "321321FASD",
      },
      driver: {
        name: "Alex",
        surname: "Sokol",
        passport: "PP2123123",
      },
      products: [
        {
          name: "Banana",
          amount: 1,
          priceForOne: 3,
          priceForAll: 3,
        },
      ],

      departurePlace: "Minsk",
      deliveryPlace: "Berlin",
      registrationDate: "2020-07-02",
    },
  ];
}

export async function saveInvoice(invoice) {
  const endpoint = "/v1/api/invoices";
  axios({
    method: "post",
    url: endpoint,
    headers: {
      Authorization:
        "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyb290Iiwicm9sZXMiOlsiU1lTQURNSU4iXSwiaWF0IjoxNTk5MjI4NTEwLCJleHAiOjE4MDE1OTkyMjg1MTB9.pWThA99Lk9LNudr2AAqx3uvrsGgpQ6LnfaTZXGHeZUM",
    },
    data: invoice,
  }).then((res) => {
    console.log("INVOICE SAVE");
    console.log(res);
  });
}

export async function getProductOwners() {
  //todo: delete it
  // const config = {
  //   headers: {
  //     Authorization:
  //       "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyb290Iiwicm9sZXMiOlsiU1lTQURNSU4iXSwiaWF0IjoxNTk5MjI4NTEwLCJleHAiOjE4MDE1OTkyMjg1MTB9.pWThA99Lk9LNudr2AAqx3uvrsGgpQ6LnfaTZXGHeZUM",
  //   },
  // };

  // const endpoint = "/v1/api/owners";
  // return await axios.get(endpoint, config).then(
  //   (res) => {
  //     const clients = res.data;
  //     let newList = [];
  //     clients.forEach((client) => {
  //       let clientData = {
  //         name: client.name,
  //         address: client.city,
  //         phone: client.phone,
  //       };
  //       newList.push(clientData);
  //     });
  //     return newList;
  //   },
  //   (error) => {
  //     console.log(error);
  //   }
  // );
  return [
    {
      name: "Gippo",
      address: "Minsk, Lenina 12a",
      phone: "+375(29)321-26-23",
      contact: "Oleg Ivanov",
    },
    {
      name: "Belmarket",
      address: "Minsk, Russiyanova 45",
      phone: "+375(33)452-23-58",
      contact: "Irina Zaytseva",
    },
  ];
}
