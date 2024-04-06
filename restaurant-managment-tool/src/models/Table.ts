export interface TableColumn {
  name: string;
  width?: number;
}

export interface TableRow {
  values: string[] | number[];
}

export interface TableProps {
  title?: string;
  columns: TableColumn[];
  body: TableRow[];
}

export default TableProps
