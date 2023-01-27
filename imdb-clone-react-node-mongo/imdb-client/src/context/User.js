import axios from "axios";

// const User = async () =>{
//     const user =  await axios.get("http://localhost:8080/api/user");
//     console.log(user.data)
//     return user;
// }

// export default User;

export default class User {
    static accessToken = "";
    static id = "";
    static isLoggedIn="";

    static logged = async () =>{
        const {data: res} =  await axios.get("http://localhost:8080/api/user");
        if(res){
        console.log(res)
        this.isLoggedIn = res.isLoggedIn;
        this.id = res.user;}
        return res;
    }


}