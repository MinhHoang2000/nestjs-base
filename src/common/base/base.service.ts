import { FilterQuery, Model, ObjectId, SortOrder, Types } from 'mongoose';
import { BaseQuery, SortQuery } from './base.query';

export class BaseService<T> {
  private readonly model: Model<T & Document>;
  constructor(model: Model<T & Document>) {
    this.model = model;
  }

  async find(filter?: FilterQuery<T>, query?: BaseQuery): Promise<T[]> {
    if (query) {
      const { pageNumber = 1, pageSize = 20, sort = [] } = query;
      const formatSort: [string, SortOrder][] = sort.map((s: SortQuery) => {
        return [s.field, s.type];
      });
      return this.model
        .find(filter)
        .limit(pageSize)
        .skip((pageNumber - 1) * pageSize)
        .sort(formatSort);
    }
    return this.model.find(filter);
  }

  async findOne(filter?: FilterQuery<T>): Promise<T & Document> {
    return this.model.findOne(filter);
  }

  async findById(id: ObjectId | string): Promise<T & Document> {
    if (!Types.ObjectId.isValid(id as any)) throw new Error('Invalid id');
    return this.model.findById(id);
  }

  async create(entity?: FilterQuery<T>): Promise<T & Document> {
    const newModel = await this.model.create(entity);
    return newModel as T & Document;
  }

  async createOrUpdate(
    id?: ObjectId | string,
    newEntity?: FilterQuery<T>,
  ): Promise<T & Document> {
    if (id && Types.ObjectId.isValid(id as any)) {
      return await this.model.findByIdAndUpdate(id, newEntity, {
        new: true,
      });
    }
    return (await this.model.create(newEntity)) as T & Document;
  }

  async update(
    entity?: FilterQuery<T>,
    newEntity?: FilterQuery<T>,
  ): Promise<T & Document> {
    const newDoc = await this.model.findOneAndUpdate(entity, newEntity, {
      new: true,
    });
    return newDoc as T & Document;
  }

  async findByIdAndUpdate(
    id: ObjectId | string,
    newEntity?: FilterQuery<T>,
  ): Promise<T & Document> {
    if (!Types.ObjectId.isValid(id as any)) throw new Error('Invalid id');
    return await this.model.findByIdAndUpdate(id, newEntity, { new: true });
  }

  async delete(filter?: FilterQuery<T>): Promise<void> {
    await this.model.deleteOne(filter);
  }

  async findByIdAndDelete(id: string | ObjectId): Promise<void> {
    await this.model.findByIdAndRemove(id);
  }
}
