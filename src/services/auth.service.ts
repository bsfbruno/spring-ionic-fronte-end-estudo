import { JwtHelper } from 'angular2-jwt';
import { LocalUser } from './../models/local_user';
import { API_CONFIG } from '../config/api.config';
import { HttpClient } from '@angular/common/http';
import { CredenciaisDTO } from '../models/credenciais.dto';
import { Injectable } from "@angular/core";
import { StorageService } from './storage.service';

@Injectable()
export class AuthService {
  [x: string]: any;

    jwtHelper: JwtHelper = new JwtHelper;

    constructor(
        public http: HttpClient,
        public storage: StorageService) {        
    }

    authenticate(creds: CredenciaisDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/login`,
            creds,
            {
                observe: 'response',
                responseType: 'text'
            });
    }

    refreshToken() {
        return this.http.post(
            `${API_CONFIG.baseUrl}/auth/refresh_token`,
            {},
            {
                observe: 'response',
                responseType: 'text'
            });
    }

    successfullLogin(authorizationValue: string) {
        let tok = authorizationValue.substring(7);
        let user: LocalUser = {
            token: tok,
            email: this.jwtHelper.decodeToken(tok).sub
        };
        this.storage.setLocalUser(user);
    }

    logout() {
        this.storage.setLocalUser(null);
    }
}