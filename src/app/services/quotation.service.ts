import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/envs/environment';
import { ApiResponse } from '../models/apiResponse.model';
import { Quotations } from '../models/quotations.model';

@Injectable({
  providedIn: 'root'
})
export class QuotationService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // get my quotations 
  getQuotation(params: any): Observable<ApiResponse<Quotations>> {
    return this.http.get<any>(`${this.apiUrl}/quotation`, {params});
  }

  // create new quotations
  createQuotation(data: Quotations): Observable<ApiResponse<Quotations>> {
    return this.http.post<any>(`${this.apiUrl}/quotation`, data);
  }

}
