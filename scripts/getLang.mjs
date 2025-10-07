
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


class GetLang {
    languages = ['ar', 'en']
    files = []
    strings = []

    // constractor to fire functions
    constructor () {
        this.getAllFiles()
        this.getAllLangFromFiles()
        // this.getDataFromMnue()
        this.addParamsToEachLang()
    }

    // get all files in folder
    getFolderFiles (path) {
        // loop in all files in folder
        const files =  fs.readdirSync(path)

        files.forEach((file) => {
            // if type == file push
            if (fs.lstatSync(path + '/' + file).isFile()) {
                this.files.push(path + '/' + file)
            } 
            // else call folder fliels again
            else if (fs.lstatSync(path + '/' + file).isDirectory()) {
                this.getFolderFiles(path + '/' + file)
            }
        })
    }


    // get all files content from app and components
    getAllFiles () {
        // get path to files
        const appPath = path.join(__dirname, '../app')
        const componentsPath = path.join(__dirname, '../components')
        
        // get all folder files from both directories
        this.getFolderFiles(appPath)
        this.getFolderFiles(componentsPath)
    }

    // get all lang params from files
    getAllLangFromFiles () {
        this.files.forEach((file) => {
            // Skip non-JS/TS files
            if (!file.endsWith('.js') && !file.endsWith('.jsx') && !file.endsWith('.ts') && !file.endsWith('.tsx')) {
                return;
            }

            // read file data
            const fileData = fs.readFileSync(file).toString()
            
            // Helper function to filter unwanted characters
            const isValidString = (str) => {
                // Remove unwanted characters and check if string is valid
                const cleanStr = str.trim();
                if (!cleanStr || cleanStr.length === 0) return false;
                
                // Check for unwanted characters
                const unwantedChars = /[{}./|)\s]/;
                if (unwantedChars.test(cleanStr)) return false;
                
                // Check if string contains only unwanted characters or is too short
                if (cleanStr.length < 2) return false;
                
                return true;
            };

            // Extract t() function calls with single quotes
            let regexp = /t\(\'([^']+)\'\)/g;
            let matches = fileData.matchAll(regexp);
            for (const match of matches) {
                const string = match[1].trim();
                if (isValidString(string) && !this.strings.includes(string)) {
                    this.strings.push(string);
                }
            }

            // Extract t() function calls with double quotes
            regexp = /t\(\"([^"]+)\"\)/g;
            matches = fileData.matchAll(regexp);
            for (const match of matches) {
                const string = match[1].trim();
                if (isValidString(string) && !this.strings.includes(string)) {
                    this.strings.push(string);
                }
            }

