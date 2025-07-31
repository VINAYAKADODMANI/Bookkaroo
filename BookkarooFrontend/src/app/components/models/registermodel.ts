export class Registermodel {
    userID?:number;
    userName: string = ''; 
    email: string = ''; 
    password: string = '';
    isOwner: string='true';
    createdDate= new Date();
    updatedDate= new Date();
}
