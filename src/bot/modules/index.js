// $ID: index.js, 17 Jan 2018, 15:57, Leonid 'n3o' Knyazev $

import npm from 'npm';
import path from 'path';

class Modules {
    /**
     * @constructor
     */
    constructor(bot) {
        this.bot = bot;

        this.params = {
            path: '../../modules'
        };

        this.checked = [];
        this.modules = {};
    }


    /**
     * @preload
     */
    async preload(modules) {
        this.bot.log.info('Checking modules dependencies...');

        const deps = {}; // Modules with dependencies for install
        const mods = Object.keys(modules); // Modules names to check

        // trying to load modules
        // if module loading invoke exception, the check this module dependencies
        // if module dependencies exists, the add it to packages array for install
        mods.forEach(name => {
            const modulePath = path.join(this.params.path, name);

            try {
                require(modulePath); // eslint-disable-line global-require
                this.checked.push(name);
            } catch (error) {
                let modulePackage;
                let moduleDependencies = [];

                try {
                    modulePackage = require(path.join(modulePath, 'package.json'));
                } catch (e) {}

                if (!modulePackage) {
                    this.checked.push(name);
                } else if (modulePackage.dependencies) {
                    Object.keys(modulePackage.dependencies).forEach(deps => {
                        moduleDependencies.push(`${deps}@${modulePackage.dependencies[deps]}`);
                    });

                    if (!deps[name]) {
                        deps[name] = moduleDependencies;
                    } else {
                        deps[name] = deps[name].concat(moduleDependencies);
                    }
                }
            }
        });

        // installing dependencies via npm if needed, then resolve
        return new Promise((resolve, reject) => {
            const names = Object.keys(deps);

            if (names.length > 0) {
                this.bot.log.info('Installing modules dependencies...');

                let packages = [];

                names.forEach(name => {
                    packages = packages.concat(deps[name]);
                    this.checked.push(name);
                });

                npm.load({
                    save: false,
                    loaded: false,
                    progress: false,
                    summary: false,
                    logstream: null,
                    loglevel: 'silent'
                }, (error) => {
                    if (error) {
                        return reject(error);
                    }

                    // @LIFE-HACK
                    // backup console.log function
                    const consoleBackup = console.log;

                    // set console.log to dummy function
                    console.log = function() {};

                    npm.commands.install(packages, (error) => {
                        if (error) {
                            return reject(error);
                        }

                        // restore console.log function
                        console.log = consoleBackup;

                        return resolve();
                    });
                });
            } else {
                return resolve();
            }
        });
    }


    /**
     * @load
     */
    async load() {
        const modules = this.bot.config.get('modules');

        // Checking modules dependencies
        await this.preload(modules);

        this.bot.log.section('Loading modules...');

        Object.keys(modules).forEach(name => {
            if (!this.checked.includes(name)) {
                this.bot.log.warn(`Module '${name}' not loaded.`);
            } else {
                this.bot.log.info(`Loading '${name}' module...`);
            }
        });
    }
}

export default Modules;
