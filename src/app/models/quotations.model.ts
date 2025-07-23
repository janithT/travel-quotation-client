export interface Quotations {
  id?: number;
  currency: string;
  status: 'pending' | 'in_progress' | 'complete';
  quote_key: string;
  total: number;
  start_date: Date;
  created_at: Date;
  deleted_at: Date;
  updated_at: Date;

}