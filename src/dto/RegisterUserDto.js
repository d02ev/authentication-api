export default class RegisterUserDto {
  constructor(req) {
    this.username = req.body.username;
    this.password = req.body.password;
  }
}