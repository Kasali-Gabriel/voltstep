
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Catalog
 * 
 */
export type Catalog = $Result.DefaultSelection<Prisma.$CatalogPayload>
/**
 * Model Category
 * 
 */
export type Category = $Result.DefaultSelection<Prisma.$CategoryPayload>
/**
 * Model Subcategory
 * 
 */
export type Subcategory = $Result.DefaultSelection<Prisma.$SubcategoryPayload>
/**
 * Model Product
 * 
 */
export type Product = $Result.DefaultSelection<Prisma.$ProductPayload>
/**
 * Model Review
 * 
 */
export type Review = $Result.DefaultSelection<Prisma.$ReviewPayload>
/**
 * Model Order
 * 
 */
export type Order = $Result.DefaultSelection<Prisma.$OrderPayload>
/**
 * Model OrderItem
 * 
 */
export type OrderItem = $Result.DefaultSelection<Prisma.$OrderItemPayload>
/**
 * Model WishList
 * 
 */
export type WishList = $Result.DefaultSelection<Prisma.$WishListPayload>
/**
 * Model PopularSearch
 * 
 */
export type PopularSearch = $Result.DefaultSelection<Prisma.$PopularSearchPayload>
/**
 * Model SearchHistory
 * 
 */
export type SearchHistory = $Result.DefaultSelection<Prisma.$SearchHistoryPayload>
/**
 * Model ViewedProduct
 * 
 */
export type ViewedProduct = $Result.DefaultSelection<Prisma.$ViewedProductPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Tag: {
  NEW_ARRIVAL: 'NEW_ARRIVAL',
  BESTSELLER: 'BESTSELLER',
  FLASH_SALE: 'FLASH_SALE',
  BACK_IN_STOCK: 'BACK_IN_STOCK'
};

export type Tag = (typeof Tag)[keyof typeof Tag]

}

export type Tag = $Enums.Tag

