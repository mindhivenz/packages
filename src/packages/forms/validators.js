
export const join = rules =>
  (value, data) =>
    rules
      .map(rule => rule(value, data))
      .filter(error => !! error)[0]/* first error */

export const createFormValidator = rules =>
  (data = {}) => {
    const errors = {}
    Object.keys(rules).forEach((key) => {
      // concat enables both functions and arrays of functions
      const rule = join([].concat(rules[key]))
      const error = rule(data[key], data)
      if (error) {
        errors[key] = error
      }
    })
    return errors
  }

export const isEmpty = value =>
value === undefined ||
value === null ||
value === ''


export const words = (value) => {
  if (! isEmpty(value) && ! /^\s*[A-Z]+(?:\s+[A-Z]+)*\s*$/i.test(value)) {
    return 'Please enter letters or spaces only'
  }
  return null
}

export const alphaNumeric = (value) => {
  if (! isEmpty(value) && ! /^[\w]+$/i.test(value)) {
    return 'Please enter letters or numbers only'
  }
  return null
}

export const email = (value) => {
  if (! isEmpty(value) && ! /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return 'Invalid email address'
  }
  return null
}

export const required = (value) => {
  if (isEmpty(value)) {
    return 'Required'
  }
  return null
}

export const ifField = (field, validator) =>
  (value, data) =>
    data[field] ? validator(value, data) : null

export const requiredIf = field =>
  ifField(field, required)

export const minLength = min =>
  (value) => {
    if (! isEmpty(value) && value.length < min) {
      return `Must be at least ${min} characters`
    }
    return null
  }

export const maxLength = max =>
  (value) => {
    if (! isEmpty(value) && value.length > max) {
      return `Must be no more than ${max} characters`
    }
    return null
  }

export const integer = (value) => {
  if (! Number.isInteger(Number(value))) {
    return 'Must be an integer'
  }
  return null
}

export const oneOf = enumeration =>
  (value) => {
    if (enumeration.indexOf(value) === -1) {
      return `Must be one of: ${enumeration.join(', ')}`
    }
    return null
  }

export const uniqueName = (namesToAvoid, nameLabel = 'name', entityLabel = null) => {
  const searchNames = namesToAvoid.map(n => n.toLowerCase())
  return (value) => {
    if (value) {
      if (searchNames.indexOf(value.toLowerCase()) !== -1) {
        return entityLabel ?
          `Another ${entityLabel} already has this ${nameLabel}`
          : `That ${nameLabel} is already taken`
      }
    }
    return null
  }
}

export const match = field =>
  (value, data) => {
    if (data) {
      if (value !== data[field]) {
        return 'Do not match'
      }
    }
    return null
  }

const contains = (count, pattern, label) => (value) => {
  if (! isEmpty(value) && ! new RegExp(`(?=.*[${pattern}]{${count},})`, 'g').test(value)) {
    return `Please include ${count > 1 ? 
      `at least ${count} ${label}${label.endsWith('s') ? 'es' : 's'}` 
      : `a ${label}`
    }`
  }
  return null
}

export const containsUpper = count =>
  contains(count, 'A-Z', 'uppercase letter')

export const containsLower = count =>
  contains(count, 'a-z', 'lowercase letter')

export const containsNumber = count =>
  contains(count, '0-9', 'number')
