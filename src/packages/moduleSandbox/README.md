##Simple to use form handling 

###Setup

In your app `src/modules/index.js`:

```javascript
import initModules from '@mindhive/App'
import xxxxFormModule from '@mindhive/Form/providers/xxxForm'

initModules([
  xxxFormModule,
])
```
Current providers:
* reduxForm
* ... easy to add more

###Usage
In your `SomeForm.jsx`:

```javascript
import Form from '@mindhive/Form'
import TextField from '@mindhive/Form/TextField'

...

<Form {...formProps}>
    <TextField
      name="name"
      label="Full Name"
      autoFocus
      required
    />
    <TextField
      name="email"
      email
      required
    />
</Form>
```

####Required properties for `<Form>`:
    
 ```
onSubmit:       (fields) => Promise     -- called with form values when user submits 
onCancel:       () => Promise           -- called when user cancels
initialValues:  {name: ..., email: ...} -- initial value for all fields, match 'name' attrib on fields
form:           'some-unique-key'       -- used internally
formId:         <form id={formId}>      -- optional
isNew:          is this a new entry, changes validation behavior
```   

####Things to note on `<TextField>`:
* `required` adds required validator
* `email` adds email validator and `type="email"`
* If no label, label is `name` with first cap: `name="email"` label is `Email`

* See `UserEdit` for a full example