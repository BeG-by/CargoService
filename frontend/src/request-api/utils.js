export function getDriversByCompanyId(id) {
    return [
        {id: "123", name: "Igor", lastName: "Surname"},
        {id: "321", name: "Denis", lastName: "Dush"}
    ]
}

export function getClientsByCompanyId(id) {
    return [
        {
            name: 'Gippo',
            address: 'Minsk, Lenina 12a',
            phone: '+375(29)321-26-23',
            contact: 'Oleg Ivanov'
        },
        {
            name: "Belmarket",
            address: 'Minsk, Russiyanova 45',
            phone: '+375(33)452-23-58',
            contact: 'Irina Zaytseva'
        }
    ]

}