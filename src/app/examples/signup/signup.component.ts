import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    test: Date = new Date();
    focus;
    focus1;
    constructor( public lS: LoginService) {
        this.lS.login('irving20131109@gmail.com', 'E14081304')
    }

    ngOnInit() {}
}
