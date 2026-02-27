export interface ApiResponse <T> {
  successful: boolean;
  result: T;
  error?: string;
}