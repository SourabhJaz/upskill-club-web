const _ = require('lodash');
const fs = require('fs');

const path = '/Users/sourabhjajoria/Documents/upskill_design/dummy.json';

const getHeadingLevelText = (text) => {
    return `# ${text} \\\\`;
};

const getFirstLevelText = (text) => {
    if (text.length > 26) return ` ${text} \\\\`;
    return `## ${text} \\\\`;
};

const getSecondLevelText = (text) => {
    return `- ${text} \\\\`;
};

const getThirdLevelText = (text) => {
    return `    - ${text} \\\\`;
};

const getHyperLinkText = (text) => {
    const splitText = _.split(text, 'https://');
    return `    - [${splitText[0]}](https://${splitText[1]}) \\\\`
}

const getJSCode = (text) => {
    const splitText = _.split(text, '; ');
    const codeStr = '```javascript \\\\ ' + splitText.join('; \\\\') + '\\\\ ``` \\\\';
    return codeStr;
};

const getJSON = (text) => {
    const splitText = _.split(text, ',');
    const codeStr = '```json \\\\ ' + splitText.join(', \\\\') + '\\\\ ``` \\\\';
    return codeStr;
};


const parseDescription = ({ title, image_url, description }) => {
    const componentList= [];
    if (title)
        componentList.push(getHeadingLevelText(title));
    const words = description.split(' ');
    let index = 0,
        count = 0;
    while (index < words.length) {
        count = 0;
        let stringStart, stringEnd;
        if (words[index] == '<level_0>') {
            stringStart = index + 1;
            while (words[index] !== '</level_0>' && count < 500) {
                index++;
                count++;
            }
            stringEnd = index;
            componentList.push(getHeadingLevelText(words.slice(stringStart, stringEnd).join(' ')));
        }
        if (words[index] == '<level_1>') {
            stringStart = index + 1;
            while (words[index] !== '</level_1>' && count < 500) {
                index++;
                count++;
            }
            stringEnd = index;
            componentList.push(getFirstLevelText(words.slice(stringStart, stringEnd).join(' ')));
        } else if (words[index] == '<level_2>') {
            stringStart = index + 1;
            while (words[index] !== '</level_2>' && count < 500) {
                index++;
                count++;
            }
            stringEnd = index;
            componentList.push(getSecondLevelText(words.slice(stringStart, stringEnd).join(' ')));
        } else if (words[index] == '<level_3>') {
            stringStart = index + 1;
            while (words[index] !== '</level_3>' && count < 500) {
                index++;
                count++;
            }
            stringEnd = index;
            componentList.push(getThirdLevelText(words.slice(stringStart, stringEnd).join(' ')));
        } else if (words[index] == '<level_4>') {
        stringStart = index + 1;
            while (words[index] !== '</level_4>' && count < 500) {
                index++;
                count++;
            }
            stringEnd = index;
            componentList.push(getThirdLevelText(words.slice(stringStart, stringEnd).join(' ')));
        } else if (words[index] == '<href>') {
            stringStart = index + 1;
            while (words[index] !== '</href>') {
                index++;
                count++;
            }
            stringEnd = index;
            componentList.push(getHyperLinkText(words.slice(stringStart, stringEnd).join(' ')));
        }
        else if (words[index] == '```javascript') {
            stringStart = index + 1;
            while (words[index] !== '```') {
                index++;
                count++;
            }
            stringEnd = index;
            componentList.push(getJSCode(words.slice(stringStart, stringEnd).join(' ')));
        }
        else if (words[index] == '```json') {
            stringStart = index + 1;
            while (words[index] !== '```') {
                index++;
                count++;
            }
            stringEnd = index;
            componentList.push(getJSON(words.slice(stringStart, stringEnd).join(' ')));
        }
        index++;
    }
    if (image_url)
        componentList.push(`![Image](${image_url}) \\\\`);
    return componentList.join(' ');
};

fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
        console.error('Error while reading the file:', err);
        return;
    }
    try {
        const jsonData = JSON.parse(data);
        const outputJSONData = [];
        const keyedSession = _.groupBy(jsonData, 'fields.session');
        for (key in keyedSession) {
            const descriptionList = _.map(keyedSession[key], (model) => {
                return parseDescription(model.fields);
            });
            outputJSONData.push({
                model: "api.concept",
                pk: keyedSession[key][0].pk,
                fields: {
                    session: Number(key),
                    title: null,
                    image_url: null,
                    description: descriptionList.join(' ')
                }
            })
        }
        const jsonString = JSON.stringify(outputJSONData, null, 2);
        fs.writeFile('formatted_model.json', jsonString, (err) => {
            if (err) {
                console.error('Error writing file:', err);
            } else {
                console.log('Successfully wrote file');
            }
        });
    } catch (parseErr) {
        console.error('Error while parsing JSON data:', parseErr);
    }
});
