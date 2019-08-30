import { Component, OnInit } from '@angular/core';
import { ProyectosService } from '../../services/proyectos.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from '../../services/login.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

    constructor( public pS: ProyectosService, private modalService: NgbModal,
                public lS: LoginService ) { }

    ngOnInit() {
        this.pS.getProyecto().subscribe();
    }

    openXl(content) { this.modalService.open(content, {size: 'lg'}); }

}
