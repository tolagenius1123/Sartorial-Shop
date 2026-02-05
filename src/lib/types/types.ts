export type Product = {
	_id: string;
	name: string;
	price: number;
	currency: string;
	originalPrice: number;
	image: string;
};

export interface BillingFormValues {
	firstName: string;
	lastName: string;
	address: string;
	country: string;
	state: string;
	apartment: string;
	area: string;
	postalCode: string;
	phoneNo: string;
	emailAddress: string;
	saveInfo: boolean;
	shipToDifferentAddress: boolean;
	receiverFirstName: string;
	receiverLastName: string;
	shippingAddress: string;
	shippingApartment: string;
	shippingCountry: string;
	shippingState: string;
	shippingArea: string;
	shippingPostalCode: string;
	shippingPhoneNo: string;
	orderNote: string;
}
