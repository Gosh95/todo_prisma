interface CrudModel<T, I> {
  create(data: T): Promise<T>;
  findAll(): Promise<T[]>;
  findById(id: I): Promise<T | null>;
  updateById(id: I, data: Partial<T>): Promise<T | null>;
  deleteById(id: I): Promise<void>;
}

export default CrudModel;
