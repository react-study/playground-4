import React from 'react';

class Comp extends React.Component {
  handleClick(e) {
     console.dir(e);
     console.dir(e.nativeEvent);
     console.log('bubbles :', e.bubbles);
     console.log('cancelable :', e.cancelable);
     console.log('defaultPrevented :', e.defaultPrevented);
     console.log('isDefaultPrevented :', e.isDefaultPrevented());
     console.log('isPropagationStopped :', e.isPropagationStopped());
     console.log('eventPhase :', e.eventPhase);
     console.log('isTrusted :', e.isTrusted);


     console.log('target :', e.target);
     console.log('timeStamp :', e.timeStamp);
     console.log('type :', e.type);
     e.preventDefault();
     e.stopPropagation();
     console.log('defaultPrevented :', e.defaultPrevented);
     console.log('isDefaultPrevented :', e.isDefaultPrevented());
     console.log('isPropagationStopped :', e.isPropagationStopped());
   }
   render() {
     return <div onClick={this.handleClick.bind(this)}
       style={{
         width: 100,
         height: 100,
         border: '1px solid #000'
       }}
     />
   }
}

export default Comp;
