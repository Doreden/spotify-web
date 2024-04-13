export const UserService = {
    createMinimalUser
}

function createMinimalUser(user){
    return {
        id: user.id,
        fullname: user.fullname,
        imgUrl: user.imgUrl
    }
}

// const user = {
//     id: "u101",
//     fullname: "Puki Ben David",
//     username: "puki",
//     password: "123",
//     email: "Puki@gmail.com",
//     gender: "male",
//     birthday: 1234567890,
//     imgUrl: "http://some-photo/"
//   };