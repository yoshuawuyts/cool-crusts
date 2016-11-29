const html = require('choo/html')
const css = require('sheetify')
const choo = require('choo')

// css('tachyons')

css`
  :host .h1 {
    color: blue;
  }
  .foo {
    color: blue;
  }
`

const app = choo()
app.router(['/', mainView])
document.body.appendChild(app.start())

function mainView () {
  return html`<h1 class="f-6">hello planet</h1>`
}
