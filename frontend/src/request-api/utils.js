import axios from "axios";

export async function getDriversByCompanyId(id) {
  //todo: delete it
  const config = {
    headers: {
      Authorization:
        "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyb290Iiwicm9sZXMiOlsiU1lTQURNSU4iXSwiaWF0IjoxNTk5MjI4NTEwLCJleHAiOjE4MDE1OTkyMjg1MTB9.pWThA99Lk9LNudr2AAqx3uvrsGgpQ6LnfaTZXGHeZUM",
    },
  };

  const endpoint = "/v1/api/drivers";
  return await axios.get(endpoint, config).then(
    (res) => {
      console.log("RESPONSE COME");
      console.log(res);
      const clients = res.data;
      let newList = [];
      clients.forEach((client) => {
        let clientData = {
          name: client.name,
          address: client.city,
          phone: client.phone,
        };
        newList.push(clientData);
      });
      return newList;
    },
    (error) => {
      console.log("ERROR OCCURRED");
      console.log(error);
    }
  );
  // return [
  //   { id: "123", name: "Nikolay", lastName: "Valdau", passport: "MP3543212" },
  //   { id: "321", name: "Cristian", lastName: "Boll", passport: "PP3213212" },
  // ];
}

export function getRejectedDeliveryNotesByDispatcherId(id) {
  return [
    {
      index: "MPP683261927301",
      dispatcher: {
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
        lastName: "Sokol",
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

      fromAddress: "Minsk",
      toAddress: "Berlin",
      registrationDate: "2020-07-09",
    },

    {
      index: "SSSS68321ASASD4",
      dispatcher: {
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
        lastName: "Sokol",
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

      fromAddress: "Minsk",
      toAddress: "Berlin",
      registrationDate: "2020-07-02",
    },
  ];
}

export async function getClientsByCompanyId(id) {
  //todo: delete it
  const config = {
    headers: {
      Authorization:
        "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyb290Iiwicm9sZXMiOlsiU1lTQURNSU4iXSwiaWF0IjoxNTk5MjI4NTEwLCJleHAiOjE4MDE1OTkyMjg1MTB9.pWThA99Lk9LNudr2AAqx3uvrsGgpQ6LnfaTZXGHeZUM",
    },
  };

  const endpoint = "/v1/api/owners";
  return await axios.get(endpoint, config).then(
    (res) => {
      const clients = res.data;
      let newList = [];
      clients.forEach((client) => {
        let clientData = {
          name: client.name,
          address: client.city,
          phone: client.phone,
        };
        newList.push(clientData);
      });
      return newList;
    },
    (error) => {
      console.log(error);
    }
  );
}
