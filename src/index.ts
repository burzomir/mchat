import '../assets/scss/index.scss'

const createHelloWorld = () => {
  const h1 = document.createElement('h1')
  h1.innerText = 'Hello world!'
  return h1
}

document.body.appendChild(createHelloWorld())
