const Clear = () => {
  document.getElementById('clear').addEventListener('click', () => {
    document.getElementById('input').value = ''
  })
}

export default Clear
