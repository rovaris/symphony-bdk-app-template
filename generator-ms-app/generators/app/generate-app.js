 class GenerateApp {

   writingAssets() {
    this.log('Entrei na function')
    this.fs.copy(this.templatePath('src/assets'),
      this.destinationPath('src/assets')
    );
  }

  writingSass() {
    this.fs.copy(
      this.templatePath('src/sass'),
      this.destinationPath('src/sass')
    );
  }

  writingAppHTML() {
    this.fs.copyTpl(
      this.templatePath('src/html/app.html'),
      this.destinationPath('src/html/app.html'),
      { title: this.answers.name }
    );
  }

  writingControllerHTML() {
    this.fs.copy(
      this.templatePath('src/html/controller.html'),
      this.destinationPath('src/html/controller.html')
    );
  }

  writingComponents() {
    this.fs.copy(
      this.templatePath('src/components'),
      this.destinationPath('src/components')
    );
  }

  writingPages() {
    this.fs.copy(
      this.templatePath('src/pages'),
      this.destinationPath('src/page')
    );
  }

  writingRoutes() {
    this.fs.copy(
      this.templatePath('src/routes'),
      this.destinationPath('src/routes')
    );
  }

  writingDefaultAppJS() {
    this.fs.copyTpl(
      this.templatePath('src/javascript/app.js'),
      this.destinationPath('src/javascript/app.js'),
      { imports: 'import \'\../sass/main.scss\'\;' }
    );
  }

  writingWithReact() {
    this.fs.copyTpl(
      this.templatePath('src/javascript/app.js'),
      this.destinationPath('src/javascript/app.js'),
      {
        imports: `
        import React from 'react';
        import ReactDOM from 'react-dom';
        import '../sass/main.scss';
        `,
        reactDOM: `
        ReactDOM.render(
            <div>
              <Routes
                userId={userId}
                jwtService={extendedUserInfoService}
              />
            </div>,
          document.getElementById('root'),
        );
        `
      }
    );
  }

  writingWithReduxAppJS() {
    this.fs.copyTpl(
      this.templatePath('src/javascript/app.js'),
      this.destinationPath('src/javascript/app.js'),
      { 
        imports:
       `import React from 'react';
        import ReactDOM from 'react-dom';
        import { Provider } from 'react-redux';
        import configureStore from '../store/store-config';
        import '../sass/main.scss';
        import Routes from '../routes/routes';'`,
        reactDOM: `
        const store = configureStore();

        ReactDOM.render(
          <Provider store={store}>
            <div>
              <Routes
                userId={userId}
                jwtService={extendedUserInfoService}
              />
            </div>
          </Provider>,
          document.getElementById('root'),
        );`
    }
    );
  }
}

module.exports = GenerateApp;
