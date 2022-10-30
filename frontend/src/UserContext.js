import React from 'react';


// Create a Context Object
// A context object as the name suggests is a data type of an object that can be used to store information that can be shared to other components within the app.
// Context object is a different approach to passing information between components and it allows us to have easier access by avoiding the use of prop-drilling.
const UserContext = React.createContext()

// The "Provider" component allows other components to consume/use the context object and supply the nessary information needed to the context object.
export const UserProvider = UserContext.Provider

export default UserContext;