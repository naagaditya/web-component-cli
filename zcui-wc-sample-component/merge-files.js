const ejs = require('ejs');
const sass = require('node-sass');
const fs = require('fs');


function mergeFiles() {


  return {
    name: "merge-files",
    renderChunk(code) {
      const html = fs.readFileSync('./src/zcui-wc-sample-component.ejs').toString().trim();
      const style = fs.readFileSync('./src/zcui-wc-sample-component.scss').toString().trim();
      const script = fs.readFileSync('./src/zcui-wc-sample-component.js').toString().trim();

      const htmlString = ejs.render(html, {}, {});
      const styleString = sass.renderSync({
        data: style,
        outputStyle: 'compressed',
      }).css.toString();
      const scriptString = ejs.render(script, { style: styleString, html: htmlString }, {});

      // fs.writeFileSync('./dist/bundle.js', scriptString);
      return scriptString;
    },
  };
}

export default mergeFiles;
