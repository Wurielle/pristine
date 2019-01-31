# Pristine
## Dev Requirements
* [Node.js](https://nodejs.org/en/) (^8.0.0 or latest LTS)
   * If you already have Node.js installed, you can check your version using `node -v`
* NPM (Comes with Node.js)
* Windows Build Tools
    * Launch Windows PowerShell **AS ADMINISTRATOR**
    * Run `npm install --global --production windows-build-tools` in Windows PowerShell
        * **NOTE**: This will install Python [which might be required by some node modules](https://github.com/nodejs/node-gyp/issues/809#issuecomment-399698406) so it's always a good idea to have at least a version of `windows-build-tools`

## Create A New Project Based On Pristine
Select the script type you want to use depending on the type of project you want to have.  
For instance, if you want to setup a vue-cli pristine project you'd use `pristine/scripts/install vue-cli` or if you want to setup an Electron/NativeScript pristine project, you'd use `pristine/scripts/install vue-cli-app`

Available project types:  

| Project Type  | Description      |
|---------------|------------------|
| vue-cli       | Vue CLI Project  |
| vue-cli-symfony-4 | Vue CLI in a Symfony 4 Project  |
| vue-cli-app | Vue CLI with Electron and NativeScript  |

Add Pristine as a submodule or download and unzip it inside your project:
```bash
git submodule add https://github.com/Wurielle/pristine.git
```

Launch the setup:
```bash
# install shelljs at least once before using the script
npm i shelljs
node pristine/scripts/install PROJECT_TYPE
```

Add to your `src/main.ts` file:
```javascript
import '@config/theme.js';
import '@/styles/main.scss';
```

