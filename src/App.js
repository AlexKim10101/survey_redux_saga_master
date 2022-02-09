import SurveyView from './pages/SurveyView'
import { initialState } from './data/surveyData'

function App() {

  const pages = initialState.pages

  return (
    <div>
      <SurveyView pages={pages}/>
    </div>
  );
}

export default App;
