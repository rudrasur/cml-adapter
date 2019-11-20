const HTMLParser = require('node-html-parser');
const TurndownService = require('turndown');
const htmlToMarkdownMapping = require("./html-markdown-mapper");

parseHtml = (htmlContent => {

    const rootElement = HTMLParser.parse(htmlContent);
    if (rootElement.firstChild === undefined) {
        return [400, 'Invalid HTML data.']
    }
    const markdownLines = new Array();


    if (rootElement.childNodes !== undefined && rootElement.childNodes.length > 0) {
        rootElement.childNodes.forEach(node => {
            parseNode(node, 0, markdownLines, '');
        })
    }

    console.log('***********************RESULT: START************************');
    markdownLines.forEach( ele => {
        console.log(ele);
    })
    console.log('***********************RESULT: END************************');

    console.log("Its invoked.");
    return [200, 'It is working'];
});

parseNode = (node, counter, markdownLines) => {
    console.log('counter: ' + counter);
    if (node !== undefined ) {
        let tagName = '';
        if (node.nodeType === 1) {
            console.log(node.tagName)
            tagName = node.tagName.toLowerCase();
        } else {
            console.log(node.text)
        }
        if (node.childNodes !== undefined && node.childNodes.length > 0) {
            counter++;
            node.childNodes.forEach(element => {
                parseNode(element, counter, markdownLines, tagName);
            });
        }
        if (tagName !== '' && htmlToMarkdownMapping.hasOwnProperty(tagName)) {
            const markdownTemplate = htmlToMarkdownMapping[tagName];
            let space = "";
            for (let i=0; i<counter; i++) {
                space = space + " ";
            }
            if (tagName === 'a') {

                markdownLines.push(space  + parseLink(markdownTemplate, node));
            } else {
                markdownLines.push(space  + markdownTemplate + node.text);
            }
        }
    }

    parseOption = (template, node) => {
        let markdownText = '';
        
        return markdownText;
    }

    parseLink = (template, node) => {
        let markdownText = '';
        return markdownText;
    }
}

module.exports = { parseHtml }