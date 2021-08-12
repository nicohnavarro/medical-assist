import {Injectable} from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable()
export class ExcelService {

  constructor() {
  }

  static toExportFileName(excelFileName: string): string {
    return `${excelFileName}_export_${new Date().getTime()}.xlsx`;
  }

  public exportAsExcelFile(history: any[],user: any[], excelFileName: string): void {
    const worksheetUser: XLSX.WorkSheet = XLSX.utils.json_to_sheet(user);
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(history);

    const workbook: XLSX.WorkBook = {Sheets: {'user':worksheetUser,'history': worksheet}, SheetNames: ['user','history']};
    XLSX.writeFile(workbook, ExcelService.toExportFileName(excelFileName));
  }
}