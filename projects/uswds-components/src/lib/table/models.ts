/**
 * Represents row data for a table
 */
export interface TableDataSource {
  rowHeader?: string;
  [props: string]: any;
}