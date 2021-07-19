import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Details from '../pages/Details';

function SupportRoutes(){
  return(
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/:name" component={Details} />
        {/* <Route component={NotFound} /> */}
      </Switch>  
    </BrowserRouter>
  )
}

export default SupportRoutes;