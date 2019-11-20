const HTMLParser = require('node-html-parser');
const TurndownService = require('turndown');
const htmlToMarkdownMapping = require("./html-markdown-mapper");
const showdown  = require('showdown');

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
    const sampleResponse = getResponse();
    return [200, sampleResponse];
});

parseNode = (node, counter, markdownLines) => {
    console.log('counter: ' + counter);
    if (node !== undefined ) {
        let tagName = '';
        if (node.nodeType === 1) {
            console.log(node.tagName)
            tagName = node.tagName.toLowerCase();
            if (htmlToMarkdownMapping.hasOwnProperty(tagName)) {
                const markdownTemplate = htmlToMarkdownMapping[tagName];
                let space = "";
                for (let i=0; i<counter; i++) {
                    space = space + " ";
                }
                if (tagName === 'a') {
                    markdownLines.push(space  + parseLink(markdownTemplate, node));
                } else if (tagName === 'option') {
                    markdownLines.push(space  + parseOption(markdownTemplate, node));
                } else {
                    markdownLines.push(space  + markdownTemplate + node.text);
                }
            }
        } else {
            console.log(node.text)
        }
        if (node.childNodes !== undefined && node.childNodes.length > 0) {
            counter++;
            node.childNodes.forEach(element => {
                parseNode(element, counter, markdownLines, tagName);
            });
        }
        
    }

    parseOption = (template, node) => {
        let markdownText = '';
        markdownText = htmlToMarkdownMapping['option'];
        markdownText = markdownText.replace('<text>', node.text);
        let selected = node.attributes.selected === 'selected' ? 'x' : '';
        markdownText = markdownText.replace('<selected>', selected);
        return markdownText;
    }

    parseLink = (template, node) => {
        let markdownText = '';
        markdownText = htmlToMarkdownMapping['a'];
        markdownText = markdownText.replace('<value>', node.text);
        markdownText = markdownText.replace('<href>', node.attributes.href);
        return markdownText;
    }
}

getResponse = ()=> {
    const markdownContent = "# Conversion is successfull! \n More functionality to be implemented.";
    const converter = new showdown.Converter();
    return converter.makeHtml(markdownContent);
}

module.exports = { parseHtml }