import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** The `Money` scalar type represents monetary values and supports signed double-precision fractional values as specified by [IEEE 754](https://en.wikipedia.org/wiki/IEEE_floating_point). */
  Money: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type ActiveOrderResult = NoActiveOrderError | Order;

export type AddPaymentToOrderResult = IneligiblePaymentMethodError | NoActiveOrderError | Order | OrderPaymentStateError | OrderStateTransitionError | PaymentDeclinedError | PaymentFailedError;

export type AddQrPaymentProofResponse = {
  __typename?: 'AddQrPaymentProofResponse';
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type Address = Node & {
  __typename?: 'Address';
  city?: Maybe<Scalars['String']>;
  company?: Maybe<Scalars['String']>;
  country: Country;
  createdAt: Scalars['DateTime'];
  customFields?: Maybe<AddressCustomFields>;
  defaultBillingAddress?: Maybe<Scalars['Boolean']>;
  defaultShippingAddress?: Maybe<Scalars['Boolean']>;
  fullName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  phoneNumber?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  province?: Maybe<Scalars['String']>;
  streetLine1: Scalars['String'];
  streetLine2?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type AddressCustomFields = {
  __typename?: 'AddressCustomFields';
  vat?: Maybe<Scalars['String']>;
};

export type Adjustment = {
  __typename?: 'Adjustment';
  adjustmentSource: Scalars['String'];
  amount: Scalars['Money'];
  data?: Maybe<Scalars['JSON']>;
  description: Scalars['String'];
  type: AdjustmentType;
};

export enum AdjustmentType {
  DistributedOrderPromotion = 'DISTRIBUTED_ORDER_PROMOTION',
  Other = 'OTHER',
  Promotion = 'PROMOTION'
}

/** Returned when attempting to set the Customer for an Order when already logged in. */
export type AlreadyLoggedInError = ErrorResult & {
  __typename?: 'AlreadyLoggedInError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

export type Answer = Node & {
  __typename?: 'Answer';
  id: Scalars['ID'];
  question: Question;
  text: Scalars['String'];
};

export type ApplyCouponCodeResult = CouponCodeExpiredError | CouponCodeInvalidError | CouponCodeLimitError | Order;

export type AreasListResponse = {
  __typename?: 'AreasListResponse';
  areas: Array<Scalars['String']>;
};

export type Asset = Node & {
  __typename?: 'Asset';
  createdAt: Scalars['DateTime'];
  customFields?: Maybe<AssetCustomFields>;
  fileSize: Scalars['Int'];
  focalPoint?: Maybe<Coordinate>;
  height: Scalars['Int'];
  id: Scalars['ID'];
  mimeType: Scalars['String'];
  name: Scalars['String'];
  preview: Scalars['String'];
  source: Scalars['String'];
  tags: Array<Tag>;
  type: AssetType;
  updatedAt: Scalars['DateTime'];
  width: Scalars['Int'];
};

export type AssetCustomFields = {
  __typename?: 'AssetCustomFields';
  isQrPaymentProofImage?: Maybe<Scalars['Boolean']>;
};

export type AssetList = PaginatedList & {
  __typename?: 'AssetList';
  items: Array<Asset>;
  totalItems: Scalars['Int'];
};

export enum AssetType {
  Binary = 'BINARY',
  Image = 'IMAGE',
  Video = 'VIDEO'
}

export type AuthenticationInput = {
  google?: InputMaybe<GoogleAuthInput>;
  native?: InputMaybe<NativeAuthInput>;
};

export type AuthenticationMethod = Node & {
  __typename?: 'AuthenticationMethod';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  strategy: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type AuthenticationResult = CurrentUser | InvalidCredentialsError | NotVerifiedError;

export type Banner = {
  __typename?: 'Banner';
  createdAt: Scalars['DateTime'];
  ctaLink: Scalars['String'];
  ctaText: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['ID'];
  image: Asset;
  price: Scalars['Int'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type BooleanCustomFieldConfig = CustomField & {
  __typename?: 'BooleanCustomFieldConfig';
  description?: Maybe<Array<LocalizedString>>;
  internal?: Maybe<Scalars['Boolean']>;
  label?: Maybe<Array<LocalizedString>>;
  list: Scalars['Boolean'];
  name: Scalars['String'];
  nullable?: Maybe<Scalars['Boolean']>;
  readonly?: Maybe<Scalars['Boolean']>;
  requiresPermission?: Maybe<Array<Permission>>;
  type: Scalars['String'];
  ui?: Maybe<Scalars['JSON']>;
};

/** Operators for filtering on a list of Boolean fields */
export type BooleanListOperators = {
  inList: Scalars['Boolean'];
};

/** Operators for filtering on a Boolean field */
export type BooleanOperators = {
  eq?: InputMaybe<Scalars['Boolean']>;
  isNull?: InputMaybe<Scalars['Boolean']>;
};

export type BooleanStructFieldConfig = StructField & {
  __typename?: 'BooleanStructFieldConfig';
  description?: Maybe<Array<LocalizedString>>;
  label?: Maybe<Array<LocalizedString>>;
  list: Scalars['Boolean'];
  name: Scalars['String'];
  type: Scalars['String'];
  ui?: Maybe<Scalars['JSON']>;
};

export type BranchListResponse = {
  __typename?: 'BranchListResponse';
  branches: Array<Scalars['String']>;
};

export type Channel = Node & {
  __typename?: 'Channel';
  availableCurrencyCodes: Array<CurrencyCode>;
  availableLanguageCodes?: Maybe<Array<LanguageCode>>;
  code: Scalars['String'];
  createdAt: Scalars['DateTime'];
  /** @deprecated Use defaultCurrencyCode instead */
  currencyCode: CurrencyCode;
  customFields?: Maybe<ChannelCustomFields>;
  defaultCurrencyCode: CurrencyCode;
  defaultLanguageCode: LanguageCode;
  defaultShippingZone?: Maybe<Zone>;
  defaultTaxZone?: Maybe<Zone>;
  id: Scalars['ID'];
  /** Not yet used - will be implemented in a future release. */
  outOfStockThreshold?: Maybe<Scalars['Int']>;
  pricesIncludeTax: Scalars['Boolean'];
  seller?: Maybe<Seller>;
  token: Scalars['String'];
  /** Not yet used - will be implemented in a future release. */
  trackInventory?: Maybe<Scalars['Boolean']>;
  updatedAt: Scalars['DateTime'];
};

export type ChannelCustomFields = {
  __typename?: 'ChannelCustomFields';
  heroSection?: Maybe<Array<ChannelHeroSectionStruct>>;
  khaltiSecretKey?: Maybe<Scalars['String']>;
  loyaltyCodeName?: Maybe<Scalars['String']>;
  loyaltyCurrencyCode?: Maybe<Scalars['String']>;
  loyaltyCurrencyRate?: Maybe<Scalars['Float']>;
  ncmApiKey?: Maybe<Scalars['String']>;
  ncmCreationBranch?: Maybe<Scalars['String']>;
  orderBonus?: Maybe<Array<ChannelOrderBonusStruct>>;
  pickupLocation?: Maybe<Scalars['String']>;
  signupBonus?: Maybe<Scalars['Int']>;
  socialLinks?: Maybe<ChannelSocialLinksStruct>;
  vendorBusinessName?: Maybe<Scalars['String']>;
  vendorName?: Maybe<Scalars['String']>;
};

export type ChannelHeroSectionStruct = {
  __typename?: 'ChannelHeroSectionStruct';
  buttonLabel?: Maybe<Scalars['String']>;
  buttonUrl?: Maybe<Scalars['String']>;
  heading?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  subtext?: Maybe<Scalars['String']>;
  tagline?: Maybe<Scalars['String']>;
};

export type ChannelOrderBonusStruct = {
  __typename?: 'ChannelOrderBonusStruct';
  coins?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  maxOrderValue?: Maybe<Scalars['Int']>;
  minOrderValue?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  rewardInterval?: Maybe<Scalars['Int']>;
};

export type ChannelSocialLinksStruct = {
  __typename?: 'ChannelSocialLinksStruct';
  facebook?: Maybe<Scalars['String']>;
  instagram?: Maybe<Scalars['String']>;
  linkedin?: Maybe<Scalars['String']>;
  tiktok?: Maybe<Scalars['String']>;
  twitter?: Maybe<Scalars['String']>;
  whatsapp?: Maybe<Scalars['String']>;
  youtube?: Maybe<Scalars['String']>;
};

export type CityListResponse = {
  __typename?: 'CityListResponse';
  cities: Array<Scalars['String']>;
};

export type Collection = Node & {
  __typename?: 'Collection';
  assets: Array<Asset>;
  breadcrumbs: Array<CollectionBreadcrumb>;
  children?: Maybe<Array<Collection>>;
  createdAt: Scalars['DateTime'];
  customFields?: Maybe<CollectionCustomFields>;
  description: Scalars['String'];
  featuredAsset?: Maybe<Asset>;
  filters: Array<ConfigurableOperation>;
  id: Scalars['ID'];
  languageCode?: Maybe<LanguageCode>;
  name: Scalars['String'];
  parent?: Maybe<Collection>;
  parentId: Scalars['ID'];
  position: Scalars['Int'];
  productVariants: ProductVariantList;
  slug: Scalars['String'];
  translations: Array<CollectionTranslation>;
  updatedAt: Scalars['DateTime'];
};


export type CollectionProductVariantsArgs = {
  options?: InputMaybe<ProductVariantListOptions>;
};

export type CollectionBreadcrumb = {
  __typename?: 'CollectionBreadcrumb';
  id: Scalars['ID'];
  name: Scalars['String'];
  slug: Scalars['String'];
};

export type CollectionCustomFields = {
  __typename?: 'CollectionCustomFields';
  popularityScore?: Maybe<Scalars['Int']>;
  showInNavBar?: Maybe<Scalars['Boolean']>;
};

export type CollectionFilterParameter = {
  _and?: InputMaybe<Array<CollectionFilterParameter>>;
  _or?: InputMaybe<Array<CollectionFilterParameter>>;
  createdAt?: InputMaybe<DateOperators>;
  description?: InputMaybe<StringOperators>;
  id?: InputMaybe<IdOperators>;
  languageCode?: InputMaybe<StringOperators>;
  name?: InputMaybe<StringOperators>;
  parentId?: InputMaybe<IdOperators>;
  popularityScore?: InputMaybe<NumberOperators>;
  position?: InputMaybe<NumberOperators>;
  showInNavBar?: InputMaybe<BooleanOperators>;
  slug?: InputMaybe<StringOperators>;
  updatedAt?: InputMaybe<DateOperators>;
};

export type CollectionList = PaginatedList & {
  __typename?: 'CollectionList';
  items: Array<Collection>;
  totalItems: Scalars['Int'];
};

export type CollectionListOptions = {
  /** Allows the results to be filtered */
  filter?: InputMaybe<CollectionFilterParameter>;
  /** Specifies whether multiple top-level "filter" fields should be combined with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: InputMaybe<LogicalOperator>;
  /** Skips the first n results, for use in pagination */
  skip?: InputMaybe<Scalars['Int']>;
  /** Specifies which properties to sort the results by */
  sort?: InputMaybe<CollectionSortParameter>;
  /** Takes n results, for use in pagination */
  take?: InputMaybe<Scalars['Int']>;
  topLevelOnly?: InputMaybe<Scalars['Boolean']>;
};

/**
 * Which Collections are present in the products returned
 * by the search, and in what quantity.
 */
export type CollectionResult = {
  __typename?: 'CollectionResult';
  collection: Collection;
  count: Scalars['Int'];
};

export type CollectionSortParameter = {
  createdAt?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  parentId?: InputMaybe<SortOrder>;
  popularityScore?: InputMaybe<SortOrder>;
  position?: InputMaybe<SortOrder>;
  showInNavBar?: InputMaybe<SortOrder>;
  slug?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type CollectionTranslation = {
  __typename?: 'CollectionTranslation';
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['ID'];
  languageCode: LanguageCode;
  name: Scalars['String'];
  slug: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type ConfigArg = {
  __typename?: 'ConfigArg';
  name: Scalars['String'];
  value: Scalars['String'];
};

export type ConfigArgDefinition = {
  __typename?: 'ConfigArgDefinition';
  defaultValue?: Maybe<Scalars['JSON']>;
  description?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  list: Scalars['Boolean'];
  name: Scalars['String'];
  required: Scalars['Boolean'];
  type: Scalars['String'];
  ui?: Maybe<Scalars['JSON']>;
};

export type ConfigArgInput = {
  name: Scalars['String'];
  /** A JSON stringified representation of the actual value */
  value: Scalars['String'];
};

export type ConfigurableOperation = {
  __typename?: 'ConfigurableOperation';
  args: Array<ConfigArg>;
  code: Scalars['String'];
};

export type ConfigurableOperationDefinition = {
  __typename?: 'ConfigurableOperationDefinition';
  args: Array<ConfigArgDefinition>;
  code: Scalars['String'];
  description: Scalars['String'];
};

export type ConfigurableOperationInput = {
  arguments: Array<ConfigArgInput>;
  code: Scalars['String'];
};

export type Contact = Node & {
  __typename?: 'Contact';
  createdAt: Scalars['DateTime'];
  emailAddress: Scalars['String'];
  id: Scalars['ID'];
  message: Scalars['String'];
  name: Scalars['String'];
  phone: Scalars['String'];
  subject: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type ContactFilterParameter = {
  _and?: InputMaybe<Array<ContactFilterParameter>>;
  _or?: InputMaybe<Array<ContactFilterParameter>>;
  createdAt?: InputMaybe<DateOperators>;
  emailAddress?: InputMaybe<StringOperators>;
  id?: InputMaybe<IdOperators>;
  message?: InputMaybe<StringOperators>;
  name?: InputMaybe<StringOperators>;
  phone?: InputMaybe<StringOperators>;
  subject?: InputMaybe<StringOperators>;
  updatedAt?: InputMaybe<DateOperators>;
};

export type ContactList = PaginatedList & {
  __typename?: 'ContactList';
  items: Array<Contact>;
  totalItems: Scalars['Int'];
};

export type ContactListOptions = {
  /** Allows the results to be filtered */
  filter?: InputMaybe<ContactFilterParameter>;
  /** Specifies whether multiple top-level "filter" fields should be combined with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: InputMaybe<LogicalOperator>;
  /** Skips the first n results, for use in pagination */
  skip?: InputMaybe<Scalars['Int']>;
  /** Specifies which properties to sort the results by */
  sort?: InputMaybe<ContactSortParameter>;
  /** Takes n results, for use in pagination */
  take?: InputMaybe<Scalars['Int']>;
};

export type ContactSortParameter = {
  createdAt?: InputMaybe<SortOrder>;
  emailAddress?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  message?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  phone?: InputMaybe<SortOrder>;
  subject?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type Coordinate = {
  __typename?: 'Coordinate';
  x: Scalars['Float'];
  y: Scalars['Float'];
};

/**
 * A Country of the world which your shop operates in.
 *
 * The `code` field is typically a 2-character ISO code such as "GB", "US", "DE" etc. This code is used in certain inputs such as
 * `UpdateAddressInput` and `CreateAddressInput` to specify the country.
 */
export type Country = Node & Region & {
  __typename?: 'Country';
  code: Scalars['String'];
  createdAt: Scalars['DateTime'];
  customFields?: Maybe<Scalars['JSON']>;
  enabled: Scalars['Boolean'];
  id: Scalars['ID'];
  languageCode: LanguageCode;
  name: Scalars['String'];
  parent?: Maybe<Region>;
  parentId?: Maybe<Scalars['ID']>;
  translations: Array<RegionTranslation>;
  type: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type CountryList = PaginatedList & {
  __typename?: 'CountryList';
  items: Array<Country>;
  totalItems: Scalars['Int'];
};

/** Returned if the provided coupon code is invalid */
export type CouponCodeExpiredError = ErrorResult & {
  __typename?: 'CouponCodeExpiredError';
  couponCode: Scalars['String'];
  errorCode: ErrorCode;
  message: Scalars['String'];
};

/** Returned if the provided coupon code is invalid */
export type CouponCodeInvalidError = ErrorResult & {
  __typename?: 'CouponCodeInvalidError';
  couponCode: Scalars['String'];
  errorCode: ErrorCode;
  message: Scalars['String'];
};

/** Returned if the provided coupon code is invalid */
export type CouponCodeLimitError = ErrorResult & {
  __typename?: 'CouponCodeLimitError';
  couponCode: Scalars['String'];
  errorCode: ErrorCode;
  limit: Scalars['Int'];
  message: Scalars['String'];
};

export type CreateAddressCustomFieldsInput = {
  vat?: InputMaybe<Scalars['String']>;
};

/**
 * Input used to create an Address.
 *
 * The countryCode must correspond to a `code` property of a Country that has been defined in the
 * Vendure server. The `code` property is typically a 2-character ISO code such as "GB", "US", "DE" etc.
 * If an invalid code is passed, the mutation will fail.
 */
export type CreateAddressInput = {
  city?: InputMaybe<Scalars['String']>;
  company?: InputMaybe<Scalars['String']>;
  countryCode: Scalars['String'];
  customFields?: InputMaybe<CreateAddressCustomFieldsInput>;
  defaultBillingAddress?: InputMaybe<Scalars['Boolean']>;
  defaultShippingAddress?: InputMaybe<Scalars['Boolean']>;
  fullName?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  postalCode?: InputMaybe<Scalars['String']>;
  province?: InputMaybe<Scalars['String']>;
  streetLine1: Scalars['String'];
  streetLine2?: InputMaybe<Scalars['String']>;
};

export type CreateContactInput = {
  emailAddress: Scalars['String'];
  message: Scalars['String'];
  name: Scalars['String'];
  phone: Scalars['String'];
  subject: Scalars['String'];
};

export type CreateCustomerCustomFieldsInput = {
  avatarUrlId?: InputMaybe<Scalars['ID']>;
  bankAccount?: InputMaybe<CustomerBankAccountStructInput>;
  businessName?: InputMaybe<Scalars['String']>;
  isBusiness?: InputMaybe<Scalars['Boolean']>;
  isVerified?: InputMaybe<Scalars['Boolean']>;
  scheduleDeleteAt?: InputMaybe<Scalars['DateTime']>;
  vatPan?: InputMaybe<Scalars['String']>;
};

export type CreateCustomerInput = {
  customFields?: InputMaybe<CreateCustomerCustomFieldsInput>;
  emailAddress: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  phoneNumber?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type CreateSellerRegistrationInput = {
  address?: InputMaybe<Scalars['String']>;
  businessName: Scalars['String'];
  businessRegistrationNo: Scalars['String'];
  email: Scalars['String'];
  ownerName: Scalars['String'];
  panNo: Scalars['String'];
  phone: Scalars['String'];
};

/**
 * @description
 * ISO 4217 currency code
 *
 * @docsCategory common
 */
export enum CurrencyCode {
  /** United Arab Emirates dirham */
  Aed = 'AED',
  /** Afghan afghani */
  Afn = 'AFN',
  /** Albanian lek */
  All = 'ALL',
  /** Armenian dram */
  Amd = 'AMD',
  /** Netherlands Antillean guilder */
  Ang = 'ANG',
  /** Angolan kwanza */
  Aoa = 'AOA',
  /** Argentine peso */
  Ars = 'ARS',
  /** Australian dollar */
  Aud = 'AUD',
  /** Aruban florin */
  Awg = 'AWG',
  /** Azerbaijani manat */
  Azn = 'AZN',
  /** Bosnia and Herzegovina convertible mark */
  Bam = 'BAM',
  /** Barbados dollar */
  Bbd = 'BBD',
  /** Bangladeshi taka */
  Bdt = 'BDT',
  /** Bulgarian lev */
  Bgn = 'BGN',
  /** Bahraini dinar */
  Bhd = 'BHD',
  /** Burundian franc */
  Bif = 'BIF',
  /** Bermudian dollar */
  Bmd = 'BMD',
  /** Brunei dollar */
  Bnd = 'BND',
  /** Boliviano */
  Bob = 'BOB',
  /** Brazilian real */
  Brl = 'BRL',
  /** Bahamian dollar */
  Bsd = 'BSD',
  /** Bhutanese ngultrum */
  Btn = 'BTN',
  /** Botswana pula */
  Bwp = 'BWP',
  /** Belarusian ruble */
  Byn = 'BYN',
  /** Belize dollar */
  Bzd = 'BZD',
  /** Canadian dollar */
  Cad = 'CAD',
  /** Congolese franc */
  Cdf = 'CDF',
  /** Swiss franc */
  Chf = 'CHF',
  /** Chilean peso */
  Clp = 'CLP',
  /** Renminbi (Chinese) yuan */
  Cny = 'CNY',
  /** Colombian peso */
  Cop = 'COP',
  /** Costa Rican colon */
  Crc = 'CRC',
  /** Cuban convertible peso */
  Cuc = 'CUC',
  /** Cuban peso */
  Cup = 'CUP',
  /** Cape Verde escudo */
  Cve = 'CVE',
  /** Czech koruna */
  Czk = 'CZK',
  /** Djiboutian franc */
  Djf = 'DJF',
  /** Danish krone */
  Dkk = 'DKK',
  /** Dominican peso */
  Dop = 'DOP',
  /** Algerian dinar */
  Dzd = 'DZD',
  /** Egyptian pound */
  Egp = 'EGP',
  /** Eritrean nakfa */
  Ern = 'ERN',
  /** Ethiopian birr */
  Etb = 'ETB',
  /** Euro */
  Eur = 'EUR',
  /** Fiji dollar */
  Fjd = 'FJD',
  /** Falkland Islands pound */
  Fkp = 'FKP',
  /** Pound sterling */
  Gbp = 'GBP',
  /** Georgian lari */
  Gel = 'GEL',
  /** Ghanaian cedi */
  Ghs = 'GHS',
  /** Gibraltar pound */
  Gip = 'GIP',
  /** Gambian dalasi */
  Gmd = 'GMD',
  /** Guinean franc */
  Gnf = 'GNF',
  /** Guatemalan quetzal */
  Gtq = 'GTQ',
  /** Guyanese dollar */
  Gyd = 'GYD',
  /** Hong Kong dollar */
  Hkd = 'HKD',
  /** Honduran lempira */
  Hnl = 'HNL',
  /** Croatian kuna */
  Hrk = 'HRK',
  /** Haitian gourde */
  Htg = 'HTG',
  /** Hungarian forint */
  Huf = 'HUF',
  /** Indonesian rupiah */
  Idr = 'IDR',
  /** Israeli new shekel */
  Ils = 'ILS',
  /** Indian rupee */
  Inr = 'INR',
  /** Iraqi dinar */
  Iqd = 'IQD',
  /** Iranian rial */
  Irr = 'IRR',
  /** Icelandic króna */
  Isk = 'ISK',
  /** Jamaican dollar */
  Jmd = 'JMD',
  /** Jordanian dinar */
  Jod = 'JOD',
  /** Japanese yen */
  Jpy = 'JPY',
  /** Kenyan shilling */
  Kes = 'KES',
  /** Kyrgyzstani som */
  Kgs = 'KGS',
  /** Cambodian riel */
  Khr = 'KHR',
  /** Comoro franc */
  Kmf = 'KMF',
  /** North Korean won */
  Kpw = 'KPW',
  /** South Korean won */
  Krw = 'KRW',
  /** Kuwaiti dinar */
  Kwd = 'KWD',
  /** Cayman Islands dollar */
  Kyd = 'KYD',
  /** Kazakhstani tenge */
  Kzt = 'KZT',
  /** Lao kip */
  Lak = 'LAK',
  /** Lebanese pound */
  Lbp = 'LBP',
  /** Sri Lankan rupee */
  Lkr = 'LKR',
  /** Liberian dollar */
  Lrd = 'LRD',
  /** Lesotho loti */
  Lsl = 'LSL',
  /** Libyan dinar */
  Lyd = 'LYD',
  /** Moroccan dirham */
  Mad = 'MAD',
  /** Moldovan leu */
  Mdl = 'MDL',
  /** Malagasy ariary */
  Mga = 'MGA',
  /** Macedonian denar */
  Mkd = 'MKD',
  /** Myanmar kyat */
  Mmk = 'MMK',
  /** Mongolian tögrög */
  Mnt = 'MNT',
  /** Macanese pataca */
  Mop = 'MOP',
  /** Mauritanian ouguiya */
  Mru = 'MRU',
  /** Mauritian rupee */
  Mur = 'MUR',
  /** Maldivian rufiyaa */
  Mvr = 'MVR',
  /** Malawian kwacha */
  Mwk = 'MWK',
  /** Mexican peso */
  Mxn = 'MXN',
  /** Malaysian ringgit */
  Myr = 'MYR',
  /** Mozambican metical */
  Mzn = 'MZN',
  /** Namibian dollar */
  Nad = 'NAD',
  /** Nigerian naira */
  Ngn = 'NGN',
  /** Nicaraguan córdoba */
  Nio = 'NIO',
  /** Norwegian krone */
  Nok = 'NOK',
  /** Nepalese rupee */
  Npr = 'NPR',
  /** New Zealand dollar */
  Nzd = 'NZD',
  /** Omani rial */
  Omr = 'OMR',
  /** Panamanian balboa */
  Pab = 'PAB',
  /** Peruvian sol */
  Pen = 'PEN',
  /** Papua New Guinean kina */
  Pgk = 'PGK',
  /** Philippine peso */
  Php = 'PHP',
  /** Pakistani rupee */
  Pkr = 'PKR',
  /** Polish złoty */
  Pln = 'PLN',
  /** Paraguayan guaraní */
  Pyg = 'PYG',
  /** Qatari riyal */
  Qar = 'QAR',
  /** Romanian leu */
  Ron = 'RON',
  /** Serbian dinar */
  Rsd = 'RSD',
  /** Russian ruble */
  Rub = 'RUB',
  /** Rwandan franc */
  Rwf = 'RWF',
  /** Saudi riyal */
  Sar = 'SAR',
  /** Solomon Islands dollar */
  Sbd = 'SBD',
  /** Seychelles rupee */
  Scr = 'SCR',
  /** Sudanese pound */
  Sdg = 'SDG',
  /** Swedish krona/kronor */
  Sek = 'SEK',
  /** Singapore dollar */
  Sgd = 'SGD',
  /** Saint Helena pound */
  Shp = 'SHP',
  /** Sierra Leonean leone */
  Sll = 'SLL',
  /** Somali shilling */
  Sos = 'SOS',
  /** Surinamese dollar */
  Srd = 'SRD',
  /** South Sudanese pound */
  Ssp = 'SSP',
  /** São Tomé and Príncipe dobra */
  Stn = 'STN',
  /** Salvadoran colón */
  Svc = 'SVC',
  /** Syrian pound */
  Syp = 'SYP',
  /** Swazi lilangeni */
  Szl = 'SZL',
  /** Thai baht */
  Thb = 'THB',
  /** Tajikistani somoni */
  Tjs = 'TJS',
  /** Turkmenistan manat */
  Tmt = 'TMT',
  /** Tunisian dinar */
  Tnd = 'TND',
  /** Tongan paʻanga */
  Top = 'TOP',
  /** Turkish lira */
  Try = 'TRY',
  /** Trinidad and Tobago dollar */
  Ttd = 'TTD',
  /** New Taiwan dollar */
  Twd = 'TWD',
  /** Tanzanian shilling */
  Tzs = 'TZS',
  /** Ukrainian hryvnia */
  Uah = 'UAH',
  /** Ugandan shilling */
  Ugx = 'UGX',
  /** United States dollar */
  Usd = 'USD',
  /** Uruguayan peso */
  Uyu = 'UYU',
  /** Uzbekistan som */
  Uzs = 'UZS',
  /** Venezuelan bolívar soberano */
  Ves = 'VES',
  /** Vietnamese đồng */
  Vnd = 'VND',
  /** Vanuatu vatu */
  Vuv = 'VUV',
  /** Samoan tala */
  Wst = 'WST',
  /** CFA franc BEAC */
  Xaf = 'XAF',
  /** East Caribbean dollar */
  Xcd = 'XCD',
  /** CFA franc BCEAO */
  Xof = 'XOF',
  /** CFP franc (franc Pacifique) */
  Xpf = 'XPF',
  /** Yemeni rial */
  Yer = 'YER',
  /** South African rand */
  Zar = 'ZAR',
  /** Zambian kwacha */
  Zmw = 'ZMW',
  /** Zimbabwean dollar */
  Zwl = 'ZWL'
}

export type CurrencyExchangeRateResponse = {
  __typename?: 'CurrencyExchangeRateResponse';
  aud?: Maybe<Scalars['String']>;
  npr?: Maybe<Scalars['String']>;
  usd?: Maybe<Scalars['String']>;
};

export type CurrentUser = {
  __typename?: 'CurrentUser';
  channels: Array<CurrentUserChannel>;
  id: Scalars['ID'];
  identifier: Scalars['String'];
};

export type CurrentUserChannel = {
  __typename?: 'CurrentUserChannel';
  code: Scalars['String'];
  id: Scalars['ID'];
  permissions: Array<Permission>;
  token: Scalars['String'];
};

export type CustomField = {
  description?: Maybe<Array<LocalizedString>>;
  internal?: Maybe<Scalars['Boolean']>;
  label?: Maybe<Array<LocalizedString>>;
  list: Scalars['Boolean'];
  name: Scalars['String'];
  nullable?: Maybe<Scalars['Boolean']>;
  readonly?: Maybe<Scalars['Boolean']>;
  requiresPermission?: Maybe<Array<Permission>>;
  type: Scalars['String'];
  ui?: Maybe<Scalars['JSON']>;
};

export type CustomFieldConfig = BooleanCustomFieldConfig | DateTimeCustomFieldConfig | FloatCustomFieldConfig | IntCustomFieldConfig | LocaleStringCustomFieldConfig | LocaleTextCustomFieldConfig | RelationCustomFieldConfig | StringCustomFieldConfig | StructCustomFieldConfig | TextCustomFieldConfig;

export type Customer = Node & {
  __typename?: 'Customer';
  addresses?: Maybe<Array<Address>>;
  availableLoyaltyPoints: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  customFields?: Maybe<CustomerCustomFields>;
  emailAddress: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  orders: OrderList;
  phoneNumber?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  user?: Maybe<User>;
};


export type CustomerOrdersArgs = {
  options?: InputMaybe<OrderListOptions>;
};

export type CustomerBankAccountStruct = {
  __typename?: 'CustomerBankAccountStruct';
  accountNumber?: Maybe<Scalars['String']>;
  bankName?: Maybe<Scalars['String']>;
  branchName?: Maybe<Scalars['String']>;
};

export type CustomerBankAccountStructInput = {
  accountNumber?: InputMaybe<Scalars['String']>;
  bankName?: InputMaybe<Scalars['String']>;
  branchName?: InputMaybe<Scalars['String']>;
};

export type CustomerCustomFields = {
  __typename?: 'CustomerCustomFields';
  avatar?: Maybe<Asset>;
  avatarUrl?: Maybe<Asset>;
  bankAccount?: Maybe<CustomerBankAccountStruct>;
  businessName?: Maybe<Scalars['String']>;
  isBusiness?: Maybe<Scalars['Boolean']>;
  isVerified?: Maybe<Scalars['Boolean']>;
  scheduleDeleteAt?: Maybe<Scalars['DateTime']>;
  vatPan?: Maybe<Scalars['String']>;
};

export type CustomerFilterParameter = {
  _and?: InputMaybe<Array<CustomerFilterParameter>>;
  _or?: InputMaybe<Array<CustomerFilterParameter>>;
  availableLoyaltyPoints?: InputMaybe<NumberOperators>;
  businessName?: InputMaybe<StringOperators>;
  createdAt?: InputMaybe<DateOperators>;
  emailAddress?: InputMaybe<StringOperators>;
  firstName?: InputMaybe<StringOperators>;
  id?: InputMaybe<IdOperators>;
  isBusiness?: InputMaybe<BooleanOperators>;
  isVerified?: InputMaybe<BooleanOperators>;
  lastName?: InputMaybe<StringOperators>;
  phoneNumber?: InputMaybe<StringOperators>;
  scheduleDeleteAt?: InputMaybe<DateOperators>;
  title?: InputMaybe<StringOperators>;
  updatedAt?: InputMaybe<DateOperators>;
  vatPan?: InputMaybe<StringOperators>;
};

export type CustomerGroup = Node & {
  __typename?: 'CustomerGroup';
  createdAt: Scalars['DateTime'];
  customFields?: Maybe<Scalars['JSON']>;
  customers: CustomerList;
  id: Scalars['ID'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};


export type CustomerGroupCustomersArgs = {
  options?: InputMaybe<CustomerListOptions>;
};

export type CustomerList = PaginatedList & {
  __typename?: 'CustomerList';
  items: Array<Customer>;
  totalItems: Scalars['Int'];
};

export type CustomerListOptions = {
  /** Allows the results to be filtered */
  filter?: InputMaybe<CustomerFilterParameter>;
  /** Specifies whether multiple top-level "filter" fields should be combined with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: InputMaybe<LogicalOperator>;
  /** Skips the first n results, for use in pagination */
  skip?: InputMaybe<Scalars['Int']>;
  /** Specifies which properties to sort the results by */
  sort?: InputMaybe<CustomerSortParameter>;
  /** Takes n results, for use in pagination */
  take?: InputMaybe<Scalars['Int']>;
};

export type CustomerSortParameter = {
  availableLoyaltyPoints?: InputMaybe<SortOrder>;
  avatar?: InputMaybe<SortOrder>;
  avatarUrl?: InputMaybe<SortOrder>;
  businessName?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  emailAddress?: InputMaybe<SortOrder>;
  firstName?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isBusiness?: InputMaybe<SortOrder>;
  isVerified?: InputMaybe<SortOrder>;
  lastName?: InputMaybe<SortOrder>;
  phoneNumber?: InputMaybe<SortOrder>;
  scheduleDeleteAt?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  vatPan?: InputMaybe<SortOrder>;
};

/** Operators for filtering on a list of Date fields */
export type DateListOperators = {
  inList: Scalars['DateTime'];
};

/** Operators for filtering on a DateTime field */
export type DateOperators = {
  after?: InputMaybe<Scalars['DateTime']>;
  before?: InputMaybe<Scalars['DateTime']>;
  between?: InputMaybe<DateRange>;
  eq?: InputMaybe<Scalars['DateTime']>;
  isNull?: InputMaybe<Scalars['Boolean']>;
};

export type DateRange = {
  end: Scalars['DateTime'];
  start: Scalars['DateTime'];
};

/**
 * Expects the same validation formats as the `<input type="datetime-local">` HTML element.
 * See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/datetime-local#Additional_attributes
 */
export type DateTimeCustomFieldConfig = CustomField & {
  __typename?: 'DateTimeCustomFieldConfig';
  description?: Maybe<Array<LocalizedString>>;
  internal?: Maybe<Scalars['Boolean']>;
  label?: Maybe<Array<LocalizedString>>;
  list: Scalars['Boolean'];
  max?: Maybe<Scalars['String']>;
  min?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  nullable?: Maybe<Scalars['Boolean']>;
  readonly?: Maybe<Scalars['Boolean']>;
  requiresPermission?: Maybe<Array<Permission>>;
  step?: Maybe<Scalars['Int']>;
  type: Scalars['String'];
  ui?: Maybe<Scalars['JSON']>;
};

/**
 * Expects the same validation formats as the `<input type="datetime-local">` HTML element.
 * See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/datetime-local#Additional_attributes
 */
export type DateTimeStructFieldConfig = StructField & {
  __typename?: 'DateTimeStructFieldConfig';
  description?: Maybe<Array<LocalizedString>>;
  label?: Maybe<Array<LocalizedString>>;
  list: Scalars['Boolean'];
  max?: Maybe<Scalars['String']>;
  min?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  step?: Maybe<Scalars['Int']>;
  type: Scalars['String'];
  ui?: Maybe<Scalars['JSON']>;
};

export type DeleteBannerResponse = {
  __typename?: 'DeleteBannerResponse';
  result: Scalars['Boolean'];
};

export type DeletionResponse = {
  __typename?: 'DeletionResponse';
  message?: Maybe<Scalars['String']>;
  result: DeletionResult;
};

export enum DeletionResult {
  /** The entity was successfully deleted */
  Deleted = 'DELETED',
  /** Deletion did not take place, reason given in message */
  NotDeleted = 'NOT_DELETED'
}

export type Discount = {
  __typename?: 'Discount';
  adjustmentSource: Scalars['String'];
  amount: Scalars['Money'];
  amountWithTax: Scalars['Money'];
  description: Scalars['String'];
  type: AdjustmentType;
};

/** Returned when attempting to create a Customer with an email address already registered to an existing User. */
export type EmailAddressConflictError = ErrorResult & {
  __typename?: 'EmailAddressConflictError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

export enum ErrorCode {
  AlreadyLoggedInError = 'ALREADY_LOGGED_IN_ERROR',
  CouponCodeExpiredError = 'COUPON_CODE_EXPIRED_ERROR',
  CouponCodeInvalidError = 'COUPON_CODE_INVALID_ERROR',
  CouponCodeLimitError = 'COUPON_CODE_LIMIT_ERROR',
  EmailAddressConflictError = 'EMAIL_ADDRESS_CONFLICT_ERROR',
  GuestCheckoutError = 'GUEST_CHECKOUT_ERROR',
  IdentifierChangeTokenExpiredError = 'IDENTIFIER_CHANGE_TOKEN_EXPIRED_ERROR',
  IdentifierChangeTokenInvalidError = 'IDENTIFIER_CHANGE_TOKEN_INVALID_ERROR',
  IneligiblePaymentMethodError = 'INELIGIBLE_PAYMENT_METHOD_ERROR',
  IneligibleShippingMethodError = 'INELIGIBLE_SHIPPING_METHOD_ERROR',
  InsufficientLoyaltyPointsError = 'INSUFFICIENT_LOYALTY_POINTS_ERROR',
  InsufficientStockError = 'INSUFFICIENT_STOCK_ERROR',
  InvalidCredentialsError = 'INVALID_CREDENTIALS_ERROR',
  MissingPasswordError = 'MISSING_PASSWORD_ERROR',
  NativeAuthStrategyError = 'NATIVE_AUTH_STRATEGY_ERROR',
  NegativeQuantityError = 'NEGATIVE_QUANTITY_ERROR',
  NotVerifiedError = 'NOT_VERIFIED_ERROR',
  NoActiveOrderError = 'NO_ACTIVE_ORDER_ERROR',
  OrderInterceptorError = 'ORDER_INTERCEPTOR_ERROR',
  OrderLimitError = 'ORDER_LIMIT_ERROR',
  OrderModificationError = 'ORDER_MODIFICATION_ERROR',
  OrderPaymentStateError = 'ORDER_PAYMENT_STATE_ERROR',
  OrderStateTransitionError = 'ORDER_STATE_TRANSITION_ERROR',
  PasswordAlreadySetError = 'PASSWORD_ALREADY_SET_ERROR',
  PasswordResetTokenExpiredError = 'PASSWORD_RESET_TOKEN_EXPIRED_ERROR',
  PasswordResetTokenInvalidError = 'PASSWORD_RESET_TOKEN_INVALID_ERROR',
  PasswordValidationError = 'PASSWORD_VALIDATION_ERROR',
  PaymentDeclinedError = 'PAYMENT_DECLINED_ERROR',
  PaymentFailedError = 'PAYMENT_FAILED_ERROR',
  UnknownError = 'UNKNOWN_ERROR',
  VerificationTokenExpiredError = 'VERIFICATION_TOKEN_EXPIRED_ERROR',
  VerificationTokenInvalidError = 'VERIFICATION_TOKEN_INVALID_ERROR'
}

export type ErrorResult = {
  errorCode: ErrorCode;
  message: Scalars['String'];
};

export type ExampleType = {
  __typename?: 'ExampleType';
  name?: Maybe<Scalars['String']>;
};

export type Facet = Node & {
  __typename?: 'Facet';
  code: Scalars['String'];
  createdAt: Scalars['DateTime'];
  customFields?: Maybe<Scalars['JSON']>;
  id: Scalars['ID'];
  languageCode: LanguageCode;
  name: Scalars['String'];
  translations: Array<FacetTranslation>;
  updatedAt: Scalars['DateTime'];
  /** Returns a paginated, sortable, filterable list of the Facet's values. Added in v2.1.0. */
  valueList: FacetValueList;
  values: Array<FacetValue>;
};


export type FacetValueListArgs = {
  options?: InputMaybe<FacetValueListOptions>;
};

export type FacetFilterParameter = {
  _and?: InputMaybe<Array<FacetFilterParameter>>;
  _or?: InputMaybe<Array<FacetFilterParameter>>;
  code?: InputMaybe<StringOperators>;
  createdAt?: InputMaybe<DateOperators>;
  id?: InputMaybe<IdOperators>;
  languageCode?: InputMaybe<StringOperators>;
  name?: InputMaybe<StringOperators>;
  updatedAt?: InputMaybe<DateOperators>;
};

export type FacetList = PaginatedList & {
  __typename?: 'FacetList';
  items: Array<Facet>;
  totalItems: Scalars['Int'];
};

export type FacetListOptions = {
  /** Allows the results to be filtered */
  filter?: InputMaybe<FacetFilterParameter>;
  /** Specifies whether multiple top-level "filter" fields should be combined with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: InputMaybe<LogicalOperator>;
  /** Skips the first n results, for use in pagination */
  skip?: InputMaybe<Scalars['Int']>;
  /** Specifies which properties to sort the results by */
  sort?: InputMaybe<FacetSortParameter>;
  /** Takes n results, for use in pagination */
  take?: InputMaybe<Scalars['Int']>;
};

export type FacetSortParameter = {
  code?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type FacetTranslation = {
  __typename?: 'FacetTranslation';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  languageCode: LanguageCode;
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type FacetValue = Node & {
  __typename?: 'FacetValue';
  code: Scalars['String'];
  createdAt: Scalars['DateTime'];
  customFields?: Maybe<Scalars['JSON']>;
  facet: Facet;
  facetId: Scalars['ID'];
  id: Scalars['ID'];
  languageCode: LanguageCode;
  name: Scalars['String'];
  translations: Array<FacetValueTranslation>;
  updatedAt: Scalars['DateTime'];
};

/**
 * Used to construct boolean expressions for filtering search results
 * by FacetValue ID. Examples:
 *
 * * ID=1 OR ID=2: `{ facetValueFilters: [{ or: [1,2] }] }`
 * * ID=1 AND ID=2: `{ facetValueFilters: [{ and: 1 }, { and: 2 }] }`
 * * ID=1 AND (ID=2 OR ID=3): `{ facetValueFilters: [{ and: 1 }, { or: [2,3] }] }`
 */
export type FacetValueFilterInput = {
  and?: InputMaybe<Scalars['ID']>;
  or?: InputMaybe<Array<Scalars['ID']>>;
};

export type FacetValueFilterParameter = {
  _and?: InputMaybe<Array<FacetValueFilterParameter>>;
  _or?: InputMaybe<Array<FacetValueFilterParameter>>;
  code?: InputMaybe<StringOperators>;
  createdAt?: InputMaybe<DateOperators>;
  facetId?: InputMaybe<IdOperators>;
  id?: InputMaybe<IdOperators>;
  languageCode?: InputMaybe<StringOperators>;
  name?: InputMaybe<StringOperators>;
  updatedAt?: InputMaybe<DateOperators>;
};

export type FacetValueList = PaginatedList & {
  __typename?: 'FacetValueList';
  items: Array<FacetValue>;
  totalItems: Scalars['Int'];
};

export type FacetValueListOptions = {
  /** Allows the results to be filtered */
  filter?: InputMaybe<FacetValueFilterParameter>;
  /** Specifies whether multiple top-level "filter" fields should be combined with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: InputMaybe<LogicalOperator>;
  /** Skips the first n results, for use in pagination */
  skip?: InputMaybe<Scalars['Int']>;
  /** Specifies which properties to sort the results by */
  sort?: InputMaybe<FacetValueSortParameter>;
  /** Takes n results, for use in pagination */
  take?: InputMaybe<Scalars['Int']>;
};

/**
 * Which FacetValues are present in the products returned
 * by the search, and in what quantity.
 */
export type FacetValueResult = {
  __typename?: 'FacetValueResult';
  count: Scalars['Int'];
  facetValue: FacetValue;
};

export type FacetValueSortParameter = {
  code?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  facetId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type FacetValueTranslation = {
  __typename?: 'FacetValueTranslation';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  languageCode: LanguageCode;
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type FloatCustomFieldConfig = CustomField & {
  __typename?: 'FloatCustomFieldConfig';
  description?: Maybe<Array<LocalizedString>>;
  internal?: Maybe<Scalars['Boolean']>;
  label?: Maybe<Array<LocalizedString>>;
  list: Scalars['Boolean'];
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  name: Scalars['String'];
  nullable?: Maybe<Scalars['Boolean']>;
  readonly?: Maybe<Scalars['Boolean']>;
  requiresPermission?: Maybe<Array<Permission>>;
  step?: Maybe<Scalars['Float']>;
  type: Scalars['String'];
  ui?: Maybe<Scalars['JSON']>;
};

export type FloatStructFieldConfig = StructField & {
  __typename?: 'FloatStructFieldConfig';
  description?: Maybe<Array<LocalizedString>>;
  label?: Maybe<Array<LocalizedString>>;
  list: Scalars['Boolean'];
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  name: Scalars['String'];
  step?: Maybe<Scalars['Float']>;
  type: Scalars['String'];
  ui?: Maybe<Scalars['JSON']>;
};

export type Fulfillment = Node & {
  __typename?: 'Fulfillment';
  createdAt: Scalars['DateTime'];
  customFields?: Maybe<FulfillmentCustomFields>;
  id: Scalars['ID'];
  lines: Array<FulfillmentLine>;
  method: Scalars['String'];
  state: Scalars['String'];
  /** @deprecated Use the `lines` field instead */
  summary: Array<FulfillmentLine>;
  trackingCode?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type FulfillmentCustomFields = {
  __typename?: 'FulfillmentCustomFields';
  pickupTime?: Maybe<Scalars['String']>;
};

export type FulfillmentLine = {
  __typename?: 'FulfillmentLine';
  fulfillment: Fulfillment;
  fulfillmentId: Scalars['ID'];
  orderLine: OrderLine;
  orderLineId: Scalars['ID'];
  quantity: Scalars['Int'];
};

export enum GlobalFlag {
  False = 'FALSE',
  Inherit = 'INHERIT',
  True = 'TRUE'
}

export type GoogleAuthInput = {
  token: Scalars['String'];
};

/** Returned when attempting to set the Customer on a guest checkout when the configured GuestCheckoutStrategy does not allow it. */
export type GuestCheckoutError = ErrorResult & {
  __typename?: 'GuestCheckoutError';
  errorCode: ErrorCode;
  errorDetail: Scalars['String'];
  message: Scalars['String'];
};

export type HistoryEntry = Node & {
  __typename?: 'HistoryEntry';
  createdAt: Scalars['DateTime'];
  customFields?: Maybe<Scalars['JSON']>;
  data: Scalars['JSON'];
  id: Scalars['ID'];
  type: HistoryEntryType;
  updatedAt: Scalars['DateTime'];
};

export type HistoryEntryFilterParameter = {
  _and?: InputMaybe<Array<HistoryEntryFilterParameter>>;
  _or?: InputMaybe<Array<HistoryEntryFilterParameter>>;
  createdAt?: InputMaybe<DateOperators>;
  id?: InputMaybe<IdOperators>;
  type?: InputMaybe<StringOperators>;
  updatedAt?: InputMaybe<DateOperators>;
};

export type HistoryEntryList = PaginatedList & {
  __typename?: 'HistoryEntryList';
  items: Array<HistoryEntry>;
  totalItems: Scalars['Int'];
};

export type HistoryEntryListOptions = {
  /** Allows the results to be filtered */
  filter?: InputMaybe<HistoryEntryFilterParameter>;
  /** Specifies whether multiple top-level "filter" fields should be combined with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: InputMaybe<LogicalOperator>;
  /** Skips the first n results, for use in pagination */
  skip?: InputMaybe<Scalars['Int']>;
  /** Specifies which properties to sort the results by */
  sort?: InputMaybe<HistoryEntrySortParameter>;
  /** Takes n results, for use in pagination */
  take?: InputMaybe<Scalars['Int']>;
};

export type HistoryEntrySortParameter = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export enum HistoryEntryType {
  CustomerAddedToGroup = 'CUSTOMER_ADDED_TO_GROUP',
  CustomerAddressCreated = 'CUSTOMER_ADDRESS_CREATED',
  CustomerAddressDeleted = 'CUSTOMER_ADDRESS_DELETED',
  CustomerAddressUpdated = 'CUSTOMER_ADDRESS_UPDATED',
  CustomerDetailUpdated = 'CUSTOMER_DETAIL_UPDATED',
  CustomerEmailUpdateRequested = 'CUSTOMER_EMAIL_UPDATE_REQUESTED',
  CustomerEmailUpdateVerified = 'CUSTOMER_EMAIL_UPDATE_VERIFIED',
  CustomerNote = 'CUSTOMER_NOTE',
  CustomerPasswordResetRequested = 'CUSTOMER_PASSWORD_RESET_REQUESTED',
  CustomerPasswordResetVerified = 'CUSTOMER_PASSWORD_RESET_VERIFIED',
  CustomerPasswordUpdated = 'CUSTOMER_PASSWORD_UPDATED',
  CustomerRegistered = 'CUSTOMER_REGISTERED',
  CustomerRemovedFromGroup = 'CUSTOMER_REMOVED_FROM_GROUP',
  CustomerVerified = 'CUSTOMER_VERIFIED',
  OrderCancellation = 'ORDER_CANCELLATION',
  OrderCouponApplied = 'ORDER_COUPON_APPLIED',
  OrderCouponRemoved = 'ORDER_COUPON_REMOVED',
  OrderCustomerUpdated = 'ORDER_CUSTOMER_UPDATED',
  OrderFulfillment = 'ORDER_FULFILLMENT',
  OrderFulfillmentTransition = 'ORDER_FULFILLMENT_TRANSITION',
  OrderModified = 'ORDER_MODIFIED',
  OrderNote = 'ORDER_NOTE',
  OrderPaymentTransition = 'ORDER_PAYMENT_TRANSITION',
  OrderRefundTransition = 'ORDER_REFUND_TRANSITION',
  OrderStateTransition = 'ORDER_STATE_TRANSITION'
}

/** Operators for filtering on a list of ID fields */
export type IdListOperators = {
  inList: Scalars['ID'];
};

/** Operators for filtering on an ID field */
export type IdOperators = {
  eq?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  isNull?: InputMaybe<Scalars['Boolean']>;
  notEq?: InputMaybe<Scalars['String']>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
};

/**
 * Returned if the token used to change a Customer's email address is valid, but has
 * expired according to the `verificationTokenDuration` setting in the AuthOptions.
 */
export type IdentifierChangeTokenExpiredError = ErrorResult & {
  __typename?: 'IdentifierChangeTokenExpiredError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

/**
 * Returned if the token used to change a Customer's email address is either
 * invalid or does not match any expected tokens.
 */
export type IdentifierChangeTokenInvalidError = ErrorResult & {
  __typename?: 'IdentifierChangeTokenInvalidError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

/** Returned when attempting to add a Payment using a PaymentMethod for which the Order is not eligible. */
export type IneligiblePaymentMethodError = ErrorResult & {
  __typename?: 'IneligiblePaymentMethodError';
  eligibilityCheckerMessage?: Maybe<Scalars['String']>;
  errorCode: ErrorCode;
  message: Scalars['String'];
};

/** Returned when attempting to set a ShippingMethod for which the Order is not eligible */
export type IneligibleShippingMethodError = ErrorResult & {
  __typename?: 'IneligibleShippingMethodError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

export type InsufficientLoyaltyPointsError = ErrorResult & {
  __typename?: 'InsufficientLoyaltyPointsError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

/** Returned when attempting to add more items to the Order than are available */
export type InsufficientStockError = ErrorResult & {
  __typename?: 'InsufficientStockError';
  errorCode: ErrorCode;
  message: Scalars['String'];
  order: Order;
  quantityAvailable: Scalars['Int'];
};

export type IntCustomFieldConfig = CustomField & {
  __typename?: 'IntCustomFieldConfig';
  description?: Maybe<Array<LocalizedString>>;
  internal?: Maybe<Scalars['Boolean']>;
  label?: Maybe<Array<LocalizedString>>;
  list: Scalars['Boolean'];
  max?: Maybe<Scalars['Int']>;
  min?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
  nullable?: Maybe<Scalars['Boolean']>;
  readonly?: Maybe<Scalars['Boolean']>;
  requiresPermission?: Maybe<Array<Permission>>;
  step?: Maybe<Scalars['Int']>;
  type: Scalars['String'];
  ui?: Maybe<Scalars['JSON']>;
};

export type IntStructFieldConfig = StructField & {
  __typename?: 'IntStructFieldConfig';
  description?: Maybe<Array<LocalizedString>>;
  label?: Maybe<Array<LocalizedString>>;
  list: Scalars['Boolean'];
  max?: Maybe<Scalars['Int']>;
  min?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
  step?: Maybe<Scalars['Int']>;
  type: Scalars['String'];
  ui?: Maybe<Scalars['JSON']>;
};

/** Returned if the user authentication credentials are not valid */
export type InvalidCredentialsError = ErrorResult & {
  __typename?: 'InvalidCredentialsError';
  authenticationError: Scalars['String'];
  errorCode: ErrorCode;
  message: Scalars['String'];
};

export type Invoice = {
  __typename?: 'Invoice';
  accountingReference?: Maybe<InvoiceAccountingReference>;
  createdAt?: Maybe<Scalars['DateTime']>;
  downloadUrl: Scalars['String'];
  id: Scalars['ID'];
  invoiceNumber: Scalars['Int'];
  isCreditInvoice: Scalars['Boolean'];
  orderCode: Scalars['String'];
  orderId: Scalars['ID'];
  orderTotals: InvoiceOrderTotals;
};

export type InvoiceAccountingReference = {
  __typename?: 'InvoiceAccountingReference';
  errorMessage?: Maybe<Scalars['String']>;
  link?: Maybe<Scalars['String']>;
  reference?: Maybe<Scalars['String']>;
};

/**
 * The order totals that were used to generate the invoice.
 * These are used to generate credit invoices.
 */
export type InvoiceOrderTotals = {
  __typename?: 'InvoiceOrderTotals';
  taxSummaries: Array<InvoiceTaxSummary>;
  total: Scalars['Money'];
  totalWithTax: Scalars['Money'];
};

export type InvoiceTaxSummary = {
  __typename?: 'InvoiceTaxSummary';
  description: Scalars['String'];
  taxBase: Scalars['Money'];
  taxRate: Scalars['Money'];
  taxTotal: Scalars['Money'];
};

/**
 * @description
 * Languages in the form of a ISO 639-1 language code with optional
 * region or script modifier (e.g. de_AT). The selection available is based
 * on the [Unicode CLDR summary list](https://unicode-org.github.io/cldr-staging/charts/37/summary/root.html)
 * and includes the major spoken languages of the world and any widely-used variants.
 *
 * @docsCategory common
 */
export enum LanguageCode {
  /** Afrikaans */
  Af = 'af',
  /** Akan */
  Ak = 'ak',
  /** Amharic */
  Am = 'am',
  /** Arabic */
  Ar = 'ar',
  /** Assamese */
  As = 'as',
  /** Azerbaijani */
  Az = 'az',
  /** Belarusian */
  Be = 'be',
  /** Bulgarian */
  Bg = 'bg',
  /** Bambara */
  Bm = 'bm',
  /** Bangla */
  Bn = 'bn',
  /** Tibetan */
  Bo = 'bo',
  /** Breton */
  Br = 'br',
  /** Bosnian */
  Bs = 'bs',
  /** Catalan */
  Ca = 'ca',
  /** Chechen */
  Ce = 'ce',
  /** Corsican */
  Co = 'co',
  /** Czech */
  Cs = 'cs',
  /** Church Slavic */
  Cu = 'cu',
  /** Welsh */
  Cy = 'cy',
  /** Danish */
  Da = 'da',
  /** German */
  De = 'de',
  /** Austrian German */
  DeAt = 'de_AT',
  /** Swiss High German */
  DeCh = 'de_CH',
  /** Dzongkha */
  Dz = 'dz',
  /** Ewe */
  Ee = 'ee',
  /** Greek */
  El = 'el',
  /** English */
  En = 'en',
  /** Australian English */
  EnAu = 'en_AU',
  /** Canadian English */
  EnCa = 'en_CA',
  /** British English */
  EnGb = 'en_GB',
  /** American English */
  EnUs = 'en_US',
  /** Esperanto */
  Eo = 'eo',
  /** Spanish */
  Es = 'es',
  /** European Spanish */
  EsEs = 'es_ES',
  /** Mexican Spanish */
  EsMx = 'es_MX',
  /** Estonian */
  Et = 'et',
  /** Basque */
  Eu = 'eu',
  /** Persian */
  Fa = 'fa',
  /** Dari */
  FaAf = 'fa_AF',
  /** Fulah */
  Ff = 'ff',
  /** Finnish */
  Fi = 'fi',
  /** Faroese */
  Fo = 'fo',
  /** French */
  Fr = 'fr',
  /** Canadian French */
  FrCa = 'fr_CA',
  /** Swiss French */
  FrCh = 'fr_CH',
  /** Western Frisian */
  Fy = 'fy',
  /** Irish */
  Ga = 'ga',
  /** Scottish Gaelic */
  Gd = 'gd',
  /** Galician */
  Gl = 'gl',
  /** Gujarati */
  Gu = 'gu',
  /** Manx */
  Gv = 'gv',
  /** Hausa */
  Ha = 'ha',
  /** Hebrew */
  He = 'he',
  /** Hindi */
  Hi = 'hi',
  /** Croatian */
  Hr = 'hr',
  /** Haitian Creole */
  Ht = 'ht',
  /** Hungarian */
  Hu = 'hu',
  /** Armenian */
  Hy = 'hy',
  /** Interlingua */
  Ia = 'ia',
  /** Indonesian */
  Id = 'id',
  /** Igbo */
  Ig = 'ig',
  /** Sichuan Yi */
  Ii = 'ii',
  /** Icelandic */
  Is = 'is',
  /** Italian */
  It = 'it',
  /** Japanese */
  Ja = 'ja',
  /** Javanese */
  Jv = 'jv',
  /** Georgian */
  Ka = 'ka',
  /** Kikuyu */
  Ki = 'ki',
  /** Kazakh */
  Kk = 'kk',
  /** Kalaallisut */
  Kl = 'kl',
  /** Khmer */
  Km = 'km',
  /** Kannada */
  Kn = 'kn',
  /** Korean */
  Ko = 'ko',
  /** Kashmiri */
  Ks = 'ks',
  /** Kurdish */
  Ku = 'ku',
  /** Cornish */
  Kw = 'kw',
  /** Kyrgyz */
  Ky = 'ky',
  /** Latin */
  La = 'la',
  /** Luxembourgish */
  Lb = 'lb',
  /** Ganda */
  Lg = 'lg',
  /** Lingala */
  Ln = 'ln',
  /** Lao */
  Lo = 'lo',
  /** Lithuanian */
  Lt = 'lt',
  /** Luba-Katanga */
  Lu = 'lu',
  /** Latvian */
  Lv = 'lv',
  /** Malagasy */
  Mg = 'mg',
  /** Maori */
  Mi = 'mi',
  /** Macedonian */
  Mk = 'mk',
  /** Malayalam */
  Ml = 'ml',
  /** Mongolian */
  Mn = 'mn',
  /** Marathi */
  Mr = 'mr',
  /** Malay */
  Ms = 'ms',
  /** Maltese */
  Mt = 'mt',
  /** Burmese */
  My = 'my',
  /** Norwegian Bokmål */
  Nb = 'nb',
  /** North Ndebele */
  Nd = 'nd',
  /** Nepali */
  Ne = 'ne',
  /** Dutch */
  Nl = 'nl',
  /** Flemish */
  NlBe = 'nl_BE',
  /** Norwegian Nynorsk */
  Nn = 'nn',
  /** Nyanja */
  Ny = 'ny',
  /** Oromo */
  Om = 'om',
  /** Odia */
  Or = 'or',
  /** Ossetic */
  Os = 'os',
  /** Punjabi */
  Pa = 'pa',
  /** Polish */
  Pl = 'pl',
  /** Pashto */
  Ps = 'ps',
  /** Portuguese */
  Pt = 'pt',
  /** Brazilian Portuguese */
  PtBr = 'pt_BR',
  /** European Portuguese */
  PtPt = 'pt_PT',
  /** Quechua */
  Qu = 'qu',
  /** Romansh */
  Rm = 'rm',
  /** Rundi */
  Rn = 'rn',
  /** Romanian */
  Ro = 'ro',
  /** Moldavian */
  RoMd = 'ro_MD',
  /** Russian */
  Ru = 'ru',
  /** Kinyarwanda */
  Rw = 'rw',
  /** Sanskrit */
  Sa = 'sa',
  /** Sindhi */
  Sd = 'sd',
  /** Northern Sami */
  Se = 'se',
  /** Sango */
  Sg = 'sg',
  /** Sinhala */
  Si = 'si',
  /** Slovak */
  Sk = 'sk',
  /** Slovenian */
  Sl = 'sl',
  /** Samoan */
  Sm = 'sm',
  /** Shona */
  Sn = 'sn',
  /** Somali */
  So = 'so',
  /** Albanian */
  Sq = 'sq',
  /** Serbian */
  Sr = 'sr',
  /** Southern Sotho */
  St = 'st',
  /** Sundanese */
  Su = 'su',
  /** Swedish */
  Sv = 'sv',
  /** Swahili */
  Sw = 'sw',
  /** Congo Swahili */
  SwCd = 'sw_CD',
  /** Tamil */
  Ta = 'ta',
  /** Telugu */
  Te = 'te',
  /** Tajik */
  Tg = 'tg',
  /** Thai */
  Th = 'th',
  /** Tigrinya */
  Ti = 'ti',
  /** Turkmen */
  Tk = 'tk',
  /** Tongan */
  To = 'to',
  /** Turkish */
  Tr = 'tr',
  /** Tatar */
  Tt = 'tt',
  /** Uyghur */
  Ug = 'ug',
  /** Ukrainian */
  Uk = 'uk',
  /** Urdu */
  Ur = 'ur',
  /** Uzbek */
  Uz = 'uz',
  /** Vietnamese */
  Vi = 'vi',
  /** Volapük */
  Vo = 'vo',
  /** Wolof */
  Wo = 'wo',
  /** Xhosa */
  Xh = 'xh',
  /** Yiddish */
  Yi = 'yi',
  /** Yoruba */
  Yo = 'yo',
  /** Chinese */
  Zh = 'zh',
  /** Simplified Chinese */
  ZhHans = 'zh_Hans',
  /** Traditional Chinese */
  ZhHant = 'zh_Hant',
  /** Zulu */
  Zu = 'zu'
}

export type LocaleStringCustomFieldConfig = CustomField & {
  __typename?: 'LocaleStringCustomFieldConfig';
  description?: Maybe<Array<LocalizedString>>;
  internal?: Maybe<Scalars['Boolean']>;
  label?: Maybe<Array<LocalizedString>>;
  length?: Maybe<Scalars['Int']>;
  list: Scalars['Boolean'];
  name: Scalars['String'];
  nullable?: Maybe<Scalars['Boolean']>;
  pattern?: Maybe<Scalars['String']>;
  readonly?: Maybe<Scalars['Boolean']>;
  requiresPermission?: Maybe<Array<Permission>>;
  type: Scalars['String'];
  ui?: Maybe<Scalars['JSON']>;
};

export type LocaleTextCustomFieldConfig = CustomField & {
  __typename?: 'LocaleTextCustomFieldConfig';
  description?: Maybe<Array<LocalizedString>>;
  internal?: Maybe<Scalars['Boolean']>;
  label?: Maybe<Array<LocalizedString>>;
  list: Scalars['Boolean'];
  name: Scalars['String'];
  nullable?: Maybe<Scalars['Boolean']>;
  readonly?: Maybe<Scalars['Boolean']>;
  requiresPermission?: Maybe<Array<Permission>>;
  type: Scalars['String'];
  ui?: Maybe<Scalars['JSON']>;
};

export type LocalizedString = {
  __typename?: 'LocalizedString';
  languageCode: LanguageCode;
  value: Scalars['String'];
};

export enum LogicalOperator {
  And = 'AND',
  Or = 'OR'
}

export type MessageResponse = {
  __typename?: 'MessageResponse';
  message: Scalars['String'];
  status: Scalars['Boolean'];
};

/** Returned when attempting to register or verify a customer account without a password, when one is required. */
export type MissingPasswordError = ErrorResult & {
  __typename?: 'MissingPasswordError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Adds an item to the Order. If custom fields are defined on the OrderLine entity, a third argument 'customFields' will be available. */
  addItemToOrder: UpdateOrderItemsResult;
  addNcmBranchToOrder: MessageResponse;
  addOrderNote: MessageResponse;
  /** Add a Payment to the Order */
  addPaymentToOrder: AddPaymentToOrderResult;
  addQrPaymentProof: AddQrPaymentProofResponse;
  addToWishlist: WishlistItem;
  /** Adjusts an OrderLine. If custom fields are defined on the OrderLine entity, a third argument 'customFields' of type `OrderLineCustomFieldsInput` will be available. */
  adjustOrderLine: UpdateOrderItemsResult;
  /** Applies the given coupon code to the active Order */
  applyCouponCode: ApplyCouponCodeResult;
  /** Authenticates the user using a named authentication strategy */
  authenticate: AuthenticationResult;
  createContact: Contact;
  /** Create a new Customer Address */
  createCustomerAddress: Address;
  createQuestion: Question;
  createSellerRegistration: SellerRegistration;
  createStripePaymentIntent: Scalars['String'];
  createTestBanner: Banner;
  deleteBanner: DeleteBannerResponse;
  /** Delete an existing Address */
  deleteCustomerAddress: Success;
  deleteQuestion: QuestionResponse;
  /**
   * Authenticates the user using the native authentication strategy. This mutation is an alias for authenticate({ native: { ... }})
   *
   * The `rememberMe` option applies when using cookie-based sessions, and if `true` it will set the maxAge of the session cookie
   * to 1 year.
   */
  login: NativeAuthenticationResult;
  /** End the current authenticated session */
  logout: Success;
  reedemTechCoins: RedeemTechCoinResult;
  /** Regenerate and send a verification token for a new Customer registration. Only applicable if `authOptions.requireVerification` is set to true. */
  refreshCustomerVerification: RefreshCustomerVerificationResult;
  /**
   * Register a Customer account with the given credentials. There are three possible registration flows:
   *
   * _If `authOptions.requireVerification` is set to `true`:_
   *
   * 1. **The Customer is registered _with_ a password**. A verificationToken will be created (and typically emailed to the Customer). That
   *    verificationToken would then be passed to the `verifyCustomerAccount` mutation _without_ a password. The Customer is then
   *    verified and authenticated in one step.
   * 2. **The Customer is registered _without_ a password**. A verificationToken will be created (and typically emailed to the Customer). That
   *    verificationToken would then be passed to the `verifyCustomerAccount` mutation _with_ the chosen password of the Customer. The Customer is then
   *    verified and authenticated in one step.
   *
   * _If `authOptions.requireVerification` is set to `false`:_
   *
   * 3. The Customer _must_ be registered _with_ a password. No further action is needed - the Customer is able to authenticate immediately.
   */
  registerCustomerAccount: RegisterCustomerAccountResult;
  /** Remove all OrderLine from the Order */
  removeAllOrderLines: RemoveOrderItemsResult;
  /** Removes the given coupon code from the active Order */
  removeCouponCode?: Maybe<Order>;
  /** Removes a wishlist by its id or product variant id. If neither 'id' nor 'slug' is specified, an error will result. */
  removeFromWishlist: DeletionResponse;
  /** Remove an OrderLine from the Order */
  removeOrderLine: RemoveOrderItemsResult;
  requestAccountDeletion: Success;
  /** Requests a password reset email to be sent */
  requestPasswordReset?: Maybe<RequestPasswordResetResult>;
  /**
   * Request to update the emailAddress of the active Customer. If `authOptions.requireVerification` is enabled
   * (as is the default), then the `identifierChangeToken` will be assigned to the current User and
   * a IdentifierChangeRequestEvent will be raised. This can then be used e.g. by the EmailPlugin to email
   * that verification token to the Customer, which is then used to verify the change of email address.
   */
  requestUpdateCustomerEmailAddress: RequestUpdateCustomerEmailAddressResult;
  /** Resets a Customer's password based on the provided token */
  resetPassword: ResetPasswordResult;
  revertTechCoinRedemption: TechCoinsReedemResponse;
  /** Set the Customer for the Order. Required only if the Customer is not currently logged in */
  setCustomerForOrder: SetCustomerForOrderResult;
  /** Sets the billing address for the active Order */
  setOrderBillingAddress: ActiveOrderResult;
  /** Allows any custom fields to be set for the active Order */
  setOrderCustomFields: ActiveOrderResult;
  /** Sets the shipping address for the active Order */
  setOrderShippingAddress: ActiveOrderResult;
  /**
   * Sets the shipping method by id, which can be obtained with the `eligibleShippingMethods` query.
   * An Order can have multiple shipping methods, in which case you can pass an array of ids. In this case,
   * you should configure a custom ShippingLineAssignmentStrategy in order to know which OrderLines each
   * shipping method will apply to.
   */
  setOrderShippingMethod: SetOrderShippingMethodResult;
  submitProductReview: ProductReview;
  subscribeToNewsletter: SubscribeToNewsletterResult;
  /** Transitions an Order to a new state. Valid next states can be found by querying `nextOrderStates` */
  transitionOrderToState?: Maybe<TransitionOrderToStateResult>;
  /** Unsets the billing address for the active Order. Available since version 3.1.0 */
  unsetOrderBillingAddress: ActiveOrderResult;
  /** Unsets the shipping address for the active Order. Available since version 3.1.0 */
  unsetOrderShippingAddress: ActiveOrderResult;
  unsubscribeFromNewsletter: UnsubscribeFromNewsletterResult;
  updateBanner: Banner;
  /** Update an existing Customer */
  updateCustomer: Customer;
  /** Update an existing Address */
  updateCustomerAddress: Address;
  /**
   * Confirm the update of the emailAddress with the provided token, which has been generated by the
   * `requestUpdateCustomerEmailAddress` mutation.
   */
  updateCustomerEmailAddress: UpdateCustomerEmailAddressResult;
  /** Update the password of the active Customer */
  updateCustomerPassword: UpdateCustomerPasswordResult;
  updateQuestion: Question;
  valleyStatus: MessageResponse;
  /**
   * Verify a Customer email address with the token sent to that address. Only applicable if `authOptions.requireVerification` is set to true.
   *
   * If the Customer was not registered with a password in the `registerCustomerAccount` mutation, the password _must_ be
   * provided here.
   */
  verifyCustomerAccount: VerifyCustomerAccountResult;
  voteOnReview: ProductReview;
};


export type MutationAddItemToOrderArgs = {
  customFields?: InputMaybe<OrderLineCustomFieldsInput>;
  productVariantId: Scalars['ID'];
  quantity: Scalars['Int'];
};


export type MutationAddNcmBranchToOrderArgs = {
  destinationBranch: Scalars['String'];
  orderId: Scalars['ID'];
};


export type MutationAddOrderNoteArgs = {
  note: Scalars['String'];
  orderId: Scalars['ID'];
};


export type MutationAddPaymentToOrderArgs = {
  input: PaymentInput;
};


export type MutationAddQrPaymentProofArgs = {
  assetId: Scalars['ID'];
  orderCode: Scalars['String'];
};


export type MutationAddToWishlistArgs = {
  productVariantId: Scalars['ID'];
};


export type MutationAdjustOrderLineArgs = {
  customFields?: InputMaybe<OrderLineCustomFieldsInput>;
  orderLineId: Scalars['ID'];
  quantity: Scalars['Int'];
};


export type MutationApplyCouponCodeArgs = {
  couponCode: Scalars['String'];
};


export type MutationAuthenticateArgs = {
  input: AuthenticationInput;
  rememberMe?: InputMaybe<Scalars['Boolean']>;
};


export type MutationCreateContactArgs = {
  input: CreateContactInput;
};


export type MutationCreateCustomerAddressArgs = {
  input: CreateAddressInput;
};


export type MutationCreateQuestionArgs = {
  input?: InputMaybe<QuestionCreateInput>;
};


export type MutationCreateSellerRegistrationArgs = {
  input: CreateSellerRegistrationInput;
};


export type MutationCreateTestBannerArgs = {
  ctaLink: Scalars['String'];
  ctaText: Scalars['String'];
  description: Scalars['String'];
  imageId: Scalars['ID'];
  price?: InputMaybe<Scalars['Int']>;
  title: Scalars['String'];
};


export type MutationDeleteBannerArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteCustomerAddressArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteQuestionArgs = {
  id: Scalars['ID'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  rememberMe?: InputMaybe<Scalars['Boolean']>;
  username: Scalars['String'];
};


export type MutationReedemTechCoinsArgs = {
  coins: Scalars['Int'];
  orderId: Scalars['ID'];
};


export type MutationRefreshCustomerVerificationArgs = {
  emailAddress: Scalars['String'];
};


export type MutationRegisterCustomerAccountArgs = {
  input: RegisterCustomerInput;
};


export type MutationRemoveCouponCodeArgs = {
  couponCode: Scalars['String'];
};


export type MutationRemoveFromWishlistArgs = {
  id?: InputMaybe<Scalars['ID']>;
  productVariantId?: InputMaybe<Scalars['ID']>;
};


export type MutationRemoveOrderLineArgs = {
  orderLineId: Scalars['ID'];
};


export type MutationRequestPasswordResetArgs = {
  emailAddress: Scalars['String'];
};


export type MutationRequestUpdateCustomerEmailAddressArgs = {
  newEmailAddress: Scalars['String'];
  password: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  password: Scalars['String'];
  token: Scalars['String'];
};


export type MutationRevertTechCoinRedemptionArgs = {
  orderId: Scalars['ID'];
};


export type MutationSetCustomerForOrderArgs = {
  input: CreateCustomerInput;
};


export type MutationSetOrderBillingAddressArgs = {
  input: CreateAddressInput;
};


export type MutationSetOrderCustomFieldsArgs = {
  input: UpdateOrderInput;
};


export type MutationSetOrderShippingAddressArgs = {
  input: CreateAddressInput;
};


export type MutationSetOrderShippingMethodArgs = {
  shippingMethodId: Array<Scalars['ID']>;
};


export type MutationSubmitProductReviewArgs = {
  input: SubmitProductReviewInput;
};


export type MutationSubscribeToNewsletterArgs = {
  input: SubscribeToNewsletterInput;
};


export type MutationTransitionOrderToStateArgs = {
  state: Scalars['String'];
};


export type MutationUnsubscribeFromNewsletterArgs = {
  input: UnsubscribeFromNewsletterInput;
};


export type MutationUpdateBannerArgs = {
  ctaLink: Scalars['String'];
  ctaText: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['ID'];
  imageId: Scalars['ID'];
  price?: InputMaybe<Scalars['Int']>;
  title: Scalars['String'];
};


export type MutationUpdateCustomerArgs = {
  input: UpdateCustomerInput;
};


export type MutationUpdateCustomerAddressArgs = {
  input: UpdateAddressInput;
};


export type MutationUpdateCustomerEmailAddressArgs = {
  token: Scalars['String'];
};


export type MutationUpdateCustomerPasswordArgs = {
  currentPassword: Scalars['String'];
  newPassword: Scalars['String'];
};


export type MutationUpdateQuestionArgs = {
  input?: InputMaybe<QuestionEditInput>;
};


export type MutationValleyStatusArgs = {
  orderId: Scalars['ID'];
  outOfValley: Scalars['Boolean'];
};


export type MutationVerifyCustomerAccountArgs = {
  password?: InputMaybe<Scalars['String']>;
  token: Scalars['String'];
};


export type MutationVoteOnReviewArgs = {
  id: Scalars['ID'];
  vote: Scalars['Boolean'];
};

export type NativeAuthInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

/** Returned when attempting an operation that relies on the NativeAuthStrategy, if that strategy is not configured. */
export type NativeAuthStrategyError = ErrorResult & {
  __typename?: 'NativeAuthStrategyError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

export type NativeAuthenticationResult = CurrentUser | InvalidCredentialsError | NativeAuthStrategyError | NotVerifiedError;

/** Returned when attempting to set a negative OrderLine quantity. */
export type NegativeQuantityError = ErrorResult & {
  __typename?: 'NegativeQuantityError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

/**
 * Returned when invoking a mutation which depends on there being an active Order on the
 * current session.
 */
export type NoActiveOrderError = ErrorResult & {
  __typename?: 'NoActiveOrderError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

export type Node = {
  id: Scalars['ID'];
};

/**
 * Returned if `authOptions.requireVerification` is set to `true` (which is the default)
 * and an unverified user attempts to authenticate.
 */
export type NotVerifiedError = ErrorResult & {
  __typename?: 'NotVerifiedError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

/** Operators for filtering on a list of Number fields */
export type NumberListOperators = {
  inList: Scalars['Float'];
};

/** Operators for filtering on a Int or Float field */
export type NumberOperators = {
  between?: InputMaybe<NumberRange>;
  eq?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  isNull?: InputMaybe<Scalars['Boolean']>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
};

export type NumberRange = {
  end: Scalars['Float'];
  start: Scalars['Float'];
};

export type Order = Node & {
  __typename?: 'Order';
  /** An order is active as long as the payment process has not been completed */
  active: Scalars['Boolean'];
  billingAddress?: Maybe<OrderAddress>;
  /** A unique code for the Order */
  code: Scalars['String'];
  /** An array of all coupon codes applied to the Order */
  couponCodes: Array<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  currencyCode: CurrencyCode;
  customFields?: Maybe<OrderCustomFields>;
  customer?: Maybe<Customer>;
  discounts: Array<Discount>;
  fulfillments?: Maybe<Array<Fulfillment>>;
  history: HistoryEntryList;
  id: Scalars['ID'];
  invoices: Array<Invoice>;
  lines: Array<OrderLine>;
  /**
   * The date & time that the Order was placed, i.e. the Customer
   * completed the checkout and the Order is no longer "active"
   */
  orderPlacedAt?: Maybe<Scalars['DateTime']>;
  payments?: Maybe<Array<Payment>>;
  /** Promotions applied to the order. Only gets populated after the payment process has completed. */
  promotions: Array<Promotion>;
  shipping: Scalars['Money'];
  shippingAddress?: Maybe<OrderAddress>;
  shippingLines: Array<ShippingLine>;
  shippingWithTax: Scalars['Money'];
  state: Scalars['String'];
  /**
   * The subTotal is the total of all OrderLines in the Order. This figure also includes any Order-level
   * discounts which have been prorated (proportionally distributed) amongst the items of each OrderLine.
   * To get a total of all OrderLines which does not account for prorated discounts, use the
   * sum of `OrderLine.discountedLinePrice` values.
   */
  subTotal: Scalars['Money'];
  /** Same as subTotal, but inclusive of tax */
  subTotalWithTax: Scalars['Money'];
  /**
   * Surcharges are arbitrary modifications to the Order total which are neither
   * ProductVariants nor discounts resulting from applied Promotions. For example,
   * one-off discounts based on customer interaction, or surcharges based on payment
   * methods.
   */
  surcharges: Array<Surcharge>;
  /** A summary of the taxes being applied to this Order */
  taxSummary: Array<OrderTaxSummary>;
  /** Equal to subTotal plus shipping */
  total: Scalars['Money'];
  totalQuantity: Scalars['Int'];
  /** The final payable amount. Equal to subTotalWithTax plus shippingWithTax */
  totalWithTax: Scalars['Money'];
  type: OrderType;
  updatedAt: Scalars['DateTime'];
};


export type OrderHistoryArgs = {
  options?: InputMaybe<HistoryEntryListOptions>;
};

export type OrderAddress = {
  __typename?: 'OrderAddress';
  city?: Maybe<Scalars['String']>;
  company?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  countryCode?: Maybe<Scalars['String']>;
  customFields?: Maybe<AddressCustomFields>;
  fullName?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  province?: Maybe<Scalars['String']>;
  streetLine1?: Maybe<Scalars['String']>;
  streetLine2?: Maybe<Scalars['String']>;
};

export type OrderBonus = Node & {
  __typename?: 'OrderBonus';
  coins: Scalars['Int'];
  description: Scalars['String'];
  id: Scalars['ID'];
  maxOrderValue?: Maybe<Scalars['Int']>;
  minOrderValue: Scalars['Int'];
  name: Scalars['String'];
  rewardInterval?: Maybe<Scalars['Int']>;
};

export type OrderCustomFields = {
  __typename?: 'OrderCustomFields';
  destinationBranch?: Maybe<Scalars['String']>;
  estimatedDeliveryDate?: Maybe<Scalars['DateTime']>;
  ncmQuote?: Maybe<Scalars['String']>;
  ncmTrackingId?: Maybe<Scalars['String']>;
  nearestNcmBranch?: Maybe<Scalars['String']>;
  orderNotes?: Maybe<Scalars['String']>;
  outOfValley?: Maybe<Scalars['Boolean']>;
  paymentId?: Maybe<Scalars['String']>;
  pickupTime?: Maybe<Scalars['String']>;
  qrPaymentProof?: Maybe<Asset>;
  scanDetails?: Maybe<Array<OrderScanDetailsStruct>>;
};

export type OrderFilterParameter = {
  _and?: InputMaybe<Array<OrderFilterParameter>>;
  _or?: InputMaybe<Array<OrderFilterParameter>>;
  active?: InputMaybe<BooleanOperators>;
  code?: InputMaybe<StringOperators>;
  createdAt?: InputMaybe<DateOperators>;
  currencyCode?: InputMaybe<StringOperators>;
  destinationBranch?: InputMaybe<StringOperators>;
  estimatedDeliveryDate?: InputMaybe<DateOperators>;
  id?: InputMaybe<IdOperators>;
  ncmQuote?: InputMaybe<StringOperators>;
  ncmTrackingId?: InputMaybe<StringOperators>;
  nearestNcmBranch?: InputMaybe<StringOperators>;
  orderNotes?: InputMaybe<StringOperators>;
  orderPlacedAt?: InputMaybe<DateOperators>;
  outOfValley?: InputMaybe<BooleanOperators>;
  paymentId?: InputMaybe<StringOperators>;
  pickupTime?: InputMaybe<StringOperators>;
  shipping?: InputMaybe<NumberOperators>;
  shippingWithTax?: InputMaybe<NumberOperators>;
  state?: InputMaybe<StringOperators>;
  subTotal?: InputMaybe<NumberOperators>;
  subTotalWithTax?: InputMaybe<NumberOperators>;
  total?: InputMaybe<NumberOperators>;
  totalQuantity?: InputMaybe<NumberOperators>;
  totalWithTax?: InputMaybe<NumberOperators>;
  type?: InputMaybe<StringOperators>;
  updatedAt?: InputMaybe<DateOperators>;
};

/** Returned when an order operation is rejected by an OrderInterceptor method. */
export type OrderInterceptorError = ErrorResult & {
  __typename?: 'OrderInterceptorError';
  errorCode: ErrorCode;
  interceptorError: Scalars['String'];
  message: Scalars['String'];
};

/** Returned when the maximum order size limit has been reached. */
export type OrderLimitError = ErrorResult & {
  __typename?: 'OrderLimitError';
  errorCode: ErrorCode;
  maxItems: Scalars['Int'];
  message: Scalars['String'];
};

export type OrderLine = Node & {
  __typename?: 'OrderLine';
  createdAt: Scalars['DateTime'];
  customFields?: Maybe<OrderLineCustomFields>;
  /** The price of the line including discounts, excluding tax */
  discountedLinePrice: Scalars['Money'];
  /** The price of the line including discounts and tax */
  discountedLinePriceWithTax: Scalars['Money'];
  /**
   * The price of a single unit including discounts, excluding tax.
   *
   * If Order-level discounts have been applied, this will not be the
   * actual taxable unit price (see `proratedUnitPrice`), but is generally the
   * correct price to display to customers to avoid confusion
   * about the internal handling of distributed Order-level discounts.
   */
  discountedUnitPrice: Scalars['Money'];
  /** The price of a single unit including discounts and tax */
  discountedUnitPriceWithTax: Scalars['Money'];
  discounts: Array<Discount>;
  featuredAsset?: Maybe<Asset>;
  fulfillmentLines?: Maybe<Array<FulfillmentLine>>;
  id: Scalars['ID'];
  /** The total price of the line excluding tax and discounts. */
  linePrice: Scalars['Money'];
  /** The total price of the line including tax but excluding discounts. */
  linePriceWithTax: Scalars['Money'];
  /** The total tax on this line */
  lineTax: Scalars['Money'];
  order: Order;
  /** The quantity at the time the Order was placed */
  orderPlacedQuantity: Scalars['Int'];
  productVariant: ProductVariant;
  /**
   * The actual line price, taking into account both item discounts _and_ prorated (proportionally-distributed)
   * Order-level discounts. This value is the true economic value of the OrderLine, and is used in tax
   * and refund calculations.
   */
  proratedLinePrice: Scalars['Money'];
  /** The proratedLinePrice including tax */
  proratedLinePriceWithTax: Scalars['Money'];
  /**
   * The actual unit price, taking into account both item discounts _and_ prorated (proportionally-distributed)
   * Order-level discounts. This value is the true economic value of the OrderItem, and is used in tax
   * and refund calculations.
   */
  proratedUnitPrice: Scalars['Money'];
  /** The proratedUnitPrice including tax */
  proratedUnitPriceWithTax: Scalars['Money'];
  /** The quantity of items purchased */
  quantity: Scalars['Int'];
  taxLines: Array<TaxLine>;
  taxRate: Scalars['Float'];
  /** The price of a single unit, excluding tax and discounts */
  unitPrice: Scalars['Money'];
  /** Non-zero if the unitPrice has changed since it was initially added to Order */
  unitPriceChangeSinceAdded: Scalars['Money'];
  /** The price of a single unit, including tax but excluding discounts */
  unitPriceWithTax: Scalars['Money'];
  /** Non-zero if the unitPriceWithTax has changed since it was initially added to Order */
  unitPriceWithTaxChangeSinceAdded: Scalars['Money'];
  updatedAt: Scalars['DateTime'];
};

export type OrderLineCustomFields = {
  __typename?: 'OrderLineCustomFields';
  serialCodes?: Maybe<Array<Scalars['String']>>;
};

export type OrderLineCustomFieldsInput = {
  serialCodes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type OrderList = PaginatedList & {
  __typename?: 'OrderList';
  items: Array<Order>;
  totalItems: Scalars['Int'];
};

export type OrderListOptions = {
  /** Allows the results to be filtered */
  filter?: InputMaybe<OrderFilterParameter>;
  /** Specifies whether multiple top-level "filter" fields should be combined with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: InputMaybe<LogicalOperator>;
  /** Skips the first n results, for use in pagination */
  skip?: InputMaybe<Scalars['Int']>;
  /** Specifies which properties to sort the results by */
  sort?: InputMaybe<OrderSortParameter>;
  /** Takes n results, for use in pagination */
  take?: InputMaybe<Scalars['Int']>;
};

/** Returned when attempting to modify the contents of an Order that is not in the `AddingItems` state. */
export type OrderModificationError = ErrorResult & {
  __typename?: 'OrderModificationError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

/** Returned when attempting to add a Payment to an Order that is not in the `ArrangingPayment` state. */
export type OrderPaymentStateError = ErrorResult & {
  __typename?: 'OrderPaymentStateError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

export type OrderScanDetailsStruct = {
  __typename?: 'OrderScanDetailsStruct';
  serialNumber?: Maybe<Scalars['String']>;
  variantName?: Maybe<Scalars['String']>;
};

export type OrderScanDetailsStructInput = {
  serialNumber?: InputMaybe<Scalars['String']>;
  variantName?: InputMaybe<Scalars['String']>;
};

export type OrderSortParameter = {
  code?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  destinationBranch?: InputMaybe<SortOrder>;
  estimatedDeliveryDate?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  ncmQuote?: InputMaybe<SortOrder>;
  ncmTrackingId?: InputMaybe<SortOrder>;
  nearestNcmBranch?: InputMaybe<SortOrder>;
  orderNotes?: InputMaybe<SortOrder>;
  orderPlacedAt?: InputMaybe<SortOrder>;
  outOfValley?: InputMaybe<SortOrder>;
  paymentId?: InputMaybe<SortOrder>;
  pickupTime?: InputMaybe<SortOrder>;
  qrPaymentProof?: InputMaybe<SortOrder>;
  shipping?: InputMaybe<SortOrder>;
  shippingWithTax?: InputMaybe<SortOrder>;
  state?: InputMaybe<SortOrder>;
  subTotal?: InputMaybe<SortOrder>;
  subTotalWithTax?: InputMaybe<SortOrder>;
  total?: InputMaybe<SortOrder>;
  totalQuantity?: InputMaybe<SortOrder>;
  totalWithTax?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

/** Returned if there is an error in transitioning the Order state */
export type OrderStateTransitionError = ErrorResult & {
  __typename?: 'OrderStateTransitionError';
  errorCode: ErrorCode;
  fromState: Scalars['String'];
  message: Scalars['String'];
  toState: Scalars['String'];
  transitionError: Scalars['String'];
};

export type OrderStatus = {
  __typename?: 'OrderStatus';
  added_time: Scalars['String'];
  orderid: Scalars['Int'];
  status: Scalars['String'];
  vendor_return: Scalars['Boolean'];
};

/**
 * A summary of the taxes being applied to this order, grouped
 * by taxRate.
 */
export type OrderTaxSummary = {
  __typename?: 'OrderTaxSummary';
  /** A description of this tax */
  description: Scalars['String'];
  /** The total net price of OrderLines to which this taxRate applies */
  taxBase: Scalars['Money'];
  /** The taxRate as a percentage */
  taxRate: Scalars['Float'];
  /** The total tax being applied to the Order at this taxRate */
  taxTotal: Scalars['Money'];
};

export enum OrderType {
  Aggregate = 'Aggregate',
  Regular = 'Regular',
  Seller = 'Seller'
}

export type Page = Node & {
  __typename?: 'Page';
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  enabled: Scalars['Boolean'];
  group?: Maybe<PageGroup>;
  id: Scalars['ID'];
  languageCode?: Maybe<LanguageCode>;
  metaDescription?: Maybe<Scalars['String']>;
  metaKeywords?: Maybe<Scalars['String']>;
  metaTitle?: Maybe<Scalars['String']>;
  slug: Scalars['String'];
  title: Scalars['String'];
  translations: Array<PageTranslation>;
  updatedAt: Scalars['DateTime'];
};

export type PageFilterParameter = {
  _and?: InputMaybe<Array<PageFilterParameter>>;
  _or?: InputMaybe<Array<PageFilterParameter>>;
  content?: InputMaybe<StringOperators>;
  createdAt?: InputMaybe<DateOperators>;
  enabled?: InputMaybe<BooleanOperators>;
  id?: InputMaybe<IdOperators>;
  languageCode?: InputMaybe<StringOperators>;
  metaDescription?: InputMaybe<StringOperators>;
  metaKeywords?: InputMaybe<StringOperators>;
  metaTitle?: InputMaybe<StringOperators>;
  slug?: InputMaybe<StringOperators>;
  title?: InputMaybe<StringOperators>;
  updatedAt?: InputMaybe<DateOperators>;
};

export type PageGroup = Node & {
  __typename?: 'PageGroup';
  createdAt: Scalars['DateTime'];
  enabled: Scalars['Boolean'];
  id: Scalars['ID'];
  languageCode?: Maybe<LanguageCode>;
  name: Scalars['String'];
  pages: PageList;
  slug: Scalars['String'];
  translations: Array<PageGroupTranslation>;
  updatedAt: Scalars['DateTime'];
};


export type PageGroupPagesArgs = {
  options?: InputMaybe<PageListOptions>;
};

export type PageGroupFilterParameter = {
  _and?: InputMaybe<Array<PageGroupFilterParameter>>;
  _or?: InputMaybe<Array<PageGroupFilterParameter>>;
  createdAt?: InputMaybe<DateOperators>;
  enabled?: InputMaybe<BooleanOperators>;
  id?: InputMaybe<IdOperators>;
  languageCode?: InputMaybe<StringOperators>;
  name?: InputMaybe<StringOperators>;
  slug?: InputMaybe<StringOperators>;
  updatedAt?: InputMaybe<DateOperators>;
};

export type PageGroupList = PaginatedList & {
  __typename?: 'PageGroupList';
  items: Array<PageGroup>;
  totalItems: Scalars['Int'];
};

export type PageGroupListOptions = {
  /** Allows the results to be filtered */
  filter?: InputMaybe<PageGroupFilterParameter>;
  /** Specifies whether multiple top-level "filter" fields should be combined with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: InputMaybe<LogicalOperator>;
  /** Skips the first n results, for use in pagination */
  skip?: InputMaybe<Scalars['Int']>;
  /** Specifies which properties to sort the results by */
  sort?: InputMaybe<PageGroupSortParameter>;
  /** Takes n results, for use in pagination */
  take?: InputMaybe<Scalars['Int']>;
};

export type PageGroupSortParameter = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  slug?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type PageGroupTranslation = Node & {
  __typename?: 'PageGroupTranslation';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  languageCode: LanguageCode;
  name: Scalars['String'];
  slug: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type PageList = PaginatedList & {
  __typename?: 'PageList';
  items: Array<Page>;
  totalItems: Scalars['Int'];
};

export type PageListOptions = {
  /** Allows the results to be filtered */
  filter?: InputMaybe<PageFilterParameter>;
  /** Specifies whether multiple top-level "filter" fields should be combined with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: InputMaybe<LogicalOperator>;
  /** Skips the first n results, for use in pagination */
  skip?: InputMaybe<Scalars['Int']>;
  /** Specifies which properties to sort the results by */
  sort?: InputMaybe<PageSortParameter>;
  /** Takes n results, for use in pagination */
  take?: InputMaybe<Scalars['Int']>;
};

export type PageSortParameter = {
  content?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  metaDescription?: InputMaybe<SortOrder>;
  metaKeywords?: InputMaybe<SortOrder>;
  metaTitle?: InputMaybe<SortOrder>;
  slug?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type PageTranslation = Node & {
  __typename?: 'PageTranslation';
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  languageCode: LanguageCode;
  metaDescription?: Maybe<Scalars['String']>;
  metaKeywords?: Maybe<Scalars['String']>;
  metaTitle?: Maybe<Scalars['String']>;
  slug: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type PaginatedList = {
  items: Array<Node>;
  totalItems: Scalars['Int'];
};

/** Returned when attempting to verify a customer account with a password, when a password has already been set. */
export type PasswordAlreadySetError = ErrorResult & {
  __typename?: 'PasswordAlreadySetError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

/**
 * Returned if the token used to reset a Customer's password is valid, but has
 * expired according to the `verificationTokenDuration` setting in the AuthOptions.
 */
export type PasswordResetTokenExpiredError = ErrorResult & {
  __typename?: 'PasswordResetTokenExpiredError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

/**
 * Returned if the token used to reset a Customer's password is either
 * invalid or does not match any expected tokens.
 */
export type PasswordResetTokenInvalidError = ErrorResult & {
  __typename?: 'PasswordResetTokenInvalidError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

/** Returned when attempting to register or verify a customer account where the given password fails password validation. */
export type PasswordValidationError = ErrorResult & {
  __typename?: 'PasswordValidationError';
  errorCode: ErrorCode;
  message: Scalars['String'];
  validationErrorMessage: Scalars['String'];
};

export type Payment = Node & {
  __typename?: 'Payment';
  amount: Scalars['Money'];
  createdAt: Scalars['DateTime'];
  customFields?: Maybe<Scalars['JSON']>;
  errorMessage?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  metadata?: Maybe<Scalars['JSON']>;
  method: Scalars['String'];
  refunds: Array<Refund>;
  state: Scalars['String'];
  transactionId?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

/** Returned when a Payment is declined by the payment provider. */
export type PaymentDeclinedError = ErrorResult & {
  __typename?: 'PaymentDeclinedError';
  errorCode: ErrorCode;
  message: Scalars['String'];
  paymentErrorMessage: Scalars['String'];
};

/** Returned when a Payment fails due to an error. */
export type PaymentFailedError = ErrorResult & {
  __typename?: 'PaymentFailedError';
  errorCode: ErrorCode;
  message: Scalars['String'];
  paymentErrorMessage: Scalars['String'];
};

/** Passed as input to the `addPaymentToOrder` mutation. */
export type PaymentInput = {
  /**
   * This field should contain arbitrary data passed to the specified PaymentMethodHandler's `createPayment()` method
   * as the "metadata" argument. For example, it could contain an ID for the payment and other
   * data generated by the payment provider.
   */
  metadata: Scalars['JSON'];
  /** This field should correspond to the `code` property of a PaymentMethod. */
  method: Scalars['String'];
};

export type PaymentMethod = Node & {
  __typename?: 'PaymentMethod';
  checker?: Maybe<ConfigurableOperation>;
  code: Scalars['String'];
  createdAt: Scalars['DateTime'];
  customFields?: Maybe<Scalars['JSON']>;
  description: Scalars['String'];
  enabled: Scalars['Boolean'];
  handler: ConfigurableOperation;
  id: Scalars['ID'];
  name: Scalars['String'];
  translations: Array<PaymentMethodTranslation>;
  updatedAt: Scalars['DateTime'];
};

export type PaymentMethodQuote = {
  __typename?: 'PaymentMethodQuote';
  code: Scalars['String'];
  customFields?: Maybe<Scalars['JSON']>;
  description: Scalars['String'];
  eligibilityMessage?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isEligible: Scalars['Boolean'];
  name: Scalars['String'];
};

export type PaymentMethodTranslation = {
  __typename?: 'PaymentMethodTranslation';
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['ID'];
  languageCode: LanguageCode;
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

/**
 * @description
 * Permissions for administrators and customers. Used to control access to
 * GraphQL resolvers via the {@link Allow} decorator.
 *
 * ## Understanding Permission.Owner
 *
 * `Permission.Owner` is a special permission which is used in some Vendure resolvers to indicate that that resolver should only
 * be accessible to the "owner" of that resource.
 *
 * For example, the Shop API `activeCustomer` query resolver should only return the Customer object for the "owner" of that Customer, i.e.
 * based on the activeUserId of the current session. As a result, the resolver code looks like this:
 *
 * @example
 * ```TypeScript
 * \@Query()
 * \@Allow(Permission.Owner)
 * async activeCustomer(\@Ctx() ctx: RequestContext): Promise<Customer | undefined> {
 *   const userId = ctx.activeUserId;
 *   if (userId) {
 *     return this.customerService.findOneByUserId(ctx, userId);
 *   }
 * }
 * ```
 *
 * Here we can see that the "ownership" must be enforced by custom logic inside the resolver. Since "ownership" cannot be defined generally
 * nor statically encoded at build-time, any resolvers using `Permission.Owner` **must** include logic to enforce that only the owner
 * of the resource has access. If not, then it is the equivalent of using `Permission.Public`.
 *
 *
 * @docsCategory common
 */
export enum Permission {
  /** Allow this user to enable invoice generation */
  AllowInvoicesPermission = 'AllowInvoicesPermission',
  /** Authenticated means simply that the user is logged in */
  Authenticated = 'Authenticated',
  /** Grants permission to create Administrator */
  CreateAdministrator = 'CreateAdministrator',
  /** Grants permission to create Asset */
  CreateAsset = 'CreateAsset',
  /** Grants permission to create Blogs */
  CreateBlogs = 'CreateBlogs',
  /** Grants permission to create Products, Facets, Assets, Collections */
  CreateCatalog = 'CreateCatalog',
  /** Grants permission to create Channel */
  CreateChannel = 'CreateChannel',
  /** Grants permission to create Collection */
  CreateCollection = 'CreateCollection',
  /** Grants permission to create Contact */
  CreateContact = 'CreateContact',
  /** Grants permission to create Country */
  CreateCountry = 'CreateCountry',
  /** Grants permission to create Customer */
  CreateCustomer = 'CreateCustomer',
  /** Grants permission to create CustomerGroup */
  CreateCustomerGroup = 'CreateCustomerGroup',
  /** Grants permission to create Facet */
  CreateFacet = 'CreateFacet',
  /** Grants permission to create Order */
  CreateOrder = 'CreateOrder',
  /** Grants permission to create Page */
  CreatePage = 'CreatePage',
  /** Grants permission to create PaymentMethod */
  CreatePaymentMethod = 'CreatePaymentMethod',
  /** Grants permission to create Product */
  CreateProduct = 'CreateProduct',
  /** Grants permission to create Promotion */
  CreatePromotion = 'CreatePromotion',
  /** Grants permission to create Seller */
  CreateSeller = 'CreateSeller',
  /** Grants permission to create PaymentMethods, ShippingMethods, TaxCategories, TaxRates, Zones, Countries, System & GlobalSettings */
  CreateSettings = 'CreateSettings',
  /** Grants permission to create ShippingMethod */
  CreateShippingMethod = 'CreateShippingMethod',
  /** Grants permission to create StockLocation */
  CreateStockLocation = 'CreateStockLocation',
  /** Grants permission to create System */
  CreateSystem = 'CreateSystem',
  /** Grants permission to create Tag */
  CreateTag = 'CreateTag',
  /** Grants permission to create TaxCategory */
  CreateTaxCategory = 'CreateTaxCategory',
  /** Grants permission to create TaxRate */
  CreateTaxRate = 'CreateTaxRate',
  /** Grants permission to create Zone */
  CreateZone = 'CreateZone',
  /** Grants permission to delete Administrator */
  DeleteAdministrator = 'DeleteAdministrator',
  /** Grants permission to delete Asset */
  DeleteAsset = 'DeleteAsset',
  /** Grants permission to delete Blogs */
  DeleteBlogs = 'DeleteBlogs',
  /** Grants permission to delete Products, Facets, Assets, Collections */
  DeleteCatalog = 'DeleteCatalog',
  /** Grants permission to delete Channel */
  DeleteChannel = 'DeleteChannel',
  /** Grants permission to delete Collection */
  DeleteCollection = 'DeleteCollection',
  /** Grants permission to delete Contact */
  DeleteContact = 'DeleteContact',
  /** Grants permission to delete Country */
  DeleteCountry = 'DeleteCountry',
  /** Grants permission to delete Customer */
  DeleteCustomer = 'DeleteCustomer',
  /** Grants permission to delete CustomerGroup */
  DeleteCustomerGroup = 'DeleteCustomerGroup',
  /** Grants permission to delete Facet */
  DeleteFacet = 'DeleteFacet',
  /** Grants permission to delete Order */
  DeleteOrder = 'DeleteOrder',
  /** Grants permission to delete Page */
  DeletePage = 'DeletePage',
  /** Grants permission to delete PaymentMethod */
  DeletePaymentMethod = 'DeletePaymentMethod',
  /** Grants permission to delete Product */
  DeleteProduct = 'DeleteProduct',
  /** Grants permission to delete Promotion */
  DeletePromotion = 'DeletePromotion',
  /** Grants permission to delete Seller */
  DeleteSeller = 'DeleteSeller',
  /** Grants permission to delete PaymentMethods, ShippingMethods, TaxCategories, TaxRates, Zones, Countries, System & GlobalSettings */
  DeleteSettings = 'DeleteSettings',
  /** Grants permission to delete ShippingMethod */
  DeleteShippingMethod = 'DeleteShippingMethod',
  /** Grants permission to delete StockLocation */
  DeleteStockLocation = 'DeleteStockLocation',
  /** Grants permission to delete System */
  DeleteSystem = 'DeleteSystem',
  /** Grants permission to delete Tag */
  DeleteTag = 'DeleteTag',
  /** Grants permission to delete TaxCategory */
  DeleteTaxCategory = 'DeleteTaxCategory',
  /** Grants permission to delete TaxRate */
  DeleteTaxRate = 'DeleteTaxRate',
  /** Grants permission to delete Zone */
  DeleteZone = 'DeleteZone',
  /** Allows administrator to export orders */
  ExportOrders = 'ExportOrders',
  /** Allows staff to manage newsletter subscribers. */
  ManageNewsletter = 'ManageNewsletter',
  /** Owner means the user owns this entity, e.g. a Customer's own Order */
  Owner = 'Owner',
  /** Public means any unauthenticated user may perform the operation */
  Public = 'Public',
  /** Grants permission to read Administrator */
  ReadAdministrator = 'ReadAdministrator',
  /** Allows read access to the Administrators UI */
  ReadAdministratorUi = 'ReadAdministratorUi',
  /** Grants permission to read Asset */
  ReadAsset = 'ReadAsset',
  /** Grants permission to read Blogs */
  ReadBlogs = 'ReadBlogs',
  /** Grants permission to read Products, Facets, Assets, Collections */
  ReadCatalog = 'ReadCatalog',
  /** Grants permission to read Channel */
  ReadChannel = 'ReadChannel',
  /** Allows read access to the Channels UI */
  ReadChannelUi = 'ReadChannelUi',
  /** Grants permission to read Collection */
  ReadCollection = 'ReadCollection',
  /** Grants permission to read Contact */
  ReadContact = 'ReadContact',
  /** Grants permission to read Country */
  ReadCountry = 'ReadCountry',
  /** Allows read access to the Countries UI */
  ReadCountryUi = 'ReadCountryUi',
  /** Grants permission to read Customer */
  ReadCustomer = 'ReadCustomer',
  /** Grants permission to read CustomerGroup */
  ReadCustomerGroup = 'ReadCustomerGroup',
  /** Grants permission to read Facet */
  ReadFacet = 'ReadFacet',
  /** Grants permission to read Order */
  ReadOrder = 'ReadOrder',
  /** Grants permission to read Page */
  ReadPage = 'ReadPage',
  /** Grants permission to read PaymentMethod */
  ReadPaymentMethod = 'ReadPaymentMethod',
  /** Allows read access to the Payment Methods UI */
  ReadPaymentMethodUi = 'ReadPaymentMethodUi',
  /** Grants permission to read Product */
  ReadProduct = 'ReadProduct',
  /** Grants permission to read Promotion */
  ReadPromotion = 'ReadPromotion',
  /** Allows read access to the Roles UI */
  ReadRoleUi = 'ReadRoleUi',
  /** Grants permission to read Seller */
  ReadSeller = 'ReadSeller',
  /** Allows read access to the Sellers UI */
  ReadSellerUi = 'ReadSellerUi',
  /** Grants permission to read PaymentMethods, ShippingMethods, TaxCategories, TaxRates, Zones, Countries, System & GlobalSettings */
  ReadSettings = 'ReadSettings',
  /** Grants permission to read ShippingMethod */
  ReadShippingMethod = 'ReadShippingMethod',
  /** Allows read access to the Shipping Methods UI */
  ReadShippingMethodUi = 'ReadShippingMethodUi',
  /** Grants permission to read StockLocation */
  ReadStockLocation = 'ReadStockLocation',
  /** Allows read access to the Stock Locations UI */
  ReadStockLocationUi = 'ReadStockLocationUi',
  /** Grants permission to read System */
  ReadSystem = 'ReadSystem',
  /** Grants permission to read Tag */
  ReadTag = 'ReadTag',
  /** Grants permission to read TaxCategory */
  ReadTaxCategory = 'ReadTaxCategory',
  /** Allows read access to the Tax Categories UI */
  ReadTaxCategoryUi = 'ReadTaxCategoryUi',
  /** Grants permission to read TaxRate */
  ReadTaxRate = 'ReadTaxRate',
  /** Allows read access to the Tax Rates UI */
  ReadTaxRateUi = 'ReadTaxRateUi',
  /** Grants permission to read Zone */
  ReadZone = 'ReadZone',
  /** Allows read access to the Zones UI */
  ReadZoneUi = 'ReadZoneUi',
  /** SuperAdmin has unrestricted access to all operations */
  SuperAdmin = 'SuperAdmin',
  /** Grants permission to update Administrator */
  UpdateAdministrator = 'UpdateAdministrator',
  /** Grants permission to update Asset */
  UpdateAsset = 'UpdateAsset',
  /** Grants permission to update Blogs */
  UpdateBlogs = 'UpdateBlogs',
  /** Grants permission to update Products, Facets, Assets, Collections */
  UpdateCatalog = 'UpdateCatalog',
  /** Grants permission to update Channel */
  UpdateChannel = 'UpdateChannel',
  /** Grants permission to update Collection */
  UpdateCollection = 'UpdateCollection',
  /** Grants permission to update Contact */
  UpdateContact = 'UpdateContact',
  /** Grants permission to update Country */
  UpdateCountry = 'UpdateCountry',
  /** Grants permission to update Customer */
  UpdateCustomer = 'UpdateCustomer',
  /** Grants permission to update CustomerGroup */
  UpdateCustomerGroup = 'UpdateCustomerGroup',
  /** Grants permission to update Facet */
  UpdateFacet = 'UpdateFacet',
  /** Grants permission to update GlobalSettings */
  UpdateGlobalSettings = 'UpdateGlobalSettings',
  /** Grants permission to update Order */
  UpdateOrder = 'UpdateOrder',
  /** Grants permission to update Page */
  UpdatePage = 'UpdatePage',
  /** Grants permission to update PaymentMethod */
  UpdatePaymentMethod = 'UpdatePaymentMethod',
  /** Grants permission to update Product */
  UpdateProduct = 'UpdateProduct',
  /** Grants permission to update Promotion */
  UpdatePromotion = 'UpdatePromotion',
  /** Grants permission to update Seller */
  UpdateSeller = 'UpdateSeller',
  /** Grants permission to update PaymentMethods, ShippingMethods, TaxCategories, TaxRates, Zones, Countries, System & GlobalSettings */
  UpdateSettings = 'UpdateSettings',
  /** Grants permission to update ShippingMethod */
  UpdateShippingMethod = 'UpdateShippingMethod',
  /** Grants permission to update StockLocation */
  UpdateStockLocation = 'UpdateStockLocation',
  /** Grants permission to update System */
  UpdateSystem = 'UpdateSystem',
  /** Grants permission to update Tag */
  UpdateTag = 'UpdateTag',
  /** Grants permission to update TaxCategory */
  UpdateTaxCategory = 'UpdateTaxCategory',
  /** Grants permission to update TaxRate */
  UpdateTaxRate = 'UpdateTaxRate',
  /** Grants permission to update Zone */
  UpdateZone = 'UpdateZone'
}

/** The price range where the result has more than one price */
export type PriceRange = {
  __typename?: 'PriceRange';
  max: Scalars['Money'];
  min: Scalars['Money'];
};

export type Product = Node & {
  __typename?: 'Product';
  assets: Array<Asset>;
  collections: Array<Collection>;
  createdAt: Scalars['DateTime'];
  customFields?: Maybe<ProductCustomFields>;
  description: Scalars['String'];
  enabled: Scalars['Boolean'];
  facetValues: Array<FacetValue>;
  featuredAsset?: Maybe<Asset>;
  id: Scalars['ID'];
  languageCode: LanguageCode;
  name: Scalars['String'];
  optionGroups: Array<ProductOptionGroup>;
  reviews: ProductReviewList;
  reviewsHistogram: Array<ProductReviewHistogramItem>;
  slug: Scalars['String'];
  translations: Array<ProductTranslation>;
  updatedAt: Scalars['DateTime'];
  /** Returns a paginated, sortable, filterable list of ProductVariants */
  variantList: ProductVariantList;
  /** Returns all ProductVariants */
  variants: Array<ProductVariant>;
};


export type ProductReviewsArgs = {
  options?: InputMaybe<ProductReviewListOptions>;
};


export type ProductVariantListArgs = {
  options?: InputMaybe<ProductVariantListOptions>;
};

export type ProductCustomFields = {
  __typename?: 'ProductCustomFields';
  additionalDescription?: Maybe<Scalars['String']>;
  additionalInfo?: Maybe<Scalars['String']>;
  featuredReview?: Maybe<ProductReview>;
  height?: Maybe<Scalars['String']>;
  isBusinessExclusive?: Maybe<Scalars['Boolean']>;
  isFeatured?: Maybe<Scalars['Boolean']>;
  length?: Maybe<Scalars['String']>;
  popularityScore?: Maybe<Scalars['Int']>;
  reviewCount?: Maybe<Scalars['Float']>;
  reviewRating?: Maybe<Scalars['Float']>;
  vendorBusinessName?: Maybe<Scalars['String']>;
  vendorName?: Maybe<Scalars['String']>;
  weight?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['String']>;
  youtubeVideoLink?: Maybe<Scalars['String']>;
};

export type ProductFilterParameter = {
  _and?: InputMaybe<Array<ProductFilterParameter>>;
  _or?: InputMaybe<Array<ProductFilterParameter>>;
  additionalDescription?: InputMaybe<StringOperators>;
  additionalInfo?: InputMaybe<StringOperators>;
  createdAt?: InputMaybe<DateOperators>;
  description?: InputMaybe<StringOperators>;
  enabled?: InputMaybe<BooleanOperators>;
  height?: InputMaybe<StringOperators>;
  id?: InputMaybe<IdOperators>;
  isBusinessExclusive?: InputMaybe<BooleanOperators>;
  isFeatured?: InputMaybe<BooleanOperators>;
  languageCode?: InputMaybe<StringOperators>;
  length?: InputMaybe<StringOperators>;
  name?: InputMaybe<StringOperators>;
  popularityScore?: InputMaybe<NumberOperators>;
  reviewCount?: InputMaybe<NumberOperators>;
  reviewRating?: InputMaybe<NumberOperators>;
  slug?: InputMaybe<StringOperators>;
  updatedAt?: InputMaybe<DateOperators>;
  vendorBusinessName?: InputMaybe<StringOperators>;
  vendorName?: InputMaybe<StringOperators>;
  weight?: InputMaybe<StringOperators>;
  width?: InputMaybe<StringOperators>;
  youtubeVideoLink?: InputMaybe<StringOperators>;
};

export type ProductList = PaginatedList & {
  __typename?: 'ProductList';
  items: Array<Product>;
  totalItems: Scalars['Int'];
};

export type ProductListOptions = {
  /** Allows the results to be filtered */
  filter?: InputMaybe<ProductFilterParameter>;
  /** Specifies whether multiple top-level "filter" fields should be combined with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: InputMaybe<LogicalOperator>;
  /** Skips the first n results, for use in pagination */
  skip?: InputMaybe<Scalars['Int']>;
  /** Specifies which properties to sort the results by */
  sort?: InputMaybe<ProductSortParameter>;
  /** Takes n results, for use in pagination */
  take?: InputMaybe<Scalars['Int']>;
};

export type ProductOption = Node & {
  __typename?: 'ProductOption';
  code: Scalars['String'];
  createdAt: Scalars['DateTime'];
  customFields?: Maybe<Scalars['JSON']>;
  group: ProductOptionGroup;
  groupId: Scalars['ID'];
  id: Scalars['ID'];
  languageCode: LanguageCode;
  name: Scalars['String'];
  translations: Array<ProductOptionTranslation>;
  updatedAt: Scalars['DateTime'];
};

export type ProductOptionGroup = Node & {
  __typename?: 'ProductOptionGroup';
  code: Scalars['String'];
  createdAt: Scalars['DateTime'];
  customFields?: Maybe<Scalars['JSON']>;
  id: Scalars['ID'];
  languageCode: LanguageCode;
  name: Scalars['String'];
  options: Array<ProductOption>;
  translations: Array<ProductOptionGroupTranslation>;
  updatedAt: Scalars['DateTime'];
};

export type ProductOptionGroupTranslation = {
  __typename?: 'ProductOptionGroupTranslation';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  languageCode: LanguageCode;
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type ProductOptionTranslation = {
  __typename?: 'ProductOptionTranslation';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  languageCode: LanguageCode;
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type ProductReview = Node & {
  __typename?: 'ProductReview';
  authorLocation?: Maybe<Scalars['String']>;
  authorName: Scalars['String'];
  body?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  downvotes: Scalars['Int'];
  id: Scalars['ID'];
  product: Product;
  productVariant?: Maybe<ProductVariant>;
  rating: Scalars['Float'];
  response?: Maybe<Scalars['String']>;
  responseCreatedAt?: Maybe<Scalars['DateTime']>;
  state: Scalars['String'];
  summary: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  upvotes: Scalars['Int'];
};

export type ProductReviewFilterParameter = {
  _and?: InputMaybe<Array<ProductReviewFilterParameter>>;
  _or?: InputMaybe<Array<ProductReviewFilterParameter>>;
  authorLocation?: InputMaybe<StringOperators>;
  authorName?: InputMaybe<StringOperators>;
  body?: InputMaybe<StringOperators>;
  createdAt?: InputMaybe<DateOperators>;
  downvotes?: InputMaybe<NumberOperators>;
  id?: InputMaybe<IdOperators>;
  rating?: InputMaybe<NumberOperators>;
  response?: InputMaybe<StringOperators>;
  responseCreatedAt?: InputMaybe<DateOperators>;
  state?: InputMaybe<StringOperators>;
  summary?: InputMaybe<StringOperators>;
  updatedAt?: InputMaybe<DateOperators>;
  upvotes?: InputMaybe<NumberOperators>;
};

export type ProductReviewHistogramItem = {
  __typename?: 'ProductReviewHistogramItem';
  bin: Scalars['Int'];
  frequency: Scalars['Int'];
};

export type ProductReviewList = PaginatedList & {
  __typename?: 'ProductReviewList';
  items: Array<ProductReview>;
  totalItems: Scalars['Int'];
};

export type ProductReviewListOptions = {
  /** Allows the results to be filtered */
  filter?: InputMaybe<ProductReviewFilterParameter>;
  /** Specifies whether multiple top-level "filter" fields should be combined with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: InputMaybe<LogicalOperator>;
  /** Skips the first n results, for use in pagination */
  skip?: InputMaybe<Scalars['Int']>;
  /** Specifies which properties to sort the results by */
  sort?: InputMaybe<ProductReviewSortParameter>;
  /** Takes n results, for use in pagination */
  take?: InputMaybe<Scalars['Int']>;
};

export type ProductReviewSortParameter = {
  authorLocation?: InputMaybe<SortOrder>;
  authorName?: InputMaybe<SortOrder>;
  body?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  downvotes?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  rating?: InputMaybe<SortOrder>;
  response?: InputMaybe<SortOrder>;
  responseCreatedAt?: InputMaybe<SortOrder>;
  state?: InputMaybe<SortOrder>;
  summary?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  upvotes?: InputMaybe<SortOrder>;
};

export type ProductSortParameter = {
  additionalDescription?: InputMaybe<SortOrder>;
  additionalInfo?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  featuredReview?: InputMaybe<SortOrder>;
  height?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isBusinessExclusive?: InputMaybe<SortOrder>;
  isFeatured?: InputMaybe<SortOrder>;
  length?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  popularityScore?: InputMaybe<SortOrder>;
  reviewCount?: InputMaybe<SortOrder>;
  reviewRating?: InputMaybe<SortOrder>;
  slug?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  vendorBusinessName?: InputMaybe<SortOrder>;
  vendorName?: InputMaybe<SortOrder>;
  weight?: InputMaybe<SortOrder>;
  width?: InputMaybe<SortOrder>;
  youtubeVideoLink?: InputMaybe<SortOrder>;
};

export type ProductTranslation = {
  __typename?: 'ProductTranslation';
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['ID'];
  languageCode: LanguageCode;
  name: Scalars['String'];
  slug: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type ProductVariant = Node & {
  __typename?: 'ProductVariant';
  assets: Array<Asset>;
  createdAt: Scalars['DateTime'];
  currencyCode: CurrencyCode;
  customFields?: Maybe<ProductVariantCustomFields>;
  facetValues: Array<FacetValue>;
  featuredAsset?: Maybe<Asset>;
  id: Scalars['ID'];
  isInWishlist: Scalars['Boolean'];
  languageCode: LanguageCode;
  name: Scalars['String'];
  options: Array<ProductOption>;
  price: Scalars['Money'];
  priceWithTax: Scalars['Money'];
  prices: Array<ProductVariantPrice>;
  product: Product;
  productId: Scalars['ID'];
  quantitySold: Scalars['Int'];
  sku: Scalars['String'];
  stockLevel: Scalars['String'];
  taxCategory: TaxCategory;
  taxRateApplied: TaxRate;
  translations: Array<ProductVariantTranslation>;
  updatedAt: Scalars['DateTime'];
};

export type ProductVariantCustomFields = {
  __typename?: 'ProductVariantCustomFields';
  audPrice?: Maybe<Scalars['Float']>;
  currentBidPrice?: Maybe<Scalars['Float']>;
  nprPrice?: Maybe<Scalars['Float']>;
  return?: Maybe<Scalars['String']>;
  specification?: Maybe<Array<ProductVariantSpecificationStruct>>;
  usdPrice?: Maybe<Scalars['Float']>;
  variantSerialCode?: Maybe<Array<Scalars['String']>>;
};

export type ProductVariantFilterParameter = {
  _and?: InputMaybe<Array<ProductVariantFilterParameter>>;
  _or?: InputMaybe<Array<ProductVariantFilterParameter>>;
  audPrice?: InputMaybe<NumberOperators>;
  createdAt?: InputMaybe<DateOperators>;
  currencyCode?: InputMaybe<StringOperators>;
  currentBidPrice?: InputMaybe<NumberOperators>;
  id?: InputMaybe<IdOperators>;
  isInWishlist?: InputMaybe<BooleanOperators>;
  languageCode?: InputMaybe<StringOperators>;
  name?: InputMaybe<StringOperators>;
  nprPrice?: InputMaybe<NumberOperators>;
  price?: InputMaybe<NumberOperators>;
  priceWithTax?: InputMaybe<NumberOperators>;
  productId?: InputMaybe<IdOperators>;
  quantitySold?: InputMaybe<NumberOperators>;
  return?: InputMaybe<StringOperators>;
  sku?: InputMaybe<StringOperators>;
  stockLevel?: InputMaybe<StringOperators>;
  updatedAt?: InputMaybe<DateOperators>;
  usdPrice?: InputMaybe<NumberOperators>;
  variantSerialCode?: InputMaybe<StringListOperators>;
};

export type ProductVariantList = PaginatedList & {
  __typename?: 'ProductVariantList';
  items: Array<ProductVariant>;
  totalItems: Scalars['Int'];
};

export type ProductVariantListOptions = {
  /** Allows the results to be filtered */
  filter?: InputMaybe<ProductVariantFilterParameter>;
  /** Specifies whether multiple top-level "filter" fields should be combined with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: InputMaybe<LogicalOperator>;
  /** Skips the first n results, for use in pagination */
  skip?: InputMaybe<Scalars['Int']>;
  /** Specifies which properties to sort the results by */
  sort?: InputMaybe<ProductVariantSortParameter>;
  /** Takes n results, for use in pagination */
  take?: InputMaybe<Scalars['Int']>;
};

export type ProductVariantPrice = {
  __typename?: 'ProductVariantPrice';
  currencyCode: Scalars['String'];
  currencyCodeName: Scalars['String'];
  customFields?: Maybe<ProductVariantPriceCustomFields>;
  discountPrice: Scalars['Money'];
  isDefault: Scalars['Boolean'];
  price: Scalars['Money'];
};

export type ProductVariantPriceCustomFields = {
  __typename?: 'ProductVariantPriceCustomFields';
  discountPercentage?: Maybe<Scalars['Int']>;
  discountPrice?: Maybe<Scalars['Int']>;
};

export type ProductVariantSortParameter = {
  audPrice?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  currentBidPrice?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  nprPrice?: InputMaybe<SortOrder>;
  price?: InputMaybe<SortOrder>;
  priceWithTax?: InputMaybe<SortOrder>;
  productId?: InputMaybe<SortOrder>;
  quantitySold?: InputMaybe<SortOrder>;
  return?: InputMaybe<SortOrder>;
  sku?: InputMaybe<SortOrder>;
  stockLevel?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  usdPrice?: InputMaybe<SortOrder>;
};

export type ProductVariantSpecificationStruct = {
  __typename?: 'ProductVariantSpecificationStruct';
  isPinned?: Maybe<Scalars['Boolean']>;
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type ProductVariantTranslation = {
  __typename?: 'ProductVariantTranslation';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  languageCode: LanguageCode;
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Promotion = Node & {
  __typename?: 'Promotion';
  actions: Array<ConfigurableOperation>;
  conditions: Array<ConfigurableOperation>;
  couponCode?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  customFields?: Maybe<Scalars['JSON']>;
  description: Scalars['String'];
  enabled: Scalars['Boolean'];
  endsAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  perCustomerUsageLimit?: Maybe<Scalars['Int']>;
  startsAt?: Maybe<Scalars['DateTime']>;
  translations: Array<PromotionTranslation>;
  updatedAt: Scalars['DateTime'];
  usageLimit?: Maybe<Scalars['Int']>;
};

export type PromotionList = PaginatedList & {
  __typename?: 'PromotionList';
  items: Array<Promotion>;
  totalItems: Scalars['Int'];
};

export type PromotionTranslation = {
  __typename?: 'PromotionTranslation';
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['ID'];
  languageCode: LanguageCode;
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Province = Node & Region & {
  __typename?: 'Province';
  code: Scalars['String'];
  createdAt: Scalars['DateTime'];
  customFields?: Maybe<Scalars['JSON']>;
  enabled: Scalars['Boolean'];
  id: Scalars['ID'];
  languageCode: LanguageCode;
  name: Scalars['String'];
  parent?: Maybe<Region>;
  parentId?: Maybe<Scalars['ID']>;
  translations: Array<RegionTranslation>;
  type: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type ProvinceList = PaginatedList & {
  __typename?: 'ProvinceList';
  items: Array<Province>;
  totalItems: Scalars['Int'];
};

export type PublicPaymentMethod = {
  __typename?: 'PublicPaymentMethod';
  code: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  translations: Array<PaymentMethodTranslation>;
};

export type PublicShippingMethod = {
  __typename?: 'PublicShippingMethod';
  code: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  translations: Array<ShippingMethodTranslation>;
};

export type Query = {
  __typename?: 'Query';
  /** The active Channel */
  activeChannel: Channel;
  /** The active Customer */
  activeCustomer?: Maybe<Customer>;
  /**
   * The active Order. Will be `null` until an Order is created via `addItemToOrder`. Once an Order reaches the
   * state of `PaymentAuthorized` or `PaymentSettled`, then that Order is no longer considered "active" and this
   * query will once again return `null`.
   */
  activeOrder?: Maybe<Order>;
  /** Get active payment methods */
  activePaymentMethods: Array<Maybe<PublicPaymentMethod>>;
  /** Get active shipping methods */
  activeShippingMethods: Array<Maybe<PublicShippingMethod>>;
  /** An array of supported Countries */
  availableCountries: Array<Country>;
  blogBySlug: Blog;
  blogs: BlogList;
  /** Returns a Collection either by its id or slug. If neither 'id' nor 'slug' is specified, an error will result. */
  collection?: Maybe<Collection>;
  /** A list of Collections available to the shop */
  collections: CollectionList;
  contact?: Maybe<Contact>;
  contacts: ContactList;
  currencyExchangeRate?: Maybe<CurrencyExchangeRateResponse>;
  /** Returns a list of payment methods and their eligibility based on the current active Order */
  eligiblePaymentMethods: Array<PaymentMethodQuote>;
  /** Returns a list of eligible shipping methods based on the current active Order */
  eligibleShippingMethods: Array<ShippingMethodQuote>;
  /** Returns a Facet by its id */
  facet?: Maybe<Facet>;
  /** A list of Facets available to the shop */
  facets: FacetList;
  generateBraintreeClientToken?: Maybe<Scalars['String']>;
  getAllProductsOnSale?: Maybe<Array<ProductVariant>>;
  getAllPromotionsForProduct?: Maybe<Array<Promotion>>;
  getOrderStatus: OrderStatus;
  heroSectionBanner?: Maybe<Banner>;
  heroSectionBanners: Array<Banner>;
  highestSellingProduct?: Maybe<ProductList>;
  loyaltyCouponCodes?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Returns information about the current authenticated User */
  me?: Maybe<CurrentUser>;
  navBarCollections: Array<Collection>;
  /** Returns the possible next states that the activeOrder can transition to */
  nextOrderStates: Array<Scalars['String']>;
  /**
   * Returns an Order based on the id. Note that in the Shop API, only orders belonging to the
   * currently-authenticated User may be queried.
   */
  order?: Maybe<Order>;
  /**
   * Returns an Order based on the order `code`. For guest Orders (i.e. Orders placed by non-authenticated Customers)
   * this query will only return the Order within 2 hours of the Order being placed. This allows an Order confirmation
   * screen to be shown immediately after completion of a guest checkout, yet prevents security risks of allowing
   * general anonymous access to Order data.
   */
  orderByCode?: Maybe<Order>;
  orderPlacedBonus: Array<OrderBonus>;
  /** Get a Page either by id or slug. If neither id nor slug is specified, an error will result. */
  page?: Maybe<Page>;
  pageGroup?: Maybe<PageGroup>;
  pageGroups: PageGroupList;
  pages: PageList;
  /** Get a Product either by id or slug. If neither 'id' nor 'slug' is specified, an error will result. */
  product?: Maybe<Product>;
  productReview?: Maybe<ProductReview>;
  productReviews: ProductReviewList;
  /** Get a list of Products */
  products: ProductList;
  questionForProduct: Array<Question>;
  questionForVariant: Array<Question>;
  relatedProducts: Array<Product>;
  /** Search Products based on the criteria set by the `SearchInput` */
  search: SearchResponse;
  signupBonus: Scalars['Int'];
  techcoinTrasnsactions: Array<TechCoinTransaction>;
  trackOrder?: Maybe<Order>;
  wishlists: WishlistItemList;
};


export type QueryBlogBySlugArgs = {
  slug: Scalars['String'];
};


export type QueryBlogsArgs = {
  options?: InputMaybe<BlogListOptions>;
};


export type QueryCollectionArgs = {
  id?: InputMaybe<Scalars['ID']>;
  slug?: InputMaybe<Scalars['String']>;
};


export type QueryCollectionsArgs = {
  options?: InputMaybe<CollectionListOptions>;
};


export type QueryContactArgs = {
  id: Scalars['ID'];
};


export type QueryContactsArgs = {
  options?: InputMaybe<ContactListOptions>;
};


export type QueryFacetArgs = {
  id: Scalars['ID'];
};


export type QueryFacetsArgs = {
  options?: InputMaybe<FacetListOptions>;
};


export type QueryGetAllPromotionsForProductArgs = {
  productId: Scalars['ID'];
};


export type QueryGetOrderStatusArgs = {
  orderId: Scalars['ID'];
};


export type QueryHeroSectionBannerArgs = {
  id: Scalars['ID'];
};


export type QueryHighestSellingProductArgs = {
  options?: InputMaybe<ProductListOptions>;
  take: Scalars['Int'];
};


export type QueryOrderArgs = {
  id: Scalars['ID'];
};


export type QueryOrderByCodeArgs = {
  code: Scalars['String'];
};


export type QueryPageArgs = {
  id?: InputMaybe<Scalars['ID']>;
  slug?: InputMaybe<Scalars['String']>;
};


export type QueryPageGroupArgs = {
  id?: InputMaybe<Scalars['ID']>;
  slug?: InputMaybe<Scalars['String']>;
};


export type QueryPageGroupsArgs = {
  options?: InputMaybe<PageGroupListOptions>;
};


export type QueryPagesArgs = {
  options?: InputMaybe<PageListOptions>;
};


export type QueryProductArgs = {
  id?: InputMaybe<Scalars['ID']>;
  slug?: InputMaybe<Scalars['String']>;
};


export type QueryProductReviewArgs = {
  id: Scalars['ID'];
};


export type QueryProductReviewsArgs = {
  options?: InputMaybe<ProductReviewListOptions>;
};


export type QueryProductsArgs = {
  options?: InputMaybe<ProductListOptions>;
};


export type QueryQuestionForProductArgs = {
  id: Scalars['ID'];
};


export type QueryQuestionForVariantArgs = {
  id: Scalars['ID'];
};


export type QueryRelatedProductsArgs = {
  productSlug: Scalars['String'];
};


export type QuerySearchArgs = {
  input: SearchInput;
};


export type QueryTechcoinTrasnsactionsArgs = {
  customerId: Scalars['ID'];
};


export type QueryTrackOrderArgs = {
  email: Scalars['String'];
  orderCode: Scalars['String'];
};


export type QueryWishlistsArgs = {
  options?: InputMaybe<WishlistItemListOptions>;
};

export type Question = Node & {
  __typename?: 'Question';
  answer?: Maybe<Answer>;
  askedBy: Customer;
  id: Scalars['ID'];
  product?: Maybe<Product>;
  productVariant?: Maybe<ProductVariant>;
  question: Scalars['String'];
};

export type QuestionCreateInput = {
  product?: InputMaybe<Scalars['ID']>;
  productVariant?: InputMaybe<Scalars['ID']>;
  question: Scalars['String'];
};

export type QuestionEditInput = {
  id: Scalars['ID'];
  product?: InputMaybe<Scalars['ID']>;
  productVariant?: InputMaybe<Scalars['ID']>;
  question?: InputMaybe<Scalars['String']>;
};

export type QuestionResponse = {
  __typename?: 'QuestionResponse';
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type RedeemTechCoinResult = InsufficientLoyaltyPointsError | TechCoinsReedemResponse;

export type RefreshCustomerVerificationResult = NativeAuthStrategyError | Success;

export type Refund = Node & {
  __typename?: 'Refund';
  adjustment: Scalars['Money'];
  createdAt: Scalars['DateTime'];
  customFields?: Maybe<Scalars['JSON']>;
  id: Scalars['ID'];
  items: Scalars['Money'];
  lines: Array<RefundLine>;
  metadata?: Maybe<Scalars['JSON']>;
  method?: Maybe<Scalars['String']>;
  paymentId: Scalars['ID'];
  reason?: Maybe<Scalars['String']>;
  shipping: Scalars['Money'];
  state: Scalars['String'];
  total: Scalars['Money'];
  transactionId?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type RefundLine = {
  __typename?: 'RefundLine';
  orderLine: OrderLine;
  orderLineId: Scalars['ID'];
  quantity: Scalars['Int'];
  refund: Refund;
  refundId: Scalars['ID'];
};

export type Region = {
  code: Scalars['String'];
  createdAt: Scalars['DateTime'];
  enabled: Scalars['Boolean'];
  id: Scalars['ID'];
  languageCode: LanguageCode;
  name: Scalars['String'];
  parent?: Maybe<Region>;
  parentId?: Maybe<Scalars['ID']>;
  translations: Array<RegionTranslation>;
  type: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type RegionTranslation = {
  __typename?: 'RegionTranslation';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  languageCode: LanguageCode;
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type RegisterCustomerAccountResult = MissingPasswordError | NativeAuthStrategyError | PasswordValidationError | Success;

export type RegisterCustomerCustomFieldsInput = {
  avatarUrlId?: InputMaybe<Scalars['ID']>;
  bankAccount?: InputMaybe<CustomerBankAccountStructInput>;
  businessName?: InputMaybe<Scalars['String']>;
  isBusiness?: InputMaybe<Scalars['Boolean']>;
  isVerified?: InputMaybe<Scalars['Boolean']>;
  scheduleDeleteAt?: InputMaybe<Scalars['DateTime']>;
  vatPan?: InputMaybe<Scalars['String']>;
};

export type RegisterCustomerInput = {
  customFields?: InputMaybe<RegisterCustomerCustomFieldsInput>;
  emailAddress: Scalars['String'];
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type RelationCustomFieldConfig = CustomField & {
  __typename?: 'RelationCustomFieldConfig';
  description?: Maybe<Array<LocalizedString>>;
  entity: Scalars['String'];
  internal?: Maybe<Scalars['Boolean']>;
  label?: Maybe<Array<LocalizedString>>;
  list: Scalars['Boolean'];
  name: Scalars['String'];
  nullable?: Maybe<Scalars['Boolean']>;
  readonly?: Maybe<Scalars['Boolean']>;
  requiresPermission?: Maybe<Array<Permission>>;
  scalarFields: Array<Scalars['String']>;
  type: Scalars['String'];
  ui?: Maybe<Scalars['JSON']>;
};

export type RemoveOrderItemsResult = Order | OrderInterceptorError | OrderModificationError;

export type RequestPasswordResetResult = NativeAuthStrategyError | Success;

export type RequestUpdateCustomerEmailAddressResult = EmailAddressConflictError | InvalidCredentialsError | NativeAuthStrategyError | Success;

export type ResetPasswordResult = CurrentUser | NativeAuthStrategyError | NotVerifiedError | PasswordResetTokenExpiredError | PasswordResetTokenInvalidError | PasswordValidationError;

export type RingRoadListResponse = {
  __typename?: 'RingRoadListResponse';
  ringroad: Array<Scalars['String']>;
};

export type Role = Node & {
  __typename?: 'Role';
  channels: Array<Channel>;
  code: Scalars['String'];
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['ID'];
  permissions: Array<Permission>;
  updatedAt: Scalars['DateTime'];
};

export type RoleList = PaginatedList & {
  __typename?: 'RoleList';
  items: Array<Role>;
  totalItems: Scalars['Int'];
};

export type SearchInput = {
  collectionId?: InputMaybe<Scalars['ID']>;
  collectionSlug?: InputMaybe<Scalars['String']>;
  facetValueFilters?: InputMaybe<Array<FacetValueFilterInput>>;
  groupByProduct?: InputMaybe<Scalars['Boolean']>;
  inStock?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<SearchResultSortParameter>;
  take?: InputMaybe<Scalars['Int']>;
  term?: InputMaybe<Scalars['String']>;
};

export type SearchReindexResponse = {
  __typename?: 'SearchReindexResponse';
  success: Scalars['Boolean'];
};

export type SearchResponse = {
  __typename?: 'SearchResponse';
  collections: Array<CollectionResult>;
  facetValues: Array<FacetValueResult>;
  items: Array<SearchResult>;
  totalItems: Scalars['Int'];
};

export type SearchResult = {
  __typename?: 'SearchResult';
  /** An array of ids of the Collections in which this result appears */
  collectionIds: Array<Scalars['ID']>;
  currencyCode: CurrencyCode;
  description: Scalars['String'];
  facetIds: Array<Scalars['ID']>;
  facetValueIds: Array<Scalars['ID']>;
  inStock: Scalars['Boolean'];
  price: SearchResultPrice;
  priceWithTax: SearchResultPrice;
  prices: Array<ProductVariantPrice>;
  productAsset?: Maybe<SearchResultAsset>;
  productId: Scalars['ID'];
  productName: Scalars['String'];
  productVariantAsset?: Maybe<SearchResultAsset>;
  productVariantId: Scalars['ID'];
  productVariantName: Scalars['String'];
  /** A relevance score for the result. Differs between database implementations */
  score: Scalars['Float'];
  sku: Scalars['String'];
  slug: Scalars['String'];
};

export type SearchResultAsset = {
  __typename?: 'SearchResultAsset';
  focalPoint?: Maybe<Coordinate>;
  id: Scalars['ID'];
  preview: Scalars['String'];
};

/** The price of a search result product, either as a range or as a single price */
export type SearchResultPrice = PriceRange | SinglePrice;

export type SearchResultSortParameter = {
  name?: InputMaybe<SortOrder>;
  price?: InputMaybe<SortOrder>;
};

export type Seller = Node & {
  __typename?: 'Seller';
  createdAt: Scalars['DateTime'];
  customFields?: Maybe<Scalars['JSON']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type SellerRegistration = Node & {
  __typename?: 'SellerRegistration';
  address?: Maybe<Scalars['String']>;
  businessName: Scalars['String'];
  businessRegistrationNo: Scalars['String'];
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['ID'];
  isVerified: Scalars['Boolean'];
  ownerName: Scalars['String'];
  panNo: Scalars['String'];
  phone: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type SetCustomerForOrderResult = AlreadyLoggedInError | EmailAddressConflictError | GuestCheckoutError | NoActiveOrderError | Order;

export type SetOrderShippingMethodResult = IneligibleShippingMethodError | NoActiveOrderError | Order | OrderModificationError;

export type ShippingLine = {
  __typename?: 'ShippingLine';
  customFields?: Maybe<Scalars['JSON']>;
  discountedPrice: Scalars['Money'];
  discountedPriceWithTax: Scalars['Money'];
  discounts: Array<Discount>;
  id: Scalars['ID'];
  price: Scalars['Money'];
  priceWithTax: Scalars['Money'];
  shippingMethod: ShippingMethod;
};

export type ShippingMethod = Node & {
  __typename?: 'ShippingMethod';
  calculator: ConfigurableOperation;
  checker: ConfigurableOperation;
  code: Scalars['String'];
  createdAt: Scalars['DateTime'];
  customFields?: Maybe<Scalars['JSON']>;
  description: Scalars['String'];
  fulfillmentHandlerCode: Scalars['String'];
  id: Scalars['ID'];
  languageCode: LanguageCode;
  name: Scalars['String'];
  translations: Array<ShippingMethodTranslation>;
  updatedAt: Scalars['DateTime'];
};

export type ShippingMethodList = PaginatedList & {
  __typename?: 'ShippingMethodList';
  items: Array<ShippingMethod>;
  totalItems: Scalars['Int'];
};

export type ShippingMethodQuote = {
  __typename?: 'ShippingMethodQuote';
  code: Scalars['String'];
  customFields?: Maybe<Scalars['JSON']>;
  description: Scalars['String'];
  id: Scalars['ID'];
  /** Any optional metadata returned by the ShippingCalculator in the ShippingCalculationResult */
  metadata?: Maybe<Scalars['JSON']>;
  name: Scalars['String'];
  price: Scalars['Money'];
  priceWithTax: Scalars['Money'];
};

export type ShippingMethodTranslation = {
  __typename?: 'ShippingMethodTranslation';
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['ID'];
  languageCode: LanguageCode;
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

/** The price value where the result has a single price */
export type SinglePrice = {
  __typename?: 'SinglePrice';
  value: Scalars['Money'];
};

export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type StringCustomFieldConfig = CustomField & {
  __typename?: 'StringCustomFieldConfig';
  description?: Maybe<Array<LocalizedString>>;
  internal?: Maybe<Scalars['Boolean']>;
  label?: Maybe<Array<LocalizedString>>;
  length?: Maybe<Scalars['Int']>;
  list: Scalars['Boolean'];
  name: Scalars['String'];
  nullable?: Maybe<Scalars['Boolean']>;
  options?: Maybe<Array<StringFieldOption>>;
  pattern?: Maybe<Scalars['String']>;
  readonly?: Maybe<Scalars['Boolean']>;
  requiresPermission?: Maybe<Array<Permission>>;
  type: Scalars['String'];
  ui?: Maybe<Scalars['JSON']>;
};

export type StringFieldOption = {
  __typename?: 'StringFieldOption';
  label?: Maybe<Array<LocalizedString>>;
  value: Scalars['String'];
};

/** Operators for filtering on a list of String fields */
export type StringListOperators = {
  inList: Scalars['String'];
};

/** Operators for filtering on a String field */
export type StringOperators = {
  contains?: InputMaybe<Scalars['String']>;
  eq?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  isNull?: InputMaybe<Scalars['Boolean']>;
  notContains?: InputMaybe<Scalars['String']>;
  notEq?: InputMaybe<Scalars['String']>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  regex?: InputMaybe<Scalars['String']>;
};

export type StringStructFieldConfig = StructField & {
  __typename?: 'StringStructFieldConfig';
  description?: Maybe<Array<LocalizedString>>;
  label?: Maybe<Array<LocalizedString>>;
  length?: Maybe<Scalars['Int']>;
  list: Scalars['Boolean'];
  name: Scalars['String'];
  options?: Maybe<Array<StringFieldOption>>;
  pattern?: Maybe<Scalars['String']>;
  type: Scalars['String'];
  ui?: Maybe<Scalars['JSON']>;
};

export type StructCustomFieldConfig = CustomField & {
  __typename?: 'StructCustomFieldConfig';
  description?: Maybe<Array<LocalizedString>>;
  fields: Array<StructFieldConfig>;
  internal?: Maybe<Scalars['Boolean']>;
  label?: Maybe<Array<LocalizedString>>;
  list: Scalars['Boolean'];
  name: Scalars['String'];
  nullable?: Maybe<Scalars['Boolean']>;
  readonly?: Maybe<Scalars['Boolean']>;
  requiresPermission?: Maybe<Array<Permission>>;
  type: Scalars['String'];
  ui?: Maybe<Scalars['JSON']>;
};

export type StructField = {
  description?: Maybe<Array<LocalizedString>>;
  label?: Maybe<Array<LocalizedString>>;
  list?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  type: Scalars['String'];
  ui?: Maybe<Scalars['JSON']>;
};

export type StructFieldConfig = BooleanStructFieldConfig | DateTimeStructFieldConfig | FloatStructFieldConfig | IntStructFieldConfig | StringStructFieldConfig | TextStructFieldConfig;

export type SubmitProductReviewInput = {
  authorLocation?: InputMaybe<Scalars['String']>;
  authorName: Scalars['String'];
  body: Scalars['String'];
  customerId?: InputMaybe<Scalars['ID']>;
  productId: Scalars['ID'];
  rating: Scalars['Float'];
  summary: Scalars['String'];
  variantId?: InputMaybe<Scalars['ID']>;
};

export type SubscribeToNewsletterInput = {
  email: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  source?: InputMaybe<Scalars['String']>;
};

export type SubscribeToNewsletterResult = {
  __typename?: 'SubscribeToNewsletterResult';
  created: Scalars['Boolean'];
  success: Scalars['Boolean'];
};

/** Indicates that an operation succeeded, where we do not want to return any more specific information. */
export type Success = {
  __typename?: 'Success';
  success: Scalars['Boolean'];
};

export type Surcharge = Node & {
  __typename?: 'Surcharge';
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['ID'];
  price: Scalars['Money'];
  priceWithTax: Scalars['Money'];
  sku?: Maybe<Scalars['String']>;
  taxLines: Array<TaxLine>;
  taxRate: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
};

export type Tag = Node & {
  __typename?: 'Tag';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  updatedAt: Scalars['DateTime'];
  value: Scalars['String'];
};

export type TagList = PaginatedList & {
  __typename?: 'TagList';
  items: Array<Tag>;
  totalItems: Scalars['Int'];
};

export type TaxCategory = Node & {
  __typename?: 'TaxCategory';
  createdAt: Scalars['DateTime'];
  customFields?: Maybe<Scalars['JSON']>;
  id: Scalars['ID'];
  isDefault: Scalars['Boolean'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type TaxLine = {
  __typename?: 'TaxLine';
  description: Scalars['String'];
  taxRate: Scalars['Float'];
};

export type TaxRate = Node & {
  __typename?: 'TaxRate';
  category: TaxCategory;
  createdAt: Scalars['DateTime'];
  customFields?: Maybe<Scalars['JSON']>;
  customerGroup?: Maybe<CustomerGroup>;
  enabled: Scalars['Boolean'];
  id: Scalars['ID'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  value: Scalars['Float'];
  zone: Zone;
};

export type TaxRateList = PaginatedList & {
  __typename?: 'TaxRateList';
  items: Array<TaxRate>;
  totalItems: Scalars['Int'];
};

export type TechCoinTransaction = Node & {
  __typename?: 'TechCoinTransaction';
  customer: Customer;
  customerId: Scalars['ID'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  loyaltyPointsType: TechCoinType;
  order?: Maybe<Order>;
  orderCode?: Maybe<Scalars['String']>;
  points: Scalars['Int'];
  type: TechCoinTransactionType;
};

export enum TechCoinTransactionType {
  Earned = 'EARNED',
  Redeemed = 'REDEEMED',
  Reverted = 'REVERTED'
}

export enum TechCoinType {
  Order = 'ORDER',
  Register = 'REGISTER'
}

export type TechCoinsReedemResponse = {
  __typename?: 'TechCoinsReedemResponse';
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type TextCustomFieldConfig = CustomField & {
  __typename?: 'TextCustomFieldConfig';
  description?: Maybe<Array<LocalizedString>>;
  internal?: Maybe<Scalars['Boolean']>;
  label?: Maybe<Array<LocalizedString>>;
  list: Scalars['Boolean'];
  name: Scalars['String'];
  nullable?: Maybe<Scalars['Boolean']>;
  readonly?: Maybe<Scalars['Boolean']>;
  requiresPermission?: Maybe<Array<Permission>>;
  type: Scalars['String'];
  ui?: Maybe<Scalars['JSON']>;
};

export type TextStructFieldConfig = StructField & {
  __typename?: 'TextStructFieldConfig';
  description?: Maybe<Array<LocalizedString>>;
  label?: Maybe<Array<LocalizedString>>;
  list: Scalars['Boolean'];
  name: Scalars['String'];
  type: Scalars['String'];
  ui?: Maybe<Scalars['JSON']>;
};

export type TransitionOrderToStateResult = Order | OrderStateTransitionError;

export type UnsubscribeFromNewsletterInput = {
  email: Scalars['String'];
};

export type UnsubscribeFromNewsletterResult = {
  __typename?: 'UnsubscribeFromNewsletterResult';
  removed: Scalars['Boolean'];
  success: Scalars['Boolean'];
};

export type UpdateAddressCustomFieldsInput = {
  vat?: InputMaybe<Scalars['String']>;
};

/**
 * Input used to update an Address.
 *
 * The countryCode must correspond to a `code` property of a Country that has been defined in the
 * Vendure server. The `code` property is typically a 2-character ISO code such as "GB", "US", "DE" etc.
 * If an invalid code is passed, the mutation will fail.
 */
export type UpdateAddressInput = {
  city?: InputMaybe<Scalars['String']>;
  company?: InputMaybe<Scalars['String']>;
  countryCode?: InputMaybe<Scalars['String']>;
  customFields?: InputMaybe<UpdateAddressCustomFieldsInput>;
  defaultBillingAddress?: InputMaybe<Scalars['Boolean']>;
  defaultShippingAddress?: InputMaybe<Scalars['Boolean']>;
  fullName?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  phoneNumber?: InputMaybe<Scalars['String']>;
  postalCode?: InputMaybe<Scalars['String']>;
  province?: InputMaybe<Scalars['String']>;
  streetLine1?: InputMaybe<Scalars['String']>;
  streetLine2?: InputMaybe<Scalars['String']>;
};

export type UpdateCustomerCustomFieldsInput = {
  avatarUrlId?: InputMaybe<Scalars['ID']>;
  bankAccount?: InputMaybe<CustomerBankAccountStructInput>;
  businessName?: InputMaybe<Scalars['String']>;
  isBusiness?: InputMaybe<Scalars['Boolean']>;
  isVerified?: InputMaybe<Scalars['Boolean']>;
  scheduleDeleteAt?: InputMaybe<Scalars['DateTime']>;
  vatPan?: InputMaybe<Scalars['String']>;
};

export type UpdateCustomerEmailAddressResult = IdentifierChangeTokenExpiredError | IdentifierChangeTokenInvalidError | NativeAuthStrategyError | Success;

export type UpdateCustomerInput = {
  customFields?: InputMaybe<UpdateCustomerCustomFieldsInput>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type UpdateCustomerPasswordResult = InvalidCredentialsError | NativeAuthStrategyError | PasswordValidationError | Success;

export type UpdateOrderCustomFieldsInput = {
  destinationBranch?: InputMaybe<Scalars['String']>;
  estimatedDeliveryDate?: InputMaybe<Scalars['DateTime']>;
  ncmQuote?: InputMaybe<Scalars['String']>;
  ncmTrackingId?: InputMaybe<Scalars['String']>;
  nearestNcmBranch?: InputMaybe<Scalars['String']>;
  orderNotes?: InputMaybe<Scalars['String']>;
  outOfValley?: InputMaybe<Scalars['Boolean']>;
  paymentId?: InputMaybe<Scalars['String']>;
  pickupTime?: InputMaybe<Scalars['String']>;
  qrPaymentProofId?: InputMaybe<Scalars['ID']>;
  scanDetails?: InputMaybe<Array<OrderScanDetailsStructInput>>;
};

export type UpdateOrderInput = {
  customFields?: InputMaybe<UpdateOrderCustomFieldsInput>;
};

export type UpdateOrderItemsResult = InsufficientStockError | NegativeQuantityError | Order | OrderInterceptorError | OrderLimitError | OrderModificationError;

export type User = Node & {
  __typename?: 'User';
  authenticationMethods: Array<AuthenticationMethod>;
  createdAt: Scalars['DateTime'];
  customFields?: Maybe<Scalars['JSON']>;
  id: Scalars['ID'];
  identifier: Scalars['String'];
  lastLogin?: Maybe<Scalars['DateTime']>;
  roles: Array<Role>;
  updatedAt: Scalars['DateTime'];
  verified: Scalars['Boolean'];
};

/**
 * Returned if the verification token (used to verify a Customer's email address) is valid, but has
 * expired according to the `verificationTokenDuration` setting in the AuthOptions.
 */
export type VerificationTokenExpiredError = ErrorResult & {
  __typename?: 'VerificationTokenExpiredError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

/**
 * Returned if the verification token (used to verify a Customer's email address) is either
 * invalid or does not match any expected tokens.
 */
export type VerificationTokenInvalidError = ErrorResult & {
  __typename?: 'VerificationTokenInvalidError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

export type VerifyCustomerAccountResult = CurrentUser | MissingPasswordError | NativeAuthStrategyError | PasswordAlreadySetError | PasswordValidationError | VerificationTokenExpiredError | VerificationTokenInvalidError;

export type WishlistItem = Node & {
  __typename?: 'WishlistItem';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  productVariant: ProductVariant;
  updatedAt: Scalars['DateTime'];
};

export type WishlistItemFilterParameter = {
  _and?: InputMaybe<Array<WishlistItemFilterParameter>>;
  _or?: InputMaybe<Array<WishlistItemFilterParameter>>;
  createdAt?: InputMaybe<DateOperators>;
  id?: InputMaybe<IdOperators>;
  updatedAt?: InputMaybe<DateOperators>;
};

export type WishlistItemList = PaginatedList & {
  __typename?: 'WishlistItemList';
  items: Array<WishlistItem>;
  totalItems: Scalars['Int'];
};

export type WishlistItemListOptions = {
  /** Allows the results to be filtered */
  filter?: InputMaybe<WishlistItemFilterParameter>;
  /** Specifies whether multiple top-level "filter" fields should be combined with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: InputMaybe<LogicalOperator>;
  /** Skips the first n results, for use in pagination */
  skip?: InputMaybe<Scalars['Int']>;
  /** Specifies which properties to sort the results by */
  sort?: InputMaybe<WishlistItemSortParameter>;
  /** Takes n results, for use in pagination */
  take?: InputMaybe<Scalars['Int']>;
};

export type WishlistItemSortParameter = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type Zone = Node & {
  __typename?: 'Zone';
  createdAt: Scalars['DateTime'];
  customFields?: Maybe<Scalars['JSON']>;
  id: Scalars['ID'];
  members: Array<Region>;
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Blog = Node & {
  __typename?: 'blog';
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  metaDescription?: Maybe<Scalars['String']>;
  metaTags?: Maybe<Scalars['String']>;
  metaTitle?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  slug: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type BlogFilterParameter = {
  _and?: InputMaybe<Array<BlogFilterParameter>>;
  _or?: InputMaybe<Array<BlogFilterParameter>>;
  content?: InputMaybe<StringOperators>;
  createdAt?: InputMaybe<DateOperators>;
  id?: InputMaybe<IdOperators>;
  metaDescription?: InputMaybe<StringOperators>;
  metaTags?: InputMaybe<StringOperators>;
  metaTitle?: InputMaybe<StringOperators>;
  name?: InputMaybe<StringOperators>;
  slug?: InputMaybe<StringOperators>;
  updatedAt?: InputMaybe<DateOperators>;
};

export type BlogList = PaginatedList & {
  __typename?: 'blogList';
  items: Array<Blog>;
  totalItems: Scalars['Int'];
};

export type BlogListOptions = {
  /** Allows the results to be filtered */
  filter?: InputMaybe<BlogFilterParameter>;
  /** Specifies whether multiple top-level "filter" fields should be combined with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: InputMaybe<LogicalOperator>;
  /** Skips the first n results, for use in pagination */
  skip?: InputMaybe<Scalars['Int']>;
  /** Specifies which properties to sort the results by */
  sort?: InputMaybe<BlogSortParameter>;
  /** Takes n results, for use in pagination */
  take?: InputMaybe<Scalars['Int']>;
};

export type BlogSortParameter = {
  content?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  metaDescription?: InputMaybe<SortOrder>;
  metaTags?: InputMaybe<SortOrder>;
  metaTitle?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  slug?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type CreateSellerResponse = {
  __typename?: 'createSellerResponse';
  message: Scalars['String'];
  status: Scalars['Boolean'];
};

export type CreateSellerUserInput = {
  password: Scalars['String'];
  registrationId: Scalars['String'];
};

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  rememberMe?: InputMaybe<Scalars['Boolean']>;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename: 'CurrentUser', id: string, identifier: string } | { __typename: 'InvalidCredentialsError', errorCode: ErrorCode, message: string } | { __typename: 'NativeAuthStrategyError', errorCode: ErrorCode, message: string } | { __typename: 'NotVerifiedError', errorCode: ErrorCode, message: string } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: { __typename?: 'Success', success: boolean } };

export type RegisterCustomerAccountMutationVariables = Exact<{
  input: RegisterCustomerInput;
}>;


export type RegisterCustomerAccountMutation = { __typename?: 'Mutation', registerCustomerAccount: { __typename: 'MissingPasswordError', errorCode: ErrorCode, message: string } | { __typename: 'NativeAuthStrategyError', errorCode: ErrorCode, message: string } | { __typename: 'PasswordValidationError', errorCode: ErrorCode, message: string } | { __typename: 'Success', success: boolean } };

export type VerifyCustomerAccountMutationVariables = Exact<{
  token: Scalars['String'];
  password?: InputMaybe<Scalars['String']>;
}>;


export type VerifyCustomerAccountMutation = { __typename?: 'Mutation', verifyCustomerAccount: { __typename: 'CurrentUser', id: string, identifier: string } | { __typename: 'MissingPasswordError', errorCode: ErrorCode, message: string } | { __typename: 'NativeAuthStrategyError', errorCode: ErrorCode, message: string } | { __typename: 'PasswordAlreadySetError', errorCode: ErrorCode, message: string } | { __typename: 'PasswordValidationError', errorCode: ErrorCode, message: string } | { __typename: 'VerificationTokenExpiredError', errorCode: ErrorCode, message: string } | { __typename: 'VerificationTokenInvalidError', errorCode: ErrorCode, message: string } };

export type UpdateCustomerMutationVariables = Exact<{
  input: UpdateCustomerInput;
}>;


export type UpdateCustomerMutation = { __typename?: 'Mutation', updateCustomer: { __typename: 'Customer' } };

export type RequestUpdateCustomerEmailAddressMutationVariables = Exact<{
  password: Scalars['String'];
  newEmailAddress: Scalars['String'];
}>;


export type RequestUpdateCustomerEmailAddressMutation = { __typename?: 'Mutation', requestUpdateCustomerEmailAddress: { __typename: 'EmailAddressConflictError', errorCode: ErrorCode, message: string } | { __typename: 'InvalidCredentialsError', errorCode: ErrorCode, message: string } | { __typename: 'NativeAuthStrategyError', errorCode: ErrorCode, message: string } | { __typename: 'Success' } };

export type UpdateCustomerEmailAddressMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type UpdateCustomerEmailAddressMutation = { __typename?: 'Mutation', updateCustomerEmailAddress: { __typename: 'IdentifierChangeTokenExpiredError', errorCode: ErrorCode, message: string } | { __typename: 'IdentifierChangeTokenInvalidError', errorCode: ErrorCode, message: string } | { __typename: 'NativeAuthStrategyError', errorCode: ErrorCode, message: string } | { __typename: 'Success' } };

export type UpdateCustomerAddressMutationVariables = Exact<{
  input: UpdateAddressInput;
}>;


export type UpdateCustomerAddressMutation = { __typename?: 'Mutation', updateCustomerAddress: { __typename: 'Address' } };

export type CreateCustomerAddressMutationVariables = Exact<{
  input: CreateAddressInput;
}>;


export type CreateCustomerAddressMutation = { __typename?: 'Mutation', createCustomerAddress: { __typename: 'Address' } };

export type DeleteCustomerAddressMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteCustomerAddressMutation = { __typename?: 'Mutation', deleteCustomerAddress: { __typename?: 'Success', success: boolean } };

export type UpdateCustomerPasswordMutationVariables = Exact<{
  currentPassword: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type UpdateCustomerPasswordMutation = { __typename?: 'Mutation', updateCustomerPassword: { __typename: 'InvalidCredentialsError', errorCode: ErrorCode, message: string } | { __typename: 'NativeAuthStrategyError', errorCode: ErrorCode, message: string } | { __typename: 'PasswordValidationError', errorCode: ErrorCode, message: string } | { __typename: 'Success', success: boolean } };

export type RequestPasswordResetMutationVariables = Exact<{
  emailAddress: Scalars['String'];
}>;


export type RequestPasswordResetMutation = { __typename?: 'Mutation', requestPasswordReset?: { __typename: 'NativeAuthStrategyError', errorCode: ErrorCode, message: string } | { __typename: 'Success', success: boolean } | null };

export type ResetPasswordMutationVariables = Exact<{
  token: Scalars['String'];
  password: Scalars['String'];
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: { __typename: 'CurrentUser', identifier: string } | { __typename: 'NativeAuthStrategyError', errorCode: ErrorCode, message: string } | { __typename: 'NotVerifiedError', errorCode: ErrorCode, message: string } | { __typename: 'PasswordResetTokenExpiredError', errorCode: ErrorCode, message: string } | { __typename: 'PasswordResetTokenInvalidError', errorCode: ErrorCode, message: string } | { __typename: 'PasswordValidationError', errorCode: ErrorCode, message: string } };

export type AuthenticateMutationVariables = Exact<{
  input: AuthenticationInput;
}>;


export type AuthenticateMutation = { __typename?: 'Mutation', authenticate: { __typename: 'CurrentUser', id: string, identifier: string } | { __typename: 'InvalidCredentialsError', message: string } | { __typename: 'NotVerifiedError', message: string } };

export type ActiveChannelQueryVariables = Exact<{ [key: string]: never; }>;


export type ActiveChannelQuery = { __typename?: 'Query', activeChannel: { __typename?: 'Channel', id: string, currencyCode: CurrencyCode, customFields?: { __typename?: 'ChannelCustomFields', heroSection?: Array<{ __typename?: 'ChannelHeroSectionStruct', buttonLabel?: string | null, buttonUrl?: string | null, heading?: string | null, imageUrl?: string | null, subtext?: string | null, tagline?: string | null }> | null } | null } };

export type GetBannerQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBannerQuery = { __typename?: 'Query', heroSectionBanners: Array<{ __typename?: 'Banner', id: string, title: string, description: string, ctaLink: string, ctaText: string, image: { __typename?: 'Asset', mimeType: string, preview: string, source: string } }> };

export type NewsletterMutationVariables = Exact<{
  input: SubscribeToNewsletterInput;
}>;


export type NewsletterMutation = { __typename?: 'Mutation', subscribeToNewsletter: { __typename: 'SubscribeToNewsletterResult', created: boolean, success: boolean } };

export type UnSubscribeNewsLetterMutationVariables = Exact<{
  input: UnsubscribeFromNewsletterInput;
}>;


export type UnSubscribeNewsLetterMutation = { __typename?: 'Mutation', unsubscribeFromNewsletter: { __typename?: 'UnsubscribeFromNewsletterResult', success: boolean, removed: boolean } };

export type GetSocialLinksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSocialLinksQuery = { __typename?: 'Query', activeChannel: { __typename?: 'Channel', id: string, customFields?: { __typename?: 'ChannelCustomFields', socialLinks?: { __typename?: 'ChannelSocialLinksStruct', facebook?: string | null, instagram?: string | null, linkedin?: string | null, tiktok?: string | null, twitter?: string | null, whatsapp?: string | null, youtube?: string | null } | null } | null } };

export type ContactMutationVariables = Exact<{
  input: CreateContactInput;
}>;


export type ContactMutation = { __typename?: 'Mutation', createContact: { __typename?: 'Contact', name: string, phone: string, emailAddress: string, subject: string, message: string } };

export type EligibleShippingMethodsQueryVariables = Exact<{ [key: string]: never; }>;


export type EligibleShippingMethodsQuery = { __typename?: 'Query', eligibleShippingMethods: Array<{ __typename?: 'ShippingMethodQuote', id: string, name: string, description: string, metadata?: any | null, price: number, priceWithTax: number }> };

export type EligiblePaymentMethodsQueryVariables = Exact<{ [key: string]: never; }>;


export type EligiblePaymentMethodsQuery = { __typename?: 'Query', eligiblePaymentMethods: Array<{ __typename?: 'PaymentMethodQuote', id: string, code: string, name: string, description: string, eligibilityMessage?: string | null, isEligible: boolean }> };

export type NextOrderStatesQueryVariables = Exact<{ [key: string]: never; }>;


export type NextOrderStatesQuery = { __typename?: 'Query', nextOrderStates: Array<string> };

export type AvailableCountriesQueryVariables = Exact<{ [key: string]: never; }>;


export type AvailableCountriesQuery = { __typename?: 'Query', availableCountries: Array<{ __typename?: 'Country', id: string, name: string, code: string }> };

export type AddPaymentToOrderMutationVariables = Exact<{
  input: PaymentInput;
}>;


export type AddPaymentToOrderMutation = { __typename?: 'Mutation', addPaymentToOrder: { __typename?: 'IneligiblePaymentMethodError', errorCode: ErrorCode, message: string } | { __typename?: 'NoActiveOrderError', errorCode: ErrorCode, message: string } | { __typename: 'Order', id: string, code: string, active: boolean, createdAt: any, state: string, currencyCode: CurrencyCode, totalQuantity: number, subTotal: number, subTotalWithTax: number, couponCodes: Array<string>, shippingWithTax: number, totalWithTax: number, discounts: Array<{ __typename?: 'Discount', description: string, amountWithTax: number }>, surcharges: Array<{ __typename?: 'Surcharge', id: string, description: string, priceWithTax: number }>, taxSummary: Array<{ __typename?: 'OrderTaxSummary', description: string, taxRate: number, taxTotal: number }>, customer?: { __typename?: 'Customer', id: string, firstName: string, lastName: string, emailAddress: string } | null, shippingAddress?: { __typename?: 'OrderAddress', fullName?: string | null, streetLine1?: string | null, streetLine2?: string | null, company?: string | null, city?: string | null, province?: string | null, postalCode?: string | null, countryCode?: string | null, phoneNumber?: string | null } | null, shippingLines: Array<{ __typename?: 'ShippingLine', priceWithTax: number, shippingMethod: { __typename?: 'ShippingMethod', id: string, name: string } }>, lines: Array<{ __typename?: 'OrderLine', id: string, unitPriceWithTax: number, linePriceWithTax: number, quantity: number, featuredAsset?: { __typename?: 'Asset', id: string, preview: string } | null, productVariant: { __typename?: 'ProductVariant', id: string, name: string, price: number, customFields?: { __typename?: 'ProductVariantCustomFields', audPrice?: number | null, nprPrice?: number | null, usdPrice?: number | null } | null, product: { __typename?: 'Product', id: string, slug: string } } }>, payments?: Array<{ __typename?: 'Payment', id: string, state: string, method: string, amount: number, metadata?: any | null }> | null, billingAddress?: { __typename?: 'OrderAddress', fullName?: string | null, streetLine1?: string | null, streetLine2?: string | null, company?: string | null, city?: string | null, province?: string | null, postalCode?: string | null, countryCode?: string | null, phoneNumber?: string | null } | null, customFields?: { __typename?: 'OrderCustomFields', estimatedDeliveryDate?: any | null, pickupTime?: string | null } | null } | { __typename?: 'OrderPaymentStateError', errorCode: ErrorCode, message: string } | { __typename?: 'OrderStateTransitionError', errorCode: ErrorCode, message: string } | { __typename?: 'PaymentDeclinedError', errorCode: ErrorCode, message: string } | { __typename?: 'PaymentFailedError', errorCode: ErrorCode, message: string } };

export type TransitionOrderToStateMutationVariables = Exact<{
  state: Scalars['String'];
}>;


export type TransitionOrderToStateMutation = { __typename?: 'Mutation', transitionOrderToState?: { __typename: 'Order', id: string, code: string, active: boolean, createdAt: any, state: string, currencyCode: CurrencyCode, totalQuantity: number, subTotal: number, subTotalWithTax: number, couponCodes: Array<string>, shippingWithTax: number, totalWithTax: number, discounts: Array<{ __typename?: 'Discount', description: string, amountWithTax: number }>, surcharges: Array<{ __typename?: 'Surcharge', id: string, description: string, priceWithTax: number }>, taxSummary: Array<{ __typename?: 'OrderTaxSummary', description: string, taxRate: number, taxTotal: number }>, customer?: { __typename?: 'Customer', id: string, firstName: string, lastName: string, emailAddress: string } | null, shippingAddress?: { __typename?: 'OrderAddress', fullName?: string | null, streetLine1?: string | null, streetLine2?: string | null, company?: string | null, city?: string | null, province?: string | null, postalCode?: string | null, countryCode?: string | null, phoneNumber?: string | null } | null, shippingLines: Array<{ __typename?: 'ShippingLine', priceWithTax: number, shippingMethod: { __typename?: 'ShippingMethod', id: string, name: string } }>, lines: Array<{ __typename?: 'OrderLine', id: string, unitPriceWithTax: number, linePriceWithTax: number, quantity: number, featuredAsset?: { __typename?: 'Asset', id: string, preview: string } | null, productVariant: { __typename?: 'ProductVariant', id: string, name: string, price: number, customFields?: { __typename?: 'ProductVariantCustomFields', audPrice?: number | null, nprPrice?: number | null, usdPrice?: number | null } | null, product: { __typename?: 'Product', id: string, slug: string } } }>, payments?: Array<{ __typename?: 'Payment', id: string, state: string, method: string, amount: number, metadata?: any | null }> | null, billingAddress?: { __typename?: 'OrderAddress', fullName?: string | null, streetLine1?: string | null, streetLine2?: string | null, company?: string | null, city?: string | null, province?: string | null, postalCode?: string | null, countryCode?: string | null, phoneNumber?: string | null } | null, customFields?: { __typename?: 'OrderCustomFields', estimatedDeliveryDate?: any | null, pickupTime?: string | null } | null } | { __typename?: 'OrderStateTransitionError', errorCode: ErrorCode, message: string } | null };

export type CreateStripePaymentIntentMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateStripePaymentIntentMutation = { __typename?: 'Mutation', createStripePaymentIntent: string };

export type GenerateBraintreeClientTokenQueryVariables = Exact<{ [key: string]: never; }>;


export type GenerateBraintreeClientTokenQuery = { __typename?: 'Query', generateBraintreeClientToken?: string | null };

export type AddQrPaymentProofMutationVariables = Exact<{
  assetId: Scalars['ID'];
  orderCode: Scalars['String'];
}>;


export type AddQrPaymentProofMutation = { __typename?: 'Mutation', addQrPaymentProof: { __typename?: 'AddQrPaymentProofResponse', success: boolean, message: string } };

export type CollectionsQueryVariables = Exact<{
  options?: InputMaybe<CollectionListOptions>;
}>;


export type CollectionsQuery = { __typename?: 'Query', collections: { __typename?: 'CollectionList', items: Array<{ __typename?: 'Collection', id: string, name: string, slug: string, parent?: { __typename?: 'Collection', name: string } | null, featuredAsset?: { __typename?: 'Asset', id: string, preview: string } | null, children?: Array<{ __typename?: 'Collection', name: string, id: string, slug: string, customFields?: { __typename?: 'CollectionCustomFields', showInNavBar?: boolean | null } | null, children?: Array<{ __typename?: 'Collection', name: string, id: string, slug: string, customFields?: { __typename?: 'CollectionCustomFields', showInNavBar?: boolean | null } | null }> | null }> | null }> } };

export type CollectionQueryVariables = Exact<{
  slug?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
}>;


export type CollectionQuery = { __typename?: 'Query', collection?: { __typename?: 'Collection', id: string, name: string, slug: string, breadcrumbs: Array<{ __typename?: 'CollectionBreadcrumb', id: string, name: string, slug: string }>, children?: Array<{ __typename?: 'Collection', id: string, name: string, slug: string, featuredAsset?: { __typename?: 'Asset', id: string, preview: string } | null }> | null } | null };

export type ActiveCustomerQueryVariables = Exact<{ [key: string]: never; }>;


export type ActiveCustomerQuery = { __typename?: 'Query', activeCustomer?: { __typename?: 'Customer', id: string, firstName: string, lastName: string, availableLoyaltyPoints: number, emailAddress: string, customFields?: { __typename?: 'CustomerCustomFields', avatarUrl?: { __typename?: 'Asset', preview: string } | null } | null } | null };

export type ActiveCustomerDetailsQueryVariables = Exact<{ [key: string]: never; }>;


export type ActiveCustomerDetailsQuery = { __typename?: 'Query', activeCustomer?: { __typename?: 'Customer', id: string, title?: string | null, firstName: string, lastName: string, phoneNumber?: string | null, emailAddress: string, customFields?: { __typename?: 'CustomerCustomFields', avatarUrl?: { __typename?: 'Asset', preview: string } | null } | null } | null };

export type ActiveCustomerAddressesQueryVariables = Exact<{ [key: string]: never; }>;


export type ActiveCustomerAddressesQuery = { __typename?: 'Query', activeCustomer?: { __typename?: 'Customer', id: string, addresses?: Array<{ __typename?: 'Address', id: string, company?: string | null, fullName?: string | null, streetLine1: string, streetLine2?: string | null, city?: string | null, province?: string | null, postalCode?: string | null, phoneNumber?: string | null, defaultShippingAddress?: boolean | null, defaultBillingAddress?: boolean | null, country: { __typename?: 'Country', id: string, code: string, name: string } }> | null } | null };

export type ActiveCustomerOrderListQueryVariables = Exact<{
  orderListOptions?: InputMaybe<OrderListOptions>;
}>;


export type ActiveCustomerOrderListQuery = { __typename?: 'Query', activeCustomer?: { __typename?: 'Customer', orders: { __typename?: 'OrderList', totalItems: number, items: Array<{ __typename?: 'Order', code: string, state: string, orderPlacedAt?: any | null, currencyCode: CurrencyCode, subTotal: number, subTotalWithTax: number, total: number, totalWithTax: number, shippingWithTax: number, shippingLines: Array<{ __typename?: 'ShippingLine', priceWithTax: number }>, taxSummary: Array<{ __typename?: 'OrderTaxSummary', taxBase: number, taxTotal: number }>, discounts: Array<{ __typename?: 'Discount', amountWithTax: number }>, fulfillments?: Array<{ __typename?: 'Fulfillment', trackingCode?: string | null }> | null, lines: Array<{ __typename?: 'OrderLine', id: string, unitPriceWithTax: number, linePriceWithTax: number, quantity: number, discountedLinePriceWithTax: number, discountedUnitPriceWithTax: number, fulfillmentLines?: Array<{ __typename?: 'FulfillmentLine', quantity: number, fulfillment: { __typename?: 'Fulfillment', state: string, updatedAt: any } }> | null, featuredAsset?: { __typename?: 'Asset', name: string, source: string, preview: string } | null, productVariant: { __typename?: 'ProductVariant', name: string, sku: string, currencyCode: CurrencyCode, priceWithTax: number, product: { __typename?: 'Product', slug: string } } }>, billingAddress?: { __typename?: 'OrderAddress', fullName?: string | null, streetLine1?: string | null, streetLine2?: string | null, company?: string | null, city?: string | null, province?: string | null, postalCode?: string | null, countryCode?: string | null, phoneNumber?: string | null } | null, shippingAddress?: { __typename?: 'OrderAddress', fullName?: string | null, streetLine1?: string | null, streetLine2?: string | null, company?: string | null, city?: string | null, province?: string | null, postalCode?: string | null, countryCode?: string | null, phoneNumber?: string | null } | null, customer?: { __typename?: 'Customer', id: string, firstName: string, lastName: string, emailAddress: string } | null, customFields?: { __typename?: 'OrderCustomFields', estimatedDeliveryDate?: any | null } | null }> } } | null };

export type FacetsQueryVariables = Exact<{
  options?: InputMaybe<FacetListOptions>;
}>;


export type FacetsQuery = { __typename?: 'Query', facets: { __typename?: 'FacetList', items: Array<{ __typename?: 'Facet', id: string, name: string, code: string, values: Array<{ __typename?: 'FacetValue', id: string, name: string, code: string }> }> } };

export type SetCustomerForOrderMutationVariables = Exact<{
  input: CreateCustomerInput;
}>;


export type SetCustomerForOrderMutation = { __typename?: 'Mutation', setCustomerForOrder: { __typename?: 'AlreadyLoggedInError', errorCode: ErrorCode, message: string } | { __typename?: 'EmailAddressConflictError', errorCode: ErrorCode, message: string } | { __typename?: 'GuestCheckoutError', errorCode: ErrorCode, message: string } | { __typename?: 'NoActiveOrderError', errorCode: ErrorCode, message: string } | { __typename: 'Order', id: string, code: string, active: boolean, createdAt: any, state: string, currencyCode: CurrencyCode, totalQuantity: number, subTotal: number, subTotalWithTax: number, couponCodes: Array<string>, shippingWithTax: number, totalWithTax: number, discounts: Array<{ __typename?: 'Discount', description: string, amountWithTax: number }>, surcharges: Array<{ __typename?: 'Surcharge', id: string, description: string, priceWithTax: number }>, taxSummary: Array<{ __typename?: 'OrderTaxSummary', description: string, taxRate: number, taxTotal: number }>, customer?: { __typename?: 'Customer', id: string, firstName: string, lastName: string, emailAddress: string } | null, shippingAddress?: { __typename?: 'OrderAddress', fullName?: string | null, streetLine1?: string | null, streetLine2?: string | null, company?: string | null, city?: string | null, province?: string | null, postalCode?: string | null, countryCode?: string | null, phoneNumber?: string | null } | null, shippingLines: Array<{ __typename?: 'ShippingLine', priceWithTax: number, shippingMethod: { __typename?: 'ShippingMethod', id: string, name: string } }>, lines: Array<{ __typename?: 'OrderLine', id: string, unitPriceWithTax: number, linePriceWithTax: number, quantity: number, featuredAsset?: { __typename?: 'Asset', id: string, preview: string } | null, productVariant: { __typename?: 'ProductVariant', id: string, name: string, price: number, customFields?: { __typename?: 'ProductVariantCustomFields', audPrice?: number | null, nprPrice?: number | null, usdPrice?: number | null } | null, product: { __typename?: 'Product', id: string, slug: string } } }>, payments?: Array<{ __typename?: 'Payment', id: string, state: string, method: string, amount: number, metadata?: any | null }> | null, billingAddress?: { __typename?: 'OrderAddress', fullName?: string | null, streetLine1?: string | null, streetLine2?: string | null, company?: string | null, city?: string | null, province?: string | null, postalCode?: string | null, countryCode?: string | null, phoneNumber?: string | null } | null, customFields?: { __typename?: 'OrderCustomFields', estimatedDeliveryDate?: any | null, pickupTime?: string | null } | null } };

export type SetOrderShippingAddressMutationVariables = Exact<{
  input: CreateAddressInput;
}>;


export type SetOrderShippingAddressMutation = { __typename?: 'Mutation', setOrderShippingAddress: { __typename?: 'NoActiveOrderError', errorCode: ErrorCode, message: string } | { __typename: 'Order', id: string, code: string, active: boolean, createdAt: any, state: string, currencyCode: CurrencyCode, totalQuantity: number, subTotal: number, subTotalWithTax: number, couponCodes: Array<string>, shippingWithTax: number, totalWithTax: number, discounts: Array<{ __typename?: 'Discount', description: string, amountWithTax: number }>, surcharges: Array<{ __typename?: 'Surcharge', id: string, description: string, priceWithTax: number }>, taxSummary: Array<{ __typename?: 'OrderTaxSummary', description: string, taxRate: number, taxTotal: number }>, customer?: { __typename?: 'Customer', id: string, firstName: string, lastName: string, emailAddress: string } | null, shippingAddress?: { __typename?: 'OrderAddress', fullName?: string | null, streetLine1?: string | null, streetLine2?: string | null, company?: string | null, city?: string | null, province?: string | null, postalCode?: string | null, countryCode?: string | null, phoneNumber?: string | null } | null, shippingLines: Array<{ __typename?: 'ShippingLine', priceWithTax: number, shippingMethod: { __typename?: 'ShippingMethod', id: string, name: string } }>, lines: Array<{ __typename?: 'OrderLine', id: string, unitPriceWithTax: number, linePriceWithTax: number, quantity: number, featuredAsset?: { __typename?: 'Asset', id: string, preview: string } | null, productVariant: { __typename?: 'ProductVariant', id: string, name: string, price: number, customFields?: { __typename?: 'ProductVariantCustomFields', audPrice?: number | null, nprPrice?: number | null, usdPrice?: number | null } | null, product: { __typename?: 'Product', id: string, slug: string } } }>, payments?: Array<{ __typename?: 'Payment', id: string, state: string, method: string, amount: number, metadata?: any | null }> | null, billingAddress?: { __typename?: 'OrderAddress', fullName?: string | null, streetLine1?: string | null, streetLine2?: string | null, company?: string | null, city?: string | null, province?: string | null, postalCode?: string | null, countryCode?: string | null, phoneNumber?: string | null } | null, customFields?: { __typename?: 'OrderCustomFields', estimatedDeliveryDate?: any | null, pickupTime?: string | null } | null } };

export type SetOrderShippingMethodMutationVariables = Exact<{
  shippingMethodId: Array<Scalars['ID']> | Scalars['ID'];
}>;


export type SetOrderShippingMethodMutation = { __typename?: 'Mutation', setOrderShippingMethod: { __typename?: 'IneligibleShippingMethodError', errorCode: ErrorCode, message: string } | { __typename?: 'NoActiveOrderError', errorCode: ErrorCode, message: string } | { __typename: 'Order', id: string, code: string, active: boolean, createdAt: any, state: string, currencyCode: CurrencyCode, totalQuantity: number, subTotal: number, subTotalWithTax: number, couponCodes: Array<string>, shippingWithTax: number, totalWithTax: number, discounts: Array<{ __typename?: 'Discount', description: string, amountWithTax: number }>, surcharges: Array<{ __typename?: 'Surcharge', id: string, description: string, priceWithTax: number }>, taxSummary: Array<{ __typename?: 'OrderTaxSummary', description: string, taxRate: number, taxTotal: number }>, customer?: { __typename?: 'Customer', id: string, firstName: string, lastName: string, emailAddress: string } | null, shippingAddress?: { __typename?: 'OrderAddress', fullName?: string | null, streetLine1?: string | null, streetLine2?: string | null, company?: string | null, city?: string | null, province?: string | null, postalCode?: string | null, countryCode?: string | null, phoneNumber?: string | null } | null, shippingLines: Array<{ __typename?: 'ShippingLine', priceWithTax: number, shippingMethod: { __typename?: 'ShippingMethod', id: string, name: string } }>, lines: Array<{ __typename?: 'OrderLine', id: string, unitPriceWithTax: number, linePriceWithTax: number, quantity: number, featuredAsset?: { __typename?: 'Asset', id: string, preview: string } | null, productVariant: { __typename?: 'ProductVariant', id: string, name: string, price: number, customFields?: { __typename?: 'ProductVariantCustomFields', audPrice?: number | null, nprPrice?: number | null, usdPrice?: number | null } | null, product: { __typename?: 'Product', id: string, slug: string } } }>, payments?: Array<{ __typename?: 'Payment', id: string, state: string, method: string, amount: number, metadata?: any | null }> | null, billingAddress?: { __typename?: 'OrderAddress', fullName?: string | null, streetLine1?: string | null, streetLine2?: string | null, company?: string | null, city?: string | null, province?: string | null, postalCode?: string | null, countryCode?: string | null, phoneNumber?: string | null } | null, customFields?: { __typename?: 'OrderCustomFields', estimatedDeliveryDate?: any | null, pickupTime?: string | null } | null } | { __typename?: 'OrderModificationError', errorCode: ErrorCode, message: string } };

export type SetOrderBillingAddressMutationVariables = Exact<{
  input: CreateAddressInput;
}>;


export type SetOrderBillingAddressMutation = { __typename?: 'Mutation', setOrderBillingAddress: { __typename?: 'NoActiveOrderError', errorCode: ErrorCode, message: string } | { __typename: 'Order', id: string, code: string, active: boolean, createdAt: any, state: string, currencyCode: CurrencyCode, totalQuantity: number, subTotal: number, subTotalWithTax: number, couponCodes: Array<string>, shippingWithTax: number, totalWithTax: number, discounts: Array<{ __typename?: 'Discount', description: string, amountWithTax: number }>, surcharges: Array<{ __typename?: 'Surcharge', id: string, description: string, priceWithTax: number }>, taxSummary: Array<{ __typename?: 'OrderTaxSummary', description: string, taxRate: number, taxTotal: number }>, customer?: { __typename?: 'Customer', id: string, firstName: string, lastName: string, emailAddress: string } | null, shippingAddress?: { __typename?: 'OrderAddress', fullName?: string | null, streetLine1?: string | null, streetLine2?: string | null, company?: string | null, city?: string | null, province?: string | null, postalCode?: string | null, countryCode?: string | null, phoneNumber?: string | null } | null, shippingLines: Array<{ __typename?: 'ShippingLine', priceWithTax: number, shippingMethod: { __typename?: 'ShippingMethod', id: string, name: string } }>, lines: Array<{ __typename?: 'OrderLine', id: string, unitPriceWithTax: number, linePriceWithTax: number, quantity: number, featuredAsset?: { __typename?: 'Asset', id: string, preview: string } | null, productVariant: { __typename?: 'ProductVariant', id: string, name: string, price: number, customFields?: { __typename?: 'ProductVariantCustomFields', audPrice?: number | null, nprPrice?: number | null, usdPrice?: number | null } | null, product: { __typename?: 'Product', id: string, slug: string } } }>, payments?: Array<{ __typename?: 'Payment', id: string, state: string, method: string, amount: number, metadata?: any | null }> | null, billingAddress?: { __typename?: 'OrderAddress', fullName?: string | null, streetLine1?: string | null, streetLine2?: string | null, company?: string | null, city?: string | null, province?: string | null, postalCode?: string | null, countryCode?: string | null, phoneNumber?: string | null } | null, customFields?: { __typename?: 'OrderCustomFields', estimatedDeliveryDate?: any | null, pickupTime?: string | null } | null } };

export type AddItemToOrderMutationVariables = Exact<{
  productVariantId: Scalars['ID'];
  quantity: Scalars['Int'];
}>;


export type AddItemToOrderMutation = { __typename?: 'Mutation', addItemToOrder: { __typename?: 'InsufficientStockError', errorCode: ErrorCode, message: string } | { __typename?: 'NegativeQuantityError', errorCode: ErrorCode, message: string } | { __typename: 'Order', id: string, code: string, active: boolean, createdAt: any, state: string, currencyCode: CurrencyCode, totalQuantity: number, subTotal: number, subTotalWithTax: number, couponCodes: Array<string>, shippingWithTax: number, totalWithTax: number, discounts: Array<{ __typename?: 'Discount', description: string, amountWithTax: number }>, surcharges: Array<{ __typename?: 'Surcharge', id: string, description: string, priceWithTax: number }>, taxSummary: Array<{ __typename?: 'OrderTaxSummary', description: string, taxRate: number, taxTotal: number }>, customer?: { __typename?: 'Customer', id: string, firstName: string, lastName: string, emailAddress: string } | null, shippingAddress?: { __typename?: 'OrderAddress', fullName?: string | null, streetLine1?: string | null, streetLine2?: string | null, company?: string | null, city?: string | null, province?: string | null, postalCode?: string | null, countryCode?: string | null, phoneNumber?: string | null } | null, shippingLines: Array<{ __typename?: 'ShippingLine', priceWithTax: number, shippingMethod: { __typename?: 'ShippingMethod', id: string, name: string } }>, lines: Array<{ __typename?: 'OrderLine', id: string, unitPriceWithTax: number, linePriceWithTax: number, quantity: number, featuredAsset?: { __typename?: 'Asset', id: string, preview: string } | null, productVariant: { __typename?: 'ProductVariant', id: string, name: string, price: number, customFields?: { __typename?: 'ProductVariantCustomFields', audPrice?: number | null, nprPrice?: number | null, usdPrice?: number | null } | null, product: { __typename?: 'Product', id: string, slug: string } } }>, payments?: Array<{ __typename?: 'Payment', id: string, state: string, method: string, amount: number, metadata?: any | null }> | null, billingAddress?: { __typename?: 'OrderAddress', fullName?: string | null, streetLine1?: string | null, streetLine2?: string | null, company?: string | null, city?: string | null, province?: string | null, postalCode?: string | null, countryCode?: string | null, phoneNumber?: string | null } | null, customFields?: { __typename?: 'OrderCustomFields', estimatedDeliveryDate?: any | null, pickupTime?: string | null } | null } | { __typename?: 'OrderInterceptorError', errorCode: ErrorCode, message: string } | { __typename?: 'OrderLimitError', errorCode: ErrorCode, message: string } | { __typename?: 'OrderModificationError', errorCode: ErrorCode, message: string } };

export type RemoveOrderLineMutationVariables = Exact<{
  orderLineId: Scalars['ID'];
}>;


export type RemoveOrderLineMutation = { __typename?: 'Mutation', removeOrderLine: { __typename: 'Order', id: string, code: string, active: boolean, createdAt: any, state: string, currencyCode: CurrencyCode, totalQuantity: number, subTotal: number, subTotalWithTax: number, couponCodes: Array<string>, shippingWithTax: number, totalWithTax: number, discounts: Array<{ __typename?: 'Discount', description: string, amountWithTax: number }>, surcharges: Array<{ __typename?: 'Surcharge', id: string, description: string, priceWithTax: number }>, taxSummary: Array<{ __typename?: 'OrderTaxSummary', description: string, taxRate: number, taxTotal: number }>, customer?: { __typename?: 'Customer', id: string, firstName: string, lastName: string, emailAddress: string } | null, shippingAddress?: { __typename?: 'OrderAddress', fullName?: string | null, streetLine1?: string | null, streetLine2?: string | null, company?: string | null, city?: string | null, province?: string | null, postalCode?: string | null, countryCode?: string | null, phoneNumber?: string | null } | null, shippingLines: Array<{ __typename?: 'ShippingLine', priceWithTax: number, shippingMethod: { __typename?: 'ShippingMethod', id: string, name: string } }>, lines: Array<{ __typename?: 'OrderLine', id: string, unitPriceWithTax: number, linePriceWithTax: number, quantity: number, featuredAsset?: { __typename?: 'Asset', id: string, preview: string } | null, productVariant: { __typename?: 'ProductVariant', id: string, name: string, price: number, customFields?: { __typename?: 'ProductVariantCustomFields', audPrice?: number | null, nprPrice?: number | null, usdPrice?: number | null } | null, product: { __typename?: 'Product', id: string, slug: string } } }>, payments?: Array<{ __typename?: 'Payment', id: string, state: string, method: string, amount: number, metadata?: any | null }> | null, billingAddress?: { __typename?: 'OrderAddress', fullName?: string | null, streetLine1?: string | null, streetLine2?: string | null, company?: string | null, city?: string | null, province?: string | null, postalCode?: string | null, countryCode?: string | null, phoneNumber?: string | null } | null, customFields?: { __typename?: 'OrderCustomFields', estimatedDeliveryDate?: any | null, pickupTime?: string | null } | null } | { __typename?: 'OrderInterceptorError', errorCode: ErrorCode, message: string } | { __typename?: 'OrderModificationError', errorCode: ErrorCode, message: string } };

export type AdjustOrderLineMutationVariables = Exact<{
  orderLineId: Scalars['ID'];
  quantity: Scalars['Int'];
}>;


export type AdjustOrderLineMutation = { __typename?: 'Mutation', adjustOrderLine: { __typename?: 'InsufficientStockError', errorCode: ErrorCode, message: string } | { __typename?: 'NegativeQuantityError', errorCode: ErrorCode, message: string } | { __typename: 'Order', id: string, code: string, active: boolean, createdAt: any, state: string, currencyCode: CurrencyCode, totalQuantity: number, subTotal: number, subTotalWithTax: number, couponCodes: Array<string>, shippingWithTax: number, totalWithTax: number, discounts: Array<{ __typename?: 'Discount', description: string, amountWithTax: number }>, surcharges: Array<{ __typename?: 'Surcharge', id: string, description: string, priceWithTax: number }>, taxSummary: Array<{ __typename?: 'OrderTaxSummary', description: string, taxRate: number, taxTotal: number }>, customer?: { __typename?: 'Customer', id: string, firstName: string, lastName: string, emailAddress: string } | null, shippingAddress?: { __typename?: 'OrderAddress', fullName?: string | null, streetLine1?: string | null, streetLine2?: string | null, company?: string | null, city?: string | null, province?: string | null, postalCode?: string | null, countryCode?: string | null, phoneNumber?: string | null } | null, shippingLines: Array<{ __typename?: 'ShippingLine', priceWithTax: number, shippingMethod: { __typename?: 'ShippingMethod', id: string, name: string } }>, lines: Array<{ __typename?: 'OrderLine', id: string, unitPriceWithTax: number, linePriceWithTax: number, quantity: number, featuredAsset?: { __typename?: 'Asset', id: string, preview: string } | null, productVariant: { __typename?: 'ProductVariant', id: string, name: string, price: number, customFields?: { __typename?: 'ProductVariantCustomFields', audPrice?: number | null, nprPrice?: number | null, usdPrice?: number | null } | null, product: { __typename?: 'Product', id: string, slug: string } } }>, payments?: Array<{ __typename?: 'Payment', id: string, state: string, method: string, amount: number, metadata?: any | null }> | null, billingAddress?: { __typename?: 'OrderAddress', fullName?: string | null, streetLine1?: string | null, streetLine2?: string | null, company?: string | null, city?: string | null, province?: string | null, postalCode?: string | null, countryCode?: string | null, phoneNumber?: string | null } | null, customFields?: { __typename?: 'OrderCustomFields', estimatedDeliveryDate?: any | null, pickupTime?: string | null } | null } | { __typename?: 'OrderInterceptorError', errorCode: ErrorCode, message: string } | { __typename?: 'OrderLimitError', errorCode: ErrorCode, message: string } | { __typename?: 'OrderModificationError', errorCode: ErrorCode, message: string } };

export type OrderDetailFragment = { __typename: 'Order', id: string, code: string, active: boolean, createdAt: any, state: string, currencyCode: CurrencyCode, totalQuantity: number, subTotal: number, subTotalWithTax: number, couponCodes: Array<string>, shippingWithTax: number, totalWithTax: number, discounts: Array<{ __typename?: 'Discount', description: string, amountWithTax: number }>, surcharges: Array<{ __typename?: 'Surcharge', id: string, description: string, priceWithTax: number }>, taxSummary: Array<{ __typename?: 'OrderTaxSummary', description: string, taxRate: number, taxTotal: number }>, customer?: { __typename?: 'Customer', id: string, firstName: string, lastName: string, emailAddress: string } | null, shippingAddress?: { __typename?: 'OrderAddress', fullName?: string | null, streetLine1?: string | null, streetLine2?: string | null, company?: string | null, city?: string | null, province?: string | null, postalCode?: string | null, countryCode?: string | null, phoneNumber?: string | null } | null, shippingLines: Array<{ __typename?: 'ShippingLine', priceWithTax: number, shippingMethod: { __typename?: 'ShippingMethod', id: string, name: string } }>, lines: Array<{ __typename?: 'OrderLine', id: string, unitPriceWithTax: number, linePriceWithTax: number, quantity: number, featuredAsset?: { __typename?: 'Asset', id: string, preview: string } | null, productVariant: { __typename?: 'ProductVariant', id: string, name: string, price: number, customFields?: { __typename?: 'ProductVariantCustomFields', audPrice?: number | null, nprPrice?: number | null, usdPrice?: number | null } | null, product: { __typename?: 'Product', id: string, slug: string } } }>, payments?: Array<{ __typename?: 'Payment', id: string, state: string, method: string, amount: number, metadata?: any | null }> | null, billingAddress?: { __typename?: 'OrderAddress', fullName?: string | null, streetLine1?: string | null, streetLine2?: string | null, company?: string | null, city?: string | null, province?: string | null, postalCode?: string | null, countryCode?: string | null, phoneNumber?: string | null } | null, customFields?: { __typename?: 'OrderCustomFields', estimatedDeliveryDate?: any | null, pickupTime?: string | null } | null };

export type ActiveOrderQueryVariables = Exact<{ [key: string]: never; }>;


export type ActiveOrderQuery = { __typename?: 'Query', activeOrder?: { __typename: 'Order', id: string, code: string, active: boolean, createdAt: any, state: string, currencyCode: CurrencyCode, totalQuantity: number, subTotal: number, subTotalWithTax: number, couponCodes: Array<string>, shippingWithTax: number, totalWithTax: number, discounts: Array<{ __typename?: 'Discount', description: string, amountWithTax: number }>, surcharges: Array<{ __typename?: 'Surcharge', id: string, description: string, priceWithTax: number }>, taxSummary: Array<{ __typename?: 'OrderTaxSummary', description: string, taxRate: number, taxTotal: number }>, customer?: { __typename?: 'Customer', id: string, firstName: string, lastName: string, emailAddress: string } | null, shippingAddress?: { __typename?: 'OrderAddress', fullName?: string | null, streetLine1?: string | null, streetLine2?: string | null, company?: string | null, city?: string | null, province?: string | null, postalCode?: string | null, countryCode?: string | null, phoneNumber?: string | null } | null, shippingLines: Array<{ __typename?: 'ShippingLine', priceWithTax: number, shippingMethod: { __typename?: 'ShippingMethod', id: string, name: string } }>, lines: Array<{ __typename?: 'OrderLine', id: string, unitPriceWithTax: number, linePriceWithTax: number, quantity: number, featuredAsset?: { __typename?: 'Asset', id: string, preview: string } | null, productVariant: { __typename?: 'ProductVariant', id: string, name: string, price: number, customFields?: { __typename?: 'ProductVariantCustomFields', audPrice?: number | null, nprPrice?: number | null, usdPrice?: number | null } | null, product: { __typename?: 'Product', id: string, slug: string } } }>, payments?: Array<{ __typename?: 'Payment', id: string, state: string, method: string, amount: number, metadata?: any | null }> | null, billingAddress?: { __typename?: 'OrderAddress', fullName?: string | null, streetLine1?: string | null, streetLine2?: string | null, company?: string | null, city?: string | null, province?: string | null, postalCode?: string | null, countryCode?: string | null, phoneNumber?: string | null } | null, customFields?: { __typename?: 'OrderCustomFields', estimatedDeliveryDate?: any | null, pickupTime?: string | null } | null } | null };

export type OrderByCodeQueryVariables = Exact<{
  code: Scalars['String'];
}>;


export type OrderByCodeQuery = { __typename?: 'Query', orderByCode?: { __typename: 'Order', orderPlacedAt?: any | null, id: string, code: string, active: boolean, createdAt: any, state: string, currencyCode: CurrencyCode, totalQuantity: number, subTotal: number, subTotalWithTax: number, couponCodes: Array<string>, shippingWithTax: number, totalWithTax: number, discounts: Array<{ __typename?: 'Discount', description: string, amountWithTax: number }>, surcharges: Array<{ __typename?: 'Surcharge', id: string, description: string, priceWithTax: number }>, taxSummary: Array<{ __typename?: 'OrderTaxSummary', description: string, taxRate: number, taxTotal: number }>, customer?: { __typename?: 'Customer', id: string, firstName: string, lastName: string, emailAddress: string } | null, shippingAddress?: { __typename?: 'OrderAddress', fullName?: string | null, streetLine1?: string | null, streetLine2?: string | null, company?: string | null, city?: string | null, province?: string | null, postalCode?: string | null, countryCode?: string | null, phoneNumber?: string | null } | null, shippingLines: Array<{ __typename?: 'ShippingLine', priceWithTax: number, shippingMethod: { __typename?: 'ShippingMethod', id: string, name: string } }>, lines: Array<{ __typename?: 'OrderLine', id: string, unitPriceWithTax: number, linePriceWithTax: number, quantity: number, featuredAsset?: { __typename?: 'Asset', id: string, preview: string } | null, productVariant: { __typename?: 'ProductVariant', id: string, name: string, price: number, customFields?: { __typename?: 'ProductVariantCustomFields', audPrice?: number | null, nprPrice?: number | null, usdPrice?: number | null } | null, product: { __typename?: 'Product', id: string, slug: string } } }>, payments?: Array<{ __typename?: 'Payment', id: string, state: string, method: string, amount: number, metadata?: any | null }> | null, billingAddress?: { __typename?: 'OrderAddress', fullName?: string | null, streetLine1?: string | null, streetLine2?: string | null, company?: string | null, city?: string | null, province?: string | null, postalCode?: string | null, countryCode?: string | null, phoneNumber?: string | null } | null, customFields?: { __typename?: 'OrderCustomFields', estimatedDeliveryDate?: any | null, pickupTime?: string | null } | null } | null };

export type ApplyCouponMutationVariables = Exact<{
  couponCode: Scalars['String'];
}>;


export type ApplyCouponMutation = { __typename?: 'Mutation', applyCouponCode: { __typename?: 'CouponCodeExpiredError', errorCode: ErrorCode, message: string } | { __typename?: 'CouponCodeInvalidError', errorCode: ErrorCode, message: string } | { __typename?: 'CouponCodeLimitError', errorCode: ErrorCode, message: string } | { __typename?: 'Order', id: string } };

export type RemoveCouponCodeMutationVariables = Exact<{
  couponCode: Scalars['String'];
}>;


export type RemoveCouponCodeMutation = { __typename?: 'Mutation', removeCouponCode?: { __typename: 'Order', id: string, code: string, active: boolean, createdAt: any, state: string, currencyCode: CurrencyCode, totalQuantity: number, subTotal: number, subTotalWithTax: number, couponCodes: Array<string>, shippingWithTax: number, totalWithTax: number, discounts: Array<{ __typename?: 'Discount', description: string, amountWithTax: number }>, surcharges: Array<{ __typename?: 'Surcharge', id: string, description: string, priceWithTax: number }>, taxSummary: Array<{ __typename?: 'OrderTaxSummary', description: string, taxRate: number, taxTotal: number }>, customer?: { __typename?: 'Customer', id: string, firstName: string, lastName: string, emailAddress: string } | null, shippingAddress?: { __typename?: 'OrderAddress', fullName?: string | null, streetLine1?: string | null, streetLine2?: string | null, company?: string | null, city?: string | null, province?: string | null, postalCode?: string | null, countryCode?: string | null, phoneNumber?: string | null } | null, shippingLines: Array<{ __typename?: 'ShippingLine', priceWithTax: number, shippingMethod: { __typename?: 'ShippingMethod', id: string, name: string } }>, lines: Array<{ __typename?: 'OrderLine', id: string, unitPriceWithTax: number, linePriceWithTax: number, quantity: number, featuredAsset?: { __typename?: 'Asset', id: string, preview: string } | null, productVariant: { __typename?: 'ProductVariant', id: string, name: string, price: number, customFields?: { __typename?: 'ProductVariantCustomFields', audPrice?: number | null, nprPrice?: number | null, usdPrice?: number | null } | null, product: { __typename?: 'Product', id: string, slug: string } } }>, payments?: Array<{ __typename?: 'Payment', id: string, state: string, method: string, amount: number, metadata?: any | null }> | null, billingAddress?: { __typename?: 'OrderAddress', fullName?: string | null, streetLine1?: string | null, streetLine2?: string | null, company?: string | null, city?: string | null, province?: string | null, postalCode?: string | null, countryCode?: string | null, phoneNumber?: string | null } | null, customFields?: { __typename?: 'OrderCustomFields', estimatedDeliveryDate?: any | null, pickupTime?: string | null } | null } | null };

export type GetLoaylityCouponCodesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLoaylityCouponCodesQuery = { __typename?: 'Query', loyaltyCouponCodes?: Array<string | null> | null };

export type TrackMyOrderQueryVariables = Exact<{
  orderCode: Scalars['String'];
  email: Scalars['String'];
}>;


export type TrackMyOrderQuery = { __typename?: 'Query', trackOrder?: { __typename?: 'Order', id: string, state: string, code: string, orderPlacedAt?: any | null, currencyCode: CurrencyCode, totalWithTax: number, subTotal: number, lines: Array<{ __typename?: 'OrderLine', id: string, quantity: number, unitPriceWithTax: number, linePriceWithTax: number, featuredAsset?: { __typename?: 'Asset', preview: string } | null, productVariant: { __typename?: 'ProductVariant', name: string, priceWithTax: number, product: { __typename?: 'Product', slug: string } } }>, customFields?: { __typename?: 'OrderCustomFields', estimatedDeliveryDate?: any | null } | null } | null };

export type SetPickUpDateTimeMutationVariables = Exact<{
  input: UpdateOrderInput;
}>;


export type SetPickUpDateTimeMutation = { __typename?: 'Mutation', setOrderCustomFields: { __typename: 'NoActiveOrderError', errorCode: ErrorCode, message: string } | { __typename: 'Order', id: string, code: string, active: boolean, createdAt: any, state: string, currencyCode: CurrencyCode, totalQuantity: number, subTotal: number, subTotalWithTax: number, couponCodes: Array<string>, shippingWithTax: number, totalWithTax: number, discounts: Array<{ __typename?: 'Discount', description: string, amountWithTax: number }>, surcharges: Array<{ __typename?: 'Surcharge', id: string, description: string, priceWithTax: number }>, taxSummary: Array<{ __typename?: 'OrderTaxSummary', description: string, taxRate: number, taxTotal: number }>, customer?: { __typename?: 'Customer', id: string, firstName: string, lastName: string, emailAddress: string } | null, shippingAddress?: { __typename?: 'OrderAddress', fullName?: string | null, streetLine1?: string | null, streetLine2?: string | null, company?: string | null, city?: string | null, province?: string | null, postalCode?: string | null, countryCode?: string | null, phoneNumber?: string | null } | null, shippingLines: Array<{ __typename?: 'ShippingLine', priceWithTax: number, shippingMethod: { __typename?: 'ShippingMethod', id: string, name: string } }>, lines: Array<{ __typename?: 'OrderLine', id: string, unitPriceWithTax: number, linePriceWithTax: number, quantity: number, featuredAsset?: { __typename?: 'Asset', id: string, preview: string } | null, productVariant: { __typename?: 'ProductVariant', id: string, name: string, price: number, customFields?: { __typename?: 'ProductVariantCustomFields', audPrice?: number | null, nprPrice?: number | null, usdPrice?: number | null } | null, product: { __typename?: 'Product', id: string, slug: string } } }>, payments?: Array<{ __typename?: 'Payment', id: string, state: string, method: string, amount: number, metadata?: any | null }> | null, billingAddress?: { __typename?: 'OrderAddress', fullName?: string | null, streetLine1?: string | null, streetLine2?: string | null, company?: string | null, city?: string | null, province?: string | null, postalCode?: string | null, countryCode?: string | null, phoneNumber?: string | null } | null, customFields?: { __typename?: 'OrderCustomFields', estimatedDeliveryDate?: any | null, pickupTime?: string | null } | null } };

export type GetStaticPagesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetStaticPagesQuery = { __typename?: 'Query', pages: { __typename?: 'PageList', items: Array<{ __typename?: 'Page', id: string, title: string, slug: string, group?: { __typename?: 'PageGroup', name: string, slug: string } | null }> } };

export type GetStaticPageQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type GetStaticPageQuery = { __typename?: 'Query', page?: { __typename?: 'Page', id: string, title: string, content: string, slug: string } | null };

export type DetailedProductFragment = { __typename?: 'Product', id: string, name: string, slug: string, description: string, collections: Array<{ __typename?: 'Collection', id: string, slug: string, name: string, breadcrumbs: Array<{ __typename?: 'CollectionBreadcrumb', id: string, name: string, slug: string }> }>, facetValues: Array<{ __typename?: 'FacetValue', id: string, code: string, name: string, facet: { __typename?: 'Facet', id: string, code: string, name: string } }>, featuredAsset?: { __typename?: 'Asset', id: string, preview: string } | null, assets: Array<{ __typename?: 'Asset', id: string, preview: string }>, optionGroups: Array<{ __typename?: 'ProductOptionGroup', id: string, code: string, name: string, options: Array<{ __typename?: 'ProductOption', id: string, code: string, name: string }> }>, variants: Array<{ __typename?: 'ProductVariant', id: string, name: string, isInWishlist: boolean, priceWithTax: number, currencyCode: CurrencyCode, sku: string, stockLevel: string, featuredAsset?: { __typename?: 'Asset', id: string, preview: string } | null, assets: Array<{ __typename?: 'Asset', id: string, preview: string }>, customFields?: { __typename?: 'ProductVariantCustomFields', audPrice?: number | null, nprPrice?: number | null, usdPrice?: number | null, return?: string | null, specification?: Array<{ __typename?: 'ProductVariantSpecificationStruct', isPinned?: boolean | null, key?: string | null, value?: string | null }> | null } | null, prices: Array<{ __typename?: 'ProductVariantPrice', customFields?: { __typename?: 'ProductVariantPriceCustomFields', discountPrice?: number | null, discountPercentage?: number | null } | null }>, options: Array<{ __typename?: 'ProductOption', id: string, code: string, name: string, groupId: string, group: { __typename?: 'ProductOptionGroup', id: string, code: string, name: string } }> }>, customFields?: { __typename?: 'ProductCustomFields', additionalInfo?: string | null, youtubeVideoLink?: string | null } | null };

export type ProductQueryVariables = Exact<{
  slug?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
}>;


export type ProductQuery = { __typename?: 'Query', product?: { __typename?: 'Product', id: string, name: string, slug: string, description: string, collections: Array<{ __typename?: 'Collection', id: string, slug: string, name: string, breadcrumbs: Array<{ __typename?: 'CollectionBreadcrumb', id: string, name: string, slug: string }> }>, facetValues: Array<{ __typename?: 'FacetValue', id: string, code: string, name: string, facet: { __typename?: 'Facet', id: string, code: string, name: string } }>, featuredAsset?: { __typename?: 'Asset', id: string, preview: string } | null, assets: Array<{ __typename?: 'Asset', id: string, preview: string }>, optionGroups: Array<{ __typename?: 'ProductOptionGroup', id: string, code: string, name: string, options: Array<{ __typename?: 'ProductOption', id: string, code: string, name: string }> }>, variants: Array<{ __typename?: 'ProductVariant', id: string, name: string, isInWishlist: boolean, priceWithTax: number, currencyCode: CurrencyCode, sku: string, stockLevel: string, featuredAsset?: { __typename?: 'Asset', id: string, preview: string } | null, assets: Array<{ __typename?: 'Asset', id: string, preview: string }>, customFields?: { __typename?: 'ProductVariantCustomFields', audPrice?: number | null, nprPrice?: number | null, usdPrice?: number | null, return?: string | null, specification?: Array<{ __typename?: 'ProductVariantSpecificationStruct', isPinned?: boolean | null, key?: string | null, value?: string | null }> | null } | null, prices: Array<{ __typename?: 'ProductVariantPrice', customFields?: { __typename?: 'ProductVariantPriceCustomFields', discountPrice?: number | null, discountPercentage?: number | null } | null }>, options: Array<{ __typename?: 'ProductOption', id: string, code: string, name: string, groupId: string, group: { __typename?: 'ProductOptionGroup', id: string, code: string, name: string } }> }>, customFields?: { __typename?: 'ProductCustomFields', additionalInfo?: string | null, youtubeVideoLink?: string | null } | null } | null };

export type ListedProductFragment = { __typename?: 'SearchResult', productId: string, productVariantId: string, productName: string, slug: string, currencyCode: CurrencyCode, productAsset?: { __typename?: 'SearchResultAsset', id: string, preview: string } | null, prices: Array<{ __typename?: 'ProductVariantPrice', customFields?: { __typename?: 'ProductVariantPriceCustomFields', discountPercentage?: number | null, discountPrice?: number | null } | null }>, priceWithTax: { __typename: 'PriceRange', min: number, max: number } | { __typename: 'SinglePrice', value: number } };

export type SearchQueryVariables = Exact<{
  input: SearchInput;
}>;


export type SearchQuery = { __typename?: 'Query', search: { __typename?: 'SearchResponse', totalItems: number, items: Array<{ __typename?: 'SearchResult', productId: string, productVariantId: string, productName: string, slug: string, currencyCode: CurrencyCode, productAsset?: { __typename?: 'SearchResultAsset', id: string, preview: string } | null, prices: Array<{ __typename?: 'ProductVariantPrice', customFields?: { __typename?: 'ProductVariantPriceCustomFields', discountPercentage?: number | null, discountPrice?: number | null } | null }>, priceWithTax: { __typename: 'PriceRange', min: number, max: number } | { __typename: 'SinglePrice', value: number } }> } };

export type SearchFacetValuesQueryVariables = Exact<{
  input: SearchInput;
}>;


export type SearchFacetValuesQuery = { __typename?: 'Query', search: { __typename?: 'SearchResponse', totalItems: number, facetValues: Array<{ __typename?: 'FacetValueResult', count: number, facetValue: { __typename?: 'FacetValue', id: string, name: string, facet: { __typename?: 'Facet', id: string, name: string } } }> } };

export type ProductsQueryVariables = Exact<{
  options?: InputMaybe<ProductListOptions>;
}>;


export type ProductsQuery = { __typename?: 'Query', products: { __typename?: 'ProductList', totalItems: number, items: Array<{ __typename?: 'Product', id: string, name: string, slug: string, variants: Array<{ __typename?: 'ProductVariant', id: string, isInWishlist: boolean, productId: string, price: number, priceWithTax: number, currencyCode: CurrencyCode, stockLevel: string, customFields?: { __typename?: 'ProductVariantCustomFields', audPrice?: number | null, nprPrice?: number | null, usdPrice?: number | null } | null, prices: Array<{ __typename?: 'ProductVariantPrice', price: number, discountPrice: number, currencyCode: string, customFields?: { __typename?: 'ProductVariantPriceCustomFields', discountPrice?: number | null, discountPercentage?: number | null } | null }> }>, featuredAsset?: { __typename?: 'Asset', preview: string } | null }> } };

export type CustomProductQueryVariables = Exact<{
  options?: InputMaybe<ProductListOptions>;
}>;


export type CustomProductQuery = { __typename?: 'Query', products: { __typename?: 'ProductList', items: Array<{ __typename?: 'Product', id: string, name: string, slug: string, description: string, assets: Array<{ __typename?: 'Asset', source: string, preview: string }>, customFields?: { __typename?: 'ProductCustomFields', additionalInfo?: string | null } | null }> } };

export type RelatedProductsQueryVariables = Exact<{
  productSlug: Scalars['String'];
}>;


export type RelatedProductsQuery = { __typename?: 'Query', relatedProducts: Array<{ __typename?: 'Product', id: string, slug: string, name: string, variants: Array<{ __typename?: 'ProductVariant', id: string, priceWithTax: number, isInWishlist: boolean, productId: string, price: number, currencyCode: CurrencyCode, stockLevel: string, prices: Array<{ __typename?: 'ProductVariantPrice', price: number, discountPrice: number, currencyCode: string, customFields?: { __typename?: 'ProductVariantPriceCustomFields', discountPrice?: number | null, discountPercentage?: number | null } | null }> }>, featuredAsset?: { __typename?: 'Asset', preview: string } | null }> };

export type GetExchangeRatesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetExchangeRatesQuery = { __typename?: 'Query', currencyExchangeRate?: { __typename?: 'CurrencyExchangeRateResponse', usd?: string | null, npr?: string | null, aud?: string | null } | null };

export type TechcoinTrasnsactionsQueryVariables = Exact<{
  customerId: Scalars['ID'];
}>;


export type TechcoinTrasnsactionsQuery = { __typename?: 'Query', techcoinTrasnsactions: Array<{ __typename?: 'TechCoinTransaction', id: string, description?: string | null, points: number, loyaltyPointsType: TechCoinType, type: TechCoinTransactionType, order?: { __typename?: 'Order', id: string, code: string, createdAt: any, updatedAt: any } | null }> };

export type ReedemTechCoinsMutationVariables = Exact<{
  orderId: Scalars['ID'];
  coins: Scalars['Int'];
}>;


export type ReedemTechCoinsMutation = { __typename?: 'Mutation', reedemTechCoins: { __typename?: 'InsufficientLoyaltyPointsError', message: string, errorCode: ErrorCode } | { __typename?: 'TechCoinsReedemResponse', success: boolean, message: string } };

export type RevertTechCoinRedemptionMutationVariables = Exact<{
  orderId: Scalars['ID'];
}>;


export type RevertTechCoinRedemptionMutation = { __typename?: 'Mutation', revertTechCoinRedemption: { __typename?: 'TechCoinsReedemResponse', success: boolean, message: string } };

export type AddToWishlistMutationVariables = Exact<{
  productVariantId: Scalars['ID'];
}>;


export type AddToWishlistMutation = { __typename?: 'Mutation', addToWishlist: { __typename: 'WishlistItem', id: string, productVariant: { __typename?: 'ProductVariant', id: string, name: string } } };

export type RemoveFromWishlistMutationVariables = Exact<{
  productVariantId: Scalars['ID'];
}>;


export type RemoveFromWishlistMutation = { __typename?: 'Mutation', removeFromWishlist: { __typename?: 'DeletionResponse', message?: string | null, result: DeletionResult } };

export type GetWishlistsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetWishlistsQuery = { __typename?: 'Query', wishlists: { __typename?: 'WishlistItemList', totalItems: number, items: Array<{ __typename?: 'WishlistItem', id: string, productVariant: { __typename?: 'ProductVariant', id: string, name: string, priceWithTax: number, stockLevel: string, product: { __typename?: 'Product', featuredAsset?: { __typename?: 'Asset', preview: string, id: string } | null, collections: Array<{ __typename?: 'Collection', id: string, name: string }> }, prices: Array<{ __typename?: 'ProductVariantPrice', currencyCode: string, price: number, discountPrice: number }> } }> } };

export const OrderDetailFragmentDoc = gql`
    fragment OrderDetail on Order {
  __typename
  id
  code
  active
  createdAt
  state
  currencyCode
  totalQuantity
  subTotal
  subTotalWithTax
  couponCodes
  discounts {
    description
    amountWithTax
  }
  surcharges {
    id
    description
    priceWithTax
  }
  taxSummary {
    description
    taxRate
    taxTotal
  }
  shippingWithTax
  totalWithTax
  customer {
    id
    firstName
    lastName
    emailAddress
  }
  shippingAddress {
    fullName
    streetLine1
    streetLine2
    company
    city
    province
    postalCode
    countryCode
    phoneNumber
  }
  shippingLines {
    shippingMethod {
      id
      name
    }
    priceWithTax
  }
  lines {
    id
    unitPriceWithTax
    linePriceWithTax
    quantity
    featuredAsset {
      id
      preview
    }
    productVariant {
      id
      name
      price
      customFields {
        audPrice
        nprPrice
        usdPrice
      }
      product {
        id
        slug
      }
    }
  }
  payments {
    id
    state
    method
    amount
    metadata
  }
  billingAddress {
    fullName
    streetLine1
    streetLine2
    company
    city
    province
    postalCode
    countryCode
    phoneNumber
  }
  customFields {
    estimatedDeliveryDate
    pickupTime
  }
}
    `;
export const DetailedProductFragmentDoc = gql`
    fragment DetailedProduct on Product {
  id
  name
  slug
  description
  collections {
    id
    slug
    name
    breadcrumbs {
      id
      name
      slug
    }
  }
  facetValues {
    facet {
      id
      code
      name
    }
    id
    code
    name
  }
  featuredAsset {
    id
    preview
  }
  assets {
    id
    preview
  }
  optionGroups {
    id
    code
    name
    options {
      id
      code
      name
    }
  }
  variants {
    id
    name
    isInWishlist
    priceWithTax
    currencyCode
    sku
    stockLevel
    featuredAsset {
      id
      preview
    }
    assets {
      id
      preview
    }
    customFields {
      audPrice
      nprPrice
      usdPrice
      specification {
        isPinned
        key
        value
      }
      return
    }
    prices {
      customFields {
        discountPrice
        discountPercentage
      }
    }
    options {
      id
      code
      name
      groupId
      group {
        id
        code
        name
      }
    }
  }
  customFields {
    additionalInfo
    youtubeVideoLink
  }
}
    `;
export const ListedProductFragmentDoc = gql`
    fragment ListedProduct on SearchResult {
  productId
  productVariantId
  productName
  slug
  productAsset {
    id
    preview
  }
  prices {
    customFields {
      discountPercentage
      discountPrice
    }
  }
  currencyCode
  priceWithTax {
    __typename
    ... on PriceRange {
      min
      max
    }
    ... on SinglePrice {
      value
    }
  }
}
    `;
export const LoginDocument = gql`
    mutation login($email: String!, $password: String!, $rememberMe: Boolean) {
  login(username: $email, password: $password, rememberMe: $rememberMe) {
    __typename
    ... on CurrentUser {
      id
      identifier
    }
    ... on ErrorResult {
      errorCode
      message
    }
  }
}
    `;
export const LogoutDocument = gql`
    mutation logout {
  logout {
    success
  }
}
    `;
export const RegisterCustomerAccountDocument = gql`
    mutation registerCustomerAccount($input: RegisterCustomerInput!) {
  registerCustomerAccount(input: $input) {
    __typename
    ... on Success {
      success
    }
    ... on ErrorResult {
      errorCode
      message
    }
  }
}
    `;
export const VerifyCustomerAccountDocument = gql`
    mutation verifyCustomerAccount($token: String!, $password: String) {
  verifyCustomerAccount(token: $token, password: $password) {
    __typename
    ... on CurrentUser {
      id
      identifier
    }
    ... on ErrorResult {
      errorCode
      message
    }
  }
}
    `;
export const UpdateCustomerDocument = gql`
    mutation updateCustomer($input: UpdateCustomerInput!) {
  updateCustomer(input: $input) {
    __typename
  }
}
    `;
export const RequestUpdateCustomerEmailAddressDocument = gql`
    mutation requestUpdateCustomerEmailAddress($password: String!, $newEmailAddress: String!) {
  requestUpdateCustomerEmailAddress(
    password: $password
    newEmailAddress: $newEmailAddress
  ) {
    __typename
    ... on ErrorResult {
      errorCode
      message
    }
  }
}
    `;
export const UpdateCustomerEmailAddressDocument = gql`
    mutation updateCustomerEmailAddress($token: String!) {
  updateCustomerEmailAddress(token: $token) {
    __typename
    ... on ErrorResult {
      errorCode
      message
    }
  }
}
    `;
export const UpdateCustomerAddressDocument = gql`
    mutation updateCustomerAddress($input: UpdateAddressInput!) {
  updateCustomerAddress(input: $input) {
    __typename
  }
}
    `;
export const CreateCustomerAddressDocument = gql`
    mutation createCustomerAddress($input: CreateAddressInput!) {
  createCustomerAddress(input: $input) {
    __typename
  }
}
    `;
export const DeleteCustomerAddressDocument = gql`
    mutation deleteCustomerAddress($id: ID!) {
  deleteCustomerAddress(id: $id) {
    success
  }
}
    `;
export const UpdateCustomerPasswordDocument = gql`
    mutation updateCustomerPassword($currentPassword: String!, $newPassword: String!) {
  updateCustomerPassword(
    currentPassword: $currentPassword
    newPassword: $newPassword
  ) {
    __typename
    ... on Success {
      success
    }
    ... on ErrorResult {
      errorCode
      message
    }
  }
}
    `;
export const RequestPasswordResetDocument = gql`
    mutation requestPasswordReset($emailAddress: String!) {
  requestPasswordReset(emailAddress: $emailAddress) {
    __typename
    ... on Success {
      success
    }
    ... on ErrorResult {
      errorCode
      message
    }
  }
}
    `;
export const ResetPasswordDocument = gql`
    mutation resetPassword($token: String!, $password: String!) {
  resetPassword(token: $token, password: $password) {
    __typename
    ... on CurrentUser {
      identifier
    }
    ... on ErrorResult {
      errorCode
      message
    }
  }
}
    `;
export const AuthenticateDocument = gql`
    mutation Authenticate($input: AuthenticationInput!) {
  authenticate(input: $input) {
    __typename
    ... on CurrentUser {
      id
      identifier
    }
    ... on ErrorResult {
      message
    }
  }
}
    `;
export const ActiveChannelDocument = gql`
    query activeChannel {
  activeChannel {
    id
    currencyCode
    customFields {
      heroSection {
        buttonLabel
        buttonUrl
        heading
        imageUrl
        subtext
        tagline
      }
    }
  }
}
    `;
export const GetBannerDocument = gql`
    query getBanner {
  heroSectionBanners {
    id
    title
    description
    ctaLink
    ctaText
    image {
      mimeType
      preview
      source
    }
  }
}
    `;
export const NewsletterDocument = gql`
    mutation Newsletter($input: SubscribeToNewsletterInput!) {
  subscribeToNewsletter(input: $input) {
    created
    success
    __typename
  }
}
    `;
export const UnSubscribeNewsLetterDocument = gql`
    mutation unSubscribeNewsLetter($input: UnsubscribeFromNewsletterInput!) {
  unsubscribeFromNewsletter(input: $input) {
    success
    removed
  }
}
    `;
export const GetSocialLinksDocument = gql`
    query GetSocialLinks {
  activeChannel {
    id
    customFields {
      socialLinks {
        facebook
        instagram
        linkedin
        tiktok
        twitter
        whatsapp
        youtube
      }
    }
  }
}
    `;
export const ContactDocument = gql`
    mutation Contact($input: CreateContactInput!) {
  createContact(input: $input) {
    name
    phone
    emailAddress
    subject
    message
  }
}
    `;
export const EligibleShippingMethodsDocument = gql`
    query eligibleShippingMethods {
  eligibleShippingMethods {
    id
    name
    description
    metadata
    price
    priceWithTax
  }
}
    `;
export const EligiblePaymentMethodsDocument = gql`
    query eligiblePaymentMethods {
  eligiblePaymentMethods {
    id
    code
    name
    description
    eligibilityMessage
    isEligible
  }
}
    `;
export const NextOrderStatesDocument = gql`
    query nextOrderStates {
  nextOrderStates
}
    `;
export const AvailableCountriesDocument = gql`
    query availableCountries {
  availableCountries {
    id
    name
    code
  }
}
    `;
export const AddPaymentToOrderDocument = gql`
    mutation addPaymentToOrder($input: PaymentInput!) {
  addPaymentToOrder(input: $input) {
    ...OrderDetail
    ... on ErrorResult {
      errorCode
      message
    }
  }
}
    ${OrderDetailFragmentDoc}`;
export const TransitionOrderToStateDocument = gql`
    mutation transitionOrderToState($state: String!) {
  transitionOrderToState(state: $state) {
    ...OrderDetail
    ... on ErrorResult {
      errorCode
      message
    }
  }
}
    ${OrderDetailFragmentDoc}`;
export const CreateStripePaymentIntentDocument = gql`
    mutation createStripePaymentIntent {
  createStripePaymentIntent
}
    `;
export const GenerateBraintreeClientTokenDocument = gql`
    query generateBraintreeClientToken {
  generateBraintreeClientToken
}
    `;
export const AddQrPaymentProofDocument = gql`
    mutation addQrPaymentProof($assetId: ID!, $orderCode: String!) {
  addQrPaymentProof(assetId: $assetId, orderCode: $orderCode) {
    success
    message
  }
}
    `;
export const CollectionsDocument = gql`
    query collections($options: CollectionListOptions) {
  collections(options: $options) {
    items {
      id
      name
      slug
      parent {
        name
      }
      featuredAsset {
        id
        preview
      }
      children {
        name
        id
        slug
        customFields {
          showInNavBar
        }
        children {
          name
          id
          slug
          customFields {
            showInNavBar
          }
        }
      }
    }
  }
}
    `;
export const CollectionDocument = gql`
    query collection($slug: String, $id: ID) {
  collection(slug: $slug, id: $id) {
    id
    name
    slug
    breadcrumbs {
      id
      name
      slug
    }
    children {
      id
      name
      slug
      featuredAsset {
        id
        preview
      }
    }
  }
}
    `;
export const ActiveCustomerDocument = gql`
    query activeCustomer {
  activeCustomer {
    id
    firstName
    lastName
    availableLoyaltyPoints
    emailAddress
    customFields {
      avatarUrl {
        preview
      }
    }
  }
}
    `;
export const ActiveCustomerDetailsDocument = gql`
    query activeCustomerDetails {
  activeCustomer {
    id
    title
    firstName
    lastName
    phoneNumber
    emailAddress
    customFields {
      avatarUrl {
        preview
      }
    }
  }
}
    `;
export const ActiveCustomerAddressesDocument = gql`
    query activeCustomerAddresses {
  activeCustomer {
    id
    addresses {
      id
      company
      fullName
      streetLine1
      streetLine2
      city
      province
      postalCode
      country {
        id
        code
        name
      }
      phoneNumber
      defaultShippingAddress
      defaultBillingAddress
    }
  }
}
    `;
export const ActiveCustomerOrderListDocument = gql`
    query activeCustomerOrderList($orderListOptions: OrderListOptions) {
  activeCustomer {
    orders(options: $orderListOptions) {
      totalItems
      items {
        code
        state
        orderPlacedAt
        currencyCode
        subTotal
        subTotalWithTax
        total
        totalWithTax
        shippingWithTax
        shippingLines {
          priceWithTax
        }
        taxSummary {
          taxBase
          taxTotal
        }
        discounts {
          amountWithTax
        }
        fulfillments {
          trackingCode
        }
        lines {
          id
          unitPriceWithTax
          linePriceWithTax
          quantity
          discountedLinePriceWithTax
          discountedUnitPriceWithTax
          fulfillmentLines {
            quantity
            fulfillment {
              state
              updatedAt
            }
          }
          featuredAsset {
            name
            source
            preview
          }
          productVariant {
            name
            sku
            currencyCode
            priceWithTax
            product {
              slug
            }
          }
        }
        billingAddress {
          fullName
          streetLine1
          streetLine2
          company
          city
          province
          postalCode
          countryCode
          phoneNumber
        }
        shippingAddress {
          fullName
          streetLine1
          streetLine2
          company
          city
          province
          postalCode
          countryCode
          phoneNumber
        }
        customer {
          id
          firstName
          lastName
          emailAddress
        }
        customFields {
          estimatedDeliveryDate
        }
      }
    }
  }
}
    `;
export const FacetsDocument = gql`
    query facets($options: FacetListOptions) {
  facets(options: $options) {
    items {
      id
      name
      code
      values {
        id
        name
        code
      }
    }
  }
}
    `;
export const SetCustomerForOrderDocument = gql`
    mutation setCustomerForOrder($input: CreateCustomerInput!) {
  setCustomerForOrder(input: $input) {
    ...OrderDetail
    ... on ErrorResult {
      errorCode
      message
    }
  }
}
    ${OrderDetailFragmentDoc}`;
export const SetOrderShippingAddressDocument = gql`
    mutation setOrderShippingAddress($input: CreateAddressInput!) {
  setOrderShippingAddress(input: $input) {
    ...OrderDetail
    ... on ErrorResult {
      errorCode
      message
    }
  }
}
    ${OrderDetailFragmentDoc}`;
export const SetOrderShippingMethodDocument = gql`
    mutation setOrderShippingMethod($shippingMethodId: [ID!]!) {
  setOrderShippingMethod(shippingMethodId: $shippingMethodId) {
    ...OrderDetail
    ... on ErrorResult {
      errorCode
      message
    }
  }
}
    ${OrderDetailFragmentDoc}`;
export const SetOrderBillingAddressDocument = gql`
    mutation setOrderBillingAddress($input: CreateAddressInput!) {
  setOrderBillingAddress(input: $input) {
    ...OrderDetail
    ... on ErrorResult {
      errorCode
      message
    }
  }
}
    ${OrderDetailFragmentDoc}`;
export const AddItemToOrderDocument = gql`
    mutation addItemToOrder($productVariantId: ID!, $quantity: Int!) {
  addItemToOrder(productVariantId: $productVariantId, quantity: $quantity) {
    ...OrderDetail
    ... on ErrorResult {
      errorCode
      message
    }
  }
}
    ${OrderDetailFragmentDoc}`;
export const RemoveOrderLineDocument = gql`
    mutation removeOrderLine($orderLineId: ID!) {
  removeOrderLine(orderLineId: $orderLineId) {
    ...OrderDetail
    ... on ErrorResult {
      errorCode
      message
    }
  }
}
    ${OrderDetailFragmentDoc}`;
export const AdjustOrderLineDocument = gql`
    mutation adjustOrderLine($orderLineId: ID!, $quantity: Int!) {
  adjustOrderLine(orderLineId: $orderLineId, quantity: $quantity) {
    ...OrderDetail
    ... on ErrorResult {
      errorCode
      message
    }
  }
}
    ${OrderDetailFragmentDoc}`;
export const ActiveOrderDocument = gql`
    query activeOrder {
  activeOrder {
    ...OrderDetail
  }
}
    ${OrderDetailFragmentDoc}`;
export const OrderByCodeDocument = gql`
    query orderByCode($code: String!) {
  orderByCode(code: $code) {
    ...OrderDetail
    orderPlacedAt
  }
}
    ${OrderDetailFragmentDoc}`;
export const ApplyCouponDocument = gql`
    mutation ApplyCoupon($couponCode: String!) {
  applyCouponCode(couponCode: $couponCode) {
    ... on Order {
      id
    }
    ... on ErrorResult {
      errorCode
      message
    }
  }
}
    `;
export const RemoveCouponCodeDocument = gql`
    mutation removeCouponCode($couponCode: String!) {
  removeCouponCode(couponCode: $couponCode) {
    ...OrderDetail
  }
}
    ${OrderDetailFragmentDoc}`;
export const GetLoaylityCouponCodesDocument = gql`
    query GetLoaylityCouponCodes {
  loyaltyCouponCodes
}
    `;
export const TrackMyOrderDocument = gql`
    query TrackMyOrder($orderCode: String!, $email: String!) {
  trackOrder(orderCode: $orderCode, email: $email) {
    id
    state
    code
    orderPlacedAt
    currencyCode
    totalWithTax
    lines {
      id
      featuredAsset {
        preview
      }
      productVariant {
        name
        priceWithTax
        product {
          slug
        }
      }
      quantity
      unitPriceWithTax
      linePriceWithTax
    }
    subTotal
    customFields {
      estimatedDeliveryDate
    }
  }
}
    `;
export const SetPickUpDateTimeDocument = gql`
    mutation setPickUpDateTime($input: UpdateOrderInput!) {
  setOrderCustomFields(input: $input) {
    __typename
    ... on Order {
      ...OrderDetail
    }
    ... on ErrorResult {
      errorCode
      message
    }
  }
}
    ${OrderDetailFragmentDoc}`;
export const GetStaticPagesDocument = gql`
    query getStaticPages {
  pages {
    items {
      id
      title
      slug
      group {
        name
        slug
      }
    }
  }
}
    `;
export const GetStaticPageDocument = gql`
    query getStaticPage($slug: String!) {
  page(slug: $slug) {
    id
    title
    content
    slug
  }
}
    `;
export const ProductDocument = gql`
    query product($slug: String, $id: ID) {
  product(slug: $slug, id: $id) {
    ...DetailedProduct
  }
}
    ${DetailedProductFragmentDoc}`;
export const SearchDocument = gql`
    query search($input: SearchInput!) {
  search(input: $input) {
    totalItems
    items {
      ...ListedProduct
    }
  }
}
    ${ListedProductFragmentDoc}`;
export const SearchFacetValuesDocument = gql`
    query searchFacetValues($input: SearchInput!) {
  search(input: $input) {
    totalItems
    facetValues {
      count
      facetValue {
        id
        name
        facet {
          id
          name
        }
      }
    }
  }
}
    `;
export const ProductsDocument = gql`
    query Products($options: ProductListOptions) {
  products(options: $options) {
    items {
      id
      name
      slug
      variants {
        id
        isInWishlist
        productId
        price
        priceWithTax
        currencyCode
        stockLevel
        customFields {
          audPrice
          nprPrice
          usdPrice
        }
        prices {
          price
          discountPrice
          currencyCode
          customFields {
            discountPrice
            discountPercentage
          }
        }
      }
      featuredAsset {
        preview
      }
    }
    totalItems
  }
}
    `;
export const CustomProductDocument = gql`
    query CustomProduct($options: ProductListOptions) {
  products(options: $options) {
    items {
      id
      name
      slug
      description
      assets {
        source
        preview
      }
      customFields {
        additionalInfo
      }
    }
  }
}
    `;
export const RelatedProductsDocument = gql`
    query RelatedProducts($productSlug: String!) {
  relatedProducts(productSlug: $productSlug) {
    id
    slug
    name
    variants {
      id
      priceWithTax
      isInWishlist
      productId
      price
      currencyCode
      stockLevel
      prices {
        price
        discountPrice
        currencyCode
        customFields {
          discountPrice
          discountPercentage
        }
      }
    }
    featuredAsset {
      preview
    }
  }
}
    `;
export const GetExchangeRatesDocument = gql`
    query GetExchangeRates {
  currencyExchangeRate {
    usd
    npr
    aud
  }
}
    `;
export const TechcoinTrasnsactionsDocument = gql`
    query TechcoinTrasnsactions($customerId: ID!) {
  techcoinTrasnsactions(customerId: $customerId) {
    id
    description
    points
    loyaltyPointsType
    type
    order {
      id
      code
      createdAt
      updatedAt
    }
  }
}
    `;
export const ReedemTechCoinsDocument = gql`
    mutation ReedemTechCoins($orderId: ID!, $coins: Int!) {
  reedemTechCoins(orderId: $orderId, coins: $coins) {
    ... on TechCoinsReedemResponse {
      success
      message
    }
    ... on InsufficientLoyaltyPointsError {
      message
      errorCode
    }
  }
}
    `;
export const RevertTechCoinRedemptionDocument = gql`
    mutation RevertTechCoinRedemption($orderId: ID!) {
  revertTechCoinRedemption(orderId: $orderId) {
    success
    message
  }
}
    `;
export const AddToWishlistDocument = gql`
    mutation AddToWishlist($productVariantId: ID!) {
  addToWishlist(productVariantId: $productVariantId) {
    id
    __typename
    productVariant {
      id
      name
    }
  }
}
    `;
export const RemoveFromWishlistDocument = gql`
    mutation RemoveFromWishlist($productVariantId: ID!) {
  removeFromWishlist(productVariantId: $productVariantId) {
    message
    result
  }
}
    `;
export const GetWishlistsDocument = gql`
    query GetWishlists {
  wishlists {
    totalItems
    items {
      id
      productVariant {
        id
        name
        product {
          featuredAsset {
            preview
            id
          }
          collections {
            id
            name
          }
        }
        prices {
          currencyCode
          price
          discountPrice
        }
        priceWithTax
        stockLevel
      }
    }
  }
}
    `;
export type Requester<C = {}, E = unknown> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>
export function getSdk<C, E>(requester: Requester<C, E>) {
  return {
    login(variables: LoginMutationVariables, options?: C): Promise<LoginMutation> {
      return requester<LoginMutation, LoginMutationVariables>(LoginDocument, variables, options) as Promise<LoginMutation>;
    },
    logout(variables?: LogoutMutationVariables, options?: C): Promise<LogoutMutation> {
      return requester<LogoutMutation, LogoutMutationVariables>(LogoutDocument, variables, options) as Promise<LogoutMutation>;
    },
    registerCustomerAccount(variables: RegisterCustomerAccountMutationVariables, options?: C): Promise<RegisterCustomerAccountMutation> {
      return requester<RegisterCustomerAccountMutation, RegisterCustomerAccountMutationVariables>(RegisterCustomerAccountDocument, variables, options) as Promise<RegisterCustomerAccountMutation>;
    },
    verifyCustomerAccount(variables: VerifyCustomerAccountMutationVariables, options?: C): Promise<VerifyCustomerAccountMutation> {
      return requester<VerifyCustomerAccountMutation, VerifyCustomerAccountMutationVariables>(VerifyCustomerAccountDocument, variables, options) as Promise<VerifyCustomerAccountMutation>;
    },
    updateCustomer(variables: UpdateCustomerMutationVariables, options?: C): Promise<UpdateCustomerMutation> {
      return requester<UpdateCustomerMutation, UpdateCustomerMutationVariables>(UpdateCustomerDocument, variables, options) as Promise<UpdateCustomerMutation>;
    },
    requestUpdateCustomerEmailAddress(variables: RequestUpdateCustomerEmailAddressMutationVariables, options?: C): Promise<RequestUpdateCustomerEmailAddressMutation> {
      return requester<RequestUpdateCustomerEmailAddressMutation, RequestUpdateCustomerEmailAddressMutationVariables>(RequestUpdateCustomerEmailAddressDocument, variables, options) as Promise<RequestUpdateCustomerEmailAddressMutation>;
    },
    updateCustomerEmailAddress(variables: UpdateCustomerEmailAddressMutationVariables, options?: C): Promise<UpdateCustomerEmailAddressMutation> {
      return requester<UpdateCustomerEmailAddressMutation, UpdateCustomerEmailAddressMutationVariables>(UpdateCustomerEmailAddressDocument, variables, options) as Promise<UpdateCustomerEmailAddressMutation>;
    },
    updateCustomerAddress(variables: UpdateCustomerAddressMutationVariables, options?: C): Promise<UpdateCustomerAddressMutation> {
      return requester<UpdateCustomerAddressMutation, UpdateCustomerAddressMutationVariables>(UpdateCustomerAddressDocument, variables, options) as Promise<UpdateCustomerAddressMutation>;
    },
    createCustomerAddress(variables: CreateCustomerAddressMutationVariables, options?: C): Promise<CreateCustomerAddressMutation> {
      return requester<CreateCustomerAddressMutation, CreateCustomerAddressMutationVariables>(CreateCustomerAddressDocument, variables, options) as Promise<CreateCustomerAddressMutation>;
    },
    deleteCustomerAddress(variables: DeleteCustomerAddressMutationVariables, options?: C): Promise<DeleteCustomerAddressMutation> {
      return requester<DeleteCustomerAddressMutation, DeleteCustomerAddressMutationVariables>(DeleteCustomerAddressDocument, variables, options) as Promise<DeleteCustomerAddressMutation>;
    },
    updateCustomerPassword(variables: UpdateCustomerPasswordMutationVariables, options?: C): Promise<UpdateCustomerPasswordMutation> {
      return requester<UpdateCustomerPasswordMutation, UpdateCustomerPasswordMutationVariables>(UpdateCustomerPasswordDocument, variables, options) as Promise<UpdateCustomerPasswordMutation>;
    },
    requestPasswordReset(variables: RequestPasswordResetMutationVariables, options?: C): Promise<RequestPasswordResetMutation> {
      return requester<RequestPasswordResetMutation, RequestPasswordResetMutationVariables>(RequestPasswordResetDocument, variables, options) as Promise<RequestPasswordResetMutation>;
    },
    resetPassword(variables: ResetPasswordMutationVariables, options?: C): Promise<ResetPasswordMutation> {
      return requester<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, variables, options) as Promise<ResetPasswordMutation>;
    },
    Authenticate(variables: AuthenticateMutationVariables, options?: C): Promise<AuthenticateMutation> {
      return requester<AuthenticateMutation, AuthenticateMutationVariables>(AuthenticateDocument, variables, options) as Promise<AuthenticateMutation>;
    },
    activeChannel(variables?: ActiveChannelQueryVariables, options?: C): Promise<ActiveChannelQuery> {
      return requester<ActiveChannelQuery, ActiveChannelQueryVariables>(ActiveChannelDocument, variables, options) as Promise<ActiveChannelQuery>;
    },
    getBanner(variables?: GetBannerQueryVariables, options?: C): Promise<GetBannerQuery> {
      return requester<GetBannerQuery, GetBannerQueryVariables>(GetBannerDocument, variables, options) as Promise<GetBannerQuery>;
    },
    Newsletter(variables: NewsletterMutationVariables, options?: C): Promise<NewsletterMutation> {
      return requester<NewsletterMutation, NewsletterMutationVariables>(NewsletterDocument, variables, options) as Promise<NewsletterMutation>;
    },
    unSubscribeNewsLetter(variables: UnSubscribeNewsLetterMutationVariables, options?: C): Promise<UnSubscribeNewsLetterMutation> {
      return requester<UnSubscribeNewsLetterMutation, UnSubscribeNewsLetterMutationVariables>(UnSubscribeNewsLetterDocument, variables, options) as Promise<UnSubscribeNewsLetterMutation>;
    },
    GetSocialLinks(variables?: GetSocialLinksQueryVariables, options?: C): Promise<GetSocialLinksQuery> {
      return requester<GetSocialLinksQuery, GetSocialLinksQueryVariables>(GetSocialLinksDocument, variables, options) as Promise<GetSocialLinksQuery>;
    },
    Contact(variables: ContactMutationVariables, options?: C): Promise<ContactMutation> {
      return requester<ContactMutation, ContactMutationVariables>(ContactDocument, variables, options) as Promise<ContactMutation>;
    },
    eligibleShippingMethods(variables?: EligibleShippingMethodsQueryVariables, options?: C): Promise<EligibleShippingMethodsQuery> {
      return requester<EligibleShippingMethodsQuery, EligibleShippingMethodsQueryVariables>(EligibleShippingMethodsDocument, variables, options) as Promise<EligibleShippingMethodsQuery>;
    },
    eligiblePaymentMethods(variables?: EligiblePaymentMethodsQueryVariables, options?: C): Promise<EligiblePaymentMethodsQuery> {
      return requester<EligiblePaymentMethodsQuery, EligiblePaymentMethodsQueryVariables>(EligiblePaymentMethodsDocument, variables, options) as Promise<EligiblePaymentMethodsQuery>;
    },
    nextOrderStates(variables?: NextOrderStatesQueryVariables, options?: C): Promise<NextOrderStatesQuery> {
      return requester<NextOrderStatesQuery, NextOrderStatesQueryVariables>(NextOrderStatesDocument, variables, options) as Promise<NextOrderStatesQuery>;
    },
    availableCountries(variables?: AvailableCountriesQueryVariables, options?: C): Promise<AvailableCountriesQuery> {
      return requester<AvailableCountriesQuery, AvailableCountriesQueryVariables>(AvailableCountriesDocument, variables, options) as Promise<AvailableCountriesQuery>;
    },
    addPaymentToOrder(variables: AddPaymentToOrderMutationVariables, options?: C): Promise<AddPaymentToOrderMutation> {
      return requester<AddPaymentToOrderMutation, AddPaymentToOrderMutationVariables>(AddPaymentToOrderDocument, variables, options) as Promise<AddPaymentToOrderMutation>;
    },
    transitionOrderToState(variables: TransitionOrderToStateMutationVariables, options?: C): Promise<TransitionOrderToStateMutation> {
      return requester<TransitionOrderToStateMutation, TransitionOrderToStateMutationVariables>(TransitionOrderToStateDocument, variables, options) as Promise<TransitionOrderToStateMutation>;
    },
    createStripePaymentIntent(variables?: CreateStripePaymentIntentMutationVariables, options?: C): Promise<CreateStripePaymentIntentMutation> {
      return requester<CreateStripePaymentIntentMutation, CreateStripePaymentIntentMutationVariables>(CreateStripePaymentIntentDocument, variables, options) as Promise<CreateStripePaymentIntentMutation>;
    },
    generateBraintreeClientToken(variables?: GenerateBraintreeClientTokenQueryVariables, options?: C): Promise<GenerateBraintreeClientTokenQuery> {
      return requester<GenerateBraintreeClientTokenQuery, GenerateBraintreeClientTokenQueryVariables>(GenerateBraintreeClientTokenDocument, variables, options) as Promise<GenerateBraintreeClientTokenQuery>;
    },
    addQrPaymentProof(variables: AddQrPaymentProofMutationVariables, options?: C): Promise<AddQrPaymentProofMutation> {
      return requester<AddQrPaymentProofMutation, AddQrPaymentProofMutationVariables>(AddQrPaymentProofDocument, variables, options) as Promise<AddQrPaymentProofMutation>;
    },
    collections(variables?: CollectionsQueryVariables, options?: C): Promise<CollectionsQuery> {
      return requester<CollectionsQuery, CollectionsQueryVariables>(CollectionsDocument, variables, options) as Promise<CollectionsQuery>;
    },
    collection(variables?: CollectionQueryVariables, options?: C): Promise<CollectionQuery> {
      return requester<CollectionQuery, CollectionQueryVariables>(CollectionDocument, variables, options) as Promise<CollectionQuery>;
    },
    activeCustomer(variables?: ActiveCustomerQueryVariables, options?: C): Promise<ActiveCustomerQuery> {
      return requester<ActiveCustomerQuery, ActiveCustomerQueryVariables>(ActiveCustomerDocument, variables, options) as Promise<ActiveCustomerQuery>;
    },
    activeCustomerDetails(variables?: ActiveCustomerDetailsQueryVariables, options?: C): Promise<ActiveCustomerDetailsQuery> {
      return requester<ActiveCustomerDetailsQuery, ActiveCustomerDetailsQueryVariables>(ActiveCustomerDetailsDocument, variables, options) as Promise<ActiveCustomerDetailsQuery>;
    },
    activeCustomerAddresses(variables?: ActiveCustomerAddressesQueryVariables, options?: C): Promise<ActiveCustomerAddressesQuery> {
      return requester<ActiveCustomerAddressesQuery, ActiveCustomerAddressesQueryVariables>(ActiveCustomerAddressesDocument, variables, options) as Promise<ActiveCustomerAddressesQuery>;
    },
    activeCustomerOrderList(variables?: ActiveCustomerOrderListQueryVariables, options?: C): Promise<ActiveCustomerOrderListQuery> {
      return requester<ActiveCustomerOrderListQuery, ActiveCustomerOrderListQueryVariables>(ActiveCustomerOrderListDocument, variables, options) as Promise<ActiveCustomerOrderListQuery>;
    },
    facets(variables?: FacetsQueryVariables, options?: C): Promise<FacetsQuery> {
      return requester<FacetsQuery, FacetsQueryVariables>(FacetsDocument, variables, options) as Promise<FacetsQuery>;
    },
    setCustomerForOrder(variables: SetCustomerForOrderMutationVariables, options?: C): Promise<SetCustomerForOrderMutation> {
      return requester<SetCustomerForOrderMutation, SetCustomerForOrderMutationVariables>(SetCustomerForOrderDocument, variables, options) as Promise<SetCustomerForOrderMutation>;
    },
    setOrderShippingAddress(variables: SetOrderShippingAddressMutationVariables, options?: C): Promise<SetOrderShippingAddressMutation> {
      return requester<SetOrderShippingAddressMutation, SetOrderShippingAddressMutationVariables>(SetOrderShippingAddressDocument, variables, options) as Promise<SetOrderShippingAddressMutation>;
    },
    setOrderShippingMethod(variables: SetOrderShippingMethodMutationVariables, options?: C): Promise<SetOrderShippingMethodMutation> {
      return requester<SetOrderShippingMethodMutation, SetOrderShippingMethodMutationVariables>(SetOrderShippingMethodDocument, variables, options) as Promise<SetOrderShippingMethodMutation>;
    },
    setOrderBillingAddress(variables: SetOrderBillingAddressMutationVariables, options?: C): Promise<SetOrderBillingAddressMutation> {
      return requester<SetOrderBillingAddressMutation, SetOrderBillingAddressMutationVariables>(SetOrderBillingAddressDocument, variables, options) as Promise<SetOrderBillingAddressMutation>;
    },
    addItemToOrder(variables: AddItemToOrderMutationVariables, options?: C): Promise<AddItemToOrderMutation> {
      return requester<AddItemToOrderMutation, AddItemToOrderMutationVariables>(AddItemToOrderDocument, variables, options) as Promise<AddItemToOrderMutation>;
    },
    removeOrderLine(variables: RemoveOrderLineMutationVariables, options?: C): Promise<RemoveOrderLineMutation> {
      return requester<RemoveOrderLineMutation, RemoveOrderLineMutationVariables>(RemoveOrderLineDocument, variables, options) as Promise<RemoveOrderLineMutation>;
    },
    adjustOrderLine(variables: AdjustOrderLineMutationVariables, options?: C): Promise<AdjustOrderLineMutation> {
      return requester<AdjustOrderLineMutation, AdjustOrderLineMutationVariables>(AdjustOrderLineDocument, variables, options) as Promise<AdjustOrderLineMutation>;
    },
    activeOrder(variables?: ActiveOrderQueryVariables, options?: C): Promise<ActiveOrderQuery> {
      return requester<ActiveOrderQuery, ActiveOrderQueryVariables>(ActiveOrderDocument, variables, options) as Promise<ActiveOrderQuery>;
    },
    orderByCode(variables: OrderByCodeQueryVariables, options?: C): Promise<OrderByCodeQuery> {
      return requester<OrderByCodeQuery, OrderByCodeQueryVariables>(OrderByCodeDocument, variables, options) as Promise<OrderByCodeQuery>;
    },
    ApplyCoupon(variables: ApplyCouponMutationVariables, options?: C): Promise<ApplyCouponMutation> {
      return requester<ApplyCouponMutation, ApplyCouponMutationVariables>(ApplyCouponDocument, variables, options) as Promise<ApplyCouponMutation>;
    },
    removeCouponCode(variables: RemoveCouponCodeMutationVariables, options?: C): Promise<RemoveCouponCodeMutation> {
      return requester<RemoveCouponCodeMutation, RemoveCouponCodeMutationVariables>(RemoveCouponCodeDocument, variables, options) as Promise<RemoveCouponCodeMutation>;
    },
    GetLoaylityCouponCodes(variables?: GetLoaylityCouponCodesQueryVariables, options?: C): Promise<GetLoaylityCouponCodesQuery> {
      return requester<GetLoaylityCouponCodesQuery, GetLoaylityCouponCodesQueryVariables>(GetLoaylityCouponCodesDocument, variables, options) as Promise<GetLoaylityCouponCodesQuery>;
    },
    TrackMyOrder(variables: TrackMyOrderQueryVariables, options?: C): Promise<TrackMyOrderQuery> {
      return requester<TrackMyOrderQuery, TrackMyOrderQueryVariables>(TrackMyOrderDocument, variables, options) as Promise<TrackMyOrderQuery>;
    },
    setPickUpDateTime(variables: SetPickUpDateTimeMutationVariables, options?: C): Promise<SetPickUpDateTimeMutation> {
      return requester<SetPickUpDateTimeMutation, SetPickUpDateTimeMutationVariables>(SetPickUpDateTimeDocument, variables, options) as Promise<SetPickUpDateTimeMutation>;
    },
    getStaticPages(variables?: GetStaticPagesQueryVariables, options?: C): Promise<GetStaticPagesQuery> {
      return requester<GetStaticPagesQuery, GetStaticPagesQueryVariables>(GetStaticPagesDocument, variables, options) as Promise<GetStaticPagesQuery>;
    },
    getStaticPage(variables: GetStaticPageQueryVariables, options?: C): Promise<GetStaticPageQuery> {
      return requester<GetStaticPageQuery, GetStaticPageQueryVariables>(GetStaticPageDocument, variables, options) as Promise<GetStaticPageQuery>;
    },
    product(variables?: ProductQueryVariables, options?: C): Promise<ProductQuery> {
      return requester<ProductQuery, ProductQueryVariables>(ProductDocument, variables, options) as Promise<ProductQuery>;
    },
    search(variables: SearchQueryVariables, options?: C): Promise<SearchQuery> {
      return requester<SearchQuery, SearchQueryVariables>(SearchDocument, variables, options) as Promise<SearchQuery>;
    },
    searchFacetValues(variables: SearchFacetValuesQueryVariables, options?: C): Promise<SearchFacetValuesQuery> {
      return requester<SearchFacetValuesQuery, SearchFacetValuesQueryVariables>(SearchFacetValuesDocument, variables, options) as Promise<SearchFacetValuesQuery>;
    },
    Products(variables?: ProductsQueryVariables, options?: C): Promise<ProductsQuery> {
      return requester<ProductsQuery, ProductsQueryVariables>(ProductsDocument, variables, options) as Promise<ProductsQuery>;
    },
    CustomProduct(variables?: CustomProductQueryVariables, options?: C): Promise<CustomProductQuery> {
      return requester<CustomProductQuery, CustomProductQueryVariables>(CustomProductDocument, variables, options) as Promise<CustomProductQuery>;
    },
    RelatedProducts(variables: RelatedProductsQueryVariables, options?: C): Promise<RelatedProductsQuery> {
      return requester<RelatedProductsQuery, RelatedProductsQueryVariables>(RelatedProductsDocument, variables, options) as Promise<RelatedProductsQuery>;
    },
    GetExchangeRates(variables?: GetExchangeRatesQueryVariables, options?: C): Promise<GetExchangeRatesQuery> {
      return requester<GetExchangeRatesQuery, GetExchangeRatesQueryVariables>(GetExchangeRatesDocument, variables, options) as Promise<GetExchangeRatesQuery>;
    },
    TechcoinTrasnsactions(variables: TechcoinTrasnsactionsQueryVariables, options?: C): Promise<TechcoinTrasnsactionsQuery> {
      return requester<TechcoinTrasnsactionsQuery, TechcoinTrasnsactionsQueryVariables>(TechcoinTrasnsactionsDocument, variables, options) as Promise<TechcoinTrasnsactionsQuery>;
    },
    ReedemTechCoins(variables: ReedemTechCoinsMutationVariables, options?: C): Promise<ReedemTechCoinsMutation> {
      return requester<ReedemTechCoinsMutation, ReedemTechCoinsMutationVariables>(ReedemTechCoinsDocument, variables, options) as Promise<ReedemTechCoinsMutation>;
    },
    RevertTechCoinRedemption(variables: RevertTechCoinRedemptionMutationVariables, options?: C): Promise<RevertTechCoinRedemptionMutation> {
      return requester<RevertTechCoinRedemptionMutation, RevertTechCoinRedemptionMutationVariables>(RevertTechCoinRedemptionDocument, variables, options) as Promise<RevertTechCoinRedemptionMutation>;
    },
    AddToWishlist(variables: AddToWishlistMutationVariables, options?: C): Promise<AddToWishlistMutation> {
      return requester<AddToWishlistMutation, AddToWishlistMutationVariables>(AddToWishlistDocument, variables, options) as Promise<AddToWishlistMutation>;
    },
    RemoveFromWishlist(variables: RemoveFromWishlistMutationVariables, options?: C): Promise<RemoveFromWishlistMutation> {
      return requester<RemoveFromWishlistMutation, RemoveFromWishlistMutationVariables>(RemoveFromWishlistDocument, variables, options) as Promise<RemoveFromWishlistMutation>;
    },
    GetWishlists(variables?: GetWishlistsQueryVariables, options?: C): Promise<GetWishlistsQuery> {
      return requester<GetWishlistsQuery, GetWishlistsQueryVariables>(GetWishlistsDocument, variables, options) as Promise<GetWishlistsQuery>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;