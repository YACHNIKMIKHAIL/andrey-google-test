import {Injectable} from '@angular/core';
import {IData} from "../interfaces/data.interface";
import {GetDataService} from "./getData.service";
import {tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _incomeData: IData[] = []
  private _outcomeData: IData[] = []
  private _loanData: IData[] = []
  private _investmentData: IData[] = []
  public allCount: number = 0

  constructor(private _getDataService: GetDataService) {
  }

  fetch(): void {
    this._getDataService.getData()
      .pipe(
        tap((d: IData[]) => {
          this.incomeData = d.filter(f => f.type === 'income')
          this.outcomeData = d.filter(f => f.type === 'outcome')
          this.loanData = d.filter(f => f.type === 'loan')
          this.investmentData = d.filter(f => f.type === 'investment')
          this.allCount = d.length
        })
      )
      .subscribe()
  }

  set incomeData(d: IData[]) {
    this._incomeData = d
  }

  set outcomeData(d: IData[]) {
    this._outcomeData = d
  }

  set loanData(d: IData[]) {
    this._loanData = d
  }

  set investmentData(d: IData[]) {
    this._investmentData = d
  }

  // get incomeData() {
  //   return this._incomeData
  // }
  //
  // get outcomeData() {
  //   return this._outcomeData
  // }
  //
  // get loanData() {
  //   return this._loanData
  // }
  //
  // get investmentData() {
  //   return this._investmentData
  // }

  getOnly(n: number) {
    if (n === 0) {
      return this._incomeData
    } else if (n === 1) {
      return this._outcomeData
    } else if (n === 2) {
      return this._loanData
    } else {
      return this._investmentData
    }
  }
}


