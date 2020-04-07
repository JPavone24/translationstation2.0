import React, { Component } from "react";
import counterpart from 'counterpart'
import Translate from 'react-translate-component'
counterpart.setLocale('en');

counterpart.registerTranslations('en',{
   title: 'Title',
   copy: {
       p1: 'p with <b>html</b> inside',
       p2: 'p with clickable %(link)s'
   },
   link: 'Link'
})


const Link = (props)=>{
  return(
    <Translate
    content = {props.content}
    component = 'a' href = '//google.com'
    target = '_blank'
    />
  )
}

class App extends Component {
  render() {
    const link = <Link content = "link" />
    return (  
      <div>
        <Translate content = 'title' component = 'h1'></Translate>
        <Translate content = 'copy.p1' component = 'p'unsafe = {true}></Translate>
        <Translate content = 'copy.p2' component = 'p' with = {{link}}></Translate>
       <input type = 'text' placeholder = 'input placeholder'></input>
      </div>
    );
  }
}
export default App;