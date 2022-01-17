import Category from "@util/cmd/Category";

export default new Category("dev", __filename)
	.setDisplayName("Development")
	.setDescription("Some dev tools")
	.setRestrictions("developer");