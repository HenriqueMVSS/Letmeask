import logoImg from '../assets/images/logo.svg'
import { Button } from '../components/Button'
import { RoomCode } from '../components/RoomCode'
import deleteImg from '../assets/images/delete.svg'
import {useHistory, useParams} from 'react-router-dom'
import "../styles/button.scss"
import "../styles/room.scss"

//import { useAuth } from '../hooks/useAuth'
import { Question } from '../components/Question'
import { useRoom } from '../hooks/useRoom'
import { database } from '../services/firebase'

type RoomParams = {
  id: string;
}

export function AdminRoom(){
// const {user} = useAuth()
const params = useParams<RoomParams>()

const history = useHistory();
const roomId = params.id;
const { title, questions} = useRoom(roomId)

async function handleDeleteQuestion(questionId: string) {
  // metodo javascript para excluir algo.
  if(window.confirm('Tem certeza que você deseja excluir esta pergunta?')){
    await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
  }
}

async function handleEndRoom() {
   await database.ref(`rooms/${roomId}`).update({
     endedAt: new Date(),
   })
   //retorna para o inicio da aplicação.
   history.push('/');
}

return(
  <div id="page-room">
    <header>
      <div className="content">
        <img src={logoImg} alt="Letmeask"/>
        <div>
          <RoomCode code={params.id} />
          <Button isOutlined onClick={handleEndRoom}>Encerrar Sala</Button>
        </div>
      </div>

    </header>
    <main>
      <div className="room-title">
        <h1>Sala {title}</h1>
        {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
      </div>
    
      <div className="question-list">
          {questions.map(question => {
            return(
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
               > 
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="Remover pergunta"/>
                </button>
               </Question>
            )
          })}
      </div>
      
    </main>
  </div>
)

}