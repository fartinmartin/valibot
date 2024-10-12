import { getGlobalConfig } from '../../storages/index.ts';
import type {
  BaseIssue,
  BaseSchema,
  BaseSchemaAsync,
  Config,
  InferIssue,
} from '../../types/index.ts';

/**
 * Changes the local configuration of a schema.
 *
 * @param schema The schema to configure.
 * @param config The parse configuration.
 *
 * @returns The configured schema.
 */
export function config<
  const TSchema extends
    | BaseSchema<unknown, unknown, BaseIssue<unknown>>
    | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>,
>(schema: TSchema, config: Config<InferIssue<TSchema>>): TSchema {
  return {
    ...schema,
    '~validate'(dataset, config_ = getGlobalConfig()) {
      return schema['~validate'](dataset, { ...config_, ...config });
    },
  };
}
