import { Notify } from 'quasar'

export const utils = {
  'notify': {
    'error': (msg) => {
      Notify.create({
        color: 'negative',
        position: 'bottom',
        message: msg,
        icon: 'report_problem'
      })
    },
    'warn': (msg) => {
      Notify.create({
        color: 'warning',
        position: 'bottom',
        message: msg,
        icon: 'warning'
      })
    },
    'success': (msg) => {
      Notify.create({
        color: 'positive',
        position: 'bottom',
        message: msg,
        icon: 'done'
      })
    }
  },

  'hasRoles': (roles) => {
    let roleUser = localStorage.getItem('user-role')
    return roles.indexOf(roleUser) != -1
  }
}

export default ({ Vue }) => {
  Vue.prototype.$utils = utils
}
