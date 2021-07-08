import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Leagues } from 'src/app/models/league.model';
import { LeaguesService } from 'src/app/services/leagues.service';
import { TeamService } from 'src/app/services/team.service';
import { UsersService } from 'src/app/services/users.service';
import { Team } from '../../models/team.model'

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
  providers: [ TeamService, UsersService, LeaguesService ]
})
export class TeamsComponent implements OnInit {
  public leagueA;
  public team;
  public persona;
  public leagueSelected: Leagues;
  public teamSelected: Team;
  public addTeam: Team;
  public rutaID: String;

  constructor(public _teamService: TeamService,
    public _usersService: UsersService,
    public _leaguesService: LeaguesService,
    public _activatedRoute: ActivatedRoute) {
      this.teamSelected = new Team("","","",0,0,0,0,0,0,0,"")
      this.addTeam = new Team("","","",0,0,0,0,0,0,0,"")
      this.persona = this._usersService.getPersona();

    }

  ngOnInit(): void {

    this._activatedRoute.paramMap.subscribe(infoRuta => {
      this.rutaID = infoRuta.get('idLeague');
    })
    this.listTableAdmin();
    this.listTableUser();
  }
  getLeague(id) {
    this._leaguesService.findLeagueId(id).subscribe(
      res => {
        this.leagueA = res.leagueFound;
      },
      error => {
        console.log(<any>error);

      }
    )
  }
  findLeagueId(id) {
    this._leaguesService.findLeagueId(id).subscribe(
      res => {
        this.leagueSelected = res.leagueFound;

      },
      error => {
        console.log(<any>error);

      }
    )
  }
  listTableUser() {
    this._teamService.listTableUser(this.rutaID).subscribe(
      res => {
        this.team = res.teamFound;

      },
      error => {
        console.log(<any>error);

      }
    )
  }
  listTableAdmin() {
    this._teamService.listTableAdmin(this.rutaID).subscribe(
      res => {
        this.team = res.teamFound;

      },
      error => {
        console.log(<any>error);

      }
    )
  }
  findTeamId(id) {
    this._teamService.findTeamId(id).subscribe(
      res => {
        this.teamSelected = res.teamFind;

      },
      error => {
        console.log(<any>error);

      }
    )
  }
  updateTeamAdmin() {
    this._teamService.updateTeamAdmin(this.teamSelected).subscribe(
      res => {
        console.log(res);
        this.listTableUser();
        this.listTableAdmin();
      },
      error => {
        console.log(<any>error);

      }
    )
  }
  updateTeamUser() {
  this._teamService.updateTeamUser(this.teamSelected).subscribe(
    res => {
      console.log(res);
      this.listTableUser();
      this.listTableAdmin();
    },
     error => {
        console.log(<any>error);

      }
    )
  }
  deleteTeamUser(idTeam) {
    this._teamService.deleteTeamUser(idTeam).subscribe(
      res => {
        console.log(res);

        this.listTableUser();
        this.listTableAdmin();
      },
      error => {
        console.log(<any>error);

      }
    )
  }
  deleteTeamAdmin(idTeam) {
    this._teamService.deleteTeamAdmin(idTeam).subscribe(
      res => {
        console.log(res);

        this.listTableUser();
        this.listTableAdmin();
      },
      error => {
        console.log(<any>error);

      }
    )
  }
  addTeamUser() {
    console.log(this.addTeam);
      this._teamService.addTeamUser(this.addTeam, this.rutaID).subscribe(
        res => {
          console.log(res);
          this.listTableAdmin();
          this.listTableUser();

        },
        error => {
          console.log(<any>error);
        }
      )
  }
  addTeamAdmin() {
    console.log(this.addTeam);
    this._teamService.addTeamAdmin(this.addTeam, this.rutaID).subscribe(
      res => {
        console.log(res);
        this.listTableAdmin();
        this.listTableUser();

      },
      error => {
        console.log(<any>error);
      }
    )

  }
}
