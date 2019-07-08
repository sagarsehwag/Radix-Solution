permission = {
	medicine: {
		default: true,
		ot: true,
		lr: true,
		nursing: true,
		casuality: true
	},
	operations: {
		default: false
	}
};

console.log(permission["medicine"]["ot"]);
