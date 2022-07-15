import { User } from './../../../models/user';
import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  users: Array<User> = [];
  userCodigo: any = '';

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private actRoute: ActivatedRoute,
    private router: Router) {
    this.userForm = this.fb.group({
      codigo: 0,
      descricao: '',
      preco: '',
      data: '',
    })
  }

  ngOnInit(): void {
    this.actRoute.paramMap.subscribe(params => {
      this.userCodigo = params.get('id');
      console.log(this.userCodigo);
      if(this.userCodigo !== null) {
        this.userService.getUser(this.userCodigo).subscribe(result => {
          this.userForm.patchValue({
            codigo: result[0].codigo,
            descricao: result[0].descricao,
            preco: result[0].preco,
            data: result[0].data,
          })
        })
      }
    })

    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(response => {
      this.users = response;
    })
  }

  createUser() {
    //this.userForm.get('codigo')?.patchValue(this.users.length + 1);
    this.userService.postUser(this.userForm.value).subscribe(result => {
      console.log(`Produto ${result.descricao} foi cadastrado com sucesso !`)
    }, (err) => {

    }, () => {
      this.router.navigate(['/']);
    })
  }

  updateUser() {
    this.userService.updateUser(this.userCodigo, this.userForm.value).subscribe(result => {
      console.log('produto atualizado', result);
    }, (err) => {

    }, () => {
      this.router.navigate(['/']);
    })
  }

  actionButton() {
    if(this.userCodigo !== null) {
      this.updateUser()
    }else {
      this.createUser()
    }
  }

  cancelar() {
    this.router.navigate(['/']);
  }
}
