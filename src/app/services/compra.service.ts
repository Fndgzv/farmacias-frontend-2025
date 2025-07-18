import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CompraService {

    private base = `${environment.apiUrl}/compras`;

  constructor(private http: HttpClient) {}

  getCompras() {
    return this.http.get<any[]>(this.base);
  }

  crearCompra(payload: any) {
    return this.http.post<any>(this.base, payload);
  }
}
