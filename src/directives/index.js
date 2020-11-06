import Vue from 'vue'

Vue.directive('focus', {
  inserted: function (el) {
    el.focus()
  }
})

Vue.directive('diablo', {
  bind (el, binding) {
    const color = {
      bone: '#e8dcc2',
      white: '#fff'
    }

    el.style.fontFamily = 'DiabloHeavy, sans-serif'

    const arg = binding.arg === 'bone' ? 'bone' : 'white'

    if (arg === 'bone') {
      el.style.color = color.bone
    } else {
      el.style.color = color.white
    }

    if (Object.keys(binding.modifiers).length > 0) {
      // Value: (`=`)
      // Valor por defecto de 'value' es 1 (Corresponde al ancho del borde en 'px')
      const value = binding.value || 1
      // Expresión con el borde, ejemplo: '1px solid white'
      const borderExp = `${value}px solid ${color[arg]}`

      // Si el modificador es 'bottom'
      if (binding.modifiers.bottom) {
        // Ponemos una linea debajo del elemento
        el.style.borderBottom = borderExp
        // Separada 10px
        el.style.paddingBottom = '10px'
      }
      // Si el modificador es 'top'
      if (binding.modifiers.top) {
        // Ponemos una linea encima del elemento
        el.style.borderTop = borderExp
        // Separada 10px
        el.style.paddingTop = '10px'
      }
    }
  }
})
