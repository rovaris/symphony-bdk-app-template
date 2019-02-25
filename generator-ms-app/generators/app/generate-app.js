const GenerateRedux = require('./generate-redux');
const GenerateConfigs = require('./generate-configs');
const writeConfigs = new GenerateConfigs(this);
const writeRedux = new GenerateRedux();

class GenerateApp {
  constructor(context) {
     this.generator = context;
  }
  
  writingSRC() {
    if(this.generator.answers.appType === 'Default MS Template(REDUX)') {
      this.writingAssets();
      this.writingSass();
      this.writingComponents();
      this.writingAppHTML();
      this.writingControllerHTML();
      this.writingControllerJS();
      this.writingWithReduxAppJS();
      writeConfigs.writeConfigs();
      writeRedux.writingRedux();
    }
  }

  writingAssets() {
    this.generator.fs.copy(this.generator.templatePath('src/assets'),
      this.generator.destinationPath('src/assets')
    );
  }

  writingSass() {
    this.generator.fs.copy(
      this.generator.templatePath('src/sass'),
      this.generator.destinationPath('src/sass')
    );
  }

  writingAppHTML() {
    this.generator.fs.copyTpl(
      this.generator.templatePath('src/html/app.html'),
      this.generator.destinationPath('src/html/app.html'),
      { title: this.generator.answers.name }
    );
  }

  writingControllerHTML() {
    this.generator.fs.copy(
      this.generator.templatePath('src/html/controller.html'),
      this.generator.destinationPath('src/html/controller.html')
    );
  }

  writingComponents() {
    this.generator.fs.copy(
      this.generator.templatePath('src/components'),
      this.generator.destinationPath('src/components')
    );
  }

  writingPages() {
    this.generator.fs.copy(
      this.generator.templatePath('src/pages'),
      this.generator.destinationPath('src/page')
    );
  }

  writingRoutes() {
    this.generator.fs.copy(
      this.generator.templatePath('src/routes'),
      this.generator.destinationPath('src/routes')
    );
  }

  writingDefaultAppJS() {
    this.generator.fs.copyTpl(
      this.generator.templatePath('src/javascript/app.js'),
      this.generator.destinationPath('src/javascript/app.js'),
      { imports: 'import \'\../sass/main.scss\'\;' }
    );
  }

  writingControllerJS() {
    this.generator.fs.copy(
      this.generator.templatePath('src/javascript/controller.js'),
      this.generator.destinationPath('src/javascript/controller.js')
    )
  }

  writingWithReactAppJS() {
    this.generator.fs.copyTpl(
      this.generator.templatePath('src/javascript/app.js'),
      this.generator.destinationPath('src/javascript/app.js'),
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
    this.generator.fs.copyTpl(
      this.generator.templatePath('src/javascript/app.js'),
      this.generator.destinationPath('src/javascript/app.js'),
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
