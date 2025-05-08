export default class LoginUserDto {
  constructor(req) {
    this.username = req.body.username;
    this.password = req.body.password;
  }
}