// bundle.config.js 
module.exports = {
  bundle: {
    main: {
      scripts: [
        './app/app.js',
        './app/js/baz.js'
      ],
      styles: './content/**/*.css'
    },
    vendor: {
      scripts: './bower_components/angular/angular.js'
    }
  },
  copy: './content/**/*.{png,svg}'
};