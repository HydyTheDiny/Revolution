import path from "path";
import moduleAlias from "module-alias";
const d = path.resolve(`${__dirname}/../../`);
moduleAlias.addAliases({
	"@root": d,
	"@config": `${d}/src/config`,
	"@util": `${d}/src/util`,
	"@events": `${d}/src/events`,
	"@Revolt": `${d}/src/main`
});