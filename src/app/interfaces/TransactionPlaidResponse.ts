// Interface para la cuenta
export interface Account {
    account_id: string;
    balances: Balances;
    mask: string;
    name: string;
    official_name: string;
    subtype: string;
    type: string;
}

// Interface para los balances de la cuenta
export interface Balances {
    available: number;
    current: number;
    iso_currency_code: string;
    limit: number | null; // Puede ser null
    unofficial_currency_code: string | null; // Puede ser null
}

// Interface para la transacción
export interface Transaction {
    account_id: string;
    account_owner: string | null; // Puede ser null
    amount: number;
    iso_currency_code: string;
    unofficial_currency_code: string | null; // Puede ser null
    category: string[];
    category_id: string;
    check_number: string | null; // Puede ser null
    counterparties: Counterparty[];
    date: string; // Formato de fecha en string
    datetime: string | null; // Puede ser null
    authorized_date: string;
    authorized_datetime: string | null; // Puede ser null
    location: Location;
    name: string;
    merchant_name: string | null; // Puede ser null
    merchant_entity_id: string | null; // Puede ser null
    logo_url: string | null; // Puede ser null
    website: string | null; // Puede ser null
    payment_meta: PaymentMeta;
    payment_channel: string;
    pending: boolean;
    pending_transaction_id: string | null; // Puede ser null
    personal_finance_category: PersonalFinanceCategory;
    personal_finance_category_icon_url: string;
    transaction_id: string;
    transaction_code: string | null; // Puede ser null
    transaction_type: string;
}

// Interface para los contrapartes en la transacción
export interface Counterparty {
    name: string;
    type: string;
    logo_url: string | null; // Puede ser null
    website: string | null; // Puede ser null
    entity_id: string;
    confidence_level: string;
}

// Interface para la ubicación de la transacción
export interface Location {
    address: string | null; // Puede ser null
    city: string | null; // Puede ser null
    region: string | null; // Puede ser null
    postal_code: string | null; // Puede ser null
    country: string | null; // Puede ser null
    lat: number | null; // Puede ser null
    lon: number | null; // Puede ser null
    store_number: string | null; // Puede ser null
}

// Interface para los metadatos de pago
export interface PaymentMeta {
    by_order_of: string | null; // Puede ser null
    payee: string | null; // Puede ser null
    payer: string | null; // Puede ser null
    payment_method: string | null; // Puede ser null
    payment_processor: string | null; // Puede ser null
    ppd_id: string | null; // Puede ser null
    reason: string | null; // Puede ser null
    reference_number: string | null; // Puede ser null
}

// Interface para la categoría de finanzas personales
export interface PersonalFinanceCategory {
    primary: string;
    detailed: string;
    confidence_level: string;
}

// Interface para el item
export interface Item {
    available_products: string[];
    billed_products: string[];
    consent_expiration_time: string | null; // Puede ser null
    error: string | null; // Puede ser null
    institution_id: string;
    item_id: string;
    update_type: string;
    webhook: string;
}

// Interface principal que contiene todas las propiedades
export interface TransactionPlaidResponse {
    accounts: Account[];
    transactions: Transaction[];
    item: Item;
    total_transactions: number;
    request_id: string;
}
