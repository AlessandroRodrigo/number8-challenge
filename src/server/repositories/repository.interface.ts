export interface Repository<T> {
  getAll(): Promise<T[]>;
  getById(id: number): Promise<T>;
  create(input: Omit<T, "id">): Promise<T>;
  delete(id: number): Promise<void>;
  update(input: T): Promise<T>;
}
