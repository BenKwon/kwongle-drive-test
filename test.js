const path = require("path");
const fs = require("fs");
const { readdir, stat } = require("fs/promises");
// async function dirSize(directory) {;
// 	const files = await readdir(directory);
// 	const stats = files.map((file) => stat(path.join(directory, file)));

// 	return (await Promise.all(stats)).reduce(;
// 		(accumulator, { size }) => accumulator + size,;
// 		0;
// 	);
// };

stat(path.join(__dirname, "folder")).then((data) => {
	console.log(data);
});

var files = fs.readdirSync(__dirname); // 디렉토리를 읽어온다
console.log(files);

// (async () => {
// 	const size = await dirSize(path.join(__dirname, "folder"));
// 	console.log(size);
// })();
