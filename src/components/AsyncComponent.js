import React, {Component} from 'react';

export default function asyncComponent(importComponent) {
  class AsyncComponent extends Component{
    constructor(props){
      super(props);
      this.state = {
        component: null
      }
    }

    // this are promises as it's in .then function from App.js in onRouteChange
    async componentDidMount(){

      // default component is a destructor from App.js in onRouteChange
      // From the imported's component (Page1-3), we grab its component, component's default
      // and add to the sate
      // if use {component} format, setState should be component: component.default
      const {default: component} = await importComponent();
      this.setState({
        component: component
      })
    }

    render(){
      const Component = this.state.component;
      // If there is a component(Page1-3), pass down that component 
      // and any props that it may have
      // Otherwise, return null
      return Component? <Component {...this.props}/> : null;
    }
  }

  return AsyncComponent;
}