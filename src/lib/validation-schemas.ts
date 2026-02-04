import * as yup from "yup";

export const billingSchema = yup.object().shape({
	firstName: yup.string().trim().required("First name is required"),
	lastName: yup.string().trim().required("Last name is required"),
	address: yup.string().trim().required("Street address is required"),
	apartment: yup.string().trim(),
	townCity: yup.string().trim().required("Town/City is required"),
	postalCode: yup.string().trim(),
	phoneNo: yup.string().trim().required("Phone number is required"),
	emailAddress: yup
		.string()
		.email("Invalid email")
		.required("Email is required"),
	saveInfo: yup.boolean(),
	shipToDifferentAddress: yup.boolean(),
	receiverFirstName: yup.string().when("shipToDifferentAddress", {
		is: true,
		then: (schema) => schema.required("Receiver's first name is required"),
		otherwise: (schema) => schema.notRequired(),
	}),
	receiverLastName: yup.string().when("shipToDifferentAddress", {
		is: true,
		then: (schema) => schema.required("Receiver's last name is required"),
		otherwise: (schema) => schema.notRequired(),
	}),
	shippingAddress: yup.string().when("shipToDifferentAddress", {
		is: true,
		then: (schema) => schema.required("Receiver's address is required"),
		otherwise: (schema) => schema.notRequired(),
	}),
	shippingTownCity: yup.string().when("shipToDifferentAddress", {
		is: true,
		then: (schema) => schema.required("Receiver's town/city is required"),
		otherwise: (schema) => schema.notRequired(),
	}),
	shippingPhoneNo: yup.string().when("shipToDifferentAddress", {
		is: true,
		then: (schema) =>
			schema.required("Receiver's phone number is required"),
		otherwise: (schema) => schema.notRequired(),
	}),
});
