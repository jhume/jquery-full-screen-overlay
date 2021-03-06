module.exports = function(grunt) {

	grunt.initConfig({

		// Import package manifest
		pkg: grunt.file.readJSON("package.json"),

		// Banner definitions
		meta: {
			banner: "/*\n" +
				" *  <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n" +
				" *  <%= pkg.description %>\n" +
				" *  <%= pkg.homepage %>\n" +
				" *\n" +
				" *  Made by <%= pkg.author.name %>\n" +
				" *  Under <%= pkg.license %> License\n" +
				" */\n"
		},

		// Concat definitions
		concat: {
			options: {
				banner: "<%= meta.banner %>"
			},
			dist: {
				src: ["src/jquery.fullScreenOverlay.js"],
				dest: "dist/jquery.fullScreenOverlay.js"
			},
			distcss: {
				src: ["src/css/jquery.fullScreenOverlay.css"],
				dest: "dist/css/jquery.fullScreenOverlay.css"
			}
		},

		// Lint definitions
		jshint: {
			files: ["src/jquery.fullScreenOverlay.js", "test/**/*"],
			options: {
				jshintrc: ".jshintrc"
			}
		},

		// Minify definitions
		uglify: {
			my_target: {
				src: ["dist/jquery.fullScreenOverlay.js"],
				dest: "dist/jquery.fullScreenOverlay.min.js"
			},
			options: {
				banner: "<%= meta.banner %>"
			}
		},

		// CSS minify.
		cssmin: {
			target: {
				files: [{
					expand: true,
					src: ['*.css', '!*.min.css'],
					cwd: 'src/css',
					dest: 'dist/css',
					ext: '.min.css'
				}]
			}
		},

		// CoffeeScript compilation
		coffee: {
			compile: {
				files: {
					"dist/jquery.fullScreenOverlay.js": "src/jquery.fullScreenOverlay.coffee"
				}
			}
		},

		// karma test runner
		karma: {
		  unit: {
		    configFile: "karma.conf.js",
				background: true,
				singleRun: false,
				browsers: ["PhantomJS", "Firefox"]
		  },
		  //continuous integration mode: run tests once in PhantomJS browser.
		  travis: {
		    configFile: "karma.conf.js",
		    singleRun: true,
		    browsers: ["PhantomJS"]
		  },
		},

		// watch for changes to source
		// Better than calling grunt a million times
		// (call 'grunt watch')
		watch: {
	    files: ["src/*", "test/**/*", "src/css/*"],
	    tasks: ["default"]
		}

	});

	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-cssmin");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-coffee");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-karma");

	grunt.registerTask("travis", ["jshint", "karma:travis"]);
	grunt.registerTask("build", ["concat", "uglify"]);
	grunt.registerTask("default", ["jshint", "build", "karma:unit:run"]);
};
