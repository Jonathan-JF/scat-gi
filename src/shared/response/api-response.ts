export type ApiResponse<T = any> = {
  success: boolean;
  data?: T;
  error?: string;
  code?: string;
  details?: any;
};

export type ErrorResponse = {
  success: false;
  error: string;
  code?: string;
  details?: any;
};
