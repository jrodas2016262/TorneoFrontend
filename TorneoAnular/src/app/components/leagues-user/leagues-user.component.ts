import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Leagues } from 'src/app/models/league.model';
import { User } from 'src/app/models/user.model';
import { LeaguesService } from 'src/app/services/leagues.service';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-leagues-user',
  templateUrl: './leagues-user.component.html',
  styleUrls: ['./leagues-user.component.scss'],
  providers: [UsersService, LeaguesService]
})
export class LeaguesUserComponent implements OnInit {
  public league;
  public usuarioC;
  public persona;
  public leagueSelected: Leagues;
  public userDetails: User;
  public addLeague: Leagues;
  public rutaID: String;

  constructor(public _usersService: UsersService,
    public _activatedRoute: ActivatedRoute,
    public _leaguesService: LeaguesService) {
    this.leagueSelected = new Leagues("","","","")
    this.addLeague = new Leagues("","","","")
    this.persona = this._usersService.getPersona();

  }

  ngOnInit(): void {
    console.log(this.persona);

    this._activatedRoute.paramMap.subscribe(infoRuta => {
      this.rutaID = infoRuta.get('idUser');
    })
    this.getUser(this.rutaID);
    this.listLeagueUser();

  }
  getUser(id) {
    this._usersService.listUserID(id).subscribe(
      res => {
        this.usuarioC = res.userFind;
      },
      error => {
        console.log(<any>error);

      }
    )
  }
  listUserID(id) {
    this._usersService.listUserID(id).subscribe(
      res => {
        this.userDetails = res.userFind;
        console.log(res);

      },
      error => {
        console.log(<any>error);

      }
    )
  }
  listLeagueUser() {
    this._leaguesService.listLeagueUser(this.rutaID).subscribe(
      res => {
        this.league = res.leagueFound;

      },
      error => {
        console.log(<any>error);

      }
    )
  }
  findLeagueId(id) {
    this._leaguesService.findLeagueId(id).subscribe(
      res => {
        this.leagueSelected = res.leagueFound
        console.log(res);

      },
      error => {
        console.log(<any>error);

      }
    )
  }
  deleteLeagueUser(idLeague) {
    this._leaguesService.deleteLeagueUser(idLeague).subscribe(
      res => {
        console.log(res);

        this.listLeagueUser();
      },
      error => {
        console.log(<any>error);

      }
    )
  }
  addLeagueUser() {
    console.log(this.addLeague);
    this._leaguesService.addLeagueUser(this.addLeague).subscribe(
      res => {
        console.log(res);
        this.listLeagueUser();

        this.addLeague.name = '';
        this.addLeague.country = '';
      },
      error => {
        console.log(<any>error);

      }
    )
  }
  updateLeagueUser() {
    this._leaguesService.updateLeagueUser(this.leagueSelected).subscribe(
      res => {
        console.log(res);
        this.listLeagueUser();

      },
      error => {
        console.log(<any>error);

      }
    )
  }
}
