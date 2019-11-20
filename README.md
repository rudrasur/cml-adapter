This is an API based solution which converts the HTML to Markdown and vise versa.
# Tools & Technologies used
* Node JS / Expresss
* PostMan

# Steps to run application:
Step 1: Clone the project 
Step 2: Run ```npm install```
Step 3: Run ```npm start```
Step 4: Import 'cml-converter.postmap_collection.json' file into Postman tool
Step 5: Click 'Send' to test the functionality.

# Limitations
#1: This converter can paragraphs (<p>), hyperlinks (<a>), headers (h1...h6) & select menu (<select>/<option>) from HTML to Markdown language.
#2: I have used 'showdown' library to convert Markdown to HTML.