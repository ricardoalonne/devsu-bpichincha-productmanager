import {
  camelToSnakeCase,
  copyValuesToObject,
} from '../../shared/utils/api-model-converter.util';

export class ProductRequest {
  id!: string;
  name!: string;
  description!: string;
  logo!: string;
  dateRelease!: Date;
  dateRevision!: Date;

  constructor(data?: {
    id?: string;
    name?: string;
    description?: string;
    logo?: string;
    dateRelease?: Date;
    dateRevision?: Date;
  }) {
    if (data) {
      copyValuesToObject(data, this);
    }
  }

  toSnakeCase(): any {
    return camelToSnakeCase(this);
  }
}
