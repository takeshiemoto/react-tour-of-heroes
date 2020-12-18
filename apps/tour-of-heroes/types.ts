export type PageProps<T> = {
  data: T;
};

export interface Hero {
  id: number;
  name: string;
  created_at: string;
  update_at: string;
}