export const Tag: typeof $Enums.Tag

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P]): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number }): $Utils.JsPromise<R>

  /**
   * Executes a raw MongoDB command and returns the result of it.
   * @example
   * ```
   * const user = await prisma.$runCommandRaw({
   *   aggregate: 'User',
   *   pipeline: [{ $match: { name: 'Bob' } }, { $project: { email: true, _id: false } }],
   *   explain: false,
   * })
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $runCommandRaw(command: Prisma.InputJsonObject): Prisma.PrismaPromise<Prisma.JsonObject>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.catalog`: Exposes CRUD operations for the **Catalog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Catalogs
    * const catalogs = await prisma.catalog.findMany()
    * ```
    */
  get catalog(): Prisma.CatalogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.category`: Exposes CRUD operations for the **Category** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categories
    * const categories = await prisma.category.findMany()
    * ```
    */
  get category(): Prisma.CategoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.subcategory`: Exposes CRUD operations for the **Subcategory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Subcategories
    * const subcategories = await prisma.subcategory.findMany()
    * ```
    */
  get subcategory(): Prisma.SubcategoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.product`: Exposes CRUD operations for the **Product** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Products
    * const products = await prisma.product.findMany()
    * ```
    */
  get product(): Prisma.ProductDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.review`: Exposes CRUD operations for the **Review** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Reviews
    * const reviews = await prisma.review.findMany()
    * ```
    */
  get review(): Prisma.ReviewDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.order`: Exposes CRUD operations for the **Order** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Orders
    * const orders = await prisma.order.findMany()
    * ```
    */
  get order(): Prisma.OrderDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.orderItem`: Exposes CRUD operations for the **OrderItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OrderItems
    * const orderItems = await prisma.orderItem.findMany()
    * ```
    */
  get orderItem(): Prisma.OrderItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.wishList`: Exposes CRUD operations for the **WishList** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WishLists
    * const wishLists = await prisma.wishList.findMany()
    * ```
    */
  get wishList(): Prisma.WishListDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.popularSearch`: Exposes CRUD operations for the **PopularSearch** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PopularSearches
    * const popularSearches = await prisma.popularSearch.findMany()
    * ```
    */
  get popularSearch(): Prisma.PopularSearchDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.searchHistory`: Exposes CRUD operations for the **SearchHistory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SearchHistories
    * const searchHistories = await prisma.searchHistory.findMany()
    * ```
    */
  get searchHistory(): Prisma.SearchHistoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.viewedProduct`: Exposes CRUD operations for the **ViewedProduct** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ViewedProducts
    * const viewedProducts = await prisma.viewedProduct.findMany()
    * ```
    */
  get viewedProduct(): Prisma.ViewedProductDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.9.0
   * Query Engine version: 81e4af48011447c3cc503a190e86995b66d2a28e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Catalog: 'Catalog',
    Category: 'Category',
    Subcategory: 'Subcategory',
    Product: 'Product',
    Review: 'Review',
    Order: 'Order',
    OrderItem: 'OrderItem',
    WishList: 'WishList',
    PopularSearch: 'PopularSearch',
    SearchHistory: 'SearchHistory',
    ViewedProduct: 'ViewedProduct'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "catalog" | "category" | "subcategory" | "product" | "review" | "order" | "orderItem" | "wishList" | "popularSearch" | "searchHistory" | "viewedProduct"
      txIsolationLevel: never
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.UserFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.UserAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Catalog: {
        payload: Prisma.$CatalogPayload<ExtArgs>
        fields: Prisma.CatalogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CatalogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CatalogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CatalogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CatalogPayload>
          }
          findFirst: {
            args: Prisma.CatalogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CatalogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CatalogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CatalogPayload>
          }
          findMany: {
            args: Prisma.CatalogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CatalogPayload>[]
          }
          create: {
            args: Prisma.CatalogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CatalogPayload>
          }
          createMany: {
            args: Prisma.CatalogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.CatalogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CatalogPayload>
          }
          update: {
            args: Prisma.CatalogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CatalogPayload>
          }
          deleteMany: {
            args: Prisma.CatalogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CatalogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CatalogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CatalogPayload>
          }
          aggregate: {
            args: Prisma.CatalogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCatalog>
          }
          groupBy: {
            args: Prisma.CatalogGroupByArgs<ExtArgs>
            result: $Utils.Optional<CatalogGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.CatalogFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.CatalogAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.CatalogCountArgs<ExtArgs>
            result: $Utils.Optional<CatalogCountAggregateOutputType> | number
          }
        }
      }
      Category: {
        payload: Prisma.$CategoryPayload<ExtArgs>
        fields: Prisma.CategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findFirst: {
            args: Prisma.CategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findMany: {
            args: Prisma.CategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          create: {
            args: Prisma.CategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          createMany: {
            args: Prisma.CategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.CategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          update: {
            args: Prisma.CategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          deleteMany: {
            args: Prisma.CategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          aggregate: {
            args: Prisma.CategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategory>
          }
          groupBy: {
            args: Prisma.CategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<CategoryGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.CategoryFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.CategoryAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.CategoryCountArgs<ExtArgs>
            result: $Utils.Optional<CategoryCountAggregateOutputType> | number
          }
        }
      }
      Subcategory: {
        payload: Prisma.$SubcategoryPayload<ExtArgs>
        fields: Prisma.SubcategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SubcategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubcategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SubcategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubcategoryPayload>
          }
          findFirst: {
            args: Prisma.SubcategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubcategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SubcategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubcategoryPayload>
          }
          findMany: {
            args: Prisma.SubcategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubcategoryPayload>[]
          }
          create: {
            args: Prisma.SubcategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubcategoryPayload>
          }
          createMany: {
            args: Prisma.SubcategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.SubcategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubcategoryPayload>
          }
          update: {
            args: Prisma.SubcategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubcategoryPayload>
          }
          deleteMany: {
            args: Prisma.SubcategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SubcategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SubcategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubcategoryPayload>
          }
          aggregate: {
            args: Prisma.SubcategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSubcategory>
          }
          groupBy: {
            args: Prisma.SubcategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<SubcategoryGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.SubcategoryFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.SubcategoryAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.SubcategoryCountArgs<ExtArgs>
            result: $Utils.Optional<SubcategoryCountAggregateOutputType> | number
          }
        }
      }
      Product: {
        payload: Prisma.$ProductPayload<ExtArgs>
        fields: Prisma.ProductFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findFirst: {
            args: Prisma.ProductFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findMany: {
            args: Prisma.ProductFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          create: {
            args: Prisma.ProductCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          createMany: {
            args: Prisma.ProductCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ProductDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          update: {
            args: Prisma.ProductUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          deleteMany: {
            args: Prisma.ProductDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProductUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          aggregate: {
            args: Prisma.ProductAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProduct>
          }
          groupBy: {
            args: Prisma.ProductGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.ProductFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.ProductAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.ProductCountArgs<ExtArgs>
            result: $Utils.Optional<ProductCountAggregateOutputType> | number
          }
        }
      }
      Review: {
        payload: Prisma.$ReviewPayload<ExtArgs>
        fields: Prisma.ReviewFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReviewFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReviewFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          findFirst: {
            args: Prisma.ReviewFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReviewFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          findMany: {
            args: Prisma.ReviewFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>[]
          }
          create: {
            args: Prisma.ReviewCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          createMany: {
            args: Prisma.ReviewCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ReviewDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          update: {
            args: Prisma.ReviewUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          deleteMany: {
            args: Prisma.ReviewDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReviewUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ReviewUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          aggregate: {
            args: Prisma.ReviewAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReview>
          }
          groupBy: {
            args: Prisma.ReviewGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReviewGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.ReviewFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.ReviewAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.ReviewCountArgs<ExtArgs>
            result: $Utils.Optional<ReviewCountAggregateOutputType> | number
          }
        }
      }
      Order: {
        payload: Prisma.$OrderPayload<ExtArgs>
        fields: Prisma.OrderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          findFirst: {
            args: Prisma.OrderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          findMany: {
            args: Prisma.OrderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          create: {
            args: Prisma.OrderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          createMany: {
            args: Prisma.OrderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.OrderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          update: {
            args: Prisma.OrderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          deleteMany: {
            args: Prisma.OrderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.OrderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          aggregate: {
            args: Prisma.OrderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrder>
          }
          groupBy: {
            args: Prisma.OrderGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrderGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.OrderFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.OrderAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.OrderCountArgs<ExtArgs>
            result: $Utils.Optional<OrderCountAggregateOutputType> | number
          }
        }
      }
      OrderItem: {
        payload: Prisma.$OrderItemPayload<ExtArgs>
        fields: Prisma.OrderItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrderItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrderItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          findFirst: {
            args: Prisma.OrderItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrderItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          findMany: {
            args: Prisma.OrderItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>[]
          }
          create: {
            args: Prisma.OrderItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          createMany: {
            args: Prisma.OrderItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.OrderItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          update: {
            args: Prisma.OrderItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          deleteMany: {
            args: Prisma.OrderItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrderItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.OrderItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          aggregate: {
            args: Prisma.OrderItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrderItem>
          }
          groupBy: {
            args: Prisma.OrderItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrderItemGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.OrderItemFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.OrderItemAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.OrderItemCountArgs<ExtArgs>
            result: $Utils.Optional<OrderItemCountAggregateOutputType> | number
          }
        }
      }
      WishList: {
        payload: Prisma.$WishListPayload<ExtArgs>
        fields: Prisma.WishListFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WishListFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WishListPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WishListFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WishListPayload>
          }
          findFirst: {
            args: Prisma.WishListFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WishListPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WishListFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WishListPayload>
          }
          findMany: {
            args: Prisma.WishListFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WishListPayload>[]
          }
          create: {
            args: Prisma.WishListCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WishListPayload>
          }
          createMany: {
            args: Prisma.WishListCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.WishListDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WishListPayload>
          }
          update: {
            args: Prisma.WishListUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WishListPayload>
          }
          deleteMany: {
            args: Prisma.WishListDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WishListUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.WishListUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WishListPayload>
          }
          aggregate: {
            args: Prisma.WishListAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWishList>
          }
          groupBy: {
            args: Prisma.WishListGroupByArgs<ExtArgs>
            result: $Utils.Optional<WishListGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.WishListFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.WishListAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.WishListCountArgs<ExtArgs>
            result: $Utils.Optional<WishListCountAggregateOutputType> | number
          }
        }
      }
      PopularSearch: {
        payload: Prisma.$PopularSearchPayload<ExtArgs>
        fields: Prisma.PopularSearchFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PopularSearchFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PopularSearchPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PopularSearchFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PopularSearchPayload>
          }
          findFirst: {
            args: Prisma.PopularSearchFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PopularSearchPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PopularSearchFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PopularSearchPayload>
          }
          findMany: {
            args: Prisma.PopularSearchFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PopularSearchPayload>[]
          }
          create: {
            args: Prisma.PopularSearchCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PopularSearchPayload>
          }
          createMany: {
            args: Prisma.PopularSearchCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PopularSearchDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PopularSearchPayload>
          }
          update: {
            args: Prisma.PopularSearchUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PopularSearchPayload>
          }
          deleteMany: {
            args: Prisma.PopularSearchDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PopularSearchUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PopularSearchUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PopularSearchPayload>
          }
          aggregate: {
            args: Prisma.PopularSearchAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePopularSearch>
          }
          groupBy: {
            args: Prisma.PopularSearchGroupByArgs<ExtArgs>
            result: $Utils.Optional<PopularSearchGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.PopularSearchFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.PopularSearchAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.PopularSearchCountArgs<ExtArgs>
            result: $Utils.Optional<PopularSearchCountAggregateOutputType> | number
          }
        }
      }
      SearchHistory: {
        payload: Prisma.$SearchHistoryPayload<ExtArgs>
        fields: Prisma.SearchHistoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SearchHistoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchHistoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SearchHistoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchHistoryPayload>
          }
          findFirst: {
            args: Prisma.SearchHistoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchHistoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SearchHistoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchHistoryPayload>
          }
          findMany: {
            args: Prisma.SearchHistoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchHistoryPayload>[]
          }
          create: {
            args: Prisma.SearchHistoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchHistoryPayload>
          }
          createMany: {
            args: Prisma.SearchHistoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.SearchHistoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchHistoryPayload>
          }
          update: {
            args: Prisma.SearchHistoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchHistoryPayload>
          }
          deleteMany: {
            args: Prisma.SearchHistoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SearchHistoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SearchHistoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchHistoryPayload>
          }
          aggregate: {
            args: Prisma.SearchHistoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSearchHistory>
          }
          groupBy: {
            args: Prisma.SearchHistoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<SearchHistoryGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.SearchHistoryFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.SearchHistoryAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.SearchHistoryCountArgs<ExtArgs>
            result: $Utils.Optional<SearchHistoryCountAggregateOutputType> | number
          }
        }
      }
      ViewedProduct: {
        payload: Prisma.$ViewedProductPayload<ExtArgs>
        fields: Prisma.ViewedProductFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ViewedProductFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ViewedProductPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ViewedProductFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ViewedProductPayload>
          }
          findFirst: {
            args: Prisma.ViewedProductFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ViewedProductPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ViewedProductFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ViewedProductPayload>
          }
          findMany: {
            args: Prisma.ViewedProductFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ViewedProductPayload>[]
          }
          create: {
            args: Prisma.ViewedProductCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ViewedProductPayload>
          }
          createMany: {
            args: Prisma.ViewedProductCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ViewedProductDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ViewedProductPayload>
          }
          update: {
            args: Prisma.ViewedProductUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ViewedProductPayload>
          }
          deleteMany: {
            args: Prisma.ViewedProductDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ViewedProductUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ViewedProductUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ViewedProductPayload>
          }
          aggregate: {
            args: Prisma.ViewedProductAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateViewedProduct>
          }
          groupBy: {
            args: Prisma.ViewedProductGroupByArgs<ExtArgs>
            result: $Utils.Optional<ViewedProductGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.ViewedProductFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.ViewedProductAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.ViewedProductCountArgs<ExtArgs>
            result: $Utils.Optional<ViewedProductCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $runCommandRaw: {
          args: Prisma.InputJsonObject,
          result: Prisma.JsonObject
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    catalog?: CatalogOmit
    category?: CategoryOmit
    subcategory?: SubcategoryOmit
    product?: ProductOmit
    review?: ReviewOmit
    order?: OrderOmit
    orderItem?: OrderItemOmit
    wishList?: WishListOmit
    popularSearch?: PopularSearchOmit
    searchHistory?: SearchHistoryOmit
    viewedProduct?: ViewedProductOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    wishList: number
    reviews: number
    orders: number
    viewedProducts: number
    searchHistories: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    wishList?: boolean | UserCountOutputTypeCountWishListArgs
    reviews?: boolean | UserCountOutputTypeCountReviewsArgs
    orders?: boolean | UserCountOutputTypeCountOrdersArgs
    viewedProducts?: boolean | UserCountOutputTypeCountViewedProductsArgs
    searchHistories?: boolean | UserCountOutputTypeCountSearchHistoriesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountWishListArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WishListWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountViewedProductsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ViewedProductWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSearchHistoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SearchHistoryWhereInput
  }


  /**
   * Count Type CatalogCountOutputType
   */

  export type CatalogCountOutputType = {
    categories: number
  }

  export type CatalogCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    categories?: boolean | CatalogCountOutputTypeCountCategoriesArgs
  }

  // Custom InputTypes
  /**
   * CatalogCountOutputType without action
   */
  export type CatalogCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CatalogCountOutputType
     */
    select?: CatalogCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CatalogCountOutputType without action
   */
  export type CatalogCountOutputTypeCountCategoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryWhereInput
  }


  /**
   * Count Type CategoryCountOutputType
   */

  export type CategoryCountOutputType = {
    subcategories: number
  }

  export type CategoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subcategories?: boolean | CategoryCountOutputTypeCountSubcategoriesArgs
  }

  // Custom InputTypes
  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryCountOutputType
     */
    select?: CategoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountSubcategoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubcategoryWhereInput
  }


  /**
   * Count Type SubcategoryCountOutputType
   */

  export type SubcategoryCountOutputType = {
    products: number
  }

  export type SubcategoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    products?: boolean | SubcategoryCountOutputTypeCountProductsArgs
  }

  // Custom InputTypes
  /**
   * SubcategoryCountOutputType without action
   */
  export type SubcategoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubcategoryCountOutputType
     */
    select?: SubcategoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SubcategoryCountOutputType without action
   */
  export type SubcategoryCountOutputTypeCountProductsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
  }


  /**
   * Count Type ProductCountOutputType
   */

  export type ProductCountOutputType = {
    reviews: number
    orderItems: number
    wishLists: number
  }

  export type ProductCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reviews?: boolean | ProductCountOutputTypeCountReviewsArgs
    orderItems?: boolean | ProductCountOutputTypeCountOrderItemsArgs
    wishLists?: boolean | ProductCountOutputTypeCountWishListsArgs
  }

  // Custom InputTypes
  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCountOutputType
     */
    select?: ProductCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountReviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewWhereInput
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountOrderItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderItemWhereInput
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountWishListsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WishListWhereInput
  }


  /**
   * Count Type OrderCountOutputType
   */

  export type OrderCountOutputType = {
    items: number
  }

  export type OrderCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | OrderCountOutputTypeCountItemsArgs
  }

  // Custom InputTypes
  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderCountOutputType
     */
    select?: OrderCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeCountItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderItemWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    firstName: string | null
    lastName: string | null
    imageUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
    clerkUserId: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    firstName: string | null
    lastName: string | null
    imageUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
    clerkUserId: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    firstName: number
    lastName: number
    imageUrl: number
    createdAt: number
    updatedAt: number
    clerkUserId: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    firstName?: true
    lastName?: true
    imageUrl?: true
    createdAt?: true
    updatedAt?: true
    clerkUserId?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    firstName?: true
    lastName?: true
    imageUrl?: true
    createdAt?: true
    updatedAt?: true
    clerkUserId?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    firstName?: true
    lastName?: true
    imageUrl?: true
    createdAt?: true
    updatedAt?: true
    clerkUserId?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    firstName: string
    lastName: string
    imageUrl: string | null
    createdAt: Date
    updatedAt: Date
    clerkUserId: string | null
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    firstName?: boolean
    lastName?: boolean
    imageUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    clerkUserId?: boolean
    wishList?: boolean | User$wishListArgs<ExtArgs>
    reviews?: boolean | User$reviewsArgs<ExtArgs>
    orders?: boolean | User$ordersArgs<ExtArgs>
    viewedProducts?: boolean | User$viewedProductsArgs<ExtArgs>
    searchHistories?: boolean | User$searchHistoriesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>



  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    firstName?: boolean
    lastName?: boolean
    imageUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    clerkUserId?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "firstName" | "lastName" | "imageUrl" | "createdAt" | "updatedAt" | "clerkUserId", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    wishList?: boolean | User$wishListArgs<ExtArgs>
    reviews?: boolean | User$reviewsArgs<ExtArgs>
    orders?: boolean | User$ordersArgs<ExtArgs>
    viewedProducts?: boolean | User$viewedProductsArgs<ExtArgs>
    searchHistories?: boolean | User$searchHistoriesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      wishList: Prisma.$WishListPayload<ExtArgs>[]
      reviews: Prisma.$ReviewPayload<ExtArgs>[]
      orders: Prisma.$OrderPayload<ExtArgs>[]
      viewedProducts: Prisma.$ViewedProductPayload<ExtArgs>[]
      searchHistories: Prisma.$SearchHistoryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      firstName: string
      lastName: string
      imageUrl: string | null
      createdAt: Date
      updatedAt: Date
      clerkUserId: string | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * @param {UserFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const user = await prisma.user.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: UserFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a User.
     * @param {UserAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const user = await prisma.user.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: UserAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    wishList<T extends User$wishListArgs<ExtArgs> = {}>(args?: Subset<T, User$wishListArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WishListPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    reviews<T extends User$reviewsArgs<ExtArgs> = {}>(args?: Subset<T, User$reviewsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    orders<T extends User$ordersArgs<ExtArgs> = {}>(args?: Subset<T, User$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    viewedProducts<T extends User$viewedProductsArgs<ExtArgs> = {}>(args?: Subset<T, User$viewedProductsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ViewedProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    searchHistories<T extends User$searchHistoriesArgs<ExtArgs> = {}>(args?: Subset<T, User$searchHistoriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SearchHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly firstName: FieldRef<"User", 'String'>
    readonly lastName: FieldRef<"User", 'String'>
    readonly imageUrl: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly clerkUserId: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User findRaw
   */
  export type UserFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * User aggregateRaw
   */
  export type UserAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * User.wishList
   */
  export type User$wishListArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WishList
     */
    select?: WishListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WishList
     */
    omit?: WishListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WishListInclude<ExtArgs> | null
    where?: WishListWhereInput
    orderBy?: WishListOrderByWithRelationInput | WishListOrderByWithRelationInput[]
    cursor?: WishListWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WishListScalarFieldEnum | WishListScalarFieldEnum[]
  }

  /**
   * User.reviews
   */
  export type User$reviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    where?: ReviewWhereInput
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    cursor?: ReviewWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * User.orders
   */
  export type User$ordersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    cursor?: OrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * User.viewedProducts
   */
  export type User$viewedProductsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ViewedProduct
     */
    select?: ViewedProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ViewedProduct
     */
    omit?: ViewedProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ViewedProductInclude<ExtArgs> | null
    where?: ViewedProductWhereInput
    orderBy?: ViewedProductOrderByWithRelationInput | ViewedProductOrderByWithRelationInput[]
    cursor?: ViewedProductWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ViewedProductScalarFieldEnum | ViewedProductScalarFieldEnum[]
  }

  /**
   * User.searchHistories
   */
  export type User$searchHistoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchHistory
     */
    select?: SearchHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the SearchHistory
     */
    omit?: SearchHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SearchHistoryInclude<ExtArgs> | null
    where?: SearchHistoryWhereInput
    orderBy?: SearchHistoryOrderByWithRelationInput | SearchHistoryOrderByWithRelationInput[]
    cursor?: SearchHistoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SearchHistoryScalarFieldEnum | SearchHistoryScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Catalog
   */

  export type AggregateCatalog = {
    _count: CatalogCountAggregateOutputType | null
    _min: CatalogMinAggregateOutputType | null
    _max: CatalogMaxAggregateOutputType | null
  }

  export type CatalogMinAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
  }

  export type CatalogMaxAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
  }

  export type CatalogCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    _all: number
  }


  export type CatalogMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
  }

  export type CatalogMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
  }

  export type CatalogCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    _all?: true
  }

  export type CatalogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Catalog to aggregate.
     */
    where?: CatalogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Catalogs to fetch.
     */
    orderBy?: CatalogOrderByWithRelationInput | CatalogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CatalogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Catalogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Catalogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Catalogs
    **/
    _count?: true | CatalogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CatalogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CatalogMaxAggregateInputType
  }

  export type GetCatalogAggregateType<T extends CatalogAggregateArgs> = {
        [P in keyof T & keyof AggregateCatalog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCatalog[P]>
      : GetScalarType<T[P], AggregateCatalog[P]>
  }




  export type CatalogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CatalogWhereInput
    orderBy?: CatalogOrderByWithAggregationInput | CatalogOrderByWithAggregationInput[]
    by: CatalogScalarFieldEnum[] | CatalogScalarFieldEnum
    having?: CatalogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CatalogCountAggregateInputType | true
    _min?: CatalogMinAggregateInputType
    _max?: CatalogMaxAggregateInputType
  }

  export type CatalogGroupByOutputType = {
    id: string
    name: string
    slug: string
    _count: CatalogCountAggregateOutputType | null
    _min: CatalogMinAggregateOutputType | null
    _max: CatalogMaxAggregateOutputType | null
  }

  type GetCatalogGroupByPayload<T extends CatalogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CatalogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CatalogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CatalogGroupByOutputType[P]>
            : GetScalarType<T[P], CatalogGroupByOutputType[P]>
        }
      >
    >


  export type CatalogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    categories?: boolean | Catalog$categoriesArgs<ExtArgs>
    _count?: boolean | CatalogCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["catalog"]>



  export type CatalogSelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
  }

  export type CatalogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "slug", ExtArgs["result"]["catalog"]>
  export type CatalogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    categories?: boolean | Catalog$categoriesArgs<ExtArgs>
    _count?: boolean | CatalogCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $CatalogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Catalog"
    objects: {
      categories: Prisma.$CategoryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      slug: string
    }, ExtArgs["result"]["catalog"]>
    composites: {}
  }

  type CatalogGetPayload<S extends boolean | null | undefined | CatalogDefaultArgs> = $Result.GetResult<Prisma.$CatalogPayload, S>

  type CatalogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CatalogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CatalogCountAggregateInputType | true
    }

  export interface CatalogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Catalog'], meta: { name: 'Catalog' } }
    /**
     * Find zero or one Catalog that matches the filter.
     * @param {CatalogFindUniqueArgs} args - Arguments to find a Catalog
     * @example
     * // Get one Catalog
     * const catalog = await prisma.catalog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CatalogFindUniqueArgs>(args: SelectSubset<T, CatalogFindUniqueArgs<ExtArgs>>): Prisma__CatalogClient<$Result.GetResult<Prisma.$CatalogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Catalog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CatalogFindUniqueOrThrowArgs} args - Arguments to find a Catalog
     * @example
     * // Get one Catalog
     * const catalog = await prisma.catalog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CatalogFindUniqueOrThrowArgs>(args: SelectSubset<T, CatalogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CatalogClient<$Result.GetResult<Prisma.$CatalogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Catalog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CatalogFindFirstArgs} args - Arguments to find a Catalog
     * @example
     * // Get one Catalog
     * const catalog = await prisma.catalog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CatalogFindFirstArgs>(args?: SelectSubset<T, CatalogFindFirstArgs<ExtArgs>>): Prisma__CatalogClient<$Result.GetResult<Prisma.$CatalogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Catalog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CatalogFindFirstOrThrowArgs} args - Arguments to find a Catalog
     * @example
     * // Get one Catalog
     * const catalog = await prisma.catalog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CatalogFindFirstOrThrowArgs>(args?: SelectSubset<T, CatalogFindFirstOrThrowArgs<ExtArgs>>): Prisma__CatalogClient<$Result.GetResult<Prisma.$CatalogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Catalogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CatalogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Catalogs
     * const catalogs = await prisma.catalog.findMany()
     * 
     * // Get first 10 Catalogs
     * const catalogs = await prisma.catalog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const catalogWithIdOnly = await prisma.catalog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CatalogFindManyArgs>(args?: SelectSubset<T, CatalogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CatalogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Catalog.
     * @param {CatalogCreateArgs} args - Arguments to create a Catalog.
     * @example
     * // Create one Catalog
     * const Catalog = await prisma.catalog.create({
     *   data: {
     *     // ... data to create a Catalog
     *   }
     * })
     * 
     */
    create<T extends CatalogCreateArgs>(args: SelectSubset<T, CatalogCreateArgs<ExtArgs>>): Prisma__CatalogClient<$Result.GetResult<Prisma.$CatalogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Catalogs.
     * @param {CatalogCreateManyArgs} args - Arguments to create many Catalogs.
     * @example
     * // Create many Catalogs
     * const catalog = await prisma.catalog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CatalogCreateManyArgs>(args?: SelectSubset<T, CatalogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Catalog.
     * @param {CatalogDeleteArgs} args - Arguments to delete one Catalog.
     * @example
     * // Delete one Catalog
     * const Catalog = await prisma.catalog.delete({
     *   where: {
     *     // ... filter to delete one Catalog
     *   }
     * })
     * 
     */
    delete<T extends CatalogDeleteArgs>(args: SelectSubset<T, CatalogDeleteArgs<ExtArgs>>): Prisma__CatalogClient<$Result.GetResult<Prisma.$CatalogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Catalog.
     * @param {CatalogUpdateArgs} args - Arguments to update one Catalog.
     * @example
     * // Update one Catalog
     * const catalog = await prisma.catalog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CatalogUpdateArgs>(args: SelectSubset<T, CatalogUpdateArgs<ExtArgs>>): Prisma__CatalogClient<$Result.GetResult<Prisma.$CatalogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Catalogs.
     * @param {CatalogDeleteManyArgs} args - Arguments to filter Catalogs to delete.
     * @example
     * // Delete a few Catalogs
     * const { count } = await prisma.catalog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CatalogDeleteManyArgs>(args?: SelectSubset<T, CatalogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Catalogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CatalogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Catalogs
     * const catalog = await prisma.catalog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CatalogUpdateManyArgs>(args: SelectSubset<T, CatalogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Catalog.
     * @param {CatalogUpsertArgs} args - Arguments to update or create a Catalog.
     * @example
     * // Update or create a Catalog
     * const catalog = await prisma.catalog.upsert({
     *   create: {
     *     // ... data to create a Catalog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Catalog we want to update
     *   }
     * })
     */
    upsert<T extends CatalogUpsertArgs>(args: SelectSubset<T, CatalogUpsertArgs<ExtArgs>>): Prisma__CatalogClient<$Result.GetResult<Prisma.$CatalogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Catalogs that matches the filter.
     * @param {CatalogFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const catalog = await prisma.catalog.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: CatalogFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Catalog.
     * @param {CatalogAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const catalog = await prisma.catalog.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: CatalogAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Catalogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CatalogCountArgs} args - Arguments to filter Catalogs to count.
     * @example
     * // Count the number of Catalogs
     * const count = await prisma.catalog.count({
     *   where: {
     *     // ... the filter for the Catalogs we want to count
     *   }
     * })
    **/
    count<T extends CatalogCountArgs>(
      args?: Subset<T, CatalogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CatalogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Catalog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CatalogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CatalogAggregateArgs>(args: Subset<T, CatalogAggregateArgs>): Prisma.PrismaPromise<GetCatalogAggregateType<T>>

    /**
     * Group by Catalog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CatalogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CatalogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CatalogGroupByArgs['orderBy'] }
        : { orderBy?: CatalogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CatalogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCatalogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Catalog model
   */
  readonly fields: CatalogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Catalog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CatalogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    categories<T extends Catalog$categoriesArgs<ExtArgs> = {}>(args?: Subset<T, Catalog$categoriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Catalog model
   */
  interface CatalogFieldRefs {
    readonly id: FieldRef<"Catalog", 'String'>
    readonly name: FieldRef<"Catalog", 'String'>
    readonly slug: FieldRef<"Catalog", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Catalog findUnique
   */
  export type CatalogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Catalog
     */
    select?: CatalogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Catalog
     */
    omit?: CatalogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CatalogInclude<ExtArgs> | null
    /**
     * Filter, which Catalog to fetch.
     */
    where: CatalogWhereUniqueInput
  }

  /**
   * Catalog findUniqueOrThrow
   */
  export type CatalogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Catalog
     */
    select?: CatalogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Catalog
     */
    omit?: CatalogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CatalogInclude<ExtArgs> | null
    /**
     * Filter, which Catalog to fetch.
     */
    where: CatalogWhereUniqueInput
  }

  /**
   * Catalog findFirst
   */
  export type CatalogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Catalog
     */
    select?: CatalogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Catalog
     */
    omit?: CatalogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CatalogInclude<ExtArgs> | null
    /**
     * Filter, which Catalog to fetch.
     */
    where?: CatalogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Catalogs to fetch.
     */
    orderBy?: CatalogOrderByWithRelationInput | CatalogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Catalogs.
     */
    cursor?: CatalogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Catalogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Catalogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Catalogs.
     */
    distinct?: CatalogScalarFieldEnum | CatalogScalarFieldEnum[]
  }

  /**
   * Catalog findFirstOrThrow
   */
  export type CatalogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Catalog
     */
    select?: CatalogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Catalog
     */
    omit?: CatalogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CatalogInclude<ExtArgs> | null
    /**
     * Filter, which Catalog to fetch.
     */
    where?: CatalogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Catalogs to fetch.
     */
    orderBy?: CatalogOrderByWithRelationInput | CatalogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Catalogs.
     */
    cursor?: CatalogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Catalogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Catalogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Catalogs.
     */
    distinct?: CatalogScalarFieldEnum | CatalogScalarFieldEnum[]
  }

  /**
   * Catalog findMany
   */
  export type CatalogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Catalog
     */
    select?: CatalogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Catalog
     */
    omit?: CatalogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CatalogInclude<ExtArgs> | null
    /**
     * Filter, which Catalogs to fetch.
     */
    where?: CatalogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Catalogs to fetch.
     */
    orderBy?: CatalogOrderByWithRelationInput | CatalogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Catalogs.
     */
    cursor?: CatalogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Catalogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Catalogs.
     */
    skip?: number
    distinct?: CatalogScalarFieldEnum | CatalogScalarFieldEnum[]
  }

  /**
   * Catalog create
   */
  export type CatalogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Catalog
     */
    select?: CatalogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Catalog
     */
    omit?: CatalogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CatalogInclude<ExtArgs> | null
    /**
     * The data needed to create a Catalog.
     */
    data: XOR<CatalogCreateInput, CatalogUncheckedCreateInput>
  }

  /**
   * Catalog createMany
   */
  export type CatalogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Catalogs.
     */
    data: CatalogCreateManyInput | CatalogCreateManyInput[]
  }

  /**
   * Catalog update
   */
  export type CatalogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Catalog
     */
    select?: CatalogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Catalog
     */
    omit?: CatalogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CatalogInclude<ExtArgs> | null
    /**
     * The data needed to update a Catalog.
     */
    data: XOR<CatalogUpdateInput, CatalogUncheckedUpdateInput>
    /**
     * Choose, which Catalog to update.
     */
    where: CatalogWhereUniqueInput
  }

  /**
   * Catalog updateMany
   */
  export type CatalogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Catalogs.
     */
    data: XOR<CatalogUpdateManyMutationInput, CatalogUncheckedUpdateManyInput>
    /**
     * Filter which Catalogs to update
     */
    where?: CatalogWhereInput
    /**
     * Limit how many Catalogs to update.
     */
    limit?: number
  }

  /**
   * Catalog upsert
   */
  export type CatalogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Catalog
     */
    select?: CatalogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Catalog
     */
    omit?: CatalogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CatalogInclude<ExtArgs> | null
    /**
     * The filter to search for the Catalog to update in case it exists.
     */
    where: CatalogWhereUniqueInput
    /**
     * In case the Catalog found by the `where` argument doesn't exist, create a new Catalog with this data.
     */
    create: XOR<CatalogCreateInput, CatalogUncheckedCreateInput>
    /**
     * In case the Catalog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CatalogUpdateInput, CatalogUncheckedUpdateInput>
  }

  /**
   * Catalog delete
   */
  export type CatalogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Catalog
     */
    select?: CatalogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Catalog
     */
    omit?: CatalogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CatalogInclude<ExtArgs> | null
    /**
     * Filter which Catalog to delete.
     */
    where: CatalogWhereUniqueInput
  }

  /**
   * Catalog deleteMany
   */
  export type CatalogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Catalogs to delete
     */
    where?: CatalogWhereInput
    /**
     * Limit how many Catalogs to delete.
     */
    limit?: number
  }

  /**
   * Catalog findRaw
   */
  export type CatalogFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Catalog aggregateRaw
   */
  export type CatalogAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Catalog.categories
   */
  export type Catalog$categoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    where?: CategoryWhereInput
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    cursor?: CategoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Catalog without action
   */
  export type CatalogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Catalog
     */
    select?: CatalogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Catalog
     */
    omit?: CatalogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CatalogInclude<ExtArgs> | null
  }


  /**
   * Model Category
   */

  export type AggregateCategory = {
    _count: CategoryCountAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  export type CategoryMinAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    parentCategory: string | null
    catalogId: string | null
  }

  export type CategoryMaxAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    parentCategory: string | null
    catalogId: string | null
  }

  export type CategoryCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    parentCategory: number
    catalogId: number
    _all: number
  }


  export type CategoryMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    parentCategory?: true
    catalogId?: true
  }

  export type CategoryMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    parentCategory?: true
    catalogId?: true
  }

  export type CategoryCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    parentCategory?: true
    catalogId?: true
    _all?: true
  }

  export type CategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Category to aggregate.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Categories
    **/
    _count?: true | CategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoryMaxAggregateInputType
  }

  export type GetCategoryAggregateType<T extends CategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategory[P]>
      : GetScalarType<T[P], AggregateCategory[P]>
  }




  export type CategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryWhereInput
    orderBy?: CategoryOrderByWithAggregationInput | CategoryOrderByWithAggregationInput[]
    by: CategoryScalarFieldEnum[] | CategoryScalarFieldEnum
    having?: CategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoryCountAggregateInputType | true
    _min?: CategoryMinAggregateInputType
    _max?: CategoryMaxAggregateInputType
  }

  export type CategoryGroupByOutputType = {
    id: string
    name: string
    slug: string
    parentCategory: string | null
    catalogId: string
    _count: CategoryCountAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  type GetCategoryGroupByPayload<T extends CategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoryGroupByOutputType[P]>
            : GetScalarType<T[P], CategoryGroupByOutputType[P]>
        }
      >
    >


  export type CategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    parentCategory?: boolean
    catalogId?: boolean
    subcategories?: boolean | Category$subcategoriesArgs<ExtArgs>
    catalog?: boolean | CatalogDefaultArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>



  export type CategorySelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
    parentCategory?: boolean
    catalogId?: boolean
  }

  export type CategoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "slug" | "parentCategory" | "catalogId", ExtArgs["result"]["category"]>
  export type CategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subcategories?: boolean | Category$subcategoriesArgs<ExtArgs>
    catalog?: boolean | CatalogDefaultArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $CategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Category"
    objects: {
      subcategories: Prisma.$SubcategoryPayload<ExtArgs>[]
      catalog: Prisma.$CatalogPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      slug: string
      parentCategory: string | null
      catalogId: string
    }, ExtArgs["result"]["category"]>
    composites: {}
  }

  type CategoryGetPayload<S extends boolean | null | undefined | CategoryDefaultArgs> = $Result.GetResult<Prisma.$CategoryPayload, S>

  type CategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CategoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CategoryCountAggregateInputType | true
    }

  export interface CategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Category'], meta: { name: 'Category' } }
    /**
     * Find zero or one Category that matches the filter.
     * @param {CategoryFindUniqueArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CategoryFindUniqueArgs>(args: SelectSubset<T, CategoryFindUniqueArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Category that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CategoryFindUniqueOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, CategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Category that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CategoryFindFirstArgs>(args?: SelectSubset<T, CategoryFindFirstArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Category that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, CategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categories
     * const categories = await prisma.category.findMany()
     * 
     * // Get first 10 Categories
     * const categories = await prisma.category.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const categoryWithIdOnly = await prisma.category.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CategoryFindManyArgs>(args?: SelectSubset<T, CategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Category.
     * @param {CategoryCreateArgs} args - Arguments to create a Category.
     * @example
     * // Create one Category
     * const Category = await prisma.category.create({
     *   data: {
     *     // ... data to create a Category
     *   }
     * })
     * 
     */
    create<T extends CategoryCreateArgs>(args: SelectSubset<T, CategoryCreateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Categories.
     * @param {CategoryCreateManyArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CategoryCreateManyArgs>(args?: SelectSubset<T, CategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Category.
     * @param {CategoryDeleteArgs} args - Arguments to delete one Category.
     * @example
     * // Delete one Category
     * const Category = await prisma.category.delete({
     *   where: {
     *     // ... filter to delete one Category
     *   }
     * })
     * 
     */
    delete<T extends CategoryDeleteArgs>(args: SelectSubset<T, CategoryDeleteArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Category.
     * @param {CategoryUpdateArgs} args - Arguments to update one Category.
     * @example
     * // Update one Category
     * const category = await prisma.category.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CategoryUpdateArgs>(args: SelectSubset<T, CategoryUpdateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Categories.
     * @param {CategoryDeleteManyArgs} args - Arguments to filter Categories to delete.
     * @example
     * // Delete a few Categories
     * const { count } = await prisma.category.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CategoryDeleteManyArgs>(args?: SelectSubset<T, CategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CategoryUpdateManyArgs>(args: SelectSubset<T, CategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Category.
     * @param {CategoryUpsertArgs} args - Arguments to update or create a Category.
     * @example
     * // Update or create a Category
     * const category = await prisma.category.upsert({
     *   create: {
     *     // ... data to create a Category
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Category we want to update
     *   }
     * })
     */
    upsert<T extends CategoryUpsertArgs>(args: SelectSubset<T, CategoryUpsertArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Categories that matches the filter.
     * @param {CategoryFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const category = await prisma.category.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: CategoryFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Category.
     * @param {CategoryAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const category = await prisma.category.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: CategoryAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryCountArgs} args - Arguments to filter Categories to count.
     * @example
     * // Count the number of Categories
     * const count = await prisma.category.count({
     *   where: {
     *     // ... the filter for the Categories we want to count
     *   }
     * })
    **/
    count<T extends CategoryCountArgs>(
      args?: Subset<T, CategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CategoryAggregateArgs>(args: Subset<T, CategoryAggregateArgs>): Prisma.PrismaPromise<GetCategoryAggregateType<T>>

    /**
     * Group by Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CategoryGroupByArgs['orderBy'] }
        : { orderBy?: CategoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Category model
   */
  readonly fields: CategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Category.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    subcategories<T extends Category$subcategoriesArgs<ExtArgs> = {}>(args?: Subset<T, Category$subcategoriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubcategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    catalog<T extends CatalogDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CatalogDefaultArgs<ExtArgs>>): Prisma__CatalogClient<$Result.GetResult<Prisma.$CatalogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Category model
   */
  interface CategoryFieldRefs {
    readonly id: FieldRef<"Category", 'String'>
    readonly name: FieldRef<"Category", 'String'>
    readonly slug: FieldRef<"Category", 'String'>
    readonly parentCategory: FieldRef<"Category", 'String'>
    readonly catalogId: FieldRef<"Category", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Category findUnique
   */
  export type CategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findUniqueOrThrow
   */
  export type CategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findFirst
   */
  export type CategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findFirstOrThrow
   */
  export type CategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findMany
   */
  export type CategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Categories to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category create
   */
  export type CategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to create a Category.
     */
    data: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
  }

  /**
   * Category createMany
   */
  export type CategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
  }

  /**
   * Category update
   */
  export type CategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to update a Category.
     */
    data: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
    /**
     * Choose, which Category to update.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category updateMany
   */
  export type CategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to update.
     */
    limit?: number
  }

  /**
   * Category upsert
   */
  export type CategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The filter to search for the Category to update in case it exists.
     */
    where: CategoryWhereUniqueInput
    /**
     * In case the Category found by the `where` argument doesn't exist, create a new Category with this data.
     */
    create: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
    /**
     * In case the Category was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
  }

  /**
   * Category delete
   */
  export type CategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter which Category to delete.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category deleteMany
   */
  export type CategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Categories to delete
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to delete.
     */
    limit?: number
  }

  /**
   * Category findRaw
   */
  export type CategoryFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Category aggregateRaw
   */
  export type CategoryAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Category.subcategories
   */
  export type Category$subcategoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subcategory
     */
    select?: SubcategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subcategory
     */
    omit?: SubcategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubcategoryInclude<ExtArgs> | null
    where?: SubcategoryWhereInput
    orderBy?: SubcategoryOrderByWithRelationInput | SubcategoryOrderByWithRelationInput[]
    cursor?: SubcategoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubcategoryScalarFieldEnum | SubcategoryScalarFieldEnum[]
  }

  /**
   * Category without action
   */
  export type CategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
  }


  /**
   * Model Subcategory
   */

  export type AggregateSubcategory = {
    _count: SubcategoryCountAggregateOutputType | null
    _min: SubcategoryMinAggregateOutputType | null
    _max: SubcategoryMaxAggregateOutputType | null
  }

  export type SubcategoryMinAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    parentCategory: string | null
    categoryId: string | null
  }

  export type SubcategoryMaxAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    parentCategory: string | null
    categoryId: string | null
  }

  export type SubcategoryCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    parentCategory: number
    categoryId: number
    _all: number
  }


  export type SubcategoryMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    parentCategory?: true
    categoryId?: true
  }

  export type SubcategoryMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    parentCategory?: true
    categoryId?: true
  }

  export type SubcategoryCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    parentCategory?: true
    categoryId?: true
    _all?: true
  }

  export type SubcategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Subcategory to aggregate.
     */
    where?: SubcategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subcategories to fetch.
     */
    orderBy?: SubcategoryOrderByWithRelationInput | SubcategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SubcategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subcategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subcategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Subcategories
    **/
    _count?: true | SubcategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SubcategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SubcategoryMaxAggregateInputType
  }

  export type GetSubcategoryAggregateType<T extends SubcategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateSubcategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSubcategory[P]>
      : GetScalarType<T[P], AggregateSubcategory[P]>
  }




  export type SubcategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubcategoryWhereInput
    orderBy?: SubcategoryOrderByWithAggregationInput | SubcategoryOrderByWithAggregationInput[]
    by: SubcategoryScalarFieldEnum[] | SubcategoryScalarFieldEnum
    having?: SubcategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SubcategoryCountAggregateInputType | true
    _min?: SubcategoryMinAggregateInputType
    _max?: SubcategoryMaxAggregateInputType
  }

  export type SubcategoryGroupByOutputType = {
    id: string
    name: string
    slug: string
    parentCategory: string | null
    categoryId: string
    _count: SubcategoryCountAggregateOutputType | null
    _min: SubcategoryMinAggregateOutputType | null
    _max: SubcategoryMaxAggregateOutputType | null
  }

  type GetSubcategoryGroupByPayload<T extends SubcategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SubcategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SubcategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SubcategoryGroupByOutputType[P]>
            : GetScalarType<T[P], SubcategoryGroupByOutputType[P]>
        }
      >
    >


  export type SubcategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    parentCategory?: boolean
    categoryId?: boolean
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    products?: boolean | Subcategory$productsArgs<ExtArgs>
    _count?: boolean | SubcategoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subcategory"]>



  export type SubcategorySelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
    parentCategory?: boolean
    categoryId?: boolean
  }

  export type SubcategoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "slug" | "parentCategory" | "categoryId", ExtArgs["result"]["subcategory"]>
  export type SubcategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    products?: boolean | Subcategory$productsArgs<ExtArgs>
    _count?: boolean | SubcategoryCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $SubcategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Subcategory"
    objects: {
      category: Prisma.$CategoryPayload<ExtArgs>
      products: Prisma.$ProductPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      slug: string
      parentCategory: string | null
      categoryId: string
    }, ExtArgs["result"]["subcategory"]>
    composites: {}
  }

  type SubcategoryGetPayload<S extends boolean | null | undefined | SubcategoryDefaultArgs> = $Result.GetResult<Prisma.$SubcategoryPayload, S>

  type SubcategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SubcategoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SubcategoryCountAggregateInputType | true
    }

  export interface SubcategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Subcategory'], meta: { name: 'Subcategory' } }
    /**
     * Find zero or one Subcategory that matches the filter.
     * @param {SubcategoryFindUniqueArgs} args - Arguments to find a Subcategory
     * @example
     * // Get one Subcategory
     * const subcategory = await prisma.subcategory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SubcategoryFindUniqueArgs>(args: SelectSubset<T, SubcategoryFindUniqueArgs<ExtArgs>>): Prisma__SubcategoryClient<$Result.GetResult<Prisma.$SubcategoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Subcategory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SubcategoryFindUniqueOrThrowArgs} args - Arguments to find a Subcategory
     * @example
     * // Get one Subcategory
     * const subcategory = await prisma.subcategory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SubcategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, SubcategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SubcategoryClient<$Result.GetResult<Prisma.$SubcategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Subcategory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubcategoryFindFirstArgs} args - Arguments to find a Subcategory
     * @example
     * // Get one Subcategory
     * const subcategory = await prisma.subcategory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SubcategoryFindFirstArgs>(args?: SelectSubset<T, SubcategoryFindFirstArgs<ExtArgs>>): Prisma__SubcategoryClient<$Result.GetResult<Prisma.$SubcategoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Subcategory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubcategoryFindFirstOrThrowArgs} args - Arguments to find a Subcategory
     * @example
     * // Get one Subcategory
     * const subcategory = await prisma.subcategory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SubcategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, SubcategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__SubcategoryClient<$Result.GetResult<Prisma.$SubcategoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Subcategories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubcategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Subcategories
     * const subcategories = await prisma.subcategory.findMany()
     * 
     * // Get first 10 Subcategories
     * const subcategories = await prisma.subcategory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const subcategoryWithIdOnly = await prisma.subcategory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SubcategoryFindManyArgs>(args?: SelectSubset<T, SubcategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubcategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Subcategory.
     * @param {SubcategoryCreateArgs} args - Arguments to create a Subcategory.
     * @example
     * // Create one Subcategory
     * const Subcategory = await prisma.subcategory.create({
     *   data: {
     *     // ... data to create a Subcategory
     *   }
     * })
     * 
     */
    create<T extends SubcategoryCreateArgs>(args: SelectSubset<T, SubcategoryCreateArgs<ExtArgs>>): Prisma__SubcategoryClient<$Result.GetResult<Prisma.$SubcategoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Subcategories.
     * @param {SubcategoryCreateManyArgs} args - Arguments to create many Subcategories.
     * @example
     * // Create many Subcategories
     * const subcategory = await prisma.subcategory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SubcategoryCreateManyArgs>(args?: SelectSubset<T, SubcategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Subcategory.
     * @param {SubcategoryDeleteArgs} args - Arguments to delete one Subcategory.
     * @example
     * // Delete one Subcategory
     * const Subcategory = await prisma.subcategory.delete({
     *   where: {
     *     // ... filter to delete one Subcategory
     *   }
     * })
     * 
     */
    delete<T extends SubcategoryDeleteArgs>(args: SelectSubset<T, SubcategoryDeleteArgs<ExtArgs>>): Prisma__SubcategoryClient<$Result.GetResult<Prisma.$SubcategoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Subcategory.
     * @param {SubcategoryUpdateArgs} args - Arguments to update one Subcategory.
     * @example
     * // Update one Subcategory
     * const subcategory = await prisma.subcategory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SubcategoryUpdateArgs>(args: SelectSubset<T, SubcategoryUpdateArgs<ExtArgs>>): Prisma__SubcategoryClient<$Result.GetResult<Prisma.$SubcategoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Subcategories.
     * @param {SubcategoryDeleteManyArgs} args - Arguments to filter Subcategories to delete.
     * @example
     * // Delete a few Subcategories
     * const { count } = await prisma.subcategory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SubcategoryDeleteManyArgs>(args?: SelectSubset<T, SubcategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Subcategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubcategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Subcategories
     * const subcategory = await prisma.subcategory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SubcategoryUpdateManyArgs>(args: SelectSubset<T, SubcategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Subcategory.
     * @param {SubcategoryUpsertArgs} args - Arguments to update or create a Subcategory.
     * @example
     * // Update or create a Subcategory
     * const subcategory = await prisma.subcategory.upsert({
     *   create: {
     *     // ... data to create a Subcategory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Subcategory we want to update
     *   }
     * })
     */
    upsert<T extends SubcategoryUpsertArgs>(args: SelectSubset<T, SubcategoryUpsertArgs<ExtArgs>>): Prisma__SubcategoryClient<$Result.GetResult<Prisma.$SubcategoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Subcategories that matches the filter.
     * @param {SubcategoryFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const subcategory = await prisma.subcategory.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: SubcategoryFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Subcategory.
     * @param {SubcategoryAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const subcategory = await prisma.subcategory.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: SubcategoryAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Subcategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubcategoryCountArgs} args - Arguments to filter Subcategories to count.
     * @example
     * // Count the number of Subcategories
     * const count = await prisma.subcategory.count({
     *   where: {
     *     // ... the filter for the Subcategories we want to count
     *   }
     * })
    **/
    count<T extends SubcategoryCountArgs>(
      args?: Subset<T, SubcategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SubcategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Subcategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubcategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SubcategoryAggregateArgs>(args: Subset<T, SubcategoryAggregateArgs>): Prisma.PrismaPromise<GetSubcategoryAggregateType<T>>

    /**
     * Group by Subcategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubcategoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SubcategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SubcategoryGroupByArgs['orderBy'] }
        : { orderBy?: SubcategoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SubcategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubcategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Subcategory model
   */
  readonly fields: SubcategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Subcategory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SubcategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    category<T extends CategoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CategoryDefaultArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    products<T extends Subcategory$productsArgs<ExtArgs> = {}>(args?: Subset<T, Subcategory$productsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Subcategory model
   */
  interface SubcategoryFieldRefs {
    readonly id: FieldRef<"Subcategory", 'String'>
    readonly name: FieldRef<"Subcategory", 'String'>
    readonly slug: FieldRef<"Subcategory", 'String'>
    readonly parentCategory: FieldRef<"Subcategory", 'String'>
    readonly categoryId: FieldRef<"Subcategory", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Subcategory findUnique
   */
  export type SubcategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subcategory
     */
    select?: SubcategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subcategory
     */
    omit?: SubcategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubcategoryInclude<ExtArgs> | null
    /**
     * Filter, which Subcategory to fetch.
     */
    where: SubcategoryWhereUniqueInput
  }

  /**
   * Subcategory findUniqueOrThrow
   */
  export type SubcategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subcategory
     */
    select?: SubcategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subcategory
     */
    omit?: SubcategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubcategoryInclude<ExtArgs> | null
    /**
     * Filter, which Subcategory to fetch.
     */
    where: SubcategoryWhereUniqueInput
  }

  /**
   * Subcategory findFirst
   */
  export type SubcategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subcategory
     */
    select?: SubcategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subcategory
     */
    omit?: SubcategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubcategoryInclude<ExtArgs> | null
    /**
     * Filter, which Subcategory to fetch.
     */
    where?: SubcategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subcategories to fetch.
     */
    orderBy?: SubcategoryOrderByWithRelationInput | SubcategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Subcategories.
     */
    cursor?: SubcategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subcategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subcategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Subcategories.
     */
    distinct?: SubcategoryScalarFieldEnum | SubcategoryScalarFieldEnum[]
  }

  /**
   * Subcategory findFirstOrThrow
   */
  export type SubcategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subcategory
     */
    select?: SubcategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subcategory
     */
    omit?: SubcategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubcategoryInclude<ExtArgs> | null
    /**
     * Filter, which Subcategory to fetch.
     */
    where?: SubcategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subcategories to fetch.
     */
    orderBy?: SubcategoryOrderByWithRelationInput | SubcategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Subcategories.
     */
    cursor?: SubcategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subcategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subcategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Subcategories.
     */
    distinct?: SubcategoryScalarFieldEnum | SubcategoryScalarFieldEnum[]
  }

  /**
   * Subcategory findMany
   */
  export type SubcategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subcategory
     */
    select?: SubcategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subcategory
     */
    omit?: SubcategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubcategoryInclude<ExtArgs> | null
    /**
     * Filter, which Subcategories to fetch.
     */
    where?: SubcategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subcategories to fetch.
     */
    orderBy?: SubcategoryOrderByWithRelationInput | SubcategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Subcategories.
     */
    cursor?: SubcategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subcategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subcategories.
     */
    skip?: number
    distinct?: SubcategoryScalarFieldEnum | SubcategoryScalarFieldEnum[]
  }

  /**
   * Subcategory create
   */
  export type SubcategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subcategory
     */
    select?: SubcategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subcategory
     */
    omit?: SubcategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubcategoryInclude<ExtArgs> | null
    /**
     * The data needed to create a Subcategory.
     */
    data: XOR<SubcategoryCreateInput, SubcategoryUncheckedCreateInput>
  }

  /**
   * Subcategory createMany
   */
  export type SubcategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Subcategories.
     */
    data: SubcategoryCreateManyInput | SubcategoryCreateManyInput[]
  }

  /**
   * Subcategory update
   */
  export type SubcategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subcategory
     */
    select?: SubcategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subcategory
     */
    omit?: SubcategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubcategoryInclude<ExtArgs> | null
    /**
     * The data needed to update a Subcategory.
     */
    data: XOR<SubcategoryUpdateInput, SubcategoryUncheckedUpdateInput>
    /**
     * Choose, which Subcategory to update.
     */
    where: SubcategoryWhereUniqueInput
  }

  /**
   * Subcategory updateMany
   */
  export type SubcategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Subcategories.
     */
    data: XOR<SubcategoryUpdateManyMutationInput, SubcategoryUncheckedUpdateManyInput>
    /**
     * Filter which Subcategories to update
     */
    where?: SubcategoryWhereInput
    /**
     * Limit how many Subcategories to update.
     */
    limit?: number
  }

  /**
   * Subcategory upsert
   */
  export type SubcategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subcategory
     */
    select?: SubcategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subcategory
     */
    omit?: SubcategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubcategoryInclude<ExtArgs> | null
    /**
     * The filter to search for the Subcategory to update in case it exists.
     */
    where: SubcategoryWhereUniqueInput
    /**
     * In case the Subcategory found by the `where` argument doesn't exist, create a new Subcategory with this data.
     */
    create: XOR<SubcategoryCreateInput, SubcategoryUncheckedCreateInput>
    /**
     * In case the Subcategory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SubcategoryUpdateInput, SubcategoryUncheckedUpdateInput>
  }

  /**
   * Subcategory delete
   */
  export type SubcategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subcategory
     */
    select?: SubcategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subcategory
     */
    omit?: SubcategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubcategoryInclude<ExtArgs> | null
    /**
     * Filter which Subcategory to delete.
     */
    where: SubcategoryWhereUniqueInput
  }

  /**
   * Subcategory deleteMany
   */
  export type SubcategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Subcategories to delete
     */
    where?: SubcategoryWhereInput
    /**
     * Limit how many Subcategories to delete.
     */
    limit?: number
  }

  /**
   * Subcategory findRaw
   */
  export type SubcategoryFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Subcategory aggregateRaw
   */
  export type SubcategoryAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Subcategory.products
   */
  export type Subcategory$productsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    cursor?: ProductWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Subcategory without action
   */
  export type SubcategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subcategory
     */
    select?: SubcategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subcategory
     */
    omit?: SubcategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubcategoryInclude<ExtArgs> | null
  }


  /**
   * Model Product
   */

  export type AggregateProduct = {
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  export type ProductAvgAggregateOutputType = {
    price: number | null
    quantity: number | null
  }

  export type ProductSumAggregateOutputType = {
    price: number | null
    quantity: number | null
  }

  export type ProductMinAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    description: string | null
    price: number | null
    quantity: number | null
    subcategoryId: string | null
  }

  export type ProductMaxAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    description: string | null
    price: number | null
    quantity: number | null
    subcategoryId: string | null
  }

  export type ProductCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    description: number
    price: number
    quantity: number
    images: number
    sizes: number
    colors: number
    tags: number
    subcategoryId: number
    _all: number
  }


  export type ProductAvgAggregateInputType = {
    price?: true
    quantity?: true
  }

  export type ProductSumAggregateInputType = {
    price?: true
    quantity?: true
  }

  export type ProductMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    description?: true
    price?: true
    quantity?: true
    subcategoryId?: true
  }

  export type ProductMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    description?: true
    price?: true
    quantity?: true
    subcategoryId?: true
  }

  export type ProductCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    description?: true
    price?: true
    quantity?: true
    images?: true
    sizes?: true
    colors?: true
    tags?: true
    subcategoryId?: true
    _all?: true
  }

  export type ProductAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Product to aggregate.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Products
    **/
    _count?: true | ProductCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductMaxAggregateInputType
  }

  export type GetProductAggregateType<T extends ProductAggregateArgs> = {
        [P in keyof T & keyof AggregateProduct]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProduct[P]>
      : GetScalarType<T[P], AggregateProduct[P]>
  }




  export type ProductGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithAggregationInput | ProductOrderByWithAggregationInput[]
    by: ProductScalarFieldEnum[] | ProductScalarFieldEnum
    having?: ProductScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductCountAggregateInputType | true
    _avg?: ProductAvgAggregateInputType
    _sum?: ProductSumAggregateInputType
    _min?: ProductMinAggregateInputType
    _max?: ProductMaxAggregateInputType
  }

  export type ProductGroupByOutputType = {
    id: string
    name: string
    slug: string
    description: string
    price: number
    quantity: number
    images: string[]
    sizes: string[]
    colors: string[]
    tags: $Enums.Tag[]
    subcategoryId: string
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  type GetProductGroupByPayload<T extends ProductGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductGroupByOutputType[P]>
            : GetScalarType<T[P], ProductGroupByOutputType[P]>
        }
      >
    >


  export type ProductSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    price?: boolean
    quantity?: boolean
    images?: boolean
    sizes?: boolean
    colors?: boolean
    tags?: boolean
    subcategoryId?: boolean
    reviews?: boolean | Product$reviewsArgs<ExtArgs>
    subcategory?: boolean | SubcategoryDefaultArgs<ExtArgs>
    orderItems?: boolean | Product$orderItemsArgs<ExtArgs>
    wishLists?: boolean | Product$wishListsArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>



  export type ProductSelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    price?: boolean
    quantity?: boolean
    images?: boolean
    sizes?: boolean
    colors?: boolean
    tags?: boolean
    subcategoryId?: boolean
  }

  export type ProductOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "slug" | "description" | "price" | "quantity" | "images" | "sizes" | "colors" | "tags" | "subcategoryId", ExtArgs["result"]["product"]>
  export type ProductInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reviews?: boolean | Product$reviewsArgs<ExtArgs>
    subcategory?: boolean | SubcategoryDefaultArgs<ExtArgs>
    orderItems?: boolean | Product$orderItemsArgs<ExtArgs>
    wishLists?: boolean | Product$wishListsArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $ProductPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Product"
    objects: {
      reviews: Prisma.$ReviewPayload<ExtArgs>[]
      subcategory: Prisma.$SubcategoryPayload<ExtArgs>
      orderItems: Prisma.$OrderItemPayload<ExtArgs>[]
      wishLists: Prisma.$WishListPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      slug: string
      description: string
      price: number
      quantity: number
      images: string[]
      sizes: string[]
      colors: string[]
      tags: $Enums.Tag[]
      subcategoryId: string
    }, ExtArgs["result"]["product"]>
    composites: {}
  }

  type ProductGetPayload<S extends boolean | null | undefined | ProductDefaultArgs> = $Result.GetResult<Prisma.$ProductPayload, S>

  type ProductCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductCountAggregateInputType | true
    }

  export interface ProductDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Product'], meta: { name: 'Product' } }
    /**
     * Find zero or one Product that matches the filter.
     * @param {ProductFindUniqueArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductFindUniqueArgs>(args: SelectSubset<T, ProductFindUniqueArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Product that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductFindUniqueOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductFindFirstArgs>(args?: SelectSubset<T, ProductFindFirstArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Products that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Products
     * const products = await prisma.product.findMany()
     * 
     * // Get first 10 Products
     * const products = await prisma.product.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productWithIdOnly = await prisma.product.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductFindManyArgs>(args?: SelectSubset<T, ProductFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Product.
     * @param {ProductCreateArgs} args - Arguments to create a Product.
     * @example
     * // Create one Product
     * const Product = await prisma.product.create({
     *   data: {
     *     // ... data to create a Product
     *   }
     * })
     * 
     */
    create<T extends ProductCreateArgs>(args: SelectSubset<T, ProductCreateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Products.
     * @param {ProductCreateManyArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductCreateManyArgs>(args?: SelectSubset<T, ProductCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Product.
     * @param {ProductDeleteArgs} args - Arguments to delete one Product.
     * @example
     * // Delete one Product
     * const Product = await prisma.product.delete({
     *   where: {
     *     // ... filter to delete one Product
     *   }
     * })
     * 
     */
    delete<T extends ProductDeleteArgs>(args: SelectSubset<T, ProductDeleteArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Product.
     * @param {ProductUpdateArgs} args - Arguments to update one Product.
     * @example
     * // Update one Product
     * const product = await prisma.product.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductUpdateArgs>(args: SelectSubset<T, ProductUpdateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Products.
     * @param {ProductDeleteManyArgs} args - Arguments to filter Products to delete.
     * @example
     * // Delete a few Products
     * const { count } = await prisma.product.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductDeleteManyArgs>(args?: SelectSubset<T, ProductDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductUpdateManyArgs>(args: SelectSubset<T, ProductUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Product.
     * @param {ProductUpsertArgs} args - Arguments to update or create a Product.
     * @example
     * // Update or create a Product
     * const product = await prisma.product.upsert({
     *   create: {
     *     // ... data to create a Product
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Product we want to update
     *   }
     * })
     */
    upsert<T extends ProductUpsertArgs>(args: SelectSubset<T, ProductUpsertArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Products that matches the filter.
     * @param {ProductFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const product = await prisma.product.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: ProductFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Product.
     * @param {ProductAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const product = await prisma.product.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: ProductAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCountArgs} args - Arguments to filter Products to count.
     * @example
     * // Count the number of Products
     * const count = await prisma.product.count({
     *   where: {
     *     // ... the filter for the Products we want to count
     *   }
     * })
    **/
    count<T extends ProductCountArgs>(
      args?: Subset<T, ProductCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductAggregateArgs>(args: Subset<T, ProductAggregateArgs>): Prisma.PrismaPromise<GetProductAggregateType<T>>

    /**
     * Group by Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductGroupByArgs['orderBy'] }
        : { orderBy?: ProductGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Product model
   */
  readonly fields: ProductFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Product.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    reviews<T extends Product$reviewsArgs<ExtArgs> = {}>(args?: Subset<T, Product$reviewsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    subcategory<T extends SubcategoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SubcategoryDefaultArgs<ExtArgs>>): Prisma__SubcategoryClient<$Result.GetResult<Prisma.$SubcategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    orderItems<T extends Product$orderItemsArgs<ExtArgs> = {}>(args?: Subset<T, Product$orderItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    wishLists<T extends Product$wishListsArgs<ExtArgs> = {}>(args?: Subset<T, Product$wishListsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WishListPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Product model
   */
  interface ProductFieldRefs {
    readonly id: FieldRef<"Product", 'String'>
    readonly name: FieldRef<"Product", 'String'>
    readonly slug: FieldRef<"Product", 'String'>
    readonly description: FieldRef<"Product", 'String'>
    readonly price: FieldRef<"Product", 'Float'>
    readonly quantity: FieldRef<"Product", 'Int'>
    readonly images: FieldRef<"Product", 'String[]'>
    readonly sizes: FieldRef<"Product", 'String[]'>
    readonly colors: FieldRef<"Product", 'String[]'>
    readonly tags: FieldRef<"Product", 'Tag[]'>
    readonly subcategoryId: FieldRef<"Product", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Product findUnique
   */
  export type ProductFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findUniqueOrThrow
   */
  export type ProductFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findFirst
   */
  export type ProductFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findFirstOrThrow
   */
  export type ProductFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findMany
   */
  export type ProductFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Products to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product create
   */
  export type ProductCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to create a Product.
     */
    data: XOR<ProductCreateInput, ProductUncheckedCreateInput>
  }

  /**
   * Product createMany
   */
  export type ProductCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
  }

  /**
   * Product update
   */
  export type ProductUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to update a Product.
     */
    data: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
    /**
     * Choose, which Product to update.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product updateMany
   */
  export type ProductUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to update.
     */
    limit?: number
  }

  /**
   * Product upsert
   */
  export type ProductUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The filter to search for the Product to update in case it exists.
     */
    where: ProductWhereUniqueInput
    /**
     * In case the Product found by the `where` argument doesn't exist, create a new Product with this data.
     */
    create: XOR<ProductCreateInput, ProductUncheckedCreateInput>
    /**
     * In case the Product was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
  }

  /**
   * Product delete
   */
  export type ProductDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter which Product to delete.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product deleteMany
   */
  export type ProductDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Products to delete
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to delete.
     */
    limit?: number
  }

  /**
   * Product findRaw
   */
  export type ProductFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Product aggregateRaw
   */
  export type ProductAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Product.reviews
   */
  export type Product$reviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    where?: ReviewWhereInput
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    cursor?: ReviewWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Product.orderItems
   */
  export type Product$orderItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    where?: OrderItemWhereInput
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    cursor?: OrderItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * Product.wishLists
   */
  export type Product$wishListsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WishList
     */
    select?: WishListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WishList
     */
    omit?: WishListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WishListInclude<ExtArgs> | null
    where?: WishListWhereInput
    orderBy?: WishListOrderByWithRelationInput | WishListOrderByWithRelationInput[]
    cursor?: WishListWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WishListScalarFieldEnum | WishListScalarFieldEnum[]
  }

  /**
   * Product without action
   */
  export type ProductDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
  }


  /**
   * Model Review
   */

  export type AggregateReview = {
    _count: ReviewCountAggregateOutputType | null
    _avg: ReviewAvgAggregateOutputType | null
    _sum: ReviewSumAggregateOutputType | null
    _min: ReviewMinAggregateOutputType | null
    _max: ReviewMaxAggregateOutputType | null
  }

  export type ReviewAvgAggregateOutputType = {
    rating: number | null
  }

  export type ReviewSumAggregateOutputType = {
    rating: number | null
  }

  export type ReviewMinAggregateOutputType = {
    id: string | null
    reviewerId: string | null
    rating: number | null
    title: string | null
    details: string | null
    date: Date | null
    productId: string | null
    verified: boolean | null
  }

  export type ReviewMaxAggregateOutputType = {
    id: string | null
    reviewerId: string | null
    rating: number | null
    title: string | null
    details: string | null
    date: Date | null
    productId: string | null
    verified: boolean | null
  }

  export type ReviewCountAggregateOutputType = {
    id: number
    reviewerId: number
    rating: number
    title: number
    details: number
    date: number
    productId: number
    verified: number
    _all: number
  }


  export type ReviewAvgAggregateInputType = {
    rating?: true
  }

  export type ReviewSumAggregateInputType = {
    rating?: true
  }

  export type ReviewMinAggregateInputType = {
    id?: true
    reviewerId?: true
    rating?: true
    title?: true
    details?: true
    date?: true
    productId?: true
    verified?: true
  }

  export type ReviewMaxAggregateInputType = {
    id?: true
    reviewerId?: true
    rating?: true
    title?: true
    details?: true
    date?: true
    productId?: true
    verified?: true
  }

  export type ReviewCountAggregateInputType = {
    id?: true
    reviewerId?: true
    rating?: true
    title?: true
    details?: true
    date?: true
    productId?: true
    verified?: true
    _all?: true
  }

  export type ReviewAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Review to aggregate.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Reviews
    **/
    _count?: true | ReviewCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReviewAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReviewSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReviewMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReviewMaxAggregateInputType
  }

  export type GetReviewAggregateType<T extends ReviewAggregateArgs> = {
        [P in keyof T & keyof AggregateReview]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReview[P]>
      : GetScalarType<T[P], AggregateReview[P]>
  }




  export type ReviewGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewWhereInput
    orderBy?: ReviewOrderByWithAggregationInput | ReviewOrderByWithAggregationInput[]
    by: ReviewScalarFieldEnum[] | ReviewScalarFieldEnum
    having?: ReviewScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReviewCountAggregateInputType | true
    _avg?: ReviewAvgAggregateInputType
    _sum?: ReviewSumAggregateInputType
    _min?: ReviewMinAggregateInputType
    _max?: ReviewMaxAggregateInputType
  }

  export type ReviewGroupByOutputType = {
    id: string
    reviewerId: string
    rating: number
    title: string
    details: string
    date: Date
    productId: string
    verified: boolean
    _count: ReviewCountAggregateOutputType | null
    _avg: ReviewAvgAggregateOutputType | null
    _sum: ReviewSumAggregateOutputType | null
    _min: ReviewMinAggregateOutputType | null
    _max: ReviewMaxAggregateOutputType | null
  }

  type GetReviewGroupByPayload<T extends ReviewGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReviewGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReviewGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReviewGroupByOutputType[P]>
            : GetScalarType<T[P], ReviewGroupByOutputType[P]>
        }
      >
    >


  export type ReviewSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    reviewerId?: boolean
    rating?: boolean
    title?: boolean
    details?: boolean
    date?: boolean
    productId?: boolean
    verified?: boolean
    reviewer?: boolean | UserDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["review"]>



  export type ReviewSelectScalar = {
    id?: boolean
    reviewerId?: boolean
    rating?: boolean
    title?: boolean
    details?: boolean
    date?: boolean
    productId?: boolean
    verified?: boolean
  }

  export type ReviewOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "reviewerId" | "rating" | "title" | "details" | "date" | "productId" | "verified", ExtArgs["result"]["review"]>
  export type ReviewInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reviewer?: boolean | UserDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }

  export type $ReviewPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Review"
    objects: {
      reviewer: Prisma.$UserPayload<ExtArgs>
      product: Prisma.$ProductPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      reviewerId: string
      rating: number
      title: string
      details: string
      date: Date
      productId: string
      verified: boolean
    }, ExtArgs["result"]["review"]>
    composites: {}
  }

  type ReviewGetPayload<S extends boolean | null | undefined | ReviewDefaultArgs> = $Result.GetResult<Prisma.$ReviewPayload, S>

  type ReviewCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ReviewFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReviewCountAggregateInputType | true
    }

  export interface ReviewDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Review'], meta: { name: 'Review' } }
    /**
     * Find zero or one Review that matches the filter.
     * @param {ReviewFindUniqueArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReviewFindUniqueArgs>(args: SelectSubset<T, ReviewFindUniqueArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Review that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ReviewFindUniqueOrThrowArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReviewFindUniqueOrThrowArgs>(args: SelectSubset<T, ReviewFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Review that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindFirstArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReviewFindFirstArgs>(args?: SelectSubset<T, ReviewFindFirstArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Review that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindFirstOrThrowArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReviewFindFirstOrThrowArgs>(args?: SelectSubset<T, ReviewFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Reviews that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Reviews
     * const reviews = await prisma.review.findMany()
     * 
     * // Get first 10 Reviews
     * const reviews = await prisma.review.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reviewWithIdOnly = await prisma.review.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReviewFindManyArgs>(args?: SelectSubset<T, ReviewFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Review.
     * @param {ReviewCreateArgs} args - Arguments to create a Review.
     * @example
     * // Create one Review
     * const Review = await prisma.review.create({
     *   data: {
     *     // ... data to create a Review
     *   }
     * })
     * 
     */
    create<T extends ReviewCreateArgs>(args: SelectSubset<T, ReviewCreateArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Reviews.
     * @param {ReviewCreateManyArgs} args - Arguments to create many Reviews.
     * @example
     * // Create many Reviews
     * const review = await prisma.review.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReviewCreateManyArgs>(args?: SelectSubset<T, ReviewCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Review.
     * @param {ReviewDeleteArgs} args - Arguments to delete one Review.
     * @example
     * // Delete one Review
     * const Review = await prisma.review.delete({
     *   where: {
     *     // ... filter to delete one Review
     *   }
     * })
     * 
     */
    delete<T extends ReviewDeleteArgs>(args: SelectSubset<T, ReviewDeleteArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Review.
     * @param {ReviewUpdateArgs} args - Arguments to update one Review.
     * @example
     * // Update one Review
     * const review = await prisma.review.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReviewUpdateArgs>(args: SelectSubset<T, ReviewUpdateArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Reviews.
     * @param {ReviewDeleteManyArgs} args - Arguments to filter Reviews to delete.
     * @example
     * // Delete a few Reviews
     * const { count } = await prisma.review.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReviewDeleteManyArgs>(args?: SelectSubset<T, ReviewDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Reviews
     * const review = await prisma.review.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReviewUpdateManyArgs>(args: SelectSubset<T, ReviewUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Review.
     * @param {ReviewUpsertArgs} args - Arguments to update or create a Review.
     * @example
     * // Update or create a Review
     * const review = await prisma.review.upsert({
     *   create: {
     *     // ... data to create a Review
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Review we want to update
     *   }
     * })
     */
    upsert<T extends ReviewUpsertArgs>(args: SelectSubset<T, ReviewUpsertArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Reviews that matches the filter.
     * @param {ReviewFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const review = await prisma.review.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: ReviewFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Review.
     * @param {ReviewAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const review = await prisma.review.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: ReviewAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Reviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewCountArgs} args - Arguments to filter Reviews to count.
     * @example
     * // Count the number of Reviews
     * const count = await prisma.review.count({
     *   where: {
     *     // ... the filter for the Reviews we want to count
     *   }
     * })
    **/
    count<T extends ReviewCountArgs>(
      args?: Subset<T, ReviewCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReviewCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Review.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReviewAggregateArgs>(args: Subset<T, ReviewAggregateArgs>): Prisma.PrismaPromise<GetReviewAggregateType<T>>

    /**
     * Group by Review.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReviewGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReviewGroupByArgs['orderBy'] }
        : { orderBy?: ReviewGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReviewGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReviewGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Review model
   */
  readonly fields: ReviewFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Review.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReviewClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    reviewer<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Review model
   */
  interface ReviewFieldRefs {
    readonly id: FieldRef<"Review", 'String'>
    readonly reviewerId: FieldRef<"Review", 'String'>
    readonly rating: FieldRef<"Review", 'Int'>
    readonly title: FieldRef<"Review", 'String'>
    readonly details: FieldRef<"Review", 'String'>
    readonly date: FieldRef<"Review", 'DateTime'>
    readonly productId: FieldRef<"Review", 'String'>
    readonly verified: FieldRef<"Review", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Review findUnique
   */
  export type ReviewFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review findUniqueOrThrow
   */
  export type ReviewFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review findFirst
   */
  export type ReviewFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reviews.
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reviews.
     */
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Review findFirstOrThrow
   */
  export type ReviewFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reviews.
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reviews.
     */
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Review findMany
   */
  export type ReviewFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Reviews to fetch.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Reviews.
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Review create
   */
  export type ReviewCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * The data needed to create a Review.
     */
    data: XOR<ReviewCreateInput, ReviewUncheckedCreateInput>
  }

  /**
   * Review createMany
   */
  export type ReviewCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Reviews.
     */
    data: ReviewCreateManyInput | ReviewCreateManyInput[]
  }

  /**
   * Review update
   */
  export type ReviewUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * The data needed to update a Review.
     */
    data: XOR<ReviewUpdateInput, ReviewUncheckedUpdateInput>
    /**
     * Choose, which Review to update.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review updateMany
   */
  export type ReviewUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Reviews.
     */
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyInput>
    /**
     * Filter which Reviews to update
     */
    where?: ReviewWhereInput
    /**
     * Limit how many Reviews to update.
     */
    limit?: number
  }

  /**
   * Review upsert
   */
  export type ReviewUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * The filter to search for the Review to update in case it exists.
     */
    where: ReviewWhereUniqueInput
    /**
     * In case the Review found by the `where` argument doesn't exist, create a new Review with this data.
     */
    create: XOR<ReviewCreateInput, ReviewUncheckedCreateInput>
    /**
     * In case the Review was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReviewUpdateInput, ReviewUncheckedUpdateInput>
  }

  /**
   * Review delete
   */
  export type ReviewDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter which Review to delete.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review deleteMany
   */
  export type ReviewDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Reviews to delete
     */
    where?: ReviewWhereInput
    /**
     * Limit how many Reviews to delete.
     */
    limit?: number
  }

  /**
   * Review findRaw
   */
  export type ReviewFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Review aggregateRaw
   */
  export type ReviewAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Review without action
   */
  export type ReviewDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
  }


  /**
   * Model Order
   */

  export type AggregateOrder = {
    _count: OrderCountAggregateOutputType | null
    _min: OrderMinAggregateOutputType | null
    _max: OrderMaxAggregateOutputType | null
  }

  export type OrderMinAggregateOutputType = {
    id: string | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrderMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrderCountAggregateOutputType = {
    id: number
    userId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type OrderMinAggregateInputType = {
    id?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrderMaxAggregateInputType = {
    id?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrderCountAggregateInputType = {
    id?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type OrderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Order to aggregate.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Orders
    **/
    _count?: true | OrderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrderMaxAggregateInputType
  }

  export type GetOrderAggregateType<T extends OrderAggregateArgs> = {
        [P in keyof T & keyof AggregateOrder]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrder[P]>
      : GetScalarType<T[P], AggregateOrder[P]>
  }




  export type OrderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithAggregationInput | OrderOrderByWithAggregationInput[]
    by: OrderScalarFieldEnum[] | OrderScalarFieldEnum
    having?: OrderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrderCountAggregateInputType | true
    _min?: OrderMinAggregateInputType
    _max?: OrderMaxAggregateInputType
  }

  export type OrderGroupByOutputType = {
    id: string
    userId: string
    createdAt: Date
    updatedAt: Date
    _count: OrderCountAggregateOutputType | null
    _min: OrderMinAggregateOutputType | null
    _max: OrderMaxAggregateOutputType | null
  }

  type GetOrderGroupByPayload<T extends OrderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderGroupByOutputType[P]>
            : GetScalarType<T[P], OrderGroupByOutputType[P]>
        }
      >
    >


  export type OrderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    items?: boolean | Order$itemsArgs<ExtArgs>
    _count?: boolean | OrderCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["order"]>



  export type OrderSelectScalar = {
    id?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type OrderOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "createdAt" | "updatedAt", ExtArgs["result"]["order"]>
  export type OrderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    items?: boolean | Order$itemsArgs<ExtArgs>
    _count?: boolean | OrderCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $OrderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Order"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      items: Prisma.$OrderItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["order"]>
    composites: {}
  }

  type OrderGetPayload<S extends boolean | null | undefined | OrderDefaultArgs> = $Result.GetResult<Prisma.$OrderPayload, S>

  type OrderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrderCountAggregateInputType | true
    }

  export interface OrderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Order'], meta: { name: 'Order' } }
    /**
     * Find zero or one Order that matches the filter.
     * @param {OrderFindUniqueArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderFindUniqueArgs>(args: SelectSubset<T, OrderFindUniqueArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Order that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrderFindUniqueOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderFindUniqueOrThrowArgs>(args: SelectSubset<T, OrderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Order that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderFindFirstArgs>(args?: SelectSubset<T, OrderFindFirstArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Order that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderFindFirstOrThrowArgs>(args?: SelectSubset<T, OrderFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Orders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Orders
     * const orders = await prisma.order.findMany()
     * 
     * // Get first 10 Orders
     * const orders = await prisma.order.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const orderWithIdOnly = await prisma.order.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrderFindManyArgs>(args?: SelectSubset<T, OrderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Order.
     * @param {OrderCreateArgs} args - Arguments to create a Order.
     * @example
     * // Create one Order
     * const Order = await prisma.order.create({
     *   data: {
     *     // ... data to create a Order
     *   }
     * })
     * 
     */
    create<T extends OrderCreateArgs>(args: SelectSubset<T, OrderCreateArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Orders.
     * @param {OrderCreateManyArgs} args - Arguments to create many Orders.
     * @example
     * // Create many Orders
     * const order = await prisma.order.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrderCreateManyArgs>(args?: SelectSubset<T, OrderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Order.
     * @param {OrderDeleteArgs} args - Arguments to delete one Order.
     * @example
     * // Delete one Order
     * const Order = await prisma.order.delete({
     *   where: {
     *     // ... filter to delete one Order
     *   }
     * })
     * 
     */
    delete<T extends OrderDeleteArgs>(args: SelectSubset<T, OrderDeleteArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Order.
     * @param {OrderUpdateArgs} args - Arguments to update one Order.
     * @example
     * // Update one Order
     * const order = await prisma.order.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrderUpdateArgs>(args: SelectSubset<T, OrderUpdateArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Orders.
     * @param {OrderDeleteManyArgs} args - Arguments to filter Orders to delete.
     * @example
     * // Delete a few Orders
     * const { count } = await prisma.order.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrderDeleteManyArgs>(args?: SelectSubset<T, OrderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Orders
     * const order = await prisma.order.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrderUpdateManyArgs>(args: SelectSubset<T, OrderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Order.
     * @param {OrderUpsertArgs} args - Arguments to update or create a Order.
     * @example
     * // Update or create a Order
     * const order = await prisma.order.upsert({
     *   create: {
     *     // ... data to create a Order
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Order we want to update
     *   }
     * })
     */
    upsert<T extends OrderUpsertArgs>(args: SelectSubset<T, OrderUpsertArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Orders that matches the filter.
     * @param {OrderFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const order = await prisma.order.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: OrderFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Order.
     * @param {OrderAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const order = await prisma.order.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: OrderAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderCountArgs} args - Arguments to filter Orders to count.
     * @example
     * // Count the number of Orders
     * const count = await prisma.order.count({
     *   where: {
     *     // ... the filter for the Orders we want to count
     *   }
     * })
    **/
    count<T extends OrderCountArgs>(
      args?: Subset<T, OrderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrderAggregateArgs>(args: Subset<T, OrderAggregateArgs>): Prisma.PrismaPromise<GetOrderAggregateType<T>>

    /**
     * Group by Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderGroupByArgs['orderBy'] }
        : { orderBy?: OrderGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Order model
   */
  readonly fields: OrderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Order.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    items<T extends Order$itemsArgs<ExtArgs> = {}>(args?: Subset<T, Order$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Order model
   */
  interface OrderFieldRefs {
    readonly id: FieldRef<"Order", 'String'>
    readonly userId: FieldRef<"Order", 'String'>
    readonly createdAt: FieldRef<"Order", 'DateTime'>
    readonly updatedAt: FieldRef<"Order", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Order findUnique
   */
  export type OrderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order findUniqueOrThrow
   */
  export type OrderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order findFirst
   */
  export type OrderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order findFirstOrThrow
   */
  export type OrderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order findMany
   */
  export type OrderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Orders to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order create
   */
  export type OrderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The data needed to create a Order.
     */
    data: XOR<OrderCreateInput, OrderUncheckedCreateInput>
  }

  /**
   * Order createMany
   */
  export type OrderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Orders.
     */
    data: OrderCreateManyInput | OrderCreateManyInput[]
  }

  /**
   * Order update
   */
  export type OrderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The data needed to update a Order.
     */
    data: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>
    /**
     * Choose, which Order to update.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order updateMany
   */
  export type OrderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Orders.
     */
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyInput>
    /**
     * Filter which Orders to update
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to update.
     */
    limit?: number
  }

  /**
   * Order upsert
   */
  export type OrderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The filter to search for the Order to update in case it exists.
     */
    where: OrderWhereUniqueInput
    /**
     * In case the Order found by the `where` argument doesn't exist, create a new Order with this data.
     */
    create: XOR<OrderCreateInput, OrderUncheckedCreateInput>
    /**
     * In case the Order was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>
  }

  /**
   * Order delete
   */
  export type OrderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter which Order to delete.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order deleteMany
   */
  export type OrderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Orders to delete
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to delete.
     */
    limit?: number
  }

  /**
   * Order findRaw
   */
  export type OrderFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Order aggregateRaw
   */
  export type OrderAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Order.items
   */
  export type Order$itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    where?: OrderItemWhereInput
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    cursor?: OrderItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * Order without action
   */
  export type OrderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
  }


  /**
   * Model OrderItem
   */

  export type AggregateOrderItem = {
    _count: OrderItemCountAggregateOutputType | null
    _avg: OrderItemAvgAggregateOutputType | null
    _sum: OrderItemSumAggregateOutputType | null
    _min: OrderItemMinAggregateOutputType | null
    _max: OrderItemMaxAggregateOutputType | null
  }

  export type OrderItemAvgAggregateOutputType = {
    quantity: number | null
  }

  export type OrderItemSumAggregateOutputType = {
    quantity: number | null
  }

  export type OrderItemMinAggregateOutputType = {
    id: string | null
    orderId: string | null
    productId: string | null
    quantity: number | null
  }

  export type OrderItemMaxAggregateOutputType = {
    id: string | null
    orderId: string | null
    productId: string | null
    quantity: number | null
  }

  export type OrderItemCountAggregateOutputType = {
    id: number
    orderId: number
    productId: number
    quantity: number
    _all: number
  }


  export type OrderItemAvgAggregateInputType = {
    quantity?: true
  }

  export type OrderItemSumAggregateInputType = {
    quantity?: true
  }

  export type OrderItemMinAggregateInputType = {
    id?: true
    orderId?: true
    productId?: true
    quantity?: true
  }

  export type OrderItemMaxAggregateInputType = {
    id?: true
    orderId?: true
    productId?: true
    quantity?: true
  }

  export type OrderItemCountAggregateInputType = {
    id?: true
    orderId?: true
    productId?: true
    quantity?: true
    _all?: true
  }

  export type OrderItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrderItem to aggregate.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OrderItems
    **/
    _count?: true | OrderItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OrderItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OrderItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrderItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrderItemMaxAggregateInputType
  }

  export type GetOrderItemAggregateType<T extends OrderItemAggregateArgs> = {
        [P in keyof T & keyof AggregateOrderItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrderItem[P]>
      : GetScalarType<T[P], AggregateOrderItem[P]>
  }




  export type OrderItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderItemWhereInput
    orderBy?: OrderItemOrderByWithAggregationInput | OrderItemOrderByWithAggregationInput[]
    by: OrderItemScalarFieldEnum[] | OrderItemScalarFieldEnum
    having?: OrderItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrderItemCountAggregateInputType | true
    _avg?: OrderItemAvgAggregateInputType
    _sum?: OrderItemSumAggregateInputType
    _min?: OrderItemMinAggregateInputType
    _max?: OrderItemMaxAggregateInputType
  }

  export type OrderItemGroupByOutputType = {
    id: string
    orderId: string
    productId: string
    quantity: number
    _count: OrderItemCountAggregateOutputType | null
    _avg: OrderItemAvgAggregateOutputType | null
    _sum: OrderItemSumAggregateOutputType | null
    _min: OrderItemMinAggregateOutputType | null
    _max: OrderItemMaxAggregateOutputType | null
  }

  type GetOrderItemGroupByPayload<T extends OrderItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrderItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrderItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderItemGroupByOutputType[P]>
            : GetScalarType<T[P], OrderItemGroupByOutputType[P]>
        }
      >
    >


  export type OrderItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    productId?: boolean
    quantity?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderItem"]>



  export type OrderItemSelectScalar = {
    id?: boolean
    orderId?: boolean
    productId?: boolean
    quantity?: boolean
  }

  export type OrderItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "orderId" | "productId" | "quantity", ExtArgs["result"]["orderItem"]>
  export type OrderItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }

  export type $OrderItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OrderItem"
    objects: {
      order: Prisma.$OrderPayload<ExtArgs>
      product: Prisma.$ProductPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orderId: string
      productId: string
      quantity: number
    }, ExtArgs["result"]["orderItem"]>
    composites: {}
  }

  type OrderItemGetPayload<S extends boolean | null | undefined | OrderItemDefaultArgs> = $Result.GetResult<Prisma.$OrderItemPayload, S>

  type OrderItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrderItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrderItemCountAggregateInputType | true
    }

  export interface OrderItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OrderItem'], meta: { name: 'OrderItem' } }
    /**
     * Find zero or one OrderItem that matches the filter.
     * @param {OrderItemFindUniqueArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderItemFindUniqueArgs>(args: SelectSubset<T, OrderItemFindUniqueArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OrderItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrderItemFindUniqueOrThrowArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderItemFindUniqueOrThrowArgs>(args: SelectSubset<T, OrderItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrderItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemFindFirstArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderItemFindFirstArgs>(args?: SelectSubset<T, OrderItemFindFirstArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrderItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemFindFirstOrThrowArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderItemFindFirstOrThrowArgs>(args?: SelectSubset<T, OrderItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OrderItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OrderItems
     * const orderItems = await prisma.orderItem.findMany()
     * 
     * // Get first 10 OrderItems
     * const orderItems = await prisma.orderItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const orderItemWithIdOnly = await prisma.orderItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrderItemFindManyArgs>(args?: SelectSubset<T, OrderItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OrderItem.
     * @param {OrderItemCreateArgs} args - Arguments to create a OrderItem.
     * @example
     * // Create one OrderItem
     * const OrderItem = await prisma.orderItem.create({
     *   data: {
     *     // ... data to create a OrderItem
     *   }
     * })
     * 
     */
    create<T extends OrderItemCreateArgs>(args: SelectSubset<T, OrderItemCreateArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OrderItems.
     * @param {OrderItemCreateManyArgs} args - Arguments to create many OrderItems.
     * @example
     * // Create many OrderItems
     * const orderItem = await prisma.orderItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrderItemCreateManyArgs>(args?: SelectSubset<T, OrderItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a OrderItem.
     * @param {OrderItemDeleteArgs} args - Arguments to delete one OrderItem.
     * @example
     * // Delete one OrderItem
     * const OrderItem = await prisma.orderItem.delete({
     *   where: {
     *     // ... filter to delete one OrderItem
     *   }
     * })
     * 
     */
    delete<T extends OrderItemDeleteArgs>(args: SelectSubset<T, OrderItemDeleteArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OrderItem.
     * @param {OrderItemUpdateArgs} args - Arguments to update one OrderItem.
     * @example
     * // Update one OrderItem
     * const orderItem = await prisma.orderItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrderItemUpdateArgs>(args: SelectSubset<T, OrderItemUpdateArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OrderItems.
     * @param {OrderItemDeleteManyArgs} args - Arguments to filter OrderItems to delete.
     * @example
     * // Delete a few OrderItems
     * const { count } = await prisma.orderItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrderItemDeleteManyArgs>(args?: SelectSubset<T, OrderItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrderItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OrderItems
     * const orderItem = await prisma.orderItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrderItemUpdateManyArgs>(args: SelectSubset<T, OrderItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one OrderItem.
     * @param {OrderItemUpsertArgs} args - Arguments to update or create a OrderItem.
     * @example
     * // Update or create a OrderItem
     * const orderItem = await prisma.orderItem.upsert({
     *   create: {
     *     // ... data to create a OrderItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OrderItem we want to update
     *   }
     * })
     */
    upsert<T extends OrderItemUpsertArgs>(args: SelectSubset<T, OrderItemUpsertArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OrderItems that matches the filter.
     * @param {OrderItemFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const orderItem = await prisma.orderItem.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: OrderItemFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a OrderItem.
     * @param {OrderItemAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const orderItem = await prisma.orderItem.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: OrderItemAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of OrderItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemCountArgs} args - Arguments to filter OrderItems to count.
     * @example
     * // Count the number of OrderItems
     * const count = await prisma.orderItem.count({
     *   where: {
     *     // ... the filter for the OrderItems we want to count
     *   }
     * })
    **/
    count<T extends OrderItemCountArgs>(
      args?: Subset<T, OrderItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OrderItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrderItemAggregateArgs>(args: Subset<T, OrderItemAggregateArgs>): Prisma.PrismaPromise<GetOrderItemAggregateType<T>>

    /**
     * Group by OrderItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrderItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderItemGroupByArgs['orderBy'] }
        : { orderBy?: OrderItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrderItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OrderItem model
   */
  readonly fields: OrderItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OrderItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    order<T extends OrderDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrderDefaultArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the OrderItem model
   */
  interface OrderItemFieldRefs {
    readonly id: FieldRef<"OrderItem", 'String'>
    readonly orderId: FieldRef<"OrderItem", 'String'>
    readonly productId: FieldRef<"OrderItem", 'String'>
    readonly quantity: FieldRef<"OrderItem", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * OrderItem findUnique
   */
  export type OrderItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem findUniqueOrThrow
   */
  export type OrderItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem findFirst
   */
  export type OrderItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrderItems.
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderItems.
     */
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * OrderItem findFirstOrThrow
   */
  export type OrderItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrderItems.
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderItems.
     */
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * OrderItem findMany
   */
  export type OrderItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItems to fetch.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OrderItems.
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * OrderItem create
   */
  export type OrderItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * The data needed to create a OrderItem.
     */
    data: XOR<OrderItemCreateInput, OrderItemUncheckedCreateInput>
  }

  /**
   * OrderItem createMany
   */
  export type OrderItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OrderItems.
     */
    data: OrderItemCreateManyInput | OrderItemCreateManyInput[]
  }

  /**
   * OrderItem update
   */
  export type OrderItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * The data needed to update a OrderItem.
     */
    data: XOR<OrderItemUpdateInput, OrderItemUncheckedUpdateInput>
    /**
     * Choose, which OrderItem to update.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem updateMany
   */
  export type OrderItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OrderItems.
     */
    data: XOR<OrderItemUpdateManyMutationInput, OrderItemUncheckedUpdateManyInput>
    /**
     * Filter which OrderItems to update
     */
    where?: OrderItemWhereInput
    /**
     * Limit how many OrderItems to update.
     */
    limit?: number
  }

  /**
   * OrderItem upsert
   */
  export type OrderItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * The filter to search for the OrderItem to update in case it exists.
     */
    where: OrderItemWhereUniqueInput
    /**
     * In case the OrderItem found by the `where` argument doesn't exist, create a new OrderItem with this data.
     */
    create: XOR<OrderItemCreateInput, OrderItemUncheckedCreateInput>
    /**
     * In case the OrderItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderItemUpdateInput, OrderItemUncheckedUpdateInput>
  }

  /**
   * OrderItem delete
   */
  export type OrderItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter which OrderItem to delete.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem deleteMany
   */
  export type OrderItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrderItems to delete
     */
    where?: OrderItemWhereInput
    /**
     * Limit how many OrderItems to delete.
     */
    limit?: number
  }

  /**
   * OrderItem findRaw
   */
  export type OrderItemFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * OrderItem aggregateRaw
   */
  export type OrderItemAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * OrderItem without action
   */
  export type OrderItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
  }


  /**
   * Model WishList
   */

  export type AggregateWishList = {
    _count: WishListCountAggregateOutputType | null
    _min: WishListMinAggregateOutputType | null
    _max: WishListMaxAggregateOutputType | null
  }

  export type WishListMinAggregateOutputType = {
    id: string | null
    userId: string | null
    productId: string | null
    selectedSize: string | null
    selectedColor: string | null
    createdAt: Date | null
  }

  export type WishListMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    productId: string | null
    selectedSize: string | null
    selectedColor: string | null
    createdAt: Date | null
  }

  export type WishListCountAggregateOutputType = {
    id: number
    userId: number
    productId: number
    selectedSize: number
    selectedColor: number
    createdAt: number
    _all: number
  }


  export type WishListMinAggregateInputType = {
    id?: true
    userId?: true
    productId?: true
    selectedSize?: true
    selectedColor?: true
    createdAt?: true
  }

  export type WishListMaxAggregateInputType = {
    id?: true
    userId?: true
    productId?: true
    selectedSize?: true
    selectedColor?: true
    createdAt?: true
  }

  export type WishListCountAggregateInputType = {
    id?: true
    userId?: true
    productId?: true
    selectedSize?: true
    selectedColor?: true
    createdAt?: true
    _all?: true
  }

  export type WishListAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WishList to aggregate.
     */
    where?: WishListWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WishLists to fetch.
     */
    orderBy?: WishListOrderByWithRelationInput | WishListOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WishListWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WishLists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WishLists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WishLists
    **/
    _count?: true | WishListCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WishListMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WishListMaxAggregateInputType
  }

  export type GetWishListAggregateType<T extends WishListAggregateArgs> = {
        [P in keyof T & keyof AggregateWishList]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWishList[P]>
      : GetScalarType<T[P], AggregateWishList[P]>
  }




  export type WishListGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WishListWhereInput
    orderBy?: WishListOrderByWithAggregationInput | WishListOrderByWithAggregationInput[]
    by: WishListScalarFieldEnum[] | WishListScalarFieldEnum
    having?: WishListScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WishListCountAggregateInputType | true
    _min?: WishListMinAggregateInputType
    _max?: WishListMaxAggregateInputType
  }

  export type WishListGroupByOutputType = {
    id: string
    userId: string
    productId: string
    selectedSize: string | null
    selectedColor: string | null
    createdAt: Date
    _count: WishListCountAggregateOutputType | null
    _min: WishListMinAggregateOutputType | null
    _max: WishListMaxAggregateOutputType | null
  }

  type GetWishListGroupByPayload<T extends WishListGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WishListGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WishListGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WishListGroupByOutputType[P]>
            : GetScalarType<T[P], WishListGroupByOutputType[P]>
        }
      >
    >


  export type WishListSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    productId?: boolean
    selectedSize?: boolean
    selectedColor?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["wishList"]>



  export type WishListSelectScalar = {
    id?: boolean
    userId?: boolean
    productId?: boolean
    selectedSize?: boolean
    selectedColor?: boolean
    createdAt?: boolean
  }

  export type WishListOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "productId" | "selectedSize" | "selectedColor" | "createdAt", ExtArgs["result"]["wishList"]>
  export type WishListInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }

  export type $WishListPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WishList"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      product: Prisma.$ProductPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      productId: string
      selectedSize: string | null
      selectedColor: string | null
      createdAt: Date
    }, ExtArgs["result"]["wishList"]>
    composites: {}
  }

  type WishListGetPayload<S extends boolean | null | undefined | WishListDefaultArgs> = $Result.GetResult<Prisma.$WishListPayload, S>

  type WishListCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WishListFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WishListCountAggregateInputType | true
    }

  export interface WishListDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WishList'], meta: { name: 'WishList' } }
    /**
     * Find zero or one WishList that matches the filter.
     * @param {WishListFindUniqueArgs} args - Arguments to find a WishList
     * @example
     * // Get one WishList
     * const wishList = await prisma.wishList.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WishListFindUniqueArgs>(args: SelectSubset<T, WishListFindUniqueArgs<ExtArgs>>): Prisma__WishListClient<$Result.GetResult<Prisma.$WishListPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WishList that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WishListFindUniqueOrThrowArgs} args - Arguments to find a WishList
     * @example
     * // Get one WishList
     * const wishList = await prisma.wishList.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WishListFindUniqueOrThrowArgs>(args: SelectSubset<T, WishListFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WishListClient<$Result.GetResult<Prisma.$WishListPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WishList that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WishListFindFirstArgs} args - Arguments to find a WishList
     * @example
     * // Get one WishList
     * const wishList = await prisma.wishList.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WishListFindFirstArgs>(args?: SelectSubset<T, WishListFindFirstArgs<ExtArgs>>): Prisma__WishListClient<$Result.GetResult<Prisma.$WishListPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WishList that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WishListFindFirstOrThrowArgs} args - Arguments to find a WishList
     * @example
     * // Get one WishList
     * const wishList = await prisma.wishList.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WishListFindFirstOrThrowArgs>(args?: SelectSubset<T, WishListFindFirstOrThrowArgs<ExtArgs>>): Prisma__WishListClient<$Result.GetResult<Prisma.$WishListPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WishLists that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WishListFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WishLists
     * const wishLists = await prisma.wishList.findMany()
     * 
     * // Get first 10 WishLists
     * const wishLists = await prisma.wishList.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const wishListWithIdOnly = await prisma.wishList.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WishListFindManyArgs>(args?: SelectSubset<T, WishListFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WishListPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WishList.
     * @param {WishListCreateArgs} args - Arguments to create a WishList.
     * @example
     * // Create one WishList
     * const WishList = await prisma.wishList.create({
     *   data: {
     *     // ... data to create a WishList
     *   }
     * })
     * 
     */
    create<T extends WishListCreateArgs>(args: SelectSubset<T, WishListCreateArgs<ExtArgs>>): Prisma__WishListClient<$Result.GetResult<Prisma.$WishListPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WishLists.
     * @param {WishListCreateManyArgs} args - Arguments to create many WishLists.
     * @example
     * // Create many WishLists
     * const wishList = await prisma.wishList.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WishListCreateManyArgs>(args?: SelectSubset<T, WishListCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a WishList.
     * @param {WishListDeleteArgs} args - Arguments to delete one WishList.
     * @example
     * // Delete one WishList
     * const WishList = await prisma.wishList.delete({
     *   where: {
     *     // ... filter to delete one WishList
     *   }
     * })
     * 
     */
    delete<T extends WishListDeleteArgs>(args: SelectSubset<T, WishListDeleteArgs<ExtArgs>>): Prisma__WishListClient<$Result.GetResult<Prisma.$WishListPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WishList.
     * @param {WishListUpdateArgs} args - Arguments to update one WishList.
     * @example
     * // Update one WishList
     * const wishList = await prisma.wishList.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WishListUpdateArgs>(args: SelectSubset<T, WishListUpdateArgs<ExtArgs>>): Prisma__WishListClient<$Result.GetResult<Prisma.$WishListPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WishLists.
     * @param {WishListDeleteManyArgs} args - Arguments to filter WishLists to delete.
     * @example
     * // Delete a few WishLists
     * const { count } = await prisma.wishList.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WishListDeleteManyArgs>(args?: SelectSubset<T, WishListDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WishLists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WishListUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WishLists
     * const wishList = await prisma.wishList.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WishListUpdateManyArgs>(args: SelectSubset<T, WishListUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one WishList.
     * @param {WishListUpsertArgs} args - Arguments to update or create a WishList.
     * @example
     * // Update or create a WishList
     * const wishList = await prisma.wishList.upsert({
     *   create: {
     *     // ... data to create a WishList
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WishList we want to update
     *   }
     * })
     */
    upsert<T extends WishListUpsertArgs>(args: SelectSubset<T, WishListUpsertArgs<ExtArgs>>): Prisma__WishListClient<$Result.GetResult<Prisma.$WishListPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WishLists that matches the filter.
     * @param {WishListFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const wishList = await prisma.wishList.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: WishListFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a WishList.
     * @param {WishListAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const wishList = await prisma.wishList.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: WishListAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of WishLists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WishListCountArgs} args - Arguments to filter WishLists to count.
     * @example
     * // Count the number of WishLists
     * const count = await prisma.wishList.count({
     *   where: {
     *     // ... the filter for the WishLists we want to count
     *   }
     * })
    **/
    count<T extends WishListCountArgs>(
      args?: Subset<T, WishListCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WishListCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WishList.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WishListAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WishListAggregateArgs>(args: Subset<T, WishListAggregateArgs>): Prisma.PrismaPromise<GetWishListAggregateType<T>>

    /**
     * Group by WishList.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WishListGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WishListGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WishListGroupByArgs['orderBy'] }
        : { orderBy?: WishListGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WishListGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWishListGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WishList model
   */
  readonly fields: WishListFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WishList.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WishListClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WishList model
   */
  interface WishListFieldRefs {
    readonly id: FieldRef<"WishList", 'String'>
    readonly userId: FieldRef<"WishList", 'String'>
    readonly productId: FieldRef<"WishList", 'String'>
    readonly selectedSize: FieldRef<"WishList", 'String'>
    readonly selectedColor: FieldRef<"WishList", 'String'>
    readonly createdAt: FieldRef<"WishList", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WishList findUnique
   */
  export type WishListFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WishList
     */
    select?: WishListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WishList
     */
    omit?: WishListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WishListInclude<ExtArgs> | null
    /**
     * Filter, which WishList to fetch.
     */
    where: WishListWhereUniqueInput
  }

  /**
   * WishList findUniqueOrThrow
   */
  export type WishListFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WishList
     */
    select?: WishListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WishList
     */
    omit?: WishListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WishListInclude<ExtArgs> | null
    /**
     * Filter, which WishList to fetch.
     */
    where: WishListWhereUniqueInput
  }

  /**
   * WishList findFirst
   */
  export type WishListFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WishList
     */
    select?: WishListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WishList
     */
    omit?: WishListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WishListInclude<ExtArgs> | null
    /**
     * Filter, which WishList to fetch.
     */
    where?: WishListWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WishLists to fetch.
     */
    orderBy?: WishListOrderByWithRelationInput | WishListOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WishLists.
     */
    cursor?: WishListWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WishLists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WishLists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WishLists.
     */
    distinct?: WishListScalarFieldEnum | WishListScalarFieldEnum[]
  }

  /**
   * WishList findFirstOrThrow
   */
  export type WishListFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WishList
     */
    select?: WishListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WishList
     */
    omit?: WishListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WishListInclude<ExtArgs> | null
    /**
     * Filter, which WishList to fetch.
     */
    where?: WishListWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WishLists to fetch.
     */
    orderBy?: WishListOrderByWithRelationInput | WishListOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WishLists.
     */
    cursor?: WishListWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WishLists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WishLists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WishLists.
     */
    distinct?: WishListScalarFieldEnum | WishListScalarFieldEnum[]
  }

  /**
   * WishList findMany
   */
  export type WishListFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WishList
     */
    select?: WishListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WishList
     */
    omit?: WishListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WishListInclude<ExtArgs> | null
    /**
     * Filter, which WishLists to fetch.
     */
    where?: WishListWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WishLists to fetch.
     */
    orderBy?: WishListOrderByWithRelationInput | WishListOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WishLists.
     */
    cursor?: WishListWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WishLists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WishLists.
     */
    skip?: number
    distinct?: WishListScalarFieldEnum | WishListScalarFieldEnum[]
  }

  /**
   * WishList create
   */
  export type WishListCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WishList
     */
    select?: WishListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WishList
     */
    omit?: WishListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WishListInclude<ExtArgs> | null
    /**
     * The data needed to create a WishList.
     */
    data: XOR<WishListCreateInput, WishListUncheckedCreateInput>
  }

  /**
   * WishList createMany
   */
  export type WishListCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WishLists.
     */
    data: WishListCreateManyInput | WishListCreateManyInput[]
  }

  /**
   * WishList update
   */
  export type WishListUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WishList
     */
    select?: WishListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WishList
     */
    omit?: WishListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WishListInclude<ExtArgs> | null
    /**
     * The data needed to update a WishList.
     */
    data: XOR<WishListUpdateInput, WishListUncheckedUpdateInput>
    /**
     * Choose, which WishList to update.
     */
    where: WishListWhereUniqueInput
  }

  /**
   * WishList updateMany
   */
  export type WishListUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WishLists.
     */
    data: XOR<WishListUpdateManyMutationInput, WishListUncheckedUpdateManyInput>
    /**
     * Filter which WishLists to update
     */
    where?: WishListWhereInput
    /**
     * Limit how many WishLists to update.
     */
    limit?: number
  }

  /**
   * WishList upsert
   */
  export type WishListUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WishList
     */
    select?: WishListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WishList
     */
    omit?: WishListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WishListInclude<ExtArgs> | null
    /**
     * The filter to search for the WishList to update in case it exists.
     */
    where: WishListWhereUniqueInput
    /**
     * In case the WishList found by the `where` argument doesn't exist, create a new WishList with this data.
     */
    create: XOR<WishListCreateInput, WishListUncheckedCreateInput>
    /**
     * In case the WishList was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WishListUpdateInput, WishListUncheckedUpdateInput>
  }

  /**
   * WishList delete
   */
  export type WishListDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WishList
     */
    select?: WishListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WishList
     */
    omit?: WishListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WishListInclude<ExtArgs> | null
    /**
     * Filter which WishList to delete.
     */
    where: WishListWhereUniqueInput
  }

  /**
   * WishList deleteMany
   */
  export type WishListDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WishLists to delete
     */
    where?: WishListWhereInput
    /**
     * Limit how many WishLists to delete.
     */
    limit?: number
  }

  /**
   * WishList findRaw
   */
  export type WishListFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * WishList aggregateRaw
   */
  export type WishListAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * WishList without action
   */
  export type WishListDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WishList
     */
    select?: WishListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WishList
     */
    omit?: WishListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WishListInclude<ExtArgs> | null
  }


  /**
   * Model PopularSearch
   */

  export type AggregatePopularSearch = {
    _count: PopularSearchCountAggregateOutputType | null
    _avg: PopularSearchAvgAggregateOutputType | null
    _sum: PopularSearchSumAggregateOutputType | null
    _min: PopularSearchMinAggregateOutputType | null
    _max: PopularSearchMaxAggregateOutputType | null
  }

  export type PopularSearchAvgAggregateOutputType = {
    count: number | null
  }

  export type PopularSearchSumAggregateOutputType = {
    count: number | null
  }

  export type PopularSearchMinAggregateOutputType = {
    id: string | null
    query: string | null
    count: number | null
    lastSearched: Date | null
  }

  export type PopularSearchMaxAggregateOutputType = {
    id: string | null
    query: string | null
    count: number | null
    lastSearched: Date | null
  }

  export type PopularSearchCountAggregateOutputType = {
    id: number
    query: number
    count: number
    lastSearched: number
    _all: number
  }


  export type PopularSearchAvgAggregateInputType = {
    count?: true
  }

  export type PopularSearchSumAggregateInputType = {
    count?: true
  }

  export type PopularSearchMinAggregateInputType = {
    id?: true
    query?: true
    count?: true
    lastSearched?: true
  }

  export type PopularSearchMaxAggregateInputType = {
    id?: true
    query?: true
    count?: true
    lastSearched?: true
  }

  export type PopularSearchCountAggregateInputType = {
    id?: true
    query?: true
    count?: true
    lastSearched?: true
    _all?: true
  }

  export type PopularSearchAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PopularSearch to aggregate.
     */
    where?: PopularSearchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PopularSearches to fetch.
     */
    orderBy?: PopularSearchOrderByWithRelationInput | PopularSearchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PopularSearchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PopularSearches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PopularSearches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PopularSearches
    **/
    _count?: true | PopularSearchCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PopularSearchAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PopularSearchSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PopularSearchMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PopularSearchMaxAggregateInputType
  }

  export type GetPopularSearchAggregateType<T extends PopularSearchAggregateArgs> = {
        [P in keyof T & keyof AggregatePopularSearch]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePopularSearch[P]>
      : GetScalarType<T[P], AggregatePopularSearch[P]>
  }




  export type PopularSearchGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PopularSearchWhereInput
    orderBy?: PopularSearchOrderByWithAggregationInput | PopularSearchOrderByWithAggregationInput[]
    by: PopularSearchScalarFieldEnum[] | PopularSearchScalarFieldEnum
    having?: PopularSearchScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PopularSearchCountAggregateInputType | true
    _avg?: PopularSearchAvgAggregateInputType
    _sum?: PopularSearchSumAggregateInputType
    _min?: PopularSearchMinAggregateInputType
    _max?: PopularSearchMaxAggregateInputType
  }

  export type PopularSearchGroupByOutputType = {
    id: string
    query: string
    count: number
    lastSearched: Date
    _count: PopularSearchCountAggregateOutputType | null
    _avg: PopularSearchAvgAggregateOutputType | null
    _sum: PopularSearchSumAggregateOutputType | null
    _min: PopularSearchMinAggregateOutputType | null
    _max: PopularSearchMaxAggregateOutputType | null
  }

  type GetPopularSearchGroupByPayload<T extends PopularSearchGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PopularSearchGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PopularSearchGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PopularSearchGroupByOutputType[P]>
            : GetScalarType<T[P], PopularSearchGroupByOutputType[P]>
        }
      >
    >


  export type PopularSearchSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    query?: boolean
    count?: boolean
    lastSearched?: boolean
  }, ExtArgs["result"]["popularSearch"]>



  export type PopularSearchSelectScalar = {
    id?: boolean
    query?: boolean
    count?: boolean
    lastSearched?: boolean
  }

  export type PopularSearchOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "query" | "count" | "lastSearched", ExtArgs["result"]["popularSearch"]>

  export type $PopularSearchPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PopularSearch"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      query: string
      count: number
      lastSearched: Date
    }, ExtArgs["result"]["popularSearch"]>
    composites: {}
  }

  type PopularSearchGetPayload<S extends boolean | null | undefined | PopularSearchDefaultArgs> = $Result.GetResult<Prisma.$PopularSearchPayload, S>

  type PopularSearchCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PopularSearchFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PopularSearchCountAggregateInputType | true
    }

  export interface PopularSearchDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PopularSearch'], meta: { name: 'PopularSearch' } }
    /**
     * Find zero or one PopularSearch that matches the filter.
     * @param {PopularSearchFindUniqueArgs} args - Arguments to find a PopularSearch
     * @example
     * // Get one PopularSearch
     * const popularSearch = await prisma.popularSearch.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PopularSearchFindUniqueArgs>(args: SelectSubset<T, PopularSearchFindUniqueArgs<ExtArgs>>): Prisma__PopularSearchClient<$Result.GetResult<Prisma.$PopularSearchPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PopularSearch that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PopularSearchFindUniqueOrThrowArgs} args - Arguments to find a PopularSearch
     * @example
     * // Get one PopularSearch
     * const popularSearch = await prisma.popularSearch.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PopularSearchFindUniqueOrThrowArgs>(args: SelectSubset<T, PopularSearchFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PopularSearchClient<$Result.GetResult<Prisma.$PopularSearchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PopularSearch that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PopularSearchFindFirstArgs} args - Arguments to find a PopularSearch
     * @example
     * // Get one PopularSearch
     * const popularSearch = await prisma.popularSearch.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PopularSearchFindFirstArgs>(args?: SelectSubset<T, PopularSearchFindFirstArgs<ExtArgs>>): Prisma__PopularSearchClient<$Result.GetResult<Prisma.$PopularSearchPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PopularSearch that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PopularSearchFindFirstOrThrowArgs} args - Arguments to find a PopularSearch
     * @example
     * // Get one PopularSearch
     * const popularSearch = await prisma.popularSearch.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PopularSearchFindFirstOrThrowArgs>(args?: SelectSubset<T, PopularSearchFindFirstOrThrowArgs<ExtArgs>>): Prisma__PopularSearchClient<$Result.GetResult<Prisma.$PopularSearchPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PopularSearches that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PopularSearchFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PopularSearches
     * const popularSearches = await prisma.popularSearch.findMany()
     * 
     * // Get first 10 PopularSearches
     * const popularSearches = await prisma.popularSearch.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const popularSearchWithIdOnly = await prisma.popularSearch.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PopularSearchFindManyArgs>(args?: SelectSubset<T, PopularSearchFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PopularSearchPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PopularSearch.
     * @param {PopularSearchCreateArgs} args - Arguments to create a PopularSearch.
     * @example
     * // Create one PopularSearch
     * const PopularSearch = await prisma.popularSearch.create({
     *   data: {
     *     // ... data to create a PopularSearch
     *   }
     * })
     * 
     */
    create<T extends PopularSearchCreateArgs>(args: SelectSubset<T, PopularSearchCreateArgs<ExtArgs>>): Prisma__PopularSearchClient<$Result.GetResult<Prisma.$PopularSearchPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PopularSearches.
     * @param {PopularSearchCreateManyArgs} args - Arguments to create many PopularSearches.
     * @example
     * // Create many PopularSearches
     * const popularSearch = await prisma.popularSearch.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PopularSearchCreateManyArgs>(args?: SelectSubset<T, PopularSearchCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a PopularSearch.
     * @param {PopularSearchDeleteArgs} args - Arguments to delete one PopularSearch.
     * @example
     * // Delete one PopularSearch
     * const PopularSearch = await prisma.popularSearch.delete({
     *   where: {
     *     // ... filter to delete one PopularSearch
     *   }
     * })
     * 
     */
    delete<T extends PopularSearchDeleteArgs>(args: SelectSubset<T, PopularSearchDeleteArgs<ExtArgs>>): Prisma__PopularSearchClient<$Result.GetResult<Prisma.$PopularSearchPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PopularSearch.
     * @param {PopularSearchUpdateArgs} args - Arguments to update one PopularSearch.
     * @example
     * // Update one PopularSearch
     * const popularSearch = await prisma.popularSearch.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PopularSearchUpdateArgs>(args: SelectSubset<T, PopularSearchUpdateArgs<ExtArgs>>): Prisma__PopularSearchClient<$Result.GetResult<Prisma.$PopularSearchPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PopularSearches.
     * @param {PopularSearchDeleteManyArgs} args - Arguments to filter PopularSearches to delete.
     * @example
     * // Delete a few PopularSearches
     * const { count } = await prisma.popularSearch.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PopularSearchDeleteManyArgs>(args?: SelectSubset<T, PopularSearchDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PopularSearches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PopularSearchUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PopularSearches
     * const popularSearch = await prisma.popularSearch.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PopularSearchUpdateManyArgs>(args: SelectSubset<T, PopularSearchUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PopularSearch.
     * @param {PopularSearchUpsertArgs} args - Arguments to update or create a PopularSearch.
     * @example
     * // Update or create a PopularSearch
     * const popularSearch = await prisma.popularSearch.upsert({
     *   create: {
     *     // ... data to create a PopularSearch
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PopularSearch we want to update
     *   }
     * })
     */
    upsert<T extends PopularSearchUpsertArgs>(args: SelectSubset<T, PopularSearchUpsertArgs<ExtArgs>>): Prisma__PopularSearchClient<$Result.GetResult<Prisma.$PopularSearchPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PopularSearches that matches the filter.
     * @param {PopularSearchFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const popularSearch = await prisma.popularSearch.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: PopularSearchFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a PopularSearch.
     * @param {PopularSearchAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const popularSearch = await prisma.popularSearch.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: PopularSearchAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of PopularSearches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PopularSearchCountArgs} args - Arguments to filter PopularSearches to count.
     * @example
     * // Count the number of PopularSearches
     * const count = await prisma.popularSearch.count({
     *   where: {
     *     // ... the filter for the PopularSearches we want to count
     *   }
     * })
    **/
    count<T extends PopularSearchCountArgs>(
      args?: Subset<T, PopularSearchCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PopularSearchCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PopularSearch.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PopularSearchAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PopularSearchAggregateArgs>(args: Subset<T, PopularSearchAggregateArgs>): Prisma.PrismaPromise<GetPopularSearchAggregateType<T>>

    /**
     * Group by PopularSearch.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PopularSearchGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PopularSearchGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PopularSearchGroupByArgs['orderBy'] }
        : { orderBy?: PopularSearchGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PopularSearchGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPopularSearchGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PopularSearch model
   */
  readonly fields: PopularSearchFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PopularSearch.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PopularSearchClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PopularSearch model
   */
  interface PopularSearchFieldRefs {
    readonly id: FieldRef<"PopularSearch", 'String'>
    readonly query: FieldRef<"PopularSearch", 'String'>
    readonly count: FieldRef<"PopularSearch", 'Int'>
    readonly lastSearched: FieldRef<"PopularSearch", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PopularSearch findUnique
   */
  export type PopularSearchFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PopularSearch
     */
    select?: PopularSearchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PopularSearch
     */
    omit?: PopularSearchOmit<ExtArgs> | null
    /**
     * Filter, which PopularSearch to fetch.
     */
    where: PopularSearchWhereUniqueInput
  }

  /**
   * PopularSearch findUniqueOrThrow
   */
  export type PopularSearchFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PopularSearch
     */
    select?: PopularSearchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PopularSearch
     */
    omit?: PopularSearchOmit<ExtArgs> | null
    /**
     * Filter, which PopularSearch to fetch.
     */
    where: PopularSearchWhereUniqueInput
  }

  /**
   * PopularSearch findFirst
   */
  export type PopularSearchFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PopularSearch
     */
    select?: PopularSearchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PopularSearch
     */
    omit?: PopularSearchOmit<ExtArgs> | null
    /**
     * Filter, which PopularSearch to fetch.
     */
    where?: PopularSearchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PopularSearches to fetch.
     */
    orderBy?: PopularSearchOrderByWithRelationInput | PopularSearchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PopularSearches.
     */
    cursor?: PopularSearchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PopularSearches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PopularSearches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PopularSearches.
     */
    distinct?: PopularSearchScalarFieldEnum | PopularSearchScalarFieldEnum[]
  }

  /**
   * PopularSearch findFirstOrThrow
   */
  export type PopularSearchFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PopularSearch
     */
    select?: PopularSearchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PopularSearch
     */
    omit?: PopularSearchOmit<ExtArgs> | null
    /**
     * Filter, which PopularSearch to fetch.
     */
    where?: PopularSearchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PopularSearches to fetch.
     */
    orderBy?: PopularSearchOrderByWithRelationInput | PopularSearchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PopularSearches.
     */
    cursor?: PopularSearchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PopularSearches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PopularSearches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PopularSearches.
     */
    distinct?: PopularSearchScalarFieldEnum | PopularSearchScalarFieldEnum[]
  }

  /**
   * PopularSearch findMany
   */
  export type PopularSearchFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PopularSearch
     */
    select?: PopularSearchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PopularSearch
     */
    omit?: PopularSearchOmit<ExtArgs> | null
    /**
     * Filter, which PopularSearches to fetch.
     */
    where?: PopularSearchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PopularSearches to fetch.
     */
    orderBy?: PopularSearchOrderByWithRelationInput | PopularSearchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PopularSearches.
     */
    cursor?: PopularSearchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PopularSearches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PopularSearches.
     */
    skip?: number
    distinct?: PopularSearchScalarFieldEnum | PopularSearchScalarFieldEnum[]
  }

  /**
   * PopularSearch create
   */
  export type PopularSearchCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PopularSearch
     */
    select?: PopularSearchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PopularSearch
     */
    omit?: PopularSearchOmit<ExtArgs> | null
    /**
     * The data needed to create a PopularSearch.
     */
    data: XOR<PopularSearchCreateInput, PopularSearchUncheckedCreateInput>
  }

  /**
   * PopularSearch createMany
   */
  export type PopularSearchCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PopularSearches.
     */
    data: PopularSearchCreateManyInput | PopularSearchCreateManyInput[]
  }

  /**
   * PopularSearch update
   */
  export type PopularSearchUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PopularSearch
     */
    select?: PopularSearchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PopularSearch
     */
    omit?: PopularSearchOmit<ExtArgs> | null
    /**
     * The data needed to update a PopularSearch.
     */
    data: XOR<PopularSearchUpdateInput, PopularSearchUncheckedUpdateInput>
    /**
     * Choose, which PopularSearch to update.
     */
    where: PopularSearchWhereUniqueInput
  }

  /**
   * PopularSearch updateMany
   */
  export type PopularSearchUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PopularSearches.
     */
    data: XOR<PopularSearchUpdateManyMutationInput, PopularSearchUncheckedUpdateManyInput>
    /**
     * Filter which PopularSearches to update
     */
    where?: PopularSearchWhereInput
    /**
     * Limit how many PopularSearches to update.
     */
    limit?: number
  }

  /**
   * PopularSearch upsert
   */
  export type PopularSearchUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PopularSearch
     */
    select?: PopularSearchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PopularSearch
     */
    omit?: PopularSearchOmit<ExtArgs> | null
    /**
     * The filter to search for the PopularSearch to update in case it exists.
     */
    where: PopularSearchWhereUniqueInput
    /**
     * In case the PopularSearch found by the `where` argument doesn't exist, create a new PopularSearch with this data.
     */
    create: XOR<PopularSearchCreateInput, PopularSearchUncheckedCreateInput>
    /**
     * In case the PopularSearch was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PopularSearchUpdateInput, PopularSearchUncheckedUpdateInput>
  }

  /**
   * PopularSearch delete
   */
  export type PopularSearchDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PopularSearch
     */
    select?: PopularSearchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PopularSearch
     */
    omit?: PopularSearchOmit<ExtArgs> | null
    /**
     * Filter which PopularSearch to delete.
     */
    where: PopularSearchWhereUniqueInput
  }

  /**
   * PopularSearch deleteMany
   */
  export type PopularSearchDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PopularSearches to delete
     */
    where?: PopularSearchWhereInput
    /**
     * Limit how many PopularSearches to delete.
     */
    limit?: number
  }

  /**
   * PopularSearch findRaw
   */
  export type PopularSearchFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * PopularSearch aggregateRaw
   */
  export type PopularSearchAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * PopularSearch without action
   */
  export type PopularSearchDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PopularSearch
     */
    select?: PopularSearchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PopularSearch
     */
    omit?: PopularSearchOmit<ExtArgs> | null
  }


  /**
   * Model SearchHistory
   */

  export type AggregateSearchHistory = {
    _count: SearchHistoryCountAggregateOutputType | null
    _min: SearchHistoryMinAggregateOutputType | null
    _max: SearchHistoryMaxAggregateOutputType | null
  }

  export type SearchHistoryMinAggregateOutputType = {
    id: string | null
    userId: string | null
    query: string | null
    searchedAt: Date | null
  }

  export type SearchHistoryMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    query: string | null
    searchedAt: Date | null
  }

  export type SearchHistoryCountAggregateOutputType = {
    id: number
    userId: number
    query: number
    searchedAt: number
    _all: number
  }


  export type SearchHistoryMinAggregateInputType = {
    id?: true
    userId?: true
    query?: true
    searchedAt?: true
  }

  export type SearchHistoryMaxAggregateInputType = {
    id?: true
    userId?: true
    query?: true
    searchedAt?: true
  }

  export type SearchHistoryCountAggregateInputType = {
    id?: true
    userId?: true
    query?: true
    searchedAt?: true
    _all?: true
  }

  export type SearchHistoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SearchHistory to aggregate.
     */
    where?: SearchHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SearchHistories to fetch.
     */
    orderBy?: SearchHistoryOrderByWithRelationInput | SearchHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SearchHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SearchHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SearchHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SearchHistories
    **/
    _count?: true | SearchHistoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SearchHistoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SearchHistoryMaxAggregateInputType
  }

  export type GetSearchHistoryAggregateType<T extends SearchHistoryAggregateArgs> = {
        [P in keyof T & keyof AggregateSearchHistory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSearchHistory[P]>
      : GetScalarType<T[P], AggregateSearchHistory[P]>
  }




  export type SearchHistoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SearchHistoryWhereInput
    orderBy?: SearchHistoryOrderByWithAggregationInput | SearchHistoryOrderByWithAggregationInput[]
    by: SearchHistoryScalarFieldEnum[] | SearchHistoryScalarFieldEnum
    having?: SearchHistoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SearchHistoryCountAggregateInputType | true
    _min?: SearchHistoryMinAggregateInputType
    _max?: SearchHistoryMaxAggregateInputType
  }

  export type SearchHistoryGroupByOutputType = {
    id: string
    userId: string
    query: string
    searchedAt: Date
    _count: SearchHistoryCountAggregateOutputType | null
    _min: SearchHistoryMinAggregateOutputType | null
    _max: SearchHistoryMaxAggregateOutputType | null
  }

  type GetSearchHistoryGroupByPayload<T extends SearchHistoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SearchHistoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SearchHistoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SearchHistoryGroupByOutputType[P]>
            : GetScalarType<T[P], SearchHistoryGroupByOutputType[P]>
        }
      >
    >


  export type SearchHistorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    query?: boolean
    searchedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["searchHistory"]>



  export type SearchHistorySelectScalar = {
    id?: boolean
    userId?: boolean
    query?: boolean
    searchedAt?: boolean
  }

  export type SearchHistoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "query" | "searchedAt", ExtArgs["result"]["searchHistory"]>
  export type SearchHistoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SearchHistoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SearchHistory"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      query: string
      searchedAt: Date
    }, ExtArgs["result"]["searchHistory"]>
    composites: {}
  }

  type SearchHistoryGetPayload<S extends boolean | null | undefined | SearchHistoryDefaultArgs> = $Result.GetResult<Prisma.$SearchHistoryPayload, S>

  type SearchHistoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SearchHistoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SearchHistoryCountAggregateInputType | true
    }

  export interface SearchHistoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SearchHistory'], meta: { name: 'SearchHistory' } }
    /**
     * Find zero or one SearchHistory that matches the filter.
     * @param {SearchHistoryFindUniqueArgs} args - Arguments to find a SearchHistory
     * @example
     * // Get one SearchHistory
     * const searchHistory = await prisma.searchHistory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SearchHistoryFindUniqueArgs>(args: SelectSubset<T, SearchHistoryFindUniqueArgs<ExtArgs>>): Prisma__SearchHistoryClient<$Result.GetResult<Prisma.$SearchHistoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SearchHistory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SearchHistoryFindUniqueOrThrowArgs} args - Arguments to find a SearchHistory
     * @example
     * // Get one SearchHistory
     * const searchHistory = await prisma.searchHistory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SearchHistoryFindUniqueOrThrowArgs>(args: SelectSubset<T, SearchHistoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SearchHistoryClient<$Result.GetResult<Prisma.$SearchHistoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SearchHistory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SearchHistoryFindFirstArgs} args - Arguments to find a SearchHistory
     * @example
     * // Get one SearchHistory
     * const searchHistory = await prisma.searchHistory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SearchHistoryFindFirstArgs>(args?: SelectSubset<T, SearchHistoryFindFirstArgs<ExtArgs>>): Prisma__SearchHistoryClient<$Result.GetResult<Prisma.$SearchHistoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SearchHistory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SearchHistoryFindFirstOrThrowArgs} args - Arguments to find a SearchHistory
     * @example
     * // Get one SearchHistory
     * const searchHistory = await prisma.searchHistory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SearchHistoryFindFirstOrThrowArgs>(args?: SelectSubset<T, SearchHistoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__SearchHistoryClient<$Result.GetResult<Prisma.$SearchHistoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SearchHistories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SearchHistoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SearchHistories
     * const searchHistories = await prisma.searchHistory.findMany()
     * 
     * // Get first 10 SearchHistories
     * const searchHistories = await prisma.searchHistory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const searchHistoryWithIdOnly = await prisma.searchHistory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SearchHistoryFindManyArgs>(args?: SelectSubset<T, SearchHistoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SearchHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SearchHistory.
     * @param {SearchHistoryCreateArgs} args - Arguments to create a SearchHistory.
     * @example
     * // Create one SearchHistory
     * const SearchHistory = await prisma.searchHistory.create({
     *   data: {
     *     // ... data to create a SearchHistory
     *   }
     * })
     * 
     */
    create<T extends SearchHistoryCreateArgs>(args: SelectSubset<T, SearchHistoryCreateArgs<ExtArgs>>): Prisma__SearchHistoryClient<$Result.GetResult<Prisma.$SearchHistoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SearchHistories.
     * @param {SearchHistoryCreateManyArgs} args - Arguments to create many SearchHistories.
     * @example
     * // Create many SearchHistories
     * const searchHistory = await prisma.searchHistory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SearchHistoryCreateManyArgs>(args?: SelectSubset<T, SearchHistoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a SearchHistory.
     * @param {SearchHistoryDeleteArgs} args - Arguments to delete one SearchHistory.
     * @example
     * // Delete one SearchHistory
     * const SearchHistory = await prisma.searchHistory.delete({
     *   where: {
     *     // ... filter to delete one SearchHistory
     *   }
     * })
     * 
     */
    delete<T extends SearchHistoryDeleteArgs>(args: SelectSubset<T, SearchHistoryDeleteArgs<ExtArgs>>): Prisma__SearchHistoryClient<$Result.GetResult<Prisma.$SearchHistoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SearchHistory.
     * @param {SearchHistoryUpdateArgs} args - Arguments to update one SearchHistory.
     * @example
     * // Update one SearchHistory
     * const searchHistory = await prisma.searchHistory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SearchHistoryUpdateArgs>(args: SelectSubset<T, SearchHistoryUpdateArgs<ExtArgs>>): Prisma__SearchHistoryClient<$Result.GetResult<Prisma.$SearchHistoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SearchHistories.
     * @param {SearchHistoryDeleteManyArgs} args - Arguments to filter SearchHistories to delete.
     * @example
     * // Delete a few SearchHistories
     * const { count } = await prisma.searchHistory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SearchHistoryDeleteManyArgs>(args?: SelectSubset<T, SearchHistoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SearchHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SearchHistoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SearchHistories
     * const searchHistory = await prisma.searchHistory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SearchHistoryUpdateManyArgs>(args: SelectSubset<T, SearchHistoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SearchHistory.
     * @param {SearchHistoryUpsertArgs} args - Arguments to update or create a SearchHistory.
     * @example
     * // Update or create a SearchHistory
     * const searchHistory = await prisma.searchHistory.upsert({
     *   create: {
     *     // ... data to create a SearchHistory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SearchHistory we want to update
     *   }
     * })
     */
    upsert<T extends SearchHistoryUpsertArgs>(args: SelectSubset<T, SearchHistoryUpsertArgs<ExtArgs>>): Prisma__SearchHistoryClient<$Result.GetResult<Prisma.$SearchHistoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SearchHistories that matches the filter.
     * @param {SearchHistoryFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const searchHistory = await prisma.searchHistory.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: SearchHistoryFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a SearchHistory.
     * @param {SearchHistoryAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const searchHistory = await prisma.searchHistory.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: SearchHistoryAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of SearchHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SearchHistoryCountArgs} args - Arguments to filter SearchHistories to count.
     * @example
     * // Count the number of SearchHistories
     * const count = await prisma.searchHistory.count({
     *   where: {
     *     // ... the filter for the SearchHistories we want to count
     *   }
     * })
    **/
    count<T extends SearchHistoryCountArgs>(
      args?: Subset<T, SearchHistoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SearchHistoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SearchHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SearchHistoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SearchHistoryAggregateArgs>(args: Subset<T, SearchHistoryAggregateArgs>): Prisma.PrismaPromise<GetSearchHistoryAggregateType<T>>

    /**
     * Group by SearchHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SearchHistoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SearchHistoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SearchHistoryGroupByArgs['orderBy'] }
        : { orderBy?: SearchHistoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SearchHistoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSearchHistoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SearchHistory model
   */
  readonly fields: SearchHistoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SearchHistory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SearchHistoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SearchHistory model
   */
  interface SearchHistoryFieldRefs {
    readonly id: FieldRef<"SearchHistory", 'String'>
    readonly userId: FieldRef<"SearchHistory", 'String'>
    readonly query: FieldRef<"SearchHistory", 'String'>
    readonly searchedAt: FieldRef<"SearchHistory", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SearchHistory findUnique
   */
  export type SearchHistoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchHistory
     */
    select?: SearchHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the SearchHistory
     */
    omit?: SearchHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SearchHistoryInclude<ExtArgs> | null
    /**
     * Filter, which SearchHistory to fetch.
     */
    where: SearchHistoryWhereUniqueInput
  }

  /**
   * SearchHistory findUniqueOrThrow
   */
  export type SearchHistoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchHistory
     */
    select?: SearchHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the SearchHistory
     */
    omit?: SearchHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SearchHistoryInclude<ExtArgs> | null
    /**
     * Filter, which SearchHistory to fetch.
     */
    where: SearchHistoryWhereUniqueInput
  }

  /**
   * SearchHistory findFirst
   */
  export type SearchHistoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchHistory
     */
    select?: SearchHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the SearchHistory
     */
    omit?: SearchHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SearchHistoryInclude<ExtArgs> | null
    /**
     * Filter, which SearchHistory to fetch.
     */
    where?: SearchHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SearchHistories to fetch.
     */
    orderBy?: SearchHistoryOrderByWithRelationInput | SearchHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SearchHistories.
     */
    cursor?: SearchHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SearchHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SearchHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SearchHistories.
     */
    distinct?: SearchHistoryScalarFieldEnum | SearchHistoryScalarFieldEnum[]
  }

  /**
   * SearchHistory findFirstOrThrow
   */
  export type SearchHistoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchHistory
     */
    select?: SearchHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the SearchHistory
     */
    omit?: SearchHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SearchHistoryInclude<ExtArgs> | null
    /**
     * Filter, which SearchHistory to fetch.
     */
    where?: SearchHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SearchHistories to fetch.
     */
    orderBy?: SearchHistoryOrderByWithRelationInput | SearchHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SearchHistories.
     */
    cursor?: SearchHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SearchHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SearchHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SearchHistories.
     */
    distinct?: SearchHistoryScalarFieldEnum | SearchHistoryScalarFieldEnum[]
  }

  /**
   * SearchHistory findMany
   */
  export type SearchHistoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchHistory
     */
    select?: SearchHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the SearchHistory
     */
    omit?: SearchHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SearchHistoryInclude<ExtArgs> | null
    /**
     * Filter, which SearchHistories to fetch.
     */
    where?: SearchHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SearchHistories to fetch.
     */
    orderBy?: SearchHistoryOrderByWithRelationInput | SearchHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SearchHistories.
     */
    cursor?: SearchHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SearchHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SearchHistories.
     */
    skip?: number
    distinct?: SearchHistoryScalarFieldEnum | SearchHistoryScalarFieldEnum[]
  }

  /**
   * SearchHistory create
   */
  export type SearchHistoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchHistory
     */
    select?: SearchHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the SearchHistory
     */
    omit?: SearchHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SearchHistoryInclude<ExtArgs> | null
    /**
     * The data needed to create a SearchHistory.
     */
    data: XOR<SearchHistoryCreateInput, SearchHistoryUncheckedCreateInput>
  }

  /**
   * SearchHistory createMany
   */
  export type SearchHistoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SearchHistories.
     */
    data: SearchHistoryCreateManyInput | SearchHistoryCreateManyInput[]
  }

  /**
   * SearchHistory update
   */
  export type SearchHistoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchHistory
     */
    select?: SearchHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the SearchHistory
     */
    omit?: SearchHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SearchHistoryInclude<ExtArgs> | null
    /**
     * The data needed to update a SearchHistory.
     */
    data: XOR<SearchHistoryUpdateInput, SearchHistoryUncheckedUpdateInput>
    /**
     * Choose, which SearchHistory to update.
     */
    where: SearchHistoryWhereUniqueInput
  }

  /**
   * SearchHistory updateMany
   */
  export type SearchHistoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SearchHistories.
     */
    data: XOR<SearchHistoryUpdateManyMutationInput, SearchHistoryUncheckedUpdateManyInput>
    /**
     * Filter which SearchHistories to update
     */
    where?: SearchHistoryWhereInput
    /**
     * Limit how many SearchHistories to update.
     */
    limit?: number
  }

  /**
   * SearchHistory upsert
   */
  export type SearchHistoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchHistory
     */
    select?: SearchHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the SearchHistory
     */
    omit?: SearchHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SearchHistoryInclude<ExtArgs> | null
    /**
     * The filter to search for the SearchHistory to update in case it exists.
     */
    where: SearchHistoryWhereUniqueInput
    /**
     * In case the SearchHistory found by the `where` argument doesn't exist, create a new SearchHistory with this data.
     */
    create: XOR<SearchHistoryCreateInput, SearchHistoryUncheckedCreateInput>
    /**
     * In case the SearchHistory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SearchHistoryUpdateInput, SearchHistoryUncheckedUpdateInput>
  }

  /**
   * SearchHistory delete
   */
  export type SearchHistoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchHistory
     */
    select?: SearchHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the SearchHistory
     */
    omit?: SearchHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SearchHistoryInclude<ExtArgs> | null
    /**
     * Filter which SearchHistory to delete.
     */
    where: SearchHistoryWhereUniqueInput
  }

  /**
   * SearchHistory deleteMany
   */
  export type SearchHistoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SearchHistories to delete
     */
    where?: SearchHistoryWhereInput
    /**
     * Limit how many SearchHistories to delete.
     */
    limit?: number
  }

  /**
   * SearchHistory findRaw
   */
  export type SearchHistoryFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * SearchHistory aggregateRaw
   */
  export type SearchHistoryAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * SearchHistory without action
   */
  export type SearchHistoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchHistory
     */
    select?: SearchHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the SearchHistory
     */
    omit?: SearchHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SearchHistoryInclude<ExtArgs> | null
  }


  /**
   * Model ViewedProduct
   */

  export type AggregateViewedProduct = {
    _count: ViewedProductCountAggregateOutputType | null
    _min: ViewedProductMinAggregateOutputType | null
    _max: ViewedProductMaxAggregateOutputType | null
  }

  export type ViewedProductMinAggregateOutputType = {
    id: string | null
    userId: string | null
    viewedAt: Date | null
    slug: string | null
  }

  export type ViewedProductMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    viewedAt: Date | null
    slug: string | null
  }

  export type ViewedProductCountAggregateOutputType = {
    id: number
    userId: number
    viewedAt: number
    product: number
    slug: number
    _all: number
  }


  export type ViewedProductMinAggregateInputType = {
    id?: true
    userId?: true
    viewedAt?: true
    slug?: true
  }

  export type ViewedProductMaxAggregateInputType = {
    id?: true
    userId?: true
    viewedAt?: true
    slug?: true
  }

  export type ViewedProductCountAggregateInputType = {
    id?: true
    userId?: true
    viewedAt?: true
    product?: true
    slug?: true
    _all?: true
  }

  export type ViewedProductAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ViewedProduct to aggregate.
     */
    where?: ViewedProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ViewedProducts to fetch.
     */
    orderBy?: ViewedProductOrderByWithRelationInput | ViewedProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ViewedProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ViewedProducts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ViewedProducts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ViewedProducts
    **/
    _count?: true | ViewedProductCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ViewedProductMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ViewedProductMaxAggregateInputType
  }

  export type GetViewedProductAggregateType<T extends ViewedProductAggregateArgs> = {
        [P in keyof T & keyof AggregateViewedProduct]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateViewedProduct[P]>
      : GetScalarType<T[P], AggregateViewedProduct[P]>
  }




  export type ViewedProductGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ViewedProductWhereInput
    orderBy?: ViewedProductOrderByWithAggregationInput | ViewedProductOrderByWithAggregationInput[]
    by: ViewedProductScalarFieldEnum[] | ViewedProductScalarFieldEnum
    having?: ViewedProductScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ViewedProductCountAggregateInputType | true
    _min?: ViewedProductMinAggregateInputType
    _max?: ViewedProductMaxAggregateInputType
  }

  export type ViewedProductGroupByOutputType = {
    id: string
    userId: string
    viewedAt: Date
    product: JsonValue
    slug: string
    _count: ViewedProductCountAggregateOutputType | null
    _min: ViewedProductMinAggregateOutputType | null
    _max: ViewedProductMaxAggregateOutputType | null
  }

  type GetViewedProductGroupByPayload<T extends ViewedProductGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ViewedProductGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ViewedProductGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ViewedProductGroupByOutputType[P]>
            : GetScalarType<T[P], ViewedProductGroupByOutputType[P]>
        }
      >
    >


  export type ViewedProductSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    viewedAt?: boolean
    product?: boolean
    slug?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["viewedProduct"]>



  export type ViewedProductSelectScalar = {
    id?: boolean
    userId?: boolean
    viewedAt?: boolean
    product?: boolean
    slug?: boolean
  }

  export type ViewedProductOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "viewedAt" | "product" | "slug", ExtArgs["result"]["viewedProduct"]>
  export type ViewedProductInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ViewedProductPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ViewedProduct"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      viewedAt: Date
      product: Prisma.JsonValue
      slug: string
    }, ExtArgs["result"]["viewedProduct"]>
    composites: {}
  }

  type ViewedProductGetPayload<S extends boolean | null | undefined | ViewedProductDefaultArgs> = $Result.GetResult<Prisma.$ViewedProductPayload, S>

  type ViewedProductCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ViewedProductFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ViewedProductCountAggregateInputType | true
    }

  export interface ViewedProductDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ViewedProduct'], meta: { name: 'ViewedProduct' } }
    /**
     * Find zero or one ViewedProduct that matches the filter.
     * @param {ViewedProductFindUniqueArgs} args - Arguments to find a ViewedProduct
     * @example
     * // Get one ViewedProduct
     * const viewedProduct = await prisma.viewedProduct.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ViewedProductFindUniqueArgs>(args: SelectSubset<T, ViewedProductFindUniqueArgs<ExtArgs>>): Prisma__ViewedProductClient<$Result.GetResult<Prisma.$ViewedProductPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ViewedProduct that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ViewedProductFindUniqueOrThrowArgs} args - Arguments to find a ViewedProduct
     * @example
     * // Get one ViewedProduct
     * const viewedProduct = await prisma.viewedProduct.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ViewedProductFindUniqueOrThrowArgs>(args: SelectSubset<T, ViewedProductFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ViewedProductClient<$Result.GetResult<Prisma.$ViewedProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ViewedProduct that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ViewedProductFindFirstArgs} args - Arguments to find a ViewedProduct
     * @example
     * // Get one ViewedProduct
     * const viewedProduct = await prisma.viewedProduct.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ViewedProductFindFirstArgs>(args?: SelectSubset<T, ViewedProductFindFirstArgs<ExtArgs>>): Prisma__ViewedProductClient<$Result.GetResult<Prisma.$ViewedProductPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ViewedProduct that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ViewedProductFindFirstOrThrowArgs} args - Arguments to find a ViewedProduct
     * @example
     * // Get one ViewedProduct
     * const viewedProduct = await prisma.viewedProduct.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ViewedProductFindFirstOrThrowArgs>(args?: SelectSubset<T, ViewedProductFindFirstOrThrowArgs<ExtArgs>>): Prisma__ViewedProductClient<$Result.GetResult<Prisma.$ViewedProductPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ViewedProducts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ViewedProductFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ViewedProducts
     * const viewedProducts = await prisma.viewedProduct.findMany()
     * 
     * // Get first 10 ViewedProducts
     * const viewedProducts = await prisma.viewedProduct.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const viewedProductWithIdOnly = await prisma.viewedProduct.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ViewedProductFindManyArgs>(args?: SelectSubset<T, ViewedProductFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ViewedProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ViewedProduct.
     * @param {ViewedProductCreateArgs} args - Arguments to create a ViewedProduct.
     * @example
     * // Create one ViewedProduct
     * const ViewedProduct = await prisma.viewedProduct.create({
     *   data: {
     *     // ... data to create a ViewedProduct
     *   }
     * })
     * 
     */
    create<T extends ViewedProductCreateArgs>(args: SelectSubset<T, ViewedProductCreateArgs<ExtArgs>>): Prisma__ViewedProductClient<$Result.GetResult<Prisma.$ViewedProductPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ViewedProducts.
     * @param {ViewedProductCreateManyArgs} args - Arguments to create many ViewedProducts.
     * @example
     * // Create many ViewedProducts
     * const viewedProduct = await prisma.viewedProduct.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ViewedProductCreateManyArgs>(args?: SelectSubset<T, ViewedProductCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ViewedProduct.
     * @param {ViewedProductDeleteArgs} args - Arguments to delete one ViewedProduct.
     * @example
     * // Delete one ViewedProduct
     * const ViewedProduct = await prisma.viewedProduct.delete({
     *   where: {
     *     // ... filter to delete one ViewedProduct
     *   }
     * })
     * 
     */
    delete<T extends ViewedProductDeleteArgs>(args: SelectSubset<T, ViewedProductDeleteArgs<ExtArgs>>): Prisma__ViewedProductClient<$Result.GetResult<Prisma.$ViewedProductPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ViewedProduct.
     * @param {ViewedProductUpdateArgs} args - Arguments to update one ViewedProduct.
     * @example
     * // Update one ViewedProduct
     * const viewedProduct = await prisma.viewedProduct.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ViewedProductUpdateArgs>(args: SelectSubset<T, ViewedProductUpdateArgs<ExtArgs>>): Prisma__ViewedProductClient<$Result.GetResult<Prisma.$ViewedProductPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ViewedProducts.
     * @param {ViewedProductDeleteManyArgs} args - Arguments to filter ViewedProducts to delete.
     * @example
     * // Delete a few ViewedProducts
     * const { count } = await prisma.viewedProduct.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ViewedProductDeleteManyArgs>(args?: SelectSubset<T, ViewedProductDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ViewedProducts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ViewedProductUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ViewedProducts
     * const viewedProduct = await prisma.viewedProduct.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ViewedProductUpdateManyArgs>(args: SelectSubset<T, ViewedProductUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ViewedProduct.
     * @param {ViewedProductUpsertArgs} args - Arguments to update or create a ViewedProduct.
     * @example
     * // Update or create a ViewedProduct
     * const viewedProduct = await prisma.viewedProduct.upsert({
     *   create: {
     *     // ... data to create a ViewedProduct
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ViewedProduct we want to update
     *   }
     * })
     */
    upsert<T extends ViewedProductUpsertArgs>(args: SelectSubset<T, ViewedProductUpsertArgs<ExtArgs>>): Prisma__ViewedProductClient<$Result.GetResult<Prisma.$ViewedProductPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ViewedProducts that matches the filter.
     * @param {ViewedProductFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const viewedProduct = await prisma.viewedProduct.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: ViewedProductFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a ViewedProduct.
     * @param {ViewedProductAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const viewedProduct = await prisma.viewedProduct.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: ViewedProductAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of ViewedProducts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ViewedProductCountArgs} args - Arguments to filter ViewedProducts to count.
     * @example
     * // Count the number of ViewedProducts
     * const count = await prisma.viewedProduct.count({
     *   where: {
     *     // ... the filter for the ViewedProducts we want to count
     *   }
     * })
    **/
    count<T extends ViewedProductCountArgs>(
      args?: Subset<T, ViewedProductCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ViewedProductCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ViewedProduct.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ViewedProductAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ViewedProductAggregateArgs>(args: Subset<T, ViewedProductAggregateArgs>): Prisma.PrismaPromise<GetViewedProductAggregateType<T>>

    /**
     * Group by ViewedProduct.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ViewedProductGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ViewedProductGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ViewedProductGroupByArgs['orderBy'] }
        : { orderBy?: ViewedProductGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ViewedProductGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetViewedProductGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ViewedProduct model
   */
  readonly fields: ViewedProductFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ViewedProduct.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ViewedProductClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ViewedProduct model
   */
  interface ViewedProductFieldRefs {
    readonly id: FieldRef<"ViewedProduct", 'String'>
    readonly userId: FieldRef<"ViewedProduct", 'String'>
    readonly viewedAt: FieldRef<"ViewedProduct", 'DateTime'>
    readonly product: FieldRef<"ViewedProduct", 'Json'>
    readonly slug: FieldRef<"ViewedProduct", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ViewedProduct findUnique
   */
  export type ViewedProductFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ViewedProduct
     */
    select?: ViewedProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ViewedProduct
     */
    omit?: ViewedProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ViewedProductInclude<ExtArgs> | null
    /**
     * Filter, which ViewedProduct to fetch.
     */
    where: ViewedProductWhereUniqueInput
  }

  /**
   * ViewedProduct findUniqueOrThrow
   */
  export type ViewedProductFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ViewedProduct
     */
    select?: ViewedProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ViewedProduct
     */
    omit?: ViewedProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ViewedProductInclude<ExtArgs> | null
    /**
     * Filter, which ViewedProduct to fetch.
     */
    where: ViewedProductWhereUniqueInput
  }

  /**
   * ViewedProduct findFirst
   */
  export type ViewedProductFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ViewedProduct
     */
    select?: ViewedProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ViewedProduct
     */
    omit?: ViewedProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ViewedProductInclude<ExtArgs> | null
    /**
     * Filter, which ViewedProduct to fetch.
     */
    where?: ViewedProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ViewedProducts to fetch.
     */
    orderBy?: ViewedProductOrderByWithRelationInput | ViewedProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ViewedProducts.
     */
    cursor?: ViewedProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ViewedProducts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ViewedProducts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ViewedProducts.
     */
    distinct?: ViewedProductScalarFieldEnum | ViewedProductScalarFieldEnum[]
  }

  /**
   * ViewedProduct findFirstOrThrow
   */
  export type ViewedProductFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ViewedProduct
     */
    select?: ViewedProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ViewedProduct
     */
    omit?: ViewedProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ViewedProductInclude<ExtArgs> | null
    /**
     * Filter, which ViewedProduct to fetch.
     */
    where?: ViewedProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ViewedProducts to fetch.
     */
    orderBy?: ViewedProductOrderByWithRelationInput | ViewedProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ViewedProducts.
     */
    cursor?: ViewedProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ViewedProducts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ViewedProducts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ViewedProducts.
     */
    distinct?: ViewedProductScalarFieldEnum | ViewedProductScalarFieldEnum[]
  }

  /**
   * ViewedProduct findMany
   */
  export type ViewedProductFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ViewedProduct
     */
    select?: ViewedProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ViewedProduct
     */
    omit?: ViewedProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ViewedProductInclude<ExtArgs> | null
    /**
     * Filter, which ViewedProducts to fetch.
     */
    where?: ViewedProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ViewedProducts to fetch.
     */
    orderBy?: ViewedProductOrderByWithRelationInput | ViewedProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ViewedProducts.
     */
    cursor?: ViewedProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ViewedProducts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ViewedProducts.
     */
    skip?: number
    distinct?: ViewedProductScalarFieldEnum | ViewedProductScalarFieldEnum[]
  }

  /**
   * ViewedProduct create
   */
  export type ViewedProductCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ViewedProduct
     */
    select?: ViewedProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ViewedProduct
     */
    omit?: ViewedProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ViewedProductInclude<ExtArgs> | null
    /**
     * The data needed to create a ViewedProduct.
     */
    data: XOR<ViewedProductCreateInput, ViewedProductUncheckedCreateInput>
  }

  /**
   * ViewedProduct createMany
   */
  export type ViewedProductCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ViewedProducts.
     */
    data: ViewedProductCreateManyInput | ViewedProductCreateManyInput[]
  }

  /**
   * ViewedProduct update
   */
  export type ViewedProductUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ViewedProduct
     */
    select?: ViewedProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ViewedProduct
     */
    omit?: ViewedProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ViewedProductInclude<ExtArgs> | null
    /**
     * The data needed to update a ViewedProduct.
     */
    data: XOR<ViewedProductUpdateInput, ViewedProductUncheckedUpdateInput>
    /**
     * Choose, which ViewedProduct to update.
     */
    where: ViewedProductWhereUniqueInput
  }

  /**
   * ViewedProduct updateMany
   */
  export type ViewedProductUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ViewedProducts.
     */
    data: XOR<ViewedProductUpdateManyMutationInput, ViewedProductUncheckedUpdateManyInput>
    /**
     * Filter which ViewedProducts to update
     */
    where?: ViewedProductWhereInput
    /**
     * Limit how many ViewedProducts to update.
     */
    limit?: number
  }

  /**
   * ViewedProduct upsert
   */
  export type ViewedProductUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ViewedProduct
     */
    select?: ViewedProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ViewedProduct
     */
    omit?: ViewedProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ViewedProductInclude<ExtArgs> | null
    /**
     * The filter to search for the ViewedProduct to update in case it exists.
     */
    where: ViewedProductWhereUniqueInput
    /**
     * In case the ViewedProduct found by the `where` argument doesn't exist, create a new ViewedProduct with this data.
     */
    create: XOR<ViewedProductCreateInput, ViewedProductUncheckedCreateInput>
    /**
     * In case the ViewedProduct was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ViewedProductUpdateInput, ViewedProductUncheckedUpdateInput>
  }

  /**
   * ViewedProduct delete
   */
  export type ViewedProductDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ViewedProduct
     */
    select?: ViewedProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ViewedProduct
     */
    omit?: ViewedProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ViewedProductInclude<ExtArgs> | null
    /**
     * Filter which ViewedProduct to delete.
     */
    where: ViewedProductWhereUniqueInput
  }

  /**
   * ViewedProduct deleteMany
   */
  export type ViewedProductDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ViewedProducts to delete
     */
    where?: ViewedProductWhereInput
    /**
     * Limit how many ViewedProducts to delete.
     */
    limit?: number
  }

  /**
   * ViewedProduct findRaw
   */
  export type ViewedProductFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * ViewedProduct aggregateRaw
   */
  export type ViewedProductAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * ViewedProduct without action
   */
  export type ViewedProductDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ViewedProduct
     */
    select?: ViewedProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ViewedProduct
     */
    omit?: ViewedProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ViewedProductInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    firstName: 'firstName',
    lastName: 'lastName',
    imageUrl: 'imageUrl',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    clerkUserId: 'clerkUserId'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const CatalogScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug'
  };

  export type CatalogScalarFieldEnum = (typeof CatalogScalarFieldEnum)[keyof typeof CatalogScalarFieldEnum]


  export const CategoryScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    parentCategory: 'parentCategory',
    catalogId: 'catalogId'
  };

  export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum]


  export const SubcategoryScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    parentCategory: 'parentCategory',
    categoryId: 'categoryId'
  };

  export type SubcategoryScalarFieldEnum = (typeof SubcategoryScalarFieldEnum)[keyof typeof SubcategoryScalarFieldEnum]


  export const ProductScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    description: 'description',
    price: 'price',
    quantity: 'quantity',
    images: 'images',
    sizes: 'sizes',
    colors: 'colors',
    tags: 'tags',
    subcategoryId: 'subcategoryId'
  };

  export type ProductScalarFieldEnum = (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum]


  export const ReviewScalarFieldEnum: {
    id: 'id',
    reviewerId: 'reviewerId',
    rating: 'rating',
    title: 'title',
    details: 'details',
    date: 'date',
    productId: 'productId',
    verified: 'verified'
  };

  export type ReviewScalarFieldEnum = (typeof ReviewScalarFieldEnum)[keyof typeof ReviewScalarFieldEnum]


  export const OrderScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type OrderScalarFieldEnum = (typeof OrderScalarFieldEnum)[keyof typeof OrderScalarFieldEnum]


  export const OrderItemScalarFieldEnum: {
    id: 'id',
    orderId: 'orderId',
    productId: 'productId',
    quantity: 'quantity'
  };

  export type OrderItemScalarFieldEnum = (typeof OrderItemScalarFieldEnum)[keyof typeof OrderItemScalarFieldEnum]


  export const WishListScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    productId: 'productId',
    selectedSize: 'selectedSize',
    selectedColor: 'selectedColor',
    createdAt: 'createdAt'
  };

  export type WishListScalarFieldEnum = (typeof WishListScalarFieldEnum)[keyof typeof WishListScalarFieldEnum]


  export const PopularSearchScalarFieldEnum: {
    id: 'id',
    query: 'query',
    count: 'count',
    lastSearched: 'lastSearched'
  };

  export type PopularSearchScalarFieldEnum = (typeof PopularSearchScalarFieldEnum)[keyof typeof PopularSearchScalarFieldEnum]


  export const SearchHistoryScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    query: 'query',
    searchedAt: 'searchedAt'
  };

  export type SearchHistoryScalarFieldEnum = (typeof SearchHistoryScalarFieldEnum)[keyof typeof SearchHistoryScalarFieldEnum]


  export const ViewedProductScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    viewedAt: 'viewedAt',
    product: 'product',
    slug: 'slug'
  };

  export type ViewedProductScalarFieldEnum = (typeof ViewedProductScalarFieldEnum)[keyof typeof ViewedProductScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Tag[]'
   */
  export type ListEnumTagFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Tag[]'>
    


  /**
   * Reference to a field of type 'Tag'
   */
  export type EnumTagFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Tag'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    firstName?: StringFilter<"User"> | string
    lastName?: StringFilter<"User"> | string
    imageUrl?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    clerkUserId?: StringNullableFilter<"User"> | string | null
    wishList?: WishListListRelationFilter
    reviews?: ReviewListRelationFilter
    orders?: OrderListRelationFilter
    viewedProducts?: ViewedProductListRelationFilter
    searchHistories?: SearchHistoryListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    clerkUserId?: SortOrder
    wishList?: WishListOrderByRelationAggregateInput
    reviews?: ReviewOrderByRelationAggregateInput
    orders?: OrderOrderByRelationAggregateInput
    viewedProducts?: ViewedProductOrderByRelationAggregateInput
    searchHistories?: SearchHistoryOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    firstName?: StringFilter<"User"> | string
    lastName?: StringFilter<"User"> | string
    imageUrl?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    clerkUserId?: StringNullableFilter<"User"> | string | null
    wishList?: WishListListRelationFilter
    reviews?: ReviewListRelationFilter
    orders?: OrderListRelationFilter
    viewedProducts?: ViewedProductListRelationFilter
    searchHistories?: SearchHistoryListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    clerkUserId?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    firstName?: StringWithAggregatesFilter<"User"> | string
    lastName?: StringWithAggregatesFilter<"User"> | string
    imageUrl?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    clerkUserId?: StringNullableWithAggregatesFilter<"User"> | string | null
  }

  export type CatalogWhereInput = {
    AND?: CatalogWhereInput | CatalogWhereInput[]
    OR?: CatalogWhereInput[]
    NOT?: CatalogWhereInput | CatalogWhereInput[]
    id?: StringFilter<"Catalog"> | string
    name?: StringFilter<"Catalog"> | string
    slug?: StringFilter<"Catalog"> | string
    categories?: CategoryListRelationFilter
  }

  export type CatalogOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    categories?: CategoryOrderByRelationAggregateInput
  }

  export type CatalogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CatalogWhereInput | CatalogWhereInput[]
    OR?: CatalogWhereInput[]
    NOT?: CatalogWhereInput | CatalogWhereInput[]
    name?: StringFilter<"Catalog"> | string
    slug?: StringFilter<"Catalog"> | string
    categories?: CategoryListRelationFilter
  }, "id">

  export type CatalogOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    _count?: CatalogCountOrderByAggregateInput
    _max?: CatalogMaxOrderByAggregateInput
    _min?: CatalogMinOrderByAggregateInput
  }

  export type CatalogScalarWhereWithAggregatesInput = {
    AND?: CatalogScalarWhereWithAggregatesInput | CatalogScalarWhereWithAggregatesInput[]
    OR?: CatalogScalarWhereWithAggregatesInput[]
    NOT?: CatalogScalarWhereWithAggregatesInput | CatalogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Catalog"> | string
    name?: StringWithAggregatesFilter<"Catalog"> | string
    slug?: StringWithAggregatesFilter<"Catalog"> | string
  }

  export type CategoryWhereInput = {
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    id?: StringFilter<"Category"> | string
    name?: StringFilter<"Category"> | string
    slug?: StringFilter<"Category"> | string
    parentCategory?: StringNullableFilter<"Category"> | string | null
    catalogId?: StringFilter<"Category"> | string
    subcategories?: SubcategoryListRelationFilter
    catalog?: XOR<CatalogScalarRelationFilter, CatalogWhereInput>
  }

  export type CategoryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    parentCategory?: SortOrder
    catalogId?: SortOrder
    subcategories?: SubcategoryOrderByRelationAggregateInput
    catalog?: CatalogOrderByWithRelationInput
  }

  export type CategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    name?: StringFilter<"Category"> | string
    slug?: StringFilter<"Category"> | string
    parentCategory?: StringNullableFilter<"Category"> | string | null
    catalogId?: StringFilter<"Category"> | string
    subcategories?: SubcategoryListRelationFilter
    catalog?: XOR<CatalogScalarRelationFilter, CatalogWhereInput>
  }, "id">

  export type CategoryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    parentCategory?: SortOrder
    catalogId?: SortOrder
    _count?: CategoryCountOrderByAggregateInput
    _max?: CategoryMaxOrderByAggregateInput
    _min?: CategoryMinOrderByAggregateInput
  }

  export type CategoryScalarWhereWithAggregatesInput = {
    AND?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    OR?: CategoryScalarWhereWithAggregatesInput[]
    NOT?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Category"> | string
    name?: StringWithAggregatesFilter<"Category"> | string
    slug?: StringWithAggregatesFilter<"Category"> | string
    parentCategory?: StringNullableWithAggregatesFilter<"Category"> | string | null
    catalogId?: StringWithAggregatesFilter<"Category"> | string
  }

  export type SubcategoryWhereInput = {
    AND?: SubcategoryWhereInput | SubcategoryWhereInput[]
    OR?: SubcategoryWhereInput[]
    NOT?: SubcategoryWhereInput | SubcategoryWhereInput[]
    id?: StringFilter<"Subcategory"> | string
    name?: StringFilter<"Subcategory"> | string
    slug?: StringFilter<"Subcategory"> | string
    parentCategory?: StringNullableFilter<"Subcategory"> | string | null
    categoryId?: StringFilter<"Subcategory"> | string
    category?: XOR<CategoryScalarRelationFilter, CategoryWhereInput>
    products?: ProductListRelationFilter
  }

  export type SubcategoryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    parentCategory?: SortOrder
    categoryId?: SortOrder
    category?: CategoryOrderByWithRelationInput
    products?: ProductOrderByRelationAggregateInput
  }

  export type SubcategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SubcategoryWhereInput | SubcategoryWhereInput[]
    OR?: SubcategoryWhereInput[]
    NOT?: SubcategoryWhereInput | SubcategoryWhereInput[]
    name?: StringFilter<"Subcategory"> | string
    slug?: StringFilter<"Subcategory"> | string
    parentCategory?: StringNullableFilter<"Subcategory"> | string | null
    categoryId?: StringFilter<"Subcategory"> | string
    category?: XOR<CategoryScalarRelationFilter, CategoryWhereInput>
    products?: ProductListRelationFilter
  }, "id">

  export type SubcategoryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    parentCategory?: SortOrder
    categoryId?: SortOrder
    _count?: SubcategoryCountOrderByAggregateInput
    _max?: SubcategoryMaxOrderByAggregateInput
    _min?: SubcategoryMinOrderByAggregateInput
  }

  export type SubcategoryScalarWhereWithAggregatesInput = {
    AND?: SubcategoryScalarWhereWithAggregatesInput | SubcategoryScalarWhereWithAggregatesInput[]
    OR?: SubcategoryScalarWhereWithAggregatesInput[]
    NOT?: SubcategoryScalarWhereWithAggregatesInput | SubcategoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Subcategory"> | string
    name?: StringWithAggregatesFilter<"Subcategory"> | string
    slug?: StringWithAggregatesFilter<"Subcategory"> | string
    parentCategory?: StringNullableWithAggregatesFilter<"Subcategory"> | string | null
    categoryId?: StringWithAggregatesFilter<"Subcategory"> | string
  }

  export type ProductWhereInput = {
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    id?: StringFilter<"Product"> | string
    name?: StringFilter<"Product"> | string
    slug?: StringFilter<"Product"> | string
    description?: StringFilter<"Product"> | string
    price?: FloatFilter<"Product"> | number
    quantity?: IntFilter<"Product"> | number
    images?: StringNullableListFilter<"Product">
    sizes?: StringNullableListFilter<"Product">
    colors?: StringNullableListFilter<"Product">
    tags?: EnumTagNullableListFilter<"Product">
    subcategoryId?: StringFilter<"Product"> | string
    reviews?: ReviewListRelationFilter
    subcategory?: XOR<SubcategoryScalarRelationFilter, SubcategoryWhereInput>
    orderItems?: OrderItemListRelationFilter
    wishLists?: WishListListRelationFilter
  }

  export type ProductOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    price?: SortOrder
    quantity?: SortOrder
    images?: SortOrder
    sizes?: SortOrder
    colors?: SortOrder
    tags?: SortOrder
    subcategoryId?: SortOrder
    reviews?: ReviewOrderByRelationAggregateInput
    subcategory?: SubcategoryOrderByWithRelationInput
    orderItems?: OrderItemOrderByRelationAggregateInput
    wishLists?: WishListOrderByRelationAggregateInput
  }

  export type ProductWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    name?: StringFilter<"Product"> | string
    description?: StringFilter<"Product"> | string
    price?: FloatFilter<"Product"> | number
    quantity?: IntFilter<"Product"> | number
    images?: StringNullableListFilter<"Product">
    sizes?: StringNullableListFilter<"Product">
    colors?: StringNullableListFilter<"Product">
    tags?: EnumTagNullableListFilter<"Product">
    subcategoryId?: StringFilter<"Product"> | string
    reviews?: ReviewListRelationFilter
    subcategory?: XOR<SubcategoryScalarRelationFilter, SubcategoryWhereInput>
    orderItems?: OrderItemListRelationFilter
    wishLists?: WishListListRelationFilter
  }, "id" | "slug">

  export type ProductOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    price?: SortOrder
    quantity?: SortOrder
    images?: SortOrder
    sizes?: SortOrder
    colors?: SortOrder
    tags?: SortOrder
    subcategoryId?: SortOrder
    _count?: ProductCountOrderByAggregateInput
    _avg?: ProductAvgOrderByAggregateInput
    _max?: ProductMaxOrderByAggregateInput
    _min?: ProductMinOrderByAggregateInput
    _sum?: ProductSumOrderByAggregateInput
  }

  export type ProductScalarWhereWithAggregatesInput = {
    AND?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    OR?: ProductScalarWhereWithAggregatesInput[]
    NOT?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Product"> | string
    name?: StringWithAggregatesFilter<"Product"> | string
    slug?: StringWithAggregatesFilter<"Product"> | string
    description?: StringWithAggregatesFilter<"Product"> | string
    price?: FloatWithAggregatesFilter<"Product"> | number
    quantity?: IntWithAggregatesFilter<"Product"> | number
    images?: StringNullableListFilter<"Product">
    sizes?: StringNullableListFilter<"Product">
    colors?: StringNullableListFilter<"Product">
    tags?: EnumTagNullableListFilter<"Product">
    subcategoryId?: StringWithAggregatesFilter<"Product"> | string
  }

  export type ReviewWhereInput = {
    AND?: ReviewWhereInput | ReviewWhereInput[]
    OR?: ReviewWhereInput[]
    NOT?: ReviewWhereInput | ReviewWhereInput[]
    id?: StringFilter<"Review"> | string
    reviewerId?: StringFilter<"Review"> | string
    rating?: IntFilter<"Review"> | number
    title?: StringFilter<"Review"> | string
    details?: StringFilter<"Review"> | string
    date?: DateTimeFilter<"Review"> | Date | string
    productId?: StringFilter<"Review"> | string
    verified?: BoolFilter<"Review"> | boolean
    reviewer?: XOR<UserScalarRelationFilter, UserWhereInput>
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
  }

  export type ReviewOrderByWithRelationInput = {
    id?: SortOrder
    reviewerId?: SortOrder
    rating?: SortOrder
    title?: SortOrder
    details?: SortOrder
    date?: SortOrder
    productId?: SortOrder
    verified?: SortOrder
    reviewer?: UserOrderByWithRelationInput
    product?: ProductOrderByWithRelationInput
  }

  export type ReviewWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ReviewWhereInput | ReviewWhereInput[]
    OR?: ReviewWhereInput[]
    NOT?: ReviewWhereInput | ReviewWhereInput[]
    reviewerId?: StringFilter<"Review"> | string
    rating?: IntFilter<"Review"> | number
    title?: StringFilter<"Review"> | string
    details?: StringFilter<"Review"> | string
    date?: DateTimeFilter<"Review"> | Date | string
    productId?: StringFilter<"Review"> | string
    verified?: BoolFilter<"Review"> | boolean
    reviewer?: XOR<UserScalarRelationFilter, UserWhereInput>
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
  }, "id">

  export type ReviewOrderByWithAggregationInput = {
    id?: SortOrder
    reviewerId?: SortOrder
    rating?: SortOrder
    title?: SortOrder
    details?: SortOrder
    date?: SortOrder
    productId?: SortOrder
    verified?: SortOrder
    _count?: ReviewCountOrderByAggregateInput
    _avg?: ReviewAvgOrderByAggregateInput
    _max?: ReviewMaxOrderByAggregateInput
    _min?: ReviewMinOrderByAggregateInput
    _sum?: ReviewSumOrderByAggregateInput
  }

  export type ReviewScalarWhereWithAggregatesInput = {
    AND?: ReviewScalarWhereWithAggregatesInput | ReviewScalarWhereWithAggregatesInput[]
    OR?: ReviewScalarWhereWithAggregatesInput[]
    NOT?: ReviewScalarWhereWithAggregatesInput | ReviewScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Review"> | string
    reviewerId?: StringWithAggregatesFilter<"Review"> | string
    rating?: IntWithAggregatesFilter<"Review"> | number
    title?: StringWithAggregatesFilter<"Review"> | string
    details?: StringWithAggregatesFilter<"Review"> | string
    date?: DateTimeWithAggregatesFilter<"Review"> | Date | string
    productId?: StringWithAggregatesFilter<"Review"> | string
    verified?: BoolWithAggregatesFilter<"Review"> | boolean
  }

  export type OrderWhereInput = {
    AND?: OrderWhereInput | OrderWhereInput[]
    OR?: OrderWhereInput[]
    NOT?: OrderWhereInput | OrderWhereInput[]
    id?: StringFilter<"Order"> | string
    userId?: StringFilter<"Order"> | string
    createdAt?: DateTimeFilter<"Order"> | Date | string
    updatedAt?: DateTimeFilter<"Order"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    items?: OrderItemListRelationFilter
  }

  export type OrderOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    items?: OrderItemOrderByRelationAggregateInput
  }

  export type OrderWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OrderWhereInput | OrderWhereInput[]
    OR?: OrderWhereInput[]
    NOT?: OrderWhereInput | OrderWhereInput[]
    userId?: StringFilter<"Order"> | string
    createdAt?: DateTimeFilter<"Order"> | Date | string
    updatedAt?: DateTimeFilter<"Order"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    items?: OrderItemListRelationFilter
  }, "id">

  export type OrderOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: OrderCountOrderByAggregateInput
    _max?: OrderMaxOrderByAggregateInput
    _min?: OrderMinOrderByAggregateInput
  }

  export type OrderScalarWhereWithAggregatesInput = {
    AND?: OrderScalarWhereWithAggregatesInput | OrderScalarWhereWithAggregatesInput[]
    OR?: OrderScalarWhereWithAggregatesInput[]
    NOT?: OrderScalarWhereWithAggregatesInput | OrderScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Order"> | string
    userId?: StringWithAggregatesFilter<"Order"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Order"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Order"> | Date | string
  }

  export type OrderItemWhereInput = {
    AND?: OrderItemWhereInput | OrderItemWhereInput[]
    OR?: OrderItemWhereInput[]
    NOT?: OrderItemWhereInput | OrderItemWhereInput[]
    id?: StringFilter<"OrderItem"> | string
    orderId?: StringFilter<"OrderItem"> | string
    productId?: StringFilter<"OrderItem"> | string
    quantity?: IntFilter<"OrderItem"> | number
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
  }

  export type OrderItemOrderByWithRelationInput = {
    id?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    order?: OrderOrderByWithRelationInput
    product?: ProductOrderByWithRelationInput
  }

  export type OrderItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OrderItemWhereInput | OrderItemWhereInput[]
    OR?: OrderItemWhereInput[]
    NOT?: OrderItemWhereInput | OrderItemWhereInput[]
    orderId?: StringFilter<"OrderItem"> | string
    productId?: StringFilter<"OrderItem"> | string
    quantity?: IntFilter<"OrderItem"> | number
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
  }, "id">

  export type OrderItemOrderByWithAggregationInput = {
    id?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    _count?: OrderItemCountOrderByAggregateInput
    _avg?: OrderItemAvgOrderByAggregateInput
    _max?: OrderItemMaxOrderByAggregateInput
    _min?: OrderItemMinOrderByAggregateInput
    _sum?: OrderItemSumOrderByAggregateInput
  }

  export type OrderItemScalarWhereWithAggregatesInput = {
    AND?: OrderItemScalarWhereWithAggregatesInput | OrderItemScalarWhereWithAggregatesInput[]
    OR?: OrderItemScalarWhereWithAggregatesInput[]
    NOT?: OrderItemScalarWhereWithAggregatesInput | OrderItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"OrderItem"> | string
    orderId?: StringWithAggregatesFilter<"OrderItem"> | string
    productId?: StringWithAggregatesFilter<"OrderItem"> | string
    quantity?: IntWithAggregatesFilter<"OrderItem"> | number
  }

  export type WishListWhereInput = {
    AND?: WishListWhereInput | WishListWhereInput[]
    OR?: WishListWhereInput[]
    NOT?: WishListWhereInput | WishListWhereInput[]
    id?: StringFilter<"WishList"> | string
    userId?: StringFilter<"WishList"> | string
    productId?: StringFilter<"WishList"> | string
    selectedSize?: StringNullableFilter<"WishList"> | string | null
    selectedColor?: StringNullableFilter<"WishList"> | string | null
    createdAt?: DateTimeFilter<"WishList"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
  }

  export type WishListOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    productId?: SortOrder
    selectedSize?: SortOrder
    selectedColor?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    product?: ProductOrderByWithRelationInput
  }

  export type WishListWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_productId?: WishListUserIdProductIdCompoundUniqueInput
    AND?: WishListWhereInput | WishListWhereInput[]
    OR?: WishListWhereInput[]
    NOT?: WishListWhereInput | WishListWhereInput[]
    userId?: StringFilter<"WishList"> | string
    productId?: StringFilter<"WishList"> | string
    selectedSize?: StringNullableFilter<"WishList"> | string | null
    selectedColor?: StringNullableFilter<"WishList"> | string | null
    createdAt?: DateTimeFilter<"WishList"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
  }, "id" | "userId_productId">

  export type WishListOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    productId?: SortOrder
    selectedSize?: SortOrder
    selectedColor?: SortOrder
    createdAt?: SortOrder
    _count?: WishListCountOrderByAggregateInput
    _max?: WishListMaxOrderByAggregateInput
    _min?: WishListMinOrderByAggregateInput
  }

  export type WishListScalarWhereWithAggregatesInput = {
    AND?: WishListScalarWhereWithAggregatesInput | WishListScalarWhereWithAggregatesInput[]
    OR?: WishListScalarWhereWithAggregatesInput[]
    NOT?: WishListScalarWhereWithAggregatesInput | WishListScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WishList"> | string
    userId?: StringWithAggregatesFilter<"WishList"> | string
    productId?: StringWithAggregatesFilter<"WishList"> | string
    selectedSize?: StringNullableWithAggregatesFilter<"WishList"> | string | null
    selectedColor?: StringNullableWithAggregatesFilter<"WishList"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"WishList"> | Date | string
  }

  export type PopularSearchWhereInput = {
    AND?: PopularSearchWhereInput | PopularSearchWhereInput[]
    OR?: PopularSearchWhereInput[]
    NOT?: PopularSearchWhereInput | PopularSearchWhereInput[]
    id?: StringFilter<"PopularSearch"> | string
    query?: StringFilter<"PopularSearch"> | string
    count?: IntFilter<"PopularSearch"> | number
    lastSearched?: DateTimeFilter<"PopularSearch"> | Date | string
  }

  export type PopularSearchOrderByWithRelationInput = {
    id?: SortOrder
    query?: SortOrder
    count?: SortOrder
    lastSearched?: SortOrder
  }

  export type PopularSearchWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    query?: string
    AND?: PopularSearchWhereInput | PopularSearchWhereInput[]
    OR?: PopularSearchWhereInput[]
    NOT?: PopularSearchWhereInput | PopularSearchWhereInput[]
    count?: IntFilter<"PopularSearch"> | number
    lastSearched?: DateTimeFilter<"PopularSearch"> | Date | string
  }, "id" | "query">

  export type PopularSearchOrderByWithAggregationInput = {
    id?: SortOrder
    query?: SortOrder
    count?: SortOrder
    lastSearched?: SortOrder
    _count?: PopularSearchCountOrderByAggregateInput
    _avg?: PopularSearchAvgOrderByAggregateInput
    _max?: PopularSearchMaxOrderByAggregateInput
    _min?: PopularSearchMinOrderByAggregateInput
    _sum?: PopularSearchSumOrderByAggregateInput
  }

  export type PopularSearchScalarWhereWithAggregatesInput = {
    AND?: PopularSearchScalarWhereWithAggregatesInput | PopularSearchScalarWhereWithAggregatesInput[]
    OR?: PopularSearchScalarWhereWithAggregatesInput[]
    NOT?: PopularSearchScalarWhereWithAggregatesInput | PopularSearchScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PopularSearch"> | string
    query?: StringWithAggregatesFilter<"PopularSearch"> | string
    count?: IntWithAggregatesFilter<"PopularSearch"> | number
    lastSearched?: DateTimeWithAggregatesFilter<"PopularSearch"> | Date | string
  }

  export type SearchHistoryWhereInput = {
    AND?: SearchHistoryWhereInput | SearchHistoryWhereInput[]
    OR?: SearchHistoryWhereInput[]
    NOT?: SearchHistoryWhereInput | SearchHistoryWhereInput[]
    id?: StringFilter<"SearchHistory"> | string
    userId?: StringFilter<"SearchHistory"> | string
    query?: StringFilter<"SearchHistory"> | string
    searchedAt?: DateTimeFilter<"SearchHistory"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SearchHistoryOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    query?: SortOrder
    searchedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SearchHistoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_query?: SearchHistoryUserIdQueryCompoundUniqueInput
    AND?: SearchHistoryWhereInput | SearchHistoryWhereInput[]
    OR?: SearchHistoryWhereInput[]
    NOT?: SearchHistoryWhereInput | SearchHistoryWhereInput[]
    userId?: StringFilter<"SearchHistory"> | string
    query?: StringFilter<"SearchHistory"> | string
    searchedAt?: DateTimeFilter<"SearchHistory"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId_query">

  export type SearchHistoryOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    query?: SortOrder
    searchedAt?: SortOrder
    _count?: SearchHistoryCountOrderByAggregateInput
    _max?: SearchHistoryMaxOrderByAggregateInput
    _min?: SearchHistoryMinOrderByAggregateInput
  }

  export type SearchHistoryScalarWhereWithAggregatesInput = {
    AND?: SearchHistoryScalarWhereWithAggregatesInput | SearchHistoryScalarWhereWithAggregatesInput[]
    OR?: SearchHistoryScalarWhereWithAggregatesInput[]
    NOT?: SearchHistoryScalarWhereWithAggregatesInput | SearchHistoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SearchHistory"> | string
    userId?: StringWithAggregatesFilter<"SearchHistory"> | string
    query?: StringWithAggregatesFilter<"SearchHistory"> | string
    searchedAt?: DateTimeWithAggregatesFilter<"SearchHistory"> | Date | string
  }

  export type ViewedProductWhereInput = {
    AND?: ViewedProductWhereInput | ViewedProductWhereInput[]
    OR?: ViewedProductWhereInput[]
    NOT?: ViewedProductWhereInput | ViewedProductWhereInput[]
    id?: StringFilter<"ViewedProduct"> | string
    userId?: StringFilter<"ViewedProduct"> | string
    viewedAt?: DateTimeFilter<"ViewedProduct"> | Date | string
    product?: JsonFilter<"ViewedProduct">
    slug?: StringFilter<"ViewedProduct"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ViewedProductOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    viewedAt?: SortOrder
    product?: SortOrder
    slug?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type ViewedProductWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_slug?: ViewedProductUserIdSlugCompoundUniqueInput
    AND?: ViewedProductWhereInput | ViewedProductWhereInput[]
    OR?: ViewedProductWhereInput[]
    NOT?: ViewedProductWhereInput | ViewedProductWhereInput[]
    userId?: StringFilter<"ViewedProduct"> | string
    viewedAt?: DateTimeFilter<"ViewedProduct"> | Date | string
    product?: JsonFilter<"ViewedProduct">
    slug?: StringFilter<"ViewedProduct"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId_slug">

  export type ViewedProductOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    viewedAt?: SortOrder
    product?: SortOrder
    slug?: SortOrder
    _count?: ViewedProductCountOrderByAggregateInput
    _max?: ViewedProductMaxOrderByAggregateInput
    _min?: ViewedProductMinOrderByAggregateInput
  }

  export type ViewedProductScalarWhereWithAggregatesInput = {
    AND?: ViewedProductScalarWhereWithAggregatesInput | ViewedProductScalarWhereWithAggregatesInput[]
    OR?: ViewedProductScalarWhereWithAggregatesInput[]
    NOT?: ViewedProductScalarWhereWithAggregatesInput | ViewedProductScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ViewedProduct"> | string
    userId?: StringWithAggregatesFilter<"ViewedProduct"> | string
    viewedAt?: DateTimeWithAggregatesFilter<"ViewedProduct"> | Date | string
    product?: JsonWithAggregatesFilter<"ViewedProduct">
    slug?: StringWithAggregatesFilter<"ViewedProduct"> | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    firstName: string
    lastName: string
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    clerkUserId?: string | null
    wishList?: WishListCreateNestedManyWithoutUserInput
    reviews?: ReviewCreateNestedManyWithoutReviewerInput
    orders?: OrderCreateNestedManyWithoutUserInput
    viewedProducts?: ViewedProductCreateNestedManyWithoutUserInput
    searchHistories?: SearchHistoryCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    firstName: string
    lastName: string
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    clerkUserId?: string | null
    wishList?: WishListUncheckedCreateNestedManyWithoutUserInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutReviewerInput
    orders?: OrderUncheckedCreateNestedManyWithoutUserInput
    viewedProducts?: ViewedProductUncheckedCreateNestedManyWithoutUserInput
    searchHistories?: SearchHistoryUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clerkUserId?: NullableStringFieldUpdateOperationsInput | string | null
    wishList?: WishListUpdateManyWithoutUserNestedInput
    reviews?: ReviewUpdateManyWithoutReviewerNestedInput
    orders?: OrderUpdateManyWithoutUserNestedInput
    viewedProducts?: ViewedProductUpdateManyWithoutUserNestedInput
    searchHistories?: SearchHistoryUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clerkUserId?: NullableStringFieldUpdateOperationsInput | string | null
    wishList?: WishListUncheckedUpdateManyWithoutUserNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutReviewerNestedInput
    orders?: OrderUncheckedUpdateManyWithoutUserNestedInput
    viewedProducts?: ViewedProductUncheckedUpdateManyWithoutUserNestedInput
    searchHistories?: SearchHistoryUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    firstName: string
    lastName: string
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    clerkUserId?: string | null
  }

  export type UserUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clerkUserId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    email?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clerkUserId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CatalogCreateInput = {
    id?: string
    name: string
    slug: string
    categories?: CategoryCreateNestedManyWithoutCatalogInput
  }

  export type CatalogUncheckedCreateInput = {
    id?: string
    name: string
    slug: string
    categories?: CategoryUncheckedCreateNestedManyWithoutCatalogInput
  }

  export type CatalogUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    categories?: CategoryUpdateManyWithoutCatalogNestedInput
  }

  export type CatalogUncheckedUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    categories?: CategoryUncheckedUpdateManyWithoutCatalogNestedInput
  }

  export type CatalogCreateManyInput = {
    id?: string
    name: string
    slug: string
  }

  export type CatalogUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
  }

  export type CatalogUncheckedUpdateManyInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
  }

  export type CategoryCreateInput = {
    id?: string
    name: string
    slug: string
    parentCategory?: string | null
    subcategories?: SubcategoryCreateNestedManyWithoutCategoryInput
    catalog: CatalogCreateNestedOneWithoutCategoriesInput
  }

  export type CategoryUncheckedCreateInput = {
    id?: string
    name: string
    slug: string
    parentCategory?: string | null
    catalogId: string
    subcategories?: SubcategoryUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    parentCategory?: NullableStringFieldUpdateOperationsInput | string | null
    subcategories?: SubcategoryUpdateManyWithoutCategoryNestedInput
    catalog?: CatalogUpdateOneRequiredWithoutCategoriesNestedInput
  }

  export type CategoryUncheckedUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    parentCategory?: NullableStringFieldUpdateOperationsInput | string | null
    catalogId?: StringFieldUpdateOperationsInput | string
    subcategories?: SubcategoryUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryCreateManyInput = {
    id?: string
    name: string
    slug: string
    parentCategory?: string | null
    catalogId: string
  }

  export type CategoryUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    parentCategory?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CategoryUncheckedUpdateManyInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    parentCategory?: NullableStringFieldUpdateOperationsInput | string | null
    catalogId?: StringFieldUpdateOperationsInput | string
  }

  export type SubcategoryCreateInput = {
    id?: string
    name: string
    slug: string
    parentCategory?: string | null
    category: CategoryCreateNestedOneWithoutSubcategoriesInput
    products?: ProductCreateNestedManyWithoutSubcategoryInput
  }

  export type SubcategoryUncheckedCreateInput = {
    id?: string
    name: string
    slug: string
    parentCategory?: string | null
    categoryId: string
    products?: ProductUncheckedCreateNestedManyWithoutSubcategoryInput
  }

  export type SubcategoryUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    parentCategory?: NullableStringFieldUpdateOperationsInput | string | null
    category?: CategoryUpdateOneRequiredWithoutSubcategoriesNestedInput
    products?: ProductUpdateManyWithoutSubcategoryNestedInput
  }

  export type SubcategoryUncheckedUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    parentCategory?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: StringFieldUpdateOperationsInput | string
    products?: ProductUncheckedUpdateManyWithoutSubcategoryNestedInput
  }

  export type SubcategoryCreateManyInput = {
    id?: string
    name: string
    slug: string
    parentCategory?: string | null
    categoryId: string
  }

  export type SubcategoryUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    parentCategory?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SubcategoryUncheckedUpdateManyInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    parentCategory?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: StringFieldUpdateOperationsInput | string
  }

  export type ProductCreateInput = {
    id?: string
    name: string
    slug: string
    description: string
    price: number
    quantity: number
    images?: ProductCreateimagesInput | string[]
    sizes?: ProductCreatesizesInput | string[]
    colors?: ProductCreatecolorsInput | string[]
    tags?: ProductCreatetagsInput | $Enums.Tag[]
    reviews?: ReviewCreateNestedManyWithoutProductInput
    subcategory: SubcategoryCreateNestedOneWithoutProductsInput
    orderItems?: OrderItemCreateNestedManyWithoutProductInput
    wishLists?: WishListCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateInput = {
    id?: string
    name: string
    slug: string
    description: string
    price: number
    quantity: number
    images?: ProductCreateimagesInput | string[]
    sizes?: ProductCreatesizesInput | string[]
    colors?: ProductCreatecolorsInput | string[]
    tags?: ProductCreatetagsInput | $Enums.Tag[]
    subcategoryId: string
    reviews?: ReviewUncheckedCreateNestedManyWithoutProductInput
    orderItems?: OrderItemUncheckedCreateNestedManyWithoutProductInput
    wishLists?: WishListUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    images?: ProductUpdateimagesInput | string[]
    sizes?: ProductUpdatesizesInput | string[]
    colors?: ProductUpdatecolorsInput | string[]
    tags?: ProductUpdatetagsInput | $Enums.Tag[]
    reviews?: ReviewUpdateManyWithoutProductNestedInput
    subcategory?: SubcategoryUpdateOneRequiredWithoutProductsNestedInput
    orderItems?: OrderItemUpdateManyWithoutProductNestedInput
    wishLists?: WishListUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    images?: ProductUpdateimagesInput | string[]
    sizes?: ProductUpdatesizesInput | string[]
    colors?: ProductUpdatecolorsInput | string[]
    tags?: ProductUpdatetagsInput | $Enums.Tag[]
    subcategoryId?: StringFieldUpdateOperationsInput | string
    reviews?: ReviewUncheckedUpdateManyWithoutProductNestedInput
    orderItems?: OrderItemUncheckedUpdateManyWithoutProductNestedInput
    wishLists?: WishListUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductCreateManyInput = {
    id?: string
    name: string
    slug: string
    description: string
    price: number
    quantity: number
    images?: ProductCreateimagesInput | string[]
    sizes?: ProductCreatesizesInput | string[]
    colors?: ProductCreatecolorsInput | string[]
    tags?: ProductCreatetagsInput | $Enums.Tag[]
    subcategoryId: string
  }

  export type ProductUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    images?: ProductUpdateimagesInput | string[]
    sizes?: ProductUpdatesizesInput | string[]
    colors?: ProductUpdatecolorsInput | string[]
    tags?: ProductUpdatetagsInput | $Enums.Tag[]
  }

  export type ProductUncheckedUpdateManyInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    images?: ProductUpdateimagesInput | string[]
    sizes?: ProductUpdatesizesInput | string[]
    colors?: ProductUpdatecolorsInput | string[]
    tags?: ProductUpdatetagsInput | $Enums.Tag[]
    subcategoryId?: StringFieldUpdateOperationsInput | string
  }

  export type ReviewCreateInput = {
    id?: string
    rating: number
    title: string
    details: string
    date: Date | string
    verified?: boolean
    reviewer: UserCreateNestedOneWithoutReviewsInput
    product: ProductCreateNestedOneWithoutReviewsInput
  }

  export type ReviewUncheckedCreateInput = {
    id?: string
    reviewerId: string
    rating: number
    title: string
    details: string
    date: Date | string
    productId: string
    verified?: boolean
  }

  export type ReviewUpdateInput = {
    rating?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    details?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    reviewer?: UserUpdateOneRequiredWithoutReviewsNestedInput
    product?: ProductUpdateOneRequiredWithoutReviewsNestedInput
  }

  export type ReviewUncheckedUpdateInput = {
    reviewerId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    details?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    productId?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ReviewCreateManyInput = {
    id?: string
    reviewerId: string
    rating: number
    title: string
    details: string
    date: Date | string
    productId: string
    verified?: boolean
  }

  export type ReviewUpdateManyMutationInput = {
    rating?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    details?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    verified?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ReviewUncheckedUpdateManyInput = {
    reviewerId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    details?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    productId?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
  }

  export type OrderCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutOrdersInput
    items?: OrderItemCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateInput = {
    id?: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: OrderItemUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutOrdersNestedInput
    items?: OrderItemUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: OrderItemUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderCreateManyInput = {
    id?: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderItemCreateInput = {
    id?: string
    quantity?: number
    order: OrderCreateNestedOneWithoutItemsInput
    product: ProductCreateNestedOneWithoutOrderItemsInput
  }

  export type OrderItemUncheckedCreateInput = {
    id?: string
    orderId: string
    productId: string
    quantity?: number
  }

  export type OrderItemUpdateInput = {
    quantity?: IntFieldUpdateOperationsInput | number
    order?: OrderUpdateOneRequiredWithoutItemsNestedInput
    product?: ProductUpdateOneRequiredWithoutOrderItemsNestedInput
  }

  export type OrderItemUncheckedUpdateInput = {
    orderId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
  }

  export type OrderItemCreateManyInput = {
    id?: string
    orderId: string
    productId: string
    quantity?: number
  }

  export type OrderItemUpdateManyMutationInput = {
    quantity?: IntFieldUpdateOperationsInput | number
  }

  export type OrderItemUncheckedUpdateManyInput = {
    orderId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
  }

  export type WishListCreateInput = {
    id?: string
    selectedSize?: string | null
    selectedColor?: string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutWishListInput
    product: ProductCreateNestedOneWithoutWishListsInput
  }

  export type WishListUncheckedCreateInput = {
    id?: string
    userId: string
    productId: string
    selectedSize?: string | null
    selectedColor?: string | null
    createdAt?: Date | string
  }

  export type WishListUpdateInput = {
    selectedSize?: NullableStringFieldUpdateOperationsInput | string | null
    selectedColor?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutWishListNestedInput
    product?: ProductUpdateOneRequiredWithoutWishListsNestedInput
  }

  export type WishListUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    selectedSize?: NullableStringFieldUpdateOperationsInput | string | null
    selectedColor?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WishListCreateManyInput = {
    id?: string
    userId: string
    productId: string
    selectedSize?: string | null
    selectedColor?: string | null
    createdAt?: Date | string
  }

  export type WishListUpdateManyMutationInput = {
    selectedSize?: NullableStringFieldUpdateOperationsInput | string | null
    selectedColor?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WishListUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    selectedSize?: NullableStringFieldUpdateOperationsInput | string | null
    selectedColor?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PopularSearchCreateInput = {
    id?: string
    query: string
    count?: number
    lastSearched?: Date | string
  }

  export type PopularSearchUncheckedCreateInput = {
    id?: string
    query: string
    count?: number
    lastSearched?: Date | string
  }

  export type PopularSearchUpdateInput = {
    query?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
    lastSearched?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PopularSearchUncheckedUpdateInput = {
    query?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
    lastSearched?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PopularSearchCreateManyInput = {
    id?: string
    query: string
    count?: number
    lastSearched?: Date | string
  }

  export type PopularSearchUpdateManyMutationInput = {
    query?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
    lastSearched?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PopularSearchUncheckedUpdateManyInput = {
    query?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
    lastSearched?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SearchHistoryCreateInput = {
    id?: string
    query: string
    searchedAt?: Date | string
    user: UserCreateNestedOneWithoutSearchHistoriesInput
  }

  export type SearchHistoryUncheckedCreateInput = {
    id?: string
    userId: string
    query: string
    searchedAt?: Date | string
  }

  export type SearchHistoryUpdateInput = {
    query?: StringFieldUpdateOperationsInput | string
    searchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSearchHistoriesNestedInput
  }

  export type SearchHistoryUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    query?: StringFieldUpdateOperationsInput | string
    searchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SearchHistoryCreateManyInput = {
    id?: string
    userId: string
    query: string
    searchedAt?: Date | string
  }

  export type SearchHistoryUpdateManyMutationInput = {
    query?: StringFieldUpdateOperationsInput | string
    searchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SearchHistoryUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    query?: StringFieldUpdateOperationsInput | string
    searchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ViewedProductCreateInput = {
    id?: string
    viewedAt?: Date | string
    product: InputJsonValue
    slug: string
    user: UserCreateNestedOneWithoutViewedProductsInput
  }

  export type ViewedProductUncheckedCreateInput = {
    id?: string
    userId: string
    viewedAt?: Date | string
    product: InputJsonValue
    slug: string
  }

  export type ViewedProductUpdateInput = {
    viewedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: InputJsonValue | InputJsonValue
    slug?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutViewedProductsNestedInput
  }

  export type ViewedProductUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    viewedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: InputJsonValue | InputJsonValue
    slug?: StringFieldUpdateOperationsInput | string
  }

  export type ViewedProductCreateManyInput = {
    id?: string
    userId: string
    viewedAt?: Date | string
    product: InputJsonValue
    slug: string
  }

  export type ViewedProductUpdateManyMutationInput = {
    viewedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: InputJsonValue | InputJsonValue
    slug?: StringFieldUpdateOperationsInput | string
  }

  export type ViewedProductUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    viewedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: InputJsonValue | InputJsonValue
    slug?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
    isSet?: boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type WishListListRelationFilter = {
    every?: WishListWhereInput
    some?: WishListWhereInput
    none?: WishListWhereInput
  }

  export type ReviewListRelationFilter = {
    every?: ReviewWhereInput
    some?: ReviewWhereInput
    none?: ReviewWhereInput
  }

  export type OrderListRelationFilter = {
    every?: OrderWhereInput
    some?: OrderWhereInput
    none?: OrderWhereInput
  }

  export type ViewedProductListRelationFilter = {
    every?: ViewedProductWhereInput
    some?: ViewedProductWhereInput
    none?: ViewedProductWhereInput
  }

  export type SearchHistoryListRelationFilter = {
    every?: SearchHistoryWhereInput
    some?: SearchHistoryWhereInput
    none?: SearchHistoryWhereInput
  }

  export type WishListOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ReviewOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OrderOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ViewedProductOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SearchHistoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    clerkUserId?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    clerkUserId?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    clerkUserId?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type CategoryListRelationFilter = {
    every?: CategoryWhereInput
    some?: CategoryWhereInput
    none?: CategoryWhereInput
  }

  export type CategoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CatalogCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
  }

  export type CatalogMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
  }

  export type CatalogMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
  }

  export type SubcategoryListRelationFilter = {
    every?: SubcategoryWhereInput
    some?: SubcategoryWhereInput
    none?: SubcategoryWhereInput
  }

  export type CatalogScalarRelationFilter = {
    is?: CatalogWhereInput
    isNot?: CatalogWhereInput
  }

  export type SubcategoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CategoryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    parentCategory?: SortOrder
    catalogId?: SortOrder
  }

  export type CategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    parentCategory?: SortOrder
    catalogId?: SortOrder
  }

  export type CategoryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    parentCategory?: SortOrder
    catalogId?: SortOrder
  }

  export type CategoryScalarRelationFilter = {
    is?: CategoryWhereInput
    isNot?: CategoryWhereInput
  }

  export type ProductListRelationFilter = {
    every?: ProductWhereInput
    some?: ProductWhereInput
    none?: ProductWhereInput
  }

  export type ProductOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SubcategoryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    parentCategory?: SortOrder
    categoryId?: SortOrder
  }

  export type SubcategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    parentCategory?: SortOrder
    categoryId?: SortOrder
  }

  export type SubcategoryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    parentCategory?: SortOrder
    categoryId?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type EnumTagNullableListFilter<$PrismaModel = never> = {
    equals?: $Enums.Tag[] | ListEnumTagFieldRefInput<$PrismaModel> | null
    has?: $Enums.Tag | EnumTagFieldRefInput<$PrismaModel> | null
    hasEvery?: $Enums.Tag[] | ListEnumTagFieldRefInput<$PrismaModel>
    hasSome?: $Enums.Tag[] | ListEnumTagFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type SubcategoryScalarRelationFilter = {
    is?: SubcategoryWhereInput
    isNot?: SubcategoryWhereInput
  }

  export type OrderItemListRelationFilter = {
    every?: OrderItemWhereInput
    some?: OrderItemWhereInput
    none?: OrderItemWhereInput
  }

  export type OrderItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    price?: SortOrder
    quantity?: SortOrder
    images?: SortOrder
    sizes?: SortOrder
    colors?: SortOrder
    tags?: SortOrder
    subcategoryId?: SortOrder
  }

  export type ProductAvgOrderByAggregateInput = {
    price?: SortOrder
    quantity?: SortOrder
  }

  export type ProductMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    price?: SortOrder
    quantity?: SortOrder
    subcategoryId?: SortOrder
  }

  export type ProductMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    price?: SortOrder
    quantity?: SortOrder
    subcategoryId?: SortOrder
  }

  export type ProductSumOrderByAggregateInput = {
    price?: SortOrder
    quantity?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type ProductScalarRelationFilter = {
    is?: ProductWhereInput
    isNot?: ProductWhereInput
  }

  export type ReviewCountOrderByAggregateInput = {
    id?: SortOrder
    reviewerId?: SortOrder
    rating?: SortOrder
    title?: SortOrder
    details?: SortOrder
    date?: SortOrder
    productId?: SortOrder
    verified?: SortOrder
  }

  export type ReviewAvgOrderByAggregateInput = {
    rating?: SortOrder
  }

  export type ReviewMaxOrderByAggregateInput = {
    id?: SortOrder
    reviewerId?: SortOrder
    rating?: SortOrder
    title?: SortOrder
    details?: SortOrder
    date?: SortOrder
    productId?: SortOrder
    verified?: SortOrder
  }

  export type ReviewMinOrderByAggregateInput = {
    id?: SortOrder
    reviewerId?: SortOrder
    rating?: SortOrder
    title?: SortOrder
    details?: SortOrder
    date?: SortOrder
    productId?: SortOrder
    verified?: SortOrder
  }

  export type ReviewSumOrderByAggregateInput = {
    rating?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type OrderCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrderMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrderMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrderScalarRelationFilter = {
    is?: OrderWhereInput
    isNot?: OrderWhereInput
  }

  export type OrderItemCountOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
  }

  export type OrderItemAvgOrderByAggregateInput = {
    quantity?: SortOrder
  }

  export type OrderItemMaxOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
  }

  export type OrderItemMinOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
  }

  export type OrderItemSumOrderByAggregateInput = {
    quantity?: SortOrder
  }

  export type WishListUserIdProductIdCompoundUniqueInput = {
    userId: string
    productId: string
  }

  export type WishListCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    productId?: SortOrder
    selectedSize?: SortOrder
    selectedColor?: SortOrder
    createdAt?: SortOrder
  }

  export type WishListMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    productId?: SortOrder
    selectedSize?: SortOrder
    selectedColor?: SortOrder
    createdAt?: SortOrder
  }

  export type WishListMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    productId?: SortOrder
    selectedSize?: SortOrder
    selectedColor?: SortOrder
    createdAt?: SortOrder
  }

  export type PopularSearchCountOrderByAggregateInput = {
    id?: SortOrder
    query?: SortOrder
    count?: SortOrder
    lastSearched?: SortOrder
  }

  export type PopularSearchAvgOrderByAggregateInput = {
    count?: SortOrder
  }

  export type PopularSearchMaxOrderByAggregateInput = {
    id?: SortOrder
    query?: SortOrder
    count?: SortOrder
    lastSearched?: SortOrder
  }

  export type PopularSearchMinOrderByAggregateInput = {
    id?: SortOrder
    query?: SortOrder
    count?: SortOrder
    lastSearched?: SortOrder
  }

  export type PopularSearchSumOrderByAggregateInput = {
    count?: SortOrder
  }

  export type SearchHistoryUserIdQueryCompoundUniqueInput = {
    userId: string
    query: string
  }

  export type SearchHistoryCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    query?: SortOrder
    searchedAt?: SortOrder
  }

  export type SearchHistoryMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    query?: SortOrder
    searchedAt?: SortOrder
  }

  export type SearchHistoryMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    query?: SortOrder
    searchedAt?: SortOrder
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
  }

  export type ViewedProductUserIdSlugCompoundUniqueInput = {
    userId: string
    slug: string
  }

  export type ViewedProductCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    viewedAt?: SortOrder
    product?: SortOrder
    slug?: SortOrder
  }

  export type ViewedProductMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    viewedAt?: SortOrder
    slug?: SortOrder
  }

  export type ViewedProductMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    viewedAt?: SortOrder
    slug?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type WishListCreateNestedManyWithoutUserInput = {
    create?: XOR<WishListCreateWithoutUserInput, WishListUncheckedCreateWithoutUserInput> | WishListCreateWithoutUserInput[] | WishListUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WishListCreateOrConnectWithoutUserInput | WishListCreateOrConnectWithoutUserInput[]
    createMany?: WishListCreateManyUserInputEnvelope
    connect?: WishListWhereUniqueInput | WishListWhereUniqueInput[]
  }

  export type ReviewCreateNestedManyWithoutReviewerInput = {
    create?: XOR<ReviewCreateWithoutReviewerInput, ReviewUncheckedCreateWithoutReviewerInput> | ReviewCreateWithoutReviewerInput[] | ReviewUncheckedCreateWithoutReviewerInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutReviewerInput | ReviewCreateOrConnectWithoutReviewerInput[]
    createMany?: ReviewCreateManyReviewerInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type OrderCreateNestedManyWithoutUserInput = {
    create?: XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput> | OrderCreateWithoutUserInput[] | OrderUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutUserInput | OrderCreateOrConnectWithoutUserInput[]
    createMany?: OrderCreateManyUserInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type ViewedProductCreateNestedManyWithoutUserInput = {
    create?: XOR<ViewedProductCreateWithoutUserInput, ViewedProductUncheckedCreateWithoutUserInput> | ViewedProductCreateWithoutUserInput[] | ViewedProductUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ViewedProductCreateOrConnectWithoutUserInput | ViewedProductCreateOrConnectWithoutUserInput[]
    createMany?: ViewedProductCreateManyUserInputEnvelope
    connect?: ViewedProductWhereUniqueInput | ViewedProductWhereUniqueInput[]
  }

  export type SearchHistoryCreateNestedManyWithoutUserInput = {
    create?: XOR<SearchHistoryCreateWithoutUserInput, SearchHistoryUncheckedCreateWithoutUserInput> | SearchHistoryCreateWithoutUserInput[] | SearchHistoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SearchHistoryCreateOrConnectWithoutUserInput | SearchHistoryCreateOrConnectWithoutUserInput[]
    createMany?: SearchHistoryCreateManyUserInputEnvelope
    connect?: SearchHistoryWhereUniqueInput | SearchHistoryWhereUniqueInput[]
  }

  export type WishListUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<WishListCreateWithoutUserInput, WishListUncheckedCreateWithoutUserInput> | WishListCreateWithoutUserInput[] | WishListUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WishListCreateOrConnectWithoutUserInput | WishListCreateOrConnectWithoutUserInput[]
    createMany?: WishListCreateManyUserInputEnvelope
    connect?: WishListWhereUniqueInput | WishListWhereUniqueInput[]
  }

  export type ReviewUncheckedCreateNestedManyWithoutReviewerInput = {
    create?: XOR<ReviewCreateWithoutReviewerInput, ReviewUncheckedCreateWithoutReviewerInput> | ReviewCreateWithoutReviewerInput[] | ReviewUncheckedCreateWithoutReviewerInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutReviewerInput | ReviewCreateOrConnectWithoutReviewerInput[]
    createMany?: ReviewCreateManyReviewerInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type OrderUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput> | OrderCreateWithoutUserInput[] | OrderUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutUserInput | OrderCreateOrConnectWithoutUserInput[]
    createMany?: OrderCreateManyUserInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type ViewedProductUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ViewedProductCreateWithoutUserInput, ViewedProductUncheckedCreateWithoutUserInput> | ViewedProductCreateWithoutUserInput[] | ViewedProductUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ViewedProductCreateOrConnectWithoutUserInput | ViewedProductCreateOrConnectWithoutUserInput[]
    createMany?: ViewedProductCreateManyUserInputEnvelope
    connect?: ViewedProductWhereUniqueInput | ViewedProductWhereUniqueInput[]
  }

  export type SearchHistoryUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SearchHistoryCreateWithoutUserInput, SearchHistoryUncheckedCreateWithoutUserInput> | SearchHistoryCreateWithoutUserInput[] | SearchHistoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SearchHistoryCreateOrConnectWithoutUserInput | SearchHistoryCreateOrConnectWithoutUserInput[]
    createMany?: SearchHistoryCreateManyUserInputEnvelope
    connect?: SearchHistoryWhereUniqueInput | SearchHistoryWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
    unset?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type WishListUpdateManyWithoutUserNestedInput = {
    create?: XOR<WishListCreateWithoutUserInput, WishListUncheckedCreateWithoutUserInput> | WishListCreateWithoutUserInput[] | WishListUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WishListCreateOrConnectWithoutUserInput | WishListCreateOrConnectWithoutUserInput[]
    upsert?: WishListUpsertWithWhereUniqueWithoutUserInput | WishListUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WishListCreateManyUserInputEnvelope
    set?: WishListWhereUniqueInput | WishListWhereUniqueInput[]
    disconnect?: WishListWhereUniqueInput | WishListWhereUniqueInput[]
    delete?: WishListWhereUniqueInput | WishListWhereUniqueInput[]
    connect?: WishListWhereUniqueInput | WishListWhereUniqueInput[]
    update?: WishListUpdateWithWhereUniqueWithoutUserInput | WishListUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WishListUpdateManyWithWhereWithoutUserInput | WishListUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WishListScalarWhereInput | WishListScalarWhereInput[]
  }

  export type ReviewUpdateManyWithoutReviewerNestedInput = {
    create?: XOR<ReviewCreateWithoutReviewerInput, ReviewUncheckedCreateWithoutReviewerInput> | ReviewCreateWithoutReviewerInput[] | ReviewUncheckedCreateWithoutReviewerInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutReviewerInput | ReviewCreateOrConnectWithoutReviewerInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutReviewerInput | ReviewUpsertWithWhereUniqueWithoutReviewerInput[]
    createMany?: ReviewCreateManyReviewerInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutReviewerInput | ReviewUpdateWithWhereUniqueWithoutReviewerInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutReviewerInput | ReviewUpdateManyWithWhereWithoutReviewerInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type OrderUpdateManyWithoutUserNestedInput = {
    create?: XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput> | OrderCreateWithoutUserInput[] | OrderUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutUserInput | OrderCreateOrConnectWithoutUserInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutUserInput | OrderUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: OrderCreateManyUserInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutUserInput | OrderUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutUserInput | OrderUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type ViewedProductUpdateManyWithoutUserNestedInput = {
    create?: XOR<ViewedProductCreateWithoutUserInput, ViewedProductUncheckedCreateWithoutUserInput> | ViewedProductCreateWithoutUserInput[] | ViewedProductUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ViewedProductCreateOrConnectWithoutUserInput | ViewedProductCreateOrConnectWithoutUserInput[]
    upsert?: ViewedProductUpsertWithWhereUniqueWithoutUserInput | ViewedProductUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ViewedProductCreateManyUserInputEnvelope
    set?: ViewedProductWhereUniqueInput | ViewedProductWhereUniqueInput[]
    disconnect?: ViewedProductWhereUniqueInput | ViewedProductWhereUniqueInput[]
    delete?: ViewedProductWhereUniqueInput | ViewedProductWhereUniqueInput[]
    connect?: ViewedProductWhereUniqueInput | ViewedProductWhereUniqueInput[]
    update?: ViewedProductUpdateWithWhereUniqueWithoutUserInput | ViewedProductUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ViewedProductUpdateManyWithWhereWithoutUserInput | ViewedProductUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ViewedProductScalarWhereInput | ViewedProductScalarWhereInput[]
  }

  export type SearchHistoryUpdateManyWithoutUserNestedInput = {
    create?: XOR<SearchHistoryCreateWithoutUserInput, SearchHistoryUncheckedCreateWithoutUserInput> | SearchHistoryCreateWithoutUserInput[] | SearchHistoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SearchHistoryCreateOrConnectWithoutUserInput | SearchHistoryCreateOrConnectWithoutUserInput[]
    upsert?: SearchHistoryUpsertWithWhereUniqueWithoutUserInput | SearchHistoryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SearchHistoryCreateManyUserInputEnvelope
    set?: SearchHistoryWhereUniqueInput | SearchHistoryWhereUniqueInput[]
    disconnect?: SearchHistoryWhereUniqueInput | SearchHistoryWhereUniqueInput[]
    delete?: SearchHistoryWhereUniqueInput | SearchHistoryWhereUniqueInput[]
    connect?: SearchHistoryWhereUniqueInput | SearchHistoryWhereUniqueInput[]
    update?: SearchHistoryUpdateWithWhereUniqueWithoutUserInput | SearchHistoryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SearchHistoryUpdateManyWithWhereWithoutUserInput | SearchHistoryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SearchHistoryScalarWhereInput | SearchHistoryScalarWhereInput[]
  }

  export type WishListUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<WishListCreateWithoutUserInput, WishListUncheckedCreateWithoutUserInput> | WishListCreateWithoutUserInput[] | WishListUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WishListCreateOrConnectWithoutUserInput | WishListCreateOrConnectWithoutUserInput[]
    upsert?: WishListUpsertWithWhereUniqueWithoutUserInput | WishListUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WishListCreateManyUserInputEnvelope
    set?: WishListWhereUniqueInput | WishListWhereUniqueInput[]
    disconnect?: WishListWhereUniqueInput | WishListWhereUniqueInput[]
    delete?: WishListWhereUniqueInput | WishListWhereUniqueInput[]
    connect?: WishListWhereUniqueInput | WishListWhereUniqueInput[]
    update?: WishListUpdateWithWhereUniqueWithoutUserInput | WishListUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WishListUpdateManyWithWhereWithoutUserInput | WishListUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WishListScalarWhereInput | WishListScalarWhereInput[]
  }

  export type ReviewUncheckedUpdateManyWithoutReviewerNestedInput = {
    create?: XOR<ReviewCreateWithoutReviewerInput, ReviewUncheckedCreateWithoutReviewerInput> | ReviewCreateWithoutReviewerInput[] | ReviewUncheckedCreateWithoutReviewerInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutReviewerInput | ReviewCreateOrConnectWithoutReviewerInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutReviewerInput | ReviewUpsertWithWhereUniqueWithoutReviewerInput[]
    createMany?: ReviewCreateManyReviewerInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutReviewerInput | ReviewUpdateWithWhereUniqueWithoutReviewerInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutReviewerInput | ReviewUpdateManyWithWhereWithoutReviewerInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type OrderUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput> | OrderCreateWithoutUserInput[] | OrderUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutUserInput | OrderCreateOrConnectWithoutUserInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutUserInput | OrderUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: OrderCreateManyUserInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutUserInput | OrderUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutUserInput | OrderUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type ViewedProductUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ViewedProductCreateWithoutUserInput, ViewedProductUncheckedCreateWithoutUserInput> | ViewedProductCreateWithoutUserInput[] | ViewedProductUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ViewedProductCreateOrConnectWithoutUserInput | ViewedProductCreateOrConnectWithoutUserInput[]
    upsert?: ViewedProductUpsertWithWhereUniqueWithoutUserInput | ViewedProductUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ViewedProductCreateManyUserInputEnvelope
    set?: ViewedProductWhereUniqueInput | ViewedProductWhereUniqueInput[]
    disconnect?: ViewedProductWhereUniqueInput | ViewedProductWhereUniqueInput[]
    delete?: ViewedProductWhereUniqueInput | ViewedProductWhereUniqueInput[]
    connect?: ViewedProductWhereUniqueInput | ViewedProductWhereUniqueInput[]
    update?: ViewedProductUpdateWithWhereUniqueWithoutUserInput | ViewedProductUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ViewedProductUpdateManyWithWhereWithoutUserInput | ViewedProductUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ViewedProductScalarWhereInput | ViewedProductScalarWhereInput[]
  }

  export type SearchHistoryUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SearchHistoryCreateWithoutUserInput, SearchHistoryUncheckedCreateWithoutUserInput> | SearchHistoryCreateWithoutUserInput[] | SearchHistoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SearchHistoryCreateOrConnectWithoutUserInput | SearchHistoryCreateOrConnectWithoutUserInput[]
    upsert?: SearchHistoryUpsertWithWhereUniqueWithoutUserInput | SearchHistoryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SearchHistoryCreateManyUserInputEnvelope
    set?: SearchHistoryWhereUniqueInput | SearchHistoryWhereUniqueInput[]
    disconnect?: SearchHistoryWhereUniqueInput | SearchHistoryWhereUniqueInput[]
    delete?: SearchHistoryWhereUniqueInput | SearchHistoryWhereUniqueInput[]
    connect?: SearchHistoryWhereUniqueInput | SearchHistoryWhereUniqueInput[]
    update?: SearchHistoryUpdateWithWhereUniqueWithoutUserInput | SearchHistoryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SearchHistoryUpdateManyWithWhereWithoutUserInput | SearchHistoryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SearchHistoryScalarWhereInput | SearchHistoryScalarWhereInput[]
  }

  export type CategoryCreateNestedManyWithoutCatalogInput = {
    create?: XOR<CategoryCreateWithoutCatalogInput, CategoryUncheckedCreateWithoutCatalogInput> | CategoryCreateWithoutCatalogInput[] | CategoryUncheckedCreateWithoutCatalogInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutCatalogInput | CategoryCreateOrConnectWithoutCatalogInput[]
    createMany?: CategoryCreateManyCatalogInputEnvelope
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
  }

  export type CategoryUncheckedCreateNestedManyWithoutCatalogInput = {
    create?: XOR<CategoryCreateWithoutCatalogInput, CategoryUncheckedCreateWithoutCatalogInput> | CategoryCreateWithoutCatalogInput[] | CategoryUncheckedCreateWithoutCatalogInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutCatalogInput | CategoryCreateOrConnectWithoutCatalogInput[]
    createMany?: CategoryCreateManyCatalogInputEnvelope
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
  }

  export type CategoryUpdateManyWithoutCatalogNestedInput = {
    create?: XOR<CategoryCreateWithoutCatalogInput, CategoryUncheckedCreateWithoutCatalogInput> | CategoryCreateWithoutCatalogInput[] | CategoryUncheckedCreateWithoutCatalogInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutCatalogInput | CategoryCreateOrConnectWithoutCatalogInput[]
    upsert?: CategoryUpsertWithWhereUniqueWithoutCatalogInput | CategoryUpsertWithWhereUniqueWithoutCatalogInput[]
    createMany?: CategoryCreateManyCatalogInputEnvelope
    set?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    disconnect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    delete?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    update?: CategoryUpdateWithWhereUniqueWithoutCatalogInput | CategoryUpdateWithWhereUniqueWithoutCatalogInput[]
    updateMany?: CategoryUpdateManyWithWhereWithoutCatalogInput | CategoryUpdateManyWithWhereWithoutCatalogInput[]
    deleteMany?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
  }

  export type CategoryUncheckedUpdateManyWithoutCatalogNestedInput = {
    create?: XOR<CategoryCreateWithoutCatalogInput, CategoryUncheckedCreateWithoutCatalogInput> | CategoryCreateWithoutCatalogInput[] | CategoryUncheckedCreateWithoutCatalogInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutCatalogInput | CategoryCreateOrConnectWithoutCatalogInput[]
    upsert?: CategoryUpsertWithWhereUniqueWithoutCatalogInput | CategoryUpsertWithWhereUniqueWithoutCatalogInput[]
    createMany?: CategoryCreateManyCatalogInputEnvelope
    set?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    disconnect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    delete?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    update?: CategoryUpdateWithWhereUniqueWithoutCatalogInput | CategoryUpdateWithWhereUniqueWithoutCatalogInput[]
    updateMany?: CategoryUpdateManyWithWhereWithoutCatalogInput | CategoryUpdateManyWithWhereWithoutCatalogInput[]
    deleteMany?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
  }

  export type SubcategoryCreateNestedManyWithoutCategoryInput = {
    create?: XOR<SubcategoryCreateWithoutCategoryInput, SubcategoryUncheckedCreateWithoutCategoryInput> | SubcategoryCreateWithoutCategoryInput[] | SubcategoryUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: SubcategoryCreateOrConnectWithoutCategoryInput | SubcategoryCreateOrConnectWithoutCategoryInput[]
    createMany?: SubcategoryCreateManyCategoryInputEnvelope
    connect?: SubcategoryWhereUniqueInput | SubcategoryWhereUniqueInput[]
  }

  export type CatalogCreateNestedOneWithoutCategoriesInput = {
    create?: XOR<CatalogCreateWithoutCategoriesInput, CatalogUncheckedCreateWithoutCategoriesInput>
    connectOrCreate?: CatalogCreateOrConnectWithoutCategoriesInput
    connect?: CatalogWhereUniqueInput
  }

  export type SubcategoryUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<SubcategoryCreateWithoutCategoryInput, SubcategoryUncheckedCreateWithoutCategoryInput> | SubcategoryCreateWithoutCategoryInput[] | SubcategoryUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: SubcategoryCreateOrConnectWithoutCategoryInput | SubcategoryCreateOrConnectWithoutCategoryInput[]
    createMany?: SubcategoryCreateManyCategoryInputEnvelope
    connect?: SubcategoryWhereUniqueInput | SubcategoryWhereUniqueInput[]
  }

  export type SubcategoryUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<SubcategoryCreateWithoutCategoryInput, SubcategoryUncheckedCreateWithoutCategoryInput> | SubcategoryCreateWithoutCategoryInput[] | SubcategoryUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: SubcategoryCreateOrConnectWithoutCategoryInput | SubcategoryCreateOrConnectWithoutCategoryInput[]
    upsert?: SubcategoryUpsertWithWhereUniqueWithoutCategoryInput | SubcategoryUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: SubcategoryCreateManyCategoryInputEnvelope
    set?: SubcategoryWhereUniqueInput | SubcategoryWhereUniqueInput[]
    disconnect?: SubcategoryWhereUniqueInput | SubcategoryWhereUniqueInput[]
    delete?: SubcategoryWhereUniqueInput | SubcategoryWhereUniqueInput[]
    connect?: SubcategoryWhereUniqueInput | SubcategoryWhereUniqueInput[]
    update?: SubcategoryUpdateWithWhereUniqueWithoutCategoryInput | SubcategoryUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: SubcategoryUpdateManyWithWhereWithoutCategoryInput | SubcategoryUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: SubcategoryScalarWhereInput | SubcategoryScalarWhereInput[]
  }

  export type CatalogUpdateOneRequiredWithoutCategoriesNestedInput = {
    create?: XOR<CatalogCreateWithoutCategoriesInput, CatalogUncheckedCreateWithoutCategoriesInput>
    connectOrCreate?: CatalogCreateOrConnectWithoutCategoriesInput
    upsert?: CatalogUpsertWithoutCategoriesInput
    connect?: CatalogWhereUniqueInput
    update?: XOR<XOR<CatalogUpdateToOneWithWhereWithoutCategoriesInput, CatalogUpdateWithoutCategoriesInput>, CatalogUncheckedUpdateWithoutCategoriesInput>
  }

  export type SubcategoryUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<SubcategoryCreateWithoutCategoryInput, SubcategoryUncheckedCreateWithoutCategoryInput> | SubcategoryCreateWithoutCategoryInput[] | SubcategoryUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: SubcategoryCreateOrConnectWithoutCategoryInput | SubcategoryCreateOrConnectWithoutCategoryInput[]
    upsert?: SubcategoryUpsertWithWhereUniqueWithoutCategoryInput | SubcategoryUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: SubcategoryCreateManyCategoryInputEnvelope
    set?: SubcategoryWhereUniqueInput | SubcategoryWhereUniqueInput[]
    disconnect?: SubcategoryWhereUniqueInput | SubcategoryWhereUniqueInput[]
    delete?: SubcategoryWhereUniqueInput | SubcategoryWhereUniqueInput[]
    connect?: SubcategoryWhereUniqueInput | SubcategoryWhereUniqueInput[]
    update?: SubcategoryUpdateWithWhereUniqueWithoutCategoryInput | SubcategoryUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: SubcategoryUpdateManyWithWhereWithoutCategoryInput | SubcategoryUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: SubcategoryScalarWhereInput | SubcategoryScalarWhereInput[]
  }

  export type CategoryCreateNestedOneWithoutSubcategoriesInput = {
    create?: XOR<CategoryCreateWithoutSubcategoriesInput, CategoryUncheckedCreateWithoutSubcategoriesInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutSubcategoriesInput
    connect?: CategoryWhereUniqueInput
  }

  export type ProductCreateNestedManyWithoutSubcategoryInput = {
    create?: XOR<ProductCreateWithoutSubcategoryInput, ProductUncheckedCreateWithoutSubcategoryInput> | ProductCreateWithoutSubcategoryInput[] | ProductUncheckedCreateWithoutSubcategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutSubcategoryInput | ProductCreateOrConnectWithoutSubcategoryInput[]
    createMany?: ProductCreateManySubcategoryInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type ProductUncheckedCreateNestedManyWithoutSubcategoryInput = {
    create?: XOR<ProductCreateWithoutSubcategoryInput, ProductUncheckedCreateWithoutSubcategoryInput> | ProductCreateWithoutSubcategoryInput[] | ProductUncheckedCreateWithoutSubcategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutSubcategoryInput | ProductCreateOrConnectWithoutSubcategoryInput[]
    createMany?: ProductCreateManySubcategoryInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type CategoryUpdateOneRequiredWithoutSubcategoriesNestedInput = {
    create?: XOR<CategoryCreateWithoutSubcategoriesInput, CategoryUncheckedCreateWithoutSubcategoriesInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutSubcategoriesInput
    upsert?: CategoryUpsertWithoutSubcategoriesInput
    connect?: CategoryWhereUniqueInput
    update?: XOR<XOR<CategoryUpdateToOneWithWhereWithoutSubcategoriesInput, CategoryUpdateWithoutSubcategoriesInput>, CategoryUncheckedUpdateWithoutSubcategoriesInput>
  }

  export type ProductUpdateManyWithoutSubcategoryNestedInput = {
    create?: XOR<ProductCreateWithoutSubcategoryInput, ProductUncheckedCreateWithoutSubcategoryInput> | ProductCreateWithoutSubcategoryInput[] | ProductUncheckedCreateWithoutSubcategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutSubcategoryInput | ProductCreateOrConnectWithoutSubcategoryInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutSubcategoryInput | ProductUpsertWithWhereUniqueWithoutSubcategoryInput[]
    createMany?: ProductCreateManySubcategoryInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutSubcategoryInput | ProductUpdateWithWhereUniqueWithoutSubcategoryInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutSubcategoryInput | ProductUpdateManyWithWhereWithoutSubcategoryInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type ProductUncheckedUpdateManyWithoutSubcategoryNestedInput = {
    create?: XOR<ProductCreateWithoutSubcategoryInput, ProductUncheckedCreateWithoutSubcategoryInput> | ProductCreateWithoutSubcategoryInput[] | ProductUncheckedCreateWithoutSubcategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutSubcategoryInput | ProductCreateOrConnectWithoutSubcategoryInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutSubcategoryInput | ProductUpsertWithWhereUniqueWithoutSubcategoryInput[]
    createMany?: ProductCreateManySubcategoryInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutSubcategoryInput | ProductUpdateWithWhereUniqueWithoutSubcategoryInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutSubcategoryInput | ProductUpdateManyWithWhereWithoutSubcategoryInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type ProductCreateimagesInput = {
    set: string[]
  }

  export type ProductCreatesizesInput = {
    set: string[]
  }

  export type ProductCreatecolorsInput = {
    set: string[]
  }

  export type ProductCreatetagsInput = {
    set: $Enums.Tag[]
  }

  export type ReviewCreateNestedManyWithoutProductInput = {
    create?: XOR<ReviewCreateWithoutProductInput, ReviewUncheckedCreateWithoutProductInput> | ReviewCreateWithoutProductInput[] | ReviewUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutProductInput | ReviewCreateOrConnectWithoutProductInput[]
    createMany?: ReviewCreateManyProductInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type SubcategoryCreateNestedOneWithoutProductsInput = {
    create?: XOR<SubcategoryCreateWithoutProductsInput, SubcategoryUncheckedCreateWithoutProductsInput>
    connectOrCreate?: SubcategoryCreateOrConnectWithoutProductsInput
    connect?: SubcategoryWhereUniqueInput
  }

  export type OrderItemCreateNestedManyWithoutProductInput = {
    create?: XOR<OrderItemCreateWithoutProductInput, OrderItemUncheckedCreateWithoutProductInput> | OrderItemCreateWithoutProductInput[] | OrderItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutProductInput | OrderItemCreateOrConnectWithoutProductInput[]
    createMany?: OrderItemCreateManyProductInputEnvelope
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
  }

  export type WishListCreateNestedManyWithoutProductInput = {
    create?: XOR<WishListCreateWithoutProductInput, WishListUncheckedCreateWithoutProductInput> | WishListCreateWithoutProductInput[] | WishListUncheckedCreateWithoutProductInput[]
    connectOrCreate?: WishListCreateOrConnectWithoutProductInput | WishListCreateOrConnectWithoutProductInput[]
    createMany?: WishListCreateManyProductInputEnvelope
    connect?: WishListWhereUniqueInput | WishListWhereUniqueInput[]
  }

  export type ReviewUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<ReviewCreateWithoutProductInput, ReviewUncheckedCreateWithoutProductInput> | ReviewCreateWithoutProductInput[] | ReviewUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutProductInput | ReviewCreateOrConnectWithoutProductInput[]
    createMany?: ReviewCreateManyProductInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type OrderItemUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<OrderItemCreateWithoutProductInput, OrderItemUncheckedCreateWithoutProductInput> | OrderItemCreateWithoutProductInput[] | OrderItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutProductInput | OrderItemCreateOrConnectWithoutProductInput[]
    createMany?: OrderItemCreateManyProductInputEnvelope
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
  }

  export type WishListUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<WishListCreateWithoutProductInput, WishListUncheckedCreateWithoutProductInput> | WishListCreateWithoutProductInput[] | WishListUncheckedCreateWithoutProductInput[]
    connectOrCreate?: WishListCreateOrConnectWithoutProductInput | WishListCreateOrConnectWithoutProductInput[]
    createMany?: WishListCreateManyProductInputEnvelope
    connect?: WishListWhereUniqueInput | WishListWhereUniqueInput[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ProductUpdateimagesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type ProductUpdatesizesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type ProductUpdatecolorsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type ProductUpdatetagsInput = {
    set?: $Enums.Tag[]
    push?: $Enums.Tag | $Enums.Tag[]
  }

  export type ReviewUpdateManyWithoutProductNestedInput = {
    create?: XOR<ReviewCreateWithoutProductInput, ReviewUncheckedCreateWithoutProductInput> | ReviewCreateWithoutProductInput[] | ReviewUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutProductInput | ReviewCreateOrConnectWithoutProductInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutProductInput | ReviewUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: ReviewCreateManyProductInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutProductInput | ReviewUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutProductInput | ReviewUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type SubcategoryUpdateOneRequiredWithoutProductsNestedInput = {
    create?: XOR<SubcategoryCreateWithoutProductsInput, SubcategoryUncheckedCreateWithoutProductsInput>
    connectOrCreate?: SubcategoryCreateOrConnectWithoutProductsInput
    upsert?: SubcategoryUpsertWithoutProductsInput
    connect?: SubcategoryWhereUniqueInput
    update?: XOR<XOR<SubcategoryUpdateToOneWithWhereWithoutProductsInput, SubcategoryUpdateWithoutProductsInput>, SubcategoryUncheckedUpdateWithoutProductsInput>
  }

  export type OrderItemUpdateManyWithoutProductNestedInput = {
    create?: XOR<OrderItemCreateWithoutProductInput, OrderItemUncheckedCreateWithoutProductInput> | OrderItemCreateWithoutProductInput[] | OrderItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutProductInput | OrderItemCreateOrConnectWithoutProductInput[]
    upsert?: OrderItemUpsertWithWhereUniqueWithoutProductInput | OrderItemUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: OrderItemCreateManyProductInputEnvelope
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    update?: OrderItemUpdateWithWhereUniqueWithoutProductInput | OrderItemUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: OrderItemUpdateManyWithWhereWithoutProductInput | OrderItemUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
  }

  export type WishListUpdateManyWithoutProductNestedInput = {
    create?: XOR<WishListCreateWithoutProductInput, WishListUncheckedCreateWithoutProductInput> | WishListCreateWithoutProductInput[] | WishListUncheckedCreateWithoutProductInput[]
    connectOrCreate?: WishListCreateOrConnectWithoutProductInput | WishListCreateOrConnectWithoutProductInput[]
    upsert?: WishListUpsertWithWhereUniqueWithoutProductInput | WishListUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: WishListCreateManyProductInputEnvelope
    set?: WishListWhereUniqueInput | WishListWhereUniqueInput[]
    disconnect?: WishListWhereUniqueInput | WishListWhereUniqueInput[]
    delete?: WishListWhereUniqueInput | WishListWhereUniqueInput[]
    connect?: WishListWhereUniqueInput | WishListWhereUniqueInput[]
    update?: WishListUpdateWithWhereUniqueWithoutProductInput | WishListUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: WishListUpdateManyWithWhereWithoutProductInput | WishListUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: WishListScalarWhereInput | WishListScalarWhereInput[]
  }

  export type ReviewUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<ReviewCreateWithoutProductInput, ReviewUncheckedCreateWithoutProductInput> | ReviewCreateWithoutProductInput[] | ReviewUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutProductInput | ReviewCreateOrConnectWithoutProductInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutProductInput | ReviewUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: ReviewCreateManyProductInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutProductInput | ReviewUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutProductInput | ReviewUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type OrderItemUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<OrderItemCreateWithoutProductInput, OrderItemUncheckedCreateWithoutProductInput> | OrderItemCreateWithoutProductInput[] | OrderItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutProductInput | OrderItemCreateOrConnectWithoutProductInput[]
    upsert?: OrderItemUpsertWithWhereUniqueWithoutProductInput | OrderItemUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: OrderItemCreateManyProductInputEnvelope
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    update?: OrderItemUpdateWithWhereUniqueWithoutProductInput | OrderItemUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: OrderItemUpdateManyWithWhereWithoutProductInput | OrderItemUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
  }

  export type WishListUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<WishListCreateWithoutProductInput, WishListUncheckedCreateWithoutProductInput> | WishListCreateWithoutProductInput[] | WishListUncheckedCreateWithoutProductInput[]
    connectOrCreate?: WishListCreateOrConnectWithoutProductInput | WishListCreateOrConnectWithoutProductInput[]
    upsert?: WishListUpsertWithWhereUniqueWithoutProductInput | WishListUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: WishListCreateManyProductInputEnvelope
    set?: WishListWhereUniqueInput | WishListWhereUniqueInput[]
    disconnect?: WishListWhereUniqueInput | WishListWhereUniqueInput[]
    delete?: WishListWhereUniqueInput | WishListWhereUniqueInput[]
    connect?: WishListWhereUniqueInput | WishListWhereUniqueInput[]
    update?: WishListUpdateWithWhereUniqueWithoutProductInput | WishListUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: WishListUpdateManyWithWhereWithoutProductInput | WishListUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: WishListScalarWhereInput | WishListScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutReviewsInput = {
    create?: XOR<UserCreateWithoutReviewsInput, UserUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReviewsInput
    connect?: UserWhereUniqueInput
  }

  export type ProductCreateNestedOneWithoutReviewsInput = {
    create?: XOR<ProductCreateWithoutReviewsInput, ProductUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutReviewsInput
    connect?: ProductWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneRequiredWithoutReviewsNestedInput = {
    create?: XOR<UserCreateWithoutReviewsInput, UserUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReviewsInput
    upsert?: UserUpsertWithoutReviewsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutReviewsInput, UserUpdateWithoutReviewsInput>, UserUncheckedUpdateWithoutReviewsInput>
  }

  export type ProductUpdateOneRequiredWithoutReviewsNestedInput = {
    create?: XOR<ProductCreateWithoutReviewsInput, ProductUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutReviewsInput
    upsert?: ProductUpsertWithoutReviewsInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutReviewsInput, ProductUpdateWithoutReviewsInput>, ProductUncheckedUpdateWithoutReviewsInput>
  }

  export type UserCreateNestedOneWithoutOrdersInput = {
    create?: XOR<UserCreateWithoutOrdersInput, UserUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: UserCreateOrConnectWithoutOrdersInput
    connect?: UserWhereUniqueInput
  }

  export type OrderItemCreateNestedManyWithoutOrderInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
  }

  export type OrderItemUncheckedCreateNestedManyWithoutOrderInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutOrdersNestedInput = {
    create?: XOR<UserCreateWithoutOrdersInput, UserUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: UserCreateOrConnectWithoutOrdersInput
    upsert?: UserUpsertWithoutOrdersInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutOrdersInput, UserUpdateWithoutOrdersInput>, UserUncheckedUpdateWithoutOrdersInput>
  }

  export type OrderItemUpdateManyWithoutOrderNestedInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    upsert?: OrderItemUpsertWithWhereUniqueWithoutOrderInput | OrderItemUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    update?: OrderItemUpdateWithWhereUniqueWithoutOrderInput | OrderItemUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: OrderItemUpdateManyWithWhereWithoutOrderInput | OrderItemUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
  }

  export type OrderItemUncheckedUpdateManyWithoutOrderNestedInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    upsert?: OrderItemUpsertWithWhereUniqueWithoutOrderInput | OrderItemUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    update?: OrderItemUpdateWithWhereUniqueWithoutOrderInput | OrderItemUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: OrderItemUpdateManyWithWhereWithoutOrderInput | OrderItemUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
  }

  export type OrderCreateNestedOneWithoutItemsInput = {
    create?: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>
    connectOrCreate?: OrderCreateOrConnectWithoutItemsInput
    connect?: OrderWhereUniqueInput
  }

  export type ProductCreateNestedOneWithoutOrderItemsInput = {
    create?: XOR<ProductCreateWithoutOrderItemsInput, ProductUncheckedCreateWithoutOrderItemsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutOrderItemsInput
    connect?: ProductWhereUniqueInput
  }

  export type OrderUpdateOneRequiredWithoutItemsNestedInput = {
    create?: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>
    connectOrCreate?: OrderCreateOrConnectWithoutItemsInput
    upsert?: OrderUpsertWithoutItemsInput
    connect?: OrderWhereUniqueInput
    update?: XOR<XOR<OrderUpdateToOneWithWhereWithoutItemsInput, OrderUpdateWithoutItemsInput>, OrderUncheckedUpdateWithoutItemsInput>
  }

  export type ProductUpdateOneRequiredWithoutOrderItemsNestedInput = {
    create?: XOR<ProductCreateWithoutOrderItemsInput, ProductUncheckedCreateWithoutOrderItemsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutOrderItemsInput
    upsert?: ProductUpsertWithoutOrderItemsInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutOrderItemsInput, ProductUpdateWithoutOrderItemsInput>, ProductUncheckedUpdateWithoutOrderItemsInput>
  }

  export type UserCreateNestedOneWithoutWishListInput = {
    create?: XOR<UserCreateWithoutWishListInput, UserUncheckedCreateWithoutWishListInput>
    connectOrCreate?: UserCreateOrConnectWithoutWishListInput
    connect?: UserWhereUniqueInput
  }

  export type ProductCreateNestedOneWithoutWishListsInput = {
    create?: XOR<ProductCreateWithoutWishListsInput, ProductUncheckedCreateWithoutWishListsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutWishListsInput
    connect?: ProductWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutWishListNestedInput = {
    create?: XOR<UserCreateWithoutWishListInput, UserUncheckedCreateWithoutWishListInput>
    connectOrCreate?: UserCreateOrConnectWithoutWishListInput
    upsert?: UserUpsertWithoutWishListInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutWishListInput, UserUpdateWithoutWishListInput>, UserUncheckedUpdateWithoutWishListInput>
  }

  export type ProductUpdateOneRequiredWithoutWishListsNestedInput = {
    create?: XOR<ProductCreateWithoutWishListsInput, ProductUncheckedCreateWithoutWishListsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutWishListsInput
    upsert?: ProductUpsertWithoutWishListsInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutWishListsInput, ProductUpdateWithoutWishListsInput>, ProductUncheckedUpdateWithoutWishListsInput>
  }

  export type UserCreateNestedOneWithoutSearchHistoriesInput = {
    create?: XOR<UserCreateWithoutSearchHistoriesInput, UserUncheckedCreateWithoutSearchHistoriesInput>
    connectOrCreate?: UserCreateOrConnectWithoutSearchHistoriesInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSearchHistoriesNestedInput = {
    create?: XOR<UserCreateWithoutSearchHistoriesInput, UserUncheckedCreateWithoutSearchHistoriesInput>
    connectOrCreate?: UserCreateOrConnectWithoutSearchHistoriesInput
    upsert?: UserUpsertWithoutSearchHistoriesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSearchHistoriesInput, UserUpdateWithoutSearchHistoriesInput>, UserUncheckedUpdateWithoutSearchHistoriesInput>
  }

  export type UserCreateNestedOneWithoutViewedProductsInput = {
    create?: XOR<UserCreateWithoutViewedProductsInput, UserUncheckedCreateWithoutViewedProductsInput>
    connectOrCreate?: UserCreateOrConnectWithoutViewedProductsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutViewedProductsNestedInput = {
    create?: XOR<UserCreateWithoutViewedProductsInput, UserUncheckedCreateWithoutViewedProductsInput>
    connectOrCreate?: UserCreateOrConnectWithoutViewedProductsInput
    upsert?: UserUpsertWithoutViewedProductsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutViewedProductsInput, UserUpdateWithoutViewedProductsInput>, UserUncheckedUpdateWithoutViewedProductsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
    isSet?: boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
    isSet?: boolean
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
  }

  export type WishListCreateWithoutUserInput = {
    id?: string
    selectedSize?: string | null
    selectedColor?: string | null
    createdAt?: Date | string
    product: ProductCreateNestedOneWithoutWishListsInput
  }

  export type WishListUncheckedCreateWithoutUserInput = {
    id?: string
    productId: string
    selectedSize?: string | null
    selectedColor?: string | null
    createdAt?: Date | string
  }

  export type WishListCreateOrConnectWithoutUserInput = {
    where: WishListWhereUniqueInput
    create: XOR<WishListCreateWithoutUserInput, WishListUncheckedCreateWithoutUserInput>
  }

  export type WishListCreateManyUserInputEnvelope = {
    data: WishListCreateManyUserInput | WishListCreateManyUserInput[]
  }

  export type ReviewCreateWithoutReviewerInput = {
    id?: string
    rating: number
    title: string
    details: string
    date: Date | string
    verified?: boolean
    product: ProductCreateNestedOneWithoutReviewsInput
  }

  export type ReviewUncheckedCreateWithoutReviewerInput = {
    id?: string
    rating: number
    title: string
    details: string
    date: Date | string
    productId: string
    verified?: boolean
  }

  export type ReviewCreateOrConnectWithoutReviewerInput = {
    where: ReviewWhereUniqueInput
    create: XOR<ReviewCreateWithoutReviewerInput, ReviewUncheckedCreateWithoutReviewerInput>
  }

  export type ReviewCreateManyReviewerInputEnvelope = {
    data: ReviewCreateManyReviewerInput | ReviewCreateManyReviewerInput[]
  }

  export type OrderCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: OrderItemCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: OrderItemUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutUserInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput>
  }

  export type OrderCreateManyUserInputEnvelope = {
    data: OrderCreateManyUserInput | OrderCreateManyUserInput[]
  }

  export type ViewedProductCreateWithoutUserInput = {
    id?: string
    viewedAt?: Date | string
    product: InputJsonValue
    slug: string
  }

  export type ViewedProductUncheckedCreateWithoutUserInput = {
    id?: string
    viewedAt?: Date | string
    product: InputJsonValue
    slug: string
  }

  export type ViewedProductCreateOrConnectWithoutUserInput = {
    where: ViewedProductWhereUniqueInput
    create: XOR<ViewedProductCreateWithoutUserInput, ViewedProductUncheckedCreateWithoutUserInput>
  }

  export type ViewedProductCreateManyUserInputEnvelope = {
    data: ViewedProductCreateManyUserInput | ViewedProductCreateManyUserInput[]
  }

  export type SearchHistoryCreateWithoutUserInput = {
    id?: string
    query: string
    searchedAt?: Date | string
  }

  export type SearchHistoryUncheckedCreateWithoutUserInput = {
    id?: string
    query: string
    searchedAt?: Date | string
  }

  export type SearchHistoryCreateOrConnectWithoutUserInput = {
    where: SearchHistoryWhereUniqueInput
    create: XOR<SearchHistoryCreateWithoutUserInput, SearchHistoryUncheckedCreateWithoutUserInput>
  }

  export type SearchHistoryCreateManyUserInputEnvelope = {
    data: SearchHistoryCreateManyUserInput | SearchHistoryCreateManyUserInput[]
  }

  export type WishListUpsertWithWhereUniqueWithoutUserInput = {
    where: WishListWhereUniqueInput
    update: XOR<WishListUpdateWithoutUserInput, WishListUncheckedUpdateWithoutUserInput>
    create: XOR<WishListCreateWithoutUserInput, WishListUncheckedCreateWithoutUserInput>
  }

  export type WishListUpdateWithWhereUniqueWithoutUserInput = {
    where: WishListWhereUniqueInput
    data: XOR<WishListUpdateWithoutUserInput, WishListUncheckedUpdateWithoutUserInput>
  }

  export type WishListUpdateManyWithWhereWithoutUserInput = {
    where: WishListScalarWhereInput
    data: XOR<WishListUpdateManyMutationInput, WishListUncheckedUpdateManyWithoutUserInput>
  }

  export type WishListScalarWhereInput = {
    AND?: WishListScalarWhereInput | WishListScalarWhereInput[]
    OR?: WishListScalarWhereInput[]
    NOT?: WishListScalarWhereInput | WishListScalarWhereInput[]
    id?: StringFilter<"WishList"> | string
    userId?: StringFilter<"WishList"> | string
    productId?: StringFilter<"WishList"> | string
    selectedSize?: StringNullableFilter<"WishList"> | string | null
    selectedColor?: StringNullableFilter<"WishList"> | string | null
    createdAt?: DateTimeFilter<"WishList"> | Date | string
  }

  export type ReviewUpsertWithWhereUniqueWithoutReviewerInput = {
    where: ReviewWhereUniqueInput
    update: XOR<ReviewUpdateWithoutReviewerInput, ReviewUncheckedUpdateWithoutReviewerInput>
    create: XOR<ReviewCreateWithoutReviewerInput, ReviewUncheckedCreateWithoutReviewerInput>
  }

  export type ReviewUpdateWithWhereUniqueWithoutReviewerInput = {
    where: ReviewWhereUniqueInput
    data: XOR<ReviewUpdateWithoutReviewerInput, ReviewUncheckedUpdateWithoutReviewerInput>
  }

  export type ReviewUpdateManyWithWhereWithoutReviewerInput = {
    where: ReviewScalarWhereInput
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyWithoutReviewerInput>
  }

  export type ReviewScalarWhereInput = {
    AND?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
    OR?: ReviewScalarWhereInput[]
    NOT?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
    id?: StringFilter<"Review"> | string
    reviewerId?: StringFilter<"Review"> | string
    rating?: IntFilter<"Review"> | number
    title?: StringFilter<"Review"> | string
    details?: StringFilter<"Review"> | string
    date?: DateTimeFilter<"Review"> | Date | string
    productId?: StringFilter<"Review"> | string
    verified?: BoolFilter<"Review"> | boolean
  }

  export type OrderUpsertWithWhereUniqueWithoutUserInput = {
    where: OrderWhereUniqueInput
    update: XOR<OrderUpdateWithoutUserInput, OrderUncheckedUpdateWithoutUserInput>
    create: XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput>
  }

  export type OrderUpdateWithWhereUniqueWithoutUserInput = {
    where: OrderWhereUniqueInput
    data: XOR<OrderUpdateWithoutUserInput, OrderUncheckedUpdateWithoutUserInput>
  }

  export type OrderUpdateManyWithWhereWithoutUserInput = {
    where: OrderScalarWhereInput
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyWithoutUserInput>
  }

  export type OrderScalarWhereInput = {
    AND?: OrderScalarWhereInput | OrderScalarWhereInput[]
    OR?: OrderScalarWhereInput[]
    NOT?: OrderScalarWhereInput | OrderScalarWhereInput[]
    id?: StringFilter<"Order"> | string
    userId?: StringFilter<"Order"> | string
    createdAt?: DateTimeFilter<"Order"> | Date | string
    updatedAt?: DateTimeFilter<"Order"> | Date | string
  }

  export type ViewedProductUpsertWithWhereUniqueWithoutUserInput = {
    where: ViewedProductWhereUniqueInput
    update: XOR<ViewedProductUpdateWithoutUserInput, ViewedProductUncheckedUpdateWithoutUserInput>
    create: XOR<ViewedProductCreateWithoutUserInput, ViewedProductUncheckedCreateWithoutUserInput>
  }

  export type ViewedProductUpdateWithWhereUniqueWithoutUserInput = {
    where: ViewedProductWhereUniqueInput
    data: XOR<ViewedProductUpdateWithoutUserInput, ViewedProductUncheckedUpdateWithoutUserInput>
  }

  export type ViewedProductUpdateManyWithWhereWithoutUserInput = {
    where: ViewedProductScalarWhereInput
    data: XOR<ViewedProductUpdateManyMutationInput, ViewedProductUncheckedUpdateManyWithoutUserInput>
  }

  export type ViewedProductScalarWhereInput = {
    AND?: ViewedProductScalarWhereInput | ViewedProductScalarWhereInput[]
    OR?: ViewedProductScalarWhereInput[]
    NOT?: ViewedProductScalarWhereInput | ViewedProductScalarWhereInput[]
    id?: StringFilter<"ViewedProduct"> | string
    userId?: StringFilter<"ViewedProduct"> | string
    viewedAt?: DateTimeFilter<"ViewedProduct"> | Date | string
    product?: JsonFilter<"ViewedProduct">
    slug?: StringFilter<"ViewedProduct"> | string
  }

  export type SearchHistoryUpsertWithWhereUniqueWithoutUserInput = {
    where: SearchHistoryWhereUniqueInput
    update: XOR<SearchHistoryUpdateWithoutUserInput, SearchHistoryUncheckedUpdateWithoutUserInput>
    create: XOR<SearchHistoryCreateWithoutUserInput, SearchHistoryUncheckedCreateWithoutUserInput>
  }

  export type SearchHistoryUpdateWithWhereUniqueWithoutUserInput = {
    where: SearchHistoryWhereUniqueInput
    data: XOR<SearchHistoryUpdateWithoutUserInput, SearchHistoryUncheckedUpdateWithoutUserInput>
  }

  export type SearchHistoryUpdateManyWithWhereWithoutUserInput = {
    where: SearchHistoryScalarWhereInput
    data: XOR<SearchHistoryUpdateManyMutationInput, SearchHistoryUncheckedUpdateManyWithoutUserInput>
  }

  export type SearchHistoryScalarWhereInput = {
    AND?: SearchHistoryScalarWhereInput | SearchHistoryScalarWhereInput[]
    OR?: SearchHistoryScalarWhereInput[]
    NOT?: SearchHistoryScalarWhereInput | SearchHistoryScalarWhereInput[]
    id?: StringFilter<"SearchHistory"> | string
    userId?: StringFilter<"SearchHistory"> | string
    query?: StringFilter<"SearchHistory"> | string
    searchedAt?: DateTimeFilter<"SearchHistory"> | Date | string
  }

  export type CategoryCreateWithoutCatalogInput = {
    id?: string
    name: string
    slug: string
    parentCategory?: string | null
    subcategories?: SubcategoryCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateWithoutCatalogInput = {
    id?: string
    name: string
    slug: string
    parentCategory?: string | null
    subcategories?: SubcategoryUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryCreateOrConnectWithoutCatalogInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutCatalogInput, CategoryUncheckedCreateWithoutCatalogInput>
  }

  export type CategoryCreateManyCatalogInputEnvelope = {
    data: CategoryCreateManyCatalogInput | CategoryCreateManyCatalogInput[]
  }

  export type CategoryUpsertWithWhereUniqueWithoutCatalogInput = {
    where: CategoryWhereUniqueInput
    update: XOR<CategoryUpdateWithoutCatalogInput, CategoryUncheckedUpdateWithoutCatalogInput>
    create: XOR<CategoryCreateWithoutCatalogInput, CategoryUncheckedCreateWithoutCatalogInput>
  }

  export type CategoryUpdateWithWhereUniqueWithoutCatalogInput = {
    where: CategoryWhereUniqueInput
    data: XOR<CategoryUpdateWithoutCatalogInput, CategoryUncheckedUpdateWithoutCatalogInput>
  }

  export type CategoryUpdateManyWithWhereWithoutCatalogInput = {
    where: CategoryScalarWhereInput
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyWithoutCatalogInput>
  }

  export type CategoryScalarWhereInput = {
    AND?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
    OR?: CategoryScalarWhereInput[]
    NOT?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
    id?: StringFilter<"Category"> | string
    name?: StringFilter<"Category"> | string
    slug?: StringFilter<"Category"> | string
    parentCategory?: StringNullableFilter<"Category"> | string | null
    catalogId?: StringFilter<"Category"> | string
  }

  export type SubcategoryCreateWithoutCategoryInput = {
    id?: string
    name: string
    slug: string
    parentCategory?: string | null
    products?: ProductCreateNestedManyWithoutSubcategoryInput
  }

  export type SubcategoryUncheckedCreateWithoutCategoryInput = {
    id?: string
    name: string
    slug: string
    parentCategory?: string | null
    products?: ProductUncheckedCreateNestedManyWithoutSubcategoryInput
  }

  export type SubcategoryCreateOrConnectWithoutCategoryInput = {
    where: SubcategoryWhereUniqueInput
    create: XOR<SubcategoryCreateWithoutCategoryInput, SubcategoryUncheckedCreateWithoutCategoryInput>
  }

  export type SubcategoryCreateManyCategoryInputEnvelope = {
    data: SubcategoryCreateManyCategoryInput | SubcategoryCreateManyCategoryInput[]
  }

  export type CatalogCreateWithoutCategoriesInput = {
    id?: string
    name: string
    slug: string
  }

  export type CatalogUncheckedCreateWithoutCategoriesInput = {
    id?: string
    name: string
    slug: string
  }

  export type CatalogCreateOrConnectWithoutCategoriesInput = {
    where: CatalogWhereUniqueInput
    create: XOR<CatalogCreateWithoutCategoriesInput, CatalogUncheckedCreateWithoutCategoriesInput>
  }

  export type SubcategoryUpsertWithWhereUniqueWithoutCategoryInput = {
    where: SubcategoryWhereUniqueInput
    update: XOR<SubcategoryUpdateWithoutCategoryInput, SubcategoryUncheckedUpdateWithoutCategoryInput>
    create: XOR<SubcategoryCreateWithoutCategoryInput, SubcategoryUncheckedCreateWithoutCategoryInput>
  }

  export type SubcategoryUpdateWithWhereUniqueWithoutCategoryInput = {
    where: SubcategoryWhereUniqueInput
    data: XOR<SubcategoryUpdateWithoutCategoryInput, SubcategoryUncheckedUpdateWithoutCategoryInput>
  }

  export type SubcategoryUpdateManyWithWhereWithoutCategoryInput = {
    where: SubcategoryScalarWhereInput
    data: XOR<SubcategoryUpdateManyMutationInput, SubcategoryUncheckedUpdateManyWithoutCategoryInput>
  }

  export type SubcategoryScalarWhereInput = {
    AND?: SubcategoryScalarWhereInput | SubcategoryScalarWhereInput[]
    OR?: SubcategoryScalarWhereInput[]
    NOT?: SubcategoryScalarWhereInput | SubcategoryScalarWhereInput[]
    id?: StringFilter<"Subcategory"> | string
    name?: StringFilter<"Subcategory"> | string
    slug?: StringFilter<"Subcategory"> | string
    parentCategory?: StringNullableFilter<"Subcategory"> | string | null
    categoryId?: StringFilter<"Subcategory"> | string
  }

  export type CatalogUpsertWithoutCategoriesInput = {
    update: XOR<CatalogUpdateWithoutCategoriesInput, CatalogUncheckedUpdateWithoutCategoriesInput>
    create: XOR<CatalogCreateWithoutCategoriesInput, CatalogUncheckedCreateWithoutCategoriesInput>
    where?: CatalogWhereInput
  }

  export type CatalogUpdateToOneWithWhereWithoutCategoriesInput = {
    where?: CatalogWhereInput
    data: XOR<CatalogUpdateWithoutCategoriesInput, CatalogUncheckedUpdateWithoutCategoriesInput>
  }

  export type CatalogUpdateWithoutCategoriesInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
  }

  export type CatalogUncheckedUpdateWithoutCategoriesInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
  }

  export type CategoryCreateWithoutSubcategoriesInput = {
    id?: string
    name: string
    slug: string
    parentCategory?: string | null
    catalog: CatalogCreateNestedOneWithoutCategoriesInput
  }

  export type CategoryUncheckedCreateWithoutSubcategoriesInput = {
    id?: string
    name: string
    slug: string
    parentCategory?: string | null
    catalogId: string
  }

  export type CategoryCreateOrConnectWithoutSubcategoriesInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutSubcategoriesInput, CategoryUncheckedCreateWithoutSubcategoriesInput>
  }

  export type ProductCreateWithoutSubcategoryInput = {
    id?: string
    name: string
    slug: string
    description: string
    price: number
    quantity: number
    images?: ProductCreateimagesInput | string[]
    sizes?: ProductCreatesizesInput | string[]
    colors?: ProductCreatecolorsInput | string[]
    tags?: ProductCreatetagsInput | $Enums.Tag[]
    reviews?: ReviewCreateNestedManyWithoutProductInput
    orderItems?: OrderItemCreateNestedManyWithoutProductInput
    wishLists?: WishListCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutSubcategoryInput = {
    id?: string
    name: string
    slug: string
    description: string
    price: number
    quantity: number
    images?: ProductCreateimagesInput | string[]
    sizes?: ProductCreatesizesInput | string[]
    colors?: ProductCreatecolorsInput | string[]
    tags?: ProductCreatetagsInput | $Enums.Tag[]
    reviews?: ReviewUncheckedCreateNestedManyWithoutProductInput
    orderItems?: OrderItemUncheckedCreateNestedManyWithoutProductInput
    wishLists?: WishListUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutSubcategoryInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutSubcategoryInput, ProductUncheckedCreateWithoutSubcategoryInput>
  }

  export type ProductCreateManySubcategoryInputEnvelope = {
    data: ProductCreateManySubcategoryInput | ProductCreateManySubcategoryInput[]
  }

  export type CategoryUpsertWithoutSubcategoriesInput = {
    update: XOR<CategoryUpdateWithoutSubcategoriesInput, CategoryUncheckedUpdateWithoutSubcategoriesInput>
    create: XOR<CategoryCreateWithoutSubcategoriesInput, CategoryUncheckedCreateWithoutSubcategoriesInput>
    where?: CategoryWhereInput
  }

  export type CategoryUpdateToOneWithWhereWithoutSubcategoriesInput = {
    where?: CategoryWhereInput
    data: XOR<CategoryUpdateWithoutSubcategoriesInput, CategoryUncheckedUpdateWithoutSubcategoriesInput>
  }

  export type CategoryUpdateWithoutSubcategoriesInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    parentCategory?: NullableStringFieldUpdateOperationsInput | string | null
    catalog?: CatalogUpdateOneRequiredWithoutCategoriesNestedInput
  }

  export type CategoryUncheckedUpdateWithoutSubcategoriesInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    parentCategory?: NullableStringFieldUpdateOperationsInput | string | null
    catalogId?: StringFieldUpdateOperationsInput | string
  }

  export type ProductUpsertWithWhereUniqueWithoutSubcategoryInput = {
    where: ProductWhereUniqueInput
    update: XOR<ProductUpdateWithoutSubcategoryInput, ProductUncheckedUpdateWithoutSubcategoryInput>
    create: XOR<ProductCreateWithoutSubcategoryInput, ProductUncheckedCreateWithoutSubcategoryInput>
  }

  export type ProductUpdateWithWhereUniqueWithoutSubcategoryInput = {
    where: ProductWhereUniqueInput
    data: XOR<ProductUpdateWithoutSubcategoryInput, ProductUncheckedUpdateWithoutSubcategoryInput>
  }

  export type ProductUpdateManyWithWhereWithoutSubcategoryInput = {
    where: ProductScalarWhereInput
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyWithoutSubcategoryInput>
  }

  export type ProductScalarWhereInput = {
    AND?: ProductScalarWhereInput | ProductScalarWhereInput[]
    OR?: ProductScalarWhereInput[]
    NOT?: ProductScalarWhereInput | ProductScalarWhereInput[]
    id?: StringFilter<"Product"> | string
    name?: StringFilter<"Product"> | string
    slug?: StringFilter<"Product"> | string
    description?: StringFilter<"Product"> | string
    price?: FloatFilter<"Product"> | number
    quantity?: IntFilter<"Product"> | number
    images?: StringNullableListFilter<"Product">
    sizes?: StringNullableListFilter<"Product">
    colors?: StringNullableListFilter<"Product">
    tags?: EnumTagNullableListFilter<"Product">
    subcategoryId?: StringFilter<"Product"> | string
  }

  export type ReviewCreateWithoutProductInput = {
    id?: string
    rating: number
    title: string
    details: string
    date: Date | string
    verified?: boolean
    reviewer: UserCreateNestedOneWithoutReviewsInput
  }

  export type ReviewUncheckedCreateWithoutProductInput = {
    id?: string
    reviewerId: string
    rating: number
    title: string
    details: string
    date: Date | string
    verified?: boolean
  }

  export type ReviewCreateOrConnectWithoutProductInput = {
    where: ReviewWhereUniqueInput
    create: XOR<ReviewCreateWithoutProductInput, ReviewUncheckedCreateWithoutProductInput>
  }

  export type ReviewCreateManyProductInputEnvelope = {
    data: ReviewCreateManyProductInput | ReviewCreateManyProductInput[]
  }

  export type SubcategoryCreateWithoutProductsInput = {
    id?: string
    name: string
    slug: string
    parentCategory?: string | null
    category: CategoryCreateNestedOneWithoutSubcategoriesInput
  }

  export type SubcategoryUncheckedCreateWithoutProductsInput = {
    id?: string
    name: string
    slug: string
    parentCategory?: string | null
    categoryId: string
  }

  export type SubcategoryCreateOrConnectWithoutProductsInput = {
    where: SubcategoryWhereUniqueInput
    create: XOR<SubcategoryCreateWithoutProductsInput, SubcategoryUncheckedCreateWithoutProductsInput>
  }

  export type OrderItemCreateWithoutProductInput = {
    id?: string
    quantity?: number
    order: OrderCreateNestedOneWithoutItemsInput
  }

  export type OrderItemUncheckedCreateWithoutProductInput = {
    id?: string
    orderId: string
    quantity?: number
  }

  export type OrderItemCreateOrConnectWithoutProductInput = {
    where: OrderItemWhereUniqueInput
    create: XOR<OrderItemCreateWithoutProductInput, OrderItemUncheckedCreateWithoutProductInput>
  }

  export type OrderItemCreateManyProductInputEnvelope = {
    data: OrderItemCreateManyProductInput | OrderItemCreateManyProductInput[]
  }

  export type WishListCreateWithoutProductInput = {
    id?: string
    selectedSize?: string | null
    selectedColor?: string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutWishListInput
  }

  export type WishListUncheckedCreateWithoutProductInput = {
    id?: string
    userId: string
    selectedSize?: string | null
    selectedColor?: string | null
    createdAt?: Date | string
  }

  export type WishListCreateOrConnectWithoutProductInput = {
    where: WishListWhereUniqueInput
    create: XOR<WishListCreateWithoutProductInput, WishListUncheckedCreateWithoutProductInput>
  }

  export type WishListCreateManyProductInputEnvelope = {
    data: WishListCreateManyProductInput | WishListCreateManyProductInput[]
  }

  export type ReviewUpsertWithWhereUniqueWithoutProductInput = {
    where: ReviewWhereUniqueInput
    update: XOR<ReviewUpdateWithoutProductInput, ReviewUncheckedUpdateWithoutProductInput>
    create: XOR<ReviewCreateWithoutProductInput, ReviewUncheckedCreateWithoutProductInput>
  }

  export type ReviewUpdateWithWhereUniqueWithoutProductInput = {
    where: ReviewWhereUniqueInput
    data: XOR<ReviewUpdateWithoutProductInput, ReviewUncheckedUpdateWithoutProductInput>
  }

  export type ReviewUpdateManyWithWhereWithoutProductInput = {
    where: ReviewScalarWhereInput
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyWithoutProductInput>
  }

  export type SubcategoryUpsertWithoutProductsInput = {
    update: XOR<SubcategoryUpdateWithoutProductsInput, SubcategoryUncheckedUpdateWithoutProductsInput>
    create: XOR<SubcategoryCreateWithoutProductsInput, SubcategoryUncheckedCreateWithoutProductsInput>
    where?: SubcategoryWhereInput
  }

  export type SubcategoryUpdateToOneWithWhereWithoutProductsInput = {
    where?: SubcategoryWhereInput
    data: XOR<SubcategoryUpdateWithoutProductsInput, SubcategoryUncheckedUpdateWithoutProductsInput>
  }

  export type SubcategoryUpdateWithoutProductsInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    parentCategory?: NullableStringFieldUpdateOperationsInput | string | null
    category?: CategoryUpdateOneRequiredWithoutSubcategoriesNestedInput
  }

  export type SubcategoryUncheckedUpdateWithoutProductsInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    parentCategory?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: StringFieldUpdateOperationsInput | string
  }

  export type OrderItemUpsertWithWhereUniqueWithoutProductInput = {
    where: OrderItemWhereUniqueInput
    update: XOR<OrderItemUpdateWithoutProductInput, OrderItemUncheckedUpdateWithoutProductInput>
    create: XOR<OrderItemCreateWithoutProductInput, OrderItemUncheckedCreateWithoutProductInput>
  }

  export type OrderItemUpdateWithWhereUniqueWithoutProductInput = {
    where: OrderItemWhereUniqueInput
    data: XOR<OrderItemUpdateWithoutProductInput, OrderItemUncheckedUpdateWithoutProductInput>
  }

  export type OrderItemUpdateManyWithWhereWithoutProductInput = {
    where: OrderItemScalarWhereInput
    data: XOR<OrderItemUpdateManyMutationInput, OrderItemUncheckedUpdateManyWithoutProductInput>
  }

  export type OrderItemScalarWhereInput = {
    AND?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
    OR?: OrderItemScalarWhereInput[]
    NOT?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
    id?: StringFilter<"OrderItem"> | string
    orderId?: StringFilter<"OrderItem"> | string
    productId?: StringFilter<"OrderItem"> | string
    quantity?: IntFilter<"OrderItem"> | number
  }

  export type WishListUpsertWithWhereUniqueWithoutProductInput = {
    where: WishListWhereUniqueInput
    update: XOR<WishListUpdateWithoutProductInput, WishListUncheckedUpdateWithoutProductInput>
    create: XOR<WishListCreateWithoutProductInput, WishListUncheckedCreateWithoutProductInput>
  }

  export type WishListUpdateWithWhereUniqueWithoutProductInput = {
    where: WishListWhereUniqueInput
    data: XOR<WishListUpdateWithoutProductInput, WishListUncheckedUpdateWithoutProductInput>
  }

  export type WishListUpdateManyWithWhereWithoutProductInput = {
    where: WishListScalarWhereInput
    data: XOR<WishListUpdateManyMutationInput, WishListUncheckedUpdateManyWithoutProductInput>
  }

  export type UserCreateWithoutReviewsInput = {
    id?: string
    email: string
    firstName: string
    lastName: string
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    clerkUserId?: string | null
    wishList?: WishListCreateNestedManyWithoutUserInput
    orders?: OrderCreateNestedManyWithoutUserInput
    viewedProducts?: ViewedProductCreateNestedManyWithoutUserInput
    searchHistories?: SearchHistoryCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutReviewsInput = {
    id?: string
    email: string
    firstName: string
    lastName: string
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    clerkUserId?: string | null
    wishList?: WishListUncheckedCreateNestedManyWithoutUserInput
    orders?: OrderUncheckedCreateNestedManyWithoutUserInput
    viewedProducts?: ViewedProductUncheckedCreateNestedManyWithoutUserInput
    searchHistories?: SearchHistoryUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutReviewsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReviewsInput, UserUncheckedCreateWithoutReviewsInput>
  }

  export type ProductCreateWithoutReviewsInput = {
    id?: string
    name: string
    slug: string
    description: string
    price: number
    quantity: number
    images?: ProductCreateimagesInput | string[]
    sizes?: ProductCreatesizesInput | string[]
    colors?: ProductCreatecolorsInput | string[]
    tags?: ProductCreatetagsInput | $Enums.Tag[]
    subcategory: SubcategoryCreateNestedOneWithoutProductsInput
    orderItems?: OrderItemCreateNestedManyWithoutProductInput
    wishLists?: WishListCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutReviewsInput = {
    id?: string
    name: string
    slug: string
    description: string
    price: number
    quantity: number
    images?: ProductCreateimagesInput | string[]
    sizes?: ProductCreatesizesInput | string[]
    colors?: ProductCreatecolorsInput | string[]
    tags?: ProductCreatetagsInput | $Enums.Tag[]
    subcategoryId: string
    orderItems?: OrderItemUncheckedCreateNestedManyWithoutProductInput
    wishLists?: WishListUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutReviewsInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutReviewsInput, ProductUncheckedCreateWithoutReviewsInput>
  }

  export type UserUpsertWithoutReviewsInput = {
    update: XOR<UserUpdateWithoutReviewsInput, UserUncheckedUpdateWithoutReviewsInput>
    create: XOR<UserCreateWithoutReviewsInput, UserUncheckedCreateWithoutReviewsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutReviewsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutReviewsInput, UserUncheckedUpdateWithoutReviewsInput>
  }

  export type UserUpdateWithoutReviewsInput = {
    email?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clerkUserId?: NullableStringFieldUpdateOperationsInput | string | null
    wishList?: WishListUpdateManyWithoutUserNestedInput
    orders?: OrderUpdateManyWithoutUserNestedInput
    viewedProducts?: ViewedProductUpdateManyWithoutUserNestedInput
    searchHistories?: SearchHistoryUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutReviewsInput = {
    email?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clerkUserId?: NullableStringFieldUpdateOperationsInput | string | null
    wishList?: WishListUncheckedUpdateManyWithoutUserNestedInput
    orders?: OrderUncheckedUpdateManyWithoutUserNestedInput
    viewedProducts?: ViewedProductUncheckedUpdateManyWithoutUserNestedInput
    searchHistories?: SearchHistoryUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ProductUpsertWithoutReviewsInput = {
    update: XOR<ProductUpdateWithoutReviewsInput, ProductUncheckedUpdateWithoutReviewsInput>
    create: XOR<ProductCreateWithoutReviewsInput, ProductUncheckedCreateWithoutReviewsInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutReviewsInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutReviewsInput, ProductUncheckedUpdateWithoutReviewsInput>
  }

  export type ProductUpdateWithoutReviewsInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    images?: ProductUpdateimagesInput | string[]
    sizes?: ProductUpdatesizesInput | string[]
    colors?: ProductUpdatecolorsInput | string[]
    tags?: ProductUpdatetagsInput | $Enums.Tag[]
    subcategory?: SubcategoryUpdateOneRequiredWithoutProductsNestedInput
    orderItems?: OrderItemUpdateManyWithoutProductNestedInput
    wishLists?: WishListUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutReviewsInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    images?: ProductUpdateimagesInput | string[]
    sizes?: ProductUpdatesizesInput | string[]
    colors?: ProductUpdatecolorsInput | string[]
    tags?: ProductUpdatetagsInput | $Enums.Tag[]
    subcategoryId?: StringFieldUpdateOperationsInput | string
    orderItems?: OrderItemUncheckedUpdateManyWithoutProductNestedInput
    wishLists?: WishListUncheckedUpdateManyWithoutProductNestedInput
  }

  export type UserCreateWithoutOrdersInput = {
    id?: string
    email: string
    firstName: string
    lastName: string
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    clerkUserId?: string | null
    wishList?: WishListCreateNestedManyWithoutUserInput
    reviews?: ReviewCreateNestedManyWithoutReviewerInput
    viewedProducts?: ViewedProductCreateNestedManyWithoutUserInput
    searchHistories?: SearchHistoryCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutOrdersInput = {
    id?: string
    email: string
    firstName: string
    lastName: string
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    clerkUserId?: string | null
    wishList?: WishListUncheckedCreateNestedManyWithoutUserInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutReviewerInput
    viewedProducts?: ViewedProductUncheckedCreateNestedManyWithoutUserInput
    searchHistories?: SearchHistoryUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutOrdersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOrdersInput, UserUncheckedCreateWithoutOrdersInput>
  }

  export type OrderItemCreateWithoutOrderInput = {
    id?: string
    quantity?: number
    product: ProductCreateNestedOneWithoutOrderItemsInput
  }

  export type OrderItemUncheckedCreateWithoutOrderInput = {
    id?: string
    productId: string
    quantity?: number
  }

  export type OrderItemCreateOrConnectWithoutOrderInput = {
    where: OrderItemWhereUniqueInput
    create: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput>
  }

  export type OrderItemCreateManyOrderInputEnvelope = {
    data: OrderItemCreateManyOrderInput | OrderItemCreateManyOrderInput[]
  }

  export type UserUpsertWithoutOrdersInput = {
    update: XOR<UserUpdateWithoutOrdersInput, UserUncheckedUpdateWithoutOrdersInput>
    create: XOR<UserCreateWithoutOrdersInput, UserUncheckedCreateWithoutOrdersInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutOrdersInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutOrdersInput, UserUncheckedUpdateWithoutOrdersInput>
  }

  export type UserUpdateWithoutOrdersInput = {
    email?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clerkUserId?: NullableStringFieldUpdateOperationsInput | string | null
    wishList?: WishListUpdateManyWithoutUserNestedInput
    reviews?: ReviewUpdateManyWithoutReviewerNestedInput
    viewedProducts?: ViewedProductUpdateManyWithoutUserNestedInput
    searchHistories?: SearchHistoryUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutOrdersInput = {
    email?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clerkUserId?: NullableStringFieldUpdateOperationsInput | string | null
    wishList?: WishListUncheckedUpdateManyWithoutUserNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutReviewerNestedInput
    viewedProducts?: ViewedProductUncheckedUpdateManyWithoutUserNestedInput
    searchHistories?: SearchHistoryUncheckedUpdateManyWithoutUserNestedInput
  }

  export type OrderItemUpsertWithWhereUniqueWithoutOrderInput = {
    where: OrderItemWhereUniqueInput
    update: XOR<OrderItemUpdateWithoutOrderInput, OrderItemUncheckedUpdateWithoutOrderInput>
    create: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput>
  }

  export type OrderItemUpdateWithWhereUniqueWithoutOrderInput = {
    where: OrderItemWhereUniqueInput
    data: XOR<OrderItemUpdateWithoutOrderInput, OrderItemUncheckedUpdateWithoutOrderInput>
  }

  export type OrderItemUpdateManyWithWhereWithoutOrderInput = {
    where: OrderItemScalarWhereInput
    data: XOR<OrderItemUpdateManyMutationInput, OrderItemUncheckedUpdateManyWithoutOrderInput>
  }

  export type OrderCreateWithoutItemsInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutOrdersInput
  }

  export type OrderUncheckedCreateWithoutItemsInput = {
    id?: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderCreateOrConnectWithoutItemsInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>
  }

  export type ProductCreateWithoutOrderItemsInput = {
    id?: string
    name: string
    slug: string
    description: string
    price: number
    quantity: number
    images?: ProductCreateimagesInput | string[]
    sizes?: ProductCreatesizesInput | string[]
    colors?: ProductCreatecolorsInput | string[]
    tags?: ProductCreatetagsInput | $Enums.Tag[]
    reviews?: ReviewCreateNestedManyWithoutProductInput
    subcategory: SubcategoryCreateNestedOneWithoutProductsInput
    wishLists?: WishListCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutOrderItemsInput = {
    id?: string
    name: string
    slug: string
    description: string
    price: number
    quantity: number
    images?: ProductCreateimagesInput | string[]
    sizes?: ProductCreatesizesInput | string[]
    colors?: ProductCreatecolorsInput | string[]
    tags?: ProductCreatetagsInput | $Enums.Tag[]
    subcategoryId: string
    reviews?: ReviewUncheckedCreateNestedManyWithoutProductInput
    wishLists?: WishListUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutOrderItemsInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutOrderItemsInput, ProductUncheckedCreateWithoutOrderItemsInput>
  }

  export type OrderUpsertWithoutItemsInput = {
    update: XOR<OrderUpdateWithoutItemsInput, OrderUncheckedUpdateWithoutItemsInput>
    create: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>
    where?: OrderWhereInput
  }

  export type OrderUpdateToOneWithWhereWithoutItemsInput = {
    where?: OrderWhereInput
    data: XOR<OrderUpdateWithoutItemsInput, OrderUncheckedUpdateWithoutItemsInput>
  }

  export type OrderUpdateWithoutItemsInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutOrdersNestedInput
  }

  export type OrderUncheckedUpdateWithoutItemsInput = {
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductUpsertWithoutOrderItemsInput = {
    update: XOR<ProductUpdateWithoutOrderItemsInput, ProductUncheckedUpdateWithoutOrderItemsInput>
    create: XOR<ProductCreateWithoutOrderItemsInput, ProductUncheckedCreateWithoutOrderItemsInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutOrderItemsInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutOrderItemsInput, ProductUncheckedUpdateWithoutOrderItemsInput>
  }

  export type ProductUpdateWithoutOrderItemsInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    images?: ProductUpdateimagesInput | string[]
    sizes?: ProductUpdatesizesInput | string[]
    colors?: ProductUpdatecolorsInput | string[]
    tags?: ProductUpdatetagsInput | $Enums.Tag[]
    reviews?: ReviewUpdateManyWithoutProductNestedInput
    subcategory?: SubcategoryUpdateOneRequiredWithoutProductsNestedInput
    wishLists?: WishListUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutOrderItemsInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    images?: ProductUpdateimagesInput | string[]
    sizes?: ProductUpdatesizesInput | string[]
    colors?: ProductUpdatecolorsInput | string[]
    tags?: ProductUpdatetagsInput | $Enums.Tag[]
    subcategoryId?: StringFieldUpdateOperationsInput | string
    reviews?: ReviewUncheckedUpdateManyWithoutProductNestedInput
    wishLists?: WishListUncheckedUpdateManyWithoutProductNestedInput
  }

  export type UserCreateWithoutWishListInput = {
    id?: string
    email: string
    firstName: string
    lastName: string
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    clerkUserId?: string | null
    reviews?: ReviewCreateNestedManyWithoutReviewerInput
    orders?: OrderCreateNestedManyWithoutUserInput
    viewedProducts?: ViewedProductCreateNestedManyWithoutUserInput
    searchHistories?: SearchHistoryCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutWishListInput = {
    id?: string
    email: string
    firstName: string
    lastName: string
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    clerkUserId?: string | null
    reviews?: ReviewUncheckedCreateNestedManyWithoutReviewerInput
    orders?: OrderUncheckedCreateNestedManyWithoutUserInput
    viewedProducts?: ViewedProductUncheckedCreateNestedManyWithoutUserInput
    searchHistories?: SearchHistoryUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutWishListInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutWishListInput, UserUncheckedCreateWithoutWishListInput>
  }

  export type ProductCreateWithoutWishListsInput = {
    id?: string
    name: string
    slug: string
    description: string
    price: number
    quantity: number
    images?: ProductCreateimagesInput | string[]
    sizes?: ProductCreatesizesInput | string[]
    colors?: ProductCreatecolorsInput | string[]
    tags?: ProductCreatetagsInput | $Enums.Tag[]
    reviews?: ReviewCreateNestedManyWithoutProductInput
    subcategory: SubcategoryCreateNestedOneWithoutProductsInput
    orderItems?: OrderItemCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutWishListsInput = {
    id?: string
    name: string
    slug: string
    description: string
    price: number
    quantity: number
    images?: ProductCreateimagesInput | string[]
    sizes?: ProductCreatesizesInput | string[]
    colors?: ProductCreatecolorsInput | string[]
    tags?: ProductCreatetagsInput | $Enums.Tag[]
    subcategoryId: string
    reviews?: ReviewUncheckedCreateNestedManyWithoutProductInput
    orderItems?: OrderItemUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutWishListsInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutWishListsInput, ProductUncheckedCreateWithoutWishListsInput>
  }

  export type UserUpsertWithoutWishListInput = {
    update: XOR<UserUpdateWithoutWishListInput, UserUncheckedUpdateWithoutWishListInput>
    create: XOR<UserCreateWithoutWishListInput, UserUncheckedCreateWithoutWishListInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutWishListInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutWishListInput, UserUncheckedUpdateWithoutWishListInput>
  }

  export type UserUpdateWithoutWishListInput = {
    email?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clerkUserId?: NullableStringFieldUpdateOperationsInput | string | null
    reviews?: ReviewUpdateManyWithoutReviewerNestedInput
    orders?: OrderUpdateManyWithoutUserNestedInput
    viewedProducts?: ViewedProductUpdateManyWithoutUserNestedInput
    searchHistories?: SearchHistoryUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutWishListInput = {
    email?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clerkUserId?: NullableStringFieldUpdateOperationsInput | string | null
    reviews?: ReviewUncheckedUpdateManyWithoutReviewerNestedInput
    orders?: OrderUncheckedUpdateManyWithoutUserNestedInput
    viewedProducts?: ViewedProductUncheckedUpdateManyWithoutUserNestedInput
    searchHistories?: SearchHistoryUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ProductUpsertWithoutWishListsInput = {
    update: XOR<ProductUpdateWithoutWishListsInput, ProductUncheckedUpdateWithoutWishListsInput>
    create: XOR<ProductCreateWithoutWishListsInput, ProductUncheckedCreateWithoutWishListsInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutWishListsInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutWishListsInput, ProductUncheckedUpdateWithoutWishListsInput>
  }

  export type ProductUpdateWithoutWishListsInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    images?: ProductUpdateimagesInput | string[]
    sizes?: ProductUpdatesizesInput | string[]
    colors?: ProductUpdatecolorsInput | string[]
    tags?: ProductUpdatetagsInput | $Enums.Tag[]
    reviews?: ReviewUpdateManyWithoutProductNestedInput
    subcategory?: SubcategoryUpdateOneRequiredWithoutProductsNestedInput
    orderItems?: OrderItemUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutWishListsInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    images?: ProductUpdateimagesInput | string[]
    sizes?: ProductUpdatesizesInput | string[]
    colors?: ProductUpdatecolorsInput | string[]
    tags?: ProductUpdatetagsInput | $Enums.Tag[]
    subcategoryId?: StringFieldUpdateOperationsInput | string
    reviews?: ReviewUncheckedUpdateManyWithoutProductNestedInput
    orderItems?: OrderItemUncheckedUpdateManyWithoutProductNestedInput
  }

  export type UserCreateWithoutSearchHistoriesInput = {
    id?: string
    email: string
    firstName: string
    lastName: string
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    clerkUserId?: string | null
    wishList?: WishListCreateNestedManyWithoutUserInput
    reviews?: ReviewCreateNestedManyWithoutReviewerInput
    orders?: OrderCreateNestedManyWithoutUserInput
    viewedProducts?: ViewedProductCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSearchHistoriesInput = {
    id?: string
    email: string
    firstName: string
    lastName: string
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    clerkUserId?: string | null
    wishList?: WishListUncheckedCreateNestedManyWithoutUserInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutReviewerInput
    orders?: OrderUncheckedCreateNestedManyWithoutUserInput
    viewedProducts?: ViewedProductUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSearchHistoriesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSearchHistoriesInput, UserUncheckedCreateWithoutSearchHistoriesInput>
  }

  export type UserUpsertWithoutSearchHistoriesInput = {
    update: XOR<UserUpdateWithoutSearchHistoriesInput, UserUncheckedUpdateWithoutSearchHistoriesInput>
    create: XOR<UserCreateWithoutSearchHistoriesInput, UserUncheckedCreateWithoutSearchHistoriesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSearchHistoriesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSearchHistoriesInput, UserUncheckedUpdateWithoutSearchHistoriesInput>
  }

  export type UserUpdateWithoutSearchHistoriesInput = {
    email?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clerkUserId?: NullableStringFieldUpdateOperationsInput | string | null
    wishList?: WishListUpdateManyWithoutUserNestedInput
    reviews?: ReviewUpdateManyWithoutReviewerNestedInput
    orders?: OrderUpdateManyWithoutUserNestedInput
    viewedProducts?: ViewedProductUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSearchHistoriesInput = {
    email?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clerkUserId?: NullableStringFieldUpdateOperationsInput | string | null
    wishList?: WishListUncheckedUpdateManyWithoutUserNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutReviewerNestedInput
    orders?: OrderUncheckedUpdateManyWithoutUserNestedInput
    viewedProducts?: ViewedProductUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutViewedProductsInput = {
    id?: string
    email: string
    firstName: string
    lastName: string
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    clerkUserId?: string | null
    wishList?: WishListCreateNestedManyWithoutUserInput
    reviews?: ReviewCreateNestedManyWithoutReviewerInput
    orders?: OrderCreateNestedManyWithoutUserInput
    searchHistories?: SearchHistoryCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutViewedProductsInput = {
    id?: string
    email: string
    firstName: string
    lastName: string
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    clerkUserId?: string | null
    wishList?: WishListUncheckedCreateNestedManyWithoutUserInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutReviewerInput
    orders?: OrderUncheckedCreateNestedManyWithoutUserInput
    searchHistories?: SearchHistoryUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutViewedProductsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutViewedProductsInput, UserUncheckedCreateWithoutViewedProductsInput>
  }

  export type UserUpsertWithoutViewedProductsInput = {
    update: XOR<UserUpdateWithoutViewedProductsInput, UserUncheckedUpdateWithoutViewedProductsInput>
    create: XOR<UserCreateWithoutViewedProductsInput, UserUncheckedCreateWithoutViewedProductsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutViewedProductsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutViewedProductsInput, UserUncheckedUpdateWithoutViewedProductsInput>
  }

  export type UserUpdateWithoutViewedProductsInput = {
    email?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clerkUserId?: NullableStringFieldUpdateOperationsInput | string | null
    wishList?: WishListUpdateManyWithoutUserNestedInput
    reviews?: ReviewUpdateManyWithoutReviewerNestedInput
    orders?: OrderUpdateManyWithoutUserNestedInput
    searchHistories?: SearchHistoryUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutViewedProductsInput = {
    email?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clerkUserId?: NullableStringFieldUpdateOperationsInput | string | null
    wishList?: WishListUncheckedUpdateManyWithoutUserNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutReviewerNestedInput
    orders?: OrderUncheckedUpdateManyWithoutUserNestedInput
    searchHistories?: SearchHistoryUncheckedUpdateManyWithoutUserNestedInput
  }

  export type WishListCreateManyUserInput = {
    id?: string
    productId: string
    selectedSize?: string | null
    selectedColor?: string | null
    createdAt?: Date | string
  }

  export type ReviewCreateManyReviewerInput = {
    id?: string
    rating: number
    title: string
    details: string
    date: Date | string
    productId: string
    verified?: boolean
  }

  export type OrderCreateManyUserInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ViewedProductCreateManyUserInput = {
    id?: string
    viewedAt?: Date | string
    product: InputJsonValue
    slug: string
  }

  export type SearchHistoryCreateManyUserInput = {
    id?: string
    query: string
    searchedAt?: Date | string
  }

  export type WishListUpdateWithoutUserInput = {
    selectedSize?: NullableStringFieldUpdateOperationsInput | string | null
    selectedColor?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutWishListsNestedInput
  }

  export type WishListUncheckedUpdateWithoutUserInput = {
    productId?: StringFieldUpdateOperationsInput | string
    selectedSize?: NullableStringFieldUpdateOperationsInput | string | null
    selectedColor?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WishListUncheckedUpdateManyWithoutUserInput = {
    productId?: StringFieldUpdateOperationsInput | string
    selectedSize?: NullableStringFieldUpdateOperationsInput | string | null
    selectedColor?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUpdateWithoutReviewerInput = {
    rating?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    details?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    product?: ProductUpdateOneRequiredWithoutReviewsNestedInput
  }

  export type ReviewUncheckedUpdateWithoutReviewerInput = {
    rating?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    details?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    productId?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ReviewUncheckedUpdateManyWithoutReviewerInput = {
    rating?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    details?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    productId?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
  }

  export type OrderUpdateWithoutUserInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: OrderItemUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutUserInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: OrderItemUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateManyWithoutUserInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ViewedProductUpdateWithoutUserInput = {
    viewedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: InputJsonValue | InputJsonValue
    slug?: StringFieldUpdateOperationsInput | string
  }

  export type ViewedProductUncheckedUpdateWithoutUserInput = {
    viewedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: InputJsonValue | InputJsonValue
    slug?: StringFieldUpdateOperationsInput | string
  }

  export type ViewedProductUncheckedUpdateManyWithoutUserInput = {
    viewedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: InputJsonValue | InputJsonValue
    slug?: StringFieldUpdateOperationsInput | string
  }

  export type SearchHistoryUpdateWithoutUserInput = {
    query?: StringFieldUpdateOperationsInput | string
    searchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SearchHistoryUncheckedUpdateWithoutUserInput = {
    query?: StringFieldUpdateOperationsInput | string
    searchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SearchHistoryUncheckedUpdateManyWithoutUserInput = {
    query?: StringFieldUpdateOperationsInput | string
    searchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryCreateManyCatalogInput = {
    id?: string
    name: string
    slug: string
    parentCategory?: string | null
  }

  export type CategoryUpdateWithoutCatalogInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    parentCategory?: NullableStringFieldUpdateOperationsInput | string | null
    subcategories?: SubcategoryUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateWithoutCatalogInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    parentCategory?: NullableStringFieldUpdateOperationsInput | string | null
    subcategories?: SubcategoryUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateManyWithoutCatalogInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    parentCategory?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SubcategoryCreateManyCategoryInput = {
    id?: string
    name: string
    slug: string
    parentCategory?: string | null
  }

  export type SubcategoryUpdateWithoutCategoryInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    parentCategory?: NullableStringFieldUpdateOperationsInput | string | null
    products?: ProductUpdateManyWithoutSubcategoryNestedInput
  }

  export type SubcategoryUncheckedUpdateWithoutCategoryInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    parentCategory?: NullableStringFieldUpdateOperationsInput | string | null
    products?: ProductUncheckedUpdateManyWithoutSubcategoryNestedInput
  }

  export type SubcategoryUncheckedUpdateManyWithoutCategoryInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    parentCategory?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProductCreateManySubcategoryInput = {
    id?: string
    name: string
    slug: string
    description: string
    price: number
    quantity: number
    images?: ProductCreateimagesInput | string[]
    sizes?: ProductCreatesizesInput | string[]
    colors?: ProductCreatecolorsInput | string[]
    tags?: ProductCreatetagsInput | $Enums.Tag[]
  }

  export type ProductUpdateWithoutSubcategoryInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    images?: ProductUpdateimagesInput | string[]
    sizes?: ProductUpdatesizesInput | string[]
    colors?: ProductUpdatecolorsInput | string[]
    tags?: ProductUpdatetagsInput | $Enums.Tag[]
    reviews?: ReviewUpdateManyWithoutProductNestedInput
    orderItems?: OrderItemUpdateManyWithoutProductNestedInput
    wishLists?: WishListUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutSubcategoryInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    images?: ProductUpdateimagesInput | string[]
    sizes?: ProductUpdatesizesInput | string[]
    colors?: ProductUpdatecolorsInput | string[]
    tags?: ProductUpdatetagsInput | $Enums.Tag[]
    reviews?: ReviewUncheckedUpdateManyWithoutProductNestedInput
    orderItems?: OrderItemUncheckedUpdateManyWithoutProductNestedInput
    wishLists?: WishListUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateManyWithoutSubcategoryInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    images?: ProductUpdateimagesInput | string[]
    sizes?: ProductUpdatesizesInput | string[]
    colors?: ProductUpdatecolorsInput | string[]
    tags?: ProductUpdatetagsInput | $Enums.Tag[]
  }

  export type ReviewCreateManyProductInput = {
    id?: string
    reviewerId: string
    rating: number
    title: string
    details: string
    date: Date | string
    verified?: boolean
  }

  export type OrderItemCreateManyProductInput = {
    id?: string
    orderId: string
    quantity?: number
  }

  export type WishListCreateManyProductInput = {
    id?: string
    userId: string
    selectedSize?: string | null
    selectedColor?: string | null
    createdAt?: Date | string
  }

  export type ReviewUpdateWithoutProductInput = {
    rating?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    details?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    reviewer?: UserUpdateOneRequiredWithoutReviewsNestedInput
  }

  export type ReviewUncheckedUpdateWithoutProductInput = {
    reviewerId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    details?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    verified?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ReviewUncheckedUpdateManyWithoutProductInput = {
    reviewerId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    details?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    verified?: BoolFieldUpdateOperationsInput | boolean
  }

  export type OrderItemUpdateWithoutProductInput = {
    quantity?: IntFieldUpdateOperationsInput | number
    order?: OrderUpdateOneRequiredWithoutItemsNestedInput
  }

  export type OrderItemUncheckedUpdateWithoutProductInput = {
    orderId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
  }

  export type OrderItemUncheckedUpdateManyWithoutProductInput = {
    orderId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
  }

  export type WishListUpdateWithoutProductInput = {
    selectedSize?: NullableStringFieldUpdateOperationsInput | string | null
    selectedColor?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutWishListNestedInput
  }

  export type WishListUncheckedUpdateWithoutProductInput = {
    userId?: StringFieldUpdateOperationsInput | string
    selectedSize?: NullableStringFieldUpdateOperationsInput | string | null
    selectedColor?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WishListUncheckedUpdateManyWithoutProductInput = {
    userId?: StringFieldUpdateOperationsInput | string
    selectedSize?: NullableStringFieldUpdateOperationsInput | string | null
    selectedColor?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderItemCreateManyOrderInput = {
    id?: string
    productId: string
    quantity?: number
  }

  export type OrderItemUpdateWithoutOrderInput = {
    quantity?: IntFieldUpdateOperationsInput | number
    product?: ProductUpdateOneRequiredWithoutOrderItemsNestedInput
  }

  export type OrderItemUncheckedUpdateWithoutOrderInput = {
    productId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
  }

  export type OrderItemUncheckedUpdateManyWithoutOrderInput = {
    productId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}