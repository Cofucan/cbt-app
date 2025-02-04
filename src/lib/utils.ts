export const baseUrl = "https://schooledgecbtapi-e4804672405c.herokuapp.com";
// export const baseUrl = "https://demo.brainiacsolutions.org"
// export const baseUrl = "http://localhost:8000";


export interface Department {
  id: string;
  name: string;
}

export interface PaginationResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
