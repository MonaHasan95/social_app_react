// NOTE:
// This is a simplified reconstruction of how React Hook Form's handleSubmit works internally.
// The real source code is more complex, but the flow and responsibilities are represented here.
// Every comment explains the line directly below it.


// "const" creates a variable that cannot be reassigned later.
// The variable name is "handleSubmit".
// The value stored inside it is an arrow function.
const handleSubmit = (onValid, onInvalid) => {

  // handleSubmit receives two parameters:
  //
  // 1) onValid:
  //    A function that should run when the form data passes validation.
  //
  //    In your code:
  //
  //    handleSubmit(saveValues)
  //
  //    means:
  //
  //    onValid = saveValues
  //
  //    The function itself is passed.
  //    It is NOT executed yet.
  //
  //
  // 2) onInvalid:
  //    A second optional function.
  //    It would run if validation fails.
  //
  //    Example:
  //
  //    handleSubmit(saveValues, showErrors)
  //
  //    would mean:
  //
  //    onValid = saveValues
  //    onInvalid = showErrors


  // handleSubmit returns another function.
  //
  // Why?
  //
  // Because your form needs this:
  //
  // <form onSubmit={someFunction}>
  //
  // React expects a function that it can call later.
  //
  // So handleSubmit creates the actual submit handler and gives it back.
  return async (event) => {


    // "event" is the submit event object created by the browser.
    //
    // When the user clicks submit:
    //
    // Browser creates something like:
    //
    // event = {
    //    type: "submit",
    //    target: formElement,
    //    preventDefault: function,
    //    ...
    // }
    //
    // React passes this object automatically to this function.


    // Checks if the event exists.
    //
    // This prevents errors if this function is called manually
    // without a browser event.
    if (event) {


      // Calls the preventDefault method that exists inside the event object.
      //
      // Without this:
      //
      // <form>
      // submit
      // reload page
      //
      // With this:
      //
      // submit
      // stay on the same React page
      //
      // The function belongs to the browser event object.
      event.preventDefault();


      // Optional chaining:
      //
      // event.persist?.()
      //
      // means:
      //
      // "If persist exists, call it."
      //
      // Equivalent:
      //
      // if(event.persist){
      //    event.persist();
      // }
      //
      // Older React versions reused event objects.
      // persist() kept the event available after async operations.
      event.persist?.();

    }


    // Creates a new object called fieldValues.
    //
    // The data comes from formValues.
    //
    // formValues is internal data stored by React Hook Form.
    //
    // Example:
    //
    // formValues = {
    //    email: "test@test.com",
    //    password: "123456"
    // }
    //
    // The spread operator (...) copies every property.
    //
    // Result:
    //
    // fieldValues = {
    //    email: "test@test.com",
    //    password: "123456"
    // }
    //
    // It creates a copy instead of directly modifying the original object.
    let fieldValues = {
      ...formValues
    };


    // Calls a function that updates the form state.
    //
    // setSubmitting comes from the form library's internal state management.
    //
    // It changes:
    //
    // Before:
    //
    // isSubmitting = false
    //
    // After:
    //
    // isSubmitting = true
    //
    // This tells the application:
    // "The user submitted the form and processing has started."
    setSubmitting(true);


    // Calls the validation function.
    //
    // validate is responsible for checking the form data.
    //
    // The data passed into validate comes from:
    //
    // fieldValues
    //
    // Example:
    //
    // validate({
    //    email: "test@test.com",
    //    password: "123456"
    // })
    //
    //
    // "await" means:
    //
    // Pause here until validation finishes.
    //
    // Validation might be asynchronous because it could:
    //
    // - check rules
    // - run custom validators
    // - wait for another process
    //
    // The returned result is stored in validationResult.
    const validationResult = await validate(fieldValues);


    // Reads the isValid property from validationResult.
    //
    // Example successful result:
    //
    // validationResult = {
    //    isValid: true,
    //    errors: {}
    // }
    //
    // Example failed result:
    //
    // validationResult = {
    //    isValid: false,
    //    errors: {
    //       email: "Invalid email"
    //    }
    // }
    //
    // If isValid is true, continue to the success path.
    if (validationResult.isValid) {


      // Calls the function received earlier as onValid.
      //
      // Remember:
      //
      // handleSubmit(saveValues)
      //
      // made:
      //
      // onValid = saveValues
      //
      //
      // Therefore this:
      //
      // onValid(fieldValues, event)
      //
      // becomes:
      //
      // saveValues(fieldValues, event)
      //
      //
      // fieldValues becomes the "values" parameter in your function:
      //
      // function saveValues(values){
      //
      // }
      //
      // So:
      //
      // values = fieldValues
      //
      await onValid(fieldValues, event);


    } else {


      // This block runs only when validation fails.
      //
      // Example:
      //
      // email is empty
      // password is too short
      //
      // validationResult.isValid === false


      // Checks whether the developer provided an error callback.
      //
      // Example:
      //
      // handleSubmit(saveValues, showErrors)
      //
      // would make:
      //
      // onInvalid = showErrors
      //
      // In your code:
      //
      // handleSubmit(saveValues)
      //
      // means:
      //
      // onInvalid is undefined
      //
      // so this block is skipped.
      if (onInvalid) {


        // Calls the error handling function.
        //
        // The data passed comes from validationResult.errors.
        //
        // Example:
        //
        // {
        //    email: "Required"
        // }
        //
        // becomes:
        //
        // showErrors(errors)
        await onInvalid(validationResult.errors, event);

      }

    }


    // Updates submitting state again.
    //
    // The submission process is finished.
    //
    // Before:
    //
    // isSubmitting = true
    //
    // After:
    //
    // isSubmitting = false
    //
    // The application can now allow another submission.
    setSubmitting(false);

  };

};
//------------------------------------------------------------------------------------------
//This is the complete execution path:
// Your code:
<form onSubmit={handleSubmit(saveValues)}>


// Step 1:
// saveValues is passed into handleSubmit
//
// onValid = saveValues


// Step 2:
// handleSubmit creates and returns a new function


// Step 3:
// React attaches that returned function:
//
// <form onSubmit={returnedFunction}>


// Step 4:
// User submits form


// Step 5:
// returnedFunction(event) runs


// Step 6:
// It prevents page refresh


// Step 7:
// It gets the form values


// Step 8:
// It validates the values


// Step 9:
// If valid:
//
// saveValues(values)


// Step 10:
// Your code runs:
//
// axios.post(url, values)