import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UsersService } from '../../services/users.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-listusers',
  templateUrl: './listusers.component.html',
  styleUrls: ['./listusers.component.scss'],
  providers: [UsersService]
})
export class ListusersComponent implements OnInit {
  public users;
  public userSelected: User;
  public register: User;
  public adminNew: User;

  constructor(public _usersService: UsersService) {
    this.userSelected = new User("", "", "", "", 0);
    this.register = new User("", "", "", "", 0);
    this.adminNew = new User("", "", "", "", 0);
  }

  ngOnInit(): void {
    this.listUsers();
  }
  listUsers() {
    this._usersService.listUsers().subscribe(
      res => {
        this.users = res.usersFound;

      },
      error => {
        console.log(<any>error);

      }
    )
  }
  listUserID(id) {
    this._usersService.listUserID(id).subscribe(
      res => {
        this.userSelected = res.userFind;
        console.log(this.userSelected);

      },
      error => {
        console.log(<any>error);

      }
    )
  }
  updateUsers() {
    this._usersService.updateUsers(this.userSelected).subscribe(
      res => {
        console.log(res);

        this.listUsers();
      },
      error => {
        console.log(<any>error);

      }
    )
  }
  deleteUsers(idUser) {
    this._usersService.deleteUsers(idUser).subscribe(
      res => {
        console.log(res);

        this.listUsers();
      },
      error => {
        console.log(<any>error);

      }
    )
  }
  addAdmin() {
    console.log(this.adminNew);

    this._usersService.registerAdmin(this.adminNew).subscribe(
      res => {
        console.log(res);

        Swal.fire({
          icon: 'success',
          title: 'Usuario agregado!',
          showConfirmButton: false,
          timer: 1500
        })

        this.adminNew.user = '';
        this.adminNew.email = '';
        this.adminNew.password = '';

        this.listUsers();
      },
      error => {
        console.log(<any>error);

        Swal.fire({
          icon: 'error',
          title: 'Parece que algo salio mal',
          showConfirmButton: false,
          timer: 1500
        })
      }
    )

  }
}
