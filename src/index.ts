import '../assets/scss/index.scss'
import createStore from './store'
const createHelloWorld = () => {
  const h1 = document.createElement('h1')
  h1.innerText = 'Hello world!'
  return h1
}

document.body.appendChild(createHelloWorld())

const store = createStore()
store.subscribe(() => console.log('store'))
