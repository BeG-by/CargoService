import axios from "axios";

export function getDriversByCompanyId(id) {
  return [
    { id: "123", name: "Nikolay", lastName: "Valdau", passport: "MP3543212" },
    { id: "321", name: "Cristian", lastName: "Boll", passport: "PP3213212" },
  ];
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

export function getClientsByCompanyId(id) {
  // const endpoint = "/v1/api/owners";
  // axios.get(endpoint)
  //     .then(res => {
  //             const clients = res.data;
  //             let newList = [];
  //             clients.forEach(client => {
  //                 let clientData = {
  //                     'name': client.name,
  //                     'address': client.city,
  //                     'phone': client.phone
  //                 }
  //                 newList.push(clientData);
  //             });
  //             return newList;
  //         },
  //         error => {
  //             console.log(error);
  //         });
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
