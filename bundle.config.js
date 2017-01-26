// bundle.config.js 
module.exports = {
  bundle: {
    main: {
      scripts: [
        './app/app.js',
        './app/core/core.module.js',
        './app/core/diagnostic-test/diagnostic-test.module.js',
        './app/core/diagnostic-test/diagnostic-test.service.js',
        './app/core/header/header.component.js',
        './app/app.module.js',
        './app/app.config.js',
        './app/app.animations.js',
        './app/online-test/online-test.module.js',
        './app/online-test/online-test.component.js',
        './app/online-test/attempt.component.js',
        './app/online-test/result.component.js'
      ],
      styles: './content/**/*.css'
    },
    vendor: {
      scripts: './bower_components/angular/angular.js'
    }
  },
  copy: './content/**/*.{png,svg}'
};