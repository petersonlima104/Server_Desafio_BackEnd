import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users: Array<User> = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(response => {
      this.users = response;
    }, (err) => {
      console.log('ERRO AO EXECUTAR', err.status);
    })
  }

  deleteUser(codigo: number): void {
    this.userService.deleteUser(codigo).subscribe(response => {
      console.log('Produto Excluído');
    }, (err) => {
      console.log(err)
    }, () => {
      this.getUsers();
    })
  }

}
