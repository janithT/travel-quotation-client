import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Quotations } from 'src/app/models/quotations.model';
import { NotificationService } from 'src/app/services/notification.service';
import { QuotationService } from 'src/app/services/quotation.service';

@Component({
  selector: 'app-my-quotations',
  templateUrl: './my-quotations.component.html',
  styleUrls: ['./my-quotations.component.css']
})
export class MyQuotationsComponent {

  pageIndex: number = 0;
  pageSize: number = 5;
  totalItems: number = 0;
  selectedStatus: string = 'all';
  loading: boolean = false;

  displayedColumns: string[] = [
    'id',
    'total',
    'currency',
    'formatted_start_date',
    'formatted_created_at',
  ];
  dataSource: MatTableDataSource<Quotations> = new MatTableDataSource<Quotations>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private quotationService: QuotationService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadQuotations();
  }

  // pagination change
  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadQuotations();
  }

  // load my quoptations
  loadQuotations(): void {
    this.loading = true;

    const params: any = {
      page: this.pageIndex + 1,
      perPage: this.pageSize,
    };

    this.quotationService.getQuotation(params).subscribe({
      next: (response: any) => {
        if (
          response.status === 'success' &&
          Array.isArray(response.data.data)
        ) {
          this.dataSource = new MatTableDataSource<Quotations>(response.data.data);
          this.totalItems = response.data.total;
          this.pageSize = response.data.per_page;
          this.pageIndex = response.data.current_page - 1;
          this.loading = false;
        }
      },
      error: (err) => {
        console.error(
          err?.error?.message || 'Something went wrong. Please try again.',
          err
        );
        this.loading = false;
        this.notificationService.show(
          err?.error?.message || 'Something went wrong. Please try again.',
          'error'
        );
      },
    });
  }
}
