export interface GroupRequest {
  id: string;
  name: string;
  requests: Array<Request>;
}

export interface Request {
  id: string;
  title: string;
  method: string;
  url: string;
}
