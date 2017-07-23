import AsyncTask from '../core/AsyncTask'

export default class ProcessConfirmTask extends AsyncTask {

  initialValues

  setInitialValues = (initialValues) => {
    this.initialValues = initialValues
  }

}