            // Extract t() function calls with template literals
            regexp = /t\(`([^`]+)`\)/g;
            matches = fileData.matchAll(regexp);
            for (const match of matches) {
                const string = match[1].trim();
                if (isValidString(string) && !this.strings.includes(string)) {
                    this.strings.push(string);
                }
            }

            // Extract useTranslations() calls
            regexp = /useTranslations\(['"`]([^'"`]+)['"`]\)/g;
            matches = fileData.matchAll(regexp);
            for (const match of matches) {
                const string = match[1].trim();
                if (isValidString(string) && !this.strings.includes(string)) {
                    this.strings.push(string);
                }
            }

            // Extract label props
            regexp = /label=\{t\(['"`]([^'"`]+)['"`]\)\}/g;
            matches = fileData.matchAll(regexp);
            for (const match of matches) {
                const string = match[1].trim();
                if (isValidString(string) && !this.strings.includes(string)) {
                    this.strings.push(string);
                }
            }

            // Extract placeholder props
            regexp = /placeholder=\{t\(['"`]([^'"`]+)['"`]\)\}/g;
            matches = fileData.matchAll(regexp);
            for (const match of matches) {
                const string = match[1].trim();
                if (isValidString(string) && !this.strings.includes(string)) {
                    this.strings.push(string);
                }
            }

            // Extract title props
            regexp = /title=\{t\(['"`]([^'"`]+)['"`]\)\}/g;
            matches = fileData.matchAll(regexp);
            for (const match of matches) {
                const string = match[1].trim();
                if (isValidString(string) && !this.strings.includes(string)) {
                    this.strings.push(string);
                }
            }

            // Extract validation messages
            regexp = /\.required\(t\(['"`]([^'"`]+)['"`]\)\)/g;
            matches = fileData.matchAll(regexp);
            for (const match of matches) {
                const string = match[1].trim();
                if (isValidString(string) && !this.strings.includes(string)) {
                    this.strings.push(string);
                }
            }

            // Extract min/max validation messages
            regexp = /\.min\(\d+,\s*t\(['"`]([^'"`]+)['"`]\)\)/g;
            matches = fileData.matchAll(regexp);
            for (const match of matches) {
                const string = match[1].trim();
                if (isValidString(string) && !this.strings.includes(string)) {
                    this.strings.push(string);
                }
            }

            regexp = /\.max\(\d+,\s*t\(['"`]([^'"`]+)['"`]\)\)/g;
            matches = fileData.matchAll(regexp);
            for (const match of matches) {
                const string = match[1].trim();
                if (isValidString(string) && !this.strings.includes(string)) {
                    this.strings.push(string);
                }
            }

            // Extract matches validation messages
            regexp = /\.matches\([^,]+,\s*t\(['"`]([^'"`]+)['"`]\)\)/g;
            matches = fileData.matchAll(regexp);
            for (const match of matches) {
                const string = match[1].trim();
                if (isValidString(string) && !this.strings.includes(string)) {
                    this.strings.push(string);
                }
            }
        })
    }

    // add all params to each lang fill
    addParamsToEachLang () {
        console.log(`Found ${this.strings.length} translation strings:`);
        console.log(this.strings);
        
        // loop in languages
        this.languages.forEach(lang => {
            // get file name
            const file =  __dirname + '/../messages/' + lang + '.json'
            // get language params
            const langData = JSON.parse(fs.readFileSync(file).toString())
            let addedCount = 0;
            
            // loop in strings 
            this.strings.forEach(string => {
                // if string not exist add to file
                if (typeof langData[string] == 'undefined') {
                    langData[string] = ""
                    addedCount++;
                }
            })
            
            console.log(`Added ${addedCount} new strings to ${lang}.json`);
            
            // add data to file
            if (lang != "en") {
                this.addToFile(file, langData)
            } else {
                this.addToFileKeyVal(file, langData)
            }
            
        })
    }

    addToFile (file, langData) {
        // start string
        let stringData = "{\n"
        // loop in object and build string
        let counter = 1
        for (var k in langData) {
            stringData+=`  "${k}": "${langData[k]}"${counter < Object.keys(langData).length ? "," : ""}\n`
            counter++
        }

        // end string
        stringData+= "}"
        // add string to file
        fs.writeFileSync(file, stringData);
    }


    addToFileKeyVal(file, langData) {
        // start string
        let stringData = "{\n"
        // loop in object and build string
        let counter = 1
        for (var k in langData) {
            stringData+=`   "${k}": "${langData[k] ? langData[k] : k}"${counter < Object.keys(langData).length ? "," : ""}\n`
            counter++
        }

        // end string
        stringData+= "}"
        // add string to file
        fs.writeFileSync(file, stringData);
    }
    
    // getDataFromMnue () {
    //     // get file name
    //     const file =  __dirname + '/../src/components/menu.vue'
    //     // read file data
    //     const fileData = fs.readFileSync(file).toString()
    //     // get data from file
    //     let regexp = /title: \'[a-zA-Z0-9_ ]*\'/g;
        

    //     let matches = fileData.matchAll(regexp);
    //     // push it to our file
    //     for (const match of matches) {
    //         const string = match[0].slice(8, -1)
    //         if (!this.strings.includes(string)) this.strings.push(string)
    //     }

    //     // get data from file
    //     regexp = /title: \"[a-zA-Z0-9_ ]*\"/g;
        

    //     matches = fileData.matchAll(regexp);
    //     // push it to our file
    //     for (const match of matches) {
    //         const string = match[0].slice(8, -1)
    //         if (!this.strings.includes(string)) this.strings.push(string)
    //     }
    // }
}


new GetLang()