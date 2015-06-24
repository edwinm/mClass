// To minify, make sure the latest Java JDK is installed.

module.exports = function (grunt) {
	grunt.initConfig({
		//pkg: grunt.file.readJSON('package.json'),
		'closure-compiler': {
			frontend: {
				//closurePath: 'node_modules/closure-compiler/lib/vendor',
				closurePath: 'closure-compiler',
				js: 'mclass.js',
				jsOutputFile: 'mclass-min.js',
				maxBuffer: 500,
				options: {
					compilation_level: 'SIMPLE_OPTIMIZATIONS',
					language_in: 'ECMASCRIPT5_STRICT',
					warning_level: 'QUIET'
				}
			}
		},
		'watch': {
			files: ['jquery.animate-colors.js'],
			tasks: ['closure-compiler']
		}
	});

	grunt.loadNpmTasks('grunt-closure-compiler');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['closure-compiler']);
};