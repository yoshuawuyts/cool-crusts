const html = require('choo/html')
const css = require('sheetify')
const choo = require('choo')

css('tachyons')

const app = choo()
app.router(['/', mainView])
document.body.appendChild(app.start())

function mainView () {
  return html`<h1 class="f-6">hello planet</h1>`
}
